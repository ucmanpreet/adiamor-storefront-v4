<template>
    <div>
        <!-- Screen reader live region: aria-announce events write here -->
        <div
            aria-live="polite"
            aria-atomic="true"
            class="sr-only"
            ref="ariaAnnouncer"
        ></div>

        <div>
            <nav class="flex items-center justify-between text-sm max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8"
                aria-label="Account navigation"
            >
                <ul class="flex items-center gap-4">
                    <li class="flex items-center gap-2">
                        <Link
                            colorType="link"
                            class="!text-sm !font-medium focus:ring-2 focus:ring-primary"
                            :href="wishListPath"
                            @click="$bus.emit('aria-announce','Navigating to Wishlist page')"
                            >
                            <Icon name="heart-solid" class="w-4 h-4 mr-2" aria-hidden="true" />
                            Wishlist
                        </Link>
                    </li>
                </ul>
                <Button
                    type="button"
                    colorType="link"
                    class="focus:ring-2 focus:ring-primary"
                    aria-label="Sign out of account"
                    @click="signOut"
                >
                    <Icon name="logout" class="w-4 h-4 mr-2" aria-hidden="true" />
                    Sign Out
                </Button>
            </nav>

            <!-- Banner — background is decorative CSS, no role="img" needed -->
            <div
                class="relative bg-center bg-cover bg-no-repeat p-8 py-20 md:py-36"
                :style="{ backgroundImage: `url(${$config?.public?.staticPrefix}images/heros/3rowtest.jpg)` }"
            >
                <!-- Mobile-only overlay -->
                <div
                    v-if="isMobile"
                    class="absolute inset-0 bg-black/40"
                ></div>

                <div class="relative max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8">
                    <div :class="isMobile ? 'text-white drop-shadow-lg' : 'text-right'">
                        <h1 class="text-3xl font-normal">My Account</h1>
                        <p class="text-xl">
                            Welcome,
                            {{ userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : 'User' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 mt-4 pb-8 lg:pb-16">
            <div class="border-b border-gray-200 block">
                <div class="-mb-px flex space-x-8">
                    <div role="tablist" aria-label="Account sections" class="flex space-x-8" @keydown="handleTabKeydown">
                        <button
                            id="tab-orders"
                            type="button"
                            role="tab"
                            :aria-selected="selectedTab === 0"
                            aria-controls="panel-orders"
                            :tabindex="selectedTab === 0 ? 0 : -1"
                            @click="selectedTab = 0"
                            class="whitespace-nowrap border-b-2 px-1 py-4 text-sm xl:text-lg font-medium"
                            :class="{ 'border-primary text-primary': selectedTab === 0, 'border-transparent hover:border-gray-300 hover:text-gray-700': selectedTab !== 0 }">
                            Your Orders
                        </button>
                        <button
                            id="tab-account-details"
                            type="button"
                            role="tab"
                            :aria-selected="selectedTab === 1"
                            aria-controls="panel-account-details"
                            :tabindex="selectedTab === 1 ? 0 : -1"
                            @click="selectedTab = 1"
                            class="whitespace-nowrap border-b-2 px-1 py-4 text-sm xl:text-lg font-medium"
                            :class="{ 'border-primary text-primary': selectedTab === 1, 'border-transparent hover:border-gray-300 hover:text-gray-700': selectedTab !== 1 }">
                            Account Details
                        </button>
                    </div>
                </div>
            </div>

            <!-- Orders Tab -->
            <div
                id="panel-orders"
                role="tabpanel"
                aria-labelledby="tab-orders"
                :hidden="selectedTab !== 0"
            >
                <div v-if="!loading && orderData?.length">
                    <div class="py-6">
                        <div>
                            <h2 class="text-sm tracking-tight text-gray-900 sm:text-lg font-medium">Your Order
                                history
                            </h2>
                            <p class="mt-1 text-sm">Check the status of recent orders, manage
                                returns, and discover similar products.</p>
                        </div>

                        <div class="mt-4" v-for="(order, index) in orderData" :key="index">
                            <div class="border-b border-t border-gray-200 bg-white shadow-sm sm:border">
                                <h3 class="sr-only hidden sm:block">Order placed on <time :datetime="order?.created_at">{{
                                    formattedOrderDate(order?.created_at) }}</time></h3>

                                <div
                                    class="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:px-6">
                                    <dl
                                        class="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                                        <div>
                                            <dt class="font-medium text-gray-900">Order number</dt>
                                            <dd class="mt-1">{{ order?.increment_id }}</dd>
                                        </div>
                                        <div class="hidden sm:block">
                                            <dt class="font-medium text-gray-900">Date placed</dt>
                                            <dd class="mt-1">
                                                <time :datetime="order?.created_at">{{ formattedOrderDate(order?.created_at)
                                                }}</time>
                                            </dd>
                                        </div>
                                        <div>
                                            <dt class="font-medium text-gray-900">Total amount</dt>
                                            <dd class="mt-1 font-medium text-gray-900">{{ formattedPrice(order?.grand_total) }}
                                            </dd>
                                        </div>
                                    </dl>

                                    <div class="lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                                        <NuxtLink
                                            v-if="order?.increment_id"
                                            :to="`/view-order/${order?.increment_id}`"
                                            class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-primary"
                                            :aria-label="`View order ${order?.increment_id}, Date: ${formattedOrderDate(order?.created_at)}, Total: ${formattedPrice(order?.grand_total)}, status: ${order?.status === 'completed' ? 'Shipped on ' + formattedOrderDate(order?.delivery_date) : order?.status === 'canceled' ? 'Canceled' : order?.status }`"
                                            @click="$bus.emit('aria-announce','Opening order ' + order?.increment_id)"
                                        >
                                            View Order
                                        </NuxtLink>
                                    </div>
                                </div>

                                <!-- Products -->
                                <ul role="list" :aria-label="`Items in order ${order?.increment_id}`" class="divide-y divide-gray-200" v-if="order?.items">
                                    <li class="p-4 sm:p-6" v-for="(item, indexInner) in order?.items" :key="indexInner">
                                        <div class="flex items-center sm:items-start">
                                            <div v-if="item?.product?.images && item?.product?.images.length"
                                                class="w-20 h-20 shrink-0 overflow-hidden bg-gray-200 sm:w-32 sm:h-32">
                                                <MediaImage :src="item"
                                                    :alt="item?.product?.name"
                                                    className="w-full h-full object-contain"/>
                                            </div>
                                            <div class="ml-6 flex-1 text-sm">
                                                <div class="font-medium text-gray-900 sm:flex sm:justify-between">
                                                    <h5>{{ item?.product?.name }}</h5>
                                                    <p class="mt-2 sm:mt-0"><span class="sr-only">Price: </span>{{ !item?.additional?.certificate ? formattedPrice(fetchPriceData(item)) : 'Free' }}</p>
                                                </div>
                                                <p class="mt-3 text-sm" v-if="!item?.additional?.certificate">{{  fetchLabel(item?.product) }} <span class="uppercase"> {{ item?.product?.sku }} </span></p>
                                                <!-- <p class="hidden sm:mt-2 sm:block" v-html="item?.product?.short_description"></p> -->
                                                <AdditionalData :item="item" />
                                            </div>
                                        </div>
                                        <div
                                            class="mt-6 sm:ml-auto flex items-center divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:mt-0 sm:border-none sm:pt-0">
                                            <div class="flex flex-1 justify-end" v-if="item?.product?.attribute_family_code != 'default'">
                                                <span class="mr-auto sm:hidden">Order placed on <time :datetime="order?.created_at">{{
                                                    formattedOrderDate(order?.created_at) }}</time></span>
                                                <NuxtLink :to="getRedirectUrl(item?.product)"
                                                    :aria-label="`View product ${item?.product?.name}, SKU: ${item?.product?.sku}, Price: ${formattedPrice(fetchPriceData(item))}`"
                                                    @click="$bus.emit('aria-announce','View product ' + item?.product?.name)"
                                                    class="whitespace-nowrap text-primary hover:text-primary focus:ring-2 focus:ring-primary">
                                                    View product
                                                </NuxtLink>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <div class="mt-6 py-3 sm:flex justify-center"
                                    :class="{
                                        'bg-red-50': order?.status == 'canceled',
                                        'bg-green-50': order?.status == 'completed',
                                        'bg-blue-50': order?.status != 'canceled' && order?.status != 'completed'
                                    }"
                                >

                                    <div class="flex items-center" v-if="order?.status == 'canceled'">
                                        <Icon name="ban" class="w-4 h-4 text-red-500" aria-hidden="true" />
                                        <p class="ml-2 text-sm font-medium">Canceled</p>
                                    </div>

                                    <div class="flex items-center" v-else>
                                        <Icon :name="order?.status === 'completed' ? 'check-circle-fill' : 'info'"
                                            class="w-5 h-5"
                                            aria-hidden="true"
                                            :class="order?.status === 'completed' ? 'text-green-500' : 'text-blue-500'" />

                                        <p class="ml-2 text-sm font-medium">
                                            <template v-if="order?.status === 'completed'">
                                                <span>Shipped on</span>
                                                <time :datetime="order?.delivery_date">
                                                    {{ formattedOrderDate(order?.delivery_date) }}
                                                </time>
                                            </template>
                                            <template v-else>
                                                Estimated Ship Date :
                                                <template v-if="estimatedShipText(order)?.length">
                                                    <span v-for="(d, i) in estimatedShipText(order)" :key="i">
                                                        <time :datetime="d">{{ formattedOrderDate(d) }}</time>
                                                        <span v-if="i === 0 && estimatedShipText(order)?.length === 2"> - </span>
                                                    </span>
                                                </template>
                                                <span v-else>
                                                    N/A
                                                </span>
                                            </template>

                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div
                    v-if="loading"
                    class="flex items-center justify-center py-24"
                    role="status"
                    aria-label="Loading your orders, please wait"
                >
                    <CustomLoader aria-hidden="true" />
                </div>
                <div class="py-12 flex flex-col gap-3 items-center justify-center"
                    v-if="!loading && !orderData?.length"
                >
                    <!-- Decorative illustration; hidden from AT -->
                    <Icon name="custom-shopping-cart" class="w-72 h-72" aria-hidden="true" />
                    <h2 class="font-semibold text-lg">
                        No orders found
                    </h2>
                    <p class="max-w-sm text-center">It looks like you haven't placed any orders
                        yet. Start exploring our amazing products
                        and make your first purchase!</p>

                    <div class="bg-gray-100 py-2 px-4 text-sm flex" role="note">
                        <Icon name="info" class="w-4 h-4 mr-2 mt-1 flex-none" aria-hidden="true" />
                        <p>
                            Need help or facing an issue? Contact <NuxtLink :to="customerPath" class="text-primary font-medium inline px-1">Customer Service</NuxtLink> for assistance.
                        </p>
                    </div>
                </div>
            </div>

            <div
                id="panel-account-details"
                role="tabpanel"
                aria-labelledby="tab-account-details"
                :hidden="selectedTab !== 1"
            >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-12 py-6">
                    <article class="space-y-4">
                        <h2 class="text-sm tracking-tight text-gray-900 sm:text-lg font-medium">Personal Details</h2>
                        <p class="mt-1 text-sm">View and manage your personal details and contact information</p>

                        <form @submit.prevent="formSubmit" class="space-y-4">
                            <fieldset class="space-y-4 border-0 p-0 m-0 min-w-0 flex flex-col">
                                <legend class="sr-only">Personal information form</legend>
                                <InputField type="text" label="First Name" name="firstName"
                                    placeholder="Your First Name" v-validate="'required'" :rules="`required`"
                                    v-model="firstName" :value="firstName" id="firstName" :disabled="submitLoading"
                                    :error="submittedPersonal && errors.first('firstName')" />
                                <InputField type="text" :value="lastName" label="Last Name" name="lastName" placeholder="Your Last Name"
                                    v-validate="'required'" :rules="`required`" v-model="lastName" id="lastName"
                                    :disabled="submitLoading" :error="submittedPersonal && errors.first('lastName')" />
                                <InputField type="email" :value="email" label="Email Address" id="email" v-model="email" name="email"
                                    placeholder="Your Email" readonly :error="submittedPersonal && errors.first('email')"
                                    v-validate="'required|email'" :rules="`required|email`" :disabled="true" />
                                <InputField type="text" :value="phone" label="Phone Number" name="phone"
                                    placeholder="Your Phone Number" v-validate="'required|phoneNumber'"
                                    :rules="'required|phoneNumber'" v-model="phone" id="phone"
                                    :error="submittedPersonal && errors.first('phone')" :disabled="submitLoading" />
                            </fieldset>
                            <Button type="submit" class="btn btn-primary"
                                :aria-label="submitLoading ? 'Saving personal details, please wait' : 'Save personal details'"
                                >{{submitLoading ? 'Please wait...' : 'Save'}}</Button>
                        </form>
                    </article>

                    <article class="space-y-4 sm:max-w-sm w-full ml-auto mt-6 sm:mt-0">
                        <h2 class="text-sm tracking-tight text-gray-900 sm:text-lg font-medium">Account Password</h2>

                        <form @submit.prevent="formSubmitReset" class="space-y-4">
                            <fieldset class="space-y-4 border-0 p-0 m-0 min-w-0 flex flex-col">
                                <legend class="sr-only">Reset password form</legend>
                                <div class="space-y-1">
                                    <label :for="'password'" class="block text-sm font-medium text-gray-700">
                                        Password <span class="ml-0.5 text-red-500" aria-hidden="true">*</span>
                                        <span class="sr-only">(required)</span>
                                    </label>
                                    <input :id="'password'" :type="'password'" v-validate="'required|min:6'"
                                        name="password" v-model="password"
                                        :aria-invalid="submitted1 && errors.first('password') ? 'true' : 'false'"
                                        :aria-describedby="submitted1 && errors.first('password') ? 'password-error' : undefined"
                                        :placeholder="'New Password'" :class="[
                                            'peer border p-3 text-sm w-full',
                                            (submitted1 && errors.first('password')) ? 'border-red-600 focus:ring-red-600' : 'border-gray-200',
                                            submitLoading1 ? 'bg-gray-100 cursor-not-allowed' : '',
                                        ]" :disabled="submitLoading1" :autocomplete="'new-password'" />
                                    <!-- Error message linked via aria-describedby -->
                                    <p
                                        v-if="submitted1 && errors.first('password')"
                                        id="password-error"
                                        role="alert"
                                        class="text-red-600 text-xs mt-1"
                                    >{{ errors.first('password') }}</p>
                                </div>
                                <div class="space-y-1">
                                    <label :for="'password_confirmation'" class="block text-sm font-medium text-gray-700">
                                        Confirm Password <span class="ml-0.5 text-red-500" aria-hidden="true">*</span>
                                        <span class="sr-only">(required)</span>
                                    </label>
                                    <input :id="'password_confirmation'" :type="'password'" v-validate="{ required: true, password_match: password }"
                                        name="password_confirmation" v-model="password_confirmation"
                                        :aria-invalid="submitted1 && errors.first('password_confirmation') ? 'true' : 'false'"
                                        :aria-describedby="submitted1 && errors.first('password_confirmation') ? 'confirm-password-error' : undefined"
                                        :placeholder="'Your Confirm Password'" :class="[
                                            'peer border p-3 text-sm w-full',
                                            (submitted1 && errors.first('password_confirmation')) ? 'border-red-600 focus:ring-red-600' : 'border-gray-200',
                                            submitLoading1 ? 'bg-gray-100 cursor-not-allowed' : '',
                                        ]" :disabled="submitLoading1" :autocomplete="'new-password'" />
                                    <!-- Error message linked via aria-describedby -->
                                    <p
                                        v-if="submitted1 && errors.first('password_confirmation')"
                                        id="confirm-password-error"
                                        role="alert"
                                        class="text-red-600 text-xs mt-1"
                                    >{{ errors.first('password_confirmation') }}</p>
                                </div>

                            </fieldset>
                            <Button type="submit" class="btn btn-primary"
                                :aria-label="submitLoading1 ? 'Resetting password, please wait' : 'Reset account password'"
                                :disabled="submitLoading1"
                            >
                                {{ submitLoading1 ? 'Please wait...' : 'Reset Password'}}
                            </Button>
                        </form>
                    </article>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '~/api-client/rest-api/index';
import InputField from '~/components/ui/InputField.vue';
import Link from '~/components/ui/Link.vue';
import Icon from '~/components/common/Icon.vue';
import Button from '~/components/common/Button.vue';
import AdditionalData from '~/components/checkout/AdditionalData.vue';
import CustomLoader from '~/components/ui/CustomLoader.vue';
import { fetchPriceData, fetchSKULabel } from "~/utils/universalHelper.js";
import mixin from "~/mixin/sweetAlert";
import MediaImage from "~/components/common/MediaImage.vue";
import { redirectionUrl } from "~/utils/universalHelper";
import { STATIC_ROUTES } from '~/utils/staticRoutes';
import customErrorMessages from "~/utils/customMessages.js";

export default {
    name : "MyAccountPage",
    components: { InputField, Link, Icon, Button, AdditionalData, CustomLoader, MediaImage },
    head() {
        // MY ACCOUNT SEO INDEXING OFF
        return {
            meta: [
                { hid: 'robots', name: 'robots', content: 'noindex' }
            ]
        };
    },
    data() {
        return {
            selectedTab: 0,
            orderData: [],
            token: null,
            loading: true,
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            password: '',
            password_confirmation: '',
            submittedPersonal: false,
            submitted1: false,
            submitLoading: false,
            submitLoading1: false,
            userInfo: null,
            wishListPath: STATIC_ROUTES.WISHLIST,
            customerPath: STATIC_ROUTES.CUSTOMER_SERVICE
        }
    },
    async mounted() {
        this.$validator.localize("en", customErrorMessages);

        // Wire aria-announce events to the live region so screen readers hear them
        this.$bus.on('aria-announce', (message) => {
            const el = this.$refs.ariaAnnouncer;
            if (!el) return;
            // Clear then set forces re-announcement even when the message is the same
            el.textContent = '';
            this.$nextTick(() => { el.textContent = message; });
        });

        this.token = localStorage.getItem('token');
        if (!this.token){
            return this.$router.push(STATIC_ROUTES.LOGIN);
        }
        await this.getOrders();
        this.userInfo = this.$store.getters.getUserData;
        this.email = this.userInfo?.email;
        this.firstName = this.userInfo?.first_name;
        this.lastName = this.userInfo?.last_name;
        this.phone = this.userInfo?.phone;
    },
    beforeUnmount() {
        // Remove the aria-announce listener to prevent memory leaks
        this.$bus.off('aria-announce');
    },
    methods: {
        handleTabKeydown(e) {
            const tabs = this.$el.querySelectorAll('[role="tab"]');
            const tabArray = Array.from(tabs);
            const currentIndex = tabArray.indexOf(document.activeElement);
            let nextIndex = currentIndex;
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextIndex = (currentIndex + 1) % tabArray.length;
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                nextIndex = (currentIndex - 1 + tabArray.length) % tabArray.length;
            } else {
                return;
            }
            tabArray[nextIndex].focus();
            this.selectedTab = nextIndex;
        },
        createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
        fetchPriceData: item => fetchPriceData(item),
        fetchLabel: item => fetchSKULabel(item),
        getRedirectUrl(item) {
           return redirectionUrl(item) || STATIC_ROUTES.HOME;
        },
        formattedPrice(price) {
            if (price === 0) return this.$formatPrice(0);
            if (price) return this.$formatPrice(parseFloat(price), true);
        },
        async getOrders() {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                    }
                };
                const response = await api.getRequest(this.$axios,this.$cookies, 'customer/orders?token=true', {}, config);
                this.loading = false;
                if (response.status !== 200 || !response.data) {
                    this.createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
                    return;
                }
                if (response?.data?.data) {
                    this.orderData = response?.data?.data;
                }
            } catch (error) {
                this.createSwalAlert('An unexpected error occurred', 'error');
            } finally {
                this.loading = false;
            }
        },
        async signOut() {
            this.$bus.emit('aria-announce', 'Signing out');
            await this.$store.dispatch('logout', { context: this, router: this.$router });
        },
        async formSubmit() {
            this.submittedPersonal = true;
            await this.$nextTick();
            await this.$validator.validateAll();
            await this.$nextTick();

            const fields = ['firstName', 'lastName', 'phone'];
            const firstErrorField = fields.find(f => !!this.errors.first(f));

            if (firstErrorField) {
                const el = document.getElementById(firstErrorField);
                if (el) el.focus();
                return;
            }

            this.submittedPersonal = false;

            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                    }
                };
                const payload = { "first_name": this.firstName, "last_name": this.lastName, "phone": this.phone };
                this.submitLoading = true;
                const response = await api.putRequest(this.$axios, 'customer/profile', payload, config);
                if (response.status !== 200 || !response.data) {
                    this.$bus.emit('aria-announce', 'Failed to update personal details');
                    this.createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
                    return;
                }

                this.$bus.emit('aria-announce', 'Personal details updated successfully');

                this.createSwalAlert(response.data.message, 'success');
                this.userInfo = response?.data?.data;
                this.email = this.userInfo?.email;
                this.firstName = this.userInfo?.first_name;
                this.lastName = this.userInfo?.last_name;
                this.phone = this.userInfo?.phone;
                this.$store.commit('setUserData', response?.data?.data ?? null);
            } catch (error) {
                this.$bus.emit('aria-announce', 'An unexpected error occurred while updating personal details');
                this.createSwalAlert('An unexpected error occurred', 'error');
            } finally {
                this.submitLoading = false;
                this.submittedPersonal = false;
            }
        },
        async formSubmitReset() {
            this.submitted1 = true;
            const isPasswordValid = await this.$validator.validate('password');
            const isPasswordConfirmationValid = await this.$validator.validate('password_confirmation');

            if (!isPasswordValid || !isPasswordConfirmationValid) {
                await this.$nextTick();
                const firstErrorField = !isPasswordValid ? 'password' : 'password_confirmation';
                const el = document.getElementById(firstErrorField);
                if (el) el.focus();
                return;
            }

            this.submitted1 = false;

            const config = {
                    headers: {
                        'Authorization': `Bearer ${this.token}`,
                    }
                };
            try {
                const payload = {
                    // "email": this.email,
                    "first_name": this.firstName, "last_name": this.lastName,
                    "password": this.password,
                    "password_confirmation": this.password_confirmation
                };
                this.submitLoading1 = true;
                const response = await api.putRequest(this.$axios, 'customer/profile', payload, config);
                if (response.status !== 200 || !response.data) {
                    this.$bus.emit('aria-announce', 'Failed to reset password');
                    this.createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
                    return;
                }

                this.createSwalAlert(response.data.message, 'success');
                this.$bus.emit('aria-announce', 'Password updated successfully');
                this.$bus.emit('aria-announce', 'Signing out');
                await this.$store.dispatch('logout', { context: this, router: this.$router });
            } catch (error) {
                this.$bus.emit('aria-announce', 'An unexpected error occurred while resetting password');
                this.createSwalAlert('An unexpected error occurred', 'error');
            } finally {
                this.submitLoading1 = false;
                this.password= this.password_confirmation = '';
                this.submitted1 = false;
            }
        },
        estimatedShipText(order) {
            const est = order?.estimated_ship_date;
            if (!est?.start_date) return [];

            const start = new Date(est.start_date);
            const end = est.end_date ? new Date(est.end_date) : null;

            // start == end → single date
            if (!end || start.getTime() === end.getTime()) {
                return [est.start_date];
            }

            // range
            return [est.start_date, est.end_date];
        },
        formattedOrderDate(date) {
			return (date) ? new Date(date).toLocaleString('en-us', {
				month: 'short', // Abbreviated month name (e.g., 'Jul')
				day: 'numeric', // Day of the month
				year: 'numeric' // Full year (e.g., '2021')
			}) : '-';
		}
    },
    computed:{
        isMobile() {
        return this.$isMobile;
        },
    }
}
</script>
