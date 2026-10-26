<template>
    <div class="flex-1">
        <div class="max-w-7xl mx-auto pb-6 md:pb-14 px-4 lg:px-8 flex flex-wrap gap-4 sm:gap-6 lg:gap-12">

            <!-- Sidebar navigation -->
            <AboutSidebar />

            <!-- Main content -->
            <div class="flex-1 prose-p:my-2 prose-hr:my-6 prose-strong:font-semibold w-full prose-img:mb-0 prose-h3:mt-2" aria-labelledby="help-center-heading">
                <h1 id="help-center-heading" class="font-normal text-lg md:text-xl lg:text-3xl">Help Center</h1>
                <div
                    class="prose prose-sm prose-a:text-primary prose-h1:font-gill-sans  prose-h2:font-gill-sans prose-h2:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full text-gray-black">

                    <p>Learn more about our company and the services we provide or review our policies and procedures in
                        our
                        customer help center.</p>

                    <div class="grid gap-8">
                        <!-- About Adiamor & Our Services -->
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3>
                                    <NuxtLink
                                        :to="STATIC_ROUTES.ABOUT"
                                        class="text-primary/90 hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                        aria-label="Learn about Adiamor"
                                        @click="$bus.emit('aria-announce','Navigating to About Adiamor page')"
                                    >
                                        About Adiamor
                                    </NuxtLink>
                                </h3>
                                <p class="mt-2">
                                    Learn the history behind what makes our company great and find new ways to get in
                                    touch with us.
                                    We’d love to hear from you!
                                </p>
                                <NuxtLink
                                    :to="STATIC_ROUTES.ABOUT"
                                    class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Learn more about Adiamor"
                                    @click="$bus.emit('aria-announce','Navigating to About Adiamor page')"
                                >
                                    Learn More
                                </NuxtLink>
                                <nuxt-img provider="cdn"
                                    src="/landing-pages/Help%20Center/about_adiamor.webp?updatedAt=1748414581531"
                                    alt="About Adiamor team and company overview"
                                />
                            </div>

                            <div>
                                <h3>
                                    <NuxtLink
                                        :to="STATIC_ROUTES.SERVICES_AFTER_YOU_ORDER"
                                        class="text-primary/90 hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                        aria-label="Learn about our services"
                                        @click="$bus.emit('aria-announce','Navigating to Our Services page')"
                                    >
                                        Our Services
                                    </NuxtLink>
                                </h3>
                                <p class="mt-2">
                                    See our various payment options, our luxury gift packaging, and learn more about
                                    what happens after you order from us.
                                </p>
                                <NuxtLink
                                    :to="STATIC_ROUTES.SERVICES_AFTER_YOU_ORDER"
                                    class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Learn more about our services"
                                    @click="$bus.emit('aria-announce','Navigating to Our Services page')"
                                >
                                    Learn More
                                </NuxtLink>
                                <nuxt-img provider="cdn"
                                    src="/landing-pages/Help%20Center/about_services.webp?updatedAt=1748414582122"
                                    alt="Overview of Adiamor services"
                                />
                            </div>
                        </div>

                        <!-- Our Policies & FAQ -->
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3>
                                    <NuxtLink
                                        :to="STATIC_ROUTES.POLICIES_CONFLICT_FREE"
                                        class="text-primary/90 hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                        aria-label="View our policies"
                                        @click="$bus.emit('aria-announce','Navigating to Our Policies page')"
                                    >
                                        Our Policies
                                    </NuxtLink>
                                </h3>
                                <p class="mt-2">
                                    Review our policies about your privacy, our 30-day money-back guarantee, our stance
                                    on conflict-free diamonds, and much more.
                                </p>
                                <NuxtLink
                                    :to="STATIC_ROUTES.POLICIES_CONFLICT_FREE"
                                    class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Learn more about our policies"
                                    @click="$bus.emit('aria-announce','Navigating to Our Policies page')"
                                >
                                    Learn More
                                </NuxtLink>
                                <nuxt-img provider="cdn"
                                    src="/landing-pages/Help%20Center/about_policy.webp?updatedAt=1748414581270"
                                    alt="Adiamor policies and guarantees"
                                />
                            </div>

                            <div>
                                <h3>
                                    <NuxtLink
                                        :to="STATIC_ROUTES.FAQ"
                                        class="text-primary/90 hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                        aria-label="View frequently asked questions"
                                        @click="$bus.emit('aria-announce','Navigating to Frequently Asked Questions page')"
                                    >
                                        Frequently Asked Questions
                                    </NuxtLink>
                                </h3>
                                <p class="mt-2">
                                    Find answers to many of our most commonly asked questions about orders, shipments,
                                    our business, and diamonds in general.
                                </p>
                                <NuxtLink
                                    :to="STATIC_ROUTES.FAQ"
                                    class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Learn more from frequently asked questions"
                                    @click="$bus.emit('aria-announce','Navigating to Frequently Asked Questions page')"
                                >
                                    Learn More
                                </NuxtLink>
                                <nuxt-img provider="cdn"
                                    src="/landing-pages/Help%20Center/about_adiamor.webp?updatedAt=1748414581531"
                                    alt="Frequently asked questions about Adiamor"
                                />
                            </div>
                        </div>

                        <!-- Contact Information -->
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3>
                                    <NuxtLink
                                        :to="STATIC_ROUTES.CONTACT"
                                        class="text-primary/90 hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                        aria-label="Contact Adiamor by phone"
                                        @click="$bus.emit('aria-announce','Navigating to Contact page')"
                                    >
                                        Contact By Phone
                                    </NuxtLink>
                                </h3>
                                <p class="mt-2">
                                    <strong>US &amp; Canadian Customers:</strong>
                                    <a href="tel:8776275094" class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary">
                                        877-627-5094
                                    </a><br />
                                    <strong>UK Customers:</strong>
                                    <a href="tel:08081012794" class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary">
                                        0808-101-2794
                                    </a><br />
                                    <strong>Australia Customers:</strong>
                                    <a href="tel:1800821917" class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary">
                                        1-800-821-917
                                    </a><br />
                                    <strong>Other International Customers:</strong>
                                    <a href="tel:+12136275057" class="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary">
                                        +1-213-627-5057
                                    </a>
                                </p>
                            </div>

                            <div>
                                <h3>
                                    <NuxtLink
                                        :to="STATIC_ROUTES.CONTACT"
                                        class="text-primary/90 hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                        aria-label="Contact Adiamor by email"
                                        @click="$bus.emit('aria-announce','Navigating to Contact page')"
                                    >
                                        Contact By Email
                                    </NuxtLink>
                                </h3>
                                <p class="mt-2">
                                    <strong>Customer Sales &amp; Service:</strong>
                                    <a href="mailto:service@adiamor.com"
                                        class="text-primary hover:underline">service@adiamor.com</a><br />
                                    <strong>Live Chat:</strong>
                                    <a href="https://server4.clickandchat.com/chat/chatstart.htm?domain=www.adiamor.com"
                                        class="text-primary hover:underline"
                                        target="_blank"
                                        rel="noopener"
                                        aria-label="Start live chat with Adiamor (opens in new window)"
                                    >
                                        Click to Chat
                                    </a>
                                </p>
                            </div>
                        </div>

                        <!-- Gift Guide Section -->
                        <div class="relative flex">
                            <div class="w-9/12">
                                <h3 class="text-2xl">Gift Guide</h3>
                                <p class="mt-2 max-w-md">
                                    From weddings and anniversaries to birthdays and graduations, let us help you find
                                    the perfect gift for any occasion.
                                </p>
                                <NuxtLink
                                    :to="STATIC_ROUTES.EDUCATION_GIFT_GUIDE"
                                    class="mt-4 inline-block text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary"
                                    aria-label="Learn more about our gift guide"
                                    @click="$bus.emit('aria-announce','Navigating to Gift Guide page')"
                                >
                                    Learn More
                                </NuxtLink>
                            </div>
                            <div class="w-3/12 -mt-12">
                                <nuxt-img provider="cdn" src="/landing-pages/Help%20Center/jeweleduc_gift.webp?updatedAt=1748414810867"
                                    class="w-full h-full object-cover object-top" alt="Jewelry gift guide collection"/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AboutSidebar from '~/components/layout/AboutSidebar.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
    name : "CustomerServicePage",
    components: { AboutSidebar },
    data(){
        return {
            STATIC_ROUTES
        }
    },
    mounted() {
        console.log(this.$route.params.slug);
        this.$bus.emit(
            'aria-announce',
            'Help Center page loaded. Browse company information, services, policies, frequently asked questions, and contact options.'
        );
    }
}
</script>