<template>
  <form v-if="product">
    <div class="mt-5 border-t border-gray-200">
      <template v-if="validProductVariants && validProductVariants.length">
        <!-- Shape & material Variations -->
        <div :class="[
            'relative grid grid-cols-1 mt-4 gap-4',
            { 'sm:grid-cols-2 lg:flex flex-wrap': !caratAndGrowthAvailable }
          ]">
          <template v-for="(superAttr, index1) in product.super_attributes" :key="index1">
<div :class="{'flex-1 min-w-[247px] lg:max-w-sm' : !radioButtonCodes?.includes(superAttr?.code)}"
              v-if="getValidSuperAttrVariants(superAttr)?.length">
            <template v-if="radioButtonCodes?.includes(superAttr?.code)">
              <CaratWeightSelector :attribute="superAttr" :value="attributesData[superAttr?.code]" :caratOptions="getValidSuperAttrVariants(superAttr)" @input="event => updateSelectedVariant(event, superAttr?.code)"/> 
            </template>
            <template v-else>
              <div>
                <DropDownProduct
                  :variants="getValidSuperAttrVariants(superAttr)"
                  :selectedVariant="selectedVariant" :attribute="superAttr"
                  @change="event => updateSelectedVariant(event, superAttr?.code)"
                  :productVariant="validProductVariants" 
                  @updateCount="dropDownCount++"/>
              </div>
            </template>
          </div>
</template>
          <!-- Carat Variation -->
          <div class="flex-1 space-y-1 col-span-full" v-if="product.configurable_variants && setCurrentProductPrice?.length">
            <Dropdown :variants="setCurrentProductPrice" :defaultName="`Variation`" :className="['truncate', dropDownCount == 1 ? 'sm:w-[180px]' : '']"
              :selectedSku="selectedVariant?.sku || product.sku" @option-selected="onVariantSelected" />
          </div>
          <!-- Ring Size -->
          <div class="flex-1 flex flex-col sm:min-w-[247px]" v-if="ringOptions && ringOptions.length">
            <Dropdown class="w-full" :defaultName="`Ring Size`" :variants="formattedRingOptions"
              :selectedSku="selectedRingSize" @option-selected="updateSelectedRingSize" @change="modifyPrice" />
          </div>
          <!-- Prong Style -->
          <div class="flex flex-col flex-1 col-span-full sm:min-w-[247px]" v-if="prongStyleOptions && prongStyleOptions.length">
            <Dropdown class="w-full"
            
              :defaultName="selectedProngStyle?.value ? `Prong Style: ${selectedProngStyle?.value}` : 'Prong Style'"
              :variants="modifiedProngs" :selectedSku="selectedProngStyle?.sku"
              @option-selected="(value) => setProngStyle(value)" />
          </div>
        </div>
      </template>
    </div>
    <ProductPrice :product="product" :selectedVariant="selectedVariant" :priceObject="priceObject" />
    <ProductButtons @clickSubmit="updateModalValues" :product="product" :selectedVariant="selectedVariant" />
  </form>
</template>
<script>
import api from '~/api-client/rest-api/index.js';
import DropDownProduct from '~/components/product/DropDownProduct.vue';
import Dropdown from '~/components/ui/Dropdown.vue';
import ProductPrice from '~/components/product/ProductPrice.vue';
import ProductButtons from '~/components/product/ProductButtons.vue';
import { productRedirection, getCategoryType } from "~/utils/universalHelper.js";
import CaratWeightSelector from "~/components/ui/CaratWeightSelector.vue";
export default {
  name : "ConfigurableProduct",
  components: {
    DropDownProduct,
    Dropdown,
    ProductPrice,
    ProductButtons,
    CaratWeightSelector
  },
  data() {
    return {
      selectedVariant: {},
      material_variation: '',
      center_stone_shape: '',
      selectedRingSize: '',
      selectedShape: '',
      ringOptions: [],
      priceObject: {},
      basePrice: '',
      configurableVariants: [],
      selectedProngStyle: null,
      dropDownCount: 0,
      shapeData: null,
      attributesData: {},
      radioButtonCodes: ['carat_variation', 'growth_variation']
    }
  },
  props: {
    product: Object,
  },
  computed: {
    validProductVariants() {
      let validProductVariants = this.product?.variants?.filter(item => item?.is_available);
      return validProductVariants?.sort((a, b) => {
                const priceA = a.price;
                const priceB = b.price;
                return priceA - priceB;
            });
    },
    modifiedProngs() {
      return this.selectedVariant?.prong_style_options?.map(item => {
        return {
          sku: item?.id, // Using the id as SKU
          name: item?.admin_name, // Label generation logic
        };
      });
    },

    getMaterialLabel() {
      return this.product?.type == 'configurable' && this.product.super_attributes.length ? this.product.super_attributes[0]?.options.find((item) => item.id == this.material_variation)?.label : "";
    },
    getCenterStoneLabel() {
      let el = this.product?.type == 'configurable' && this.product.super_attributes.length ? this.product.super_attributes[1]?.options.find((item) => item.id == this.center_stone_shape) : "";
      this.selectedShape = el?.admin_name;
      return el?.admin_name == 'unset' ? null : el?.label;
    },
    getFinalPrice: function () {
      if (this.priceObject && this.priceObject.current_price) return this.priceObject.current_price;
      return this.selectedVariant && this.selectedVariant.price ?
        this.selectedVariant.price :
        this.product.price;
    },

    getDiscountedPriceRing() {
      if (this.selectedVariant?.discounted_price && this.selectedVariant?.discounted_price < this.selectedVariant?.price) {
        return parseFloat(this.selectedVariant.discounted_price);
      }
      if (this.product?.discounted_price && this.product?.discounted_price < this.product?.price) {
        return parseFloat(this.product.discounted_price);
      }
      return null;
    },
    // Format the ring options to match what the Dropdown expects
    formattedRingOptions() {
      return this.ringOptions.map(item => {
        let data = this.getCalculatedData(item);
        return {
          sku: data?.sku ?? data, // Using the ring size as SKU
          name: item?.label, // Label generation logic
        };
      });
    },
    setCurrentProductPrice() {
      return [...this.configurableVariants]
        .sort((a, b) => a.price - b.price) // ascending
        .map(item => ({
          ...item,
          name: item.short_description || item.name,
        }));
    },
    prongStyleOptions() {
      return this.selectedVariant?.prong_style_options;
    },
    caratAndGrowthAvailable() {      
      return this.product.super_attributes?.find(item => this.radioButtonCodes.includes(item.code))?.code;
    }
  },
  watch: {
    async selectedVariant() {
      this.priceObject = {};
      this.selectedRingSize = '';
      if (this.selectedVariant && this.selectedVariant.price) {
        this.basePrice = this.selectedVariant.price;

        const metalLabel = this.getMaterialLabel;
        const shapeLabel = this.getCenterStoneLabel;
        const price = this.$formatPrice(parseFloat(this.selectedVariant.price), true);
        const parts = [metalLabel, shapeLabel, price].filter(Boolean);
        this.$bus.emit('aria-announce', `${parts.join(', ')} selected`);

        let indexObjRecentView = {
          id: this.selectedVariant && this.selectedVariant.id ? this.selectedVariant.id : this.product.id,
          sku: this.selectedVariant && this.selectedVariant.sku ? this.selectedVariant.sku : this.product.sku,
          family: this.product.attribute_family_code
        }
        const isEmpty = Object.values(indexObjRecentView).some(x => x == null || x == '' || x == undefined);
        if (isEmpty == false) {
          await this.$indexedDB.addProduct(indexObjRecentView);
        }
        this.$emit('update:selectedVariant', this.selectedVariant);
        this.$emit('update:priceObject', this.priceObject);
        if (this.selectedVariant?.sku) {
          const currentSku = this.$route.query?.sku;
          const newSku = this.selectedVariant.sku;
          
          if (currentSku !== newSku || !currentSku) {            
            this.$router.replace({
              path: this.$route.path,
              query: { ...this.$route.query, sku: newSku }
            });
          }
        }
        if (this.product?.configurable_variants) {
          this.getConfigurableProductList();
        }
      }
    },
    '$store.state.diamondsFilters': {
            handler(newValue, oldValue) {
                const val = newValue ?? oldValue;
                if (val && typeof val === 'object' && Object.keys(val).length) {
                const defaultShapeData = val['SHAPE'] ?? null;
                this.shapeData = defaultShapeData?.value ?? null;
                }
            },
            deep: true,
            immediate: true
        }
  },
  methods: {
    getAlignedData(section, code = null) {
      const menuItems = section?.items ?? section;
      if (!menuItems) return [];

      if (section?.code !== 'shape' && !code) return menuItems;

      if (Array.isArray(this.shapeData)) {
        const sortedMenuItems = this.shapeData
          .map(shape => menuItems.find(item => item.icon === shape.code || item?.admin_name === shape.code))
          .filter(Boolean);

        return sortedMenuItems.length ? sortedMenuItems : menuItems;
      }

      return menuItems;
    },
    updateSelectedVariant(item, type = null) {      
      if (!item?.id || !type) return;
      if(!this.prongStyleOptions?.length) {
        this.selectedProngStyle = null;
        this.attributesData.prong_style = null;
      }

      // Update selected attribute
      this.attributesData[type] = item?.id;      

      // Keep derived states (if still needed elsewhere)
      this.material_variation = this.attributesData?.material_variation ?? this.material_variation;
      this.center_stone_shape = this.attributesData?.center_stone_shape ?? this.center_stone_shape;

      // Find matching variant dynamically
      this.selectedVariant = this.validProductVariants.find(variant => {
        return Object.entries(this.attributesData).every(([key, value]) => {          
          // Skip null/undefined selections
          if (value === null || value === undefined) return true;

          return variant?.[key] == value;
        });
      }) || null;

      this.$emit('hitGtmEvent');
    },
    setProngStyle(value) {
      let productSku = this.product?.sku;
      if (value?.name) {
        this.selectedProngStyle = value;
        this.$store.commit('setProductAttribute',{ [productSku]: { prong_style: this.selectedProngStyle?.name }});
      } else {
        this.selectedProngStyle = null;
        this.$store.commit('setProductAttribute',{ [productSku]: { prong_style: null }});
      }
    },

    async getConfigurableProductList() {
      try {
        let url = `/list/carat-variation?product_sku=${this.selectedVariant.sku}&parent_sku=${this.product.sku}`;
        const response = await api.getRequest(this.$axios, this.$cookies, url);
        if (!response) {
          console.log('Internal Server Error', "error");
          return;
        }
        if (response && response.data && response.data.success) {
          this.configurableVariants = response.data.data ?? [];
        }
      } catch (error) {
        console.log('Get Config Variants Product Error' + error);
      }
    },
    checkPresentData(code = null) {
      if (code) {
        return this.product && this.product.super_attributes && this.product.super_attributes.length && this.product.super_attributes.find((el) => el.code == code);
      }
    },
    modifyPrice() {
      let productSku = this.product?.sku;
      this.$store.commit('setProductAttribute', { [productSku]: { ring_size: this.selectedRingSize != 'Not Sure' && this.selectedRingSize != '' ? this.selectedRingSize : null } });
      if (!this.selectedRingSize || !this.selectedRingSize.size) return;
      this.priceObject = this.selectedRingSize;
      this.$emit('update:priceObject', this.priceObject);
    },

    updateSelectedRingSize(option) {
      if (option.calPrice) {
        this.selectedRingSize = option;
      }
      this.selectedRingSize = option.sku;
    },

    getCalculatedData(item) {
      if (!item || !item.size) return item;
      const basePrice = this.getFinalPrice;
      let currentPrice = '';
      if (this.basePrice) {
        const minimumDelta = this.ringOptions[0].delta;
        currentPrice = Math.round(this.basePrice * (item.delta / minimumDelta) / 10) * 10;
        item.current_price = currentPrice;
        item.formatted_price = this.$formatPrice(parseInt(currentPrice));
      }
      const calPrice = currentPrice ? parseInt(basePrice) - currentPrice : item.current_price;
      item.discounted_price = this.getDiscountedPriceRing ? this.getDiscountedPriceRing - (currentPrice ? parseInt(this.basePrice) - currentPrice : item.current_price) : null;
      item.calPrice = currentPrice - this.basePrice;

      const formattedPrice = calPrice !== 0
        ? `${calPrice > 0 ? '-' : '+'}${this.$formatPrice(Math.abs(calPrice))}`
        : '';
      item.label = `${item.size}${formattedPrice ? ` (${formattedPrice})` : ''}`;
      return item;
    },
    pushRoute(slug = null) {
      try {
        this.$router.push({ path: slug });
      } catch (err) {
        console.error('Error during pushRoute:', err);
      }
    },
    async addToCart() {
      let item = this.product;
      let data = {
        product_id: item.id,
        selected_configurable_option: this.selectedVariant.id,
        quantity: 1,
        attributes: {
          ring_size: this.selectedRingSize,
          prong_style: this.selectedProngStyle?.name
        }
      }
      data[`super_attribute[${this.selectedVariant.material_variation}]`] = this.selectedVariant.center_stone_shape;
      this.$emit('addToCart', data);
    },

    updateModalValues() {
      if (this.product && this.product?.button_setting && this.product?.button_setting?.is_modal_open == false) {
        if (this.product.button_setting.is_add_to_cart) {
          let url = this.product.button_setting.is_add_to_cart.url;
          if (this.product.button_setting.is_add_to_cart?.text?.toLowerCase() === 'select this setting') {
            this.$emit('clicked', {
              buttonModalBool: false, selectedVariant: this.selectedVariant
            });
            this.$emit('storeCookie', url);
            return;
          }
        }
        this.addToCart();
        return;
      }
      this.$emit('clicked', {
        buttonModalBool: this.product?.button_setting && this.product?.button_setting?.is_modal_open ? this.product?.button_setting?.is_modal_open : true, selectedVariant: this.selectedVariant
      });
    },
    onVariantSelected(variant) {
      let url = productRedirection(variant);
      this.pushRoute(url);
    },
    getSelectedVariant(metal, shape){
      let variantData = this.validProductVariants?.find(el => el?.material_variation == metal && el?.shape?.toLowerCase() === shape?.toLowerCase());
      if(!variantData) return this.validProductVariants?.find(el => el?.material_variation == metal);
      return variantData;
    },
  async assignData() {
    if (!this.product) return;

    // Assign ring options
    const { ring_options_with_prices, ring_options, ringsize_with_price, super_attributes, attribute_family_code, is_add_bundle } = this.product;
    this.ringOptions = ringsize_with_price && ring_options_with_prices?.length
      ? ring_options_with_prices
      : ring_options;

    let firstSelectedVariant = null;
    let bundleItem = null;
    let hasDiamond = false;

    const sessionBundleType = sessionStorage.getItem('bundleType');
    const eventType = getCategoryType(sessionBundleType ?? attribute_family_code);

    // Extract first valid material (metal) and shape
    const materialAttr = super_attributes?.find(el => el?.code === 'material_variation');
    const validMetal = this.getValidSuperAttrVariants(materialAttr)?.[0];
    this.material_variation = validMetal?.id;

    const shapeAttr = super_attributes?.find(el => el?.code === 'center_stone_shape');
    const validShape = this.getValidSuperAttrVariants(shapeAttr)?.[0];

    // Bundle-related logic
    if (eventType?.action && is_add_bundle) {
      bundleItem = this.$store.getters[`bundle/${eventType.getter}`];
      hasDiamond = !!bundleItem?.diamond?.sku?.trim();
    }

    if (this.validProductVariants?.length) {
      const { sku } = this.$route.query || {};
      const fromSearch = sessionStorage.getItem('fromSearch');

      // Case 1: SKU provided in route
      if (sku) {
        firstSelectedVariant = this.validProductVariants.find(item => item.sku?.toLowerCase() === sku.toLowerCase());

      // Case 2: DIY bundle with diamond
      } else if (hasDiamond) {
        const diamondShape = bundleItem?.diamond?.shape?.toLowerCase();
        const availableShapes = this.validProductVariants.map(v => v?.shape?.toLowerCase());
        const shapeMatch = availableShapes.includes(diamondShape);
        const unsetExists = availableShapes.includes('unset');

        if (shapeMatch) {
          firstSelectedVariant = this.getSelectedVariant(validMetal?.id, diamondShape);
        } else if (unsetExists && !fromSearch) {
          firstSelectedVariant = this.getSelectedVariant(validMetal?.id, 'unset');
        } else {
          firstSelectedVariant = this.getSelectedVariant(validMetal?.id, validShape?.admin_name ?? 'unset');
        }

      // Case 3: Default variant
      } else {
        firstSelectedVariant = this.getSelectedVariant(validMetal?.id, validShape?.admin_name ?? 'unset');
      }
    }

    // Update selection
    this.selectedVariant = firstSelectedVariant;
    this.material_variation = firstSelectedVariant?.material_variation ?? this.material_variation;
    this.center_stone_shape = firstSelectedVariant?.center_stone_shape ?? validShape?.id;
    
    // Store in IndexedDB (if valid)
    if (this.selectedVariant) {
      let superAttrCodes = super_attributes?.map(el => el?.code);
      superAttrCodes?.forEach(code => {
        this.attributesData[code] = this.selectedVariant[code];
      });

      const productToStore = {
        id: this.selectedVariant?.id ?? this.product.id,
        sku: this.selectedVariant?.sku ?? this.product.sku,
        family: attribute_family_code
      };

        const isValid = Object.values(productToStore).every(x => x !== null && x !== '' && x !== undefined);
        if (isValid) {
          await this.$indexedDB.addProduct(productToStore);
        }
      }
      sessionStorage.removeItem('fromSearch');
      // Default value for ring_size
      let attributeSKUData = await this.$store.getters.getProductAttribute;
      let attributes = attributeSKUData[this.product.sku];
      if (attributes && attributes?.ring_size) {
        this.selectedRingSize = { sku: attributes?.ring_size };
      }
      if(attributes && attributes?.prong_style) {
        let prevProng = attributes?.prong_style;
         this.selectedVariant?.prong_style_options?.map(item => {
        if (prevProng && prevProng === item?.admin_name) {
            this.selectedProngStyle = {
              sku: item?.id, // Using the id as SKU
              name: item?.admin_name, // Label generation logic
            };
          }
        });
      }
    },

    getValidSuperAttrVariants(superAttr) {
      if (superAttr?.type == "select" && this.validProductVariants?.length) {
        return this.getValidVariantList(superAttr);
      }
      return [];
    },
    getValidVariantList(attribute = {}) {
      const { code, options = [] } = attribute;

      if (!code || !Array.isArray(this.validProductVariants)) {
        return [];
      }

      const attrs = this.attributesData || {};

      // get active filters (ignore null/undefined)
      const activeFilters = Object.entries(attrs).filter(
        ([key, value]) =>
          value !== null &&
          value !== undefined &&
          key !== code // ✅ IMPORTANT: exclude current attribute
      );

      // dynamic filtering
      let matchedVariants = this.validProductVariants.filter(variant =>
        activeFilters.every(([key, value]) => {
          // skip if key not present in variant
          if (!(key in variant)) return true;

          return variant[key] === value;
        })
      );

      if(code == 'center_stone_shape') {
        matchedVariants = matchedVariants.filter(variant => variant?.shape?.toLowerCase() != "unset");
        if(matchedVariants?.length == 0) {
          return [];
        }
      }

      // fallback
      const sourceData = matchedVariants.length  ? matchedVariants : this.validProductVariants;

      // extract unique values
      const uniqueValues = [
        ...new Set(
          sourceData
            .map(variant => variant?.[code])
            .filter(value => value !== undefined && value !== null)
        )
      ];

      // map to options
      return uniqueValues
        .map(value => options.find(option => option?.id == value))
        .filter(Boolean)
        .sort((a, b) => (a?.position || 0) - (b?.position || 0));
    }
  },
  async mounted() {
    // this.selectedVariant = this.product;
    this.assignData();
  },
}
</script>
<style scoped>
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for Firefox */
* {
  scrollbar-width: none;
  /* For Firefox */
}

/* Hide scrollbar for Internet Explorer and legacy browsers */
* {
  -ms-overflow-style: none;
  /* IE and Edge */
}
</style>