<template>
    <ul class="text-xs hidden sm:flex flex-wrap gap-y-1 gap-x-3.5 pb-4" v-if="appliedFilterJson" role="list" aria-label="Applied filters">
        <li
            v-for="(items, key, index) in appliedFilterJson"
            :key="`key_${index}_${key}`"
            class="flex gap-2 flex-wrap items-center hover:text-primary"
        >
            <!-- Shape filters -->
            <template v-if="isExcludeCode(key) || isSettingFilter">
                <div
                    v-for="el in items"
                    :key="el.value || el.label"
                    class="flex items-center capitalize"
                >
                    <span>{{ el.label }}</span>
                    <button
                        type="button"
                        class="inline-flex items-center"
                        @click="remove(el, key)"
                        :aria-label="`Remove filter ${el.label}`"
                    >
                        <Icon name="close" class="text-gray-600 w-4 h-4 hover:text-gray-black" aria-hidden="true"  />
                    </button>
                </div>
            </template>

            <!-- Other filters -->
            <template v-else>
                <div class="flex items-center capitalize" v-if="key == 'search'">
                    <span>{{ key }} : <span class="sr-only">for</span> {{ items }}</span>
                    <button type="button" @click="remove(null,key)" :aria-label="`Remove filter ${key} ${items}`">
                        <Icon name="close" class="text-gray-600 w-4 h-4 hover:text-gray-black" aria-hidden="true"  />
                    </button>
                </div>
                <div class="flex items-center capitalize" v-else>
                    <span>{{ getValue(items, key) }} <span class="sr-only">for</span> {{ getLabel(key) }}</span>
                    <button type="button" @click="remove(null,key)" :aria-label="`Remove filter ${getLabel(key)} ${getValue(items, key)}`">
                        <Icon name="close" class="text-gray-600 w-4 h-4 hover:text-gray-black" aria-hidden="true"  />
                    </button>
                </div>
            </template>
        </li>

        <!-- Reset Filters -->
        <li>
            <Button type="button" colorType="link" class="!p-0 text-xs sm:text-sm font-normal text-gray-900 flex gap-1"
                @click="$emit('clearFilter')" aria-label="Reset all applied filters">
                Reset Filters
                <Icon name="reset" class="w-4 h-4" aria-hidden="true"  />
            </Button>
        </li>
    </ul>
</template>

<script>
import Button from "~/components/common/Button.vue";
import Icon from "~/components/common/Icon.vue";
export default {
    name: "AppliedFilter",
    components: { Button, Icon },
    props: {
        appliedFilterJson: {
            type: Object,
            default: () => ({})
        },
        filterList: {
            type: Object,
            default: () => ({})
        }
    },

    computed: {
        // Cache filter labels for O(1) lookup
        filterLabelMap() {
            const map = {};
            Object.values(this.filterList).forEach(f => {
                map[f.code] = f.text;
            });
            return map;
        },
        isSettingFilter() {
            return this.$route.params?.prefix != 'diamonds';
        }
    },

    methods: {
        isExcludeCode(key) {
            return key?.includes("shape") || key?.includes("authority");
        },

        remove(item, key) {
            this.$emit("removeFilter", { item, key });
        },

        getLabel(key) {
            return this.filterLabelMap[key] || key;
        },

        getValue(items, key) {
            if (!Array.isArray(items) || !items.length) return null;

            // Single range value
            if (items.length === 1 && items[0]?.min != null) {
                const { min, max } = items[0];

                if (key === "price") {
                    return `${this.$formatPrice(min)} - ${this.$formatPrice(max)}`;
                }

                if (key.includes("carat")) {
                    return `${min.toFixed(2)} - ${max.toFixed(2)}`;
                }

                return `${min} - ${max}`;
            }

            // Multiple discrete values
            if (items.length > 1) {
                const labels = items?.map(i => i?.label)?.filter(label => label && !label.includes('front_none'));
                if (labels?.length === 0) return null;
                const firstLabel = labels[0];
                const lastLabel = labels[labels.length - 1];
                return labels.length > 1 ? `${firstLabel} - ${lastLabel}` : firstLabel;
            }

            return items[0]?.label || items[0];
        }
    },
};

</script>