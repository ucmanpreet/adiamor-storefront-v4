<template>
  <section
    class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-4 sm:space-y-7"
    :aria-labelledby="sectionHeadingId"
  >
    <div>
      <!-- Accessible Heading -->
      <h2
        :id="sectionHeadingId"
        class="font-normal text-lg md:text-xl lg:text-3xl"
        :class="$route.path == STATIC_ROUTES.CART_SUMMARY ? '!text-lg' : ''"
      >
        {{ title || 'Explore Our Collections' }}
      </h2>

      <!-- Description -->
      <p
        class="mt-1 text-sm"
        v-html="safeDescription"
      ></p>
    </div>

    <!-- Collection List -->
    <ul
      class="grid grid-cols-2 gap-2 sm:gap-4 lg:gap-x-8"
      :class="classList ? classList : 'sm:grid-cols-4'"
      role="list"
    >
      <li
        v-for="item in items"
        :key="item.id"
        class="h-full"
      >
        <Card
          :image="item.image"
          :title="item.title"
          :link="item.link"
          :item="item"
          :imagePosition="imagePosition"
        />
      </li>
    </ul>

  </section>
</template>

<script>
import Card from '~/components/common/Card.vue';
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name: 'ShopJeweleryByCategory',
    components: { Card },
    data() {
      return {
        STATIC_ROUTES
      };
    },
    props: ['items', 'title', 'classList', 'imagePosition', 'description'],
    computed: {
      sectionHeadingId() {
        return `collection-heading-${this.uid}`;
      },

      // Prevent empty or unsafe HTML issues
      safeDescription() {
        return this.description ||
          `Find timeless wedding rings and bands for every style — from elegant solitaires to matching sets and diamond accents.`;
      }
    }
}
</script>
