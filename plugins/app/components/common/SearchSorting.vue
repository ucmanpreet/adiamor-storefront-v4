<template>
    <div class="relative inline-block text-left ml-auto w-auto max-w-none">
        <div class="flex gap-2 items-center text-sm">
            <label :for="selectId" class="cursor-pointer whitespace-nowrap">Sort By: </label>
            <select :id="selectId" name="sort-by"
                class="block bg-white py-[0.563rem] px-1 sm:px-4 text-xs sm:text-sm placeholder:text-sm placeholder:text-gray-black border border-gray-200 cursor-pointer w-full min-w-[157px]"
                @change="$emit('change', $event)"
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
<script>
export default {
    name : "SearchSorting",
    props: ['sortOpt', 'sortByColumn', 'sortByDir'],
    data() {
        return {
            selectId: `sort-by-${Math.random().toString(36).slice(2)}`,
            selectedSort: null
        };
    },
    mounted() {
        const selected = Array.isArray(this.sortOpt)
            ? this.sortOpt.find(item =>
                item.colName === this.sortByColumn &&
                item.colValue === this.sortByDir
                )
            : null;

        this.selectedSort = selected?.code || null;
    },
    methods: {
        announce(message) {
            const el = this.$refs.ariaLive;
            if (!el) return;
            el.textContent = '';
            this.$nextTick(() => { el.textContent = message; });
        },
        onKeydown(e) {
            if (e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                this.announce('Press Up and Down arrow to select option.');
            }
        },
        onFocus() {
            this.announce('Press Up and Down arrow to select option.');
            this.$emit('open');
        },
        onClick() {
            this.$emit('open');
        }
    },
}
</script>
