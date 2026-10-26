<template>
    <div ref="root">
        <client-only>
            <form @submit.prevent="loginFormSubmit" @keydown.enter.prevent="loginFormSubmit" aria-labelledby="login-heading" class="flex-1">
                <h2 id="login-heading" class="sr-only">
                    Sign in to your account
                </h2>
                <div class="md:-mt-8 pt-4 md:pt-8 space-y-4">
                    <div>
                        <InputField type="email" label="Email Address" id="loginEmail" v-model="loginEmail" name="loginEmail"
                            placeholder="Your Email" :error="submitted && emailError"
                            :rules="`required|email`" :disabled="loading" :autocomplete="'email'" />
                    </div>
                    <div>
                        <div class="relative">
                            <InputField :type="showPassword ? 'text' : 'password'" label="Order Number Or Password" name="loginPassword"
                                id="loginPassword" v-model="loginPassword" placeholder="Order Number Or Password"
                                :rules="'required|min:6'"
                                :error="submitted && passwordError" :disabled="loading" :autocomplete="'password'"/>
                            <Button type="button"
                                @click="togglePasswordVisibility"
                                colorType="link"
                                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                                :aria-pressed="showPassword.toString()"
                                class="absolute right-3 bottom-0.5 cursor-pointer outline-none focus:outline-none focus:ring-0"
                            >
                                <Icon name="eye-off" class="w-6 h-6" v-if="!showPassword"/>
                                <Icon name="eye" class="w-6 h-6" v-else/>
                            </Button>
                        </div>
                    </div>
                    <Alert :type="type" :message="message" role="status" v-if="message && !loading"/>
                    <div class="flex justify-between items-center pt-2">
                        <Button type="submit" class="!text-lg !py-2.5 !px-8" :aria-busy="loading.toString()" :disabled="loading">{{ loading ? 'Please wait...' : 'Sign In' }}</Button>
                        <Button type="button" colorType="link" @click="emitData()" class="text-base font-medium text-primary hover:underline">
                            Forgot Password?
                        </Button>
                    </div>
                </div>
            </form>
        </client-only>
    </div>
</template>
<script setup>
import api from '~/api-client/rest-api/index.js';
import customErrorMessages from "~/utils/customMessages.js";
import InputField from '~/components/ui/InputField.vue';
import Button from '~/components/common/Button.vue';
import Alert from '~/components/ui/Alert.vue';
import Icon from "~/components/common/Icon.vue";
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import { useForm, useField } from 'vee-validate';
import { localize } from '~/utils/veeCompat.js';

const emit = defineEmits(['isForget']);
const store = useMainStore();
const router = useRouter();

const root = ref(null);
const submitted = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const type = ref('success');
const message = ref(null);

// vee-validate 4: rules are registered globally (plugins/26.veeValidate.js); validation is explicit (no blur/change/input)
const { validate } = useForm();
const { value: loginEmail, errorMessage: emailError, validate: validateEmail } = useField('loginEmail', 'required|email', {
    label: 'Email Address',
    initialValue: '',
});
const { value: loginPassword, errorMessage: passwordError, validate: validatePassword } = useField('loginPassword', 'required', {
    label: 'Order Number Or Password',
    initialValue: '',
});

// after the first submit, fields re-validate live while typing
watch(loginEmail, () => { if (submitted.value) validateEmail(); });
watch(loginPassword, () => { if (submitted.value) validatePassword(); });

onMounted(() => {
    localize("en", customErrorMessages);
});

async function loginFormSubmit() {
    submitted.value = true;
    message.value = null;
    const { valid: isValid } = await validate();
    if (!isValid) {
        await nextTick();
        const firstError = root.value?.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
        return;
    }
    submitted.value = false;
    try {
        const payload = { email: loginEmail.value, password: loginPassword.value };
        loading.value = true;
        const response = await api.postRequest('customer/login?token=true', payload);
        loading.value = false;
        if (response.status !== 200 || !response.data) {
            type.value = 'error';
            message.value = response?.data?.message || 'Unable to login, please try again';
            return;
        }
        let token = response?.data?.token ?? null;
        if (token) {
            localStorage.setItem('token', token);
            loadWishlist(token);
        }
        store.setUserData(response?.data?.data ?? null);
        type.value = 'success';
        message.value = response?.data?.message || 'Login Successful';
        if (token) router.push(STATIC_ROUTES.MY_ACCOUNT);
    } catch (error) {
        type.value = 'error';
        message.value = error || 'An unexpected error occurred';
    } finally {
        clearForm();
    }
}
function togglePasswordVisibility() {
    showPassword.value = !showPassword.value;
}
function clearForm() {
    loginEmail.value = loginPassword.value = '';
}
function emitData() {
    emit('isForget', true);
}

async function loadWishlist(arg = null) {
    const token = localStorage.getItem("token") ?? arg;
    if (token) {
        try {
            store.setWishListData(null);
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };
            const response = await api.getRequest(`customer/wishlist?token=true&limit=20&page=1`, config);
            if (response.status !== 200 || !response.data) {
                return;
            }
            if (response?.data?.data) {
                let newWishlistData = response.data.data ?? [];
                store.setWishListData(response.data);
                let wishListData = newWishlistData.map((item) => {
                    return item?.bundle_data && item?.bundle_data?.sku
                        ? { ...item, ...item.bundle_data }
                        : item;
                });
                store.setLoggedInWishListData(wishListData);
                store.setGTMData(null);
                await store.runGtmEvent({ action_type: 'submit_create_wishlist' });
            }
        } catch {
            // wishlist load failure is non-critical, ignore silently
        }
    }
}
</script>
