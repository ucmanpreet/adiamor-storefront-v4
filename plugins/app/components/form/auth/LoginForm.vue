<template>
    <div>
        <client-only>
            <form @submit.prevent="loginFormSubmit" @keydown.enter.prevent="loginFormSubmit" aria-labelledby="login-heading" class="flex-1">
                <h2 id="login-heading" class="sr-only">
                    Sign in to your account
                </h2>
                <div class="md:-mt-8 pt-4 md:pt-8 space-y-4">
                    <div>
                        <InputField type="email" label="Email Address" id="loginEmail" v-model="loginEmail" name="loginEmail"
                            placeholder="Your Email" :error="submitted && errors && errors?.first('loginEmail')"
                            v-validate="'required|email'" :rules="`required|email`" :disabled="loading" :autocomplete="'email'" />
                    </div>
                    <div>
                        <div class="relative">
                            <InputField :type="showPassword ? 'text' : 'password'" label="Order Number Or Password" name="loginPassword"
                                id="loginPassword" v-model="loginPassword" placeholder="Order Number Or Password"
                                v-validate="'required'" :rules="'required|min:6'"
                                :error="submitted && errors && errors?.first('loginPassword')" :disabled="loading" :autocomplete="'password'"/>
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
<script>
import api from '~/api-client/rest-api/index.js';
import customErrorMessages from "~/utils/customMessages.js";
import InputField from '~/components/ui/InputField.vue';
import Button from '~/components/common/Button.vue';
import Alert from '~/components/ui/Alert.vue';
import Icon from "~/components/common/Icon.vue";
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
    name : 'LoginForm',
    components: { InputField, Button, Alert, Icon },
    mounted() {
      this.$validator.localize("en", customErrorMessages);
    },
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            submitted: false,
            loading: false,
            showPassword: false,
            type: 'success',
            message: null,
        }
    },
    computed: {
        errors() {
            return this.$validator && this.$validator.errors;
        },
    },
    methods: {
        async loginFormSubmit() {
            this.submitted = true;
            this.message = null;
            const isValid = await this.$validator.validateAll();
            if (!isValid) {
                await this.$nextTick();
                const firstError = this.$el.querySelector('[aria-invalid="true"]');
                if (firstError) firstError.focus();
                return;
            }
            this.submitted = false;
            try {
                const payload = { email: this.loginEmail, password: this.loginPassword };
                this.loading = true;
                const response = await api.postRequest(this.$axios, 'customer/login?token=true', payload);
                this.loading = false;
                if (response.status !== 200 || !response.data) {                    
                    this.type = 'error';
                    this.message = response?.data?.message || 'Unable to login, please try again';                    
                    return;
                }
                let token = response?.data?.token ?? null;
                if (token) {
                    localStorage.setItem('token', token);
                    this.loadWishlist(token);
                }
                this.$store.commit('setUserData', response?.data?.data ?? null);
                this.type = 'success';
                this.message = response?.data?.message || 'Login Successful';
                if(token) this.$router.push(STATIC_ROUTES.MY_ACCOUNT);
            } catch (error) {
                this.type = 'error';
                this.message = error || 'An unexpected error occurred';
            } finally {
                this.clearForm();
            }
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        clearForm() {
            this.loginEmail = this.loginPassword = '';
        },
        emitData() {
            this.$emit('isForget', true);
        },
        
        async loadWishlist(arg = null) {
            const token = localStorage.getItem("token") ?? arg;
            if (token) {
                try {
                    this.$store.commit('setWishListData', null);
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    };
                    const response = await api.getRequest(this.$axios,this.$cookies, `customer/wishlist?token=true&limit=20&page=1`, {}, config);
                    if (response.status !== 200 || !response.data) {
                        return;
                    }
                    if (response?.data?.data) {
                        let newWishlistData = response.data.data ?? [];
                        this.$store.commit('setWishListData', response.data);
                        let wishListData = newWishlistData.map((item) => {
                            return item?.bundle_data && item?.bundle_data?.sku
                             ? {...item, ...item.bundle_data}
                            : item;
                        });
                        this.$store.commit('setLoggedInWishListData', wishListData);
                        this.$store.commit('setGTMData', null);  
                        await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type : 'submit_create_wishlist'});
                    }
                } catch {
                    // wishlist load failure is non-critical, ignore silently
                }
            }
        }
    },
}
</script>

