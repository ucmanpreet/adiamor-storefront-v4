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

<script setup>
import Accordion from "~/components/ui/Accordion.vue";
import InfoIcons from "~/components/product/InfoIcons.vue";

const props = defineProps({
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
});
const emit = defineEmits(["toggle"]);

const store = useMainStore();
const route = useRoute();

const currentOpen = ref([]);
const isModalOpen = ref(false);
const currentCode = ref(null);
const extraAttributeDetails = ref([]);
const diamondAttributeDetails = ref([]);
const onlyDiamondAttributeDetails = ref([]);
const growthType = ref("");
const showModal = ref(false);
const certificateModalData = ref(null);

function isValidAttribute(attr) {
  if(!getProductAvailability.value && props.product?.attribute_family_code == 'certified_diamond') {
    if(attr.code == 'diamond_authority' || attr.code == 'diamond_certificate_number') {
      return false;
    }
  }
  return true;
}

function getUpdatedValue(currentValue) {
  if (typeof currentValue === 'string') {
    // Check if value ends with 'diamond' or 'diamonds' (case-insensitive)
    const match = currentValue.trim().match(/^(.*?)(diamond|diamonds)$/i);
    if (match) {
      // Try to get growth type from diamond.attributes, fallback to product.attributes
      let growthType = '';
      let growthAttr = null;
      if (props.diamond && Array.isArray(props.diamond.attributes)) {
        growthAttr = props.diamond.attributes.find(el => el.code === 'diamond_growth');
      }
      if (!growthAttr && props.product && Array.isArray(props.product.attributes)) {
        growthAttr = props.product.attributes.find(el => el.code === 'diamond_growth');
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
}

function compareCodes(el, code) {
  if (typeof el === "string" && typeof code === "string") {
    return el === code; // exact string match
  } else {
    return el == code; // loose equality for number vs string number
  }
}

function checkInclude(code) {
  return currentOpen.value?.some(el => compareCodes(el, code)) || false;
}

function handleToggle(code) {
  if (currentOpen.value?.some(el => compareCodes(el, code))) {
    currentOpen.value = currentOpen.value.filter(
      el => !compareCodes(el, code)
    );
  } else {
    currentOpen.value.push(code);
  }
}

function getDescriptionTitle(index) {
  const familyCode = props.product.attribute_family_code;
  let family = props.product.family;

  const hasDiamond = Object.keys(props.diamond).length > 0;

  let suffix = (index === 1 && !hasDiamond) ? 'Description' : 'Details';

  if (hasDiamond && index === 2) {
    family = 'Setting';
  }

  if (familyCode === 'rings_and_bands') {
    family = 'Ring';
  }

  return `${family} ${suffix}`;
}

function toggle() {
  emit("toggle");
}

function closeModal() {
  isModalOpen.value = false;
  showModal.value = false;
  certificateModalData.value = null;
}

function onClickOutside() {
  isModalOpen.value = false;
}

function assignCodeData(code = null) {
  currentCode.value = code;
}

const isBundleView = computed(() => route.name === 'yourSettingPage');

const getProductAvailability = computed(() => {
  // return product availability based on in_stock and is_active
  if(route.name != "yourSettingPage"){
    return props.product.is_available;
  }
  let bundleItem = store.getBundleItem;
  if (bundleItem && Object.keys(bundleItem).length > 0){
    let setting = bundleItem['setting'];
    let diamond = bundleItem['diamond'];
    return setting?.is_available && diamond?.is_available;
  }
  return true;
});

const descTitle = computed(() => getDescriptionTitle(1));
const attrTitle = computed(() => getDescriptionTitle(2));
const diamondTitle = computed(() => "Diamond Details");

const checkProductAttributeExist = computed(() => !props.product?.diamondAttributeDetail && Array.isArray(props.product?.attributes) && props.product.attributes.length > 0);
const onlyDiamondttributePresent = computed(() => !!(props.diamond?.diamondAttributeDetail?.length));
const ifExtraAttributePresent = computed(() => !!(props.product?.extraAttributeDetails?.length));
const ifDiamondttributePresent = computed(() => !!(props.product?.diamondAttributeDetail?.length));
const phoneNumber = computed(() => store.phoneNumber);
</script>
