<template>
    <div>
        <div
            class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pb-6 md:pb-14 flex flex-wrap gap-2 sm:gap-4 lg:gap-6 xl:gap-12">
            <AboutSidebar />

            <div class="flex-1 prose prose-p:mt-3 prose-h3:font-normal prose-h3:text-base" aria-labelledby="promotions-heading">

                <div>
                    <h1 id="promotions-heading">Promotions</h1>
                    <p>Explore Adiamor coupons and promotions for exceptional savings on high-quality diamonds. For
                        assistance,&nbsp;<a href="https://adiamor.com/contact-adiamor/" rel="follow">contact our support
                            team</a>.</p>
                    <p>* All discounts apply only to USD purchases made through Adiamor.com.</p>
                </div>
                <div>
                    <section id="spring-sale">
                        <div>
                            <div>
                                <p>Limited Time</p>
                                <h2>Summer Sale &mdash; Up to 25% Off</h2>
                            </div> Ends July 27, 2026
                        </div>
                        <ul style="list-style-type: none;">
                            <li>✦ Diamond Accented Engagement Ring Settings &mdash; up to 25% off</li>
                            <li>✦ Diamond Wedding Bands &mdash; up to 25% off</li>
                            <li>✦ Lab Grown Diamonds &mdash; up to 25% off</li>
                            <li>✦ No coupon code needed &mdash; discount auto-applied in cart</li>
                        </ul>
                        <a href="https://adiamor.com/engagement-rings/search/" rel="follow">Shop Now</a>
                        <div>
                            <h3>Terms &amp; Conditions</h3>
                            <ul style="list-style-type: disc;">
                                <li>Discounted pricing listed on product detail page in black, auto-applied in cart</li>
                                <li>Only applies on engagement ring setting when purchased with a natural or lab grown
                                    diamond</li>
                                <li>Auto-applied on all diamond bands</li>
                                <li>Can be combined with wire transfer discount (calculated on total after sale
                                    discounts)</li>
                                <li>Does not apply to customization fees or completely custom rings</li>
                                <li>Discount is not applied retroactively &middot; Sale Ends July 27, 2026</li>
                            </ul>
                        </div>
                    </section>
                    <section id="lab-grown-sale">
                        <div>
                            <div>
                                <p>Lab Grown</p>
                                <h2>All Lab Grown Diamonds &mdash; Up to 25% Off</h2>
                            </div> Ends July 27, 2026
                        </div>
                        <p>Sale price listed in black on each product page. Discount auto-applied in cart.</p>
                        <a href="https://adiamor.com/diamonds/search/lab-grown/" rel="follow">Shop Lab Grown
                            Diamonds</a>
                        <div>
                            <p>Terms &amp; Conditions</p>
                            <ul style="list-style-type: disc;">
                                <li>Valid on Loose Lab Grown Diamonds only</li>
                                <li>Discounted price listed in black, auto-applied in cart</li>
                                <li>Can be combined with wire transfer discount</li>
                                <li>Discount is not applied retroactively &middot; Sale Ends July 27, 2026</li>
                            </ul>
                        </div>
                    </section>
                </div>
                <h2>Sign Up and Save</h2>
                <p>Sign up to receive our emails and save $100 on your purchase</p>
                <h3>Terms and Conditions</h3>
                <ul style="list-style: disc; margin-left: 2em; line-height: 1.6em;">
                    <li>Only valid on orders including a lab-grown diamond and ring setting at $2500 or more or a
                        natural diamond and a ring setting at $5000 or more</li>
                    <li>Discount is not applied retroactively</li>
                    <li>Discount can be combined with wire transfer discount</li>
                    <li>Wire discount will be calculated on total transaction value after discounts have been applied
                    </li>
                    <li>Discount cannot be combined with other offers</li>
                </ul>
                <p><br><a href="https://www.adiamor.com/Newsletters" rel="follow" class="blue-button"
                        style="line-height: 28px; margin-top: 1em;">Subscribe and Save</a></p>
                <h2>Easy Web Coupon</h2>
                <p>Make any purchase from using our website and save an easy $15.</p>
                <p><strong>CODE: SAVE15</strong></p>
                <h3>Terms and Conditions</h3>
                <ul style="list-style: disc; margin-left: 2em; line-height: 1.6em;">
                    <li>Only valid on orders over $1000</li>
                    <li>Discount is not applied retroactively</li>
                    <li>Discount can be combined with wire transfer discount</li>
                    <li>Wire discount will be calculated on total transaction value after discounts have been applied
                    </li>
                    <li>Discount cannot be combined with other offers</li>
                </ul>
            </div>
        </div>

        <ContactLink />
    </div>
</template>

<script setup>
import AboutSidebar from "~/components/layout/AboutSidebar.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const { $bus } = useNuxtApp();

useHead(() => ({ title: 'Promotions | Adiamor' }));

onMounted(() => {
    nextTick(() => {
        $bus.emit('aria-announce', 'Promotions page loaded. Multiple sales and coupon offers available.')
    })
});

function announceNavigation(destination) {
    $bus.emit('aria-announce', `Navigating to ${destination}`)
}
</script>
