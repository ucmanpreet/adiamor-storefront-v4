<template>
  <div
    class="flex items-center flex-wrap text-[0.8125rem] group"
    :class="fillContainer ? 'w-full h-full justify-center' : ''"
    role="region"
    :aria-label="`Pay with ${isPriceEligibleForAffirm ? 'Affirm' : 'PayPal Credit'}`"
  >
    <template v-if="isPriceEligibleForAffirm">
      <div class="relative" :class="fillContainer ? 'w-full h-full' : ''">
        <span
          class="affirm-as-low-as"
          :class="fillContainer ? 'absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer' : ''"
          :data-amount="getIntPrice"
          data-page-type="product"
          data-affirm-color="black"
          data-learnmore-show="false"
        ></span>
      </div>
    </template>
    <template v-if="!hidePaypal">
      <span class="pb-0.5 px-1">or</span>
      <div class="w-28 flex items-center flex-none">
        <NuxtLink :to="flexibleFinancePath">
          <img
            :alt="'PayPal Credit logo'"
            :src="`${$config?.public?.cdnPrefix}logos/paypal-credit.png`"
          />
        </NuxtLink>
      </div>
    </template>
  </div>
</template>

<script setup>
import KEYS from '~/utils/constant.js';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const props = defineProps(['price', 'hidePaypal', 'fillContainer']);

const config = useRuntimeConfig().public;

const flexibleFinancePath = STATIC_ROUTES.FLEXIBLE_FINANCING;

const getIntPrice = computed(() => parseInt(props.price) * 100);
const isPriceEligibleForAffirm = computed(() => parseInt(props.price) <= KEYS.AFFIRM_PDP_HIGHEST_PRICE);

onMounted(() => {
  if (import.meta.client) {
    nextTick(() => {
      initializeAffirm();
    });
  }
});

// Important for variant price updates
watch(() => props.price, () => {
  nextTick(() => {
    refreshAffirm();
  });
});

function initializeAffirm() {
  const scriptSrc = config.affirmCdnProduction;

  if (window.affirm) {
    refreshAffirm();
    return;
  }

  if (!document?.querySelector(`script[src="${scriptSrc}"]`)) {
    loadAffirmScript(scriptSrc);
  }
}

function loadAffirmScript(scriptSrc) {
  window._affirm_config = {
    public_api_key: config.affirmPublicApikeyProduction,
    script: scriptSrc
  };

  const script = document.createElement('script');
  script.src = scriptSrc;
  script.async = true;

  script.onload = () => {
    refreshAffirm();
  };

  document.head.appendChild(script);
}

function refreshAffirm() {
  if (window.affirm?.ui?.ready) {
    window.affirm.ui.ready(() => {
      window.affirm.ui.refresh();
    });
  }
}
</script>