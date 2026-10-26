<template>
  <!-- The heading prop is referenced by aria-labelledby="modalHeading" inside Modal.vue — no external aria-labelledby needed -->
  <Modal heading="Available FedEx Service Locations" @close="closeModal" :loading="!internationalCustomers && !franceCustomers && loaderFedex" maxWidthClass="sm:max-w-3xl"
    zIndexClass="z-[1000004]">

    <!-- International / France customers message -->
    <div class="space-y-4" v-if="internationalCustomers || franceCustomers">
      <div class="text-center py-5 space-y-5 p-4">
        <!-- role="status" has implicit aria-live="polite" — no conflict; role="alert" implies assertive -->
        <p class="text-center text-sm leading-6" aria-live="polite">
          {{ internationalCustomers ? "International customers are responsible for all duties, taxes, VAT, broker charges, or surcharges as required by the country being shipped to.It is the customer's responsibility to check with local authorities to confirm the amount of duties and taxes owed." : "When importing to France, you will be required to source a local brokerage company to accept the shipment on your behalf.You might be able to find details on this by researching with your local customs or FedEx.In order for you to be able to accept the package, a third party broker is required." }}
        </p>
      </div>
    </div>
    <div class="space-y-4" v-else>
      <!-- Skeleton loader -->
      <FedexModalSkeleton v-if="loaderFedex" />

      <div v-else class="relative pb-4">
        <!-- No location found -->
        <div v-if="!fedexLocations?.length && noLocationFound"
          class="mx-4 mb-4 flex gap-3 bg-gray-50 border border-gray-200 rounded-lg p-4"
          role="alert" aria-live="assertive">
          <svg class="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd"/>
          </svg>
          <p class="text-sm text-gray-700 leading-relaxed">
            We were unable to find any FedEx facilities near your location. Please enter your shipping address
            or call <a href="tel:+8776275094" class="font-medium underline whitespace-nowrap">(877) 627-5094</a> to discuss additional shipping options.
          </p>
        </div>

        <div v-else>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 border-y border-gray-200 px-4 py-3 mb-4" v-if="!formShow">
            <p class="text-sm text-gray-700 leading-relaxed" :class="formShow ? '' : 'sm:max-w-[28rem]'">
              We have located the following FedEx facilities close to your address. You may select a location
              below or
              call <a href="tel:+8776275094" class="info-text whitespace-nowrap text-primary underline">(877) 627-5094</a> to
              discuss additional shipping options.
            </p>
            <!-- aria-label removed: visible text "Use A Different Address" is sufficient (WCAG 2.5.3) -->
            <button type="button" @click="formShow = true"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-primary border border-primary rounded px-3 py-1.5 hover:bg-black hover:text-white transition-colors whitespace-nowrap flex-shrink-0">Use A Different
              Address</button>
          </div>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 border-y border-gray-200 px-4 py-3 mb-4" v-else>
            <!-- aria-label removed: invalid on non-interactive element; live region announces text content directly -->
            <p class="text-sm text-gray-700 leading-relaxed" role="alert" aria-live="assertive">
              Enter your address in the fields below or call <a href="tel:+8776275094"
                class="whitespace-nowrap text-primary underline">(877) 627-5094</a> to discuss additional shipping
              options.
            </p>
            <!-- aria-label removed: visible text "Use Shipping Address" is sufficient (WCAG 2.5.3) -->
            <button type="button" @click="getLocations(0, true)"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-primary border border-primary rounded px-3 py-1.5 hover:bg-black hover:text-white transition-colors whitespace-nowrap flex-shrink-0">Use Shipping
              Address</button>
          </div>

          <!-- Address search form -->
          <form class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4" action="" v-if="formShow"
            @submit.prevent="getLocations(1)" novalidate>
            <div class="col-span-full relative">
              <input type="text" name="address" id="address"
                class="peer py-3 px-4 border w-full border-gray-200 rounded" v-model="order_shipping.address1"
 
                :class="submitted && addressError ? 'border-red-500' : 'border-gray-200'" placeholder=" "
                aria-required="true">
              <label
                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm bg-white peer-focus:rounded-full peer-[&:not(:placeholder-shown)]:top-0"
                for="address">
                Address
              </label>
            </div>
            <div class="relative">
              <input type="text" name="city" id="city" class="peer py-3 px-4 border w-full border-gray-200 rounded"
                v-model="order_shipping.city" placeholder=" "
                :class="submitted && cityError ? 'border-red-500' : 'border-gray-200'" aria-required="true">
              <label
                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm bg-white peer-focus:rounded-full peer-[&:not(:placeholder-shown)]:top-0"
                for="city">City</label>
            </div>
            <div>
              <label class="mb-1 block sr-only" for="state">State</label>
              <UniversalDropdown key="fedex_state" id="state" name="state" v-model="order_shipping.stateOrProvinceCode"
                :class="submitted && stateError
                  ? 'border-red-500'
                  : 'border-gray-200'" :options="statesData"
                :selectedValue="order_shipping.stateOrProvinceCode" optionLabel="code" optionValue="code"
                placeholder="Select State" @change="updateShippingState($event)"
                forcePosition="top"
                maxHeight="12rem"
                :inputClass="submitted && stateError ? 'border-red-500' : 'border-gray-200'" />
            </div>
            <div class="relative">
              <input type="text" name="postcode" id="zipcode"
                class="peer py-3 px-4 border w-full border-gray-200 rounded" v-model="order_shipping.postalCode"
                placeholder=" "
                :class="submitted && postcodeError ? 'border-red-500' : 'border-gray-200'"
                aria-required="true">
              <label
                class="block text-secondary-600 after:content-['*'] after:ml-0.5 after:text-red-500 text-xs sm:text-sm absolute top-1/2 left-2 px-2 -translate-y-1/2 transition-all peer-focus:top-0 peer-focus:text-sm bg-white peer-focus:rounded-full peer-[&:not(:placeholder-shown)]:top-0"
                for="zipcode">Zipcode</label>
            </div>
            <div class="col-span-full flex justify-center text-center">
              <!-- aria-label removed: accessible name is computed from visible "Search" + sr-only "FedEx locations" = "Search FedEx locations" -->
              <Button type="submit"
                class="py-2.5 px-4 bg-primary hover:bg-primary/80 rounded text-white w-full max-w-[10rem]">Search
                <span class="sr-only">FedEx locations</span>
              </Button>
            </div>
          </form>

          <!-- Location cards grid — v-else-if prevents v-else+v-show conflict; element not rendered at all when list is empty -->
          <div v-else-if="fedexLocations?.length" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="(item, index) in fedexLocations" :key="item.locationId || (item.company_name + '_' + item.postalcode)"
              class="flex flex-col justify-between gap-4 border border-gray-200 rounded-lg p-4 hover:border-primary/30 hover:bg-gray-50/50 transition-colors">
              <div class="flex flex-col gap-3">
                <!-- Location name + distance badge -->
                <div class="flex items-start justify-between gap-2">
                  <p class="font-medium text-sm text-gray-800 leading-snug">{{ item.company_name }}</p>
                  <span class="inline-flex items-center gap-1 text-[11px] text-gray-700 bg-gray-100 rounded-full px-2 py-0.5 whitespace-nowrap flex-shrink-0">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-9.5 11.25S.5 17.642.5 10.5a9 9 0 0119 0z"/>
                    </svg>
                    {{ item.distance }} {{ item.units }}
                  </span>
                </div>
                <!-- Address -->
                <address class="not-italic text-xs text-gray-700 leading-relaxed flex gap-1.5">
                  <svg class="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  <span>
                    {{ item.line1 }}<template v-if="item.line2">, {{ item.line2 }}</template><br/>
                    {{ item.city }}, {{ item.region }} {{ item.postalcode }}
                  </span>
                </address>
                <!-- Hours -->
                <div class="text-xs text-gray-700">
                  <p class="font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                    <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    Hours
                  </p>
                  <div v-for="(el, index1) in getFormatedHours(item.storeHours)" :key="index1" class="flex justify-between py-0.5 border-b border-gray-200 last:border-0">
                    <span class="text-gray-700">
                      <template v-if="el[1].length > 1">{{ el[1][0].dayOfWeek }} – {{ el[1][el[1].length - 1].dayOfWeek }}</template>
                      <template v-else>{{ el[1][0].dayOfWeek }}</template>
                    </span>
                    <span :class="el[1][0].operationalHoursType === 'CLOSED_ALL_DAY' ? 'text-red-400' : 'text-gray-700'">
                      <template v-if="el[1][0].operationalHoursType === 'CLOSED_ALL_DAY'">Closed</template>
                      <template v-else-if="el[1][0].operationalHoursType === 'OPEN_ALL_DAY'">Open all day</template>
                      <template v-else-if="el[1][0].operationalHoursType === 'OPEN_BY_HOURS'">
                        <time>{{ el[1][0].operationalHours ? getFormatedTime(el[1][0].operationalHours.begins) : '' }} – {{ el[1][0].operationalHours ? getFormatedTime(el[1][0].operationalHours.ends) : '' }}</time>
                      </template>
                    </span>
                  </div>
                </div>
              </div>
              <!-- CTA -->
              <!-- @keydown.enter/space removed: native <button> already fires click on Enter/Space (HTML spec §6.6) -->
              <button type="button" @click="sendData(item)"
                class="w-full bg-black text-white text-sm font-medium py-2 rounded hover:bg-black/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                :aria-label="`Click this to ${getLocationAriaLabel(item, index)}`">
                Select This Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import api from "~/api-client/rest-api/index.js";
import UniversalDropdown from "~/components/ui/UniversalDropdown.vue";
import Modal from "~/components/ui/Modal.vue";
import FedexModalSkeleton from "../skeleton/FedexModalSkeleton.vue";
import { useForm, useField } from 'vee-validate';

const props = defineProps({
    fedexData: Object,
    statesData: Array,
    internationalCustomers: Boolean,
    franceCustomers: Boolean,
})
const emit = defineEmits(['close', 'fedexFillData'])
const { $bus } = useNuxtApp()

const emptyShipping = () => ({
    city: "",
    stateOrProvinceCode: "",
    postalCode: "",
    countryCode: "US",
    address1: ""
})
const fedexLocations = ref([])
const formShow = ref(false)
const order_shipping = ref(emptyShipping())

// vee-validate 4: rules are registered globally; validation is explicit
const { validate } = useForm()
const { value: addressValue, errorMessage: addressError } = useField('address', 'required', { label: 'address', initialValue: '' })
const { value: cityValue, errorMessage: cityError } = useField('city', 'required', { label: 'city', initialValue: '' })
const { value: stateValue, errorMessage: stateError } = useField('state', 'required', { label: 'state', initialValue: '' })
const postcodeRules = computed(() => 'required|postcode:' + order_shipping.value.countryCode)
const { value: postcodeValue, errorMessage: postcodeError } = useField('postcode', postcodeRules, { label: 'postcode', initialValue: '' })

// keep the field values and order_shipping in sync both ways
function syncField(field, key) {
    watch(field, (v) => { if (order_shipping.value[key] !== v) order_shipping.value[key] = v })
    watch(() => order_shipping.value[key], (v) => { if (field.value !== v) field.value = v })
}
syncField(addressValue, 'address1')
syncField(cityValue, 'city')
syncField(stateValue, 'stateOrProvinceCode')
syncField(postcodeValue, 'postalCode')
const loaderFedex = ref(true)
const submitted = ref(false)
const noLocationFound = ref(false)

watch(loaderFedex, () => refocusModal())
watch(formShow, () => refocusModal())
watch(() => fedexLocations.value?.length, () => refocusModal())
watch(noLocationFound, () => refocusModal())

onMounted(async () => {
    if (!props.fedexData?.city || !props.fedexData?.postalCode || !props.fedexData?.stateOrProvinceCode) {
        formShow.value = true;
    }
    if (props.internationalCustomers || props.franceCustomers) {
        setTimeout(() => {
            const msg = props.internationalCustomers
                ? 'International customers are responsible for all duties, taxes, VAT, broker charges, or surcharges as required by the country being shipped to.'
                : 'When importing to France, you will be required to source a local brokerage company to accept the shipment on your behalf.';
            $bus.emit('aria-announce', msg);
        }, 2000);
        return;
    }
    await getLocations(0);
})

async function getLocations(type, submit = false) {
    submitted.value = true;
    const isValid = (await validate()).valid;
    if (!isValid && type) {
        $bus.emit(
            'aria-announce',
            'There are errors in the form. Please correct the highlighted fields.'
        );
        return;
    }
    let formData = type == 0 ? props.fedexData : order_shipping.value;
    if (Object.keys(formData).length) {
        if (!formData.city || !formData.postalCode || !formData.stateOrProvinceCode) {
            fedexLocations.value = [];
            if (type == 0 && submit) {
                formShow.value = false;
                noLocationFound.value = true;
            }
            loaderFedex.value = false;
            return;
        }
        loaderFedex.value = true;
        submitted.value = false;
        const response = await api.postRequest(`fedex-auth-locations`, formData);
        if (!response) {
            loaderFedex.value = false;
            return;
        }

        if (response?.data) {
            let data = response?.data?.data?.data;
            fedexLocations.value = data;
            if (fedexLocations.value?.length == 0) {
                noLocationFound.value = true;
            }
            loaderFedex.value = false;
            formShow.value = false;
            order_shipping.value = emptyShipping()
        }
    }
}
function updateShippingState(val) {
    order_shipping.value.stateOrProvinceCode = val;
}
function getFormatedHours(hoursArr) {
    let result = Map.groupBy(hoursArr, item => {
        return item.operationalHoursType;
    });
    return result;
}
function getFormatedTime(timeString) {
    if (timeString) {
        const parts = timeString.split(":"); // Split the string using ":" as the separator
        const h_24 = parts[0];
        var h = h_24 % 12;
        if (h === 0) h = 12;
        return (h < 10 ? '0' : '') + h + ':00' + (h_24 < 12 ? 'am' : 'pm');
    }
}
function getLocationAriaLabel(item, index) {
    return `Use address: ${item.company_name}, ${item.line1}, ${item.city}, ${item.region} ${item.postalcode}`;
}
function refocusModal() {
    nextTick(() => {
        const modal = document.querySelector('[role="dialog"]');
        if (!modal) return;
        const focusable = modal.querySelector('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]');
        focusable ? focusable.focus() : modal.focus();
    });
}
function closeModal() {
    emit("close");
}
function sendData(item) {
    emit("fedexFillData", item);
}
</script>