<!-- FaqAccordion.vue -->
<template>
  <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 py-8 lg:py-16">
    <div>
      <h2 class="font-normal text-lg md:text-xl lg:text-3xl">
        {{ heading }}
      </h2>

      <div class="mt-6 divide-y divide-gray-200">
        <div
          class="py-2 lg:py-4 first:pt-0 last:pb-0"
          v-for="(item, index) in faqItems"
          :key="index"
          :class="{ 'active': activeIndex === index }"
        >
          <h3 class="m-0">
            <button
              type="button"
              @click="toggle(index)"
              class="flex w-full items-center justify-between text-left font-gill-sans tracking-wider uppercase focus:outline-none rounded focus:ring-2 focus:ring-primary"
              :aria-expanded="(activeIndex === index).toString()"
              :aria-controls="`faq-panel-${index}`"
              :id="`faq-header-${index}`"
            >
              <span class="text-sm md:text-lg lg:text-xl">
                {{ item.question }}
              </span>

              <span class="ml-6">
                <Icon
                  name="arrow"
                  class="w-3 h-3 transition-transform"
                  :class="activeIndex === index ? 'rotate-90' : ''"
                  aria-hidden="true"
                />
              </span>
            </button>
          </h3>

          <transition name="slide">
            <div
              v-if="activeIndex === index"
              :id="`faq-panel-${index}`"
              class="mt-2 pr-12 prose prose-sm min-w-full prose-a:mt-0 prose-a:no-underline text-gray-black"
              role="region"
              :aria-labelledby="`faq-header-${index}`"
            >
              <p
                class="text-xs/5 sm:text-base/7"
                v-html="$sanitize(item.answer)"
              ></p>

              <!-- Multiple links -->
              <div
                v-if="item.links && item.links.length"
                class="mt-4 flex gap-2 flex-wrap"
              >
                <a
                  v-for="(link, linkIndex) in item.links"
                  :key="linkIndex"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="uppercase font-gill-sans tracking-[0.125rem] bg-primary text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-6 text-white inline-block mt-4 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary active:bg-primary/80 rounded"
                >
                  {{ link.text }}<span class="sr-only"> (opens in new tab)</span>
                </a>
              </div>

              <!-- Single link -->
              <a
                v-else-if="item.link && item.linkText"
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="uppercase font-gill-sans tracking-[0.125rem] bg-primary text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-6 text-white inline-block mt-4 hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary active:bg-primary/80 rounded"
              >
                {{ item.linkText }}<span class="sr-only"> (opens in new tab)</span>
              </a>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from "~/components/common/Icon.vue";

const props = defineProps({
    faqItems: {
        type: Array,
        required: true
    },
    heading: {
        type: String,
        default: 'Frequently Asked Questions'
    }
});

const activeIndex = ref(null);

function toggle(index) {
    activeIndex.value = activeIndex.value === index ? null : index;
}
</script>
