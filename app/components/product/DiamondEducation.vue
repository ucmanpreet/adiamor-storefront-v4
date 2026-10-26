<template>
    <section class="pt-6 sm:pt-12">
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-8">
            <header>
                <h2 class="text-xl lg:text-2xl/[50px] font-normal focus:outline-none focus:ring-2 focus:ring-primary/40" tabindex="0">Diamond Education</h2>
            </header>
            <div
                class="flex mx-auto flex-col mt-5 divide-y divide-secondary-200 border-0 sm:border border-gray-200"
                v-if="diamondData && diamondData.education && diamondData.education.length"
                role="list"
            >
                <div
                    class="sm:px-8 py-3 sm:py-5 flex flex-col md:flex-row gap-4 focus:outline-none focus:ring-2 focus:ring-primary/40"
                    v-for="(data, index) in diamondData.education"
                    :key="index"
                    role="listitem"
                    tabindex="0"
                    :aria-label="`${data.type}: ${data.code}. ${data.text}`"
                >
                    <div class="md:w-36 text-left" aria-hidden="true">
                        <h3 class="font-normal text-base uppercase">{{ data.type }}</h3>
                    </div>

                    <div class="relative flex-1 space-y-2" aria-hidden="true">
                        <div
                            class="flex flex-row justify-between uppercase gap-1 sm:gap-2 lg:gap-8 flex-wrap"
                        >
                            <div
                                class="flex-1 font-normal text-xs relative border border-gray-200 flex items-center justify-center gap-1 text-center py-2"
                                v-for="(el, index1) in getTypeArr(data.type)"
                                :key="index1"
                                :class="el.code == data.code ? 'text-white bg-primary border-primary' : 'bg-white'"
                            >
                                {{ el.code }}
                            </div>
                        </div>

                        <p class="text-sm sm:leading-loose">
                            {{ data.text }}
                        </p>
                        <!-- <div class="hidden sm:block absolute inset-0 top-1/2 -translate-y-1/2 h-0.5 bg-black"></div> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
const props = defineProps(['diamondData']);

function getTypeArr(type = null) {
    let educationContent = props.diamondData.education.find((el) => el.type == type);
    if (educationContent) {
        return educationContent.value;
    }
    return [];
}
</script>