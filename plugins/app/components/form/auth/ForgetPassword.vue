<template>
    <div>
        <form @submit.prevent="loginFormSubmit" class="flex-1">
            <div class="md:-mt-8 pt-4 md:pt-8 space-y-4">
                <InputField type="email" label="Email Address" id="loginEmail" v-model="loginEmail" name="loginEmail"
                    placeholder="Your Email" :error="submitted && errors.first('loginEmail')"
                    v-validate="'required|email'" :rules="`required|email`" :disabled="loading" />
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
<script>
import api from '~/api-client/rest-api/index.js';
import InputField from '~/components/ui/InputField.vue';
import Button from '~/components/common/Button.vue';
import mixin from '~/mixin/sweetAlert.js';
export default {
    name : 'ForgetPassword',
    components: { InputField, Button },
    methods: {
        createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
        async loginFormSubmit() {
            this.submitted = true;
            const isValid = await this.$validator.validateAll();
            if (!isValid) {
                return;
            }
            this.submitted = false;
            try {
                const payload = { email: this.loginEmail, password: this.loginPassword };
                this.loading = true;
                const response = await api.postRequest(this.$axios, 'customer/forgot-password', payload);
                if (response.status !== 200 || !response.data) {
                    this.createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
                    return;
                }
                this.createSwalAlert(response.data.message, 'success');
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
            this.loginEmail = this.loginPassword = '';
        },
        emitData() {
            this.showForgotPassword = false;
            this.$emit('isForget', this.showForgotPassword);
        }
    },
    data() {
        return {
            email: '',
            loginEmail: '',
            loginPassword: '',
            submitted: false,
            loading: false,
            showForgotPassword: false,
        }
    },
}
</script>