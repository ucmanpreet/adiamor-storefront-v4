<template>
    <div>
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pb-6 md:pb-14 flex flex-wrap gap-4 sm:gap-6 lg:gap-12">
            <!-- Sidebar navigation -->
            <AboutSidebar />

            <!-- Testimonials -->
            <section class="flex-1" aria-labelledby="testimonials-heading">
                <header class="flex flex-wrap gap-3 items-center justify-between">
                    <h1 id="testimonials-heading" class="text-lg font-normal md:text-3xl flex-1">Adiamor Reviews and Testimonials
                        <small class="sm:mt-2 block text-sm font-light max-w-2xl">At Adiamor, service and customer satisfaction are our number one priority. Please read what some of our satisfied customers had to say about their experience below or from the following websites:</small>
                    </h1>
                    <ul class="flex sm:flex-wrap items-center gap-2 sm:gap-4 ml-auto">
                        <li class="bizrate">
                            <a
                                href="http://www.bizrate.com/reviews/adiamor/97604/"
                                target="_blank"
                                rel="noopener"
                                aria-label="View Adiamor reviews on Bizrate in new tab"
                                @click="$bus.emit('aria-announce', 'Opening Bizrate reviews in new tab')"
                                class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <img
                                    alt="bizrate"
                                    class="h-12"
                                    :src="$asset('~/assets/images/product-review/coe_gold_2022.webp')"
                                >
                            </a>
                        </li>
                        <li class="bbb">
                            <a
                                href="https://www.bbb.org/losangelessiliconvalley/business-reviews/jewelers-retail/adiamor-in-los-angeles-ca-13137794"
                                target="_blank"
                                rel="noopener"
                                aria-label="View Adiamor Better Business Bureau rating in new tab"
                                @click="$bus.emit('aria-announce', 'Opening Better Business Bureau rating in new tab')"
                                class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <img
                                    alt="Better Business Bureau"
                                    class="h-10"
                                    :src="$asset('~/assets/images/product-review/cbbb-badge-horz.webp')"
                                >
                            </a>
                        </li>
                        <li class="ivouch">
                            <a
                                href="https://www.yelp.com/biz/adiamor-los-angeles"
                                target="_blank"
                                rel="noopener"
                                aria-label="View Adiamor Yelp reviews in new tab"
                                @click="$bus.emit('aria-announce', 'Opening Yelp reviews in new tab')"
                                class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <img
                                    alt="Yelp"
                                    class="h-12"
                                    :src="$asset('~/assets/images/product-review/yelp-2c.webp')"
                                >
                            </a>
                        </li>
                        <li class="weddingwire">
                            <a
                                href="https://g.page/r/CSQ8X28kVq8EEBM/review"
                                target="_blank"
                                rel="noopener"
                                aria-label="View Adiamor Google reviews in new tab"
                                @click="$bus.emit('aria-announce', 'Opening Google reviews in new tab')"
                                class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <img alt="Google Review" class="h-6"
                                    :src="$asset('~/assets/images/product-review/google-reviews.webp')">
                                <div src="https://www.google.com/shopping/customerreviews/badge?usegapi=1&amp;merchant_id=1157966&amp;hl=en-US&amp;origin=https%3A%2F%2Fwww.adiamor.com&amp;gsrc=3p&amp;ic=1&amp;jsh=m%3B%2F_%2Fscs%2Fabc-static%2F_%2Fjs%2Fk%3Dgapi.lb.en._ShUtMH1OvQ.O%2Fam%3DAABA%2Fd%3D1%2Frs%3DAHpOoo9sEd_Wjj_xEtgO8qX69P7hAZI9cg%2Fm%3D__features__#_methods=onPlusOne%2C_ready%2C_close%2C_open%2C_resizeMe%2C_renderstart%2Concircled%2Cdrefresh%2Cerefresh&amp;id=I0_1724648825173&amp;_gfid=I0_1724648825173&amp;parent=https%3A%2F%2Fwww.adiamor.com&amp;pfname=&amp;rpctoken=35588844"
                                    data-gapiattached="true" title="Google Customer Reviews"></div>
                            </a>
                        </li>
                        <li class="knot">
                            <a
                                target="_blank"
                                rel="noopener"
                                href="http://www.theknot.com/marketplace/adiamor-los-angeles-ca-972594"
                                aria-label="View Adiamor profile on The Knot in new tab"
                                @click="$bus.emit('aria-announce', 'Opening The Knot profile in new tab')"
                                class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <MediaImage :src="$asset('~/assets/images/product-review/c8633e9d-8826-47cc-8e1b-2ade19b8df96~rs_180.180.webp')"
                                    className="h-10 w-auto" width="70" height="70" alt="The Knot Best of Weddings - 2017 Pick"/>
                            </a>
                        </li>
                    </ul>
                </header>

                <!-- Loader -->
                <div
                    class="py-24 w-full relative flex item-center justify-center"
                    v-if="loading"
                    role="status"
                    aria-live="polite"
                >
                    <CustomLoader />
                </div>

                <!-- Yotpo -->
                <ClientOnly>
                <div
                    id="yotpo-testimonials-custom-tab"
                    data-yotpo-element-id="1"
                    class="-mx-2"
                    aria-live="polite"
                ></div>
                </ClientOnly>
            </section>
        </div>

        <!-- As Featured In -->
        <ProductFeature type="home" />

        <!-- Contact Links -->
        <ContactLink />

    </div>
</template>

<script setup>
import AboutSidebar from "~/components/layout/AboutSidebar.vue";
import CustomLoader from "~/components/ui/CustomLoader.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import ProductFeature from '~/components/product/ProductFeature.vue';
import MediaImage from "~/components/common/MediaImage.vue";

const { $bus } = useNuxtApp();

const loading = ref(true);

onMounted(() => {
    $bus.emit('aria-announce', 'Testimonials page loaded');

    nextTick(() => {
        loading.value = false;
        $bus.emit('aria-announce', 'Customer testimonials loaded');
    });
});
</script>