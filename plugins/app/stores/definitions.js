// Vuex definitions ported verbatim from the Nuxt 2 store (store/index.js).
// Only runtime-environment access changed (process.client -> import.meta.client, process.env.CURRENCY -> runtime config).
// They are executed by the Pinia store in ./main.js; `this` inside mutations/actions is the compat context.
import { markRaw as vueMarkRaw } from 'vue';

// Vue 2.7 markRaw() accepted null/undefined/primitives; Vue 3 throws on null/undefined
const markRaw = (value) => (value !== null && typeof value === 'object' ? vueMarkRaw(value) : value);
import mixin from '~/mixin/sweetAlert.js';
import landingData from '~/static/js/pageMetaHeading.js';
import { featuredUrls } from '~/utils/menu.js';
import KEYS from '~/utils/constant.js';
import { STATIC_ROUTES } from '~/utils/staticRoutes.js';

export const initialState = {
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

/**
 * Helper to append currency and locale params to a URL
 *
 * @param {String} url - The base API endpoint
 * @param {Object} cookies - The Nuxt cookie instance (this.$cookies)
 * @returns {String} - The full URL with query parameters
 */
const withCurrency = (url, cookies) => {
  if (!cookies) return url;

  const countryData = cookies.get('countryData');
  const currency = countryData?.currency || 'USD';
  const locale = countryData?.locale || 'en-US';

  // Determine if we need '?' or '&'
  const separator = url.includes('?') ? '&' : '?';

  return `${url}${separator}currency=${currency}&locale=${locale}`;
};


export const extraState = {
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

export const getters = {
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
        return state.wishList
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
      },
    }

export const mutations = {
      incrementHeartCount(state) {
        state.heartCount++;
      },
      setCartItems(state, payload) {
        return state.cartItems = markRaw(payload);
      },
      setAddress(state, payload) {
        return state.address = markRaw(payload);
      },
      setResponse(state, payload) {
        return state.response = markRaw(payload);
      },
      setPaymentMethod(state, payload) {
        return state.paymentMethod = markRaw(payload);
      },
      setMatchingProducts(state, payload) {
        return state.matchingProducts = markRaw(payload);
      },
      setFinalItems(state, payload) {
        if (payload.currentIndex != undefined) {
          return state.finalItems[payload.currentIndex] = markRaw(payload.selectedItem);
        }
        return state.finalItems.push(markRaw(payload.selectedItem));
      },
      setVisitorCode(state, payload) {
        return state.visitorCode = markRaw(payload);
      },
      resetStore(state, payload) {
        return state = { ...initialState };
      },
      setSummaryData(state, payload) {
        return state.summaryData = markRaw(payload);
      },
      setCouponCode(state, payload) {
        return state.coupon_code = markRaw(payload);
      },
      setShippingMethod(state, payload) {
        return state.shipping_method = markRaw(payload);
      },
      setOrderedData(state, payload) {
        return state.ordered_items = markRaw(payload);
      },
      setCheckBoxKey(state, payload) {
        return state.checkBoxkey = markRaw(payload);
      },
      setPaypalObj(state, payload) {
        return state.paypalObj = markRaw(payload);
      },
      setItemIndex(state, payload) {
        return state.itemIndex = markRaw(payload);
      },
      setGTMData(state, payload = null) {
         if (payload?.isLiveAgentForm) {
          const { isLiveAgentForm, ...gtmPayload } = payload;

          state.gtmData = markRaw([gtmPayload]);
          return;
        }
        // Helper function to safely map items
        const getItemUrl = (el, selectedVariant) => {
          let baseUrl = el?.child?.product?.url_key ?? el?.product?.url_key ?? el?.url_key ?? "";
          let itemVaraiant = selectedVariant?.sku ?? el?.selectedVariant?.sku ?? el?.product?.variant_sku;
          baseUrl = itemVaraiant ? `${baseUrl}?sku=${itemVaraiant}` : baseUrl;
          if(el?.type == "bundle") baseUrl = el?.product?.url_key ?? baseUrl;
          if(el?.type == "configurable") baseUrl = el?.product?.url_key ?? baseUrl;
          return this.$config.public.adiamorHomeURL.replace(/^(https?:\/\/)?www\./, '$1').replace(/\/$/, '') + '/' + baseUrl?.replace(/^\/|\/$/g, '');
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
        } else if (Array.isArray(state.cartItems) && state.cartItems.length > 0) {
          mapped_data = state.cartItems.map((el, index) => mapItem(el, index));
        } else {
          console.warn("GTM mapping: No payload or cart items available.");
        }
        state.gtmData = markRaw(mapped_data);
      },
      setProductGtmData(state, payload = null) {
        return state.productGtmData = markRaw(payload);
      },
      setProduct(state, payload = null) {
        return state.product = markRaw(payload);
      },
      setBundleItem(state, payload = null) {
        return state.bundleItem = markRaw(payload);
      },
      setBundleUrl(state, payload = null) {
        return state.bundleUrl = markRaw(payload);
      },
      setProductAttribute(state, payload = null) {
        return state.productAttribute = markRaw(payload);
      },
      setFilters(state, payload = null) {
        if (payload && payload.key) {
          let previousFilters = state.filters || {};
          previousFilters[payload?.key] = payload?.value;
          return state.filters = markRaw(previousFilters);
        }
        state.filters = markRaw(payload);
      },
      setFilterCount(state, payload = null) {
        if(payload) {
          return state.filterCount = payload;
        }
        state.filterCount++;
      },
      setCompareList(state, payload = null) {
        if (payload && payload.sku) {
          let compareList = state.compareList || [];
          const index = compareList.findIndex(item => item.sku === payload.sku);
          if (index !== -1) {
            compareList.splice(index, 1);
            mixin.methods.createSwalAlert('Item has been removed from your comparison list.', 'success');
          } else {
            compareList.push(payload);
            mixin.methods.createSwalAlert(' Item has been added to your comparison list.', 'success');
          }
          state.compareList = markRaw(compareList);
        }
      },
      setPairCompareList(state, payload = null) {
        if (payload && payload.sku) {
          let comparePairList = state.comparePairList || [];
          const index = comparePairList.findIndex(item => item.sku === payload.sku);
          if (index !== -1) {
            comparePairList.splice(index, 1);
            mixin.methods.createSwalAlert('Item has been removed from your comparison list.', 'success');
          } else {
            comparePairList.push(payload);
            mixin.methods.createSwalAlert(' Item has been added to your comparison list.', 'success');
          }
          state.comparePairList = markRaw(comparePairList);
        }
      },
      setWishList(state, payload = null) {
        if (payload && payload.sku) {
            // if(typeof state.wishList != 'array') state.wishList = [];
            let wishList = state.wishList || [];
            const index = wishList && wishList.length ? wishList?.findIndex(item => item.sku === payload.sku) : -1;
            if (payload?.isChecked) {
              if (index === -1) {
                wishList.push(payload);
                mixin.methods.createSwalAlert('Item Successfully Added To Wishlist.', 'success');
              }
            } else {
              if (index !== -1) {
                wishList.splice(index, 1);
                mixin.methods.createSwalAlert('Wishlist item removed successfully.', 'success');
              }
            }
          state.wishList = markRaw(wishList);
          return;
        }
        state.wishList = markRaw(payload);
      },
      setFilterList(state, payload = null) {
        if (payload?.state) {
          let stateName = payload?.state;
          state[`${stateName}Filters`] = payload?.value;
        }
      },
      setUserData(state, payload = null) {
        return state.userData = markRaw(payload);
      },
      setAuthenticated(state, payload = null) {
        return state.authenticated = markRaw(payload);
      },
      setWishListData(state, payload = null) {
        return state.wishListData = markRaw(payload);
      },
      setViewMode(state, payload = null) {
        return state.viewMode = markRaw(payload);
      },
      setLoggedInWishListData(state, payload = null) {
        if (payload && payload.sku) {
            // if(typeof state.wishList != 'array') state.wishList = [];
            let wishList = state.loggedInWishList || [];
            const index = wishList && wishList.length ? wishList?.findIndex(item => item.sku === payload.sku) : -1;
            if (payload?.isChecked) {
              if (index === -1) {
                wishList.push(payload);
                mixin.methods.createSwalAlert('Item has been added to your wishlist.', 'success');
              }
            } else {
              if (index !== -1) {
                wishList.splice(index, 1);
                mixin.methods.createSwalAlert('Item has been removed from your wishlist.', 'success');
              }
            }
          state.loggedInWishList = markRaw(wishList);
          return;
        }
        state.loggedInWishList = markRaw(payload);
      },
      setPhoneNumber(state, payload = null) {
        return state.phoneNumber = markRaw(payload);
      },
      setMetaData(state, payload = null) {
        return state.metaData = markRaw(payload);
      },
      setMetaPath(state, payload = null) {
        return state.metaPath = markRaw(payload);
      },
      setReCaptchaVerified(state, payload = null) {
        return state.reCaptchaVerified = markRaw(payload);
      },
      setAttributeConfig(state, config) {
        state.attributeConfig = config;
      },
      setCountryList(state, payload = null) {
        state.countryList = markRaw(payload);
      },
      setUSStateList(state, payload = null) {
        state.usStateList = markRaw(payload);
      },
      setCountryReady(state, payload) {
        // !!payload coerces to boolean — defensive against accidental non-boolean calls
        state.countryReady = !!payload;
      },
    }

export const actions = {
      async nuxtClientInit({ dispatch }, context) {
        let isSearchView = context?.route?.name == 'searchPage';
        if (import.meta.client) {
          requestIdleCallback(() => {
            if(isSearchView) dispatch('fetchAttributeConfig')
            dispatch('fetchDiamondFilters')
          })
        }
      },
      async fetchDynamicMeta({ commit }, route) {    
          try {
            // Empty previous stored meta data
            // commit('setMetaData', null);

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
                commit('setMetaData', {
                  title: staticMeta.title.includes('| Adiamor')
                    ? staticMeta.title
                    : `${staticMeta.title} | Adiamor`,
                  description: staticMeta.description,
                  keyword: staticMeta.keyword
                })
                commit('setMetaPath', route?.path);
                return
              }
              return
            }
    
            // 🔹 API-driven meta
            const res = await this.$axios.$get(`page-information?${new URLSearchParams(payload)}`);
            
            if (res?.data) {                
              commit('setMetaData', res.data);       
              commit('setMetaPath', route?.path);
            }
          } catch (e) {
            console.error('Meta fetch failed', e);
          }
      },
      async fetchAttributeConfig({ commit, state }) {
        try {
          if(state.attributeConfig?.length) return;
          const response = await this.$axios.$get('/configuration/attributes');                
          commit('setAttributeConfig', response);
        } catch (error) {
          console.error('Failed to fetch attribute configuration:', error);
        }
      },
      async fetchDiamondFilters({ commit, state }) {
        // Avoid fetching again if already in state
        if (state.diamondsFilters) return;

        try {
          const response = await this.$axios.$get(`get-filter-list?type=diamonds`);              
          commit('setFilterList', {
            state: 'diamonds',
            value: response?.data ?? null
          });
        } catch (err) {
          console.error('Failed to fetch diamond filters:', err);
        }
      },
      async runGtmEvent(context, { store, action_type, txnId = null, additionalData }) {
        try {
          let userProperties = this.$userProperties || store?.$userProperties;
          let sessionProperties = {
              device_category: this.$isMobile ? 'mobile' : 'desktop'
          };
          let data = await store.getters.getGTMData;
          let summaryData = await store.getters.getSummaryData;
          let payment = await store.state.paymentName[store.state.paymentMethod];
          let productData = await store.getters.getProductGtmData;          
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
                userProperties.external_id = this.$cookies.get('visitorCode');
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
      async getCart(store, context) {
        try {
          //Empty Cart State
          store.commit('setCartItems', []);
          // Get cart data
          const query_params = context.route.query?.visitor_code;
          // localStorage.clear();
          // store.commit('resetStore');
          let visitor_code = query_params ? query_params : '';
          if(!visitor_code) {
            visitor_code = this.$cookies ? await this.$cookies.get('visitorCode') : '';
          }
          if (!visitor_code) {
            return false;
          }
          let apiUrl = `checkout/cart?visitor_code=${visitor_code}`;
          if(context.$cookies) {
            let countryData = context.$cookies.get('countryData');
            apiUrl += `&currency=${countryData?.currency || 'USD'}&locale=${countryData?.locale || 'en-US'}`;
          }
          const response = await context.$axios.get(apiUrl);
          let data = response.data;
          if (data) {
            if (data.error || data.Error) {
              mixin.methods.createSwalAlert(data.error ?? data.Error, 'error');
              return;
            }

            if (data.data) {
              let setData = data?.data;
              store.commit('setResponse', data ?? null)
              store.commit('setSummaryData', setData)
              store.commit('setCouponCode', setData?.coupon_code)
              store.commit('setCartItems', setData ? setData.items : [])
              store.commit('setAddress', setData ? { order_shipping: { ...setData.shipping_address, address1: setData.shipping_address?.address1[0], address2: setData.shipping_address?.address2[0] }, order_billing: { ...setData.billing_address, address1: setData.billing_address?.address1[0], address2: setData.billing_address?.address2[0] } } : '')
              store.commit('setCheckBoxKey', setData ? { is_email_subscribe: setData.is_email_subscribe, is_phone_number_subscribe: setData.is_phone_number_subscribe } : '');
              store.commit('setPaymentMethod', setData ? setData?.payment?.method : '')
              store.commit('setVisitorCode', setData ? setData.visitor_code : visitor_code)
              store.commit('setShippingMethod', setData ? setData.shipping_address_type : '')
              setData ? store.commit('setGTMData') : '';
              store.commit('setProductAttribute', {});
              if(!data?.data?.is_active) {
                store.commit('setCartItems', []);
              }
            }
          }
        } catch (err) {
          console.log("Error occurred. " + err.message);
          console.error(err);
        }
      },
      async logout({ commit }, { context, router }) {
        let isLoggedIn = localStorage.getItem('token');        
        if (!isLoggedIn) 
        {
            localStorage.removeItem('token');
            commit('setUserData', null);
            commit('setWishListData', null);
            commit('setLoggedInWishListData', null);
            return router.push(STATIC_ROUTES.LOGIN);
        }

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };
            const response = await context.$axios.get('customer/logout', config);
            if (response.status !== 200 || !response.data) {
                mixin.methods.createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
                return;
            }

            localStorage.removeItem('token');
            commit('setUserData', null);
            commit('setWishListData', null);
            commit('setLoggedInWishListData', null);
            mixin.methods.createSwalAlert(response.data.message, 'success');
            router.push(STATIC_ROUTES.HOME);
        } catch (error) {
            console.error(error);
            mixin.methods.createSwalAlert('An unexpected error occurred', 'error');
        }
      },
      async setWishListApi({ commit }, { context, router, item , store }) {
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
              const foundItem = store.state.loggedInWishList?.find(el => el?.sku === item?.sku);
              wishlistId = foundItem?.wishlist_id || null;
            }
            if (item?.type === 'bundle') {
              payload.type = item.type;
            }

            if(context.$cookies) {
              let countryData = context.$cookies.get('countryData');
              payload.currency = countryData?.currency || 'USD';
              payload.locale = countryData?.locale || 'en-US';
            }
            const baseUrl = 'customer/wishlist';
            const url = checkBoxChecked ? baseUrl : `${baseUrl}/${wishlistId}`;
            const response = checkBoxChecked  ? await context.$axios.post(url, payload, config) : await context.$axios.delete(url, { ...config });
            if (response.status !== 200 || !response.data) {
                mixin.methods.createSwalAlert(response?.data?.message || 'Internal Server Error', 'error');
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
              commit('setLoggedInWishListData', item);
              commit('incrementHeartCount');
              mixin.methods.createSwalAlert(response.data.message, 'success');
            } else {
              commit('setLoggedInWishListData', item);
              mixin.methods.createSwalAlert(response.data.message, 'success');
            }
        } catch (error) {
            mixin.methods.createSwalAlert('An unexpected error occurred', 'error');
        }
      },

      async fetchProduct({ commit }, { sku }) {
          try {
            const url = `/store/products/${sku}`;
            const response = await this.$axios.$get(withCurrency(url, this.$cookies));

            return response?.data ?? null;
          } catch (error) {
            console.error('Error fetching product:', error);
          }
      },

      async fetchProductData({ commit }, { payload }) {
          try {
            const params = encodeURIComponent(payload.params) || payload.params;
            const key = payload.isPair ? 'pair_key' : 'url_key';
            let url = `get-single-product?${key}=${params}`;
            if (payload.sku) {
                url += `&sku=${encodeURIComponent(payload.sku)}`;
            }

            const response = await this.$axios.$get(withCurrency(url, this.$cookies));

            return response?.data ?? null;
          } catch (error) {
            console.error('Error fetching product:', error);
          }
      },

      async fetchBundleProductData({ commit }, { payload }) {
          try {
            const { params } = payload;
            const url = `get-bundle-product?setting=${params?.setting}&diamond=${params?.diamond}`;

            const response = await this.$axios.$get(withCurrency(url, this.$cookies));

            return response?.data ?? null;
          } catch (error) {
            console.error('Error fetching product:', error);
          }
      },

      async isProductAvailable({ commit }, { q }) {
          try {
            const response = await this.$axios.$get('/search/resolve', {
              params : { q }
            });
            return response?.found && response?.redirect_url ? response?.redirect_url : null;
          } catch (error) {
            console.error('Error fetching product:', error);
          }
      },
      setCartUpdatedAt({ commit }, payload) {
        localStorage.setItem('cart_updated_at', Date.now().toString());
      },
    }
