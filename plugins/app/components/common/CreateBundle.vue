<template>
    <button
      type="button"
      name="bundle"
      @click="fetchSkuList()"
      :disabled="disabled"
      :aria-disabled="disabled"
      :aria-busy="isLoading"
      class="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      :class="[
        disabled ? 'cursor-not-allowed opacity-50 border border-primary' : '',
      ]"
    >
    <Icon
      name="shopping-bag"
      class="w-4 h-4 cursor-pointer"
    />
    <slot>Add to Bundle</slot>
  </button>
</template>

<script>
import Icon from "~/components/common/Icon.vue";
import { urlWithCategory, getCategoryType } from "~/utils/universalHelper";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
  name : 'CreateBundle',
  components: { Icon },
  props: {
    item: [Object, Number],
    selectedVariant: {
      type: [Object, Number, String],
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      isChecked: false,
      isLoading: false,
    };
  },
  methods: {
    async fetchSkuList() {
      try {
          let productData = null;
          this.isLoading = true;
          if(this.type == 'diamond-pair'){
            productData = await this.$store.dispatch("fetchProductData", { payload : { isPair : true, params : this.item?.sku?.replace('_', '&') }});
          }else {
            productData = await this.$store.dispatch("fetchProduct", { sku: this.item?.sku });
          }
        if (productData) {          
          await this.createBundleSteps(productData);
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error, "Unable to fetch product data");
      }
    },
    async createBundleSteps(item) {
      try {
        let redirectUrl = await this.storeBundleLocal(item);
        if (redirectUrl) {
          this.$router.push(redirectUrl);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async storeBundleLocal(item) {
			try {
				const redirectTo = item?.type == "simple" ? item?.redirect_search_link : item?.redirect_diamond_search_link;
				const url = redirectTo?.category ? urlWithCategory(redirectTo) : redirectTo ?? STATIC_ROUTES.HOME;
				const eventType = getCategoryType(item?.attribute_family_code, url);
        this.$store.commit('setGTMData');
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
					await this.$store.dispatch(`bundle/${eventType.action}`, item);
					// Fallback redirect logic if diamond or setting is incomplete
					const shape = item?.selectedVariant?.shape?.toLowerCase() ?? item?.shape?.toLowerCase();
					redirectUrl = shape ? `${url}${queryOrRoute(url)}${shape}` : url;
					const bundleItem = this.$store.getters[`bundle/${eventType.getter}`];
					if (bundleItem?.diamond?.sku && bundleItem?.setting?.sku) {
						const selectedSku = bundleItem.setting.selectedVariant?.sku || bundleItem.setting.sku;
						const diamondSku = bundleItem.diamond.sku;
						const diamondShape = bundleItem.diamond?.shape?.toLowerCase();
						if (shape !== diamondShape) {
							await this.$store.dispatch("bundle/clearData", {
								type: "simple",
								category: eventType?.key ?? "ring",
							});
						}					
						redirectUrl = (shape == diamondShape) ? STATIC_ROUTES.YOUR_SETTING_WITH_QUERY.replace(':setting', selectedSku).replace(':diamond', diamondSku) : redirectUrl;
				    }
          await this.$store.commit('setGTMData', item);                    
          this.$store.dispatch('runGtmEvent', { store: this.$store, action_type : 'add_to_bundle' });
          
					return redirectUrl;
				}
				return null;
			} catch (error) {
				console.log(error,'while creating bundle locally');	
			}
	  },
  },
};
</script>
