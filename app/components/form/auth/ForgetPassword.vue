<template>
    <div>
        <form @submit.prevent="loginFormSubmit" class="flex-1">
            <div class="md:-mt-8 pt-4 md:pt-8 space-y-4">
                <InputField type="email" label="Email Address" id="loginEmail" v-model="loginEmail" name="loginEmail"
                    placeholder="Your Email" :error="submitted && emailError" :rules="`required|email`" :disabled="loading" />
                <div class="flex justify-between items-center pt-2">
                    <Button type="submit" class="!text-lg !py-2.5 !px-8" aria-live="polite" :disabled="loading"
                        >{{loading ? 'Sending Email, please wait...' : 'Email Link'}}</Button>
                    <button
                        type="button"
                        @click="emitData"
                        class="text-base font-medium text-primary hover:underline"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import api from '~/api-client/rest-api/index.js';
import InputField from '~/components/ui/InputField.vue';
import Button from '~/components/common/Button.vue';
import { createSwalAlert } from '~/composables/useAlert.js'
import customErrorMessages from "~/utils/customMessages.js";
import { useForm, useField } from 'vee-validate';
import { localize } from '~/utils/veeCompat.js';

const emit = defineEmits(['isForget']);

// vee-validate 4: rules are registered globally (plugins/26.veeValidate.js); validation is explicit (no blur/change/input)
const { validate } = useForm();
const { value: loginEmail, errorMessage: emailError, validate: validateEmail } = useField('loginEmail', 'required|email', { label: 'Email Address', initialValue: '' });
const loginPassword = ref('');
const submitted = ref(false);
const loading = ref(false);
const showForgotPassword = ref(false);

watch(loginEmail, () => { if (submitted.value) validateEmail(); });

onMounted(() => {
    localize("en", customErrorMessages);
});

async function loginFormSubmit() {
    submitted.value = true;
    const { valid: isValid } = await validate();
    if (!isValid) {
        return;
    }
    submitted.value = false;
    try {
        const payload = { email: loginEmail.value, password: loginPassword.value };
        loading.value = true;
        const response = await api.postRequest('customer/forgot-password', payload);
        if (response.status !== 200 || !response.data) {
            createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
            return;
        }
        createSwalAlert(response.data.message, 'success');
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
    loginEmail.value = loginPassword.value = '';
}
function emitData() {
    showForgotPassword.value = false;
    emit('isForget', showForgotPassword.value);
}
</script>
