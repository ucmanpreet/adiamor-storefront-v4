<template>
    <!-- Photos From Our Community -->
		<section ref="section" class="pt-8 lg:pt-16" role="region"
            aria-labelledby="community-photos-heading"
        >
			<div class="pb-8 lg:pb-16 bg-primary flex flex-col justify-center">
				<div
					class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 text-white text-center sm:text-left md:text-center space-y-5 sm:space-y-9">
					<div
						class="flex flex-col sm:flex-row gap-4 md:flex-col items-center sm:items-start md:items-center justify-center space-y-0 lg:space-y-5 md:max-w-lg mx-auto">
						<div>
							<h2 id="community-photos-heading" class="font-normal text-lg md:text-xl lg:text-3xl">Photos From Our Community</h2>
						</div>
					</div>

                    <!-- Screen reader widget loading message -->
                    <p class="sr-only" aria-live="polite">
                        Community photo gallery is loading.
                    </p>

					<!-- PhotoGrid -->
					<ClientOnly><div v-if="showWidget"
                        class="yotpo yotpo-pictures-widget yotpo-size-6"
                        role="group"
                        aria-label="Customer community photo gallery"
                        data-album-id="5af094db8e45394684be8e84"
                        data-layout="num_of_rows"
                        data-layout-rows="3"
                        data-spacing="0"
                        data-title="1"
                        data-title-text="Upload your photo or tag us at #Adiamor to be featured in our gallery!"
                        data-title-color="#ffffff"
                        data-title-alignment="left"
                        data-title-font-size="18"
                        data-title-mobile-font-size="18"
                        data-hover-color="#ffffff"
                        data-hover-opacity="0.8"
                        data-hover-icon="true"
                        data-cta-text="Shop Now"
                        data-cta-color="#2f84ed"
                        data-upload-button="1"
                        data-upload-button-text="Add Your Photos"
                        :data-upload-button-background-color="isHomeView ? '#ffffff' : '#1575eb'"
                        :data-upload-button-text-color="isHomeView ? '#000000' : '#ffffff'"
                        data-upload-button-font-family="Open Sans"
                        data-yotpo-element-id="2">
                    </div></ClientOnly>
				</div>

                <!-- View More Button -->
                <div class="text-center pt-4">
                    <NuxtLink
                        :to="socialMediaPath"
                        class="inline-flex items-center justify-center text-xs sm:text-sm px-8 py-2 gap-2 lg:!text-lg font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 border border-primary text-primary bg-white hover:bg-white/5 focus:ring-white"
                        aria-label="View more community photos and social media gallery"
                    >
                        View More
                    </NuxtLink>
                </div>
			</div>
		</section>
</template>

<script setup>
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const props = defineProps(['type']);

const socialMediaPath = STATIC_ROUTES.SOCIAL_MEDIA_GALLERY;

const isHomeView = computed(() => props.type === 'home');

// The Yotpo widget renders about 1,700 elements (most of them a hidden lightbox), so it is mounted only
// when the section nears the viewport and then initialised, since the global plugin runs before it exists.
const section = ref(null);
const showWidget = ref(false);
let observer = null;

function initWidgetWhenReady(attempts = 0) {
  const yotpo = window.yotpo;
  const legacy = window.yotpoWidgetsContainer;
  if (typeof yotpo?.initWidgets === 'function') yotpo.initWidgets();
  if (typeof legacy?.initWidgets === 'function') legacy.initWidgets();
  if (typeof yotpo?.initWidgets !== 'function' && typeof legacy?.initWidgets !== 'function' && attempts < 10) {
    setTimeout(() => initWidgetWhenReady(attempts + 1), 1000);
  }
}

onMounted(() => {
  if (!('IntersectionObserver' in window)) {
    showWidget.value = true;
    return;
  }
  observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    showWidget.value = true;
    nextTick(() => initWidgetWhenReady());
  }, { rootMargin: '600px 0px' });
  observer.observe(section.value);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>
@media(max-width: 768px) {
  :deep(.yotpo-pictures-gallery-title) {
    font-size: .875rem !important;
    line-height: 1.25rem !important;
  }
}
</style>