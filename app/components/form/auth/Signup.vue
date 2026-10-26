<template>
    <form ref="root" @submit.prevent="formSubmit" @keydown.enter.prevent="formSubmit" class="flex-1" aria-labelledby="signup-heading">
        <h2 id="signup-heading" class="sr-only">
            Create Account Form
        </h2>
        <div class="md:-mt-8 pt-4 md:pt-8 space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div class="">
                    <InputField type="text" label="First Name" name="firstName" placeholder="Your First Name" v-model="firstName" id="firstName"
                        :disabled="loading" :error="submitted && firstNameError" />
                </div>
                <div class="">
                    <InputField type="text" label="Last Name" name="lastName" placeholder="Your Last Name" v-model="lastName" id="lastName" :disabled="loading"
                        :error="submitted && lastNameError" />
                </div>
                <div class="">
                    <InputField type="email" label="Email Address" id="email" v-model="email" name="email"
                        placeholder="Your Email" :error="submitted && emailError" :disabled="loading" />
                </div>
                <div class="">
                    <InputField type="text" label="Phone Number" name="phone" id="phone" placeholder="Your Phone Number" v-model="phone"
                        :error="submitted && phoneError" :disabled="loading" />
                </div>
                <div class="space-y-1">
                    <label :for="'password'" class="block text-sm font-medium text-gray-700">
                        Password <span class="ml-0.5 text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input :id="'password'" :type="'password'"
                        :aria-invalid="submitted && passwordError ? 'true' : undefined"
                        :aria-describedby="submitted && passwordError ? 'passwordError passwordHint' : 'passwordHint'"
                        aria-required="true"
                        name="password" v-model="password" :placeholder="'Your Password'" :class="[
                            'peer border p-3 text-sm w-full',
                            (submitted && passwordError) ? 'border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-1' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                            loading ? 'bg-gray-100 cursor-not-allowed' : '',
                        ]" :disabled="loading" :autocomplete="'new-password'" />
                    <small id="passwordError" class="error" role="alert" aria-live="assertive"
                        v-if="submitted && passwordError">{{ passwordError }}</small>
                    <p id="passwordHint" class="text-sm text-gray-500">Passwords are case sensitive and must be at least 6 characters long.</p>
                </div>
                <div class="space-y-1">
                    <label :for="'password_confirmation'" class="block text-sm font-medium text-gray-700">
                        Confirm Password <span class="ml-0.5 text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input :id="'password_confirmation'" :type="'password'"
                        :aria-invalid="submitted && confirmError ? 'true' : undefined"
                        :aria-describedby="submitted && confirmError ? 'passwordConfirmationError passwordConfirmationHint' : 'passwordConfirmationHint'"
                        aria-required="true"
                        name="password_confirmation" v-model="password_confirmation" :placeholder="'Your Confirm Password'" :class="[
                            'peer border p-3 text-sm w-full',
                            (submitted && confirmError) ? 'border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-1' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                            loading ? 'bg-gray-100 cursor-not-allowed' : '',
                        ]" :disabled="loading" :autocomplete="'confirm-password'"/>
                    <small id="passwordConfirmationError" class="error" role="alert" aria-live="assertive"
                        v-if="submitted && confirmError">{{ confirmError }}</small>
                    <!-- <p id="passwordConfirmationHint" class="text-sm text-gray-500">Passwords entered do not match.</p> -->
                </div>
            </div>
            <Alert :type="type" :message="message" v-if="message && !loading" />
            <div class="flex justify-between items-center pt-2">
                <Button type="submit" class="!text-lg !py-2.5 !px-8 w-full" :disabled="loading">
                    {{ loading ? 'Please wait...' : 'Create Account'}}</Button>
            </div>
        </div>
    </form>
</template>
<script setup>
import api from '~/api-client/rest-api/index.js';
import customErrorMessages from "~/utils/customMessages.js";
import InputField from '~/components/ui/InputField.vue';
import Alert from '~/components/ui/Alert.vue';
import Button from '~/components/common/Button.vue';
import { useForm, useField } from 'vee-validate';
import { localize } from '~/utils/veeCompat.js';

const emit = defineEmits(['setLogin']);
const { $bus } = useNuxtApp();

const root = ref(null);
const submitted = ref(false);
const loading = ref(false);
const type = ref('success');
const message = ref(null);

// vee-validate 4: rules are registered globally (plugins/26.veeValidate.js); validation is explicit (no blur/change/input)
const { validate } = useForm();
const { value: email, errorMessage: emailError, validate: validateEmail } = useField('email', 'required|email', { label: 'Email Address', initialValue: '' });
const { value: firstName, errorMessage: firstNameError, validate: validateFirstName } = useField('firstName', 'required', { label: 'First Name', initialValue: '' });
const { value: lastName, errorMessage: lastNameError, validate: validateLastName } = useField('lastName', 'required', { label: 'Last Name', initialValue: '' });
const { value: phone, errorMessage: phoneError, validate: validatePhone } = useField('phone', 'required|phoneNumber', { label: 'Phone Number', initialValue: '' });
const { value: password, errorMessage: passwordError, validate: validatePassword } = useField('password', 'required|min:6', { label: 'Password', initialValue: '' });
const confirmRules = computed(() => ({ required: true, password_match: [password.value] }));
const { value: password_confirmation, errorMessage: confirmError, validate: validateConfirm } = useField('password_confirmation', confirmRules, { label: 'Confirm Password', initialValue: '' });

// after the first submit, fields re-validate live while typing
watch(email, () => { if (submitted.value) validateEmail(); });
watch(firstName, () => { if (submitted.value) validateFirstName(); });
watch(lastName, () => { if (submitted.value) validateLastName(); });
watch(phone, () => { if (submitted.value) validatePhone(); });
watch(password, () => { if (submitted.value) { validatePassword(); validateConfirm(); } });
watch(password_confirmation, () => { if (submitted.value) validateConfirm(); });

onMounted(() => {
    localize("en", customErrorMessages);
});

async function formSubmit() {
    submitted.value = true;
    message.value = null;
    const { valid: isValid } = await validate();
    if (!isValid) {
        const errorCount = [firstNameError, lastNameError, emailError, phoneError, passwordError, confirmError].filter((e) => e.value).length;
        $bus.emit('aria-announce', `Form has ${errorCount} error${errorCount > 1 ? 's' : ''}. Please correct them to continue.`);
        await nextTick();
        const firstError = root.value?.querySelector('[aria-invalid="true"]') || root.value?.querySelector('.border-red-600');
        if (firstError) firstError.focus();
        return;
    }
    submitted.value = false;
    try {
        const payload = { "email": email.value, "first_name": firstName.value, "last_name": lastName.value, "password": password.value, "password_confirmation": password_confirmation.value, "phone": phone.value };
        loading.value = true;
        const response = await api.postRequest('customer/register', payload);
        loading.value = false;
        if (response.status !== 200 || !response.data) {
            type.value = 'error';
            message.value = response?.data?.message || 'Unable to signup, please try again';
            return;
        }
        type.value = 'success';
        message.value = response?.data?.message || 'Signup Successful';
        emit('setLogin');
    } catch (error) {
        type.value = 'error';
        message.value = error || 'An unexpected error occurred';
    } finally {
        clearForm();
    }
}
function clearForm() {
    email.value = '';
    firstName.value = '';
    lastName.value = '';
    phone.value = '';
    password.value = '';
    password_confirmation.value = '';
    message.value = null;
}
</script>
