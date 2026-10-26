<template>
    <div class="relative py-0 min-h-[620px] flex items-center">
        <div class="max-w-7xl mx-auto py-6 md:py-14 px-4 lg:px-8 relative z-10 w-full h-full">
            <fieldset class="block max-w-lg my-auto ml-auto h-full">
                <legend class="mb-6">
                    <h2 id="reset-password-heading" class="text-2xl font-semibold space-y-2">
                        My Account
                        <small class="font-light block text-base">Reset your password</small>
                    </h2>
                </legend>
                <form @submit.prevent="formSubmit" class="flex-1" aria-labelledby="reset-password-heading">
                    <div class="md:-mt-8 pt-4 md:pt-8 space-y-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <InputField type="email" label="Email Address" id="email" v-model="email" name="email"
                                    :aria-invalid="submitted && emailError ? 'true' : 'false'"
                                    aria-describedby="emailError"
                                    placeholder="Your Email" :error="submitted && emailError" :rules="`required|email`" :disabled="loading" />
                                <small
                                    id="emailError"
                                    class="error"
                                    role="alert"
                                    aria-live="assertive"
                                    v-show="submitted && emailError"
                                    >
                                    {{ emailError }}
                                </small>
                            </div>
                            <div class="space-y-1">
                                <label :for="'password'" class="block text-sm font-medium text-gray-700">
                                    Password <span class="ml-0.5 text-red-500">*</span>
                                </label>
                                <input :id="'password'" :type="'password'"
                                    :aria-invalid="submitted && passwordError ? 'true' : 'false'"
                                    aria-describedby="passwordError"
                                    name="password" v-model="password" :placeholder="'Your Password'" :class="[
                                        'peer border p-3 text-sm w-full',
                                        (submitted && passwordError) ? 'border-red-600 focus:ring-red-600' : 'border-gray-200',
                                        loading ? 'bg-gray-100 cursor-not-allowed' : '',
                                    ]" :disabled="loading" :autocomplete="'false'" />
                                    <small
                                        id="passwordError"
                                        class="error"
                                        role="alert"
                                        aria-live="assertive"
                                        v-show="submitted && passwordError"
                                        >
                                        {{ passwordError }}
                                    </small>
                            </div>
                            <div class="space-y-1">
                                <label :for="'password_confirmation'" class="block text-sm font-medium text-gray-700">
                                    Confirm Password <span class="ml-0.5 text-red-500">*</span>
                                </label>
                                <input :id="'password_confirmation'" :type="'password'"
                                    :aria-invalid="submitted && confirmError ? 'true' : 'false'"
                                    aria-describedby="passwordConfirmationError"
                                    name="password_confirmation" v-model="password_confirmation" :placeholder="'Your Confirm Password'" :class="[
                                        'peer border p-3 text-sm w-full',
                                        (submitted && confirmError) ? 'border-red-600 focus:ring-red-600' : 'border-gray-200',
                                        loading ? 'bg-gray-100 cursor-not-allowed' : '',
                                    ]" :disabled="loading" :autocomplete="'false'" />
                                    <small
                                        id="passwordConfirmationError"
                                        class="error"
                                        role="alert"
                                        aria-live="assertive"
                                        v-show="submitted && confirmError"
                                        >
                                        {{ confirmError }}
                                    </small>
                            </div>
                        </div>
                        <div class="flex justify-between items-center pt-2">
                            <Button type="submit" class="!text-lg !py-2.5 !px-8 w-full" :aria-busy="loading.toString()"
                                :disabled="loading">{{ loading ? 'Please wait...' : 'Reset Password' }}</Button>
                        </div>
                    </div>
                    <div
                        v-if="submitted && !loading"
                        class="sr-only"
                        role="status"
                        aria-live="polite"
                        >
                        Form submitted
                    </div>
                </form>
            </fieldset>
        </div>
        <nuxt-img provider="cdn" src="/landing-pages/heros/jewelry-wide.png?updatedAt=1746137274180" alt="Reset Password"
            class="absolute inset-0 w-full h-full object-cover"/>
    </div>
</template>

<script setup>
import api from '~/api-client/rest-api/index.js';
import InputField from '~/components/ui/InputField.vue';
import Button from '~/components/common/Button.vue';
import { createSwalAlert } from '~/composables/useAlert.js'
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import customErrorMessages from "~/utils/customMessages.js";
import { useForm, useField } from 'vee-validate';
import { localize } from '~/utils/veeCompat.js';

const route = useRoute();
const router = useRouter();

// vee-validate 4: rules are registered globally (plugins/26.veeValidate.js); validation is explicit (no blur/change/input)
const { validate } = useForm();
const { value: email, errorMessage: emailError, validate: validateEmail } = useField('email', 'required|email', { label: 'Email Address', initialValue: '' });
const { value: password, errorMessage: passwordError, validate: validatePassword } = useField('password', 'required|min:6', { label: 'Password', initialValue: '' });
const confirmRules = computed(() => ({ required: true, password_match: [password.value] }));
const { value: password_confirmation, errorMessage: confirmError, validate: validateConfirm } = useField('password_confirmation', confirmRules, { label: 'Confirm Password', initialValue: '' });

// after the first submit, fields re-validate live while typing
watch(email, () => { if (submitted.value) validateEmail(); });
watch(password, () => { if (submitted.value) { validatePassword(); validateConfirm(); } });
watch(password_confirmation, () => { if (submitted.value) validateConfirm(); });

const submitted = ref(false);
const loading = ref(false);
const token = ref(null);

async function formSubmit() {
    submitted.value = true;
    const { valid: isValid } = await validate();
    if (!isValid) {
        return;
    }
    submitted.value = false;
    if (!token.value) {
        return createSwalAlert('Invalid or empty token', 'error');
    }
    try {
        const payload = {
            "email": email.value,
            "password": password.value,
            "password_confirmation": password_confirmation.value,
            "token": token.value
        };
        loading.value = true;
        const response = await api.postRequest('customer/reset-password', payload);
        if (response.status !== 200 || !response.data) {
            createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
            return;
        }
        createSwalAlert(response.data.message, 'success');
        router.push(STATIC_ROUTES.LOGIN);
    } catch (error) {
        console.error(error);
        createSwalAlert('An unexpected error occurred', 'error');
    } finally {
        loading.value = false;
        clearForm();
        submitted.value = false;
    }
}
function clearForm() {
    password.value = '';
    password_confirmation.value = '';
}

onMounted(() => {
    localize("en", customErrorMessages);
    token.value = route.params.token;
});
</script>
