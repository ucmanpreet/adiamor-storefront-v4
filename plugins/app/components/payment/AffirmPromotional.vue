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

<script>
import KEYS from '~/utils/constant.js';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
  name : 'AffirmPromotional',
  props: ['price', 'hidePaypal', 'fillContainer'],
  computed: {
    getIntPrice() {
      return parseInt(this.price) * 100;
    },
    isPriceEligibleForAffirm() {
      return parseInt(this.price) <= KEYS.AFFIRM_PDP_HIGHEST_PRICE;
    }
  },
  data(){
    return {
      flexibleFinancePath: STATIC_ROUTES.FLEXIBLE_FINANCING
    }
  },
  mounted() {
    if (import.meta.client) {
      this.$nextTick(() => {
        this.initializeAffirm();
      });
    }
  },

  watch: {
    // Important for variant price updates
    price() {
      this.$nextTick(() => {
        this.refreshAffirm();
      });
    }
  },

  methods: {
    initializeAffirm() {
      const scriptSrc = this.$config.public.affirmCdnProduction;

      if (window.affirm) {
        this.refreshAffirm();
        return;
      }

      if (!document?.querySelector(`script[src="${scriptSrc}"]`)) {
        this.loadAffirmScript(scriptSrc);
      }
    },

    loadAffirmScript(scriptSrc) {
      window._affirm_config = {
        public_api_key: this.$config.public.affirmPublicApikeyProduction,
        script: scriptSrc
      };

      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = true;

      script.onload = () => {
        this.refreshAffirm();
      };

      document.head.appendChild(script);
    },

    refreshAffirm() {
      if (window.affirm?.ui?.ready) {
        window.affirm.ui.ready(() => {
          window.affirm.ui.refresh();
        });
      }
    }
  }
};
</script>