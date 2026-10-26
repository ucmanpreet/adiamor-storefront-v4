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

<script setup>
import KEYS from '~/utils/constant.js';
import CustomLoader from '~/components/ui/CustomLoader.vue';

const props = defineProps(['siteKey']);
const emit = defineEmits(['reCaptchaVerified']);

const store = useMainStore();
const api = useApi();

const token = ref('');
const loader = ref(true);
const captchaAnnouncer = ref(null);

onMounted(async () => {
    try {
        await loadReCaptcha();
        // Optionally auto-submit:
        await handleSubmit();
    } catch (error) {
        console.error(error.message || 'reCAPTCHA failed to load.');
    }
});

async function loadReCaptcha() {
    return new Promise((resolve, reject) => {
        // Prevent duplicate loading
        if (document.getElementById('recaptcha-script')) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.id = 'recaptcha-script';
        script.src = `${KEYS.GOOGLE_RECAPTCHA_URL}?render=${props.siteKey}`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (captchaAnnouncer.value) {
                captchaAnnouncer.value.textContent = "reCAPTCHA loaded";
            }
            resolve();
        };

        script.onerror = () => {
            loader.value = false;
            const error = new Error('Failed to load reCAPTCHA script (404 or blocked). Check site key or domain.');
            reject(error);
        };

        document.head.appendChild(script);
    });
}

async function handleSubmit() {
    try {
        if (!window.grecaptcha) {
            throw new Error('reCAPTCHA is not loaded');
        }

        await new Promise((resolve) => window.grecaptcha.ready(resolve));

        const recaptchaToken = await window.grecaptcha.execute(props.siteKey, { action: 'submit' });

        if (!recaptchaToken) {
            throw new Error('No reCAPTCHA token received');
        }

        token.value = recaptchaToken;
        let payload = { recaptcha_token: token.value };
        // Send the API request (request errors were swallowed by the old api-client: treat as unsuccessful response)
        let response;
        try {
            response = await api.request('post', 'recaptcha/verify', { body: payload, headers: { 'Content-Type': 'application/json' } });
        } catch (err) {
            response = { data: { message: err.message ?? err, success: false } };
        }
        loader.value = false;
        // On successful response
        if (response && response.status === 200) {
            let data = response?.data?.data;
            if (data?.success) {
                if (captchaAnnouncer.value) {
                    captchaAnnouncer.value.textContent = "Security verification successful";
                }
                emit('reCaptchaVerified', recaptchaToken);
                store.setReCaptchaVerified(true);
                return;
            }
        }
    } catch (error) {
        loader.value = false;
        console.error('reCAPTCHA execution failed:', error);
    }
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
