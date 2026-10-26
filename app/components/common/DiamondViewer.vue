<template>
    <div class="reel-viewer w-full h-full relative flex flex-col justify-end" ref="container">
        <div class="absolute inset-0 bg-black/5 flex items-center justify-center z-20 group-light overflow-hidden" v-show="!isSearch || viewType == 'list' || showDefaultImage" :class="loading ? '' : 'hidden'">
            <MediaImage v-if="productImage" :src="productImage" :alt="altName" className="w-full h-full object-contain" />
			<CustomLoader v-else/>
		</div>
        <figure class="p-4 sm:p-6 cursor-ew-resize absolute inset-0" :aria-label="altName" v-show="!loading && (!images?.length || showDefaultImage)">
            <MediaImage :src="productImage" :alt="altName" crossorigin="anonymous" className="w-full h-full object-contain"/>
        </figure>
        <canvas ref="canvas"
            class="p-4 sm:p-6 cursor-ew-resize absolute inset-0"
            :style="`transform: scale(${canvasWidth});`"
            :class="[isSearch ? '!p-0' : '', customSetting]"
            role="img"
            tabindex="0"
            :aria-label="canvasLabel"
            :title="canvasLabel"
            @keydown="handleKeyRotate"
        ></canvas>

        <div v-show="(showAttributes || !canvasError) && !isSearchPage">
            <ImageZoom @zoom="zoomSlider"/>
            <nav class="flex justify-center items-center gap-4 p-2 relative z-10" aria-label="360 degree viewer controls" :class="[ viewType != 'list' ? 'translate-y-full' : '', navbg ]">
                <button class="prev" @click="prevFrame" aria-label="Previous frame">
                    <Icon name="arrow" class="hover:text-primary w-4 h-4 rotate-180" />
                </button>
                <button class="play" @click="playVideo" v-show="!playing" aria-label="Play rotation">
                    <Icon name="play" class="hover:text-primary w-6 h-6" />
                </button>
                <button class="pause" @click="pauseVideo" v-show="playing" aria-label="Pause rotation">
                    <Icon name="pause" class="hover:text-primary w-6 h-6" />
                </button>
                <button class="next" @click="nextFrame" aria-label="Next frame">
                    <Icon name="arrow" class="hover:text-primary w-4 h-4" />
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup>
import CustomLoader from "~/components/ui/CustomLoader.vue";
import ImageZoom from "~/components/common/ImageZoom.vue";
import Icon from "~/components/common/Icon.vue";
import MediaImage from "./MediaImage.vue";

const props = defineProps({
    path: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: false
    },
    showAttributes: {
        type: Boolean,
        default: false
    },
    isSearch: {
        type: Boolean,
        required: false
    },
    viewType: {
        type: String,
        required: false
    },
    customSetting: {
        type: String,
        required: false
    },
    navbg: {
        type: String,
        required: false
    },
    isProduct: {
        type: Boolean,
        required: false
    },
    altName: {
        type: String,
        required: false,
        default: 'product_reel'
    },
    reelImages:{
        type: Array,
        required: false,
        default() {
            return [];
        },
    }
});

const emit = defineEmits(['diamondReelEmpty', 'error']);

const route = useRoute();

const container = ref(null);
const canvas = ref(null);

const frame = ref(0);
const zoomFactor = ref(1);
const playing = ref(false);
const autoRotate = ref(true);
const lastTime = ref(0);
const sensitivity = ref(4);
const isDragging = ref(false);
const startX = ref(0);
const lastX = ref(0);
const showDefaultImage = ref(false);
const renderDelay = ref(false);
const images = ref([]);
const drawOnZoom = ref(false);
const playbackSpeed = ref(20);
const canvasWidth = ref(1);
const firstLoop = ref(true);
const loading = ref(true);
const canvasError = ref(false);

// Non-reactive instance members of the original component
let startY = 0;
let ctx = null;
let draw = null;

const canvasLabel = computed(() => `${props.altName}. Interactive 360 degree viewer.`);
const isSearchPage = computed(() => route.name === 'searchPage');

onMounted(() => {
    initViewer();
    window.addEventListener('resize', resizeCanvas);

    const slider = container.value?.querySelector('input[type="range"]');
    let sliderStartY = 0, startVal = 0;

    slider.addEventListener('touchstart', e => {
        sliderStartY = e.touches[0].clientY;
        startVal = parseFloat(slider.value);
    }, { passive: true });

    slider.addEventListener('touchmove', e => {
        e.preventDefault(); // prevent page scroll
        const deltaY = e.touches[0].clientY - sliderStartY; // up = increase
        const step = parseFloat(slider.step) || 0.01;
        const range = parseFloat(slider.max) - parseFloat(slider.min);

        let newVal = startVal + (deltaY / 100) * range; // adjust 100px drag
        newVal = Math.max(slider.min, Math.min(slider.max, newVal));
        slider.value = newVal;
        slider.dispatchEvent(new Event('input', { bubbles: true }));
    }, { passive: false });
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeCanvas);
});

function handleKeyRotate(e) {
    if (!typeof draw === 'function') return; // guard clause

    if (e.key === 'ArrowRight') {
        frame.value = (frame.value - 1 + images.value.length) % images.value.length;
        requestAnimationFrame(draw);
    }

    if (e.key === 'ArrowLeft') {
        frame.value = (frame.value + 1) % images.value.length;
        requestAnimationFrame(draw);
    }

    if (e.key === ' ') {
        e.preventDefault();
        playing.value ? pauseVideo() : playVideo();
    }
}
function zoomSlider(val) {
    // Set width and height directly from slider value
    canvasWidth.value = val;

    // Optional: stop animation
    playing.value = false;
    autoRotate.value = false;
}
function nextFrame() {
    if (frame.value == 0) {
        frame.value = images.value.length - 1;
    }
    frame.value--;
    if (!playing.value && typeof draw === 'function') { requestAnimationFrame(draw); }
}
function prevFrame() {
    frame.value++;
    if (!playing.value && typeof draw === 'function') { requestAnimationFrame(draw); }
}
function playVideo() {
    if (!playing.value && typeof draw === 'function') {
        playing.value = true;
        requestAnimationFrame(draw);
    }
}
function pauseVideo() {
    playing.value = !playing.value;
    autoRotate.value = false;
    if (playing.value) { requestAnimationFrame(draw); }
}
async function loadImages(path) {
    try {
        const res = await fetch(path);
        const base64Array = await res.json();
        return base64Array.map((b64) => {
            const img = new Image();
            img.src = 'data:image/jpeg;base64,' + b64;
            return img;
        });
    } catch {
        return [];
    }
}
async function initViewer() {
    try {
        images.value = props.reelImages?.length ? props.reelImages : await loadImages(props.path);
        loading.value = false;

        const containerEl = container.value;
        if(!containerEl){
            console.log('container not found');
            canvasError.value = true;
            return;
        }
        const canvasEl = canvas.value;
        const context = canvasEl.getContext('2d');
        ctx = context;

        const getAverageRGB = (img) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            const width = canvas.width = img.naturalWidth;
            const height = canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            const data1 = ctx.getImageData(0, 0, width, 5).data;
            const data2 = ctx.getImageData(0, 0, 5, height).data;
            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < data1.length; i += 4) {
                r += data1[i]; g += data1[i + 1]; b += data1[i + 2]; count++;
            }
            for (let i = 0; i < data2.length; i += 4) {
                r += data2[i]; g += data2[i + 1]; b += data2[i + 2]; count++;
            }
            return `rgb(${~~(r / count)}, ${~~(g / count)}, ${~~(b / count)})`;
        };

        if (images.value.length === 0) {
            canvasEl.remove();
            showDefaultImage.value = true;
            emit('diamondReelEmpty', false);
            canvasError.value = true;
            return;
        }

        // Set backdrop
        try {
            const avgColor = getAverageRGB(images.value[0]);
            containerEl.style.backgroundColor = avgColor;
            canvasEl.style.opacity = 1;
        } catch { }

        resizeCanvas();

        // Draw helper (cover mode)
        const drawCoverImage = (ctx, img, canvasWidth, canvasHeight, zoom) => {
            const imgAspect = img.width / img.height;
            const canvasAspect = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgAspect > canvasAspect) {
                // Image is wider → fit height, crop sides
                drawHeight = canvasHeight * zoom;
                drawWidth = img.width * (drawHeight / img.height);
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = (canvasHeight - drawHeight) / 2;
            } else {
                // Image is taller → fit width, crop top/bottom
                drawWidth = canvasWidth * zoom;
                drawHeight = img.height * (drawWidth / img.width);
                offsetX = (canvasWidth - drawWidth) / 2;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        const drawFrame = (timestamp) => {
            const frameInterval = 1000 / playbackSpeed.value;

            if (timestamp - lastTime.value >= frameInterval) {
                lastTime.value = timestamp;

                context.clearRect(0, 0, canvasEl.width, canvasEl.height);
                const img = images.value[frame.value % images.value.length];

                if (img.complete) {
                    try{
                        if (props.isProduct) {
                            const canvasAspect = canvasEl.width / canvasEl.height;
                            const imgAspect = img.width / img.height;

                            let baseWidth = canvasAspect > imgAspect ? canvasEl.height * imgAspect : canvasEl.width;
                            let baseHeight = canvasAspect > imgAspect ? canvasEl.height : canvasEl.width / imgAspect;

                            const drawWidth = baseWidth * zoomFactor.value;
                            const drawHeight = baseHeight * zoomFactor.value;
                            const offsetX = (canvasEl.width - drawWidth) / 2;
                            const offsetY = (canvasEl.height - drawHeight) / 2;

                            context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                        } else {
                            drawCoverImage(context, img, canvasEl.width, canvasEl.height, zoomFactor.value);
                        }
                    }
                    catch (error) {
                        console.log(error);
                        emit('error', true);
                    }
                }

                if (playing.value) {
                    frame.value = (frame.value - 1 + images.value.length) % images.value.length;

                    //After first loop stop video
                    if (firstLoop.value && frame.value === 0) {
                        // Stop autoplay after one loop
                        firstLoop.value = false;
                        playing.value = false;
                        return;
                    }
                }

            }

            if (playing.value) {
                requestAnimationFrame(drawFrame);
            }
        };

        draw = drawFrame;
        requestAnimationFrame(drawFrame);

        // Events
        if (props.isSearch) {
            canvasEl.addEventListener('mouseenter', startDrag);
        }
        canvasEl.addEventListener('mouseleave', () => {
            emit('diamondReelEmpty', false);
        });
        canvasEl.addEventListener('mousedown', startDrag);
        canvasEl.addEventListener('mousemove', duringDrag);
        canvasEl.addEventListener('mouseup', stopDrag);
        // Touch events for mobile
        canvasEl.addEventListener('touchstart', startDrag, { passive: false });
        canvasEl.addEventListener('touchmove', duringDrag, { passive: false });
        canvasEl.addEventListener('touchend', stopDrag);
        canvasEl.addEventListener('touchcancel', stopDrag);

        // Play video default
        if(!props.isSearch) playVideo();

    } catch (error) {
       console.log(error);
       canvasError.value = true;
       emit('error', true);
    }
}
function resizeCanvas() {
    const canvasEl = canvas.value;
    // Add a check to ensure canvas is not undefined before proceeding
    if (!canvasEl) {
        console.error("Canvas ref not found.");
        return;
    }
    const containerEl = canvasEl.parentElement;

    // Set canvas display size via CSS
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';

    // Set actual drawing resolution
    const dpr = window.devicePixelRatio || 1;
    canvasEl.width = containerEl.clientWidth;
    canvasEl.height = containerEl.clientHeight;

    // Redraw the frame after resize
    if (draw) {
        requestAnimationFrame(draw);
    }
}
function handleWheel(e) {
    e.preventDefault();
    playing.value = false;
    autoRotate.value = false;
    zoomFactor.value += e.deltaY > 0 ? -0.1 : 0.1;
    zoomFactor.value = Math.max(0.1, Math.min(zoomFactor.value, 2));
    if (!playing.value && typeof draw === 'function') {
        requestAnimationFrame(draw);
    }
}
function startDrag(e) {
    if (e.target.closest('nav') || e.target.closest('input')) return;

    playing.value = false;
    autoRotate.value = false;
    isDragging.value = true;

    startX.value = e.clientX || e.touches?.[0]?.clientX;
    startY = e.clientY || e.touches?.[0]?.clientY;
    lastX.value = startX.value;
}
function duringDrag(e) {
    if (!isDragging.value) return;

    const currentX = e.clientX || e.touches?.[0]?.clientX;
    const currentY = e.clientY || e.touches?.[0]?.clientY;

    const deltaX = currentX - startX.value;
    const deltaY = currentY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (e && e.cancelable) e.preventDefault();

        const canvasEl = canvas.value;
        const elWidth = canvasEl?.clientWidth || 360;
        const framesPerPixel = images.value.length / elWidth;
        const frameDelta = (currentX - lastX.value) * framesPerPixel;

        if (Math.abs(frameDelta) >= 1) {
            frame.value = (frame.value - Math.round(frameDelta) + images.value.length) % images.value.length;
            lastX.value = currentX;
            requestAnimationFrame(draw);
        }
    }
}
function stopDrag() {
    isDragging.value = false;
}
</script>

<style scoped>
.reel-viewer {
    width: 100%;
    height: 100%;
    position: relative;
}

.reel-viewer canvas {
    width: 100%;
    height: 100%;
    display: block;
    touch-action: pan-y;
}

/* [data-reel] {
    position: relative;
    max-width: 600px;
    width: 100%;
    aspect-ratio: 1;
    border: 1px solid #ccc;
    line-height: 0;
    transition: background-color 0.4s;
}

[data-reel]>canvas {
    height: 100%;
    max-height: 600px;
    width: 100%;
    max-width: 600px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% - 40px);
    display: block;
    cursor: ew-resize;
    user-select: none;
    transition: opacity 0.4s;
    opacity: 0.0;
}

[data-reel]>svg {
    box-sizing: border-box;
    max-width: 100%;
    padding: 4rem;
    height: auto;
    transition: opacity 0.4s;
}

[data-reel]>nav {
    border-top: 1px solid #ccc;
    background-color: white;
    display: flex;
    height: 39px;
    justify-content: center;
    gap: 0.5rem;
    align-items: center;
}

[data-reel]>nav span {
    cursor: pointer;
    user-select: none;
}

[data-reel]>input[type="range"] {
    position: absolute;    top: calc(40px + 1rem);
    right: 1rem;
    left: auto;
    height: calc(100% - 120px - 2rem);
    writing-mode: vertical-lr;
    direction: rtl;
    width: 1rem;
    vertical-align: bottom;
    border-radius: 0.25rem;
    background: #ccc;
    outline: none;
    opacity: 0.0;
    -webkit-transition: .4s;
    transition: opacity .4s;
}

[data-reel]>[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #306499;
    cursor: pointer;
}

[data-reel]>[type="range"]::-moz-range-thumb {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #306499;
    cursor: pointer;
}

[data-reel]>[type="range"]+span,
[data-reel]>[type="range"]+span+span {
    position: absolute;
    right: 0.75rem;
    left: auto;
    line-height: 40px;
    opacity: 0;
    transition: color .4s, opacity .4s;
}

[data-reel]>span {
    top: 1rem;
}

[data-reel]>span+span {
    top: auto;
    bottom: calc(40px + 0.75rem);
} */
</style>
