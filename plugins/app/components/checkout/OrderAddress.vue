<template>
  <div class="mt-2 rounded-lg text-sm">
    <address class="not-italic flex flex-col gap-1" :aria-label="addressLabel">
      <p v-if="address.company_name" class="font-medium">
        {{ address.company_name }}
      </p>
      <!-- Full Name -->
      <p>
        {{ address.first_name }} {{ address.last_name }}
      </p>
      <!-- Address Line 1 -->
      <p>
        {{ getValidAddress(address.address1) }}
      </p>
      <!-- Address Line 2 -->
      <p v-if="address.address2">
        {{ getValidAddress(address.address2) }}
      </p>
      <!-- City, State, ZIP -->
      <p>
        <template v-if="address.city">
          {{ address.city }},
        </template>
        {{ address.state }} {{ address.postcode }}
      </p>
      <!-- Phone -->
      <p v-if="address.phone">
        <a
          :href="`tel:${address.phone}`"
          tabindex="-1"
          class="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        >
          {{ formattedPhone }}
        </a>
      </p>
      <!-- Email -->
      <p v-if="address.email">
        <a
          :href="`mailto:${address.email}`"
          tabindex="-1"
          class="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
        >
          {{ address.email }}
        </a>
      </p>
    </address>
  </div>
</template>
<script>
import { formatPhoneByCountry } from '@/utils/phoneFormatter.js';
export default {
  name: "OrderAddress",
  props: ["address"],
  computed: {
     formattedPhone() {
        if (!this.address?.phone) return '';
        return formatPhoneByCountry(this.address.phone, this.address.country || 'US');
      },
      addressLabel() {
        return this.addressType
          ? `${this.addressType}`
          : 'Address information';
      }
  },
  methods:{
    getValidAddress(address) {
        if(Array.isArray(address) && address.length > 0){
            return address[0];
        }
        return address;
    },
  }
};
</script>
