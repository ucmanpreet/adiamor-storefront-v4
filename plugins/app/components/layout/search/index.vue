<template>
    <section>
        <header v-if="checkBannerCondition" class="space-y-4 pb-8">
            <!-- Page main heading -->
            <h1 class="text-base sm:text-2xl uppercase text-center">{{  getMetaState?.page_title ?? checkBannerCondition?.title }}</h1>

            <div class="text-white" :style="{ backgroundColor: `${checkBannerCondition?.bg_color}` }">
                <div class="max-w-7xl mx-auto w-full">
                    <div class="flex flex-col sm:flex-row items-center justify-between px-4 lg:px-8">
                        <div class="flex-1 aspect-square max-h-[26rem] w-full">
                            <MediaImage :src="checkBannerCondition?.banner_image" loading="lazy"
                                className="w-full h-full object-cover" :alt="checkBannerCondition?.title || 'Banner image'"/>
                        </div>
                        <div class="flex-1 text-center px-2 sm:px-8 space-y-4 py-4 lg:py-8">
                            <!-- Secondary heading -->
                            <h2 class="text-base sm:text-2xl uppercase">{{ checkBannerCondition?.title }}</h2>
                            <p class="text-sm">{{ checkBannerCondition?.description }}</p>
                            <Link colorType="primary" v-show="checkBannerCondition?.forward_link"
                                :href="checkBannerCondition?.forward_link">{{ checkBannerCondition?.forward_link_text }}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Fallback Header -->
        <header v-else class="block pb-4 sm:pb-8 text-center space-y-3">
            <h1 class="text-base sm:text-2xl uppercase">{{ getMetaState?.page_title }}</h1>
            <p v-if="getMetaState?.description" class="text-sm max-w-4xl m-auto px-8 line-clamp-2 sm:line-clamp-none" v-html="$sanitize(getMetaState?.description)"></p>
        </header>
    </section>
</template>
<script>
import bannerData from '@/static/js/searchBanners.js';
import Link from '~/components/ui/Link.vue';
import MediaImage from '~/components/common/MediaImage.vue';
import { cleanPostfix } from '~/utils/universalHelper';
export default {
    name: 'SearchHeader',
    components: { Link, MediaImage },
    computed: {
        checkBannerCondition() {
            return (bannerData[cleanPostfix(this.$route.params?.postfix?.toLowerCase())] || bannerData[this.$route.params?.postfix?.toLowerCase()]);
        },
        getMetaState() {
            return this.$store.state.metaData || this.$store.getters.getMetaData;
        },
    },
}
</script>