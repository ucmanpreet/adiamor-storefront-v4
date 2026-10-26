<template>
    <form @submit.prevent="formSubmit" @keydown.enter.prevent="formSubmit" class="flex-1" aria-labelledby="signup-heading">
        <h2 id="signup-heading" class="sr-only">
            Create Account Form
        </h2>
        <div class="md:-mt-8 pt-4 md:pt-8 space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <div class="">
                    <InputField type="text" label="First Name" name="firstName" placeholder="Your First Name"
                        v-validate="'required'" v-model="firstName" id="firstName"
                        :disabled="loading" :error="submitted && errors.first('firstName')" />
                </div>
                <div class="">
                    <InputField type="text" label="Last Name" name="lastName" placeholder="Your Last Name"
                        v-validate="'required'" v-model="lastName" id="lastName" :disabled="loading"
                        :error="submitted && errors.first('lastName')" />
                </div>
                <div class="">
                    <InputField type="email" label="Email Address" id="email" v-model="email" name="email"
                        placeholder="Your Email" :error="submitted && errors.first('email')"
                        v-validate="'required|email'" :disabled="loading" />
                </div>
                <div class="">
                    <InputField type="text" label="Phone Number" name="phone" id="phone" placeholder="Your Phone Number"
                        v-validate="'required|phoneNumber'" v-model="phone"
                        :error="submitted && errors.first('phone')" :disabled="loading" />
                </div>
                <div class="space-y-1">
                    <label :for="'password'" class="block text-sm font-medium text-gray-700">
                        Password <span class="ml-0.5 text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input :id="'password'" :type="'password'" v-validate="'required|min:6'"
                        :aria-invalid="submitted && errors.first('password') ? 'true' : undefined"
                        :aria-describedby="submitted && errors.first('password') ? 'passwordError passwordHint' : 'passwordHint'"
                        aria-required="true"
                        name="password" v-model="password" :placeholder="'Your Password'" :class="[
                            'peer border p-3 text-sm w-full',
                            (submitted && errors.first('password')) ? 'border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-1' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                            loading ? 'bg-gray-100 cursor-not-allowed' : '',
                        ]" :disabled="loading" :autocomplete="'new-password'" />
                    <small id="passwordError" class="error" role="alert" aria-live="assertive"
                        v-if="submitted && errors.first('password')">{{ errors.first('password') }}</small>
                    <p id="passwordHint" class="text-sm text-gray-500">Passwords are case sensitive and must be at least 6 characters long.</p>
                </div>
                <div class="space-y-1">
                    <label :for="'password_confirmation'" class="block text-sm font-medium text-gray-700">
                        Confirm Password <span class="ml-0.5 text-red-500" aria-hidden="true">*</span>
                    </label>
                    <input :id="'password_confirmation'" :type="'password'" v-validate="{ required: true, password_match: password }"
                        :aria-invalid="submitted && errors.first('password_confirmation') ? 'true' : undefined"
                        :aria-describedby="submitted && errors.first('password_confirmation') ? 'passwordConfirmationError passwordConfirmationHint' : 'passwordConfirmationHint'"
                        aria-required="true"
                        name="password_confirmation" v-model="password_confirmation" :placeholder="'Your Confirm Password'" :class="[
                            'peer border p-3 text-sm w-full',
                            (submitted && errors.first('password_confirmation')) ? 'border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-1' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                            loading ? 'bg-gray-100 cursor-not-allowed' : '',
                        ]" :disabled="loading" :autocomplete="'confirm-password'"/>
                    <small id="passwordConfirmationError" class="error" role="alert" aria-live="assertive"
                        v-if="submitted && errors.first('password_confirmation')">{{ errors.first('password_confirmation') }}</small>
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
<script>
import api from '~/api-client/rest-api/index.js';
import customErrorMessages from "~/utils/customMessages.js";
import InputField from '~/components/ui/InputField.vue';
import Alert from '~/components/ui/Alert.vue';
import Button from '~/components/common/Button.vue';

export default {
    name : 'Signup',
    components: { InputField, Alert, Button },
    mounted() {
        this.$validator.localize("en", customErrorMessages);
    },
    methods: {
        async formSubmit() {
            this.submitted = true;
            this.message = null;
            const isValid = await this.$validator.validateAll();
            if (!isValid) {
                const errorCount = this.errors.count();
                this.$bus.emit('aria-announce', `Form has ${errorCount} error${errorCount > 1 ? 's' : ''}. Please correct them to continue.`);
                await this.$nextTick();
                const firstError = this.$el.querySelector('[aria-invalid="true"]') || this.$el.querySelector('.border-red-600');
                if (firstError) firstError.focus();
                return;
            }
            this.submitted = false;
            try {
                const payload = { "email": this.email, "first_name": this.firstName, "last_name": this.lastName, "password": this.password, "password_confirmation": this.password_confirmation, "phone": this.phone };
                this.loading = true;
                const response = await api.postRequest(this.$axios, 'customer/register', payload);
                this.loading = false;
                if (response.status !== 200 || !response.data) {
                    this.type = 'error';
                    this.message = response?.data?.message || 'Unable to signup, please try again';
                    return;
                }
                this.type = 'success';
                this.message = response?.data?.message || 'Signup Successful';
                this.$emit('setLogin');
            } catch (error) {
                this.type = 'error';
                this.message = error || 'An unexpected error occurred';
            } finally {
                this.clearForm();
            }
        },
        clearForm() {
            this.email = '';
            this.firstName = '';
            this.lastName = '';
            this.phone = '';
            this.password = '';
            this.password_confirmation = '';
            this.message = null;
        },
    },
    data() {
        return {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            password: '',
            password_confirmation: '',
            submitted: false,
            loading: false,
            type: 'success',
            message: null,
        }
    }
}
</script>