<template>
    <div class="flex flex-col">
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pb-6 md:pb-14 flex flex-wrap gap-2 sm:gap-4 lg:gap-6 xl:gap-12">
            <!-- Sidebar navigation -->
            <AboutSidebar />

            <!-- Contact Us -->
            <div class="flex-1 space-y-4 md:space-y-10">
                <h2 class="font-normal text-lg md:text-xl lg:text-3xl">Contact Us</h2>
                <div class="prose prose-sm text-gray-black prose-a:text-primary prose-h2:font-normal prose-h2:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 prose-h3:text-base prose-h3:font-medium md:leading-7 max-w-full">
                    <p>At Adiamor, we make every effort to ensure a comfortable and enjoyable shopping experience. If
                        you have any questions about a product or our policies, or would simply like to give us some
                        feedback about how we're doing, please feel free to contact us using any of the following
                        methods:</p>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
                        <div>
                            <h3 class="capitalize mb-5">via Phone</h3>
                            <div class="grid grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                    <h4>US &amp; Canadian Customers</h4>
                                    <a
                                        href="tel:877-627-5094"
                                        aria-label="Call 877-627-5094 for US and Canadian customers"
                                        @click="$bus.emit('aria-announce', 'Calling 877 627 5094 for US and Canadian customers')"
                                        class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        877-627-5094
                                    </a><br>
                                    <span>OR </span><br>
                                    <a
                                        href="tel:213-627-5057"
                                        aria-label="Call 213-627-5057 for US and Canadian customers"
                                        @click="$bus.emit('aria-announce', 'Calling 213 627 5057 for US and Canadian customers')"
                                        class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        213-627-5057
                                    </a>
                                </div>

                                <div>
                                    <h4>UK Customers</h4>
                                    <a
                                        href="tel:0808-271-1071"
                                        aria-label="Call 0808-271-1071 for UK customers"
                                        @click="$bus.emit('aria-announce', 'Calling 0808 271 1071 for UK customers')"
                                        class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        0808-271-1071
                                    </a>
                                </div>

                                <div>
                                    <h4>Australia Customers</h4>
                                    <a
                                        href="tel:1-800-821-917"
                                        aria-label="Call 1-800-821-917 for Australia customers"
                                        @click="$bus.emit('aria-announce', 'Calling 1 800 821 917 for Australia customers')"
                                        class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        1-800-821-917
                                    </a>
                                </div>

                                <div>
                                    <h4>Other International Customers</h4>
                                    <a
                                        href="tel:+12136275057"
                                        aria-label="Call plus 1 213 627 5057 for international customers"
                                        @click="$bus.emit('aria-announce', 'Calling plus 1 213 627 5057 for international customers')"
                                        class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        +1-213-627-5057
                                    </a>
                                </div>

                                <div>
                                    <h4>Service Hours</h4>
                                    <p>
                                        Monday-Friday: 7am - 7pm PST<br>
                                        Saturday: 9am - 4pm PST
                                    </p>
                                </div>
                            </div>
                            <h3 class="capitalize">via Email</h3>
                            <div class="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4">
                                <div>
                                    <h4>Customer Sales &amp; Service</h4>
                                    <a
                                        href="mailto:service@adiamor.com"
                                        aria-label="Email service at adiamor dot com"
                                        @click="$bus.emit('aria-announce', 'Opening email to service at adiamor dot com')"
                                        class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        service@adiamor.com
                                    </a>
                                </div>

                                <div>
                                    <h4>Live Chat</h4>
                                    <div class="flex flex-wrap items-center gap-2 sm:gap-4">
                                        <a href="javascript:helpDesk.click()" class="flex items-center gap-2" aria-label="Start on site live chat">
                                            <Icon name="message" class="w-4 sm:w-6 h-4 sm:after:h-6" />
                                            On Site Chat
                                        </a>
                                        <a class="flex items-center gap-2" href="https://wa.me/message/VBFCYX4RZRGAH1" target="_blank"
                                            rel="noopener"
                                            aria-label="Open WhatsApp chat in new tab"
                                        >
                                            <Icon name="whatsapp" class="w-4 sm:w-6 lg:w-8 h-4 sm:h-6 lg:h-8" />
                                            Whats App
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4>via Mail or In Person</h4>
                                <p v-html="$sanitize($store.state?.officeAddress)"></p>
                            </div>

                        </div>
                        <div>
                            <h3 class="capitalize">via Site</h3>
                            <!--Live agent form-->
                            <CustomLiveAgentForm type="contact-us"/>
                        </div>
                    </div>

                    <hr>

                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
                        <div>
                            <h2>VISIT US</h2>
                            <p>
                                The Adiamor corporate office is located in the heart of the Jewelry District in historic
                                Downtown Los Angeles.
                                If you are in the Greater Los Angeles area and would like to stop in for a one-on-one
                                expert diamond or jewelry consultation, please contact one of our representatives by
                                phone at
                                <a
                                    href="tel:877-627-5094"
                                    aria-label="Call 877-627-5094"
                                    @click="$bus.emit('aria-announce', 'Calling 877 627 5094')"
                                    class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    877-627-5094
                                </a>
                                or email us at
                                <a
                                    href="mailto:service@adiamor.com"
                                    aria-label="Email service at adiamor dot com"
                                    @click="$bus.emit('aria-announce', 'Opening email to service at adiamor dot com')"
                                    class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    service@adiamor.com
                                </a>
                            </p>
                            <p>Consultations available by appointment only.</p>
                        </div>
                        <div>
                            <iframe
                                title="Google Map showing Adiamor office location"
                                aria-label="Google map showing Adiamor office location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.833850342867!2d-118.25687468478506!3d34.048132880607106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7b4ee4b0679%3A0x44ce13ad98249223!2s510+W+6th+St+%231200%2C+Los+Angeles%2C+CA+90014%2C+USA!5e0!3m2!1sen!2sin!4v1562595494219!5m2!1sen!2sin"
                                width="100%" height="300" frameborder="0" style="border: 0" allowfullscreen
                            ></iframe>
                        </div>
                    </div>

                    <hr>

                    <h2>GET SOCIAL WITH ADIAMOR</h2>
                    <div class="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                        <div>
                            <a
                                href="https://www.facebook.com/adiamor"
                                target="_blank"
                                rel="noopener"
                                aria-label="Visit Adiamor Facebook page in new tab"
                                @click="$bus.emit('aria-announce', 'Opening Adiamor Facebook page in new tab')"
                                class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <MediaImage :src="$asset('~/assets/images/facebook_icon.webp')"
                                    alt="Facebook Icon" width="50" :parentClass="`!h-auto`"/>
                                <span>Like Us on Facebook</span>
                            </a>
                            <p>Like us on Facebook to receive Adiamor news, updates and special offers.</p>
                        </div>
                        <div>
                            <a
                                href="https://www.twitter.com/adiamor"
                                target="_blank"
                                rel="noopener"
                                aria-label="Visit Adiamor Twitter page in new tab"
                                @click="$bus.emit('aria-announce', 'Opening Adiamor Twitter page in new tab')"
                                class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <MediaImage :src="$asset('~/assets/images/twitter_icon.webp')"
                                    alt="Twitter Icon" width="50" :parentClass="`!h-auto`"/>
                                <span>Follow Us on Twitter</span>
                            </a>
                            <p>Like us on Facebook to receive Adiamor news, updates and special offers.</p>
                        </div>
                        <div>
                            <a
                                href="https://www.pinterest.com/adiamor"
                                target="_blank"
                                rel="noopener"
                                aria-label="Visit Adiamor Pinterest page in new tab"
                                @click="$bus.emit('aria-announce', 'Opening Adiamor Pinterest page in new tab')"
                                class="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <MediaImage :src="$asset('~/assets/images/pinterest_icon.webp')"
                                    alt="Pinterest Icon" width="50" :parentClass="`!h-auto`"/>
                                <span>Follow Us on Pinterest</span>
                            </a>
                            <p>Like us on Facebook to receive Adiamor news, updates and special offers.</p>
                        </div>
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
import Icon from "~/components/common/Icon.vue";
import ContactLink from "~/components/common/ContactLink.vue";
import MediaImage from "~/components/common/MediaImage.vue";
import CustomLoader from "~/components/ui/CustomLoader.vue";
import CustomLiveAgentForm from "~/components/form/CustomLiveAgentForm.vue";
export default {
    name : 'ContactAdiamorPage',
    components: { AboutSidebar, Icon, ContactLink, MediaImage, CustomLoader, CustomLiveAgentForm },
    mounted() {
        this.$bus.emit('aria-announce', 'Contact Us page loaded');
    },
    methods: {
        startChat() {
            this.$bus.emit('aria-announce', 'Opening on site live chat');
            if (import.meta.client && window.helpDesk && typeof window.helpDesk.click === 'function') {
                window.helpDesk.click();
            }
        }
    }
}
</script>