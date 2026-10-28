<template>
  <div>
    <!-- Banner -->
    <div
      class="bg-center sm:bg-left bg-no-repeat bg-cover py-44"
      role="img"
      aria-label="Wishlist banner"
      :style="{
        'background-image': `url(https://cdn.adiamor.com/landing-pages/heros/love-sale25.jpg?updatedAt=1746137276913)`,
      }"
    ></div>

    <!-- wishlist -->
    <section :key="componentKey"
      class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16"
    >
      <header class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <h1
            class="font-normal text-lg md:text-xl lg:text-3xl flex items-center"
          >
            <Icon title="wishlist" name="heart-solid" class="w-6 h-6 mr-2" />
            Wishlist
          </h1>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click.prevent="clearState()"
              v-if="wishListData && wishListData.length > 0"
              class="underline text-sm ml-auto items-start whitespace-nowrap"
            >
              Clear Wishlist
            </button>
            <Button
              type="button"
              v-if="token"
              colorType="bordered-primary"
              @click="showModal = true"
              class="border border-primary text-primary !p-2 inline-flex items-center justify-center"
            >
              Share With A Friend
            </Button>
          </div>
        </div>
        <p class="mt-1 text-xs sm:text-sm max-w-md" v-if="!token">
          Want to save your wish list?
          <NuxtLink :to="STATIC_ROUTES.LOGIN" class="underline">Sign in</NuxtLink> or
          <NuxtLink :to="STATIC_ROUTES.AUTH_LOGIN_SIGNUP" class="underline"
            >Create an Account</NuxtLink
          >
          to view your saved favorites across all your devices.
        </p>
      </header>
      <TabComponent
        class="block"
        :tabs="tabs"
        :filterType="'wishlist'"
        @update:selectedTab="updateTab"
        :selectedTab="selectedTab?.code"
        v-if="!loading && wishListData.length"
        :key="tabCount"
      />
      <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-65 group-light"
        :class="loading ? '' : 'hidden'"
        role="alert"
        aria-busy="true"
      >
        <CustomLoader />
      </div>
      <ul
        role="list"
        class="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 xl:gap-8"
        :key="tabCount + 1"
      >
        <li v-for="(item, index) in getWishlistData" :key="index" class="relative h-full flex flex-col">
          <div
            class="aspect-square bg-gray-50 relative border border-gray-200"
          >
            <div class="absolute z-10 top-0 inset-x-0 flex items-center p-2">
              <!-- <span
                v-if="getTopLabel(item)"
                class="inline-block truncate sm:max-w-fit py-1 px-3 bg-white backdrop-blur-sm rounded-full text-[10px] font-medium ring-1 ring-gray-200 text-xs"
              >
                {{ getTopLabel(item) }}</span
              > -->
              <div class="flex gap-3 ml-auto">
                <button
                  type="button"
                  class="heart flex-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
                  :aria-label="item.isChecked === false ? `Add ${item.name} to wishlist` : `Remove ${item.name} from wishlist`"
                  :aria-pressed="(item.isChecked !== false).toString()"
                  @click="toggleHeart(item)"
                >
                  <Icon
                    name="heart-fill"
                    aria-hidden="true"
                    :class="item.isChecked !== false ? 'text-primary' : 'text-transparent'"
                    class="block w-5 h-5"
                  />
                </button>
              </div>
            </div>
            <NuxtLink class="relative flex items-center justify-center" :to="getRedirectUrl(item)">
              <p v-if="item.in_stock == false"
                role="status"
                aria-live="polite"
                class="absolute h-auto whitespace-nowrap border border-gray-200 bg-black/70 text-white backdrop-blur-sm rounded-full py-1.5 px-3 z-10">
                Out of Stock</p>
              <MediaImage
                :src="item"
                :alt="item?.name"
                className="aspect-square w-full bg-gray-200 object-cover group-hover:opacity-75"
              />
            </NuxtLink>
          </div>

          <!-- info -->
          <div class="flex-1 flex flex-col group mt-2.5 text-xs sm:text-sm text-center">
            <div class="flex flex-col">
              <div class="mt-auto">
                <NuxtLink :to="getRedirectUrl(item)" tabindex="-1">
                  <p class="font-normal text-sm sm:text-base">
                    {{ item?.name }}
                  </p>
                </NuxtLink>

                <p class="font-normal text-sm sm:text-base">
                  SKU: {{ skuToDisplay(item?.sku) ?? item?.sku }}
                </p>

                <p class="mt-1.5 text-gray-900 space-x-2">
                  <span
                    class="line-through text-gray-600 text-[0.8125rem]"
                    v-if="showStrikeThroughPrice(item)"
                    >{{ formattedPrice(showStrikeThroughPrice(item)) }}</span
                  >
                  <span
                    class="font-medium text-sm sm:text-base"
                    :class="{
                      'text-black': showStrikeThroughPrice(item),
                    }"
                    >{{ formattedPrice(fetchPriceData(item)) }}</span
                  >
                </p>
              </div>
            </div>
            <div class="mt-auto">
              <button
                @click="setPaylod(item)"
                class="mt-2.5 w-full capitalize flex items-center justify-center px-4 py-[0.563rem] text-xs sm:text-sm focus:outline-none focus:ring-1 border border-primary text-primary hover:bg-primary-lightest focus:ring-primary"
                type="button"
                :disabled="item.in_stock === false"
                :class="{'opacity-50 cursor-not-allowed': item.in_stock === false}"
                :aria-label="getWishListButtonAriaLabel(item)"
              >
                {{
                  getWishListButtonText(item)
                }}
              </button>
            </div>
          </div>
        </li>
      </ul>

      <!-- Empty State -->
      <div
        v-if="!loading && wishListData.length == 0"
        class="flex flex-col items-center justify-center py-24"
        role="status"
        aria-live="polite"
      >
        <NoDataFound :type="'wishlist'" />
      </div>

      <!-- Load More -->
      <div class="col-span-full pt-2" v-if="checkLoaderCondition">
        <Button
          @click="page++; $bus.emit('aria-announce','Loading more wishlist items')"
          type="button"
          colorType="bordered-primary-fill"
          class="max-w-xs w-full m-auto sm:max-w-screen-sm"
          aria-label="Load more wishlist items"
          >{{ listLoader ? `Loading......` : `Load More` }}</Button
        >
      </div>
    </section>

    <!-- contact links -->
    <div class="mt-8 lg:mt-16"
      role="region"
      aria-label="Contact Assistance"
    >
      <ContactLink />
    </div>

    <!-- Share a friend Modal -->
    <EmailAFriend v-if="showModal" @close="closeModal" />
  </div>
</template>
<script setup>
import Icon from "~/components/common/Icon.vue";
import Button from "~/components/common/Button.vue";
import TabComponent from "~/components/ui/TabComponent.vue";
import CustomLoader from "~/components/ui/CustomLoader.vue";
import NoDataFound from "~/components/common/NoDataFound.vue";
import ContactLink from "~/components/common/ContactLink.vue";
// Modals load when first opened
const EmailAFriend = defineAsyncComponent(() => import("~/components/modal/EmailAFriend.vue"));
import { correctUrl, showStrikeThroughPrice, fetchPriceData, skuToDisplay, productRedirection, getCategoryType, urlWithCategory, getGTMProductImage } from "~/utils/universalHelper.js";
import MediaImage from "~/components/common/MediaImage.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

const store = useMainStore();
const bundle = useBundleStore();
const api = useApi();
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig().public;
const { $bus, $formatPrice } = useNuxtApp();
const { createSwalAlert } = useAlert();

const wishListData = ref([]);
const token = ref(null);
const loading = ref(true);
const page = ref(1);
const perPage = ref(12);
const listLoader = ref(false);
const visibleItemsCount = ref(12);
const showModal = ref(false);
const selectedTab = ref(null);
const tabs = ref([{ name: "All", code: "all", text: "All" }]);
const tabCount = ref(0);
const componentKey = ref(0);
const total = ref(0);

const getWishlistData = computed(() => {
  if (
    selectedTab.value &&
    selectedTab.value?.code &&
    selectedTab.value?.code !== "all"
  ) {
    return wishListData.value.filter(
      (item) => item?.attribute_family_code === selectedTab.value?.code
    );
  }
  return wishListData.value?.slice(0, visibleItemsCount.value)?.reverse();
});
const checkLoaderCondition = computed(() => {
  if (!wishListData.value?.length) return false;
  if (token.value) return wishListData.value?.length < total.value;
  return getWishlistData.value?.length < wishListData.value?.length && getWishlistData.value?.length > visibleItemsCount.value;
});

onMounted(async () => {
  $bus.emit("aria-announce", "Wishlist page loaded");
  token.value = localStorage.getItem("token");
  if (!token.value) {
    let data = store.wishList;
    wishListData.value =
      data && data?.length ? data : [];
    loading.value = false;
    return;
  }
  // if(store.wishList) {wishListData.value = store.wishList;  loading.value = false; return;}
  await getWishlist();
});

watch(() => store.wishList, (val) => {
  if (val && !token.value) {
    wishListData.value = val
      ? val
      : [];
    loading.value = false;
  }
});
watch(page, async (val) => {
  visibleItemsCount.value = val * perPage.value;
  if (store.wishList && !token.value) {
    wishListData.value = store.wishList;
    return;
  }
  await getWishlist();
});
watch(() => wishListData.value.length, () => {
  const uniqueCodes = [
    ...new Set(wishListData.value.map((item) => item.attribute_family_code)),
  ];
  if (uniqueCodes.length === 0) {
    // If no codes, maybe reset tabs to only 'All'
    tabs.value = [{ name: "All", code: "all", text: "All" }];
    selectedTab.value = tabs.value[0]?.code;
    console.log("reset tabs to only 'All'", selectedTab.value);

    tabCount.value = 0;
    return;
  }

  // We'll prepare a new tabs array starting with "All"
  const newTabs = [{ name: "All", code: "all", text: "All" }];

  uniqueCodes.forEach((code) => {
    if (!code) return;

    let name = code
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Remove unwanted words and fix naming
    name = name
      .replace(/\bCertified\b/gi, "")
      .replace(/\bFamily\b/gi, "")
      .replace(/\Rings And\b/gi, "Wedding")
      .trim();

    // Fix double spaces
    name = name.replace(/\s{2,}/g, " ");

    if (!name.endsWith("s")) {
      name += "s";
    }

    // Count products with this code
    const totalProduct = wishListData.value.filter(
      (item) => item?.attribute_family_code === code
    );
    if (totalProduct.length > 0) {
      // Add tab only if there are products with this code
      newTabs.push({
        name: name,
        code: code,
        text: name,
      });
    }
  });

  // Update tabs once after processing all codes
  tabs.value = newTabs;

  // Reset tabCount based on tabs length excluding "All"
  tabCount.value = tabs.value.length - 1;

  // Ensure selectedTab is valid, fallback to "All"
  if (
    !selectedTab.value ||
    !tabs.value.find((tab) => tab.code === selectedTab.value.code)
  ) {
    selectedTab.value = tabs.value[0]?.code; // select "All" if current selectedTab is invalid
  }
});

// Helpers: same contract as the old axios `getRequest` / `postRequest` wrappers (they never throw)
async function getRequest(url, headers) {
  const countryData = useCookie('countryData').value;
  url += url.includes('?') ? '&' : '?';
  url += `currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`;
  try {
    return await api.request('get', url, { headers });
  } catch (error) {
    if (error.status === 401) {
      createSwalAlert('Session expired. Please log in again.', 'error');
      window.location.href = STATIC_ROUTES.LOGIN;
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

function getWishListButtonAriaLabel(item) {
  const buttonText = getWishListButtonText(item);
  const currentPrice = formattedPrice(fetchPriceData(item));
  const originalPrice = showStrikeThroughPrice(item);
  let label = `${buttonText} for ${item.name}`;
  if (currentPrice) label += `, Price: ${currentPrice}`;
  if (originalPrice) label += `, Original price: ${formattedPrice(originalPrice)}`;
  return label;
}
function getWishListButtonText(item) {
  if (item?.is_add_bundle && item?.attribute_family_code != 'certified_diamond') {
    const eventType = getCategoryType(item?.attribute_family_code);
    if (eventType?.action && item && item?.type === 'configurable') {
      const bundleItem = bundle[eventType.getter];
      if (bundleItem?.setting?.sku && bundleItem.setting.selectedVariant?.shape?.toLowerCase() == item?.selectedVariant?.shape?.toLowerCase()) {
        const selectedSku = bundleItem.setting.selectedVariant?.sku || bundleItem.setting.sku;
        return `Replace ${selectedSku}`;
      }
    }
    return `Select this setting`;
  }
  return "Add To Cart";
}
function updateTab(val) {
  selectedTab.value = val;
  page.value = 1;
  $bus.emit("aria-announce", `${val} tab selected`);
}
function closeModal() {
  showModal.value = false;
  $bus.emit('aria-announce', 'Share wishlist modal closed');
}
function getRedirectUrl(item) {
  let url = item ? item?.url_key : "";
  if (url?.includes("your-setting")) return `${correctUrl(url)}`;
  return url ? productRedirection(item) : STATIC_ROUTES.HOME;
}
function formattedPrice(price) {
  if (price === 0) return $formatPrice(0);
  if (price) return $formatPrice(parseFloat(price), false);
}
async function getWishlist() {
  try {
    const headers = {
      Authorization: `Bearer ${token.value}`,
    };
    loading.value = true;
    page.value != 1 ? (listLoader.value = true) : "";
    const response = await getRequest(
      `customer/wishlist?token=true&limit=${perPage.value}&page=${page.value}`,
      headers
    );
    page.value != 1 ? (listLoader.value = false) : "";
    loading.value = false;
    if (response.status !== 200 || !response.data) {
      createSwalAlert(
        response?.data?.message || "Internal Server Error",
        "error"
      );
      return;
    }
    if (response?.data?.data) {
      page.value === 1
        ? ((wishListData.value = []))
        : "";
      const newWishlistData =
        page.value === 1
          ? response.data.data
          : [...wishListData.value, ...response.data.data];
      let mappedData = newWishlistData.map((item) => {
        return item?.bundle_data && item?.bundle_data?.sku
          ? { ...item, ...item.bundle_data }
          : item;
      });
      wishListData.value = mappedData ?? [];
      total.value = response.data?.meta.total;
      store.setWishListData(response.data);
      store.setLoggedInWishListData(wishListData.value);
    }
    // createSwalAlert(response.data.message, 'success');
  } catch (error) {
    console.error(error);
    createSwalAlert("An unexpected error occurred", "error");
  } finally {
    loading.value = false;
  }
}
// getTopLabel(item) {
//   if (
//     item &&
//     Array.isArray(item.attributes) &&
//     item.attributes.length > 0
//   ) {
//     let el = item.attributes?.find((el) => el.code == "diamond_growth");
//     if (el) return el.value;
//   }
//   return item?.attributes ? item.attributes['diamond_growth_type'] : "";
// },
async function toggleHeart(item) {
  if (item) item.isChecked = item.isChecked === false;
  await setWishlistParams(item);
  await gtmProductEvent([item], null, item?.isChecked ? 'add_to_wishlist' : 'remove_from_wishlist');
}

async function setWishlistParams(item) {
  if (token.value) {
    await store.setWishListApi({ item });
    await getWishlist();
    return;
  }
  store.setWishList(item);
  componentKey.value = componentKey.value + 1;
}
async function setPaylod(item = null) {
  if (!item) return;
  loading.value = true;
  if (item.is_add_bundle && item?.attribute_family_code != 'certified_diamond') {
    await createBundleSteps(item);
    loading.value = false;
    return;
  }
  let payload = {
    product_id: item.id,
    quantity: 1,
  };
  if (item?.parent_id) {
    payload = {
      product_id: item?.parent_id,
      quantity: 1,
      selected_configurable_option: item?.selectedVariant?.id ?? item?.id,
    };
  }

  if (item.configurable_info && item.configurable_info?.parent_id) {
    payload = {
      product_id: item?.configurable_info?.parent_id ?? item?.id,
      quantity: 1,
      selected_configurable_option: item?.id,
    };
  }

  // payload['visitor_code'] = useCookie('visitorCode').value;
  if (item?.type == "bundle") {
    await createBundleItem(item);
    return;
  }
  if (item.in_stock == false) {
    createSwalAlert("Product is out of stock", "error");
    return;
  }
  await addToCart(payload, item);
}

async function clearState() {
  if (!token.value) {
    wishListData.value = [];
    store.setWishList();
    return;
  }
  if (token.value) {
    try {
      let currentToken = token.value;
      const headers = {
        Authorization: `Bearer ${currentToken}`,
      };
      const response = await api.request('delete', `customer/wishlist?token=true`, { headers });
      if (response && response.status === 200) {
        wishListData.value = [];
        store.setLoggedInWishListData();
        store.incrementHeartCount();
        return createSwalAlert(response?.data?.message, "success");
      } else {
        createSwalAlert("Internal Server Error", "error");
      }
    } catch (error) {
      createSwalAlert("An unexpected error occurred", "error");
    } finally {
      loading.value = false;
    }
  }
}
async function addToCart(payload, item) {
  try {
    //Visitor code
    payload["visitor_code"] = useCookie("visitorCode").value;

    // Send the API request
    let response = await postRequest(
      "checkout/cart/add-product",
      payload
    );
    // On successful response
    if (response && response.status === 200 && response.data) {
      let items = response.data?.data?.items;
      if (items?.length > 0) {
        let itemData = items.find(
          (el) => el.product_id == payload.product_id
        );
        itemData = (itemData && itemData?.attribute_family_code) ? itemData : (itemData?.product?.attribute_family_code) ? itemData?.product : (payload?.attribute_family_code) ? payload : item;
        // Clear bundle step data
        let codeToClear = getStateRef(itemData);
        if (itemData && codeToClear) {
          bundle.clearData({
            type: "simple",
            category: codeToClear,
          });
          bundle.clearData({
            type: "configurable",
            category: codeToClear,
          });
        }
        store.setProductAttribute({});
        await gtmProductEvent([item], null, 'add_to_cart');
        item["isChecked"] = false;
        if (localStorage.getItem('token')) {
          await store.setWishListApi({ item });
        }
        if (!localStorage.getItem('token')) store.setWishList(item);
        store.incrementHeartCount();
        createSwalAlert(response?.data?.message, "success");
        router.push(
          `${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${response.data?.data.visitor_code}`
        );
      }
    } else {
      createSwalAlert(response?.data?.message ?? "Internal Server Error", "error");
    }
  } catch (error) {
    console.log(error, ' error in add to cart');
    createSwalAlert("An unexpected error occurred", "error");
  } finally {
    loading.value = false;
  }
}
async function gtmProductEvent(filteredData = null, type = null, actionType = null) {
  const correctSku = (product) => product?.sku?.includes('-') ? product?.sku.split('-')[0] : product?.sku;
  await store.setProductGtmData(null);
  let filteredList = filteredData?.length ? filteredData : [];
  if (!filteredList?.length) return;
  if (type === null && (route.name === 'yourSettingPage') && Array.isArray(filteredList) && filteredList.length === 1) {
    const bundleItem = store?.getBundleItem;
    const settingSku = bundleItem?.setting?.sku;
    const diamondSku = bundleItem?.diamond?.sku;

    if (bundleItem && settingSku && diamondSku) {
      filteredList[0] = {
        ...(typeof filteredList[0] === 'object' && !Array.isArray(filteredList[0]) ? filteredList[0] : {}),
        ...(typeof bundleItem === 'object' && !Array.isArray(bundleItem) ? bundleItem : {}),
        sku: `${settingSku}-${diamondSku}`
      };
    }
  }
  const getGTMProductPath = (url = '') => {
    return config.adiamorHomeURL.replace(/^(https?:\/\/)?www\./, '$1').replace(/\/$/, '') + '/' + url?.replace(/^\/|\/$/g, '');
  }

  // NOTE: the original read `this.product` / `this.selectedVariant`, which were never defined on this page (always undefined).
  let productType = "jewelry";
  let item_list_name = type ? `${type}-items-${productType?.toLowerCase()}` : null;
  let gtmEventData = filteredList?.map((item, index) => {
    if (item) {
      let isDiamond = item?.attribute_family_code == 'certified_diamond';
      return {
        item_id: item?.type != 'simple' && !isDiamond ? correctSku(item) ?? item?.sku : item?.sku,
        item_name: item?.name ?? item?.title,
        index,
        item_variant: type && !isDiamond ? item?.sku : item?.type != 'simple' && !isDiamond ? item?.sku : null,
        price: item?.price,
        quantity: 1,
        item_url: getGTMProductPath(type && item?.href ? `${item?.href}${item?.sku && !isDiamond ? `?sku=${item?.sku}` : ''}` : `${item?.url_key}`),
        item_image_url: getGTMProductImage('front', false, item)
      };
    }
  });
  await store.setProductGtmData(gtmEventData);
  const additionalData = item_list_name ? { item_list_name } : {};
  await store.runGtmEvent({ action_type: actionType ? actionType : 'view_item_list', txnId: null, additionalData });
}
function getStateRef(item) {
  const code = item?.attribute_family_code?.toLowerCase();
  let completeText = "complete";
  return code?.includes(`${completeText}_ring`) || code?.includes(`_rings`)
    ? "ring"
    : code?.includes(`${completeText}_earring`) || code?.includes(`earring`)
    ? "earring"
    : code?.includes(`${completeText}_necklace`) || code?.includes(`necklace`)
    ? "necklace"
    : "";
}
async function createBundleItem(item) {
  try {
    let settingSku = item?.setting?.sku,
      diamondSku = item?.diamond?.sku;
    if (!settingSku && !diamondSku && item?.bundle_options) {
      const allProducts =
        item?.bundle_options?.options?.flatMap((o) => o.products) || [];
      let materialProducts = [];
      let nonMaterialProducts = [];
      allProducts?.forEach((p) => {
        (p.attributes?.some((a) => a.name?.toLowerCase() === "material")
          ? materialProducts
          : nonMaterialProducts
        ).push(p);
      });
      settingSku = materialProducts[0]?.sku;
      let firstDiamond = nonMaterialProducts[0];
      let secondDiamond = nonMaterialProducts?.length > 1 ? nonMaterialProducts[1] : null;

      diamondSku = `${firstDiamond?.sku}${secondDiamond?.sku ? `| ${secondDiamond?.sku}` : ''}`;
    }
    if (!diamondSku && item?.diamond_one && item?.diamond_two) {
      diamondSku = `${item?.diamond_one?.sku}|${item?.diamond_two?.sku}`;
    }
    let data = {
      selected_configurable_option: settingSku,
      selected_diamond_option: diamondSku,
    };
    loading.value = true;
    let response = await postRequest(
      "create-bundle-product",
      data
    );
    if (!response) {
      createSwalAlert("Internal Server Error", "error");
      loading.value = false;
      return;
    }
    let result = response.data?.data;
    if (result) {
      if (response?.status == 200) {
        let bundleProduct = result;
        let bundle_options = {},
          bundle_option_qty = {};
        if (
          bundleProduct &&
          bundleProduct.bundleOptions &&
          bundleProduct.bundleOptions.length > 0
        ) {
          bundleProduct.bundleOptions.forEach((el, index) => {
            if (!bundle_options[el.id]) {
              bundle_options[el.id] = {};
            }
            bundle_options[el.id][`index_0`] =
              bundleProduct?.productBundleOptions[index]?.product_id;
            bundle_option_qty[el.id] =
              bundleProduct?.productBundleOptions[index]?.qty ?? 1;
          });
        }
        let payload = {
          product_id: bundleProduct?.id,
          quantity: 1,
          bundle_options,
          bundle_option_qty,
          attribute_family_code: bundleProduct?.attribute_family?.code,
        };
        await addToCart(payload, item);
        loading.value = false;
      }
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    createSwalAlert("Internal Server Error", "error");
  }
}
async function createBundleSteps(item) {
  try {
    if (item?.type != 'configurable') return;
    let redirectUrl = await storeBundleLocal(item);
    if (redirectUrl) {
      item.isChecked = false;
      await setWishlistParams(item);
      router.push(redirectUrl);
    }
  } catch (error) {
    console.log(error);
  }
}
async function storeBundleLocal(item) {
  try {
    const redirectTo = item?.type == "simple" ? item?.redirect_search_link : item?.redirect_diamond_search_link;
    const url = redirectTo?.category ? urlWithCategory(redirectTo) : redirectTo ?? STATIC_ROUTES.HOME;
    const eventType = getCategoryType(item?.attribute_family_code, url);
    const queryOrRoute = (url) => {
      const routes = [
        { path: 'design-your-own-earrings', query: 'center_stone_shape=' },
        { path: 'design-your-own-necklaces', query: 'center_stone_shape=' },
        { path: 'diamond-pair', query: 'diamond_shape=' },
      ];
      const route = routes.find((r) => url?.includes(r.path));
      return route ? `?${route.query}` : STATIC_ROUTES.HOME;
    };
    if (eventType?.action && item) {
      let redirectUrl = "";
      const bundleType = eventType?.key ?? "ring";
      // Store the bundle type in session storage
      sessionStorage.setItem("bundleType", bundleType);
      await bundle[eventType.action](item);
      // Fallback redirect logic if diamond or setting is incomplete
      const shape = item?.selectedVariant?.shape?.toLowerCase() ?? item?.shape?.toLowerCase();
      redirectUrl = shape ? `${url}${queryOrRoute(url)}${shape}` : url;
      const bundleItem = bundle[eventType.getter];
      if (bundleItem?.diamond?.sku && bundleItem?.setting?.sku) {
        const selectedSku = bundleItem.setting.selectedVariant?.sku || bundleItem.setting.sku;
        const diamondSku = bundleItem.diamond.sku;
        const diamondShape = bundleItem.diamond?.shape?.toLowerCase();
        if (shape !== diamondShape) {
          await bundle.clearData({
            type: "simple",
            category: eventType?.key ?? "ring",
          });
        }
        redirectUrl = (shape == diamondShape) ? STATIC_ROUTES.YOUR_SETTING_WITH_QUERY.replace(':setting', selectedSku).replace(':diamond', diamondSku) : redirectUrl;
      }
      return redirectUrl;
    }
    return null;
  } catch (error) {
    console.log(error, 'while creating bundle locally');
  }
}
</script>
