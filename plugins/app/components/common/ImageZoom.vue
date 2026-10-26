<template>
    <div
        class="absolute z-10 bottom-auto left-auto rotate-90 flex gap-4 top-1/2 right-0 -translate-y-1/2 translate-x-[36%] range bg-black/20 px-2">
        <span class="zoom-in text-xl -translate-y-[2px]">+</span>
        <label class="sr-only" for="zoomRange">
            Zoom level
        </label>
        <input id="zoomRange" type="range" min="0.1" max="1" step="0.1" :value="width" @input="zoomSlider"
            aria-valuemin="0.1"
            aria-valuemax="1"
            :aria-valuenow="width"
            aria-label="Zoom level"
        />
        <span class="zoom-out text-xl">-</span>

        <span class="sr-only" aria-live="polite">
            Image zoomed to {{ width * 100 }}%
        </span>
    </div>
</template>
<script>
export default {
    name: 'ImageZoom',
    data() {
        return {
            width: 1,
        }
    },
    methods: {
        zoomSlider(e) {
            const val = e.target.value;
            this.width = val;
            // Set width and height directly from slider value
            this.$emit('zoom', val);
        },
    }
}
</script>
<style scoped>
.range {
    touch-action: auto; /* let native drag work */
}

.range input[type="range"] {
    touch-action: pan-x; /* allow horizontal dragging */
}

.range input[type="range"] {
    -webkit-appearance: none;
    /* Remove default styling (Chrome, Safari, Edge) */
    appearance: none;
    width: 100%;
    background: transparent;
    rotate: 180deg;
    /* Removes the default track fill */
}

.range input[type="range"]::-webkit-slider-runnable-track {
    background: #fff;
    /* Set your custom track background */
    height: 4px;
    border-radius: 2px;
}

.range input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    /* background: #306499; */
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-top: -6px;
    /* Align thumb with track */
    cursor: pointer;
    @apply bg-primary;
}

.range input[type="range"]::-moz-range-track {
    background: #ddd;
    height: 4px;
    border-radius: 2px;
}

.range input[type="range"]::-moz-range-thumb {
    /* background: #306499; */
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    @apply bg-primary;
}

.range input[type="range"]::-ms-track {
    background: transparent;
    border-color: transparent;
    color: transparent;
}

.range input[type="range"]::-ms-fill-lower {
    background: #ddd;
}

.range input[type="range"]::-ms-fill-upper {
    background: #ddd;
}
</style>