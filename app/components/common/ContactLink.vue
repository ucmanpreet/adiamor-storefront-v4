<template>
    <section class="bg-[#F7F7F7] md:py-6" aria-labelledby="contact-heading">
      <h2 id="contact-heading" class="sr-only" aria-hidden="true">
        Customer Support and Services
      </h2>
      <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 py-7 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-x-20" role="list">
        <div
          v-for="(feature, index) in features"
          :key="index"
          role="listitem"
          class="text-center relative"
        >
          <!-- button for javascript: actions -->
          <button
            v-if="feature.route?.startsWith('javascript:')"
            type="button"
            class="block w-full hover:opacity-80 transition"
            @click="handleClick(feature.route)"
          >
            <Icon :name="feature.icon" class="w-10 h-10 lg:w-16 lg:h-16 mx-auto" aria-hidden="true" />
            <p class="font-medium text-sm md:text-base mt-2.5">{{ feature.title }}</p>
            <p class="text-xs md:text-sm mt-1.5">{{ feature.description }}</p>
          </button>
          <!-- <a> for tel: -->
          <a
            v-else-if="feature.route?.startsWith('tel:')"
            :href="feature.route"
            class="block hover:opacity-80 transition"
          >
            <Icon :name="feature.icon" class="w-10 h-10 lg:w-16 lg:h-16 mx-auto" aria-hidden="true" />
            <p class="font-medium text-sm md:text-base mt-2.5">{{ feature.title }}</p>
            <p class="text-xs md:text-sm mt-1.5">{{ feature.description }}</p>
          </a>
          <!-- Use nuxt-link for route navigation -->
          <nuxt-link
            v-else
            :to="feature.route"
            class="block hover:opacity-80 transition"
          >
            <Icon :name="feature.icon" class="w-10 h-10 lg:w-16 lg:h-16 mx-auto" aria-hidden="true" />
            <p class="font-medium text-sm md:text-base mt-2.5">
              {{ feature.title }}
            </p>
            <p class="text-xs md:text-sm mt-1.5">
              {{ feature.description }}
            </p>
          </nuxt-link>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
import Icon from "~/components/common/Icon.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";

function handleClick(route) {
  const match = route.match(/^javascript:(\w+)\.(\w+)\(\)/)
  if (match) {
    const [, obj, method] = match
    if (window[obj] && typeof window[obj][method] === 'function') {
      window[obj][method]()
    }
  }
}

const features = [
  {
    icon: "chat",
    title: "Chat with us live!",
    description: "Connect with us now for instant assistance!",
    route: "javascript:helpDesk.click()",
  },
  {
    icon: "call",
    title: "Reach Out to Us",
    description: "Need help? Contact one of our gemologists for expert advice!",
    route: "tel:8776275094",
  },
  {
    icon: "wallet",
    title: "Flexible Payment Options",
    description: "Adiamor accepts credit cards, Affirm, Paypal or bank transfer",
    route: STATIC_ROUTES.SERVICES_PAYMENT_OPTIONS,
  },
  {
    icon: "security-check",
    title: "Lifetime Warranty",
    description: "Enjoy peace of mind with our Lifetime Warranty.",
    route: STATIC_ROUTES.POLICIES_WARRANTY,
  },
];
</script>
  