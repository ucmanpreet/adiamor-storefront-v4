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

<script>
import NoImage from "~/components/ui/NoImage.vue";
import ImagePreviewComponent from "~/components/modal/ImagePreviewComponent.vue";
import { fetchFirstProductImage, extractDominantColor } from "~/utils/universalHelper";

export default {
	name: 'ImagePreview',
	components: { NoImage, ImagePreviewComponent },
	props: {
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
	},
	computed: {
		hasSampleStyle() {
			return this.sampleImageContainerStyle && Object.keys(this.sampleImageContainerStyle).length > 0;
		},
		getDiamondAttribute(code) {
			const attrs = this.product?.diamondAttributeDetail?.[0]?.data || this.product?.attributes || [];
			return attrs.find(a => a.code === code)?.value || '';
		},
		sampleImageContainerStyle() {
			if (!this.attributes) return {};
			// const raw = this.attributes?.aspectRatio ?? (typeof this.attributes !== 'object' ? this.attributes : null);
			// if (!raw) return {};

			// if (typeof raw === 'string' && raw.includes('/')) {
			// 	return { aspectRatio: raw };
			// }

			// const ratio = parseFloat(raw);
			// if (!ratio || isNaN(ratio)) return {};
			return this.attributes;
		},
	},
	data() {
		return {
			images: [],
			options: {
				url: "data-source"
			},
			renderDelay: false,
			visible: false,
			bgImage: null,
			bgColor: '',
		};
	},
	watch: {
		visible(newVal, oldValue) {
			this.$nextTick(() => {
				document.body.style.overflow = "";
				if (newVal && !this.mobile) {
					document.body.style.overflow = 'hidden';
					this.$emit('callGTMEvent');
				}
			});
		},
		bgImage(newVal) {
			if (newVal && this.hasSampleStyle) {
				this.extractColor();
			}
		}
	},
	methods: {
		async extractColor() {
			if (!this.bgImage) return;
			this.bgColor = await extractDominantColor(this.bgImage);
		},
		closeLightbox() {
			this.visible = false;
			this.$nextTick(() => this.$refs.trigger?.focus());
		},
		assignData() {
			if (!this.image) return [];
			if (typeof this.image == 'string') return [this.image];
			if (Array.isArray(this.image)) return this.image;
			if (this.image && typeof this.image === 'object') return [this.image];
			return this.image;
		},
		checkBgImage(url) {
			const img = new Image();
			const currentUrl = url;

			img.onload = () => {
				if (currentUrl === url) this.bgImage = url;;
			};

			img.onerror = () => {
				if (currentUrl === url) this.bgImage = null;
			};

			img.src = url;
			if (!this.bgImage) {
				this.$emit('error', true);
			}
		},
		isSampleImage(url) {
			return this.bgImage?.includes('sample') && this.bgImage?.includes(this.$config.public.cdnPrefix);
		}
	},
	async mounted() {
		this.images = await this.assignData();
		await this.checkBgImage(fetchFirstProductImage(this.images));
		setTimeout(() => {
			this.renderDelay = true;
		}, 200);
	}
};
</script>
