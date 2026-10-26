// Main Pinia store (state / getters / actions). Former Vuex mutations are plain actions with the same names,
// e.g. `store.setFilters(v)`; getters are read as `store.getFilters`, state as `store.phoneNumber`.
import { defineStore } from 'pinia';
import { markRaw as vueMarkRaw } from 'vue';
import landingData from '~/static/js/pageMetaHeading.js';
import { featuredUrls } from '~/utils/menu.js';
import KEYS from '~/utils/constant.js';
import { STATIC_ROUTES } from '~/utils/staticRoutes.js';
import { createSwalAlert } from '~/composables/useAlert.js';

// Vue 3 markRaw() throws on null/undefined; Vue 2.7 accepted them
const markRaw = (value) => (value !== null && typeof value === 'object' ? vueMarkRaw(value) : value);

const initialState = {
  response: {},
  paymentMethod: '',
  matchingProducts: [],
  finalItems: [],
  visitorCode: '',
  summaryData: '',
  coupon_code: '',
  shipping_method: '',
  ordered_items: '',
  checkBoxkey: '',
  paypalObj: '',
  itemIndex: '',
  gtmData: '',
  paymentName: {
    wire_payment: "Wire Transfer",
    split_payment: "Split Pay",
    affirm_payment: "Affirm",
    paypal_standard: "Paypal",
    bolt_payment: "Bolt"
  },
  product: '',
  bundleItem: [],
  productGtmData: '',
  wishListData : null,
  metaData: null,
  heartCount: 0,
  countryList: [],
  usStateList: [],
  metaPath: null,
  countryReady: false,
}

/** Appends the visitor's currency and locale to a URL. */
const withCurrency = (url) => {
  const countryData = useCookie('countryData').value;
  const currency = countryData?.currency || 'USD';
  const locale = countryData?.locale || 'en-US';
  return `${url}${url.includes('?') ? '&' : '?'}currency=${currency}&locale=${locale}`;
};

const extraState = {
      ...initialState,
      filters: {},
      diamondsFilters: null,
      userData: null,
      authenticated: null,
      address : {},
      compareList : [],
      comparePairList : [],
      wishList : [],
      productAttribute: {},
      filterCount: 0,
      cartItems: [],
      loggedInWishList: [],
      viewMode : 'grid',
      phoneNumber : '877-627-5094',
      reCaptchaVerified : false,
      attributeConfig: [],
      officeAddress: `510 W 6th St. Suite 1200<br>Los Angeles, CA 90014`
    }


export const useMainStore = defineStore('main', {
  state: () => ({ ...extraState, bundleUrl: undefined }),
  getters: {
      getCartItems(state) {
        return state.cartItems
      },
      getAddress(state) {
        return state.address
      },
      getPayment(state) {
        return state.paymentMethod
      },
      getMatchingProducts(state) {
        return state.matchingProducts
      },
      getResponse(state) {
        return state.response
      },
      getFinalItems(state) {
        return state.finalItems
      },
      getVisitorCode(state) {
        return state.visitorCode
      },
      getSummaryData(state) {
        return state.summaryData
      },
      getCouponCode(state) {
        return state.coupon_code
      },
      getShippingMethod(state) {
        return state.shipping_method
      },
      getOrderedData(state) {
        return state.ordered_items
      },
      getCheckBoxKey(state) {
        return state.checkBoxkey
      },
      getPaypalObj(state) {
        return state.paypalObj
      },
      getItemIndex(state) {
        return state.itemIndex
      },
      getGTMData(state) {
        return state.gtmData
      },
      getProductGtmData(state) {
        return state.productGtmData
      },
      getProduct(state) {
        return state.product
      },
      getBundleItem(state) {
        return state.bundleItem
      },
      getBundleUrl(state) {
        return state.bundleUrl
      },
      getProductAttribute(state) {
        return state.productAttribute
      },
      getFilters(state) {
        return state.filters
      },
      getFilterCount(state) {
        return state.filterCount
      },
      getCompareList(state) {
        return state.compareList
      },
      getPairCompareList(state) {
        return state.comparePairList
      },
      getWishList(state) {
        return state.loggedInWishList
      },
      getWishListData(state) {
        return state.wishListData
      },
      getDiamondsFilters(state) {
        return state.diamondsFilters
      },
      getUserData(state) {
        return state.userData
      },
      getViewMode(state) {
        return state.viewMode
      },
      isLoggedIn() {
        let token = (typeof window !== 'undefined' && window.localStorage) ? localStorage.getItem('token') : '';
        return (token) ? true : false;
      },
      getMetaData(state) {
        return state.metaData;
      },
      getReCaptchaVerified(state) {
        return state.reCaptchaVerified;
      },
      getAttributeConfig(state) {
        return state.attributeConfig;
      },
      getCountryList(state) {
        return state.countryList?.length > 0 ? state.countryList : null;
      },
      getUSStateList(state) {
        return state.usStateList?.length > 0 ? state.usStateList : null;
      }
  },
  actions: {
      incrementHeartCount() {
        this.heartCount++;
      },
      setCartItems(payload) {
        return this.cartItems = markRaw(payload);
      },
      setAddress(payload) {
        return this.address = markRaw(payload);
      },
      setResponse(payload) {
        return this.response = markRaw(payload);
      },
      setPaymentMethod(payload) {
        return this.paymentMethod = markRaw(payload);
      },
      setMatchingProducts(payload) {
        return this.matchingProducts = markRaw(payload);
      },
      setFinalItems(payload) {
        if (payload.currentIndex != undefined) {
          return this.finalItems[payload.currentIndex] = markRaw(payload.selectedItem);
        }
        return this.finalItems.push(markRaw(payload.selectedItem));
      },
      setVisitorCode(payload) {
        return this.visitorCode = markRaw(payload);
      },
      resetStore(payload) {
        return /* no-op, as in Vuex (reassigning the argument never reset anything) */ void initialState;
      },
      setSummaryData(payload) {
        return this.summaryData = markRaw(payload);
      },
      setCouponCode(payload) {
        return this.coupon_code = markRaw(payload);
      },
      setShippingMethod(payload) {
        return this.shipping_method = markRaw(payload);
      },
      setOrderedData(payload) {
        return this.ordered_items = markRaw(payload);
      },
      setCheckBoxKey(payload) {
        return this.checkBoxkey = markRaw(payload);
      },
      setPaypalObj(payload) {
        return this.paypalObj = markRaw(payload);
      },
      setItemIndex(payload) {
        return this.itemIndex = markRaw(payload);
      },
      setGTMData(payload = null) {
         if (payload?.isLiveAgentForm) {
          const { isLiveAgentForm, ...gtmPayload } = payload;

          this.gtmData = markRaw([gtmPayload]);
          return;
        }
        // Helper function to safely map items
        const getItemUrl = (el, selectedVariant) => {
          let baseUrl = el?.child?.product?.url_key ?? el?.product?.url_key ?? el?.url_key ?? "";
          let itemVaraiant = selectedVariant?.sku ?? el?.selectedVariant?.sku ?? el?.product?.variant_sku;
          baseUrl = itemVaraiant ? `${baseUrl}?sku=${itemVaraiant}` : baseUrl;
          if(el?.type == "bundle") baseUrl = el?.product?.url_key ?? baseUrl;
          if(el?.type == "configurable") baseUrl = el?.product?.url_key ?? baseUrl;
          return useRuntimeConfig().public.adiamorHomeURL.replace(/^(https?:\/\/)?www\./, '$1').replace(/\/$/, '') + '/' + baseUrl?.replace(/^\/|\/$/g, '');
        };

        const getItemImage = (el, selectedVariant) => {
          if (selectedVariant?.images?.length) {
            return selectedVariant.images[0]?.url ?? "";
          }
          return ( el?.child?.product?.images?.[0]?.path ?? el?.product?.images?.[0]?.path ?? el?.images?.[0]?.path ?? "");
        };

        const getDiscountData = (el) => {
          const discounted = el?.discounted_price ?? el?.base_discount_amount;
          const current = getRetailPrice(el);

          if (!discounted || !current || discounted >= current) {
            return { coupon: null, discount: 0 };
          }

          return {
            coupon: "on-sale",
            discount: current - discounted,
          };
        };
        const getRetailPrice = (el) => {
          return parseInt(
            el?.original_price?.raw?.amount ??
            el?.original_price ??
            el?.product?.price?.raw?.amount ??
            el?.product?.price ??
            el?.price?.raw?.amount ??
            el?.price ??
            0,
            10
          );
        };

        const mapItem = (el, index) => {
          const { coupon, discount } = getDiscountData(el);
          return {
            item_id: el?.sku ?? "",
            item_name: el?.name ?? "",
            index,
            item_variant: el?.selectedVariant?.sku ?? el?.product?.variant_sku ?? el?.product?.sku ?? el?.sku ?? "",
            price: getRetailPrice(el),
            quantity: el?.quantity ?? 1,
            affiliation: KEYS.AFFILIATION_NAME ?? "",
            item_list_name: el?.itemListName ?? null,
            item_brand: KEYS.BRAND_NAME ?? "",
            item_category: KEYS.ITEM_CATEGORY ?? "",
            item_category2: KEYS.ITEM_CATEGORY2 ?? "",
            item_category3: ["engagement_rings_family", "complete_ring"].includes(el?.product?.attribute_family_code) ? "Ring" : el?.product?.family ?? "",
            item_category4: "",
            item_category5: "",
            coupon,
            discount,
            item_url: getItemUrl(el, this.selectedVariant),
            item_image_url: getItemImage(el, this.selectedVariant),
          };
        };
        let mapped_data = [];

        if (payload) {
          // Support payload being single object or array
          const items = Array.isArray(payload) ? payload : [payload];
          mapped_data = items.map((el, index) => mapItem(el, index));
        } else if (Array.isArray(this.cartItems) && this.cartItems.length > 0) {
          mapped_data = this.cartItems.map((el, index) => mapItem(el, index));
        } else {
          console.warn("GTM mapping: No payload or cart items available.");
        }
        this.gtmData = markRaw(mapped_data);
      },
      setProductGtmData(payload = null) {
        return this.productGtmData = markRaw(payload);
      },
      setProduct(payload = null) {
        return this.product = markRaw(payload);
      },
      setBundleItem(payload = null) {
        return this.bundleItem = markRaw(payload);
      },
      setBundleUrl(payload = null) {
        return this.bundleUrl = markRaw(payload);
      },
      setProductAttribute(payload = null) {
        return this.productAttribute = markRaw(payload);
      },
      setFilters(payload = null) {
        if (payload && payload.key) {
          let previousFilters = this.filters || {};
          previousFilters[payload?.key] = payload?.value;
          return this.filters = markRaw(previousFilters);
        }
        this.filters = markRaw(payload);
      },
      setFilterCount(payload = null) {
        if(payload) {
          return this.filterCount = payload;
        }
        this.filterCount++;
      },
      setCompareList(payload = null) {
        if (payload && payload.sku) {
          let compareList = this.compareList || [];
          const index = compareList.findIndex(item => item.sku === payload.sku);
          if (index !== -1) {
            compareList.splice(index, 1);
            createSwalAlert('Item has been removed from your comparison list.', 'success');
          } else {
            compareList.push(payload);
            createSwalAlert(' Item has been added to your comparison list.', 'success');
          }
          this.compareList = markRaw(compareList);
        }
      },
      setPairCompareList(payload = null) {
        if (payload && payload.sku) {
          let comparePairList = this.comparePairList || [];
          const index = comparePairList.findIndex(item => item.sku === payload.sku);
          if (index !== -1) {
            comparePairList.splice(index, 1);
            createSwalAlert('Item has been removed from your comparison list.', 'success');
          } else {
            comparePairList.push(payload);
            createSwalAlert(' Item has been added to your comparison list.', 'success');
          }
          this.comparePairList = markRaw(comparePairList);
        }
      },
      setWishList(payload = null) {
        if (payload && payload.sku) {
            // if(typeof this.wishList != 'array') this.wishList = [];
            let wishList = this.wishList || [];
            const index = wishList && wishList.length ? wishList?.findIndex(item => item.sku === payload.sku) : -1;
            if (payload?.isChecked) {
              if (index === -1) {
                wishList.push(payload);
                createSwalAlert('Item Successfully Added To Wishlist.', 'success');
              }
            } else {
              if (index !== -1) {
                wishList.splice(index, 1);
                createSwalAlert('Wishlist item removed successfully.', 'success');
              }
            }
          this.wishList = markRaw(wishList);
          return;
        }
        this.wishList = markRaw(payload);
      },
      setFilterList(payload = null) {
        if (payload?.state) {
          let stateName = payload?.state;
          this[`${stateName}Filters`] = payload?.value;
        }
      },
      setUserData(payload = null) {
        return this.userData = markRaw(payload);
      },
      setAuthenticated(payload = null) {
        return this.authenticated = markRaw(payload);
      },
      setWishListData(payload = null) {
        return this.wishListData = markRaw(payload);
      },
      setViewMode(payload = null) {
        return this.viewMode = markRaw(payload);
      },
      setLoggedInWishListData(payload = null) {
        if (payload && payload.sku) {
            // if(typeof this.wishList != 'array') this.wishList = [];
            let wishList = this.loggedInWishList || [];
            const index = wishList && wishList.length ? wishList?.findIndex(item => item.sku === payload.sku) : -1;
            if (payload?.isChecked) {
              if (index === -1) {
                wishList.push(payload);
                createSwalAlert('Item has been added to your wishlist.', 'success');
              }
            } else {
              if (index !== -1) {
                wishList.splice(index, 1);
                createSwalAlert('Item has been removed from your wishlist.', 'success');
              }
            }
          this.loggedInWishList = markRaw(wishList);
          return;
        }
        this.loggedInWishList = markRaw(payload);
      },
      setPhoneNumber(payload = null) {
        return this.phoneNumber = markRaw(payload);
      },
      setMetaData(payload = null) {
        return this.metaData = markRaw(payload);
      },
      setMetaPath(payload = null) {
        return this.metaPath = markRaw(payload);
      },
      setReCaptchaVerified(payload = null) {
        return this.reCaptchaVerified = markRaw(payload);
      },
      setAttributeConfig(config) {
        this.attributeConfig = config;
      },
      setCountryList(payload = null) {
        this.countryList = markRaw(payload);
      },
      setUSStateList(payload = null) {
        this.usStateList = markRaw(payload);
      },
      setCountryReady(payload) {
        // !!payload coerces to boolean — defensive against accidental non-boolean calls
        this.countryReady = !!payload;
      },

      async nuxtClientInit() {
        let isSearchView = useRouter().currentRoute.value.name == 'searchPage';
        if (import.meta.client) {
          requestIdleCallback(() => {
            if(isSearchView) this.fetchAttributeConfig()
            this.fetchDiamondFilters()
          })
        }
      },
      async fetchDynamicMeta(route) {    
          try {
            // Empty previous stored meta data
            // this.setMetaData(null);

            let payload = {};
            
            const isFeaturedPath = featuredUrls[route.name]
            
            if (route.name === 'searchPage') {      
              payload = { type: route.path }
            } else if (isFeaturedPath) {
              payload = {
                type: isFeaturedPath.category,
                includes: 'featured',
                ...isFeaturedPath.params
              }
            } else {           
              if (!route.path) return;
              const path = route.path !== '/' && route.path.endsWith('/')
                ? route.path.slice(0, -1)
                : route.path
      
              const staticMeta = landingData[path]
              if (staticMeta) {
                this.setMetaData({
                  title: staticMeta.title.includes('| Adiamor')
                    ? staticMeta.title
                    : `${staticMeta.title} | Adiamor`,
                  description: staticMeta.description,
                  keyword: staticMeta.keyword
                })
                this.setMetaPath(route?.path);
                return
              }
              return
            }
    
            // 🔹 API-driven meta
            const res = await useApi().get(`page-information?${new URLSearchParams(payload)}`);
            
            if (res?.data) {                
              this.setMetaData(res.data);       
              this.setMetaPath(route?.path);
            }
          } catch (e) {
            console.error('Meta fetch failed', e);
          }
      },
      async fetchAttributeConfig() {
        try {
          if(this.attributeConfig?.length) return;
          const response = await useApi().get('/configuration/attributes');                
          this.setAttributeConfig(response);
        } catch (error) {
          console.error('Failed to fetch attribute configuration:', error);
        }
      },
      async fetchDiamondFilters() {
        // Avoid fetching again if already in state
        if (this.diamondsFilters) return;

        try {
          const response = await useApi().get(`get-filter-list?type=diamonds`);              
          this.setFilterList({
            state: 'diamonds',
            value: response?.data ?? null
          });
        } catch (err) {
          console.error('Failed to fetch diamond filters:', err);
        }
      },
      async runGtmEvent({ action_type, txnId = null, additionalData }) {
        try {
          let userProperties = useNuxtApp().$userProperties;
          let sessionProperties = {
              device_category: useNuxtApp().$isMobile ? 'mobile' : 'desktop'
          };
          let data = this.getGTMData;
          let summaryData = this.getSummaryData;
          let payment = this.paymentName[this.paymentMethod];
          let productData = this.getProductGtmData;          
          let gtmJSON = {
            event: '',
            ecommerce: {
              currency: (useRuntimeConfig().public.currency || "USD"),
              value: 0,
              // coupon : this.apiResponse.data?.coupon_code || "",
            }
          }
          window.dataLayer = window.dataLayer || [];
          window.__gtmEvents = window.__gtmEvents || {};

          const eventKey = JSON.stringify({
            event: gtmJSON?.event,
            items: (gtmJSON?.ecommerce?.items || []).map(i => i.item_id || i.sku || i.id)
          });

          const now = Date.now();

          if (
            window.__gtmEvents[eventKey] &&
            now - window.__gtmEvents[eventKey] < 1000 &&
            !additionalData?.skipDuplicates
          ) {
            console.log('Duplicate GTM event skipped');
            return;
          }

          window.__gtmEvents[eventKey] = now;

          if (dataLayer && action_type) {
            gtmJSON.event = action_type;
            if(userProperties) {   //  && action_type != 'view_item'
              //Check for blank visitor code
              if(!userProperties.external_id) {
                userProperties.external_id = useCookie('visitorCode').value;
              }
              gtmJSON.user_properties = userProperties;
            }
            gtmJSON.session_properties = sessionProperties;
            dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
            let intValue = summaryData ? parseInt(summaryData.original_grand_total ?? summaryData.grand_total, 10) : 0;
            switch (action_type) {
              case 'begin_checkout':
                gtmJSON.referral = "other";
                gtmJSON.pageType = "basket";
                gtmJSON.ecommerce.value = intValue;
                gtmJSON.ecommerce.items = data;
                break;
              case 'add_shipping_info':
                gtmJSON.ecommerce.shipping_tier = "Ground";
                gtmJSON.ecommerce.value = intValue;
                gtmJSON.ecommerce.items = data;
                break;
              case 'add_payment_info':
                gtmJSON.ecommerce.payment_type = payment || '';
                gtmJSON.ecommerce.value = intValue;
                gtmJSON.ecommerce.items = data;
                break;
              case 'purchase':
                gtmJSON.ecommerce.payment_type = payment || '';
                gtmJSON.ecommerce.transaction_id = txnId || null;
                gtmJSON.ecommerce.value = intValue;
                gtmJSON.ecommerce.items = data;
                break;
              case 'cart_view':
                gtmJSON.ecommerce.payment_type = payment || '';
                gtmJSON.ecommerce.transaction_id = txnId || null;
                gtmJSON.ecommerce.value = intValue;
                gtmJSON.ecommerce.items = data;
                break;
              case 'view_item':
                gtmJSON.ecommerce.value = parseInt(productData?.price, 10) || productData?.price || '';
                gtmJSON.ecommerce.items = Array.isArray(productData) ? productData : [productData] || [];
                break;
              case 'view_item_list':
                gtmJSON.pageType = "listings";
                gtmJSON.ecommerce.item_list_name = additionalData?.item_list_name || '';
                gtmJSON.ecommerce.items = productData || [];
                break;
              case 'filter_item_list':
                gtmJSON.pageType = "listings";
                gtmJSON.user_properties.filters = additionalData?.filters || '';
                break;
              case 'keyword_search':
                gtmJSON.pageType = "listings";
                gtmJSON.user_properties.filters = additionalData?.filters || '';
                break;
              case 'begin_session':
                gtmJSON.user_properties = {
                    external_id: userProperties?.external_id
                }
                break;
              case 'provided_cookie_consent':
                  gtmJSON.user_properties = {
                    ...((({ consent, ...rest }) => ({
                      ...rest,
                      consent: { cookie: consent.cookie }
                    }))(userProperties))
                  }
                break;
              case 'viewed_pickup_locations':
                break;
              case 'viewed_search_filters':
                break;
              case 'viewed_search_filter_datalist':
                break;
              case 'begin_call':
                break;
              case 'view_item_list_product_details':
                gtmJSON.ecommerce.items = Array.isArray(productData) && productData?.length > 0 ? productData : [];
                break;
              case 'submit_valid_coupon':
                break;
              case 'submit_invalid_coupon':
                break;
              case 'upsell_engraving':
                break;
              case 'upsell_careplan':
                break;
              case 'upsell_cleaner':
                break;
              case 'viewed_matching_item':
                break;
              case 'viewed_financing_option':
                break;
              case 'viewed_wire_transfer_option':
                break;
              case 'submit_cart_comments':
                break;
              case 'view_item_media':
                gtmJSON.ecommerce.items = productData || [];
                break;
              case 'view_item_social_media':
                gtmJSON.ecommerce.items = productData || [];
                break;
              case 'view_item_reviews':
                gtmJSON.ecommerce.items = productData || [];
                break;
              case 'add_to_wishlist':
                gtmJSON.ecommerce.items = data;
                break;
              case 'remove_from_wishlist':
                gtmJSON.ecommerce.items = data;
                break;
              case 'add_to_compare':
                gtmJSON.ecommerce.items = data;
                break;
              case 'remove_from_compare':
                gtmJSON.ecommerce.items = data;
                break;
              case 'add_to_bundle':
                gtmJSON.ecommerce.items = Array.isArray(productData) && productData?.length > 0 ? productData : data || [];
                break;
              case 'share_item':
                gtmJSON.ecommerce.items = productData || [];
                break;
              case 'add_to_cart':
                gtmJSON.ecommerce.items = Array.isArray(productData) ? productData : [productData] || [];
                break;
              case 'remove_from_cart':
                gtmJSON.ecommerce.items = data;
                break;
              case 'move_to_wishlist':
                gtmJSON.ecommerce.items = data;
                break;
              case 'submit_create_wishlist':
                break;
              case 'request_custom_search':
                gtmJSON.ecommerce.items = data;
                break;
              case 'request_price_match':
                gtmJSON.ecommerce.items = data;
                break;
              case 'request_custom_quote':
                gtmJSON.ecommerce.items = data;
                break;
              case 'request_contact':
                gtmJSON.ecommerce.items = data;
                break;
              case 'viewed_advanced_search_filter' :             
                break;

              default:
                console.log(`Sorry, Unable to perform GTM event.`);
            }           
            dataLayer.push(gtmJSON);
          }
        } catch (error) {
          console.log(error, 'while running gtm event');     
        }
      },
      async getCart() {
        const route = useRouter().currentRoute.value;
        try {
          //Empty Cart State
          this.setCartItems([]);
          // Get cart data
          const query_params = route.query?.visitor_code;
          // localStorage.clear();
          // this.resetStore();
          let visitor_code = query_params ? query_params : '';
          if(!visitor_code) {
            visitor_code = useCookie('visitorCode').value || '';
          }
          if (!visitor_code) {
            return false;
          }
          let apiUrl = `checkout/cart?visitor_code=${visitor_code}`;
          const countryData = useCookie('countryData').value;
          apiUrl += `&currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`;
          const response = await useApi().request('get', apiUrl);
          let data = response.data;
          if (data) {
            if (data.error || data.Error) {
              createSwalAlert(data.error ?? data.Error, 'error');
              return;
            }

            if (data.data) {
              let setData = data?.data;
              this.setResponse(data ?? null)
              this.setSummaryData(setData)
              this.setCouponCode(setData?.coupon_code)
              this.setCartItems(setData ? setData.items : [])
              this.setAddress(setData ? { order_shipping: { ...setData.shipping_address, address1: setData.shipping_address?.address1[0], address2: setData.shipping_address?.address2[0] }, order_billing: { ...setData.billing_address, address1: setData.billing_address?.address1[0], address2: setData.billing_address?.address2[0] } } : '')
              this.setCheckBoxKey(setData ? { is_email_subscribe: setData.is_email_subscribe, is_phone_number_subscribe: setData.is_phone_number_subscribe } : '');
              this.setPaymentMethod(setData ? setData?.payment?.method : '')
              this.setVisitorCode(setData ? setData.visitor_code : visitor_code)
              this.setShippingMethod(setData ? setData.shipping_address_type : '')
              setData ? this.setGTMData() : '';
              this.setProductAttribute({});
              if(!data?.data?.is_active) {
                this.setCartItems([]);
              }
            }
          }
        } catch (err) {
          console.log("Error occurred. " + err.message);
          console.error(err);
        }
      },
      async logout() {
        const router = useRouter();
        let isLoggedIn = localStorage.getItem('token');        
        if (!isLoggedIn) 
        {
            localStorage.removeItem('token');
            this.setUserData(null);
            this.setWishListData(null);
            this.setLoggedInWishListData(null);
            return router.push(STATIC_ROUTES.LOGIN);
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };
            const response = await useApi().request('get', 'customer/logout', config);
            if (response.status !== 200 || !response.data) {
                createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
                return;
            }

            localStorage.removeItem('token');
            this.setUserData(null);
            this.setWishListData(null);
            this.setLoggedInWishListData(null);
            createSwalAlert(response.data.message, 'success');
            router.push(STATIC_ROUTES.HOME);
        } catch (error) {
            console.error(error);
            createSwalAlert('An unexpected error occurred', 'error');
        }
      },
      async setWishListApi({ item }) {
        const router = useRouter();
        let isLoggedIn = localStorage.getItem('token');
        if (!isLoggedIn) return router.push(STATIC_ROUTES.LOGIN);
        if(!item) return;
        let proudctSku = item?.sku;
        if(item && item?.selectedVariant && Object.keys(item.selectedVariant) && Object.keys(item.selectedVariant)?.length){
          proudctSku = item?.selectedVariant?.sku;
        }
        if(!proudctSku) return;
        if(item?.type == 'bundle') {
          let sku = proudctSku;
          const splitIndex = sku.toLowerCase().indexOf('-d-');
          if (splitIndex !== -1) {
            const setting = sku.substring(0, splitIndex);
            let diamond = sku.substring(splitIndex + 1); // includes 'd-'
            // Replace nested -d- in the diamond part, if there's some text before each -d-
            diamond = diamond.replace(/([^-]+)-d-/gi, '$1|D-');
            proudctSku = `${diamond}, ${setting}`;
          }
        };
        try {
            let token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };
            let checkBoxChecked = item?.isChecked;
            let payload = {skus : proudctSku };
            let wishlistId = item?.wishlist_id;
            if (!checkBoxChecked && !wishlistId) {
              const foundItem = this.loggedInWishList?.find(el => el?.sku === item?.sku);
              wishlistId = foundItem?.wishlist_id || null;
            }
            if (item?.type === 'bundle') {
              payload.type = item.type;
            }

            const countryData = useCookie('countryData').value;
            payload.currency = countryData?.currency || 'USD';
            payload.locale = countryData?.locale || 'en-US';
            const baseUrl = 'customer/wishlist';
            const url = checkBoxChecked ? baseUrl : `${baseUrl}/${wishlistId}`;
            const response = checkBoxChecked  ? await useApi().request('post', url, { ...config, body: payload }) : await useApi().request('delete', url, { ...config });
            if (response.status !== 200 || !response.data) {
                createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
                return;
            }
            //Check for bundle item
            if(response.data && response.data?.data){
              let bundleData = response.data?.data?.bundle_data;
              if(bundleData){
                item = bundleData;
              }else{
                item = response.data?.data;
              }
              item['isChecked'] = checkBoxChecked;
              item['wishlist_id'] = response.data?.data?.wishlist_id;
              this.setLoggedInWishListData(item);
              this.incrementHeartCount();
              createSwalAlert(response.data.message, 'success');
            } else {
              this.setLoggedInWishListData(item);
              createSwalAlert(response.data.message, 'success');
            }
        } catch (error) {
            createSwalAlert('An unexpected error occurred', 'error');
        }
      },

      async fetchProduct({ sku }) {
          try {
            const url = `/store/products/${sku}`;
            const response = await useApi().get(withCurrency(url));

            return response?.data ?? null;
          } catch (error) {
            console.error('Error fetching product:', error);
          }
      },

      async fetchProductData({ payload }) {
          try {
            const params = encodeURIComponent(payload.params) || payload.params;
            const key = payload.isPair ? 'pair_key' : 'url_key';
            let url = `get-single-product?${key}=${params}`;
            if (payload.sku) {
                url += `&sku=${encodeURIComponent(payload.sku)}`;
            }

            const response = await useApi().get(withCurrency(url));

            return response?.data ?? null;
          } catch (error) {
            console.error('Error fetching product:', error);
          }
      },

      async fetchBundleProductData({ payload }) {
          try {
            const { params } = payload;
            const url = `get-bundle-product?setting=${params?.setting}&diamond=${params?.diamond}`;

            const response = await useApi().get(withCurrency(url));

            return response?.data ?? null;
          } catch (error) {
            console.error('Error fetching product:', error);
          }
      },

      async isProductAvailable({ q }) {
          try {
            const response = await useApi().get('/search/resolve', {
              query: { q }
            });
            return response?.found && response?.redirect_url ? response?.redirect_url : null;
          } catch (error) {
            console.error('Error fetching product:', error);
          }
      },
      setCartUpdatedAt() {
        localStorage.setItem('cart_updated_at', Date.now().toString());
      }
  },
});
