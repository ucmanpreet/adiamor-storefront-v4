<template>
	<div class="w-full h-full overflow-hidden" :class="[
		renderDelay ? 'aspect-square' : '',
		hasSampleStyle ? 'flex items-center justify-center' : ''
	]" :style="hasSampleStyle && bgColor ? { backgroundColor: bgColor } : {}">

		<NoImage v-if="!images.length || !bgImage" />
		<!-- Decorative thumbnail: no button role, no accessible name -->
		<div v-else-if="!hasSampleStyle && hidePreview" ref="trigger" v-show="bgImage"
			class="absolute inset-0 w-full h-full" aria-hidden="true"
			:class="[className, shapeClass ? shapeClass : 'bg-contain', { 'bg-no-repeat bg-center': gradient }]"
			:style="[
				gradient
					? { backgroundImage: `url(${bgImage})` }
					: {
						background: `linear-gradient(#eee, white, #eee), url(${bgImage}) center/contain no-repeat`,
						backgroundBlendMode: 'multiply'
					},
				transformProp ? { transform: `scale(${transformProp})` } : {}
			]">
		</div>
		<!-- Interactive image button when preview is allowed -->
		<button v-else-if="!hasSampleStyle" ref="trigger" type="button" tabindex="0" v-show="bgImage"
			@click="visible = true" @keydown.enter.prevent="visible = true" @keydown.space.prevent="visible = true"
			:aria-expanded="visible"
			:aria-label="altLabel ? altLabel : (images.length === 1 && images[0]?.flavor_text ? images[0].flavor_text : 'View product image')"
			class="absolute inset-0 w-full h-full"
			:class="[className, shapeClass ? shapeClass : 'bg-contain', { 'bg-no-repeat bg-center': gradient }]"
			:style="[
				gradient
					? { backgroundImage: `url(${bgImage})` }
					: {
						background: `linear-gradient(#eee, white, #eee), url(${bgImage}) center/contain no-repeat`,
						backgroundBlendMode: 'multiply'
					},
				transformProp ? { transform: `scale(${transformProp})` } : {}
			]" :title="altLabel || 'Product Image'">
			<div title="count" aria-hidden="true" class="bg-[#e3e3e3]/60 flex absolute bottom-0 inset-x-0 px-2 py-1"
				v-if="badge && images.length == 1 && images[0].flavor_text && type != 'button'">
				<div class="px-3 flex-1 capitalize text-center">{{ images[0].flavor_text }}</div>
			</div>
		</button>
		<div v-else ref="trigger" class="max-h-full max-w-full" :style="attributes">
			<img :src="bgImage" :alt="altLabel || 'Product Image'" :role="hidePreview ? 'presentation' : 'button'" :tabindex="hidePreview ? '-1' : '0'"
				@click="!hidePreview && (visible = true)" @keydown.enter.prevent="!hidePreview && (visible = true)"
				@keydown.space.prevent="!hidePreview && (visible = true)" class="w-full h-full aspect-auto cursor-pointer" />
		</div>
		<div class="absolute inset-0 skeleton-shimmer z-20" :class="!renderDelay ? '' : 'hidden'"
			:aria-hidden="renderDelay ? 'true' : 'false'" role="status"></div>

		<ImagePreviewComponent v-if="visible && !mobile" :images="images" @close="closeLightbox"
			:sampleImageContainerStyle="attributes" :transform="'rotate(90deg)'" :modalClass="modalClass" />
	</div>
</template>

<script setup>
import NoImage from "~/components/ui/NoImage.vue";
// Modals load when first opened
const ImagePreviewComponent = defineAsyncComponent(() => import("~/components/modal/ImagePreviewComponent.vue"));
import { fetchFirstProductImage, extractDominantColor } from "~/utils/universalHelper";

const props = defineProps({
	image: {
		type: [String, Array, Object],
		required: false,
	},
	mobile: {
		type: Boolean,
		default: false
	},
	shapeClass: {
		type: String,
		default: ''
	},
	type: {
		type: String,
		default: ''
	},
	className: {
		type: String,
		default: ''
	},
	hidePreview: {
		type: Boolean,
		default: false
	},
	badge: {
		type: Boolean,
		default: false
	},
	gradient: {
		type: Boolean,
		default: false
	},
	transformProp: {
		type: [String, Number],
		default: null
	},
	altLabel: {
		type: String,
		default: ''
	},
	attributes: {
		type: [String, Number, Object],
		default: null
	},
	modalClass: {
		type: String,
		default: ''
	}
});
const emit = defineEmits(['callGTMEvent', 'error']);

const config = useRuntimeConfig().public;

const trigger = ref(null);
const images = ref([]);
const options = ref({
	url: "data-source"
});
const renderDelay = ref(false);
const visible = ref(false);
const bgImage = ref(null);
const bgColor = ref('');

const sampleImageContainerStyle = computed(() => {
	if (!props.attributes) return {};
	// const raw = props.attributes?.aspectRatio ?? (typeof props.attributes !== 'object' ? props.attributes : null);
	// if (!raw) return {};

	// if (typeof raw === 'string' && raw.includes('/')) {
	// 	return { aspectRatio: raw };
	// }

	// const ratio = parseFloat(raw);
	// if (!ratio || isNaN(ratio)) return {};
	return props.attributes;
});

const hasSampleStyle = computed(() => sampleImageContainerStyle.value && Object.keys(sampleImageContainerStyle.value).length > 0);

watch(visible, (newVal, oldValue) => {
	nextTick(() => {
		document.body.style.overflow = "";
		if (newVal && !props.mobile) {
			document.body.style.overflow = 'hidden';
			emit('callGTMEvent');
		}
	});
});

watch(bgImage, (newVal) => {
	if (newVal && hasSampleStyle.value) {
		extractColor();
	}
});

async function extractColor() {
	if (!bgImage.value) return;
	bgColor.value = await extractDominantColor(bgImage.value);
}

function closeLightbox() {
	visible.value = false;
	nextTick(() => trigger.value?.focus());
}

function assignData() {
	if (!props.image) return [];
	if (typeof props.image == 'string') return [props.image];
	if (Array.isArray(props.image)) return props.image;
	if (props.image && typeof props.image === 'object') return [props.image];
	return props.image;
}

function checkBgImage(url) {
	const img = new Image();
	const currentUrl = url;

	img.onload = () => {
		if (currentUrl === url) bgImage.value = url;;
	};

	img.onerror = () => {
		if (currentUrl === url) bgImage.value = null;
	};

	img.src = url;
	if (!bgImage.value) {
		emit('error', true);
	}
}

function isSampleImage(url) {
	return bgImage.value?.includes('sample') && bgImage.value?.includes(config.cdnPrefix);
}

onMounted(async () => {
	images.value = await assignData();
	await checkBgImage(fetchFirstProductImage(images.value));
	setTimeout(() => {
		renderDelay.value = true;
	}, 200);
});
</script>
