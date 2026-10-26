<template>
  <dl :class="{'grid grid-cols-3 xl:grid-cols-5 grid-flow-dense flex-1 gap-3 sm:gap-y-5 sm:gap-x-6 text-xxs sm:text-xs font-normal': layout === 'block' }">
    <template v-for="attr in filteredAttributes">
      <div v-if="attr.value" :key="attr.code"
        :class="{ flex: layout === 'inline' }">
        <dt :class="layout === 'inline' ? 'flex-1 flex justify-between' : ''">
          <span>{{ attr.label }} :</span>
        </dt>
        <dd :class="layout === 'inline' ? 'pl-1 flex-1 break-words' : 'font-light'">
          <span :class="layout === 'block' ? 'block' : ''">{{ formatValue(attr) }}</span>
        </dd>
      </div>
    </template>

    <slot></slot>
  </dl>
</template>

<script>
import { attributeCodes } from "~/utils/searchConstant";
import lang from "~/utils/commonLocale";

export default {
  name: 'DiamondAttributeList',
  props: {
    diamond: {
      type: Object,
      required: true,
    },
    layout: {
      type: String,
      default: 'inline', // 'inline' or 'block'
    },
    allowedKeys: {
      type: Array,
      default: () => [],
    },
    filter: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    filteredAttributes() {
      return this.filter
        ? this.diamondAttributes.filter(attr => this.allowedKeys.includes(attr.code))
        : this.diamondAttributes;
    },
    diamondAttributes() {
        let attributeConfig = this.$store.getters.getAttributeConfig || [];
        if (!attributeConfig || attributeConfig.length === 0) {
          console.log('Attribute config is empty, even after fallback fetch.');
        }
        let diamondData = [];
        if(this.diamond?.sku) diamondData.push({label: lang.diamondSku.replace(/:$/, ""), code: attributeCodes.sku, value: this.diamond?.sku});
        if(this.diamond?.attributes?.[attributeCodes.growth]) diamondData.push({label: lang.diamondGrowth, code: attributeCodes.growth, value: this.diamond?.attributes?.[attributeCodes.growth]});
        if(this.diamond.certificate?.number) diamondData.push({label: lang.certificateNumber, code: attributeCodes.certificate_number, value: this.diamond.certificate?.number});
        if(this.diamond.certificate?.authority) diamondData.push({label: lang.certifiedBy, code: attributeCodes.certified_by, value: this.diamond.certificate?.authority });
        let attributeData = attributeConfig
          .filter(attr => this.diamond?.attributes[attr.code] !== undefined)
          .map(attr => ({
            label: attr.label,
            code : attr.code,
            value: this.diamond?.attributes[attr.code],
            position: attr.position !== undefined ? attr.position : Infinity
          }))
          .sort((a, b) => a.position - b.position);
                    
          diamondData.push(...attributeData);
          if(this.diamond?.attributes?.[attributeCodes.measurements]) diamondData.push({label: lang.measurements, code: attributeCodes.measurements, value: this.diamond?.attributes?.[attributeCodes.measurements]});
          if(this.diamond?.attributes?.[attributeCodes.diamond_lwr]) diamondData.push({label: lang.diamond_lwr, code: attributeCodes.diamond_lwr, value: this.diamond?.attributes?.[attributeCodes.diamond_lwr]});
          return diamondData;
      },
  },
  methods:{
    	formatValue(item) {
			  if(item?.code){
          if(item?.code?.includes(`percent`)){
            return `${item?.value}%`;
          }
        }
        return item?.value ? item.value : "";
      },
  }
};
</script>
