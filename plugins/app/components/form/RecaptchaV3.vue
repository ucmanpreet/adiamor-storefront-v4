<template>
    <div>
        <div
            v-if="loader"
            class="py-24 fixed z-65 inset-0 flex items-center justify-center bg-black/50 group-light"
            role="alert"
            aria-live="assertive"
            aria-busy="true"
        >
            <CustomLoader aria-label="Verifying reCAPTCHA, please wait" />
        </div>
        <button @click="handleSubmit" class="g-recaptcha" :data-sitekey="siteKey" data-callback="onSubmit"
            data-action="submit"
            :disabled="loader"
            aria-describedby="captcha-description"
        >
            Submit
        </button>
        <p id="captcha-description" class="sr-only">
            This form uses reCAPTCHA to protect against spam and abuse.
        </p>
        <div class="sr-only" aria-live="polite" ref="captchaAnnouncer"></div>
    </div>
</template>

<script>
import api from '~/api-client/rest-api/index.js';
import KEYS from '~/utils/constant.js';
import CustomLoader from '~/components/ui/CustomLoader.vue';
export default {
    name : 'RecaptchaV3',
    components: { CustomLoader },
    props: ['siteKey'],
    data() {
        return {
            token: '',
            loader: true
        }
    },
    async mounted() {
        try {
            await this.loadReCaptcha();
            // Optionally auto-submit:
            await this.handleSubmit();
        } catch (error) {
            console.error(error.message || 'reCAPTCHA failed to load.');
        }
    },
    methods: {
        async loadReCaptcha() {
            return new Promise((resolve, reject) => {
                // Prevent duplicate loading
                if (document.getElementById('recaptcha-script')) {
                    resolve();
                    return;
                }
                const script = document.createElement('script');
                script.id = 'recaptcha-script';
                script.src = `${KEYS.GOOGLE_RECAPTCHA_URL}?render=${this.siteKey}`;
                script.async = true;
                script.defer = true;

                script.onload = () => {
                    if (this.$refs.captchaAnnouncer) {
                        this.$refs.captchaAnnouncer.textContent = "reCAPTCHA loaded";
                    }
                    resolve();
                };

                script.onerror = () => {
                    this.loader = false;
                    const error = new Error('Failed to load reCAPTCHA script (404 or blocked). Check site key or domain.');
                    reject(error);
                };

                document.head.appendChild(script);
            });
        },

        async handleSubmit() {
            try {
                if (!window.grecaptcha) {
                    throw new Error('reCAPTCHA is not loaded');
                }

                await new Promise((resolve) => window.grecaptcha.ready(resolve));

                const token = await window.grecaptcha.execute(this.siteKey, { action: 'submit' });

                if (!token) {
                    throw new Error('No reCAPTCHA token received');
                }

                this.token = token;
                let payload = { recaptcha_token: this.token };
                // Send the API request
                let response = await api.postRequest(this.$axios, 'recaptcha/verify', payload);
                this.loader = false;
                // On successful response
                if (response && response.status === 200) {
                    let data = response?.data?.data;
                    if (data?.success) {
                        if (this.$refs.captchaAnnouncer) {
                            this.$refs.captchaAnnouncer.textContent = "Security verification successful";
                        }
                        this.$emit('reCaptchaVerified', token);
                        this.$store.commit('setReCaptchaVerified', true);
                        return;
                    }
                }
            } catch (error) {
                this.loader = false;
                console.error('reCAPTCHA execution failed:', error);
            }
        },
    },
}
</script>

<style>
#___ratingbadge_0,
 #___ratingbadge_0 iframe,
/* Hide/move the reCAPTCHA v3 badge offscreen */
.grecaptcha-badge {
  position: fixed !important;
  bottom: unset !important;
  right: unset !important;
  left: -9999px !important;
  width: 0 !important;
  height: 0 !important;
  overflow: hidden !important;
  pointer-events: none !important;
}
</style>
