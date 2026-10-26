<template>
    <main class="bg-gray-50">
        <!-- Skeleton for initial page load -->
        <div v-if="loading && (!cartItems || !cartItems.length)" class="pt-6 w-full" aria-busy="true"
            aria-label="Loading cart">
            <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full px-4 lg:px-8">

                <!-- Left skeleton -->
                <div class="flex-grow space-y-4">
                    <!-- Bag header -->
                    <!-- <div class="flex items-center gap-3 pb-4">
                        <div class="w-9 h-9 rounded-full bg-gray-200 skeleton-shimmer flex-none"></div>
                        <div class="h-5 w-36 bg-gray-200 skeleton-shimmer rounded"></div>
                        <div class="ml-auto h-6 w-16 bg-gray-200 skeleton-shimmer rounded-full"></div>
                    </div> -->
                    <!-- Item card skeletons -->
                    <div v-for="i in 2" :key="i" class="rounded-lg bg-white border border-gray-200 p-5 sm:p-6">
                        <div class="flex gap-4 sm:gap-5">
                            <div class="flex-none space-y-3">
                                <div
                                    class="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 bg-gray-200 skeleton-shimmer rounded-xl">
                                </div>
                                <div class="h-3 w-16 bg-gray-200 skeleton-shimmer rounded mx-auto"></div>
                            </div>
                            <div class="flex-1 min-w-0 space-y-3 pt-1">
                                <div class="flex justify-between gap-4">
                                    <div class="space-y-2 flex-1">
                                        <div class="h-4 bg-gray-200 skeleton-shimmer rounded w-4/5"></div>
                                        <div class="h-3 bg-gray-200 skeleton-shimmer rounded w-1/2"></div>
                                    </div>
                                    <div class="h-5 w-20 bg-gray-200 skeleton-shimmer rounded flex-none"></div>
                                </div>
                                <div class="pt-3 border-t border-gray-100 space-y-2">
                                    <div class="h-3 bg-gray-200 skeleton-shimmer rounded w-2/3"></div>
                                    <div class="h-3 bg-gray-200 skeleton-shimmer rounded w-1/2"></div>
                                </div>
                                <div class="h-8 w-28 bg-gray-200 skeleton-shimmer rounded-lg mt-2"></div>
                            </div>
                        </div>
                    </div>
                    <!-- Special instructions skeleton -->
                    <div class="bg-white rounded-lg border border-gray-200 p-5 space-y-3">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-gray-200 skeleton-shimmer flex-none"></div>
                            <div class="h-4 w-48 bg-gray-200 skeleton-shimmer rounded"></div>
                        </div>
                        <div class="h-20 bg-gray-200 skeleton-shimmer rounded-xl"></div>
                    </div>
                </div>

                <!-- Right skeleton -->
                <div class="lg:max-w-[400px] flex-none w-full">
                    <div class="bg-white border border-gray-200 rounded-lg px-5 py-4 space-y-4">
                        <OrderSummarySkeleton />
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty cart state -->
        <div v-if="(!cartItems || cartItems.length == 0) && !loading">
            <div class="max-w-7xl mx-auto w-full px-4 lg:px-8 pt-12 py-8 flex flex-col items-center text-center">
                <div class="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                    <Icon name="custom-shopping-cart" class="w-12 h-12 text-gray-400" />
                </div>
                <h2 class="text-xl font-semibold text-gray-800 mb-2">Your Shopping Bag is Empty</h2>
                <p class="text-sm text-gray-500 max-w-xs mb-6">
                    <NuxtLink to="/auth/login" class="text-primary underline font-medium"
                        v-if="!$store.getters.isLoggedIn">Sign in</NuxtLink>
                    <NuxtLink to="/my-account" class="text-primary underline font-medium" v-else>My Account</NuxtLink>
                    to view previously saved items or track a recent order.
                </p>
                <NuxtLink to="/"
                    class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary/90 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                    Start Shopping
                </NuxtLink>
            </div>
            <ShopJeweleryByCategory :items="items" :imagePosition="`!object-contain`" />
        </div>

        <!-- Cart content -->
        <section class="w-full" :class="loading ? 'min-h-[600px]' : ''" v-show="cartItems && cartItems.length">
            <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto w-full px-4 lg:px-8 py-8">
                <div class="flex-grow space-y-4">
                    <!-- Cart items header -->
                    <div class="flex items-start gap-3">
                        <Icon name="shopping-cart" class="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div class="flex flex-col gap-0.5">
                            <h2 class="text-base font-semibold text-gray-900" style="text-transform: none;">Your Shopping Bag</h2>
                            <p class="text-xs text-gray-500">Review your items</p>
                        </div>
                        <p class="ml-auto mt-0.5 flex items-center gap-1 text-xs text-gray-500 py-2 px-3 bg-gray-100 rounded-full" aria-hidden="true">
                            <Icon name="check" class="h-3.5 w-3.5" aria-hidden="true" />
                            {{ cartItems.length }} item{{ cartItems.length !== 1 ? 's' : '' }}
                        </p>
                    </div>
                    <!-- Cart items card -->
                    <div>
                        <ul class="space-y-4" :key="`cartItems-${cartItems.length}`">
                            <li v-for="(item, index) in cartItems" :key="`cart-item-key-${index}`"
                                :id="`cart-item-${index}`" class="px-5 py-4 bg-white rounded-xl border border-gray-200 shadow-sm">
                                <!-- Skeleton while this item is being removed -->
                                <div v-if="removingIndex === index" class="flex gap-4 sm:gap-8">
                                    <div class="flex-none">
                                        <div
                                            class="w-16 h-16 md:w-24 md:h-24 lg:w-40 lg:h-40 bg-gray-200 skeleton-shimmer rounded">
                                        </div>
                                    </div>
                                    <div class="flex-1 space-y-3 pt-1">
                                        <div class="h-4 bg-gray-200 skeleton-shimmer rounded w-3/4"></div>
                                        <div class="h-3 bg-gray-200 skeleton-shimmer rounded w-1/2"></div>
                                        <div class="h-3 bg-gray-200 skeleton-shimmer rounded w-1/3"></div>
                                    </div>
                                    <div class="h-5 w-16 bg-gray-200 skeleton-shimmer rounded flex-none"></div>
                                </div>
                                <div v-else class="flex flex-row gap-4 justify-between">
                                    <div class="flex-none flex flex-col">
                                        <keep-alive>
                                            <div
                                                class="relative w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 border border-gray-100 rounded-lg">
                                                <NuxtLink :to="getRedirectUrl(item)"
                                                    :aria-label="`View details for ${item.name}. ${
                                                        showStrikeThroughPrice(item)
                                                            ? `Original price ${formattedPrice(showStrikeThroughPrice(item))}, discounted price ${formattedPrice(fetchPriceData(item))}`
                                                            : `Price ${formattedPrice(fetchPriceData(item))}`
                                                        }`"
                                                    class="absolute inset-0 z-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"></NuxtLink>
                                                <div class="w-full h-full bg-white"
                                                    v-if="item.product?.images && !item.product?.images.length">
                                                    <NoImage />
                                                </div>
                                                <ImagePreview v-else :image="fetchFirstProductImage(item)" ref="viewer"
                                                    :attributes="getLWRatio(item)" type="button"
                                                    :hidePreview="true" />
                                            </div>
                                        </keep-alive>
                                        <button type="button" v-if="isShowWishListButton(item)"
                                            class="flex items-center mt-2 gap-1.5 text-xs underline hover:text-primary"
                                            @keydown.enter="triggerWishlist($event)">
                                            <Heart class="pl-[0.100rem] flex-none flex items-center"
                                                :item="getWishListData(item)" :selectedVariant="{}" :type="'cart'"
                                                :tabIndex="-1"
                                                @removeFromCart="removeItem(index, item.id, 'wishlist')">
                                                <span class="inline-flex ml-1"><span class="hidden md:inline-block">Move
                                                        to&nbsp;</span>Wishlist</span>
                                            </Heart>
                                        </button>
                                        <button :aria-label="`Remove ${item.name} from cart`"
                                            v-if="isShowRemoveButton(item)"
                                            class="flex text-xs hover:text-primary underline items-center gap-1 mt-1 w-full"
                                            @click="removeItem(index, item.id)">
                                            <Icon name="close" class="w-5 h-5 text-gray-black" />
                                            <span class="text-xs block">Remove</span>
                                        </button>
                                    </div>
                                    <div class="flex-1 flex flex-col">
                                        <div class="flex gap-4 justify-between">
                                            <div class="flex flex-col text-sm sm:text-base space-y-1">
                                                <CartItemName :item="item" :className="'flex-1 !capitalize font-medium text-gray-900'" />
                                            </div>
                                            <div class="flex-none">
                                                <span class="sr-only hidden sm:inline-block">
                                                    {{ showStrikeThroughPrice(item)
                                                        ? `Original price ${formattedPrice(showStrikeThroughPrice(item))}, discounted price ${formattedPrice(fetchPriceData(item))}`
                                                        : `Price is ${formattedPrice(fetchPriceData(item))}`
                                                    }}
                                                </span>
                                                <div class="flex flex-col items-start gap-1 justify-end text-right">
                                                    <span class="text-sm sm:text-base font-medium text-gray-800"
                                                        v-if="typeof item.price !== 'undefined'"
                                                        :class="{ '!text-gray-900': showStrikeThroughPrice(item) }">{{
                                                            formattedPrice(fetchPriceData(item))
                                                        }}</span>
                                                    <span class="line-through text-gray-600 text-xs"
                                                        v-if="showStrikeThroughPrice(item)">{{
                                                            formattedPrice(showStrikeThroughPrice(item)) }}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-4 space-y-4 pt-4">
                                            <div class="text-xs mt-4" v-if="item.is_certified_diamond">
                                                <span tabindex="0"
                                                    class="inline-flex items-center gap-1.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1">
                                                    <Icon name="star" class="w-3 h-3" />
                                                    Only One Available
                                                </span>
                                            </div>
                                            <!-- Discount badge -->
                                            <div v-if="showStrikeThroughPrice(item)" class="inline-flex font-semibold items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                                <Icon name="check-verified" class="size-3.5"/>
                                                {{ formattedPrice(showStrikeThroughPrice(item) - fetchPriceData(item)) }} discount applied automatically
                                            </div>
                                            <div :class="['pt-3 space-y-3', {'border-t border-gray-100' : item.type !== 'simple'}]">
                                                <!--Static Key Data -->
                                                <AdditionalData :item="item" :type="'cart_summary'"/>
                                                <div class="space-y-1 w-full text-sm"
                                                    v-if="item.is_add_center_stone && item.selectedCenterStone && !item.prong_fitting?.prong_type">
                                                    <div v-if="item.showCustomerCare && !item.showProngFitting"
                                                        class="bg-primary/5 px-2 py-1">
                                                        <span class="prong-focus-target" tabindex="-1">
                                                            Your order will be placed without prongs. If you would
                                                            like to add them, please call customer service at
                                                            {{ phoneNumber }} or
                                                            <button type="button" class="text-primary underline"
                                                                @click="toggleProngUI(index)">
                                                                click here.
                                                            </button>
                                                        </span>
                                                    </div>

                                                    <!-- Center Stone Radio Group -->
                                                    <div class="flex flex-col sm:flex-row gap-2 items-start sm:items-center text-sm"
                                                        v-if="!item.showProngFitting && !item.showCustomerCare">
                                                        <label :for="`inline-radio-0-${index}`"
                                                            class="capitalize font-normal">{{
                                                                item.wouldYouLikeToAddQues
                                                                    ? "Would you like to add center stone ? "
                                                                    : "Do you know the specifics of your center stone ? "
                                                            }}</label>
                                                        <div class="flex gap-2">
                                                            <div class="flex items-center mr-1"
                                                                v-for="(el, index5) in yesNoArr"
                                                                :key="`yes-no-${index5}-${index}`">
                                                                <input :id="`inline-radio-${index5}-${index}`" type="radio"
                                                                    :name="`inline-radio-group-${index}`"
                                                                    class="w-4 h-4 radio text-primary bg-white border-2 border-gray-300 focus:ring-primary"
                                                                    :value="el.value"
                                                                    @change="centerStoneAlter($event, index)"
                                                                    @focus="announceRadioLabel(item, index)" />
                                                                <label :for="`inline-radio-${index5}-${index}`"
                                                                    class="ml-2 text-sm">{{ el.text }}</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- Shape Selecter -->
                                                    <div v-if="item.showProngFitting && !item.showCustomerCare">
                                                        <div class="flex gap-2 items-center text-sm"
                                                            v-if="!item.prong_fitting?.prong_type && !item.prong_fitting?.is_submit">
                                                            <label :for="`center-stone-select-${index}`"
                                                                class="font-normal prong-focus-target" tabindex="-1">What is
                                                                the shape of your center diamond?</label>
                                                            <select
                                                                v-if="item.product?.available_center_stone && item.product?.available_center_stone?.length"
                                                                :id="`center-stone-select-${index}`"
                                                                class="rounded-lg capitalize border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                                                                @input="(e) => e.target.value == 'not_sure' ? (item.showCustomerCare = true) : callModal(e, index)">
                                                                <option value="not_sure" disabled selected>
                                                                    Not Sure
                                                                </option>
                                                                <option :value="data.label"
                                                                    v-for="(data, index7) in item.product?.available_center_stone"
                                                                    :key="`center-stone-${index7}-${index}`">
                                                                    {{ data.label }}
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <!-- Prong fitting submitted section -->
                                                <div class="flex justify-between mt-4 text-sm"
                                                    v-if="item.prong_fitting?.is_submit && item.prong_fitting?.prong_type">
                                                    <div class="text-sm flex flex-wrap items-center gap-x-2">
                                                        <span class="font-normal text-sm capitalize">Prongs :</span>
                                                        <div class="flex flex-wrap gap-1">
                                                            <span>
                                                                {{ item.prong_fitting?.carat ? item.prong_fitting?.carat +
                                                                    "ct." : "" }}
                                                            </span>
                                                            {{ item.prong_fitting?.prong_type ?
                                                                item.prong_fitting?.prong_type
                                                                :
                                                                "" }}
                                                            <div
                                                                v-if="item.prong_fitting?.length || item.prong_fitting?.width || item.prong_fitting?.height">
                                                                {{ item.prong_fitting?.length }}
                                                                {{ item.prong_fitting?.width ? " x " +
                                                                    item.prong_fitting?.width :
                                                                    ""
                                                                }}
                                                                {{ item.prong_fitting?.height ? " x " +
                                                                    item.prong_fitting?.height
                                                                    :
                                                                    "" }}
                                                                mm
                                                            </div>
                                                            <button type="button" :ref="`removeProng-${index}`"
                                                                :aria-label="`Remove prong: ${item.prong_fitting?.carat ? item.prong_fitting?.carat + ' ct.' : ''} ${item.prong_fitting?.prong_type || ''} ${item.prong_fitting?.length ? item.prong_fitting?.length + (item.prong_fitting?.width ? ' x ' + item.prong_fitting?.width : '') + (item.prong_fitting?.height ? ' x ' + item.prong_fitting?.height : '') + ' mm' : ''}`.trim()"
                                                                class="text-primary text-xs ml-1"
                                                                @click="removeProngFitting(index)">Remove</button>
                                                        </div>
                                                    </div>
                                                    <div> {{ item.prong_fitting?.prong_price ?
                                                        formattedPrice(item.prong_fitting?.prong_price) : "-" }}</div>
                                                </div>

                                                <div class="space-y-3">
                                                    <template v-if="item.is_ring_size">
                                                        <div :id="`ring-size-wrapper-${index}`"
                                                            class="flex sm:inline-flex items-center gap-3 text-sm px-3 py-1 border rounded-lg"
                                                            :class="item.isRingSizeMissing ? 'border-red-500 ring-2 ring-red-100' : 'border-gray-200'">
                                                            <label :for="`ringsizeOpt${index}`"
                                                                class="capitalize font-normal text-sm whitespace-nowrap">Ring
                                                                Size :</label>
                                                            <Dropdown :variants="getModifiedRingOptions(item)"
                                                                :selectedSku="getParsedRingSize(item)?.size || item.ring_size"
                                                                :selectedVariant="getParsedRingSize(item)"
                                                                @option-selected="ringSizeUpdate($event, index)"
                                                                :defaultName="getParsedRingSize(item) || item.ring_size || `Select Size`"
                                                                :disableStyle="true"
                                                                :parentClass="`w-full`"
                                                                :buttonClass="`!p-0 !bg-transparent w-[150px] sm:!w-[90px] !min-h-8 flex-1`"
                                                                aria-label="Select Ring Size" />
                                                            </div>
                                                            <div v-if="item.isRingSizeMissing"></div>
                                                            <!-- <div v-if="item.isRingSizeMissing"
                                                                class="flex items-start gap-1.5 mt-3 max-w-sm">
                                                                <div class="shrink-0 mt-1 inline-flex items-center justify-center w-3 h-3 rounded-full bg-red-600 text-white text-[10px] font-bold leading-none"
                                                                    aria-hidden="true">!</div>
                                                                <div>
                                                                    <p class="text-xs text-black leading-normal">
                                                                        Please select a ring size.
                                                                    </p>
                                                                </div>
                                                            </div> -->
                                                    </template>

                                                    <div v-if="item.is_engraving && !item.engraving?.text">
                                                        <div class=" text-sm flex items-center space-x-3"
                                                            v-if="!item.engraving?.text">
                                                            <button class="flex items-center gap-2 text-primary"
                                                                :aria-label="`Add Engraving for ${formattedPrice(item.engraving?.price || item.engraving?.default_price)}`"
                                                                @click="openEngraveModal(item, index)">
                                                                <span aria-hidden="true">Add Engraving</span>
                                                                <span aria-hidden="true" class="mt-0.5">&#40; {{
                                                                    formattedPrice(item.engraving?.price ?
                                                                        item.engraving?.price : item.engraving?.default_price)
                                                                }}
                                                                    &#41;</span> +
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="flex justify-between"
                                                        v-if="item.is_engraving && item.engraving?.text">
                                                        <div
                                                            class="text-sm flex-1 flex flex-col sm:flex-row sm:items-center gap-x-2">
                                                            <span class="font-normal">Engraving :</span>
                                                            <div>
                                                                <span>
                                                                    <span class="capitalize">{{ item.engraving?.type
                                                                    }}</span> Lettering <span class="font-normal">"{{
                                                                            item.engraving?.text }}"</span>
                                                                </span>
                                                                <button type="button" class="text-primary text-xs ml-1"
                                                                    :aria-label="`Remove engraving: ${item.engraving?.type} lettering '${item.engraving?.text}'`"
                                                                    :ref="`removeEngraving-${index}`"
                                                                    @click="clearEngraveTag(index)">Remove</button>
                                                            </div>
                                                        </div>
                                                        <div class="text-sm sm:text-base">{{
                                                            formattedPrice(item.engraving?.price ? item.engraving?.price :
                                                                item.engraving?.default_price) }}</div>
                                                    </div>

                                                    <div>
                                                        <button type="button" class="text-sm text-primary"
                                                            :aria-expanded="item.showPlansAtBottom ? 'true' : 'false'"
                                                            :aria-controls="`care-plan-section-${index}`"
                                                            v-if="item.care_plan && item.care_plan?.quotes && !item.protection_plan?.planSku"
                                                            @click="toggleProtectPlan(item, index)">Protect
                                                            Your
                                                            Purchase +</button>
                                                        <div class="flex justify-between"
                                                            v-if="item.protection_plan && item.protection_plan?.planSku">
                                                            <div
                                                                class="text-sm flex-1 flex flex-col sm:flex-row sm:items-center gap-x-2">
                                                                <span class="font-normal text-sm">Protect Plan:</span>
                                                                <div>
                                                                    {{ item.protection_plan?.applicablePlanDuration ?
                                                                        item.protection_plan?.applicablePlanDuration : "-" }}
                                                                    <button type="button"
                                                                        aria-label="Remove care plan"
                                                                        class="text-primary text-xs ml-1"
                                                                        @click="updateCartApi(index, { protection_plan: {} })">Remove</button>
                                                                </div>
                                                            </div>
                                                            <div class="text-sm sm:text-base"> {{
                                                                item.protection_plan?.price ?
                                                                    formattedPrice(item.protection_plan?.price) : "-"
                                                            }}</div>
                                                        </div>
                                                        <div v-if="item.showPlansAtBottom"
                                                            :id="`care-plan-section-${index}`">
                                                            <div class="text-xs mb-1">
                                                                <p>Enjoy peace of mind with a Care Plan from Jeweler's
                                                                    Mutual.
                                                                    <Link :href="STATIC_ROUTES.CARE_PLAN" colorType="link"
                                                                        class="ml-1 inline-flex !text-xs !py-0 underline"
                                                                        :ref="`carePlanLink-${index}`">
                                                                    Learn More
                                                                    </Link>
                                                                </p>
                                                            </div>
                                                            <ProtectionPlan v-if="item.care_plan && item.care_plan?.quotes"
                                                                :quotes="item.care_plan?.quotes" :index="index"
                                                                v-on:addPlanToItem="addPlan"
                                                                :selectedPlan="item?.protection_plan" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="cartIdInDuplicateDiamond(item?.id)"
                                            class="flex items-start gap-1.5 mt-3 max-w-sm">
                                            <div class="shrink-0 mt-1 inline-flex items-center justify-center w-3 h-3 rounded-full bg-red-600 text-white text-[10px] font-bold leading-none"
                                                aria-hidden="true">!</div>
                                            <div>
                                                <p class="text-xs text-black leading-normal">
                                                    {{ duplicateDiamondMessageParts.before }}

                                                    <NuxtLink class="text-primary underline font-medium cursor-pointer"
                                                        v-if="duplicateDiamondMessageParts.hasLink" :to="getUrl(item)">
                                                        {{ duplicateDiamondLinkText }}
                                                    </NuxtLink>

                                                    {{ duplicateDiamondMessageParts.after }}
                                                </p>
                                            </div>
                                        </div>
                                        <div v-if="!item.is_available"
                                            class="flex items-start gap-1.5 mt-3 max-w-sm">
                                            <div class="shrink-0 mt-1 inline-flex items-center justify-center w-3 h-3 rounded-full bg-red-600 text-white text-[10px] font-bold leading-none"
                                                aria-hidden="true">!</div>
                                            <div>
                                                <p class="text-xs text-black leading-normal">
                                                    {{ item.stock_message }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div><!-- /cart items card -->

                    <!-- Special instructions card -->
                    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden" v-if="apiResponse.data">
                        <div class="flex items-center gap-3 px-5 py-4">
                            <Icon name="document" class="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                            <div class="flex flex-col gap-0.5">
                                <h2 class="text-base font-semibold text-gray-900" style="text-transform: none;">Comments / Special Instructions</h2>
                            </div>
                        </div>
                        <div class="px-5 pb-4">
                            <label for="specialInstruction" class="sr-only">Comments / Special Instructions</label>
                            <textarea name="specialInstruction" id="specialInstruction" cols="30" rows="4"
                                aria-describedby="instruction-limit"
                                placeholder="Write your instructions here..."
                                class="p-4 w-full border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-150 text-sm resize-none"
                                v-model="apiResponse.data.special_instruction" maxlength="160"></textarea>
                            <p id="instruction-limit" class="sr-only">Maximum 160 characters.</p>
                        </div>
                    </div>
                    <!-- <TrustBadges /> -->
                </div>

                <!-- summary -->
                <div class="lg:max-w-[400px] flex-none w-full">
                    <!-- Order Summary header -->
                    <div class="flex items-start gap-3 mb-4">
                        <Icon name="clipboard" class="h-6 w-6 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <div class="flex flex-col gap-0.5">
                            <h2 class="text-base font-semibold text-gray-900" style="text-transform: none;">Order Summary</h2>
                            <p class="text-xs text-gray-500">Price details & totals</p>
                            <!-- <p class="ml-auto flex items-center text-xs text-gray-500" aria-hidden="true">
                                <Icon name="shield-check" class="h-3.5 w-3.5 text-custom-green" aria-hidden="true" />
                                Secure Checkout
                            </p> -->
                        </div>
                    </div>
                    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-4">
                        <div class="px-5">
                            <OrderSummary :orderData="{ currentTab: 'summary' }" :key="orderSummaryKey" v-if="apiResponse">
                                <div class="py-5 border-t border-gray-200" v-if="!couponExist()">
                                    <div class="flex items-center gap-2 mb-2">
                                        <Icon name="tag" class="h-4 w-4 text-primary flex-shrink-0" aria-hidden="true" />
                                        <label for="coupon1" class="w-full text-sm font-medium text-gray-700">Promo Code</label>
                                    </div>
                                    <!-- <div class="relative" v-if="couponExist()">
                                        <input type="text" name="coupon" id="coupon"
                                            class="py-2.5 pl-4 pr-20 w-full border border-gray-200 bg-gray-50 text-gray-500 text-sm" v-model="coupon_code"
                                            disabled />
                                        <button type="button" ref="removePromoBtn"
                                            class="text-red-500 font-semibold text-sm absolute inset-y-0 right-0 mr-4"
                                            aria-label="Click button to remove coupon code." @click="removeCoupon()">
                                            Remove
                                        </button>
                                    </div> -->
                                    <div class="relative">
                                        <label for="coupon1" class="sr-only">Enter coupon code</label>
                                        <input type="text" name="coupon" id="coupon1"
                                            class="py-2.5 pl-4 pr-20 w-full border border-gray-200 rounded-xl text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all duration-150"
                                            v-model="coupon_code" />
                                        <button type="button" ref="applyPromoBtn"
                                            class="text-primary text-sm font-semibold absolute inset-y-0 right-0 mr-4"
                                            aria-label="Apply coupon code" @click="applyCoupon()">
                                            Apply
                                        </button>
                                    </div>
                                </div>
                                <!-- Submit actions -->
                                <div v-if="apiResponse.data">
                                    <div v-if="ringSizeError" id="ring-size-checkout-error"
                                        class="flex items-center gap-2 mb-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                                        role="alert" aria-live="assertive" tabindex="-1" ref="ringSizeCheckoutError">
                                        <div class="shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold leading-none"
                                            aria-hidden="true">!</div>
                                        <span>Please select your ring size to continue.</span>
                                    </div>
                                    <div class="pb-4">
                                        <CartSubmitButton @submit="formSubmit()" :tab="'summary'" :buttonText="'Continue to Secure Checkout'" :className="`!max-w-full w-full`" :cartResponse="apiResponse"/>
                                    </div>
                                    <!-- <div class="sm:max-w-80 ml-auto mt-4">
                                        <div class="text-sm text-center py-2 text-gray-500">or</div>
                                        <NuxtLink :to="STATIC_ROUTES.HOME"
                                            class="font-light text-sm block text-center text-primary">
                                            Continue Shopping
                                        </NuxtLink>
                                    </div> -->
                                </div>
                            </OrderSummary>
                            <OrderSummarySkeleton v-if="!apiResponse" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="max-w-7xl mx-auto w-full px-4 lg:px-8 space-y-8"
            aria-labelledby="payment-options-heading"
            :class="extraItems?.length ? 'py-6 md:py-12' : 'pt-6 md:pt-12'">
            <div class="text-center">
                <h2 id="payment-options-heading" class="text-lg font-normal">
                    Flexible Payment Options
                </h2>
            </div>
            <ul class="capitalize items-end grid grid-cols-2 sm:flex flex-wrap gap-4 justify-around">
                <li v-for="(item, index) in paymentOpt" :key="`payment-opt-${index}`" tabindex="0" :aria-label="`${item.name}`">
                    <div class="block text-center space-y-3">
                        <div class="w-20 mx-auto" aria-hidden="true">
                            <span v-if="item.name == 'Debit or Credit Card'"
                                class="material-symbols-sharp text-4xl">credit_card</span>
                            <img class="w-full h-full object-contain object-top m-auto"
                                :src="$asset(`@/assets/images/${item.img}`)" alt=""
                                v-if="!['Debit or Credit Card', 'Pay by Phone', 'Split Pay', 'Wire Transfer'].includes(item.name)" />
                            <span v-if="item.name == 'Wire Transfer'"
                                class="material-symbols-sharp text-4xl">local_atm</span>
                            <span v-if="item.name == 'Pay by Phone'"
                                class="material-symbols-sharp text-4xl">smartphone</span>
                            <span v-if="item.name == 'Split Pay'"
                                class="material-symbols-sharp text-4xl">add_card</span>
                        </div>
                        <span class="inline-block text-sm">{{ item.name }}</span>
                    </div>
                </li>
            </ul>
        </section>
        <section class="py-6 sm:py-12" v-if="extraItems && extraItems.length && cartItems?.length">
            <ProductCarousel :isSummary="true" :arrayData="extraItems" :heading="'Cleaning Products'"
                :isCleaningProduct="true" :loadingId="addingToCartId" @addToCartEmit="addToCart" type="cleaning" :gradient="true"/>
        </section>
        <EngraveModal v-if="showModal && modalType == 'engrave'" :heading="engraveHeading"
            @engraveTextTag="engraveTagAdd" @close="closeModal" />
        <ProngModal v-if="showModal && modalType == 'prong'" @assignProngData="assignProngData" @close="closeModal" />
    </main>
</template>
<script>
import { deepClone } from '~/utils/deepClone.js';
import api from "~/api-client/rest-api/index";
import Icon from "~/components/common/Icon.vue";
import ShopJeweleryByCategory from "~/components/carousel/ShopJeweleryByCategory.vue";
import NoImage from "~/components/ui/NoImage.vue";
import ImagePreview from "~/components/product/ImagePreview.vue";
import Heart from "~/components/ui/Heart.vue";
import Dropdown from "~/components/ui/Dropdown.vue";
import Link from "~/components/ui/Link.vue";
import ProtectionPlan from "~/components/checkout/ProtectionPlan.vue";
import CartSubmitButton from "~/components/checkout/CartSubmitButton.vue";
import OrderSummary from "~/components/checkout/OrderSummary.vue";
import OrderSummarySkeleton from "~/components/skeleton/OrderSummarySkeleton.vue";
import ProductCarousel from "~/components/product/ProductCarousel.vue";
import EngraveModal from "~/components/modal/EngraveModal.vue";
import ProngModal from "~/components/modal/ProngModal.vue";
import { showStrikeThroughPrice, fetchPriceData, correctUrl, productRedirection, fetchFirstProductImage, getCategoryType } from "~/utils/universalHelper.js";
import mixin from "~/mixin/sweetAlert";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import KEYS from "~/utils/constant.js";
import Button from "~/components/common/Button.vue";
import landingData from "~/static/js/pageMetaHeading.js";
import AdditionalData from "~/components/checkout/AdditionalData.vue";
import CartItemName from "~/components/checkout/CartItemName.vue";
export default {
    name: 'CartSummary',
    components: { Icon, ShopJeweleryByCategory, NoImage, ImagePreview, Heart, Dropdown, Link, ProtectionPlan, CartSubmitButton, OrderSummary, OrderSummarySkeleton, ProductCarousel, EngraveModal, ProngModal, Button, AdditionalData, CartItemName },
    data() {
        return {
            loading: true,
            removingIndex: null,
            addingToCartId: null,
            cartItems: [],
            showModal: false,
            currentProductIndex: "",
            currentProductFamily: '',
            paymentOpt: [{ img: "debit_or_credit_card.webp", name: "Debit or Credit Card" },
            { img: "paypal.webp", name: "Paypal" },
            { img: "financing_with_affirm.webp", name: "Financing with Affirm" },
            { img: "wire_transfer.webp", name: "Wire Transfer" },
            { img: "pay_by_phone.webp", name: "Pay by Phone" },
            { img: "splitpay.webp", name: "Split Pay" }],
            apiResponse: "",
            yesNoArr: [{ code: "Yes", value: 1, text: "Yes" }, { code: "no", value: 0, text: "No" }],
            extraItems: [],
            coupon_code: "",
            order_summary: '',
            modalType: 'engrave',
            prongItemIndex: 100,
            ringSizeError: false,
            items: [
                {
                    title: 'Rings & Bands',
                    link: STATIC_ROUTES.RINGS_AND_BANDS,
                    image: '/landing-pages/heros/c_ringbands.jpg'
                },
                {
                    title: 'Earrings',
                    link: STATIC_ROUTES.EARRINGS,
                    image: '/landing-pages/heros/c_earrings.jpg'
                },
                {
                    title: 'Pendants',
                    link: STATIC_ROUTES.NECKLACES,
                    image: '/landing-pages/heros/c_pendant.jpg'
                },
                {
                    title: 'Bracelets',
                    link: STATIC_ROUTES.BRACELETS,
                    image: '/landing-pages/heros/c_bracelet.jpg'
                }
            ],
            product: null,
            selectedVariant: null,
            orderSummaryKey: 0,
            STATIC_ROUTES,
            duplicateDiamondLinkText: 'choose a new diamond',
            isRingSizeMissing: false,
        };
    },
    computed: {
        phoneNumber() {
            return this.$store.state.phoneNumber;
        },
        telPhoneNumber() {
            return this.$store.state.phoneNumber?.replace(/[^+\d]/g, '');
        },
        engraveHeading() {
            if (this.currentProductFamily.includes('necklace')) {
                return 'Engrave Your Necklace';
            }
            return 'Engrave Your Ring';
        },
        duplicateDiamondMessageParts() {
            const message = this.apiResponse?.data?.duplicate_diamond_message || '';

            const linkText = this.duplicateDiamondLinkText;

            if (!message || !message.includes(linkText)) {
                return {
                    before: message,
                    after: '',
                    hasLink: false
                }
            }

            const [before, after] = message.split(linkText)

            return {
                before,
                after,
                hasLink: true
            }
        },
    },
    methods: {
        createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
        fetchPriceData: item => fetchPriceData(item),
        showStrikeThroughPrice: item => showStrikeThroughPrice(item),
        fetchFirstProductImage: item => fetchFirstProductImage(item),
        getUrl(item) {
            const sku = item?.sku;
            const redirectParams = this.apiResponse?.data?.diamond_redirect_params;
            const attrValue = item?.diamond_redirect_params ?? redirectParams?.[sku] ?? null;
            const baseUrl = STATIC_ROUTES.DIAMONDS_SEARCH;

            // Guard: if no redirect params exist, return baseUrl — caller must check
            if (!attrValue) return baseUrl;
            if (typeof attrValue !== 'object') return baseUrl;
            const get = (code) => {
                const val = attrValue[code];
                if (val == null) return null;
                const str = String(val).toLowerCase().trim();
                return str === 'lab grown' || str === 'lab-grown' ? 'lab-grown' : str;
            };

            const shape = get('diamond_shape');
            const priceNum = parseFloat(get('price'));
            const carat = parseFloat(get('diamond_carat_weight'));
            const paramMap = {
                diamond_shape: shape,
                diamond_cut_grade: get('diamond_cut_grade'),
                diamond_color_grade: get('diamond_color_grade'),
                diamond_clarity_grade: get('diamond_clarity_grade'),
                diamond_carat_weight: isNaN(carat) ? null : JSON.stringify(this.getSmartCaratRange(carat)),
                diamond_origin: get('diamond_growth'),
                price: isNaN(priceNum) ? null : JSON.stringify({ min: Math.floor(priceNum * 0.80), max: Math.ceil(priceNum * 1.20) }),
                similar: 1
            };
            // Strip out any null/undefined values — don't send empty params to API
            const cleanParams = Object.fromEntries(
                Object.entries(paramMap).filter(([, v]) => v !== null && v !== undefined)
            );
            const routeUrl = `${baseUrl}${shape}`;
            return `${routeUrl}?${new URLSearchParams(cleanParams).toString()}`;
        },
        getSmartCaratRange(currentCarat) {
            let buffer;

            if (currentCarat < 1.0) {
                // High density: Keep it tight (e.g., 0.50ct -> 0.48 to 0.52)
                buffer = 0.05;
            } else if (currentCarat >= 1.0 && currentCarat < 3.0) {
                // Medium density: (e.g., 1.50ct -> 1.35 to 1.65)
                buffer = 0.10;
            } else {
                // Rare/Sparse: (e.g., 5.00ct -> 4.00 to 6.00)
                buffer = 0.20;
            }

            return {
                min: (currentCarat * (1 - buffer)).toFixed(2),
                max: (currentCarat * (1 + buffer)).toFixed(2)
            };
        },
        cartIdInDuplicateDiamond(id) {
            return this.apiResponse?.data?.duplicate_cart_item_ids?.includes(id);
        },
        announceRadioLabel(item, index) {
            const question = item.wouldYouLikeToAddQues
                ? 'Would you like to add center stone?'
                : 'Do you know the specifics of your center stone?';
            this.$bus.emit('aria-announce', question);
        },
        triggerWishlist(event) {
            const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
            if (checkbox) checkbox.click();
            this.$bus.emit('aria-announce', 'Item moved to wishlist.');
        },

        toggleProtectPlan(item, index) {
            const newVal = !item.showPlansAtBottom;
            this.cartItems[index].showPlansAtBottom = newVal;

            if (newVal) {
                this.$bus.emit('aria-announce', 'Protect plan expanded. Learn More about protect your purchase care plan.');

                setTimeout(() => {
                    const link = document.querySelector(`#care-plan-section-${index} a`);
                    if (link) link.focus();
                }, 100);
            } else {
                this.$bus.emit('aria-announce', 'Protect plan collapsed.');
            }
        },
        getCartItemSku(item) {
            if (!item) return '';
            const { sku, additional } = item;
            if (additional) {
                let diamond_sku = additional.diamond_sku;
                if (Array.isArray(diamond_sku) && diamond_sku.length > 0) {
                    return diamond_sku.length > 1 ? diamond_sku.join(', ') : diamond_sku[0];
                }
            }
            if (!sku) return null;
            const splitIndex = sku.toLowerCase().indexOf('-d-');
            if (splitIndex !== -1) {
                const setting = sku.substring(0, splitIndex);
                const diamond = sku.substring(splitIndex + 1); // includes 'd-'
                return `${diamond}, ${setting}`;
            }
            return sku;
        },
        toggleProngUI(index) {
            const item = this.cartItems[index];
            item.showCustomerCare = false;
            item.showProngFitting = true;
            item.prong_fitting.prong_type = '';
        },
        async callGTMEvent(type = null) {
            await this.$store.commit('setGTMData');
            await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: type });
        },
        openEngraveModal(item, index) {
            this.lastFocusedElement = document.activeElement;
            this.currentProductFamily = item?.product?.attribute_family_code || '';
            this.currentProductIndex = index;
            this.modalType = 'engrave';
            this.showModal = true;
        },
        getParsedRingSize(item) {
            try {
                let parsedItem = JSON.parse(item?.ring_size);
                return parsedItem ?? item?.ring_size;
            } catch (error) {
                return item?.ring_size;
            }
        },

        getModifiedRingOptions(item) {
            if (item && item.ring_options_with_prices?.length) {
                let ringOptions = item.ring_options_with_prices;
                const basePrice = item.price;
                let currentPrice = '';
                ringOptions.forEach((el) => {
                    if (basePrice) {
                        const minimumDelta = ringOptions[0].delta;
                        currentPrice = Math.round(basePrice * (el.delta / minimumDelta) / 10) * 10;
                        el.current_price = currentPrice;
                        el.formatted_price = this.$formatPrice(parseInt(currentPrice));
                    }
                    const calPrice = currentPrice ? parseInt(basePrice) - currentPrice : el.current_price;
                    el.calPrice = Math.abs(calPrice);
                    el.sku = el.size;

                    const formattedPrice = calPrice !== 0
                        ? `${calPrice > 0 ? '-' : '+'}${this.$formatPrice(Math.abs(calPrice))}`
                        : '';
                    el.name = `${el.size}${formattedPrice ? ` (${formattedPrice})` : ''}`;
                })
                return ringOptions;
            }
            return item?.ring_options;
        },
        isShowWishListButton(item) {
            return !item.product?.attribute_family_code.includes('default') && !item?.additional?.certificate;
        },
        isShowRemoveButton(item) {
            return !item?.additional?.certificate;
        },
        getWishListData(item) {
            let data = null;

            if (item && item.product && item.product?.type == 'bundle') {
                data = item.product;
            } else if (item && item.product && item.child?.product) {
                data = item.child.product;
                data.url_key = item.product?.url_key;
                data.parent_id = item.product?.id;
                data.variant_sku = item.product?.variant_sku;
            } else {
                data = item.product;
            }

            // fallback for sku
            if (data && !data.sku) {
                data.sku = item?.sku;
            }

            return { ...item, ...data };
        },
        async startCreatingBundle(index) {
            let el = this.cartItems[index];
            try {
                this.loading = true;
                let apiUrl = `get-single-product?url_key=${el?.product?.url_key}`;
                let response = await api.getRequest(this.$axios, this.$cookies, apiUrl);
                let productData = response.data?.data;
                if (productData) {
                    this.product = productData;
                }
                if (this.product?.is_add_bundle) {
                    this.selectedVariant = this.product?.variants?.find((variant) => variant?.id == el?.additional?.selected_configurable_option);
                    if (this.selectedVariant && this.selectedVariant?.sku) {
                        this.product['selectedVariant'] = this.selectedVariant;
                    }
                }
                await this.startBundle(el);
            } catch (error) {
                this.createSwalAlert('Unable to load bundle data', 'error');
            }
        },
        async startBundle(el) {
            try {
                let eventType = getCategoryType(this.product?.attribute_family_code);
                if (eventType?.action && this.product && this.product?.is_add_bundle) {
                    //Setting session data
                    let bundleType = eventType?.key ?? 'ring';
                    sessionStorage.setItem('bundleType', bundleType);
                    await this.$store.dispatch('bundle/clearData', { type: 'configurable', category: eventType?.key ?? 'ring' });
                    await this.$store.dispatch('bundle/clearData', { type: 'simple', category: eventType?.key ?? 'ring' });
                    await this.$store.dispatch(`bundle/${eventType?.action}`, this.product);
                    let redirectUrl = `/diamonds/search/${el?.selected_center_stone?.toLowerCase()}`;
                    this.$bus.emit(
                        'aria-announce',
                        'Redirecting to diamond selection page.'
                    );
                    this.$router.push(redirectUrl);
                }
            } catch (error) {
                this.createSwalAlert('Unable to start bundle', 'error');
            }
            this.loading = false;
        },
        formattedPrice(price) {
            if (price === 0) return this.$formatPrice(0, true);
            if (price) return this.$formatPrice(parseFloat(price), true);
        },
        getRedirectUrl(item) {
            if (item && this.extraItems?.length > 0) {
                const foundItem = this.extraItems.find(el => el?.id == item?.product?.id);
                if (foundItem) return this.$route.fullPath;
            }
            if (item && !this.isShowRemoveButton(item)) {
                return this.$route.fullPath;
            }
            let url = item && item.product ? item?.product?.url_key : '';
            if (url.includes('your-setting')) return `${correctUrl(url)}`;
            let urlRedirect = productRedirection(item.product ?? item) || STATIC_ROUTES.HOME;
            // for configurable
            if (item?.type == "configurable" && !urlRedirect.includes('?sku')) {
                urlRedirect = `${urlRedirect}?sku=${item?.child?.sku}`
            }
            return urlRedirect;
        },
        closeModal() {
            if (this.cartItems[this.prongItemIndex] && this.cartItems[this.prongItemIndex].prong_fitting) {
                this.cartItems[this.prongItemIndex].prong_fitting.prong_type = '';
            }
            this.showModal = false;
        },
        callModal(e, index) {
            this.prongItemIndex = index;
            this.cartItems[index].prong_fitting.prong_type = e.target.value;
            this.modalType = 'prong';
            this.showModal = true;
            this.$nextTick(() => {
                if (this.lastFocusedElement) {
                    this.lastFocusedElement.focus();
                }
            });
        },
        async assignProngData(data) {
            if (this.cartItems[this.prongItemIndex] && this.cartItems[this.prongItemIndex].prong_fitting) {
                this.cartItems[this.prongItemIndex].prong_fitting.carat = data.carat;
                this.cartItems[this.prongItemIndex].prong_fitting.length = data.length;
                this.cartItems[this.prongItemIndex].prong_fitting.width = data.width;
                this.cartItems[this.prongItemIndex].prong_fitting.height = data.height;
            }
            this.showModal = false;
            await this.prongSubmit();
        },
        getLWRatio(item) {
            const imgUrl = this.fetchFirstProductImage(item);
            if (typeof imgUrl !== 'string' || !imgUrl.includes('sample')) return {};
            const shape = (item?.product?.diamond_shape || item?.product?.shape || item?.diamond_shape || item?.shape || '').toLowerCase();
            if (shape === 'heart') return {};
            const shapeKey = Object.keys(KEYS.DIAMOND_SHAPE_LW_RATIOS).find(key => key === shape);
            const measurements = item?.product?.diamond_ratio || item?.diamond_ratio;
            if (!measurements || measurements <= 0) return {};
            if (shapeKey) {
                const lwRatio = KEYS.DIAMOND_SHAPE_LW_RATIOS[shapeKey];
                if (!lwRatio) return {};
                const m = parseFloat(measurements);
                if (shape === 'radiant' || shape === 'pear' || shape === 'emerald' || shape === 'cushion') {
                    return { aspectRatio: `${lwRatio} / ${m}` };
                }
                return { aspectRatio: `${m} / ${lwRatio}` };
            }
            return {};
        },
        async removeItem(index, id, isWishList = null) {
            this.loading = true;
            this.removingIndex = index;
            let payload = this.cartItems[index];
            let result = await api.postRequest(this.$axios, 'checkout/cart/remove', { cart_item_id: id, cart_id: this.apiResponse?.data?.id });
            if (!result) {
                this.createSwalAlert('Internal Server Error', "error");
                this.loading = false;
                this.removingIndex = null;
                return;
            }
            if (result?.data?.success == false || !result?.data?.data?.success == false) {
                this.createSwalAlert(result?.data?.message ?? result?.data?.data?.message, "error");
                this.loading = false;
                this.removingIndex = null;
                return;
            }

            if (result?.data?.success || result?.data?.data?.success) {
                await this.$store.dispatch('getCart', (this.$store, this.$nuxt.context));
                await this.getInitialData();
                this.$store.commit('setGTMData', payload);
                await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: 'remove_from_cart' });
                const newTotal = this.apiResponse?.data?.original_decimal_grand_price;
                const formattedNewTotal = newTotal ? this.formattedPrice(newTotal) : '';
                this.$bus.emit(
                    'aria-announce',
                    `Item removed successfully.${formattedNewTotal ? ` Updated cart total amount is ${formattedNewTotal}.` : ''}`
                );
                if (isWishList) {
                    await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type: 'move_to_wishlist' });
                    this.$bus.emit(
                        'aria-announce',
                        `Item moved to wishlist.`
                    );
                }
                // this.cartItems.splice(index, 1);
                this.createSwalAlert(result?.data?.message ?? result?.data?.data?.message, "success");
                this.loading = false;
                this.removingIndex = null;
                this.orderSummaryKey = this.orderSummaryKey + 1;
                this.$store.dispatch('setCartUpdatedAt');
            }
        },
        async engraveTagAdd(val) {
            let index = this.currentProductIndex;
            await this.updateCartApi(index, { engraving: Object.assign(this.cartItems[index].engraving, val) });
            this.$nextTick(() => {
                const removeBtn = this.$refs[`removeEngraving-${index}`];
                if (removeBtn) {
                    // Vue ref array ho sakta hai agar v-for mein ho
                    const btn = Array.isArray(removeBtn) ? removeBtn[0] : removeBtn;
                    btn?.focus();
                }
            });
        },
        async clearEngraveTag(index) {
            await this.updateCartApi(index, { engraving: {} });
        },
        async setCartItemMutation() {
            this.$store.commit("setCartItems", this.cartItems);
        },
        centerStoneAlter(event, index) {
            let val = event.target.value;

            if (this.cartItems[index].wouldYouLikeToAddQues && val == "1") {
                this.startCreatingBundle(index);
                return;
            }
            if (this.cartItems[index].wouldYouLikeToAddQues && val == "0") {
                const radios = document.querySelectorAll(`[name="inline-radio-group-${index}"]`);
                radios.forEach(r => r.checked = false);
                this.cartItems[index].wouldYouLikeToAddQues = false;
                this.$bus.emit('aria-announce', 'Do you know the specifics of your center stone?');
                return;
            }
            if (!this.cartItems[index].wouldYouLikeToAddQues && val == "0") {
                this.cartItems[index].showCustomerCare = true;
                this.$nextTick(() => {
                    this.$bus.emit('aria-announce', 'Your order will be placed without prongs. If you would like to add them, please call customer service or click here.');
                });
            }
            if (!this.cartItems[index].wouldYouLikeToAddQues && val == "1") {
                this.cartItems[index].showProngFitting = true;
                this.$nextTick(() => {
                    this.$bus.emit('aria-announce', 'What is the shape of your center diamond?');
                });
            }

            // Focus the next label that becomes visible after state change
            this.$nextTick(() => {
                const nextLabel = document.querySelector(
                    `#cart-item-${index} .prong-focus-target`
                );
                if (nextLabel) nextLabel.focus();
            });
        },
        async addToCart(item) {
            let data = {
                product_id: item.id,
                cart_id: this.apiResponse?.data?.id
            }
            this.addingToCartId = item.id;
            this.loading = true;
            let response = await api.postRequest(this.$axios, 'checkout/cart/update', data);
            if (!response) {
                this.createSwalAlert('Internal Server Error', "error");
                this.loading = false;
                this.addingToCartId = null;
                return;
            }
            let result = response.data?.data;
            if (result) {
                if (!result?.success) {
                    this.createSwalAlert(result.message, "error")
                }
                if (result?.Error || result?.error) {
                    this.createSwalAlert(result.Error ?? result?.error, "error")
                }
                if (result?.success) {
                    await this.$store.commit("setSummaryData", { ...result.order_summary });
                    this.order_summary = result.order_summary;
                    this.createSwalAlert(result.message, "success");
                    await this.$store.dispatch('getCart', (this.$store, this.$nuxt.context));
                    await this.getInitialData();
                    this.loading = false;
                    this.scrollToTop();
                    this.callGTMEvent('upsell_cleaner');
                    this.orderSummaryKey = this.orderSummaryKey + 1;
                }
            }
            this.loading = false;
            this.addingToCartId = null;
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        },
        async addPlan(v) {
            await this.updateCartApi(v.index, { protection_plan: v.plan });
        },
        async updateCartApi(index, keyToUpdate, extraParam = null) {
            const data = this.cartItems[index];
            const requiredKeys = { cart_id: this.apiResponse?.data?.id, cart_item_id: data.id }
            let formData = (!extraParam) ? { ...requiredKeys, ...keyToUpdate } : { cart_id: this.apiResponse?.data?.id, ...extraParam };
            this.loading = true;
            let response = await api.updateCartItem(this.$axios, 'checkout/cart/update', formData, this.$cookies);
            let isError = false;
            if (!response) {
                this.createSwalAlert('Internal Server Error', "error");
                this.loading = false;
                return;
            }
            this.loading = false;
            if (response?.data.success == false) {
                isError = true;
                this.createSwalAlert(response?.data.message, "error");
            }

            let result = response?.data?.data;
            if (result) {
                if (!result?.success) {
                    isError = true;
                    this.createSwalAlert(result.message, "error")
                }
                if (result?.Error || result?.error) {
                    isError = true;
                    this.createSwalAlert(result.Error ?? result?.error, "error")
                }
                if (result?.success) {
                    isError = false;
                    let itemIndex = this.cartItems.findIndex((el) => el.id == result.cart_item_id);
                    if (itemIndex > -1) {
                        this.cartItems[itemIndex] = result.items;
                        await this.setCartItemMutation();
                        await this.getInitialData();
                    }
                    await this.$store.commit("setSummaryData", { ...result.order_summary });
                    await this.$store.commit("setCouponCode", result.coupon_code);
                    this.order_summary = result.order_summary;
                    this.coupon_code = this.apiResponse.data.coupon_code = result.coupon_code;
                    this.orderSummaryKey = this.orderSummaryKey + 1;
                    this.createSwalAlert(result.message, "success");
                    const total = this.$store.getters.getSummaryData?.grand_total;
                    const formattedTotal = total ? this.formattedPrice(total) : '';
                    this.$bus.emit(
                        "aria-announce",
                        `Cart updated successfully. ${this.cartItems.length} items in your bag. Order total: ${formattedTotal}.`
                    );
                    await this.$store.commit('setGTMData');
                    this.loading = false;
                    this.$store.dispatch('setCartUpdatedAt');
                }
                this.loading = false;
                // Coupon error and success
                if (keyToUpdate?.coupon_code) {
                    this.callGTMEvent(isError ? 'submit_invalid_coupon' : 'submit_valid_coupon');
                    if (keyToUpdate.coupon_code === '') {
                        this.$bus.emit(
                            'aria-announce',
                            'Promo code removed.'
                        );
                    } else if (!isError) {
                        this.$bus.emit(
                            'aria-announce',
                            `Promo code ${keyToUpdate.coupon_code} applied successfully.`
                        );
                    } else {
                        this.$bus.emit(
                            'aria-announce',
                            'Invalid promo code. Please try again.'
                        );
                    }
                }
                //Engraving Added
                if (keyToUpdate?.engraving) {
                    this.callGTMEvent('upsell_engraving');
                }
                //Protection Plan
                if (keyToUpdate?.protection_plan) {
                    this.callGTMEvent('upsell_careplan');
                }
            }
        },
        async ringSizeUpdate(e, index) {
            if (!e) return;
            let data = e;
            if (typeof data != 'object') {
                data = {
                    size: e, calPrice: 0
                }
            }
            this.cartItems[index].isRingSizeMissing = false;
            if (!this.cartItems.some((item) => item.isRingSizeMissing)) {
                this.ringSizeError = false;
            }
            await this.updateCartApi(index, { ring_size: data });
        },
        focusRingSizeDropdown(index) {
            const wrapper = document.getElementById(`ring-size-wrapper-${index}`);
            if (!wrapper) return;
            const focusable = wrapper.querySelector('button, [tabindex], select, input');
            if (focusable) {
                focusable.focus();
            } else {
                wrapper.setAttribute('tabindex', '-1');
                wrapper.focus();
            }
        },
        async formSubmit() {
            this.isRingSizeMissing = false;
            let firstMissingIndex = null;
            this.cartItems.forEach((item, index) => {
                if (!item.ring_size && item.is_ring_size) {
                    item.isRingSizeMissing = true;
                    if (firstMissingIndex === null) firstMissingIndex = index;
                    this.isRingSizeMissing = true;
                } else if (item.is_ring_size) {
                    item.isRingSizeMissing = false;
                }
            });

            if (this.isRingSizeMissing) {
                this.ringSizeError = true;
                this.$bus.emit('aria-announce', 'Please select your ring size to continue.');
                this.$nextTick(() => {
                    const alertEl = this.$refs.ringSizeCheckoutError;
                    if (alertEl) alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => this.focusRingSizeDropdown(firstMissingIndex), 250);
                });
                return;
            }

            this.ringSizeError = false;

            if (this.apiResponse?.data?.special_instruction) {
                this.callGTMEvent('submit_cart_comments');
                await this.updateCartApi(0, {}, { special_instruction: this.apiResponse?.data?.special_instruction });
            }
            this.callGTMEvent('begin_checkout');
            this.$router.push(`${STATIC_ROUTES.CART_CONTACT_WITH_VISITOR_CODE}${this.apiResponse?.data?.visitor_code}`);
        },
        async prongSubmit() {
            let index = this.prongItemIndex;
            let item = this.cartItems[index];
            if (!item.prong_fitting.carat) return;

            //Passing Vraiant Id along with prong-data
            let selectedItem = this.cartItems[index].product.variant_map[item?.selected_center_stone?.toLowerCase()];
            await this.updateCartApi(index, { prong_fitting: this.cartItems[index].prong_fitting, product_id: selectedItem, isProngUpdated: true });

            this.$nextTick(() => {
                const removeBtn = this.$refs[`removeProng-${index}`];
                if (removeBtn) {
                    const btn = Array.isArray(removeBtn) ? removeBtn[0] : removeBtn;
                    btn?.focus();
                }
            });
        },
        async removeProngFitting(index) {
            await this.updateCartApi(index, { prong_fitting: {} });
        },
        async getInitialData(isMount = 0) {
            // Cloning cartItem from store
            this.apiResponse = await this.$store.getters.getResponse;
            this.cartItems = await deepClone(this.$store.getters.getCartItems);

            if (this.cartItems && this.cartItems.length == 0) {
                this.loading = false;
                return;
            }

            if (this.apiResponse.error || this.apiResponse == null || this.apiResponse?.data == null) {
                this.createSwalAlert(this.apiResponse.error ?? 'Internal Server Error', "error");
                localStorage.clear();
                this.$store.commit('resetStore');
                return;
            }
            if (this.$cookies && this.apiResponse) {
                await this.$cookies.set('visitorCode', this.apiResponse?.data?.visitor_code, {
                    path: STATIC_ROUTES.HOME,
                    maxAge: 60 * 60 * 24 * 7, // 1 week
                });
            }

            this.order_summary = await this.$store.getters.getSummaryData;
            this.coupon_code = await this.$store.getters.getCouponCode;
            this.loading = this.apiResponse ? false : true;
            this.cartItems?.forEach((element, index) => {
                element.showPlansAtBottom = false;
                if (element.is_add_center_stone) {
                    element.wouldYouLikeToAddQues = true;
                    element.showCustomerCare = false;
                    element.showProngFitting = element.prong_fitting.prong_type ? true : false;
                }
                if(element.is_ring_size) {
                    element.isRingSizeMissing = isMount == 1 ? false : !element.ring_size && this.isRingSizeMissing;
                }
                if (element.type == "configurable") {
                    element.selectedMaterialVariation = element.additional.attributes?.material_variation.option_id;
                    element.selectedCenterStone = element.additional.attributes?.center_stone_shape?.option_id;
                }
            });
        },
        async getExtraItems() {
            let response = await api.getRequest(this.$axios, this.$cookies, 'cleaner-products');
            if (response && response?.data?.products) {
                this.extraItems = response?.data?.products ?? [];
            }
        },
        async applyCoupon() {
            if (!this.coupon_code) return;
            await this.updateCartApi(0, {}, { coupon_code: this.coupon_code });
            this.$nextTick(() => {
                const btn = this.$refs.removePromoBtn;
                if (btn) btn.focus();
            });
        },
        async removeCoupon() {
            await this.updateCartApi(0, {}, { coupon_code: '' });
            this.$nextTick(() => {
                const btn = this.$refs.applyPromoBtn;
                if (btn) btn.focus();
            });
        },
        couponExist() {
            return this.$store.getters.getCouponCode;
        },
        scrollToElement() {
            let $this = this;
            this.$nextTick(function () {
                let index = $this.$store.getters.getItemIndex;
                document.getElementById(`target-${index}`) ? document.getElementById(`target-${index}`).scrollIntoView({ behavior: 'smooth', block: 'center' }) : '';
            });
        },
        async assignData() {
            await Promise.all([
                this.getInitialData(1),
                this.getExtraItems()
            ]);
            if (this.$startLocation.includes('review') || this.$store.getters.getItemIndex) {
                this.scrollToElement();
            }
            this.callGTMEvent('cart_view');
        },
        handleCartUpdate(event) {
            if (event.key === 'cart_updated_at') {
                this.$router.go(0);
            }
        }
    },
    async mounted() {
        if ((!this.$route.query?.visitor_code || this.$route.query?.visitor_code?.includes('{{visitor_code}}')) && this.$cookies) {
            this.$router.replace(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${this.$cookies.get('visitorCode')}`);
        }

        await this.$store.dispatch('getCart', (this.$store, this.$nuxt.context));
        await this.assignData();

        const total = this.$store.getters.getSummaryData?.grand_total;
        const formattedTotal = total ? this.formattedPrice(total) : '';

        const visibleCount = this.cartItems?.filter(item => !item?.additional?.certificate)?.length || 0;
        this.$bus.emit('aria-announce', `Shopping cart loaded. ${visibleCount} item${visibleCount !== 1 ? 's' : ''} in your bag.${formattedTotal ? ` Order total: ${formattedTotal}.` : ''}`);
        window.addEventListener('storage', this.handleCartUpdate);
    },
    head() {
        return landingData.CART_META;
    },
    beforeUnmount() {
        window.removeEventListener('storage', this.handleCartUpdate);
    }
};
</script>