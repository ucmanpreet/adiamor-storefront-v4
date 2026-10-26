<template>
    <div>
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pb-6 md:pb-14 flex flex-wrap gap-4 sm:gap-6 lg:gap-12">
            <!-- Sidebar navigation -->
            <AboutSidebar />

            <!-- Main content -->
            <div class="flex-1">
                <article class="space-y-4 md:space-y-10 divide-y divide-gray-200">
                    <header>
                        <h2 class="font-normal text-lg md:text-xl lg:text-3xl">Why Shop At Adiamor</h2>
                    </header>
                    <div class="prose prose-sm prose-a:text-primary prose-h2:font-gill-sans prose-h2:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full">
                        <div>
                            <h2>tremendous selection</h2>
                            <p>
                                Adiamor has close to 150,000 diamonds listed online and an
                                exceptional selection of fine diamond jewelry. As fine jewelry
                                manufacturers, it is nearly impossible to list all of our
                                available items online. If you are having trouble finding what
                                you want, please call one of our jewelry experts and we'll be
                                happy to assist you.
                            </p>
                            <h2>excellent quality</h2>
                            <p>
                                Adiamor takes great pride in the quality and workmanship of all
                                our products. We use only the finest diamonds in our jewelry and
                                all of our items are manufactured with a minimum of G/H color and
                                VS clarity.
                            </p>
                            <h2>outstanding value</h2>
                            <p>
                                As direct diamond importers and jewelry manufacturers, we pass
                                the savings along to you. You benefit with lower prices by having
                                your jewelry created from start to finish by one company.
                            </p>
                            <h2>30-day return policy</h2>
                            <p>
                                Your satisfaction is our number one priority. If you are not
                                happy with your selection for any reason, you have 30 days to
                                receive a full refund.
                            </p>
                            <h2>secure shopping</h2>
                            <p>
                                Adiamor uses the latest encryption technology to protect your
                                online purchase. All transactions go through industry standard
                                security methods to ensure that your credit card and personal
                                information are protected.
                            </p>
                            <h2>expert guidance</h2>
                            <p>
                                Adiamor understands that finding your engagement ring or diamond
                                jewelry can be a difficult task. Rest assured that our trained
                                professionals will be with you every step of the way to make sure
                                that you get exactly what you want at a price you can afford.
                            </p>
                            <h2>free shipping</h2>
                            <p>
                                Adiamor offers free shipping worldwide on all orders over $250.
                            </p>
                            <NuxtLink
                                :to="STATIC_ROUTES.POLICIES_SHIPPING"
                                class="text-blue-600 underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label="View shipping policy"
                                @click="$bus.emit('aria-announce', 'Navigating to Shipping Policy page')"
                            >
                                View Shipping Policy
                            </NuxtLink>
                            <hr />
                            <p>
                                We have trained professionals waiting to answer any questions or
                                help you find that perfect diamond or jewelry gift. You can call
                                us toll-free at
                                <a
                                    :href="`tel:${telPhoneNumber}`"
                                    class="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    :aria-label="`Call ${phoneNumber}`"
                                    @click="$bus.emit('aria-announce', `Calling ${phoneNumber}`)"
                                >
                                    {{ phoneNumber }}
                                </a>
                                or e-mail us at
                                <a
                                    href="mailto:service@adiamor.com"
                                    class="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Email service at adiamor dot com"
                                    @click="$bus.emit('aria-announce', 'Opening email to service at adiamor dot com')"
                                >
                                    service@adiamor.com
                                </a>.
                            </p>
                            <p>
                                Now that you're familiar with Adiamor, start searching for your
                                perfect
                                <NuxtLink
                                    :to="STATIC_ROUTES.DIAMONDS_SEARCH"
                                    class="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Browse diamonds"
                                    @click="$bus.emit('aria-announce', 'Navigating to Diamonds search page')"
                                >
                                    diamond
                                </NuxtLink>,
                                <NuxtLink
                                    :to="STATIC_ROUTES.ENGAGEMENT_RINGS"
                                    class="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Browse engagement rings"
                                    @click="$bus.emit('aria-announce', 'Navigating to Engagement Rings page')"
                                >
                                    engagement ring
                                </NuxtLink>
                                or
                                <NuxtLink
                                    :to="STATIC_ROUTES.WEDDING_RINGS"
                                    class="text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Browse wedding bands"
                                    @click="$bus.emit('aria-announce', 'Navigating to Wedding Bands page')"
                                >
                                    wedding band
                                </NuxtLink>
                                today!
                            </p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </div>
</template>
<script>
import AboutSidebar from "~/components/layout/AboutSidebar.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name : 'WhyShopAtAdiamor',
    components: { AboutSidebar },
    data() {
        return {
            STATIC_ROUTES,
        };
    },
    mounted() {
        this.$bus.emit('aria-announce', 'Why Shop At Adiamor page loaded');
    },
    computed: {
        phoneNumber() {
            return this.$store.state.phoneNumber;
        },
        telPhoneNumber() {
            return this.$store.state.phoneNumber?.replace(/[^+\d]/g, '');
        },
    },
};
</script>
