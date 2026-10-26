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

<script>
import CustomLoader from "~/components/ui/CustomLoader.vue";
import ImageZoom from "~/components/common/ImageZoom.vue";
import Icon from "~/components/common/Icon.vue";
import MediaImage from "./MediaImage.vue";
export default {
    name: 'DiamondViewer',
    props: {
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
    },
    components: {
        CustomLoader,
        ImageZoom,
        Icon,
        MediaImage
    },
    data() {
        return {
            frame: 0,
            zoomFactor: 1,
            playing: false,
            autoRotate: true,
            lastTime: 0,
            sensitivity: 4,
            isDragging: false,
            startX: 0,
            lastX: 0,
            showDefaultImage: false,
            renderDelay: false,
            images: [],
            drawOnZoom: false,
            playbackSpeed: 20,
            canvasWidth : 1,
            firstLoop: true,
            loading: true,
            canvasError: false
        };
    },
    computed: {
        canvasLabel() {
            return `${this.altName}. Interactive 360 degree viewer.`;
        },
        isSearchPage() {
            return this.$route.name === 'searchPage';
        }
    },
    mounted() {
        this.initViewer();
        window.addEventListener('resize', this.resizeCanvas);

        const slider = this.$el?.querySelector('input[type="range"]');
        let startY = 0, startVal = 0;

        slider.addEventListener('touchstart', e => {
            startY = e.touches[0].clientY;
            startVal = parseFloat(slider.value);
        }, { passive: true });

        slider.addEventListener('touchmove', e => {
            e.preventDefault(); // prevent page scroll
            const deltaY = e.touches[0].clientY - startY; // up = increase
            const step = parseFloat(slider.step) || 0.01;
            const range = parseFloat(slider.max) - parseFloat(slider.min);

            let newVal = startVal + (deltaY / 100) * range; // adjust 100px drag
            newVal = Math.max(slider.min, Math.min(slider.max, newVal));
            slider.value = newVal;
            slider.dispatchEvent(new Event('input', { bubbles: true }));
        }, { passive: false });
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.resizeCanvas);
    },
    methods: {
        handleKeyRotate(e) {
            if (!typeof this.draw === 'function') return; // guard clause
            
            if (e.key === 'ArrowRight') {
                this.frame = (this.frame - 1 + this.images.length) % this.images.length;
                requestAnimationFrame(this.draw);
            }

            if (e.key === 'ArrowLeft') {
                this.frame = (this.frame + 1) % this.images.length;
                requestAnimationFrame(this.draw);
            }

            if (e.key === ' ') {
                e.preventDefault();
                this.playing ? this.pauseVideo() : this.playVideo();
            }
        },
        zoomSlider(val) {
            // Set width and height directly from slider value
            this.canvasWidth = val;
            // this.canvasHeight = val;

            // Optional: stop animation
            this.playing = false;
            this.autoRotate = false;
            // this.zoomFactor = parseFloat(e.target.value);
            // this.playing = false;
            // this.autoRotate = false;
            // // this.zoomFactor += this.zoomFactor > 0 ? -0.1 : 0.1;
            // this.zoomFactor = Math.max(0.1, Math.min(this.zoomFactor, 2));
            // if (!this.playing && typeof this.draw === 'function') { requestAnimationFrame(this.draw); }
        },
        nextFrame() {
            if (this.frame == 0) {
                this.frame = this.images.length - 1;
            }
            this.frame--;
            if (!this.playing && typeof this.draw === 'function') { requestAnimationFrame(this.draw); }
        },
        prevFrame() {
            this.frame++;
            if (!this.playing && typeof this.draw === 'function') { requestAnimationFrame(this.draw); }
        },
        playVideo() {
            if (!this.playing && typeof this.draw === 'function') {
                this.playing = true;
                // if(this.frame == this.images?.length - 1){
                //     this.playing = false;
                // }
                requestAnimationFrame(this.draw);
            }
        },
        pauseVideo() {
            this.playing = !this.playing;
            this.autoRotate = false;
            if (this.playing) { requestAnimationFrame(this.draw); }
        },
        async loadImages(path) {
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
        },
        async initViewer() {
            try {
                this.images = this.reelImages?.length ? this.reelImages : await this.loadImages(this.path);
                this.loading = false;

                const container = this.$refs.container;
                if(!container){
                    console.log('container not found');
                    this.canvasError = true;
                    return;
                }
                const canvas = this.$refs.canvas;
                const ctx = canvas.getContext('2d');
                this.ctx = ctx;

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

                if (this.images.length === 0) {
                    canvas.remove();
                    this.showDefaultImage = true;
                    this.$emit('diamondReelEmpty', false);
                    this.canvasError = true;
                    return;
                }

                // Set backdrop
                try {
                    const avgColor = getAverageRGB(this.images[0]);
                    container.style.backgroundColor = avgColor;
                    canvas.style.opacity = 1;
                } catch { }

                this.resizeCanvas();

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

                // const frameRate = 1000 / (this.images.length <= 16 ? 5 : this.images.length <= 32 ? 10 : 20);
                const draw = (timestamp) => {
                    const frameInterval = 1000 / this.playbackSpeed;

                    if (timestamp - this.lastTime >= frameInterval) {
                        this.lastTime = timestamp;

                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        const img = this.images[this.frame % this.images.length];

                        if (img.complete) {
                            try{
                                if (this.isProduct) {
                                    const canvasAspect = canvas.width / canvas.height;
                                    const imgAspect = img.width / img.height;

                                    let baseWidth = canvasAspect > imgAspect ? canvas.height * imgAspect : canvas.width;
                                    let baseHeight = canvasAspect > imgAspect ? canvas.height : canvas.width / imgAspect;

                                    const drawWidth = baseWidth * this.zoomFactor;
                                    const drawHeight = baseHeight * this.zoomFactor;
                                    const offsetX = (canvas.width - drawWidth) / 2;
                                    const offsetY = (canvas.height - drawHeight) / 2;

                                    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                                } else {
                                    drawCoverImage(ctx, img, canvas.width, canvas.height, this.zoomFactor);
                                }
                            }
                            catch (error) {
                                console.log(error);
                                this.$emit('error', true);
                            }
                        }

                        if (this.playing) {
                            this.frame = (this.frame - 1 + this.images.length) % this.images.length;

                            //After first loop stop video
                            if (this.firstLoop && this.frame === 0) {
                                // Stop autoplay after one loop
                                this.firstLoop = false;
                                this.playing = false;
                                return;
                            }
                        }

                    }

                    if (this.playing) {
                        requestAnimationFrame(draw);
                    }
                };

                this.draw = draw;
                requestAnimationFrame(draw);

                // Events
                if (this.isSearch) {
                    canvas.addEventListener('mouseenter', this.startDrag);
                }
                canvas.addEventListener('mouseleave', () => {
                    // this.playing = false;
                    // this.autoRotate = false;
                    this.$emit('diamondReelEmpty', false);
                });
                // canvas.addEventListener('wheel', this.handleWheel);
                canvas.addEventListener('mousedown', this.startDrag);
                canvas.addEventListener('mousemove', this.duringDrag);
                canvas.addEventListener('mouseup', this.stopDrag);
                // Touch events for mobile
                canvas.addEventListener('touchstart', this.startDrag, { passive: false });
                canvas.addEventListener('touchmove', this.duringDrag, { passive: false });
                canvas.addEventListener('touchend', this.stopDrag);
                canvas.addEventListener('touchcancel', this.stopDrag);

                // Play video default
                if(!this.isSearch) this.playVideo();

            } catch (error) {
               console.log(error);
               this.canvasError = true;
               this.$emit('error', true);
            }
        },
        resizeCanvas() {
            const canvas = this.$refs.canvas;
            // Add a check to ensure canvas is not undefined before proceeding
            if (!canvas) {
                console.error("Canvas ref not found.");
                return;
            }
            const container = canvas.parentElement;
            // const rect = canvas.parentElement.getBoundingClientRect();

            // Set canvas display size via CSS
            canvas.style.width = '100%';
            canvas.style.height = '100%';

            // Set actual drawing resolution
            const dpr = window.devicePixelRatio || 1;
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;

            // Scale context for high DPI
            // if (this.ctx) {
            //     this.ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset any existing transform
            //     this.ctx.scale(dpr, dpr);
            // }

            // Redraw the frame after resize
            if (this.draw) {
                requestAnimationFrame(this.draw);
            }
        },
        handleWheel(e) {
            e.preventDefault();
            this.playing = false;
            this.autoRotate = false;
            this.zoomFactor += e.deltaY > 0 ? -0.1 : 0.1;
            this.zoomFactor = Math.max(0.1, Math.min(this.zoomFactor, 2));
            if (!this.playing && typeof this.draw === 'function') {
                requestAnimationFrame(this.draw);
            }
        },
        startDrag(e) {
            if (e.target.closest('nav') || e.target.closest('input')) return;

            this.playing = false;
            this.autoRotate = false;
            this.isDragging = true;

            this.startX = e.clientX || e.touches?.[0]?.clientX;
            this.startY = e.clientY || e.touches?.[0]?.clientY;
            this.lastX = this.startX;
        },

        duringDrag(e) {
            if (!this.isDragging) return;

            const currentX = e.clientX || e.touches?.[0]?.clientX;
            const currentY = e.clientY || e.touches?.[0]?.clientY;

            const deltaX = currentX - this.startX;
            const deltaY = currentY - this.startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                if (e && e.cancelable) e.preventDefault();

                const canvas = this.$refs.canvas;
                const canvasWidth = canvas?.clientWidth || 360;
                const framesPerPixel = this.images.length / canvasWidth;
                const frameDelta = (currentX - this.lastX) * framesPerPixel;

                if (Math.abs(frameDelta) >= 1) {
                    this.frame = (this.frame - Math.round(frameDelta) + this.images.length) % this.images.length;
                    this.lastX = currentX;
                    requestAnimationFrame(this.draw);
                }
            }
        },
        stopDrag() {
            this.isDragging = false;
        }
    }
};
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
