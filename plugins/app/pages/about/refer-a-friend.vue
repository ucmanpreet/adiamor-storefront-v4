<template>
    <div>
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pb-6 md:pb-14 flex flex-wrap gap-4 sm:gap-6 lg:gap-12">
            <!-- Sidebar navigation -->
            <AboutSidebar />

            <!-- Refer a Friend -->
            <div class="flex-1 space-y-4 md:space-y-10">
                <h2 class="font-normal text-lg md:text-xl lg:text-3xl">Refer a Friend</h2>
                <div
                    class="prose prose-sm text-gray-black prose-a:text-primary prose-h2:font-gill-sans prose-h2:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full">
                    <p>
                        Tell a friend about Adiamor and you both could save up to $100!<br>
                        Refer a friend and you both save:<br>
                        <strong>$20</strong> on your order of <strong>$100 or more</strong><br>
                        <strong>$50</strong> on your order of <strong>$500 or more</strong><br>
                        <strong>$100</strong> on your order of <strong>$1,000 or more</strong>
                    </p>

                    <form @submit.prevent="handleSubmit">
                        <div class="space-y-4">
                            <h3>Your Information</h3>

                            <div>
                                <label for="your_first_name" class="block text-sm font-medium text-gray-700">
                                    First Name*
                                </label>
                                <input id="your_first_name"
                                    type="text"
                                    aria-required="true"
                                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                >
                            </div>

                            <div>
                                <label for="your_last_name" class="block text-sm font-medium text-gray-700">
                                    Last Name*
                                </label>
                                <input id="your_last_name"
                                    type="text"
                                    aria-required="true"
                                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                >
                            </div>

                            <div>
                                <label for="your_email" class="block text-sm font-medium text-gray-700">
                                    Email Address*
                                </label>
                                <input id="your_email"
                                    type="email"
                                    aria-required="true"
                                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                >
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="mt-6">Your Friend's Information</h3>

                            <div>
                                <label for="friend_first_name" class="block text-sm font-medium text-gray-700">
                                    First Name*
                                </label>
                                <input id="friend_first_name"
                                    type="text"
                                    aria-required="true"
                                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                >
                            </div>

                            <div>
                                <label for="friend_last_name" class="block text-sm font-medium text-gray-700">
                                    Last Name*
                                </label>
                                <input id="friend_last_name"
                                    type="text"
                                    aria-required="true"
                                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                >
                            </div>

                            <div>
                                <label for="friend_email" class="block text-sm font-medium text-gray-700">
                                    Email Address*
                                </label>
                                <input id="friend_email"
                                    type="email"
                                    aria-required="true"
                                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                >
                            </div>

                            <div>
                                <label for="your_message" class="block text-sm font-medium text-gray-700">
                                    Personalized Message*
                                </label>
                                <textarea id="your_message"
                                    rows="6"
                                    aria-required="true"
                                    class="mt-1 block w-full px-3 py-2 bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                ></textarea>
                            </div>

                            <div class="g-recaptcha" data-sitekey="6Lc7-h4TAAAAAAsrTxMH8A-7k2c9PzNDK2Yl7FMT"
                                data-callback="captchaResponse"
                                aria-label="Google reCAPTCHA verification"
                            >
                                <div style="width: 304px; height: 78px;">
                                    <div>
                                        <iframe title="reCAPTCHA" width="304" height="78" role="presentation"
                                            name="a-udfiy8v5w6mv" frameborder="0" scrolling="no"
                                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation"
                                            src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6Lc7-h4TAAAAAAsrTxMH8A-7k2c9PzNDK2Yl7FMT&amp;co=aHR0cHM6Ly93d3cuYWRpYW1vci5jb206NDQz&amp;hl=en-GB&amp;v=PcIQSvk4Y5ANjYUx0f4froA1&amp;size=normal&amp;cb=1cm9tcgti3gb"
                                        ></iframe>
                                    </div>
                                    <textarea id="g-recaptcha-response" name="g-recaptcha-response"
                                        class="g-recaptcha-response"
                                        style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"
                                    ></textarea>
                                </div>
                                <iframe style="display: none;"></iframe>
                            </div>
                            <input id="captcha" type="text" style="display: none;">
                            <div class="flex gap-4">
                                <Button
                                    type="submit"
                                    id="refer_submit"
                                    aria-label="Submit referral form"
                                >
                                    Submit
                                </Button>

                                <Button
                                    type="reset"
                                    colorType="secondary"
                                    aria-label="Clear referral form"
                                    @click="$bus.emit('aria-announce','Referral form cleared')"
                                >
                                    Clear
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div class="hidden">
                        <h2>Refer a Friend</h2>
                        <hr>

                        <p>
                            Thank you. Your request has been submitted.<br><br>
                            If you have any questions,
                            please contact us at
                            <NuxtLink
                                :to="{ path: contactUs}"
                                @click="$bus.emit('aria-announce','Navigating to Contact Adiamor page')"
                            >
                                {{ phoneNumber }}
                            </NuxtLink>
                            or email
                            <a
                                href="mailto:Service@Adiamor.com"
                                @click="$bus.emit('aria-announce', 'Opening email client to contact Service at Adiamor dot com')"
                            >
                                Service@Adiamor.com
                            </a>.
                        </p>
                    </div>

                    <div>
                        <h3>Restrictions</h3>

                        <ol>
                            <li>You cannot refer yourself.</li>
                            <li>You must have completed a previous purchase with Adiamor.</li>
                            <li>You must provide a first name, last name, and email address for both you and your
                                friends.</li>
                            <li>Your referral must be a new Adiamor customer and they must use their referral code at
                                time of purchase.</li>
                            <li>Only one new customer referral code redemption is allowed per household.</li>
                            <li>Each referral code is unique and can only be used once.</li>
                            <li>This offer cannot be combined with any other offer or promotion and cannot be applied
                                retroactively.</li>
                            <li>Offer is valid only on the purchase of an engagement ring and diamond.</li>
                            <li>All codes expire 30 days after issuance.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>

        <!-- Contact Links -->
        <ContactLink />
    </div>
</template>
<script>
import AboutSidebar from "~/components/layout/AboutSidebar.vue";
import Button from "~/components/common/Button.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name : "ReferAFriendPage",
    components: { AboutSidebar, Button, ContactLink },
    data() {
        return {
            contactUs: STATIC_ROUTES.CONTACT
        };
    },
    computed: {
        phoneNumber() {
            return this.$store.state.phoneNumber;
        },
    },
    mounted() {
        this.$bus.emit('aria-announce', 'Refer a Friend page loaded');
    },
    methods: {
        handleSubmit() {
            this.submitted = true;
            this.$bus.emit('aria-announce', 'Referral form submitted successfully');
        },
    },
};
</script>