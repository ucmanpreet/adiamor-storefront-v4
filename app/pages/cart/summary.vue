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
                        v-if="!store.isLoggedIn">Sign in</NuxtLink>
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
                                                            <button type="button" :ref="(el) => setRef(`removeProng-${index}`, el)"
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
                                                                    :ref="(el) => setRef(`removeEngraving-${index}`, el)"
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
<script setup>
import { deepClone } from '~/utils/deepClone.js';
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
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import KEYS from "~/utils/constant.js";
import Button from "~/components/common/Button.vue";
import landingData from "~/static/js/pageMetaHeading.js";
import AdditionalData from "~/components/checkout/AdditionalData.vue";
import CartItemName from "~/components/checkout/CartItemName.vue";

const store = useMainStore();
const bundle = useBundleStore();
const api = useApi();
const route = useRoute();
const router = useRouter();
const nuxtApp = useNuxtApp();
const { $bus, $formatPrice } = nuxtApp;
const { createSwalAlert } = useAlert();

const loading = ref(true);
const removingIndex = ref(null);
const addingToCartId = ref(null);
const cartItems = ref([]);
const showModal = ref(false);
const currentProductIndex = ref("");
const currentProductFamily = ref('');
const paymentOpt = [{ img: "debit_or_credit_card.webp", name: "Debit or Credit Card" },
{ img: "paypal.webp", name: "Paypal" },
{ img: "financing_with_affirm.webp", name: "Financing with Affirm" },
{ img: "wire_transfer.webp", name: "Wire Transfer" },
{ img: "pay_by_phone.webp", name: "Pay by Phone" },
{ img: "splitpay.webp", name: "Split Pay" }];
const apiResponse = ref("");
const yesNoArr = [{ code: "Yes", value: 1, text: "Yes" }, { code: "no", value: 0, text: "No" }];
const extraItems = ref([]);
const coupon_code = ref("");
const order_summary = ref('');
const modalType = ref('engrave');
const prongItemIndex = ref(100);
const ringSizeError = ref(false);
const items = [
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
];
const product = ref(null);
const selectedVariant = ref(null);
const orderSummaryKey = ref(0);
const duplicateDiamondLinkText = 'choose a new diamond';
const isRingSizeMissing = ref(false);

// Template refs
const applyPromoBtn = ref(null);
const removePromoBtn = ref(null); // not rendered in the template (its markup is commented out), so it stays null
const ringSizeCheckoutError = ref(null);
// Per-item refs (`removeProng-<index>`, `removeEngraving-<index>`) set through function refs
const dynamicRefs = {};
function setRef(name, el) {
    if (el) dynamicRefs[name] = el;
    else delete dynamicRefs[name];
}
// Non-reactive: element focused before the engrave modal opened
let lastFocusedElement = null;

const phoneNumber = computed(() => {
    return store.phoneNumber;
});
const telPhoneNumber = computed(() => {
    return store.phoneNumber?.replace(/[^+\d]/g, '');
});
const engraveHeading = computed(() => {
    if (currentProductFamily.value.includes('necklace')) {
        return 'Engrave Your Necklace';
    }
    return 'Engrave Your Ring';
});
const duplicateDiamondMessageParts = computed(() => {
    const message = apiResponse.value?.data?.duplicate_diamond_message || '';

    const linkText = duplicateDiamondLinkText;

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
});

// API helpers: same contract as the old axios wrappers in api-client/rest-api (they never throw)
function handleUnauthorizedError() {
    createSwalAlert('Session expired. Please log in again.', 'error');
    window.location.href = STATIC_ROUTES.LOGIN;
}
async function getRequest(url) {
    const countryData = useCookie('countryData').value;
    url += url.includes('?') ? '&' : '?';
    url += `currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`;
    try {
        return await api.request('get', url);
    } catch (error) {
        if (error.status === 401) {
            handleUnauthorizedError();
        } else {
            createSwalAlert(error.message || 'Internal Server Error', 'error');
        }
        return { data: { message: error.message, success: false } };
    }
}
async function postRequest(url, body) {
    try {
        return await api.request('post', url, { body });
    } catch (error) {
        const status = error.status;
        if (status === 401 || status === 422 || status === 403) {
            const msg = error.data?.error || error.data?.message || 'Internal Server Error';
            const code = error.data?.code || null;
            return { data: { message: msg, success: false, status, code } };
        }
        return { data: { message: error.message ?? error, success: false } };
    }
}
async function updateCartItem(url, formData) {
    try {
        // Add locale and currency in apiUrl
        let country = useCookie('countryData').value || { currency: 'USD', locale: 'en-US' };
        formData.currency = country?.currency || 'USD';
        formData.locale = country?.locale || 'en-US';
        return await api.request('post', url, { body: formData });
    } catch (error) {
        if (error.status === 401) {
            return handleUnauthorizedError();
        }

        if (error.status === 404) {
            return { data: { message: error.message, success: false } };
        } else {
            createSwalAlert(error.message || 'Internal Server Error', 'error');
        }
        return { data: { message: error.message, success: false } };
    }
}

function getUrl(item) {
    const sku = item?.sku;
    const redirectParams = apiResponse.value?.data?.diamond_redirect_params;
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
        diamond_carat_weight: isNaN(carat) ? null : JSON.stringify(getSmartCaratRange(carat)),
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
}
function getSmartCaratRange(currentCarat) {
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
}
function cartIdInDuplicateDiamond(id) {
    return apiResponse.value?.data?.duplicate_cart_item_ids?.includes(id);
}
function announceRadioLabel(item, index) {
    const question = item.wouldYouLikeToAddQues
        ? 'Would you like to add center stone?'
        : 'Do you know the specifics of your center stone?';
    $bus.emit('aria-announce', question);
}
function triggerWishlist(event) {
    const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
    if (checkbox) checkbox.click();
    $bus.emit('aria-announce', 'Item moved to wishlist.');
}

function toggleProtectPlan(item, index) {
    const newVal = !item.showPlansAtBottom;
    cartItems.value[index].showPlansAtBottom = newVal;

    if (newVal) {
        $bus.emit('aria-announce', 'Protect plan expanded. Learn More about protect your purchase care plan.');

        setTimeout(() => {
            const link = document.querySelector(`#care-plan-section-${index} a`);
            if (link) link.focus();
        }, 100);
    } else {
        $bus.emit('aria-announce', 'Protect plan collapsed.');
    }
}
function getCartItemSku(item) {
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
}
function toggleProngUI(index) {
    const item = cartItems.value[index];
    item.showCustomerCare = false;
    item.showProngFitting = true;
    item.prong_fitting.prong_type = '';
}
async function callGTMEvent(type = null) {
    await store.setGTMData();
    await store.runGtmEvent({ action_type: type });
}
function openEngraveModal(item, index) {
    lastFocusedElement = document.activeElement;
    currentProductFamily.value = item?.product?.attribute_family_code || '';
    currentProductIndex.value = index;
    modalType.value = 'engrave';
    showModal.value = true;
}
function getParsedRingSize(item) {
    try {
        let parsedItem = JSON.parse(item?.ring_size);
        return parsedItem ?? item?.ring_size;
    } catch (error) {
        return item?.ring_size;
    }
}

function getModifiedRingOptions(item) {
    if (item && item.ring_options_with_prices?.length) {
        let ringOptions = item.ring_options_with_prices;
        const basePrice = item.price;
        let currentPrice = '';
        ringOptions.forEach((el) => {
            if (basePrice) {
                const minimumDelta = ringOptions[0].delta;
                currentPrice = Math.round(basePrice * (el.delta / minimumDelta) / 10) * 10;
                el.current_price = currentPrice;
                el.formatted_price = $formatPrice(parseInt(currentPrice));
            }
            const calPrice = currentPrice ? parseInt(basePrice) - currentPrice : el.current_price;
            el.calPrice = Math.abs(calPrice);
            el.sku = el.size;

            const formattedPrice = calPrice !== 0
                ? `${calPrice > 0 ? '-' : '+'}${$formatPrice(Math.abs(calPrice))}`
                : '';
            el.name = `${el.size}${formattedPrice ? ` (${formattedPrice})` : ''}`;
        })
        return ringOptions;
    }
    return item?.ring_options;
}
function isShowWishListButton(item) {
    return !item.product?.attribute_family_code.includes('default') && !item?.additional?.certificate;
}
function isShowRemoveButton(item) {
    return !item?.additional?.certificate;
}
function getWishListData(item) {
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
}
async function startCreatingBundle(index) {
    let el = cartItems.value[index];
    try {
        loading.value = true;
        let apiUrl = `get-single-product?url_key=${el?.product?.url_key}`;
        let response = await getRequest(apiUrl);
        let productData = response.data?.data;
        if (productData) {
            product.value = productData;
        }
        if (product.value?.is_add_bundle) {
            selectedVariant.value = product.value?.variants?.find((variant) => variant?.id == el?.additional?.selected_configurable_option);
            if (selectedVariant.value && selectedVariant.value?.sku) {
                product.value['selectedVariant'] = selectedVariant.value;
            }
        }
        await startBundle(el);
    } catch (error) {
        createSwalAlert('Unable to load bundle data', 'error');
    }
}
async function startBundle(el) {
    try {
        let eventType = getCategoryType(product.value?.attribute_family_code);
        if (eventType?.action && product.value && product.value?.is_add_bundle) {
            //Setting session data
            let bundleType = eventType?.key ?? 'ring';
            sessionStorage.setItem('bundleType', bundleType);
            await bundle.clearData({ type: 'configurable', category: eventType?.key ?? 'ring' });
            await bundle.clearData({ type: 'simple', category: eventType?.key ?? 'ring' });
            await bundle[eventType?.action](product.value);
            let redirectUrl = `/diamonds/search/${el?.selected_center_stone?.toLowerCase()}`;
            $bus.emit(
                'aria-announce',
                'Redirecting to diamond selection page.'
            );
            router.push(redirectUrl);
        }
    } catch (error) {
        createSwalAlert('Unable to start bundle', 'error');
    }
    loading.value = false;
}
function formattedPrice(price) {
    if (price === 0) return $formatPrice(0, true);
    if (price) return $formatPrice(parseFloat(price), true);
}
function getRedirectUrl(item) {
    if (item && extraItems.value?.length > 0) {
        const foundItem = extraItems.value.find(el => el?.id == item?.product?.id);
        if (foundItem) return route.fullPath;
    }
    if (item && !isShowRemoveButton(item)) {
        return route.fullPath;
    }
    let url = item && item.product ? item?.product?.url_key : '';
    if (url.includes('your-setting')) return `${correctUrl(url)}`;
    let urlRedirect = productRedirection(item.product ?? item) || STATIC_ROUTES.HOME;
    // for configurable
    if (item?.type == "configurable" && !urlRedirect.includes('?sku')) {
        urlRedirect = `${urlRedirect}?sku=${item?.child?.sku}`
    }
    return urlRedirect;
}
function closeModal() {
    if (cartItems.value[prongItemIndex.value] && cartItems.value[prongItemIndex.value].prong_fitting) {
        cartItems.value[prongItemIndex.value].prong_fitting.prong_type = '';
    }
    showModal.value = false;
}
function callModal(e, index) {
    prongItemIndex.value = index;
    cartItems.value[index].prong_fitting.prong_type = e.target.value;
    modalType.value = 'prong';
    showModal.value = true;
    nextTick(() => {
        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    });
}
async function assignProngData(data) {
    if (cartItems.value[prongItemIndex.value] && cartItems.value[prongItemIndex.value].prong_fitting) {
        cartItems.value[prongItemIndex.value].prong_fitting.carat = data.carat;
        cartItems.value[prongItemIndex.value].prong_fitting.length = data.length;
        cartItems.value[prongItemIndex.value].prong_fitting.width = data.width;
        cartItems.value[prongItemIndex.value].prong_fitting.height = data.height;
    }
    showModal.value = false;
    await prongSubmit();
}
function getLWRatio(item) {
    const imgUrl = fetchFirstProductImage(item);
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
}
async function removeItem(index, id, isWishList = null) {
    loading.value = true;
    removingIndex.value = index;
    let payload = cartItems.value[index];
    let result = await postRequest('checkout/cart/remove', { cart_item_id: id, cart_id: apiResponse.value?.data?.id });
    if (!result) {
        createSwalAlert('Internal Server Error', "error");
        loading.value = false;
        removingIndex.value = null;
        return;
    }
    if (result?.data?.success == false || !result?.data?.data?.success == false) {
        createSwalAlert(result?.data?.message ?? result?.data?.data?.message, "error");
        loading.value = false;
        removingIndex.value = null;
        return;
    }

    if (result?.data?.success || result?.data?.data?.success) {
        await store.getCart();
        await getInitialData();
        store.setGTMData(payload);
        await store.runGtmEvent({ action_type: 'remove_from_cart' });
        const newTotal = apiResponse.value?.data?.original_decimal_grand_price;
        const formattedNewTotal = newTotal ? formattedPrice(newTotal) : '';
        $bus.emit(
            'aria-announce',
            `Item removed successfully.${formattedNewTotal ? ` Updated cart total amount is ${formattedNewTotal}.` : ''}`
        );
        if (isWishList) {
            await store.runGtmEvent({ action_type: 'move_to_wishlist' });
            $bus.emit(
                'aria-announce',
                `Item moved to wishlist.`
            );
        }
        // cartItems.value.splice(index, 1);
        createSwalAlert(result?.data?.message ?? result?.data?.data?.message, "success");
        loading.value = false;
        removingIndex.value = null;
        orderSummaryKey.value = orderSummaryKey.value + 1;
        store.setCartUpdatedAt();
    }
}
async function engraveTagAdd(val) {
    let index = currentProductIndex.value;
    await updateCartApi(index, { engraving: Object.assign(cartItems.value[index].engraving, val) });
    nextTick(() => {
        const btn = dynamicRefs[`removeEngraving-${index}`];
        btn?.focus();
    });
}
async function clearEngraveTag(index) {
    await updateCartApi(index, { engraving: {} });
}
async function setCartItemMutation() {
    store.setCartItems(cartItems.value);
}
function centerStoneAlter(event, index) {
    let val = event.target.value;

    if (cartItems.value[index].wouldYouLikeToAddQues && val == "1") {
        startCreatingBundle(index);
        return;
    }
    if (cartItems.value[index].wouldYouLikeToAddQues && val == "0") {
        const radios = document.querySelectorAll(`[name="inline-radio-group-${index}"]`);
        radios.forEach(r => r.checked = false);
        cartItems.value[index].wouldYouLikeToAddQues = false;
        $bus.emit('aria-announce', 'Do you know the specifics of your center stone?');
        return;
    }
    if (!cartItems.value[index].wouldYouLikeToAddQues && val == "0") {
        cartItems.value[index].showCustomerCare = true;
        nextTick(() => {
            $bus.emit('aria-announce', 'Your order will be placed without prongs. If you would like to add them, please call customer service or click here.');
        });
    }
    if (!cartItems.value[index].wouldYouLikeToAddQues && val == "1") {
        cartItems.value[index].showProngFitting = true;
        nextTick(() => {
            $bus.emit('aria-announce', 'What is the shape of your center diamond?');
        });
    }

    // Focus the next label that becomes visible after state change
    nextTick(() => {
        const nextLabel = document.querySelector(
            `#cart-item-${index} .prong-focus-target`
        );
        if (nextLabel) nextLabel.focus();
    });
}
async function addToCart(item) {
    let data = {
        product_id: item.id,
        cart_id: apiResponse.value?.data?.id
    }
    addingToCartId.value = item.id;
    loading.value = true;
    let response = await postRequest('checkout/cart/update', data);
    if (!response) {
        createSwalAlert('Internal Server Error', "error");
        loading.value = false;
        addingToCartId.value = null;
        return;
    }
    let result = response.data?.data;
    if (result) {
        if (!result?.success) {
            createSwalAlert(result.message, "error")
        }
        if (result?.Error || result?.error) {
            createSwalAlert(result.Error ?? result?.error, "error")
        }
        if (result?.success) {
            await store.setSummaryData({ ...result.order_summary });
            order_summary.value = result.order_summary;
            createSwalAlert(result.message, "success");
            await store.getCart();
            await getInitialData();
            loading.value = false;
            scrollToTop();
            callGTMEvent('upsell_cleaner');
            orderSummaryKey.value = orderSummaryKey.value + 1;
        }
    }
    loading.value = false;
    addingToCartId.value = null;
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
async function addPlan(v) {
    await updateCartApi(v.index, { protection_plan: v.plan });
}
async function updateCartApi(index, keyToUpdate, extraParam = null) {
    const data = cartItems.value[index];
    const requiredKeys = { cart_id: apiResponse.value?.data?.id, cart_item_id: data.id }
    let formData = (!extraParam) ? { ...requiredKeys, ...keyToUpdate } : { cart_id: apiResponse.value?.data?.id, ...extraParam };
    loading.value = true;
    let response = await updateCartItem('checkout/cart/update', formData);
    let isError = false;
    if (!response) {
        createSwalAlert('Internal Server Error', "error");
        loading.value = false;
        return;
    }
    loading.value = false;
    if (response?.data.success == false) {
        isError = true;
        createSwalAlert(response?.data.message, "error");
    }

    let result = response?.data?.data;
    if (result) {
        if (!result?.success) {
            isError = true;
            createSwalAlert(result.message, "error")
        }
        if (result?.Error || result?.error) {
            isError = true;
            createSwalAlert(result.Error ?? result?.error, "error")
        }
        if (result?.success) {
            isError = false;
            let itemIndex = cartItems.value.findIndex((el) => el.id == result.cart_item_id);
            if (itemIndex > -1) {
                cartItems.value[itemIndex] = result.items;
                await setCartItemMutation();
                await getInitialData();
            }
            await store.setSummaryData({ ...result.order_summary });
            await store.setCouponCode(result.coupon_code);
            order_summary.value = result.order_summary;
            coupon_code.value = apiResponse.value.data.coupon_code = result.coupon_code;
            orderSummaryKey.value = orderSummaryKey.value + 1;
            createSwalAlert(result.message, "success");
            const total = store.getSummaryData?.grand_total;
            const formattedTotal = total ? formattedPrice(total) : '';
            $bus.emit(
                "aria-announce",
                `Cart updated successfully. ${cartItems.value.length} items in your bag. Order total: ${formattedTotal}.`
            );
            await store.setGTMData();
            loading.value = false;
            store.setCartUpdatedAt();
        }
        loading.value = false;
        // Coupon error and success
        if (keyToUpdate?.coupon_code) {
            callGTMEvent(isError ? 'submit_invalid_coupon' : 'submit_valid_coupon');
            if (keyToUpdate.coupon_code === '') {
                $bus.emit(
                    'aria-announce',
                    'Promo code removed.'
                );
            } else if (!isError) {
                $bus.emit(
                    'aria-announce',
                    `Promo code ${keyToUpdate.coupon_code} applied successfully.`
                );
            } else {
                $bus.emit(
                    'aria-announce',
                    'Invalid promo code. Please try again.'
                );
            }
        }
        //Engraving Added
        if (keyToUpdate?.engraving) {
            callGTMEvent('upsell_engraving');
        }
        //Protection Plan
        if (keyToUpdate?.protection_plan) {
            callGTMEvent('upsell_careplan');
        }
    }
}
async function ringSizeUpdate(e, index) {
    if (!e) return;
    let data = e;
    if (typeof data != 'object') {
        data = {
            size: e, calPrice: 0
        }
    }
    cartItems.value[index].isRingSizeMissing = false;
    if (!cartItems.value.some((item) => item.isRingSizeMissing)) {
        ringSizeError.value = false;
    }
    await updateCartApi(index, { ring_size: data });
}
function focusRingSizeDropdown(index) {
    const wrapper = document.getElementById(`ring-size-wrapper-${index}`);
    if (!wrapper) return;
    const focusable = wrapper.querySelector('button, [tabindex], select, input');
    if (focusable) {
        focusable.focus();
    } else {
        wrapper.setAttribute('tabindex', '-1');
        wrapper.focus();
    }
}
async function formSubmit() {
    isRingSizeMissing.value = false;
    let firstMissingIndex = null;
    cartItems.value.forEach((item, index) => {
        if (!item.ring_size && item.is_ring_size) {
            item.isRingSizeMissing = true;
            if (firstMissingIndex === null) firstMissingIndex = index;
            isRingSizeMissing.value = true;
        } else if (item.is_ring_size) {
            item.isRingSizeMissing = false;
        }
    });

    if (isRingSizeMissing.value) {
        ringSizeError.value = true;
        $bus.emit('aria-announce', 'Please select your ring size to continue.');
        nextTick(() => {
            const alertEl = ringSizeCheckoutError.value;
            if (alertEl) alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => focusRingSizeDropdown(firstMissingIndex), 250);
        });
        return;
    }

    ringSizeError.value = false;

    if (apiResponse.value?.data?.special_instruction) {
        callGTMEvent('submit_cart_comments');
        await updateCartApi(0, {}, { special_instruction: apiResponse.value?.data?.special_instruction });
    }
    callGTMEvent('begin_checkout');
    router.push(`${STATIC_ROUTES.CART_CONTACT_WITH_VISITOR_CODE}${apiResponse.value?.data?.visitor_code}`);
}
async function prongSubmit() {
    let index = prongItemIndex.value;
    let item = cartItems.value[index];
    if (!item.prong_fitting.carat) return;

    //Passing Vraiant Id along with prong-data
    let selectedItem = cartItems.value[index].product.variant_map[item?.selected_center_stone?.toLowerCase()];
    await updateCartApi(index, { prong_fitting: cartItems.value[index].prong_fitting, product_id: selectedItem, isProngUpdated: true });

    nextTick(() => {
        const btn = dynamicRefs[`removeProng-${index}`];
        btn?.focus();
    });
}
async function removeProngFitting(index) {
    await updateCartApi(index, { prong_fitting: {} });
}
async function getInitialData(isMount = 0) {
    // Cloning cartItem from store
    apiResponse.value = await store.getResponse;
    cartItems.value = await deepClone(store.getCartItems);

    if (cartItems.value && cartItems.value.length == 0) {
        loading.value = false;
        return;
    }

    if (apiResponse.value.error || apiResponse.value == null || apiResponse.value?.data == null) {
        createSwalAlert(apiResponse.value.error ?? 'Internal Server Error', "error");
        localStorage.clear();
        store.resetStore();
        return;
    }
    if (apiResponse.value) {
        const visitorCodeCookie = useCookie('visitorCode', {
            path: STATIC_ROUTES.HOME,
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        visitorCodeCookie.value = apiResponse.value?.data?.visitor_code;
    }

    order_summary.value = await store.getSummaryData;
    coupon_code.value = await store.getCouponCode;
    loading.value = apiResponse.value ? false : true;
    cartItems.value?.forEach((element, index) => {
        element.showPlansAtBottom = false;
        if (element.is_add_center_stone) {
            element.wouldYouLikeToAddQues = true;
            element.showCustomerCare = false;
            element.showProngFitting = element.prong_fitting.prong_type ? true : false;
        }
        if (element.is_ring_size) {
            element.isRingSizeMissing = isMount == 1 ? false : !element.ring_size && isRingSizeMissing.value;
        }
        if (element.type == "configurable") {
            element.selectedMaterialVariation = element.additional.attributes?.material_variation.option_id;
            element.selectedCenterStone = element.additional.attributes?.center_stone_shape?.option_id;
        }
    });
}
async function getExtraItems() {
    let response = await getRequest('cleaner-products');
    if (response && response?.data?.products) {
        extraItems.value = response?.data?.products ?? [];
    }
}
async function applyCoupon() {
    if (!coupon_code.value) return;
    await updateCartApi(0, {}, { coupon_code: coupon_code.value });
    nextTick(() => {
        const btn = removePromoBtn.value;
        if (btn) btn.focus();
    });
}
async function removeCoupon() {
    await updateCartApi(0, {}, { coupon_code: '' });
    nextTick(() => {
        const btn = applyPromoBtn.value;
        if (btn) btn.focus();
    });
}
function couponExist() {
    return store.getCouponCode;
}
function scrollToElement() {
    nextTick(function () {
        let index = store.getItemIndex;
        document.getElementById(`target-${index}`) ? document.getElementById(`target-${index}`).scrollIntoView({ behavior: 'smooth', block: 'center' }) : '';
    });
}
async function assignData() {
    await Promise.all([
        getInitialData(1),
        getExtraItems()
    ]);
    if (nuxtApp.$startLocation.includes('review') || store.getItemIndex) {
        scrollToElement();
    }
    callGTMEvent('cart_view');
}
function handleCartUpdate(event) {
    if (event.key === 'cart_updated_at') {
        router.go(0);
    }
}

onMounted(async () => {
    if (!route.query?.visitor_code || route.query?.visitor_code?.includes('{{visitor_code}}')) {
        router.replace(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${useCookie('visitorCode').value}`);
    }

    await store.getCart();
    await assignData();

    const total = store.getSummaryData?.grand_total;
    const formattedTotal = total ? formattedPrice(total) : '';

    const visibleCount = cartItems.value?.filter(item => !item?.additional?.certificate)?.length || 0;
    $bus.emit('aria-announce', `Shopping cart loaded. ${visibleCount} item${visibleCount !== 1 ? 's' : ''} in your bag.${formattedTotal ? ` Order total: ${formattedTotal}.` : ''}`);
    window.addEventListener('storage', handleCartUpdate);
});

onBeforeUnmount(() => {
    window.removeEventListener('storage', handleCartUpdate);
});

useHead(() => ({
    title: landingData.CART_META.title,
    meta: landingData.CART_META.meta.map(({ hid, ...m }) => ({ key: hid, ...m })),
}));
</script>
