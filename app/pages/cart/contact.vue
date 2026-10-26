<template>
    <div class="bg-gray-50">

        <h1 id="checkout-heading" class="sr-only">Checkout - Shipping and Billing Information</h1>

        <!-- <ProgressStep /> -->

        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000004] group-light" v-show="loader"
            role="status"
            aria-live="polite"
            aria-label="Loading"
            :aria-hidden="!loader ? 'true' : null"
        >
            <CustomLoader />
        </div>

        <main>
        <section aria-labelledby="checkout-heading" class="max-w-7xl mx-auto w-full px-4 lg:px-8 py-8">
            <form class="lg:flex gap-4 lg:gap-x-16 xl:gap-x-20 h-full" @submit.prevent="submitForm()">

                <!-- Left column -->
                <div class="flex-1 min-w-0 space-y-4">

                    <!-- Card header -->
                    <div>
                        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div class="flex items-start gap-3">
                                <Icon name="truck" class="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                                <div>
                                    <h2 class="text-lg font-semibold text-gray-900 leading-tight" style="text-transform: none;">Shipping</h2>
                                </div>
                            </div>
                            <!-- Shipping method toggle -->
                            <div class="flex items-center text-sm border group overflow-hidden focus-within:overflow-visible border-primary self-start flex-shrink-0">
                                <Button type="button"
                                    @click="assignResidentailShipping"
                                    class="flex-1 !normal-case border-r border-black"
                                    :colorType="selectedShipping != 'fedex' ? 'black' : 'transparent'"
                                    :aria-pressed="selectedShipping !== 'fedex' ? 'true' : 'false'"
                                >
                                    <span class="flex items-center gap-1.5 whitespace-nowrap">
                                        <Icon name="truck" class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                        Ship to Address
                                    </span>
                                </Button>
                                <Button type="button"
                                    @click="assignFedexShipping"
                                    class="flex-1 !normal-case whitespace-nowrap"
                                    :colorType="selectedShipping == 'fedex' ? 'black' : 'transparent'"
                                    :aria-pressed="selectedShipping === 'fedex' ? 'true' : 'false'"
                                >
                                    <span class="flex items-center gap-1.5">
                                        <Icon name="map-pin" class="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                                        Pickup at FedEx
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <!-- ── Shipping Address Card ── -->
                    <div class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">


                        <!-- Card body -->
                        <div class="px-6 py-5">
                            <div aria-live="assertive" aria-atomic="true" class="mb-1">
                                <span
                                    v-if="submitted && showErrorMessage"
                                    class="error"
                                    id="form-error"
                                    role="alert"
                                >
                                    Please complete all required fields
                                </span>
                            </div>

                            <div :key="selectedShippingKey">
                                <div class="mt-2 grid grid-cols-1 gap-y-5 sm:grid-cols-6 sm:gap-x-4">

                                    <!-- First Name -->
                                    <div class="sm:col-span-3">
                                        <div class="mt-1 relative">
                                            <input type="text" id="shipping_name" name="shipping_name"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                v-model="order_shipping.first_name"
                                                placeholder=" "
                                                :aria-describedby="selectedShipping != 'fedex' && submitted && formErrors.shipping_name ? 'form-error' : ''"
                                                :class="selectedShipping != 'fedex' && submitted && formErrors.shipping_name ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                key="shipping1"
                                                autocomplete="shipping given-name"/>
                                            <label for="shipping_name"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">First Name</label>
                                        </div>
                                    </div>

                                    <!-- Last Name -->
                                    <div class="sm:col-span-3">
                                        <div class="mt-1 relative">
                                            <input type="text"
                                                id="shipping_last_name"
                                                name="shipping_last_name"
                                                :aria-describedby="submitted && formErrors.shipping_last_name ? 'form-error' : ''"
                                                placeholder=" "
                                                class="peer block w-full pt-6 pb-2 bg-white px-4 text-sm border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                key="shipping2"
                                                :class="submitted && formErrors.shipping_last_name ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                v-model="order_shipping.last_name"
                                                autocomplete="shipping family-name"
                                            />
                                            <label for="shipping_last_name"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">
                                                Last Name
                                            </label>
                                        </div>
                                    </div>

                                    <!-- Phone -->
                                    <div class="sm:col-span-3">
                                        <div class="mt-1 relative">
                                            <input type="tel" id="phone" name="phone"
                                                :aria-describedby="submitted && formErrors.phone ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                placeholder=" "
                                                v-model="order_shipping.phone"
                                                @input="handlePhoneInput('shipping', $event)" @keypress="validateKeyPress"
                                                :class="submitted && formErrors.phone ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="shipping tel" />
                                            <label for="phone"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Phone Number</label>
                                        </div>
                                    </div>

                                    <!-- Email -->
                                    <div class="sm:col-span-3">
                                        <div class="mt-1 relative">
                                            <input type="email" id="email" name="email"
                                                autocomplete="email"
                                                :aria-describedby="submitted && formErrors.email ? 'form-error' : ''"
                                                placeholder=" "
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                :class="submitted && formErrors.email ? 'border-red-500 focus-visible:outline-red-500 focus-visible:ring-red-500' : 'border-gray-200'"
                                                v-model="order_shipping.email" />
                                            <label for="email"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Email Address</label>
                                        </div>
                                    </div>

                                    <!-- Subscribe checkboxes -->
                                    <div class="sm:col-span-3 flex items-center gap-2.5">
                                        <input type="checkbox" name="updates1"
                                            class="w-4 h-4 checkbox rounded border-2 border-gray-300 text-primary focus:ring-primary cursor-pointer" id="updates1"
                                            v-model="is_phone_number_subscribe" />
                                        <label for="updates1" class="block text-sm text-secondary-800 cursor-pointer">Text me about updates to my order</label>
                                    </div>
                                    <div class="sm:col-span-3 flex items-center gap-2.5">
                                        <input type="checkbox" name="updates"
                                            class="w-4 h-4 checkbox rounded border-2 border-gray-300 text-primary focus:ring-primary cursor-pointer" id="updates"
                                            v-model="is_email_subscribe" />
                                        <label for="updates" class="block text-sm text-secondary-800 cursor-pointer">Subscribe for news and special offers</label>
                                    </div>

                                    <!-- Address Type -->
                                    <fieldset class="pt-2 col-span-full" v-if="selectedShipping != 'fedex'">
                                        <legend class="text-sm font-medium text-gray-700 mb-3">Address Type</legend>
                                        <div class="flex flex-wrap gap-x-8 gap-y-3">
                                            <div class="col-span-full flex items-center gap-2.5" v-if="selectedShipping != 'fedex'">
                                                <input type="checkbox" id="is_business_address"
                                                    class="w-4 h-4 checkbox rounded border-2 border-gray-300 text-primary focus:ring-primary cursor-pointer"
                                                    :checked="isBusinessAddress"
                                                    @change="onBusinessAddressChange" />
                                                <label for="is_business_address" class="text-sm text-secondary-600 cursor-pointer">This is a business address</label>
                                            </div>
                                        </div>
                                    </fieldset>

                                    <!-- Company -->
                                    <div class="col-span-full" v-if="selectedShipping == 'business' || order_shipping.company_name">
                                        <div class="mt-1 relative">
                                            <input type="text" name="shipping_company" id="shipping_company"
                                                placeholder=" "
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                v-model="order_shipping.company_name"
                                                :disabled="selectedShipping == 'fedex'"
                                                key="shipping3" />
                                            <label for="shipping_company"
                                                class="block text-secondary-600 text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Company</label>
                                        </div>
                                    </div>

                                    <!-- Address Line 1 (AddressAutoComplete) -->
                                    <div class="col-span-full">
                                        <AddressAutoComplete
                                            :autoAttr="'shipping address-line1'"
                                            :isDisabled="selectedShipping == 'fedex'"
                                            :submitted="submitted"
                                            @updateAddress="assignAddresses($event, true)"
                                            :address="order_shipping"
                                            :loader="loader"
                                            :id="'shipping_address1'"
                                            @input="value => order_shipping.address1 = value"
                                            :key="`shipping_address_${selectedShipping}`"
                                        />
                                    </div>

                                    <!-- Address Line 2 -->
                                    <div class="col-span-full">
                                        <div class="mt-1 relative">
                                            <input type="text" name="shippingAddress2" id="shippingAddress2"
                                                v-model="order_shipping.address2"
                                                placeholder=" "
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                key="shipping5"
                                                autocomplete="shipping address-line2"/>
                                            <label for="shippingAddress2"
                                                class="block text-secondary-600 text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Address Line 2 (Optional)</label>
                                        </div>
                                    </div>

                                    <!-- City -->
                                    <div class="sm:col-span-2">
                                        <div class="mt-1 relative">
                                            <input type="text" id="shipping_city" name="shipping_city"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-gray-50"
                                                v-model="order_shipping.city"
                                                :aria-describedby="selectedShipping != 'fedex' && submitted && formErrors.shipping_city ? 'form-error' : ''"
                                                placeholder=" "
                                                :disabled="selectedShipping == 'fedex'" key="shipping6"
                                                :class="selectedShipping != 'fedex' && submitted && formErrors.shipping_city ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="shipping city"/>
                                            <label for="shipping_city"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">City</label>
                                        </div>
                                    </div>

                                    <!-- State -->
                                    <div class="sm:col-span-2" :key="stateKey2">
                                        <div class="mt-1 relative" v-if="(order_shipping.country && (states[1] && !states[1].length) || order_shipping.country == 'FR')">
                                            <input type="text" id="shipping_state" name="shipping_state"
                                                :aria-describedby="selectedShipping != 'fedex' && submitted && formErrors.shipping_state ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder=" " v-model="order_shipping.state"
                                                :disabled="selectedShipping == 'fedex'" key="shipping7"
                                                :class="selectedShipping != 'fedex' && submitted && formErrors.shipping_state ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="shipping state"/>
                                            <label for="shipping_state" class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">State</label>
                                        </div>
                                        <div class="mt-1" v-show="(!order_shipping.country || (states[1] && states[1].length) && order_shipping.country != 'FR')">
                                            <UniversalDropdown
                                                key="shipping_state"
                                                :options="states[1]"
                                                v-model="order_shipping.state"
                                                :selectedValue="order_shipping.state"
                                                optionLabel="code"
                                                optionValue="code"
                                                placeholder="State"
                                                @change="updateShippingState($event)"
                                                :disabled="selectedShipping == 'fedex'"
                                                forcePosition="top"
                                                maxHeight="20rem"
                                                :inputClass="selectedShipping != 'fedex' && submitted && !order_shipping.state ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                            />
                                        </div>
                                    </div>

                                    <!-- Zip -->
                                    <div class="sm:col-span-2">
                                        <div class="mt-1 relative">
                                            <input type="text" name="shipping_postal_code" id="shipping_postal_code"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder=" "
                                                :aria-describedby="selectedShipping != 'fedex' && submitted && formErrors.shipping_postal_code ? 'form-error' : ''"
                                                v-model="order_shipping.postcode" :disabled="selectedShipping == 'fedex'"
                                                :class="selectedShipping != 'fedex' && submitted && formErrors.shipping_postal_code ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="shipping postal-code"/>
                                            <label for="shipping_postal_code"
                                                class="block text-secondary-600 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Zipcode <span v-if="getPostcodeValidation(order_shipping.country)" class="text-red-500 ml-0.5">*</span></label>
                                        </div>
                                    </div>

                                    <!-- Country -->
                                    <div class="col-span-full">
                                        <div class="mt-1 relative">
                                            <input type="hidden" id="shipping_country" name="shipping_country"
                                                v-model="order_shipping.country" />
                                            <UniversalDropdown
                                                :options="newCountryJson"
                                                v-model="order_shipping.country"
                                                :selectedValue="order_shipping.country"
                                                optionLabel="country_name"
                                                optionValue="code"
                                                placeholder="Country"
                                                ariaLabel="Country (required)"
                                                @change="updateShippingCountry($event)"
                                                :disabled="selectedShipping == 'fedex'"
                                                forcePosition="top"
                                                maxHeight="20rem"
                                                :inputClass="selectedShipping != 'fedex' && submitted && formErrors.shipping_country ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2.5 mb-5" v-show="selectedShipping != 'fedex'">
                        <input type="checkbox" v-model="sameAsAbove" name="sameAddress"
                            class="w-4 h-4 checkbox rounded border-2 border-gray-300 text-primary focus:ring-primary cursor-pointer" id="sameAddress"
                            @change="resetAddress()" />
                        <label for="sameAddress" class="block text-sm text-secondary-800 cursor-pointer">Use this address for billing</label>
                    </div>

                    <!-- ── Billing Information Card ── -->
                    <div v-show="!sameAsAbove" :aria-hidden="sameAsAbove ? 'true' : null" class="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">

                        <!-- Card header -->
                        <div class="px-6 pt-6 pb-4">
                            <div class="flex items-start gap-3">
                                <Icon name="document" class="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                                <div>
                                    <h2 class="text-lg font-semibold text-gray-900 leading-tight" style="text-transform: none;">Billing Information</h2>
                                </div>
                            </div>
                        </div>

                        <!-- Card body -->
                        <div class="px-6 py-5">
                            <div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-5 sm:gap-x-4">
                                    <!-- First Name -->
                                    <div>
                                        <div class="mt-1 relative">
                                            <input type="text" id="billing_name" name="billing_name"
                                                :aria-describedby="submitted && formErrors.billing_name ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 bg-white px-4 text-sm border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                placeholder=" "
                                                v-model="order_billing.first_name"
                                                :class="submitted && formErrors.billing_name ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="billing given-name"/>
                                            <label for="billing_name"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">First Name</label>
                                        </div>
                                    </div>

                                    <!-- Last Name -->
                                    <div>
                                        <div class="mt-1 relative">
                                            <input type="text" id="billing_last_name" name="billing_last_name"
                                                class="peer block w-full pt-6 pb-2 bg-white px-4 text-sm border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                :aria-describedby="submitted && formErrors.billing_last_name ? 'form-error' : ''"
                                                placeholder=" "
                                                :class="submitted && formErrors.billing_last_name ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                v-model="order_billing.last_name"
                                                autocomplete="billing family-name"/>
                                            <label for="billing_last_name"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Last Name</label>
                                        </div>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 sm:grid-cols-6 gap-y-5 sm:gap-x-4 mt-5">
                                    <!-- Address Line 1 -->
                                    <div class="sm:col-span-full">
                                        <AddressAutoComplete
                                            :autoAttr="'billing address-line1'"
                                            addressRef="billingAddressGMP"
                                            :submitted="submitted"
                                            @updateAddress="assignAddresses($event)"
                                            :address="order_billing"
                                            :loader="loader"
                                            :id="'billing_address'"
                                            @input="value => order_billing.address1 = value"
                                            :key="sameAsAbove ? 1 : 2"
                                        />
                                    </div>

                                    <!-- Address Line 2 -->
                                    <div class="sm:col-span-full">
                                        <div class="mt-1 relative">
                                            <input type="text" name="billing_address2" id="billing_address2"
                                                v-model="order_billing.address2"
                                                placeholder=" "
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border border-gray-200 bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                key="billing_address2"
                                                autocomplete="billing address-line2"/>
                                            <label for="billing_address2" class="block text-secondary-600 text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Address Line 2 (Optional)</label>
                                        </div>
                                    </div>

                                    <!-- City -->
                                    <div class="sm:col-span-2">
                                        <div class="mt-1 relative">
                                            <input type="text" id="billing_city" name="billing_city"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                placeholder=" "
                                                :aria-describedby="submitted && formErrors.billing_city ? 'form-error' : ''"
                                                v-model="order_billing.city"
                                                :class="submitted && formErrors.billing_city ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="billing city"/>
                                            <label for="billing_city"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">City</label>
                                        </div>
                                    </div>

                                    <!-- State -->
                                    <div class="sm:col-span-2" :key="stateKey">
                                        <div class="mt-1" v-show="(!order_billing.country || states[0] && !states[0].length) || order_billing.country != 'FR'">
                                            <UniversalDropdown
                                                key="billing_state"
                                                v-show="(states[0] && states[0].length) && order_billing.country != 'FR'"
                                                :options="states[0]"
                                                v-model="order_billing.state"
                                                :selectedValue="order_billing.state"
                                                optionLabel="code"
                                                optionValue="code"
                                                placeholder="State"
                                                forcePosition="top"
                                                maxHeight="20rem"
                                                :inputClass="submitted && !order_billing.state ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                @change="updateBillingState($event)"
                                                :required="true"
                                            />
                                        </div>
                                        <div class="mt-1 relative" v-if="(order_billing.country && (states[0] && !states[0].length) || order_billing.country == 'FR')">
                                            <input type="text" id="billing_state" name="billing_state" :aria-describedby="submitted && formErrors.billing_state ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder=" " v-model="order_billing.state"
                                                :class="submitted && !order_billing.state && formErrors.billing_state ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="billing state"/>
                                            <label for="billing_state" class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">State</label>
                                        </div>
                                    </div>

                                    <!-- Zip -->
                                    <div class="sm:col-span-2">
                                        <div class="mt-1 relative">
                                            <input type="text" name="billing_postcode" id="billing_postcode" :aria-describedby="submitted && formErrors.billing_postcode ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder=" "
                                                v-model="order_billing.postcode"
                                                :class="submitted && formErrors.billing_postcode ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="billing postal-code"/>
                                            <label for="billing_postcode"
                                                class="block text-secondary-600 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Zipcode <span v-if="getPostcodeValidation(order_billing.country)" class="text-red-500 ml-0.5">*</span></label>
                                        </div>
                                    </div>

                                    <!-- Country -->
                                    <div class="col-span-full">
                                        <div class="mt-1 relative">
                                            <input type="hidden" id="country" name="country"
                                                v-model="order_billing.country" />
                                            <UniversalDropdown
                                                :options="newCountryJson"
                                                v-model="order_billing.country"
                                                :selectedValue="order_billing.country"
                                                optionLabel="country_name"
                                                optionValue="code"
                                                placeholder="Country"
                                                ariaLabel="Country (required)"
                                                forcePosition="top"
                                                maxHeight="20rem"
                                                @change="updateBillingCountry($event)"
                                                :inputClass="submitted && formErrors.country ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                            />
                                        </div>
                                    </div>

                                    <!-- Phone -->
                                    <div class="col-span-full">
                                        <div class="mt-1 relative">
                                            <input type="tel" id="billing_phone" name="billing_phone"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                placeholder=" "
                                                :aria-describedby="submitted && formErrors.billing_phone ? 'form-error' : ''"
                                                v-model="order_billing.phone"
                                                @input="handlePhoneInput('billing', $event)" @keypress="validateKeyPress"
                                                :class="submitted && formErrors.billing_phone ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="billing tel" />
                                            <label for="billing_phone"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Phone Number</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <!-- ── Order Summary Aside ── -->
                <aside class="lg:max-w-[424px] w-full flex-none mt-6 lg:mt-0 space-y-7" aria-labelledby="contact-order-summary-heading">

                    <!-- Header — mirrors payment page style -->
                    <div class="flex items-start gap-3">
                        <Icon name="clipboard" class="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div>
                            <h2 id="contact-order-summary-heading" class="text-lg font-semibold text-gray-900 leading-tight" style="text-transform: none;">Order Summary</h2>
                        </div>
                    </div>

                    <div class="border border-gray-200 rounded-lg shadow-sm bg-white px-4 overflow-hidden">
                        <OrderSummary :orderData="{ currentTab: 'contact' }" v-model:hideLoader="loader"
                            :key="orderSummaryKey" v-if="apiResponse">
                            <!-- Submit button -->
                            <div class="my-4 border-t border-gray-50">
                                <CartSubmitButton @submit="submitForm()" :tab="'contact'" aria-label="Continue to Payment" :buttonText="'Continue to Payment'" :className="`!max-w-full w-full`" :cartResponse="apiResponse"/>
                            </div>
                        </OrderSummary>
                        <OrderSummarySkeleton v-else />
                    </div>
                </aside>

            </form>
        </section>
        </main>

        <FedexModal v-if="fedexShow" :fedexData="fedexJson" :statesData="usStates" @close="setShippingData"
            @fedexFillData="setShippingData" :internationalCustomers="internationalCustomers"
            :franceCustomers="franceCustomers" :lessAmount="calculatedLessAmount" />
    </div>
</template>
<script setup>
import customErrorMessages from "~/utils/customMessages.js";
import api from "~/api-client/rest-api/index";
import AddressAutoComplete from "~/components/checkout/AddressAutoComplete.vue";
// import ProgressStep from "~/components/checkout/ProgressStep.vue";
import CustomLoader from "~/components/ui/CustomLoader.vue";
import Button from "~/components/common/Button.vue";
import UniversalDropdown from "~/components/ui/UniversalDropdown.vue";
import CartSubmitButton from "~/components/checkout/CartSubmitButton.vue";
import OrderSummary from "~/components/checkout/OrderSummary.vue";
import OrderSummarySkeleton from "~/components/skeleton/OrderSummarySkeleton.vue";
import FedexModal from "~/components/modal/FedexModal.vue";
import Icon from "~/components/common/Icon.vue";
import { createSwalAlert } from '~/composables/useAlert.js'
import noPostcodeCountries from "~/static/js/noPostcodeCountries.js";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import landingData from "~/static/js/pageMetaHeading.js";
import { useForm, useField } from 'vee-validate';
import { localize } from "~/utils/veeCompat.js";

const store = useMainStore();
const router = useRouter();
const { $bus } = useNuxtApp();

// vee-validate 4: rules are registered globally (plugins/26.veeValidate.js); validation is explicit (no blur/change/input)
const { validate, errors: formErrors } = useForm();

useHead(() => ({
    ...landingData.CART_META,
    meta: landingData.CART_META.meta.map(({ hid, ...m }) => ({ key: hid, ...m }))
}));

const order_billing = ref({
    first_name: "",
    phone: "",
    email: "",
    address1: "",
    postcode: "",
    city: "",
    address2: "",
    state: "",
    country: "",
    address_type: "cart_billing",
    last_name: "",
    // company_name : ""
});
const order_shipping = ref({
    first_name: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    postcode: "",
    city: "",
    state: "",
    country: "",
    address_type: "cart_shipping",
    last_name: "",
    company_name: ""
});
const states = ref([[], []]);
const loader = ref(false);
const submitted = ref(false);

// vee-validate 4 fields mirror the order_shipping / order_billing values (same names and rules as the old v-validate inputs).
// A field is registered per input; fields re-validate live once the form has been submitted.
function useMirroredField(name, rules, getValue) {
    const { setValue, validate: validateField } = useField(name, rules, { initialValue: '' });
    watch(getValue, (v) => {
        setValue(v ?? '', false);
        if (submitted.value) validateField();
    }, { immediate: true, flush: 'sync' });
}
const shippingStateRendered = computed(() => !!((order_shipping.value.country && (states.value[1] && !states.value[1].length)) || order_shipping.value.country == 'FR'));
const billingStateRendered = computed(() => !!((order_billing.value.country && (states.value[0] && !states.value[0].length)) || order_billing.value.country == 'FR'));
// DOM order of the validated fields (used by focusFirstError)
const fieldOrder = [
    'shipping_name', 'shipping_last_name', 'phone', 'email',
    'shipping_city', 'shipping_state', 'shipping_postal_code', 'shipping_country',
    'billing_name', 'billing_last_name', 'billing_city', 'billing_state', 'billing_postcode', 'country', 'billing_phone',
];
useMirroredField('shipping_name', 'required', () => order_shipping.value.first_name);
useMirroredField('shipping_last_name', 'required', () => order_shipping.value.last_name);
useMirroredField('phone', 'required|phoneNumber', () => order_shipping.value.phone);
useMirroredField('email', 'required|email', () => order_shipping.value.email);
useMirroredField('shipping_city', 'required', () => order_shipping.value.city);
useMirroredField('shipping_state', computed(() => shippingStateRendered.value ? 'required' : ''), () => order_shipping.value.state);
useMirroredField('shipping_postal_code', computed(() => getPostcodeValidation(order_shipping.value.country)), () => order_shipping.value.postcode);
useMirroredField('shipping_country', 'required', () => order_shipping.value.country);
useMirroredField('billing_name', 'required', () => order_billing.value.first_name);
useMirroredField('billing_last_name', 'required', () => order_billing.value.last_name);
useMirroredField('billing_city', 'required', () => order_billing.value.city);
useMirroredField('billing_state', computed(() => billingStateRendered.value ? 'required' : ''), () => order_billing.value.state);
useMirroredField('billing_postcode', computed(() => getPostcodeValidation(order_billing.value.country)), () => order_billing.value.postcode);
useMirroredField('country', 'required', () => order_billing.value.country);
useMirroredField('billing_phone', 'required|phoneNumber', () => order_billing.value.phone);
const apiResponse = ref('');
// shippingOpt: [{ name: 'Residential', id: 'residential', isShow: true }, { name: 'Business', id: 'business', isShow: true }], //, { name: 'Hold at FedEx', id: 'fedex' }
const sameAsAbove = ref(true);
const selectedShipping = ref(null);
const is_email_subscribe = ref(true);
const is_phone_number_subscribe = ref(true);
const newCountryJson = ref([]);
const stateKey = ref(0);
const stateKey2 = ref(0);
const fedexJson = ref({});
const fedexShow = ref(false);
const selectedShippingKey = ref(0);
const visitor_code = ref('');
const orderSummaryKey = ref(0);
const check = ref(["address1", "email", "first_name", "phone", "postcode", "city", "state", "country", "last_name"]);
const internationalCustomers = ref(false);
const franceCustomers = ref(false);
const showErrorMessage = ref(false);
const order_summary = ref('');
const usStates = ref([]);
const fedexLocationSelected = ref(false);

const calculatedLessAmount = computed(() => {
    if(order_summary.value && order_summary.value.sub_total) {
        let orderSummary = order_summary.value.sub_total;
        return orderSummary < 1500;
    }
    return false;
});
const isBusinessAddress = computed(() => selectedShipping.value === 'business');

watch(order_shipping, () => {
    assignBillingAddress();
}, { deep: true });

onMounted(async () => {
    await store.getCart();
    await assignData();
    nextTick(() => {
        $bus.emit(
            'aria-announce',
            'Checkout page loaded. Please enter your shipping and billing information.'
        );
    });
    Promise.all([
        getCountryList(),
        onCountryChange(0,1)
    ]).then(() => {
        nextTick(() => {
        onCountryChange(1,1);
        selectedShippingKey.value++;
        })
    })
});

function handlePhoneInput(type, event) {
    let value = event.target.value;
    let cleaned = ('' + value).replace(/\D/g, '');
    // Strip leading US country code "1" so all 10 digits are preserved
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
        cleaned = cleaned.slice(1);
    }
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
        value = !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? '-' + match[3] : ''}`;
    } else if (cleaned.length > 10) {
        const match2 = cleaned.slice(0, 10).match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match2) {
            value = `(${match2[1]}) ${match2[2]}-${match2[3]}`;
        }
    }
    if (type === 'shipping') {
        order_shipping.value.phone = value;
    } else {
        order_billing.value.phone = value;
    }
    event.target.value = value;
}
function onBusinessAddressChange(event) {
    selectedShipping.value = event.target.checked ? 'business' : 'residential';
    addressTypeChange();
}
function updateBillingState(val) {
    order_billing.value.state = val;
    stateKey.value = stateKey.value + 1;
}
function updateShippingState(val){
    order_shipping.value.state = val;
    stateKey2.value = stateKey2.value + 1;
}
function updateShippingCountry(val) {
    order_shipping.value.country = val;
    onCountryChange(1);
}
function updateBillingCountry(val) {
    order_billing.value.country = val;
    onCountryChange(0);
}
async function assignResidentailShipping() {
    selectedShipping.value = 'residential';
    addressTypeChange();

    $bus.emit(
        'aria-announce',
        'Residential shipping selected.'
    );
}
async function assignFedexShipping() {
    selectedShipping.value = 'fedex';
    addressTypeChange();
    $bus.emit(
        'aria-announce',
        'Pickup at FedEx selected. Opening location selection.'
    );
    await store.runGtmEvent({ action_type: 'viewed_pickup_locations' });
}
function emptyAddress(isShipping = 0) {
    if(isShipping) {
        order_shipping.value.company_name = '';
        order_shipping.value.address2 = '';
        return;
    }
    order_billing.value = {
            first_name: "",
            phone: "",
            email: "",
            address1: "",
            postcode: "",
            city: "",
            state: "",
            country: "US",
            address_type: "cart_billing",
            last_name: "",
            company_name: ""
        };
}
async function assignAddresses(googleAddress, shippingInput = false) {
    const assignTo = shippingInput ? order_shipping.value : order_billing.value;
    Object.assign(assignTo, googleAddress);
    await onCountryChange(!shippingInput ? 0 : 1, 1, true);
    if(shippingInput) {
        stateKey2.value = stateKey2.value + 1;
    } else {
        stateKey.value = stateKey.value + 1;
    }
    assignBillingAddress();
    if(submitted.value) {
        nextTick(() => {
            validate();
        });
    }
}
async function assignData() {
    apiResponse.value = await store.getResponse;
    selectedShipping.value = await store.getShippingMethod ?? 'residential';
    visitor_code.value = await store.getVisitorCode;
    selectedShippingKey.value = selectedShippingKey.value + 1;
    let checkBoxData = await store.getCheckBoxKey;
    is_email_subscribe.value = checkBoxData ? checkBoxData.is_email_subscribe : true;
    is_phone_number_subscribe.value = checkBoxData ? checkBoxData.is_phone_number_subscribe : true;
    order_summary.value = await store.getSummaryData;

    localize("en", customErrorMessages);
    let addressObjStore = await store.getAddress;
    if (addressObjStore) {
        order_shipping.value = { ...addressObjStore.order_shipping, address_type: 'cart_shipping' };
        order_billing.value = { ...addressObjStore.order_billing, address_type: 'cart_billing' };
        sameAsAbove.value = areAddressesEqual();
    }
    if (!addressObjStore.order_shipping?.address1 && !addressObjStore.order_billing?.address1) {
        order_billing.value.country = order_shipping.value.country = "US";
        order_billing.value.state = order_shipping.value.state = "";
        loader.value = true;
        is_email_subscribe.value = true;
        is_phone_number_subscribe.value = true;
    }
    addressObjStore.order_shipping?.address2 == '[""]' ? addressObjStore.order_shipping.address2 = "" : '';
    addressObjStore.order_billing?.address2 == '[""]' ? addressObjStore.order_billing.address2 = "" : '';
    loader.value = false;
}
// moveBack() {
//     router.push(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${visitor_code.value}`);
// },
function areAddressesEqual() {
    let fields = check.value;
    for (var i = 0; i < check.value.length; i++) {
        if (order_shipping.value[fields[i]] != order_billing.value[fields[i]]) return false;
    }
    return true;
}
async function submitForm() {
    submitted.value = true;
    assignBillingAddress();
    const { valid: isValid } = await validate();
    if (!isValid) {
        showErrorMessage.value = true;
        $bus.emit(
            'aria-announce',
            'There are errors in the form. Please correct the highlighted fields.'
        );
        // await nextTick();
        focusFirstError();
        return;
    }
    submitted.value = false;
    showErrorMessage.value = false;

    $bus.emit(
        'aria-announce',
        'Shipping and billing information saved. Redirecting to payment page.'
    );

    await updateCartApi();
}
function focusFirstError() {
    // Priority order: find first visible, focusable errored element in DOM order
    let errorArr = fieldOrder.filter(name => formErrors.value[name]).map(name => ({ field: name }));

    if (sameAsAbove.value) {
        errorArr = errorArr.filter(item => item?.field && !item.field?.includes('billing'));
    }

    // Find first valid field (not null/undefined/empty)
    const firstErrorField = errorArr.find(item => item?.field)?.field;

    if (firstErrorField) {
        const el = document.getElementById(firstErrorField) ||
                document.querySelector(`[name="${firstErrorField}"]`);

        if (el && typeof el.focus === 'function') {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.focus({ preventScroll: true });
        }
    }
    return;
}
async function updateCartApi(updateCartBoolean = false) {

    //Assign email and phone number
    order_billing.value.email = order_shipping.value.email;
    // order_billing.value.phone = order_shipping.value.phone;

    const formData = { cart_id: apiResponse.value?.data?.id, cart_billing : order_billing.value, cart_shipping : order_shipping.value, is_email_subscribe: is_email_subscribe.value ? 1 : 0, is_phone_number_subscribe: is_phone_number_subscribe.value ? 1 : 0, shipping_address_type: selectedShipping.value }
    loader.value = true;
    let response = await api.updateCartItem('checkout/cart/update', formData);

    if (!response) {
        $bus.emit(
            'aria-announce',
            'Server error while updating shipping information.'
        );
        createSwalAlert('Internal Server Error', "error");
        loader.value = false;
        return;
    }
    let result = response.data?.data;
    if (result) {
        if (!result?.success) {
            createSwalAlert(result.message, "error")
        }
        if (result?.Error || result?.error) {
            $bus.emit(
                'aria-announce',
                'Error updating shipping information. Please try again.'
            );
            createSwalAlert(result.Error ?? result?.error, "error")
        }
        if (result?.success) {
            // api response set
            order_shipping.value = {
                ...result.address.shipping_address,
                address_type: 'cart_shipping',
                address1: (typeof result.address.shipping_address?.address1 == 'array') ? result.address.shipping_address?.address1[0] : result.address.shipping_address?.address1,
                address2: (typeof result.address.shipping_address?.address2 == 'array') ? result.address.shipping_address?.address2[0] : result.address.shipping_address?.address2
            };
            order_billing.value = {
                ...result.address.billing_address, address_type: 'cart_billing', address1: result.address.billing_address?.address1 ? result.address.billing_address?.address1 : result.address.billing_address?.address1[0],
                address2: (typeof result.address.billing_address?.address2 == 'array') ? result.address.billing_address?.address2[0] : result.address.billing_address?.address2
            };
            is_email_subscribe.value = result.is_email_subscribe;
            is_phone_number_subscribe.value = result.is_phone_number_subscribe;
            selectedShipping.value = result.shipping_address_type;

            await store.setAddress({ order_billing: order_billing.value, order_shipping: order_shipping.value });
            await store.setShippingMethod(result.shipping_address_type);
            order_summary.value = result.order_summary;
            await store.setSummaryData(result.order_summary);
            await store.setCheckBoxKey({ is_email_subscribe: result.is_email_subscribe, is_phone_number_subscribe: result.is_phone_number_subscribe });

            orderSummaryKey.value = orderSummaryKey.value + 1;
            createSwalAlert(result.message, "success");

            await store.runGtmEvent({ action_type: 'add_shipping_info' });
            $bus.emit(
                'aria-announce',
                'Shipping information updated successfully.'
            );
            if(!updateCartBoolean){
                router.push(`${STATIC_ROUTES.CART_PAYMENT_WITH_VISITOR_CODE}${visitor_code.value}`);
            }
        }
        loader.value = false;
    }
}
async function onCountryChange(index, isMount = 0, isLoader = true) {
    let selectedCountry = index == 0 ? order_billing.value.country : order_shipping.value.country;
    if(!isMount){
        (index == 0) ? order_billing.value.state = null : order_shipping.value.state = null;
    }
    if (!selectedCountry && isMount ) {
        selectedCountry = 'US';
    }
    // console.log(selectedCountry);
    if (!internationalCustomers.value && !isMount && index) {
        if (!(['US', 'CA'].includes(selectedCountry))) {
            fedexJson.value = {}; states.value[1] = [];
            internationalCustomers.value = fedexShow.value = true;
        }
    }

    if (selectedCountry == 'FR' && !isMount && index) {
        fedexJson.value = {}; states.value[1] = [];
        internationalCustomers.value = false;
        franceCustomers.value = fedexShow.value = true;
    }

    if (selectedCountry) {
        if(selectedCountry == 'US'){
            let cachedUsStates = await store.getUSStateList;
            if(cachedUsStates){
                states.value[index] = cachedUsStates;
                usStates.value = cachedUsStates;
                (index == 0) ? stateKey.value++ : stateKey2.value++;
                return;
            }
        }
        //  loader.value = true;
        loader.value = isLoader;
        try {
            const response = await api.getRequest(`/state-list/${selectedCountry}`);
            if (!response) {
                createSwalAlert('Internal Server Error', "error");
                loader.value = false;
                return;
            }
            if (response) {
                states.value[index] = response.data;
                if(isMount){
                    (index === 0) ? stateKey.value++ : stateKey2.value++;
                }
                loader.value = false;
            }
            if(selectedCountry == 'US'){
                usStates.value = states.value[0];
                store.setUSStateList(usStates.value);
            }
        } catch (error) {
            loader.value = false;
            console.log('Get Country error ' + error);
        }
    }
}
function validateKeyPress(event) {
    if (event.target.value?.length > 30 || /^[a-zA-Z]$/.test(event?.key)) {
        event.preventDefault(); // Prevent input >30 characters
    }
}
// removeLoader() {
//     loader.value = false;
// },
function resetAddress() {
    if (!sameAsAbove.value && selectedShipping.value != 'fedex') {
        // selectedShipping.value = "";
        emptyAddress();
        onCountryChange(0, 1, false);
        nextTick(() => {
            $bus.emit('aria-announce', 'Billing address section is now visible. Please fill in your billing information.');
            const firstField = document.getElementById('billing_name');
            if (firstField) firstField.focus();
        });
    }
}
async function getCountryList() {
    try {
        // loader.value = true;
        let localState = store.getCountryList;
        if(localState){
            newCountryJson.value = localState;
            return;
        }
        const response = await api.getRequest(`countries-list`);
        if (!response) {
            createSwalAlert('Internal Server Error', "error");
            loader.value = false;
            return;
        }
        if (response && response.data) {
            newCountryJson.value = response.data ?? [];
            store.setCountryList(newCountryJson.value);
        }
    } catch (error) {
        console.log('Get Country error ' + error);
    }
}
async function addressTypeChange() {
    store.setShippingMethod(selectedShipping.value);
    if (selectedShipping.value == 'fedex') {
        fedexShow.value = loader.value = false;
        const country = order_shipping.value.country;
        if (country === 'FR') {
            internationalCustomers.value = false;
            franceCustomers.value = true;
        } else if (country && !['US', 'CA'].includes(country)) {
            internationalCustomers.value = true;
            franceCustomers.value = false;
        } else {
            internationalCustomers.value = false;
            franceCustomers.value = false;
        }
        fedexJson.value = {
            city: order_shipping.value.city,
            stateOrProvinceCode: order_shipping.value.state,
            postalCode: order_shipping.value.postcode,
            countryCode: country
        }
        fedexShow.value = true;
    }
    else {
        submitted.value = false;
        emptyAddress(1);
    }
}
async function setShippingData(val) {
    if (!val) {
        // Ignore the close event that fires when we programmatically hide the modal after selecting a location
        if (fedexLocationSelected.value) {
            fedexLocationSelected.value = false;
            fedexShow.value = false;
            return;
        }
        fedexShow.value = loader.value = false;
        selectedShipping.value = 'residential';
        internationalCustomers.value = false;
        franceCustomers.value = false;
        $bus.emit(
            'aria-announce',
            'FedEx selection closed.'
        );
        return;
    }
    order_shipping.value.address_type = "cart_shipping";
    await onCountryChange(1);
    order_shipping.value.address1 = val.line1;
    order_shipping.value.address2 = null;
    order_shipping.value.postcode = val.postalcode;
    order_shipping.value.city = val.city;
    order_shipping.value.state = val.region;

    // Update Company name
    order_shipping.value.company_name= val?.line2 ?? '';
    sameAsAbove.value = false;
    $bus.emit(
        'aria-announce',
        'FedEx pickup location selected.'
    );
    fedexLocationSelected.value = true;
    fedexShow.value = false;
}
// valueExist() {
//     let allCheck = false;
//     for (var i = 0; i < check.value.length; i++) {
//         allCheck = (order_billing.value[check.value[i]] != '' && order_billing.value[check.value[i]] != undefined);
//         if (!allCheck) return false;
//     }
//     return true;
// },
function assignBillingAddress() {
    if (sameAsAbove.value) {
        order_billing.value = { ...order_shipping.value, address_type: 'cart_billing' };
    }
}
function getPostcodeValidation(country) {
    let noPostalAvailable = noPostcodeCountries?.find(el => el?.code == country);
    if (noPostalAvailable) {
     return ''; // no validation
    }
     return 'required|postcode:' + country; // existing logic stays
}
</script>
