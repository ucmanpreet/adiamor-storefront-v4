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
<script>
export default {
    name : 'ProngStyle',
    props: {
        variants: {
            type: Array,
            required: true,
        },
        selectedSku: {
            type: [ String, Number ],
            default: '',
        }
    },
    data() {
        return {
            selectedShape: '',
            hoverSelectedShape: 'Not Sure',
        };
    },
    methods: {
        selectOption(option) {
            if (!option) {
                this.selectedShape = '';
                this.hoverSelectedShape = 'Not Sure';
                this.$emit('option-selected', null);
                return;
            }
            this.selectedShape = option.name;       // track selected option
            this.hoverSelectedShape = option.name;  // update hover display
            this.$emit('option-selected', option);
        },
        handleMouseEnter(option) {
            this.hoverSelectedShape = option?.name || 'Not Sure';
        },
        handleMouseLeave() {
            // fallback to selectedShape
            this.hoverSelectedShape = this.selectedShape || 'Not Sure';
        },
        getImage(name) {
            let img = name?.replace(' ', '-').toLowerCase();
            if (img) {
                return assetUrl(`~/assets/images/${img}.jpg`);
            }
        },
    },
};
</script>