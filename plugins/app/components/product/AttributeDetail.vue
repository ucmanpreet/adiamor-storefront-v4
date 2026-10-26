<template>
  <section aria-labelledby="details-heading" class="mt-2 sm:mt-5">
    <h2 id="details-heading" class="sr-only hidden sm:block">Additional details</h2>

    <div class="text-sm">
      <div class="divide-y divide-gray-200 first:border-t first:border-gray-200">

        <!-- DESCRIPTION -->
        <Accordion
          :title="descTitle"
          :isOpen="checkInclude(descTitle)"
          @toggle="handleToggle(descTitle)"
          v-if="product.description || product.extra_description || diamond.description"
        >
          <div
            class="prose prose-sm prose-p:mt-0 pb-3 leading-normal sm:leading-loose max-w-full text-gray-black"
          >
            <div
              v-if="product.is_description_html"
              v-html="$sanitize(product.description)"
            ></div>
            <p v-else>{{ product.description }}</p>
            <p v-if="product && product.extra_description">
              {{ product.extra_description }}
            </p>
            <p v-if="diamond && diamond.description">
              {{ diamond.description }}
            </p>
          </div>
        </Accordion>

        <!-- PRODUCT ATTRIBUTES -->
        <Accordion
          :title="attrTitle"
          :isOpen="checkInclude(attrTitle)"
          @toggle="handleToggle(attrTitle)"
          v-if="checkProductAttributeExist"
        >
          <div class="pb-2">
            <dl
              class="prose prose-sm prose-h2:my-0 leading-normal sm:leading-loose font-light text-gray-black"
            >
              <div
                class="flex items-start"
                :class="item.type == 'array' ? 'flex-col space-y-1' : ''"
                v-for="(item, index2) in product.attributes"
                :key="index2"
                v-show="item.is_show && isValidAttribute(item)"
              >
                <dt
                  class="mt-0 w-44 flex-none font-light text-gray-black flex items-center gap-2"
                >
                  {{ item.name }}

                  <!-- Info icon (mouse-only, not keyboard accessible) -->
                  <InfoIcons
                    :item="item"
                    @assignCode="assignCodeData"
                    aria-hidden="true"
                    :hidden="true"
                  />
                </dt>

                <dd class="mt-0" v-if="item.type == 'string'">
                  {{ item?.value }}
                </dd>

                <dd
                  class="mt-0"
                  v-if="item.type == 'html'"
                  v-html="$sanitize(item?.value)"
                ></dd>

                <div
                  class="flex items-start"
                  v-for="(el, index2) in item?.value"
                  :key="index2">
                <template v-if="item.type == 'array'">
                  <dt class="mt-0 w-44 flex-none pl-3 font-light">
                    {{ el.shape }}
                  </dt>
                  <dd class="mt-0">{{ el.range }}</dd>
                </template>
                </div>
                <p
                  class="pl-3"
                  v-if="item.type == 'array' && item.code == 'can_be_set_with'"
                >
                  Call
                  <a
                    :href="`tel:${phoneNumber}`"
                    class="underline text-primary"
                    :aria-label="`Call ${phoneNumber} for additional shapes and sizes`"
                  >
                    {{ phoneNumber }}
                  </a>
                  for additional shapes and sizes.
                </p>
              </div>
            </dl>
          </div>
        </Accordion>

        <!-- DIAMOND ATTRIBUTES -->
        <Accordion
          :title="diamondTitle"
          :isOpen="checkInclude(diamondTitle)"
          @toggle="handleToggle(diamondTitle)"
          v-if="diamond && diamond.attributes && diamond.attributes.length"
        >
          <div class="pb-2">
            <dl
              class="prose prose-sm prose-h2:my-0 leading-normal sm:leading-loose font-light text-gray-black"
            >
              <div
                class="flex items-start text-gray-black"
                v-for="(item, index3) in diamond.attributes"
                :key="index3"
                v-show="item.is_show && isValidAttribute(item)"
              >
                <dt
                  class="mt-0 w-44 flex-none font-light text-gray-black flex items-center gap-2"
                >
                  {{ item.name }}

                  <!-- Info icon mouse-only -->
                  <InfoIcons
                    :item="item"
                    @assignCode="assignCodeData"
                    aria-hidden="true"
                    :hidden="true"
                  />
                </dt>

                <dd v-if="item.type == 'string'" class="mt-0">
                  {{ item?.value }}
                </dd>

                <dd
                  v-if="item.type == 'html'"
                  v-html="$sanitize(item?.value)"
                  class="mt-0"
                ></dd>
              </div>
            </dl>
          </div>
        </Accordion>

        <!-- PRODUCT DIAMOND DETAILS -->
        <template v-if="ifDiamondttributePresent">
          <Accordion
            :title="el.label"
            v-for="(el, mainIndex) in product.diamondAttributeDetail"
            :isOpen="checkInclude(el.label)"
            :key="mainIndex"
            @toggle="handleToggle(el.label)"
          >
            <dl v-if="el.data && el.data.length" :key="mainIndex" class="mb-3">
              <div
                class="flex mt-1 items-start text-gray-black"
                v-for="(item, index3) in el.data"
                :key="index3"
                v-show="item.is_show && isValidAttribute(item)"
              >
                <dt
                  class="mt-0 w-44 flex-none font-light text-gray-black flex items-center gap-2"
                >
                  {{ item.name }}
  
                  <InfoIcons
                    :item="item"
                    @assignCode="assignCodeData"
                    aria-hidden="true"
                    :hidden="true"
                  />
                </dt>
  
                <dd class="text-gray-black mt-0" v-if="item.type == 'string'">
                  {{ item?.value }}
                </dd>
  
                <dd
                  class="text-gray-black mt-0"
                  v-if="item.type == 'html'"
                  v-html="$sanitize(item?.value)"
                ></dd>
              </div>
            </dl>
          </Accordion>
        </template>

        <!-- ONLY DIAMOND DETAILS -->
         <template v-if="onlyDiamondttributePresent">
           <Accordion
             :title="el.label"
             v-for="(el, mainIndex) in diamond.diamondAttributeDetail"
             :isOpen="checkInclude(el.label)"
             :key="mainIndex"
             @toggle="handleToggle(el.label)"
           >
             <dl v-if="el.data && el.data.length" :key="mainIndex">
               <div
                 class="prose prose-sm prose-h2:my-0 leading-normal sm:leading-loose font-light text-gray-black flex"
                 v-for="(item, index3) in el.data"
                 :key="index3"
                 v-show="item.is_show && isValidAttribute(item)"
               >
                 <dt
                   class="mt-0 w-44 flex-none font-light text-gray-black flex items-center gap-2"
                 >
                   {{ item.name }}
   
                   <InfoIcons
                     :item="item"
                     @assignCode="assignCodeData"
                     aria-hidden="true"
                     :hidden="true"
                   />
                 </dt>

                 <dd class="text-gray-black mt-0" v-if="item.type == 'string'">
                   {{ item?.value }}
                 </dd>
   
                 <dd
                   class="text-gray-black mt-0"
                   v-if="item.type == 'html'"
                   v-html="$sanitize(item?.value)"
                 ></dd>
               </div>
             </dl>
           </Accordion>
         </template>

        <!-- EXTRA ATTRIBUTES -->
         <template v-if="ifExtraAttributePresent">
           <Accordion
             :title="el.label"
             v-for="(el, mainIndex) in product.extraAttributeDetails"
             :isOpen="checkInclude(el.label)"
             :key="mainIndex"
             @toggle="handleToggle(el.label)"
           >
             <dl v-if="el.data && el.data.length" :key="mainIndex">
               <div
                 class="prose prose-sm prose-h2:my-0 leading-normal sm:leading-loose font-light text-gray-black flex"
                 v-for="(item, index3) in el.data"
                 :key="index3"
                 v-show="item.is_show"
               >
                 <dt
                   class="mt-0 w-44 flex-none font-light text-gray-black flex gap-2"
                 >
                   {{ item.name }}
   
                   <InfoIcons
                     :item="item"
                     @assignCode="assignCodeData"
                     aria-hidden="true"
                     :hidden="true"
                   />
                 </dt>

                 <dd class="text-gray-black mt-0" v-if="item.type == 'string'">
                   {{ getUpdatedValue(item?.value) }}
   
                   <p
                     class="m-0 leading-normal"
                     v-if="item.code == 'sidestone_type' && !isBundleView && product?.attribute_family_code == 'engagement_rings_family'"
                   >
                     Sidestone type (natural or lab grown) determined by selected center diamond
                   </p>
                 </dd>
   
                 <dd
                   class="text-gray-black mt-0"
                   v-if="item.type == 'html'"
                   v-html="$sanitize(item?.value)"
                 ></dd>
               </div>
             </dl>
           </Accordion>
         </template>
      </div>
    </div>
  </section>
</template>

<script>
import Accordion from "~/components/ui/Accordion.vue";
import InfoIcons from "~/components/product/InfoIcons.vue";
export default {
  name : "AttributeDetail",
  components: {
    Accordion,
    InfoIcons,
  },
  props: {
    product: Object,
    title: String,
    diamond: {
      type: Object,
      default() {
        return {};
      },
    },
    code: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      currentOpen: [],
      isModalOpen: false,
      currentCode: null,
      extraAttributeDetails: [],
      diamondAttributeDetails: [],
      onlyDiamondAttributeDetails: [],
      growthType: "",
      showModal: false,
    };
  },
  methods: {
   isValidAttribute(attr) {
      if(!this.getProductAvailability && this.product?.attribute_family_code == 'certified_diamond') {
        if(attr.code == 'diamond_authority' || attr.code == 'diamond_certificate_number') {
          return false;
        }
      }
      return true;
   },
    getUpdatedValue(currentValue) {
      if (typeof currentValue === 'string') {
        // Check if value ends with 'diamond' or 'diamonds' (case-insensitive)
        const match = currentValue.trim().match(/^(.*?)(diamond|diamonds)$/i);
        if (match) {
          // Try to get growth type from diamond.attributes, fallback to product.attributes
          let growthType = '';
          let growthAttr = null;
          if (this.diamond && Array.isArray(this.diamond.attributes)) {
            growthAttr = this.diamond.attributes.find(el => el.code === 'diamond_growth');
          }
          if (!growthAttr && this.product && Array.isArray(this.product.attributes)) {
            growthAttr = this.product.attributes.find(el => el.code === 'diamond_growth');
          }
          if (growthAttr && growthAttr.value) {
            growthType = growthAttr.value;
          }
          if (growthType) {
            // Insert growth type before 'diamond' or 'diamonds'
            return `${match[1].trim()} ${growthType} ${match[2]}`.replace(/  +/g, ' ').trim();
          }
        }
      }
      return currentValue;
    },
    compareCodes(el, code) {
      if (typeof el === "string" && typeof code === "string") {
        return el === code; // exact string match
      } else {
        return el == code; // loose equality for number vs string number
      }
    },

   checkInclude(code) {
      return this.currentOpen?.some(el => this.compareCodes(el, code)) || false;
    },

    handleToggle(code) {
      if (this.currentOpen?.some(el => this.compareCodes(el, code))) {
        this.currentOpen = this.currentOpen.filter(
          el => !this.compareCodes(el, code)
        );
      } else {
        this.currentOpen.push(code);
      }
    },

    getDescriptionTitle(index) {
      const familyCode = this.product.attribute_family_code;
      let family = this.product.family;

      const hasDiamond = Object.keys(this.diamond).length > 0;

      let suffix = (index === 1 && !hasDiamond) ? 'Description' : 'Details';

      if (hasDiamond && index === 2) {
        family = 'Setting';
      }

      if (familyCode === 'rings_and_bands') {
        family = 'Ring';
      }

      return `${family} ${suffix}`;
    },

    toggle() {
      this.$emit("toggle");
    },
    closeModal() {
      this.isModalOpen = false;
      this.showModal = false;
      this.certificateModalData = null;
    },
    onClickOutside() {
      this.isModalOpen = false;
    },
    assignCodeData(code = null) {
      this.currentCode = code;
    },
  },
  computed: {
    isBundleView() {
			return this.$route.name === 'yourSettingPage';
		},
    getProductAvailability() {
            // return product availability based on in_stock and is_active
            if(this.$route.name != "yourSettingPage"){
                return this.product.is_available;
            }
            let bundleItem = this.$store.getters.getBundleItem;
            if (bundleItem && Object.keys(bundleItem).length > 0){
                let setting = bundleItem['setting'];
                let diamond = bundleItem['diamond'];
                return setting?.is_available && diamond?.is_available;
            }
            return true;
    },
    descTitle() {
      return this.getDescriptionTitle(1);
    },
    attrTitle() {
      return this.getDescriptionTitle(2);
    },
    diamondTitle() {
      return "Diamond Details";
    },
    checkProductAttributeExist() {      
       return !this.product?.diamondAttributeDetail && Array.isArray(this.product?.attributes) && this.product.attributes.length > 0;
    },
    onlyDiamondttributePresent() {
      return !!(this.diamond?.diamondAttributeDetail?.length);
    },
    ifExtraAttributePresent() {
      return !!(this.product?.extraAttributeDetails?.length);
    },
    ifDiamondttributePresent() {
     return !!(this.product?.diamondAttributeDetail?.length);
    },
    phoneNumber() {
      return this.$store.state.phoneNumber;
    },
  }
};
</script>
