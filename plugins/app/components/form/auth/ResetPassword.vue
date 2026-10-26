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
                                    :aria-invalid="submitted && errors.first('email') ? 'true' : 'false'"
                                    aria-describedby="emailError"
                                    placeholder="Your Email" :error="submitted && errors.first('email')"
                                    v-validate="'required|email'" :rules="`required|email`" :disabled="loading" />
                                <small
                                    id="emailError"
                                    class="error"
                                    role="alert"
                                    aria-live="assertive"
                                    v-show="submitted && errors.first('email')"
                                    >
                                    {{ errors.first('email') }}
                                </small>
                            </div>
                            <div class="space-y-1">
                                <label :for="'password'" class="block text-sm font-medium text-gray-700">
                                    Password <span class="ml-0.5 text-red-500">*</span>
                                </label>
                                <input :id="'password'" :type="'password'" v-validate="'required|min:6'" :ref="'password'"
                                    :aria-invalid="submitted && errors.first('password') ? 'true' : 'false'"
                                    aria-describedby="passwordError"
                                    name="password" v-model="password" :placeholder="'Your Password'" :class="[
                                        'peer border p-3 text-sm w-full',
                                        (submitted && errors.first('password')) ? 'border-red-600 focus:ring-red-600' : 'border-gray-200',
                                        loading ? 'bg-gray-100 cursor-not-allowed' : '',
                                    ]" :disabled="loading" :autocomplete="'false'" />
                                    <small
                                        id="passwordError"
                                        class="error"
                                        role="alert"
                                        aria-live="assertive"
                                        v-show="submitted && errors.first('password')"
                                        >
                                        {{ errors.first('password') }}
                                    </small>
                            </div>
                            <div class="space-y-1">
                                <label :for="'password_confirmation'" class="block text-sm font-medium text-gray-700">
                                    Confirm Password <span class="ml-0.5 text-red-500">*</span>
                                </label>
                                <input :id="'password_confirmation'" :type="'password'" v-validate="{ required: true, password_match: password }" :ref="'password_confirmation'"
                                    :aria-invalid="submitted && errors.first('password_confirmation') ? 'true' : 'false'"
                                    aria-describedby="passwordConfirmationError"
                                    name="password_confirmation" v-model="password_confirmation" :placeholder="'Your Confirm Password'" :class="[
                                        'peer border p-3 text-sm w-full',
                                        (submitted && errors.first('password_confirmation')) ? 'border-red-600 focus:ring-red-600' : 'border-gray-200',
                                        loading ? 'bg-gray-100 cursor-not-allowed' : '',
                                    ]" :disabled="loading" :autocomplete="'false'" />
                                    <small
                                        id="passwordConfirmationError"
                                        class="error"
                                        role="alert"
                                        aria-live="assertive"
                                        v-show="submitted && errors.first('password_confirmation')"
                                        >
                                        {{ errors.first('password_confirmation') }}
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

<script>
import api from '~/api-client/rest-api/index.js';
import InputField from '~/components/ui/InputField.vue';
import Button from '~/components/common/Button.vue';
import mixin from '~/mixin/sweetAlert.js';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import customErrorMessages from "~/utils/customMessages.js";

export default {
    name : 'ResetPassword',
    components: { InputField, Button },
    methods: {
        createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
        async formSubmit() {
            this.submitted = true;
            const isValid = await this.$validator.validateAll();
            if (!isValid) {
                return;
            }
            this.submitted = false;
            if (!this.token) {
                return this.createSwalAlert('Invalid or empty token', 'error');
            }
            try {
                const payload = {
                    "email": this.email,
                    "password": this.password,
                    "password_confirmation": this.password_confirmation,
                    "token": this.token
                };
                this.loading = true;
                const response = await api.postRequest(this.$axios, 'customer/reset-password', payload);
                if (response.status !== 200 || !response.data) {
                    this.createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
                    return;
                }
                this.createSwalAlert(response.data.message, 'success');
                this.$router.push(STATIC_ROUTES.LOGIN);
            } catch (error) {
                console.error(error);
                this.createSwalAlert('An unexpected error occurred', 'error');
            } finally {
                this.loading = false;
                this.clearForm();
                this.submitted = false;
            }
        },
        clearForm() {
            this.password = '';
            this.password_confirmation = '';
        },
    },
    data() {
        return {
            password: '',
            email: '',
            password_confirmation: '',
            submitted: false,
            loading: false,
            token: null
        }
    },
    mounted() {
        this.$validator.localize("en", customErrorMessages);
        this.token = this.$route.params.token;
    }
}
</script>