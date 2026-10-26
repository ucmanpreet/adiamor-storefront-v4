<template>
    <div class="relative inline-block text-left ml-auto w-auto max-w-none">
        <div class="flex gap-2 items-center text-sm">
            <label :for="selectId" class="cursor-pointer whitespace-nowrap">Sort By: </label>
            <select :id="selectId" name="sort-by"
                class="block bg-white py-[0.563rem] px-1 sm:px-4 text-xs sm:text-sm placeholder:text-sm placeholder:text-gray-black border border-gray-200 cursor-pointer w-full min-w-[157px]"
                @change="emit('change', $event)"
                @focus="onFocus"
                @keydown="onKeydown"
                @click="onClick">
                <option v-for="(item, index) in sortOpt"
                    :selected="item.colName == sortByColumn && item.colValue == sortByDir" :key="index"
                    :value="item.code">{{ item.value }}
                </option>
            </select>

            <!-- Screen reader announcements -->
            <span ref="ariaLive" role="status" aria-live="polite" aria-atomic="true" class="sr-only"></span>
            <span class="sr-only hidden sm:block" aria-live="polite">
                Sorted by {{ selectedSort }}
            </span>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(['sortOpt', 'sortByColumn', 'sortByDir']);
const emit = defineEmits(['change', 'open']);

const selectId = ref(`sort-by-${Math.random().toString(36).slice(2)}`);
const selectedSort = ref(null);
const ariaLive = ref(null);

onMounted(() => {
    const selected = Array.isArray(props.sortOpt)
        ? props.sortOpt.find(item =>
            item.colName === props.sortByColumn &&
            item.colValue === props.sortByDir
            )
        : null;

    selectedSort.value = selected?.code || null;
});

function announce(message) {
    const el = ariaLive.value;
    if (!el) return;
    el.textContent = '';
    nextTick(() => { el.textContent = message; });
}
function onKeydown(e) {
    if (e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        announce('Press Up and Down arrow to select option.');
    }
}
function onFocus() {
    announce('Press Up and Down arrow to select option.');
    emit('open');
}
function onClick() {
    emit('open');
}
</script>
