<template>
    <div>
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pb-6 md:pb-14 flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-12">
            <!-- Sidebar navigation -->
            <AboutSidebar />

            <div class="flex-1">
                <article class="space-y-4 md:space-y-6">
                    <header>
                        <h2 class="font-normal text-lg md:text-xl lg:text-3xl">About Adiamor</h2>
                        <p class="mt-2.5 text-sm">An engagement ring is no ordinary ring.</p>
                    </header>
                    <div class="prose prose-sm md:leading-7 max-w-full prose-a:text-primary">
                        <section class="mb-6 flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-8">
                            <button
                                type="button"
                                class="flex-1 p-0 border-0 bg-transparent text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                aria-label="Watch the video: Your Engagement Ring, Hand Made in Los Angeles"
                                @click="
                                    $bus.emit('aria-announce', 'Watch the video: Your Engagement Ring, Hand Made in Los Angeles');
                                    showVideoModal = true;
                                "
                            >
                                <nuxt-img provider="cdn" src="/landing-pages/DSC_9167.jpg?updatedAt=1745555147523" class="my-0 w-full h-full object-cover" alt="Adiamor"/>
                            </button>
                            <div class="flex-1">
                                <h2 class="font-normal text-lg mt-0">Your Engagement Ring, Hand Made in Los Angeles</h2>
                                <p class="mt-2.5 text-sm">We showcase how we bring your custom engagement rings to life.</p>
                                <button
                                    type="button"
                                    class="text-primary underline cursor-pointer p-0 border-0 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    @click="
                                        $bus.emit('aria-announce', 'Watch the video: Your Engagement Ring, Hand Made in Los Angeles');
                                        showVideoModal = true;
                                    "
                                >
                                    Watch the video
                                </button>
                            </div>
                        </section>
                        <div class="prose prose-sm prose-a:text-primary md:leading-7 max-w-full">
                            <p>At Adiamor, we believe that every piece of jewelry should reflect the individuality and
                                style of the person wearing it. For over five decades, we have specialized in crafting
                                high-quality diamond jewelry, including engagement rings and custom-designed wedding
                                bands. Our name, inspired by “A Day of Love,” underscores our commitment to helping
                                customers celebrate their most meaningful moments.</p>

                            <p>Today, Adiamor is an established online retailer, offering expertly made, hand-crafted
                                jewelry at competitive prices. Our team consists of skilled jewelers, artisans, and
                                GIA-trained gemologists, all dedicated to upholding the highest standards of quality and
                                craftsmanship. By managing all production in-house, we ensure meticulous attention to
                                detail in every piece we create.</p>

                            <p>Located in Los Angeles' historic jewelry district, we invite customers to schedule
                                private appointments to view our collections and collaborate with our experts. Whether
                                you're shopping online or visiting us in person, our goal is to provide a thoughtful,
                                personalized experience to help you find the perfect piece of jewelry. If you have any
                                questions or would like to set up an appointment, please call us at 
                                <a :href="`tel:${telPhoneNumber}`"
                                    :aria-label="`call us at ${phoneNumber}`"
                                >{{phoneNumber}}</a> or email us at
                                <a href="mailto:service@adiamor.com"
                                    aria-label="Email us at service@adiamor.com"
                                    @click="$bus.emit('aria-announce', 'Navigating to Email service@adiamor.com')"
                                    >service@adiamor.com
                                </a>.
                            </p>
                            <p>Want to know more? Check out our reasons <a :href="whyShopPath" @click="$bus.emit('aria-announce', 'Navigating to Why you should shop at Adiamor')">why you should shop at Adiamor</a>.</p>
                        </div>
                        <div class="flex flex-wrap flex-row -mx-2 md:-mx-3">
                            <nuxt-img provider="cdn" class="not-prose" src="/landing-pages/about-us/image2.webp?updatedAt=1748411362365" alt="Adiamor jewelry craftsmanship"/>
                            <nuxt-img provider="cdn" class="not-prose" src="/landing-pages/about-us/image1.webp?updatedAt=1748411363684" alt="Adiamor jewelry design"/>
                        </div>
                    </div>
                </article>

                <article class="pt-7 space-y-2.5">
                    <header>
                        <h2 id="history" class="font-normal text-lg md:text-xl lg:text-3xl">Our History</h2>
                    </header>
                    <div class="prose prose-sm md:leading-7 max-w-full">
                        <div>
                            <p>Adiamor's story begins with its founder, Avo Sarkisian, who started his education in
                                diamond setting at just eight years old in Istanbul, Turkey, during the 1950s. To help
                                his mother support the family, Avo began his apprenticeship at a young age, working
                                alongside master jewelers.  His early experiences in the trade shaped the values of
                                craftsmanship and attention to detail that would later define Adiamor’s approach to
                                jewelry making.</p>

                            <p>After emigrating to the United States, Avo opened his first jewelry store in the 1980s on
                                the iconic Rodeo Drive in Beverly Hills. Specializing in pavé designs, he earned a
                                reputation for quality craftsmanship, with a clientele that included both local
                                customers and notable figures. Avo’s hands-on approach and commitment to creating
                                custom-made jewelry set the tone for what would become Adiamor’s core values.</p>

                            <nuxt-img provider="cdn" src="/landing-pages/about-us/family-history.webp?updatedAt=1748411504043" class="shadow not-prose"
                                alt="Adiamor Family History"/>

                            <p>In 1998, Adiamor transitioned to the online market, making its handcrafted jewelry
                                accessible to a wider audience. Now operating out of Los Angeles’ jewelry district, the
                                business continues to be run by Avo’s son, Sam Sarkisian, who took over daily operations
                                in the early 2000s with Avo continuing to personally set diamonds until his retirement.
                                Although the business has grown, Adiamor remains focused on maintaining in-house
                                production and direct customer engagement to ensure the quality and service that have
                                always been central to its success.</p>

                            <p>With more than 25 years of experience in online retail, Adiamor continues to build on its
                                family tradition of excellence, offering finely crafted, custom jewelry with a
                                commitment to quality that has been present from the start.</p>
                        </div>
                    </div>
                </article>
            </div>
        </div>

        <Modal v-if="showVideoModal" @close="showVideoModal = false" heading="Your Engagement Ring, Hand Made in Los Angeles" max-width-class="max-w-4xl">
            <video
                :src="videoUrl"
                controls
                class="aspect-video w-full"
                playsinline
                autoplay
            />
        </Modal>
    </div>
</template>
<script setup>
import Modal from '~/components/ui/Modal.vue';
import AboutSidebar from '~/components/layout/AboutSidebar.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const store = useMainStore();
const config = useRuntimeConfig().public;
const { $bus } = useNuxtApp();

const showVideoModal = ref(false);
const whyShopPath = STATIC_ROUTES.WHY_SHOP;

onMounted(() => {
    $bus.emit("aria-announce", "About Adiamor page")
});

const videoUrl = computed(() => `${config?.cdnPrefix || ''}Media/adiamor-manufacturing-engagement-ring.webm`);
const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));
</script>
