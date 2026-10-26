<template>
    <div class="flex-1">
        <div class="max-w-7xl mx-auto pb-6 md:pb-14 px-4 lg:px-8 flex flex-wrap gap-4 sm:gap-6 lg:gap-12">
            <!-- Sidebar navigation -->
            <AboutSidebar />

            <!-- Main content -->
            <div class="flex-1 prose-p:my-2 prose-hr:my-6 prose-strong:font-semibold w-full prose-img:mb-0 prose-h3:mt-2" aria-labelledby="faq-heading">
                <h2 id="faq-heading" class="font-normal text-lg md:text-xl lg:text-3xl">Frequently Asked Questions</h2>
                <div class="prose prose-sm prose-a:text-primary prose-h1:font-gill-sans prose-h2:font-gill-sans prose-h2:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 prose-h3:mt-7 max-w-full text-gray-black prose-h3:font-medium">
                    <h2>Our Jewelry</h2>

                    <h3>How many years has Adiamor been in business?</h3>
                    <p>
                        Adiamor has been serving customers on the web since 1999. However, Its parent company has been
                        manufacturing jewelry since 1950.
                        <br>
                        Read More: <NuxtLink :to="STATIC_ROUTES.ABOUT" @click="$bus.emit('aria-announce','Navigating to About Adiamor page')">About Adiamor</NuxtLink>
                    </p>

                    <h3>Are all your ring styles listed online?</h3>
                    <p>
                        As manufacturers, we have many items not available online. If you can't find a particular style,
                        please contact us and we'll help locate the exact style and e-mail a picture for your review.
                        <br>
                        Contact Us: <NuxtLink :to="STATIC_ROUTES.CUSTOM_DESIGN_ENGAGEMENT_RINGS" @click="$bus.emit('aria-announce','Navigating to Custom Design Engagement Rings page')">Custom Design Engagement Rings</NuxtLink>
                    </p>

                    <h3>Can you customize a product?</h3>
                    <p>
                        We manufacture all items listed on our site at our facility in Los Angeles, California. Many of
                        our items are customizable. Please call us for details.
                        <br>
                        Read More:
                        <a href="https://www.adiamor.com/blog/engagement-rings/frequently-asked-questions-custom-engagement-rings"
                            rel="noopener"
                            target="_blank"
                            aria-label="Open Frequently Asked Questions about Custom Engagement Rings in a new tab"
                            @click="$bus.emit('aria-announce','Opening blog article about Custom Engagement Rings in a new tab')"
                        >
                            Frequently Asked Questions about Custom Engagement Rings
                        </a>
                    </p>

                    <h3>Can you resize my ring?</h3>
                    <p>
                        Adiamor will gladly resize your ring at no charge for the first 90 days.
                        <br>
                        Read More:
                        <a
                            href="https://www.adiamor.com/blog/education/how-to-resize-your-engagement-ring"
                            aria-label="Read how to resize your engagement ring"
                            @click="$bus.emit('aria-announce','Opening blog article about resizing your engagement ring')"
                        >
                            How to resize your engagement ring
                        </a>
                    </p>

                    <h3>When I purchase a diamond and ring setting, will the diamond be set into the ring?</h3>
                    <p>
                        When you receive the final product, it will arrive beautifully packaged in a teakwood ring box
                        ready for presentation.
                        <br>
                        Read More:
                        <a
                            href="https://www.adiamor.com/blog/education/design-your-own-engagement-ring"
                            aria-label="Read how to design your own engagement ring"
                            @click="$bus.emit('aria-announce','Opening blog article about designing your own engagement ring')"
                        >
                            How to design your own engagement ring
                        </a>
                    </p>

                    <hr>

                    <h2>Diamonds</h2>

                    <h3>Is it safe to buy a diamond online?</h3>
                    <p>
                        Yes. Adiamor uses the latest data encryption technology to protect against loss, misuse, or
                        alteration of your information. Therefore, ordering a diamond from Adiamor is safe and secure
                        shopping experience. Please click here for more security and privacy information.
                        <br>
                        Read More:
                        <a
                            href="https://www.adiamor.com/blog/education/why-you-should-buy-engagement-rings-online"
                            aria-label="Read why you should buy engagement rings online"
                            @click="$bus.emit('aria-announce','Opening blog article about buying engagement rings online')"
                        >
                            Why you should buy engagement rings online
                        </a>
                    </p>

                    <h3>How do I know the diamond that I purchased is the one that I'll receive?</h3>
                    <p>
                        Your purchase will arrive with an original GIA or AGS certificate. We recommend either having
                        your purchase appraised by a local jeweler or at least inspected for your piece of mind. If for
                        any reason you are not satisfied with the appraisal, simply return the item within 30-days for a
                        full refund.
                        <br>
                        Read More:
                        <a
                            href="https://www.adiamor.com/blog/diamonds/basic-questions-buying-wholesale-diamonds"
                            aria-label="Read basic questions about buying wholesale diamonds online"
                            @click="$bus.emit('aria-announce','Opening blog article about buying wholesale diamonds online')"
                        >
                            Basic questions about buying wholesale diamonds online
                        </a>
                        <br>
                        Read More:
                        <a
                            href="https://www.adiamor.com/blog/education/the-newspaper-test-for-diamond-authenticity"
                            aria-label="Read the Newspaper Test for Diamond Authenticity"
                            @click="$bus.emit('aria-announce','Opening blog article about diamond authenticity test')"
                        >
                            The Newspaper Test for Diamond Authenticity
                        </a>
                    </p>

                    <h3>What are Conflict Diamonds? Are Adiamor diamonds conflict-free?</h3>
                    <p>
                        Conflict diamonds are diamonds used to fund military action by rebel armies opposed to
                        legitimate and internationally recognized governments. These conditions are prominent in Central
                        and West African areas such as Sierra Leone. Rebels use inhumane methods to extract diamonds
                        from these regions. Eliminating this human rights crisis is a top priority for our government
                        and the global diamond industry, as well as the United Nations, and nongovernmental
                        organizations (NGOs).<br>
                        Here at Adiamor we adhere to a strict, zero-tolerance policy toward conflict diamonds. Adiamor
                        only deals with highly reputable and well-known diamond suppliers who participate in the System
                        of Warranties and follow the guidelines of the Kimberley Process. All diamonds provided by
                        Adiamor are obtained through legitimate sources, and are warrantied to be conflict free.<br>
                        The World Diamond Council was formed in 2000 to help stop the trade of conflict diamonds.
                        Governments as well as nongovernmental organizations have adopted the Kimberley Process to
                        police trade lines and aide in banning the sale of conflict diamonds. The Kimberley Process,
                        which came into operation on January 1, 2003, is a system to ensure every rough diamond crossing
                        the border is certified conflict free by a strict system of forgery-resistant documents and
                        serial numbers. This process has helped make more than 99% of all diamonds traded in the
                        industry conflict free.<br>
                        If you have any questions or concerns in regards to your diamond purchase, please contact one of
                        our knowledgeable representatives to assist you.
                        <br>
                        Read More:
                        <a
                            href="https://www.adiamor.com/blog/education/conflict-free-diamonds"
                            aria-label="Read more about conflict-free diamonds"
                            @click="$bus.emit('aria-announce','Opening blog article about conflict-free diamonds')"
                        >
                            What are conflict-free diamonds?
                        </a>
                    </p>

                    <hr>

                    <h2>Ordering</h2>

                    <h3>What forms of payment do you accept?</h3>
                    <p>
                        Adiamor accepts MasterCard, Visa, American Express, Discover, PayPal, Affirm, wire transfer,
                        and other payment options. Zelle may also be available when arranged directly with an Adiamor
                        representative.
                        <br>
                        Read More:
                        <NuxtLink
                            :to="STATIC_ROUTES.SERVICES_PAYMENT_OPTIONS"
                            aria-label="View Adiamor payment options"
                            @click="$bus.emit('aria-announce','Navigating to Payment Options page')"
                        >
                            Adiamor Payment Options
                        </NuxtLink>
                    </p>

                    <h3>What is your return policy?</h3>
                    <p>
                        Adiamor believes in complete customer satisfaction and will gladly refund, replace, or exchange
                        any unworn item received back in our facility within 30 days.
                        <br>
                        Read More:
                        <NuxtLink
                            :to="STATIC_ROUTES.POLICIES_RETURN"
                            aria-label="View Adiamor return policy"
                            @click="$bus.emit('aria-announce','Navigating to Return Policy page')"
                        >
                            Adiamor Return Policy
                        </NuxtLink>
                    </p>

                    <h3>Do you provide appraisals?</h3>
                    <p>
                        Adiamor recommends having appraisals performed by a jeweler in your area after you've made your
                        purchase. This will allow you the opportunity to thoroughly examine your purchase with the
                        assistance of a professional. However, upon request, Adiamor will provide an in-house appraisal
                        at no cost.
                        <br>
                        Read More:
                        <NuxtLink
                            :to="STATIC_ROUTES.SERVICES_AFTER_YOU_ORDER"
                            aria-label="Learn what happens after you order"
                            @click="$bus.emit('aria-announce','Navigating to After You Order page')"
                        >
                            After You Order
                        </NuxtLink>
                    </p>

                    <hr>

                    <h2>Shipping</h2>
                    <p>
                        Read More:
                        <NuxtLink
                            :to="STATIC_ROUTES.POLICIES_SHIPPING"
                            aria-label="View Adiamor shipping policy"
                            @click="$bus.emit('aria-announce','Navigating to Shipping Policy page')"
                        >
                            Adiamor Shipping Policy
                        </NuxtLink>
                    </p>

                    <h3>Do you offer Saturday delivery?</h3>
                    <p>
                        Saturday deliveries are available for a $20 fee.
                    </p>

                    <h3>Can you ship to an address other than my billing address?</h3>
                    <p>
                        Shipments made to an address different from your billing address must be verified with your
                        credit card company. Please contact your credit card company and provide them with the shipping
                        address to expedite the shipping process.
                    </p>

                    <h3>Do you ship internationally?</h3>
                    <p>
                        Adiamor is proud to serve our international customers! Orders are shipped via FedEx
                        International Priority. Shipping transit time for all orders should take no more than two
                        business days, although customs may choose to inspect your package which may cause a delay of
                        one day. For more information, please choose between
                        <NuxtLink
                            :to="STATIC_ROUTES.POLICIES_SHIPPING"
                            aria-label="View Canadian shipment information"
                            @click="$bus.emit('aria-announce','Navigating to Canadian Shipment Information section')"
                        >
                            Canadian Shipment Information
                        </NuxtLink>
                        or
                        <NuxtLink
                            :to="STATIC_ROUTES.POLICIES_SHIPPING"
                            aria-label="View other international shipment information"
                            @click="$bus.emit('aria-announce','Navigating to International Shipment Information section')"
                        >
                            Other International Shipment Information
                        </NuxtLink>.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AboutSidebar from "~/components/layout/AboutSidebar.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name: "FaqPage",
    components: { AboutSidebar },
    data() {
        return {
            STATIC_ROUTES,
        };
    },
    head() {
        return {
            title: 'Frequently Asked Questions | Adiamor',
            meta: [
                { hid: 'description', name: 'description', content: 'Find answers to common questions about Adiamor diamonds, jewelry, ordering, shipping, and return policies.' }
            ],
            script: [
                {
                    hid: 'ld-json-faq',
                    type: 'application/ld+json',
                    json: {
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        'mainEntity': [
                            {
                                '@type': 'Question',
                                'name': 'How many years has Adiamor been in business?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Adiamor has been serving customers on the web since 1999. However, its parent company has been manufacturing jewelry since 1950.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Are all your ring styles listed online?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'As manufacturers, we have many items not available online. If you can\'t find a particular style, please contact us and we\'ll help locate the exact style and e-mail a picture for your review.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Can you customize a product?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'We manufacture all items listed on our site at our facility in Los Angeles, California. Many of our items are customizable. Please call us for details.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Can you resize my ring?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Adiamor will gladly resize your ring at no charge for the first 90 days.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'When I purchase a diamond and ring setting, will the diamond be set into the ring?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'When you receive the final product, it will arrive beautifully packaged in a teakwood ring box ready for presentation.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Is it safe to buy a diamond online?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Yes. Adiamor uses the latest data encryption technology to protect against loss, misuse, or alteration of your information. Ordering a diamond from Adiamor is a safe and secure shopping experience.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'How do I know the diamond that I purchased is the one that I\'ll receive?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Your purchase will arrive with an original GIA or AGS certificate. We recommend having your purchase appraised by a local jeweler. If for any reason you are not satisfied, simply return the item within 30 days for a full refund.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'What are Conflict Diamonds? Are Adiamor diamonds conflict-free?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Conflict diamonds are diamonds used to fund military action by rebel armies. Adiamor adheres to a strict zero-tolerance policy toward conflict diamonds and only deals with reputable suppliers who follow the Kimberley Process guidelines. All Adiamor diamonds are warranted to be conflict-free.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'What forms of payment do you accept?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Adiamor accepts MasterCard, Visa, American Express, Discover, PayPal, Affirm, wire transfer, and other payment options. Zelle may also be available when arranged directly with an Adiamor representative.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'What is your return policy?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Adiamor believes in complete customer satisfaction and will gladly refund, replace, or exchange any unworn item received back in our facility within 30 days.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Do you provide appraisals?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Adiamor recommends having appraisals performed by a jeweler in your area after your purchase. Upon request, Adiamor will also provide an in-house appraisal at no cost.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Do you offer Saturday delivery?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Saturday deliveries are available for a $20 fee.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Can you ship to an address other than my billing address?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Shipments made to an address different from your billing address must be verified with your credit card company. Please contact your credit card company and provide them with the shipping address to expedite the process.' }
                            },
                            {
                                '@type': 'Question',
                                'name': 'Do you ship internationally?',
                                'acceptedAnswer': { '@type': 'Answer', 'text': 'Adiamor is proud to serve international customers. Orders are shipped via FedEx International Priority. Shipping transit time should take no more than two business days, although customs may cause a delay of one additional day.' }
                            }
                        ]
                    }
                }
            ]
        };
    },
    mounted() {
        this.$bus.emit(
            "aria-announce",
            "Customer Service Frequently Asked Questions page loaded"
        );
    }
};
</script>