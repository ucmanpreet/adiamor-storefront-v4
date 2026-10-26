<template>
    <div class="relative space-y-3 mt-5">
        <div class="flex items-center justify-between mb-2">
            <label for="ringSize" class="text-sm"><span class="font-medium">Prong Style:</span> {{ hoverSelectedShape }}</label>
        </div>
        <div class="flex gap-3 px-0">
            <button type="button" @click="selectOption(null)" @keydown.enter.prevent="selectOption(null)" @keydown.space.prevent="selectOption(null)" @mouseover="hoverSelectedShape = 'Not Sure'" class="py-1 px-3 text-sm" :class="selectedSku == '' ? 'ring-1 ring-gray-500 bg-white' : 'bg-gray-50'" aria-pressed="true">Not Sure</button>
            <template v-if="variants?.length">
                <div class="text-center space-y-1 mt-1" v-for="(item, index3) in variants" :key="index3">
                    <label :class="selectedSku == item?.sku ? 'ring-1 ring-gray-500 rounded-full overflow-hidden' : ''" :aria-label="item?.name" class="relative -m-0.5 inline-flex cursor-pointer items-center justify-center p-0.5 focus:outline-none"
                        @mouseenter="handleMouseEnter(item)" @mouseleave="handleMouseLeave" >
                            <!-- Hidden Radio Input -->
                            <input 
                                type="radio" 
                                name="prong-style" 
                                :value="item" 
                                class="sr-only"
                                :checked="selectedSku === item?.sku"
                                @change="selectOption(item)"
                            >

                            <!-- Image -->
                            <img 
                                :src="getImage(item.name)" 
                                :alt="item?.name || 'Prong style image'" 
                                class="w-8 h-8"
                                tabindex="0"
                                @keydown.enter.prevent="selectOption(item)"
                                @keydown.space.prevent="selectOption(item)"
                            />
                    </label>
                </div>
            </template>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    variants: {
        type: Array,
        required: true,
    },
    selectedSku: {
        type: [ String, Number ],
        default: '',
    }
});
const emit = defineEmits(['option-selected']);

const selectedShape = ref('');
const hoverSelectedShape = ref('Not Sure');

function selectOption(option) {
    if (!option) {
        selectedShape.value = '';
        hoverSelectedShape.value = 'Not Sure';
        emit('option-selected', null);
        return;
    }
    selectedShape.value = option.name;       // track selected option
    hoverSelectedShape.value = option.name;  // update hover display
    emit('option-selected', option);
}

function handleMouseEnter(option) {
    hoverSelectedShape.value = option?.name || 'Not Sure';
}

function handleMouseLeave() {
    // fallback to selectedShape
    hoverSelectedShape.value = selectedShape.value || 'Not Sure';
}

function getImage(name) {
    let img = name?.replace(' ', '-').toLowerCase();
    if (img) {
        return assetUrl(`~/assets/images/${img}.jpg`);
    }
}
</script>