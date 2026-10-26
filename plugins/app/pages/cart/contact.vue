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
                                                :aria-describedby="selectedShipping != 'fedex' && submitted && errors.first('shipping_name') ? 'form-error' : ''"
                                                v-validate="'required'"
                                                :class="selectedShipping != 'fedex' && submitted && errors.first('shipping_name') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
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
                                                :aria-describedby="submitted && errors.first('shipping_last_name') ? 'form-error' : ''"
                                                placeholder=" "
                                                class="peer block w-full pt-6 pb-2 bg-white px-4 text-sm border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                key="shipping2"
                                                :class="submitted && errors.first('shipping_last_name') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                v-model="order_shipping.last_name" v-validate="'required'"
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
                                                :aria-describedby="submitted && errors.first('phone') ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                placeholder=" "
                                                v-model="order_shipping.phone"
                                                @input="handlePhoneInput('shipping', $event)"
                                                v-validate="'required|phoneNumber'" @keypress="validateKeyPress"
                                                :class="submitted && errors.first('phone') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
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
                                                :aria-describedby="submitted && errors.first('email') ? 'form-error' : ''"
                                                placeholder=" "
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                :class="submitted && errors.first('email') ? 'border-red-500 focus-visible:outline-red-500 focus-visible:ring-red-500' : 'border-gray-200'"
                                                v-model="order_shipping.email" v-validate="'required|email'" />
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
                                                v-model="order_shipping.city" v-validate="'required'"
                                                :aria-describedby="selectedShipping != 'fedex' && submitted && errors.first('shipping_city') ? 'form-error' : ''"
                                                placeholder=" "
                                                :disabled="selectedShipping == 'fedex'" key="shipping6"
                                                :class="selectedShipping != 'fedex' && submitted && errors.first('shipping_city') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="shipping city"/>
                                            <label for="shipping_city"
                                                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">City</label>
                                        </div>
                                    </div>

                                    <!-- State -->
                                    <div class="sm:col-span-2" :key="stateKey2">
                                        <div class="mt-1 relative" v-if="(order_shipping.country && (states[1] && !states[1].length) || order_shipping.country == 'FR')">
                                            <input type="text" id="shipping_state" name="shipping_state"
                                                :aria-describedby="selectedShipping != 'fedex' && submitted && errors.first('shipping_state') ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder=" " v-model="order_shipping.state" v-validate="'required'"
                                                :disabled="selectedShipping == 'fedex'" key="shipping7"
                                                :class="selectedShipping != 'fedex' && submitted && errors.first('shipping_state') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
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
                                                :aria-describedby="selectedShipping != 'fedex' && submitted && errors.first('shipping_postal_code') ? 'form-error' : ''"
                                                v-model="order_shipping.postcode"
                                                v-validate="getPostcodeValidation(order_shipping.country)" :disabled="selectedShipping == 'fedex'"
                                                :class="selectedShipping != 'fedex' && submitted && errors.first('shipping_postal_code') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="shipping postal-code"/>
                                            <label for="shipping_postal_code"
                                                class="block text-secondary-600 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Zipcode <span v-if="getPostcodeValidation(order_shipping.country)" class="text-red-500 ml-0.5">*</span></label>
                                        </div>
                                    </div>

                                    <!-- Country -->
                                    <div class="col-span-full">
                                        <div class="mt-1 relative">
                                            <input type="hidden" id="shipping_country" name="shipping_country"
                                                v-model="order_shipping.country" v-validate="'required'" />
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
                                                :inputClass="selectedShipping != 'fedex' && submitted && errors.first('shipping_country') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
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
                                                :aria-describedby="submitted && errors.first('billing_name') ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 bg-white px-4 text-sm border rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                placeholder=" "
                                                v-model="order_billing.first_name" v-validate="'required'"
                                                :class="submitted && errors.first('billing_name') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
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
                                                :aria-describedby="submitted && errors.first('billing_last_name') ? 'form-error' : ''"
                                                placeholder=" "
                                                :class="submitted && errors.first('billing_last_name') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                v-model="order_billing.last_name" v-validate="'required'"
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
                                                :aria-describedby="submitted && errors.first('billing_city') ? 'form-error' : ''"
                                                v-model="order_billing.city" v-validate="'required'"
                                                :class="submitted && errors.first('billing_city') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
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
                                                v-validate="'required'"
                                                forcePosition="top"
                                                maxHeight="20rem"
                                                :inputClass="submitted && !order_billing.state ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                @change="updateBillingState($event)"
                                                :required="true"
                                            />
                                        </div>
                                        <div class="mt-1 relative" v-if="(order_billing.country && (states[0] && !states[0].length) || order_billing.country == 'FR')">
                                            <input type="text" id="billing_state" name="billing_state" :aria-describedby="submitted && errors.first('billing_state') ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 disabled:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder=" " v-model="order_billing.state" v-validate="'required'"
                                                :class="submitted && !order_billing.state && errors.first('billing_state') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="billing state"/>
                                            <label for="billing_state" class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">State</label>
                                        </div>
                                    </div>

                                    <!-- Zip -->
                                    <div class="sm:col-span-2">
                                        <div class="mt-1 relative">
                                            <input type="text" name="billing_postcode" id="billing_postcode" :aria-describedby="submitted && errors.first('billing_postcode') ? 'form-error' : ''"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                                placeholder=" "
                                                v-model="order_billing.postcode"
                                                v-validate="getPostcodeValidation(order_billing.country)"
                                                :class="submitted && errors.first('billing_postcode') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                                autocomplete="billing postal-code"/>
                                            <label for="billing_postcode"
                                                class="block text-secondary-600 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[11px] peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[11px] pointer-events-none">Zipcode <span v-if="getPostcodeValidation(order_billing.country)" class="text-red-500 ml-0.5">*</span></label>
                                        </div>
                                    </div>

                                    <!-- Country -->
                                    <div class="col-span-full">
                                        <div class="mt-1 relative">
                                            <input type="hidden" id="country" name="country"
                                                v-model="order_billing.country" v-validate="'required'" />
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
                                                :inputClass="submitted && errors.first('country') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
                                            />
                                        </div>
                                    </div>

                                    <!-- Phone -->
                                    <div class="col-span-full">
                                        <div class="mt-1 relative">
                                            <input type="tel" id="billing_phone" name="billing_phone"
                                                class="peer block w-full pt-6 pb-2 px-4 text-sm border bg-white rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                                                placeholder=" "
                                                :aria-describedby="submitted && errors.first('billing_phone') ? 'form-error' : ''"
                                                v-model="order_billing.phone"
                                                @input="handlePhoneInput('billing', $event)"
                                                v-validate="'required|phoneNumber'" @keypress="validateKeyPress"
                                                :class="submitted && errors.first('billing_phone') ? 'border-red-500 focus-visible:outline-red-500' : 'border-gray-200'"
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
<script>
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
import mixin from "~/mixin/sweetAlert";
import noPostcodeCountries from "~/static/js/noPostcodeCountries.js";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import landingData from "~/static/js/pageMetaHeading.js";

export default {
    name : "ContactPage",
    components: { AddressAutoComplete, CustomLoader, Button, UniversalDropdown, CartSubmitButton, OrderSummary, OrderSummarySkeleton, FedexModal, Icon },
    data() {
        return {
            // countryList: [],
            order_billing: {
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
            },
            order_shipping: {
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
            },
            states: [[], []],
            loader: false,
            submitted: false,
            apiResponse: '',
            // shippingOpt: [{ name: 'Residential', id: 'residential', isShow: true }, { name: 'Business', id: 'business', isShow: true }], //, { name: 'Hold at FedEx', id: 'fedex' }
            sameAsAbove: true,
            selectedShipping: null,
            is_email_subscribe: true,
            is_phone_number_subscribe: true,
            newCountryJson: [],
            stateKey: 0,
            stateKey2: 0,
            fedexJson: {},
            fedexShow: false,
            selectedShippingKey: 0,
            visitor_code: '',
            orderSummaryKey: 0,
            check: ["address1", "email", "first_name", "phone", "postcode", "city", "state", "country", "last_name"],
            internationalCustomers: false,
            franceCustomers: false,
            showErrorMessage: false,
            order_summary: '',
            usStates: [],
            fedexLocationSelected: false
        };
    },
    async mounted() {
        await this.$store.dispatch('getCart', (this.$store, this.$nuxt.context));
        await this.assignData();
        this.$nextTick(() => {
            this.$bus.emit(
                'aria-announce',
                'Checkout page loaded. Please enter your shipping and billing information.'
            );
        });
        Promise.all([
            this.getCountryList(),
            this.onCountryChange(0,1)
        ]).then(() => {
            this.$nextTick(() => {
            this.onCountryChange(1,1);
            this.selectedShippingKey++;
            })
        })
    },
    computed: {
        calculatedLessAmount() {
            if(this.order_summary && this.order_summary.sub_total) {
                let orderSummary = this.order_summary.sub_total;
                return orderSummary < 1500;
            }
            return false;
        },
        isBusinessAddress() {
            return this.selectedShipping === 'business';
        },
    },
    watch: {
        order_shipping: {
            deep: true,
            handler(newVal) {
                this.assignBillingAddress();
            }
        },
    },
    methods: {
        createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
        handlePhoneInput(type, event) {
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
                this.order_shipping.phone = value;
            } else {
                this.order_billing.phone = value;
            }
            event.target.value = value;
        },
        onBusinessAddressChange(event) {
            this.selectedShipping = event.target.checked ? 'business' : 'residential';
            this.addressTypeChange();
        },
        updateBillingState(val) {
            this.order_billing.state = val;
            this.stateKey = this.stateKey + 1;
        },
        updateShippingState(val){
            this.order_shipping.state = val;
            this.stateKey2 = this.stateKey2 + 1;
        },
        updateShippingCountry(val) {
            this.order_shipping.country = val;
            this.onCountryChange(1);
        },
        updateBillingCountry(val) {
            this.order_billing.country = val;
            this.onCountryChange(0);
        },
        async assignResidentailShipping() {
            this.selectedShipping = 'residential';
            this.addressTypeChange();

            this.$bus.emit(
                'aria-announce',
                'Residential shipping selected.'
            );
        },
        async assignFedexShipping() {
            this.selectedShipping = 'fedex';
            this.addressTypeChange();
            this.$bus.emit(
                'aria-announce',
                'Pickup at FedEx selected. Opening location selection.'
            );
            await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: 'viewed_pickup_locations' });
        },
        emptyAddress(isShipping = 0) {
            if(isShipping) {
                this.order_shipping.company_name = '';
                this.order_shipping.address2 = '';
                return;
            }
            this.order_billing = {
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
        },
        async assignAddresses(googleAddress, shippingInput = false) {
            const assignTo = shippingInput ? this.order_shipping : this.order_billing;
            Object.assign(assignTo, googleAddress);
            await this.onCountryChange(!shippingInput ? 0 : 1, 1, true);
            if(shippingInput) {
                this.stateKey2 = this.stateKey2 + 1;
            } else {
                this.stateKey = this.stateKey + 1;
            }
            this.assignBillingAddress();
            if(this.submitted) {
                this.$nextTick(() => {
                    this.$validator.validateAll();
                });
            }
        },
        async assignData() {
            this.apiResponse = await this.$store.getters.getResponse;
            this.selectedShipping = await this.$store.getters.getShippingMethod ?? 'residential';
            this.visitor_code = await this.$store.getters.getVisitorCode;
            this.selectedShippingKey = this.selectedShippingKey + 1;
            let checkBoxData = await this.$store.getters.getCheckBoxKey;
            this.is_email_subscribe = checkBoxData ? checkBoxData.is_email_subscribe : true;
            this.is_phone_number_subscribe = checkBoxData ? checkBoxData.is_phone_number_subscribe : true;
            this.order_summary = await this.$store.getters.getSummaryData;

            this.$validator.localize("en", customErrorMessages);
            let addressObjStore = await this.$store.getters.getAddress;
            if (addressObjStore) {
                this.order_shipping = { ...addressObjStore.order_shipping, address_type: 'cart_shipping' };
                this.order_billing = { ...addressObjStore.order_billing, address_type: 'cart_billing' };
                this.sameAsAbove = this.areAddressesEqual();
            }
            if (!addressObjStore.order_shipping?.address1 && !addressObjStore.order_billing?.address1) {
                this.order_billing.country = this.order_shipping.country = "US";
                this.order_billing.state = this.order_shipping.state = "";
                this.loader = true;
                this.is_email_subscribe = true;
                this.is_phone_number_subscribe = true;
            }
            addressObjStore.order_shipping?.address2 == '[""]' ? addressObjStore.order_shipping.address2 = "" : '';
            addressObjStore.order_billing?.address2 == '[""]' ? addressObjStore.order_billing.address2 = "" : '';
            this.loader = false;
        },
        // moveBack() {
        //     this.$router.push(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${this.visitor_code}`);
        // },
        areAddressesEqual() {
            let check = this.check;
            for (var i = 0; i < this.check.length; i++) {
                if (this.order_shipping[check[i]] != this.order_billing[check[i]]) return false;
            }
            return true;
        },
        async submitForm() {
            this.submitted = true;
            this.assignBillingAddress();
            const isValid = await this.$validator.validateAll();
            if (!isValid) {
                this.showErrorMessage = true;
                this.$bus.emit(
                    'aria-announce',
                    'There are errors in the form. Please correct the highlighted fields.'
                );
                // await this.$nextTick();
                this.focusFirstError();
                return;
            }
            this.submitted = false;
            this.showErrorMessage = false;

            this.$bus.emit(
                'aria-announce',
                'Shipping and billing information saved. Redirecting to payment page.'
            );

            await this.updateCartApi();
        },
        focusFirstError() {
            // Priority order: find first visible, focusable errored element in DOM order
            let errorArr = this.errors.items;

            if (this.sameAsAbove) {
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
        },
        async updateCartApi(updateCartBoolean = false) {

            //Assign email and phone number
            this.order_billing.email = this.order_shipping.email;
            // this.order_billing.phone = this.order_shipping.phone;

            const formData = { cart_id: this.apiResponse?.data?.id, cart_billing : this.order_billing, cart_shipping : this.order_shipping, is_email_subscribe: this.is_email_subscribe ? 1 : 0, is_phone_number_subscribe: this.is_phone_number_subscribe ? 1 : 0, shipping_address_type: this.selectedShipping }
            this.loader = true;
            let response = await api.updateCartItem(this.$axios, 'checkout/cart/update', formData, this.$cookies);

            if (!response) {
                this.$bus.emit(
                    'aria-announce',
                    'Server error while updating shipping information.'
                );
                this.createSwalAlert('Internal Server Error', "error");
                this.loader = false;
                return;
            }
            let result = response.data?.data;
            if (result) {
                if (!result?.success) {
                    this.createSwalAlert(result.message, "error")
                }
                if (result?.Error || result?.error) {
                    this.$bus.emit(
                        'aria-announce',
                        'Error updating shipping information. Please try again.'
                    );
                    this.createSwalAlert(result.Error ?? result?.error, "error")
                }
                if (result?.success) {
                    // api response set
                    this.order_shipping = {
                        ...result.address.shipping_address,
                        address_type: 'cart_shipping',
                        address1: (typeof result.address.shipping_address?.address1 == 'array') ? result.address.shipping_address?.address1[0] : result.address.shipping_address?.address1,
                        address2: (typeof result.address.shipping_address?.address2 == 'array') ? result.address.shipping_address?.address2[0] : result.address.shipping_address?.address2
                    };
                    this.order_billing = {
                        ...result.address.billing_address, address_type: 'cart_billing', address1: result.address.billing_address?.address1 ? result.address.billing_address?.address1 : result.address.billing_address?.address1[0],
                        address2: (typeof result.address.billing_address?.address2 == 'array') ? result.address.billing_address?.address2[0] : result.address.billing_address?.address2
                    };
                    this.is_email_subscribe = result.is_email_subscribe;
                    this.is_phone_number_subscribe = result.is_phone_number_subscribe;
                    this.selectedShipping = result.shipping_address_type;

                    await this.$store.commit("setAddress", { order_billing: this.order_billing, order_shipping: this.order_shipping });
                    await this.$store.commit("setShippingMethod", result.shipping_address_type);
                    this.order_summary = result.order_summary;
                    await this.$store.commit("setSummaryData", result.order_summary);
                    await this.$store.commit('setCheckBoxKey', { is_email_subscribe: result.is_email_subscribe, is_phone_number_subscribe: result.is_phone_number_subscribe });

                    this.orderSummaryKey = this.orderSummaryKey + 1;
                    this.createSwalAlert(result.message, "success");

                    await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: 'add_shipping_info' });
                    this.$bus.emit(
                        'aria-announce',
                        'Shipping information updated successfully.'
                    );
                    if(!updateCartBoolean){
                        this.$router.push(`${STATIC_ROUTES.CART_PAYMENT_WITH_VISITOR_CODE}${this.visitor_code}`);
                    }
                }
                this.loader = false;
            }
        },
        async onCountryChange(index, isMount = 0, isLoader = true) {
            let selectedCountry = index == 0 ? this.order_billing.country : this.order_shipping.country;
            if(!isMount){
                (index == 0) ? this.order_billing.state = null : this.order_shipping.state = null;
            }
            if (!selectedCountry && isMount ) {
                selectedCountry = 'US';
            }
            // console.log(selectedCountry);
            if (!this.internationalCustomers && !isMount && index) {
                if (!(['US', 'CA'].includes(selectedCountry))) {
                    this.fedexJson = {}; this.states[1] = [];
                    this.internationalCustomers = this.fedexShow = true;
                }
            }

            if (selectedCountry == 'FR' && !isMount && index) {
                this.fedexJson = {}; this.states[1] = [];
                this.internationalCustomers = false;
                this.franceCustomers = this.fedexShow = true;
            }

            if (selectedCountry) {
                if(selectedCountry == 'US'){
                    let usStates = await this.$store.getters.getUSStateList;
                    if(usStates){
                        this.states[index] = usStates;
                        this.usStates = usStates;
                        (index == 0) ? this.stateKey++ : this.stateKey2++;
                        return;
                    }
                }
                //  this.loader = true;
                this.loader = isLoader;
                try {
                    const response = await api.getRequest(this.$axios,null, `/state-list/${selectedCountry}`);
                    if (!response) {
                        this.createSwalAlert('Internal Server Error', "error");
                        this.loader = false;
                        return;
                    }
                    if (response) {
                        this.states[index] = response.data;
                        if(isMount){
                            (index === 0) ? this.stateKey++ : this.stateKey2++;
                        }
                        this.loader = false;
                    }
                    if(selectedCountry == 'US'){
                        this.usStates = this.states[0];
                        this.$store.commit('setUSStateList', this.usStates);
                    }
                } catch (error) {
                    this.loader = false;
                    console.log('Get Country error ' + error);
                }
            }
        },
        validateKeyPress(event) {
            if (event.target.value?.length > 30 || /^[a-zA-Z]$/.test(event?.key)) {
                event.preventDefault(); // Prevent input >30 characters
            }
        },
        // removeLoader() {
        //     this.loader = false;
        // },
        resetAddress() {
            if (!this.sameAsAbove && this.selectedShipping != 'fedex') {
                // this.selectedShipping = "";
                this.emptyAddress();
                this.onCountryChange(0, 1, false);
                this.$nextTick(() => {
                    this.$bus.emit('aria-announce', 'Billing address section is now visible. Please fill in your billing information.');
                    const firstField = document.getElementById('billing_name');
                    if (firstField) firstField.focus();
                });
            }
        },
        async getCountryList() {
            try {
                // this.loader = true;
                let localState = this.$store.getters.getCountryList;
                if(localState){
                    this.newCountryJson = localState;
                    return;
                }
                const response = await api.getRequest(this.$axios,null, `countries-list`);
                if (!response) {
                    this.createSwalAlert('Internal Server Error', "error");
                    this.loader = false;
                    return;
                }
                if (response && response.data) {
                    this.newCountryJson = response.data ?? [];
                    this.$store.commit('setCountryList', this.newCountryJson);
                }
            } catch (error) {
                console.log('Get Country error ' + error);
            }
        },
        async addressTypeChange() {
            this.$store.commit('setShippingMethod', this.selectedShipping);
            if (this.selectedShipping == 'fedex') {
                this.fedexShow = this.loader = false;
                const country = this.order_shipping.country;
                if (country === 'FR') {
                    this.internationalCustomers = false;
                    this.franceCustomers = true;
                } else if (country && !['US', 'CA'].includes(country)) {
                    this.internationalCustomers = true;
                    this.franceCustomers = false;
                } else {
                    this.internationalCustomers = false;
                    this.franceCustomers = false;
                }
                this.fedexJson = {
                    city: this.order_shipping.city,
                    stateOrProvinceCode: this.order_shipping.state,
                    postalCode: this.order_shipping.postcode,
                    countryCode: country
                }
                this.fedexShow = true;
            }
            else {
                this.submitted = false;
                this.emptyAddress(1);
            }
        },
        async setShippingData(val) {
            if (!val) {
                // Ignore the close event that fires when we programmatically hide the modal after selecting a location
                if (this.fedexLocationSelected) {
                    this.fedexLocationSelected = false;
                    this.fedexShow = false;
                    return;
                }
                this.fedexShow = this.loader = false;
                this.selectedShipping = 'residential';
                this.internationalCustomers = false;
                this.franceCustomers = false;
                this.$bus.emit(
                    'aria-announce',
                    'FedEx selection closed.'
                );
                return;
            }
            this.order_shipping.address_type = "cart_shipping";
            await this.onCountryChange(1);
            this.order_shipping.address1 = val.line1;
            this.order_shipping.address2 = null;
            this.order_shipping.postcode = val.postalcode;
            this.order_shipping.city = val.city;
            this.order_shipping.state = val.region;

            // Update Company name
            this.order_shipping.company_name= val?.line2 ?? '';
            this.sameAsAbove = false;
            this.$bus.emit(
                'aria-announce',
                'FedEx pickup location selected.'
            );
            this.fedexLocationSelected = true;
            this.fedexShow = false;
        },
        // valueExist() {
        //     let allCheck = false;
        //     for (var i = 0; i < this.check.length; i++) {
        //         allCheck = (this.order_billing[this.check[i]] != '' && this.order_billing[this.check[i]] != undefined);
        //         if (!allCheck) return false;
        //     }
        //     return true;
        // },
        assignBillingAddress() {
            if (this.sameAsAbove) {
                this.order_billing = { ...this.order_shipping, address_type: 'cart_billing' };
            }
        },
        getPostcodeValidation(country) {
            let noPostalAvailable = noPostcodeCountries?.find(el => el?.code == country);
            if (noPostalAvailable) {
             return ''; // no validation
            }
             return 'required|postcode:' + country; // existing logic stays
        }
    },
    head() {
        return landingData.CART_META;
    }
}
</script>
