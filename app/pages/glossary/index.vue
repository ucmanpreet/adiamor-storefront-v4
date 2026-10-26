<template>
  <div v-if="$route.params.slug" class="flex-1" aria-labelledby="education-page-heading">
    <div class="max-w-7xl mx-auto px-4 pb-8 lg:pb-16 lg:px-24 2xl:px-8 flex flex-wrap gap-4 sm:gap-6 lg:gap-12">

      <!-- Sidebar navigation -->
      <EducationSidebar />

      <!-- Main content -->
      <ContentCard :isVisible="$route.params.slug === 'a'">
        <h2 id="education-page-heading" class="mb-4 text-xl sm:text-2xl font-normal">Glossary</h2>
        <div>
          <p>Our dictionary of common jewelry terms and descriptions with illustrations.</p>
          <Glossary />
        </div>
      </ContentCard>
    </div>
  </div>
</template>

<script setup>
import Glossary from '~/components/Glossary.vue';
import EducationSidebar from '~/components/navigation/EducationSidebar.vue';
import ContentCard from '~/components/common/ContentCard.vue';

const route = useRoute();
const { $bus } = useNuxtApp();

useHead(() => ({
  title: 'Jewelry Glossary | Adiamor',
  meta: [
    { key: 'description', name: 'description', content: 'Browse our comprehensive jewelry glossary to learn about diamonds, gemstones, metals, settings, and more.' }
  ]
}));

onMounted(() => {
  if (import.meta.client && route.params.slug === 'a') {
    $bus.emit(
      'aria-announce',
      'Jewelry Glossary page loaded. Browse jewelry terms and definitions.'
    )
  }
});

watch(() => route.params.slug, (newVal) => {
  if (import.meta.client && newVal === 'a') {
    $bus.emit(
      'aria-announce',
      'Glossary content updated.'
    )
  }
});
</script>