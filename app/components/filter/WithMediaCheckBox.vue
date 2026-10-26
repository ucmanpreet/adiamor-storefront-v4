<template>
  <div class="py-2" :class="className">
    <label class="inline-flex items-center gap-1.5 cursor-pointer relative p-1">
      <input
        type="checkbox"
        :checked="withMedia"
        @change="onChange"
        class="peer h-4 w-4 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="hidden absolute peer-checked:block z-20 pointer-events-none w-4 h-4 text-white"
        aria-hidden="true"
      >
        <path
          d="M10.5858 13.4142L7.75735 10.5858L6.34314 12L10.5858 16.2427L17.6568 9.1716L16.2426 7.75739L10.5858 13.4142Z"
          fill="currentColor"
        />
      </svg>
      <span>Image or Video Available</span>
    </label>
  </div>
</template>

<script setup>
defineProps(['className']);
const emit = defineEmits(['setMobileFilters']);

const route = useRoute();
const router = useRouter();
const { $bus, $isMobile } = useNuxtApp();

const withMedia = computed(() => route.query.with_media !== 'false');

onMounted(() => {
  if (!('with_media' in route.query)) {
    updateQuery(true)
  }
});

function onChange(e) {
  const value = e.target.checked
  $bus.emit('aria-announce', `Image or Video Available filter ${value ? 'enabled' : 'disabled'}`);
  updateQuery(value)
}
function updateQuery(value) {
  const newVal = value ? 'true' : 'false';

  if ($isMobile) {
    emit('setMobileFilters', { key: 'with_media', value: newVal });
    return;
  }

  if (route.query.with_media === newVal) return;

  router.replace({
    query: {
      ...route.query,
      with_media: newVal
    }
  }).catch(() => {});
}
</script>
