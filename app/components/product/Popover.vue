<template>
    <div
        :class="`absolute ${placementClasses} bg-black text-white border border-gray-200 shadow-2xl p-4 w-64 translate-y-4 z-30`"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        :aria-labelledby="heading ? `popover-heading-${uid}` : null"
        :aria-label="heading ? null : 'More information'"
        @keydown.esc.prevent="closeModal"
    >
        <div class="flex items-start justify-between gap-2" v-if="heading">
            <h3 :id="`popover-heading-${uid}`" class="!font-medium !mt-0 pb-2 text-base text-current">{{ heading }}</h3>
            <button
                type="button"
                class="flex-shrink-0 text-xl text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                aria-label="Close"
                @click="closeModal"
            ><span aria-hidden="true">&times;</span></button>
        </div>
        <div class="relative z-10">
           <slot></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    product: {
        type: Object,
        default: () => ({})
    },
    heading: {
        type: String,
        default: ''
    },
    placement: {
        type: String,
        default: 'center'
    }
});
const emit = defineEmits(['close']);
const uid = useId();

const placementClasses = computed(() => {
    const semanticMap = {
        right: 'top-2 right-0',
        left: 'top-2 left-0',
        top: 'top-0 left-0 right-0',
        bottom: 'bottom-0 left-0 right-0',
        center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
    };
    const value = (props.placement || '').trim();
    if (semanticMap[value]) {
        return semanticMap[value];
    }
    return value || semanticMap.right;
});

function closeModal() {
    emit('close');
}

function onClickOutside() {
    emit('close');
}
</script>
