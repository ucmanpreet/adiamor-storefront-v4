<template>
    <div>
        <!-- Screen Reader Live Region -->
        <div
            class="sr-only"
            aria-live="polite"
            aria-atomic="true"
        >
            {{ liveMessage }}
        </div>

        <!-- Alphabet Navigation -->
        <nav aria-label="Glossary alphabet filter">
            <ul class="pl-0 list-none flex flex-wrap border-y border-gray-50">
                <li
                    v-for="(letter, index) in alphabet"
                    :key="index"
                >
                    <button
                        type="button"
                        class="px-2 py-0.5 cursor-pointer font-semibold hover:text-black uppercase"
                        :class="{
                        'term-open text-primary bg-primary/10': selectedLetter === letter || getTermData?.letter === letter,
                        'text-black/50': selectedLetter !== letter
                        }"
                        :aria-current="selectedLetter === letter ? 'true' : null"
                        @click="selectLetter(letter)"
                    >
                        {{ letter }}
                    </button>
                </li>

                <!-- ALL option -->
                <li>
                    <button
                        type="button"
                        class="px-2 py-0.5 cursor-pointer font-semibold hover:text-black uppercase"
                        :class="{
                        'term-open text-primary bg-primary/10': selectedLetter === 'all',
                        'text-black/50': selectedLetter !== 'all'
                        }"
                        :aria-current="selectedLetter === 'all' ? 'true' : null"
                        @click="selectLetter('all')"
                    >
                    all
                    </button>
                </li>
            </ul>
        </nav>

        <!-- Glossary Terms -->
        <ul id="glossary_anchor_index" class="list-none pl-0" aria-live="polite" v-if="filteredTerms.length">
            <li v-for="(term, index) in filteredTerms" :key="index" :data-letter="term.letter" :data-term="term.slug">
                <NuxtLink :to="`${term.slug.replace(/ /g, '-')}/`">{{ term.title }}</NuxtLink>
            </li>
        </ul>

        <!-- Single Term View -->
        <div v-else-if="getTermData?.slug" class="flex flex-col lg:flex-row gap-3">
            <div class="max-w-2xl order-1 lg:order-0">
                <h2 class="text-xl">
                    <NuxtLink class="font-semibold" :to="`${STATIC_ROUTES.EDUCATION_GLOSSARY}${getTermData?.letter}/`"> {{ getTermData?.letter }} </NuxtLink> > {{ getTermData?.title }}
                </h2>

                <!-- Description -->
                <div class="cursor-pointer" v-html="$sanitize(getTermData?.description)" aria-label="Glossary term description"></div>
                
                <!-- See Also -->
                <div class="flex" v-if="getTermData?.seeAlso">
                    <p class="py-3">See Also: </p>
                    <ul class="list-none flex pl-0 capitalize" :class="{'flex-col item-start' : !Array.isArray(getTermData?.seeAlso)}">
                        <li class="flex gap-2" v-for="(item, index) in getTermData?.seeAlso" :key="index">
                            <span v-if="!Array.isArray(getTermData?.seeAlso)"> {{ index }}: </span>
                            <template v-if="Array.isArray(item)">
                                <span v-for="(v, i) in item" :key="i">
                                    <NuxtLink :to="getSubRedirectUrl(v)"> {{ formattedString(v) || v }} </NuxtLink>
                                </span>
                            </template>
                            <template v-else>
                                <NuxtLink :to="getSubRedirectUrl(item)"> {{ formattedString(item) || item }} </NuxtLink>
                            </template>
                        </li>
                    </ul>
                </div>

                <NuxtLink class="font-semibold" :to="`${getTermData?.link}`" v-if="getTermData?.findMore"> {{ getTermData?.findMore == true ? 'Find out more' : getTermData?.findMore }} </NuxtLink>
            </div>

            <!-- Images -->
            <div class="aspect-auto lg:aspect-square max-w-sm order-0 lg:order-1">
                <img
                    v-for="(img, index) in termImages"
                    :key="index"
                    class="w-full h-full object-contain"
                    :src="`${getTermData.imagePrefix ? $config?.public?.staticPrefix : $config?.public?.cdnPrefix}${img}`"
                    :alt="getTermData?.slug"
                >
            </div>
        </div>
        <NoDataFound v-else type="glossary" />
    </div>
</template>

<script setup>
import { STATIC_ROUTES } from '~/utils/staticRoutes.js';
import { glossaryData as glossaryTerms } from '../static/js/glossaryList.js';
import NoDataFound from "~/components/common/NoDataFound.vue";

const route = useRoute();
const router = useRouter();

const selectedLetter = ref("a"); // Default selected letter
const alphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // Available letters
const glossaryData = ref(glossaryTerms);
const liveMessage = ref("");

const filteredTerms = computed(() => {
    if (selectedLetter.value === "all") {
        return glossaryData.value;
    }
    let data = glossaryData.value.filter(
        (item) => item.letter === selectedLetter.value
    );
    return data?.length ? data : [];
});
const getTermData = computed(() => {
    return glossaryData.value.find((item) => item.slug === selectedLetter.value);
});
const getLastSlug = computed(() => {
    const path = route.path;
    const cleanPath = path.replace(/\/+$/, ''); // remove trailing slash(es)

    return cleanPath.split('/').pop();
});
const termImages = computed(() => {
    let img = getTermData.value?.image;
    return Array.isArray(img) ? img : img ? [img] : [];
});

function formattedString(slug) {
    return String(slug)
        .toLowerCase()
        .replace(/-/g, ' ');
}
function getSubRedirectUrl(slug) {
    const formattedSlug = String(slug)
        .toLowerCase()
        .replace(/ /g, '-');

    const firstLetter = formattedSlug.charAt(0);

    return `${STATIC_ROUTES.EDUCATION_GLOSSARY}${firstLetter}/${formattedSlug}/`;
}
function selectLetter(letter) {
    selectedLetter.value = letter;
    liveMessage.value = `Showing glossary terms for letter ${letter}.`;
    // Update the slug
    router.push({
        path: `${STATIC_ROUTES.EDUCATION_GLOSSARY}${letter}/`,
    });
}

watch(filteredTerms, (newVal) => {
    if (newVal?.length) {
        liveMessage.value = `${newVal.length} terms found.`;
    } else {
        liveMessage.value = `No terms found.`;
    }
});

onMounted(() => {
    selectedLetter.value = getLastSlug.value;
});
</script>