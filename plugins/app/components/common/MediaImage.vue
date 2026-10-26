<template>
    <div
        class="h-full relative"
        :class="parentClass"
        :style="bgColor ? { backgroundColor: bgColor } : {}"
        v-if="gradient">
        <div
        :class="[className, classDynamic]"
        :style="[
            hasSampleStyle,
            {
                width: '100%',
                height: '100%',
                background: `linear-gradient(#eee, white, #eee), url(${getValidSrc(src)}) center center / contain no-repeat`,
                backgroundBlendMode: 'multiply'
            }
        ]"
        >
        </div>
    </div>
     <div class="h-full"
      v-else :class="parentClass ? parentClass : ''" :style="bgColor ? { backgroundColor: bgColor } : {}">
        <img :src="getValidSrc(src)" :alt="getAlt(alt)" :title="alt" @error="fallbackImage"
            :class="[className, classDynamic, maxWidthClass]" :height="height" :width="width"
            :tabindex="tabIndex !== undefined ? tabIndex : null" :style="hasSampleStyle"/>
    </div>
</template>
<script>
import { fetchFirstProductImage } from '~/utils/universalHelper';
export default {
    name: 'MediaImage',
    props: {
        src: {
            type: [String, Object, Array],
            default: () => ''
        },
        alt: {
            type: String,
            default: () => ''
        },
        className: {
            type: [String, Array],
            default: ''
        },
        height: {
            type: String,
            default: 'auto'
        },
        width: {
            type: String,
            default: 'auto'
        },
        classDynamic: {
            type: [String, Array],
            default: ''
        },
        tabIndex: {
            type: Number,
            default: undefined
        },
        ratio: {
            type: Object,
            default: null
        },
        attributes: {
            type: Object,
            default() {
                return {};
            },
        },
        imgAttributes: {
            type: Object,
            default() {
                return {};
            },
        },
        parentClass: {
            type: String,
            default: '',
        },
        bgColor: {
            type: String,
            default: '',
        },
        gradient: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        maxWidthClass() {
            return this.alt?.toLowerCase().includes('yotpo') ? '' : 'max-w-fit';
        },
        hasSampleStyle() {
            // Priority 1: ratio prop directly pass (e.g. from ImagePreviewComponent)
            if (this.ratio && Object.keys(this.ratio).length > 0) {
                return this.ratio;
            }
            // Priority 2: compute ratio from attributes
            if (!this.attributes) return {};
            
            const raw = this.attributes?.aspectRatio ?? (typeof this.attributes !== 'object' ? this.attributes : null);
            if (!raw) return {};
            
            if (typeof raw === 'string' && raw.includes('/')) {
                return { aspectRatio: raw };
            }

            const ratio = parseFloat(raw);
            console.log(ratio);
            
            if (isNaN(ratio)) return {};
            return { aspectRatio: `${ratio}` };
        }
    },
    methods: {
        getAlt(alt) {
            return alt && alt.trim() ? alt : 'Product image';
        },
        fallbackImage(e) {
            e.target.src = assetUrl('~/assets/images/no-image.webp');
        },
        getValidSrc(src) {
            if (src && typeof src === 'string') return src;
            return fetchFirstProductImage(src);
        }
    }
}
</script>