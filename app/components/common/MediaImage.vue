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
        <img :src="imageSrc" :alt="getAlt(alt)" :title="alt" @error="fallbackImage" :loading="loading" :decoding="decoding"
            :class="[className, classDynamic, maxWidthClass]" :height="height" :width="width"
            :tabindex="tabIndex !== undefined ? tabIndex : null" :style="hasSampleStyle"/>
    </div>
</template>
<script setup>
import { fetchFirstProductImage } from '~/utils/universalHelper';

const props = defineProps({
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
    },
    // Declared as props so they reach the <img>; undeclared attrs fall through to the wrapper div
    loading: {
        type: String,
        default: undefined
    },
    decoding: {
        type: String,
        default: undefined
    },
    // Asks the image CDN for a rendition this wide (px) instead of the full-size original
    transformWidth: {
        type: Number,
        default: 0
    }
});

const maxWidthClass = computed(() => props.alt?.toLowerCase().includes('yotpo') ? '' : 'max-w-fit');

const hasSampleStyle = computed(() => {
    // Priority 1: ratio prop directly pass (e.g. from ImagePreviewComponent)
    if (props.ratio && Object.keys(props.ratio).length > 0) {
        return props.ratio;
    }
    // Priority 2: compute ratio from attributes
    if (!props.attributes) return {};

    const raw = props.attributes?.aspectRatio ?? (typeof props.attributes !== 'object' ? props.attributes : null);
    if (!raw) return {};

    if (typeof raw === 'string' && raw.includes('/')) {
        return { aspectRatio: raw };
    }

    const ratio = parseFloat(raw);
    console.log(ratio);

    if (isNaN(ratio)) return {};
    return { aspectRatio: `${ratio}` };
});

function getAlt(alt) {
    return alt && alt.trim() ? alt : 'Product image';
}
function fallbackImage(e) {
    e.target.src = assetUrl('~/assets/images/no-image.webp');
}
function getValidSrc(src) {
    if (src && typeof src === 'string') return src;
    return fetchFirstProductImage(src);
}
const imageSrc = computed(() => {
    const url = getValidSrc(props.src);
    // Only CDN product images take the transform; local assets and URLs that already carry one are left alone
    if (!props.transformWidth || typeof url !== 'string' || !url.includes('cdn.adiamor.com') || /[?&]tr=/.test(url)) return url;
    return `${url}${url.includes('?') ? '&' : '?'}tr=w-${props.transformWidth},q-80`;
});
</script>