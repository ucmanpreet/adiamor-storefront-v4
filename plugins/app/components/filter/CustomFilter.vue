<template>
    <div class="filter" :class="{ 'xl:block': isFilter }">
        <!-- Desktop Filters -->
        <div class="flex-none h-full pb-4" :class="{ 'h-dvh': !isDiamondFilter }" >
            <div class="fixed inset-0 bg-black/60 sm:bg-black/20 touch-none" :class="{ 'z-65 xl:hidden': isDiamondFilter, 'z-65': !isDiamondFilter }" @click.prevent="closeFilter" v-if="isFilter" aria-hidden="true"></div>
            <form @submit.prevent id="filterForm" role="dialog"
                aria-modal="true"
                aria-labelledby="filter-heading"
                @keydown.esc.stop.prevent="closeFilter"
                class="fixed xl:sticky bottom-0 left-0 bg-white w-full rounded-t-2xl sm:rounded-none sm:w-[21.875rem] flex-none border-r border-b border-gray-200 sm:h-full xl:h-auto flex flex-col sm:!translate-y-0 transition-transform duration-700 ease-in-out overflow-hidden touch-none"
                :class="{
                    'translate-y-0': isFilter,
                    'translate-y-full': !isFilter,
                    '!fixed md:inset-y-0 z-65': !isDiamondFilter,
                    'xl:top-0 xl:max-h-screen z-[999] xl:z-50' : isDiamondFilter,
                    'h-[calc(100dvh-187px)] sm:h-auto': isDiamondFilter
                }">
                <h2 id="filter-heading" class="text-lg font-medium py-3 sm:py-[1.125rem] flex items-center justify-between px-5 border-b border-gray-200 bg-[#f0f3f8]" ref="filterHeader">
                    <span class="inline-block">Filters</span>
                    <div class="flex items-center gap-4" :class="{'xl:hidden' : isDiamondFilter}">
                        <button type="button" ref="closeBtn" aria-label="Close filters" class="p-2 focus:ring-2 focus:ring-primary" @click="closeFilter">
                            <Icon name="close" class="w-7 h-7 text-gray-600 cursor-pointer" />
                        </button>
                    </div>
                </h2>
                <div
                    ref="filtersScroll"
                    class="divide-y divide-gray-200 overflow-auto flex-1 px-5 scroll-smooth max-h-[calc(100dvh-15.5rem)] sm:max-h-none">
                    <div class="pt-3 pb-2" v-if="isDiamondFilter && !isPairFilter">
                        <div class="relative">
                            <Icon name="search" class="absolute top-2.5 left-3 h-4 w-4" />
                            <label for="itemCertificate" class="sr-only">
                                Search by item or certificate number
                            </label>
                            <InputField type="text" name="itemCertificate" id="itemCertificate"
                                inputClass="py-2 pl-9 !border-none !outline-none"
                                :placeholder="'Item or Certificate Number'" v-model="search" />
                        </div>
                    </div>
                    <Accordion :title="filter?.text" :code="filter?.code" :isOpen="currentOpen.includes(filter?.code)"
                        @toggle="handleToggle(filter?.code)" v-for="(filter, key, index) in getBasicFilters" :key="`${key}-${index}-${filter?.code}-${isFilter}`" :parentClass="'hidden md:block'" :type="'search'">
                        <div class="flex gap-4 pt-2 pb-6 text-sm range-slider-padding">
                            <IconFilter v-if="filter?.type == 'icon' && filter.value.length" :filter="filter"
                                className="pt-2 -my-2 grid grid-cols-4 gap-y-1 gap-x-2 w-full"
                             @setMobileFilters="setMobileState" :selectedFilterValue="getFilterValue(filter?.code)"/>
                            <ColorPallete v-if="filter?.type == 'color_pattern' && filter.value.length" :filter="filter"
                                :showName="true" @setMobileFilters="setMobileState" :selectedFilterValue="getFilterValue(filter?.code)"/>
                            <CombinedRadioCheckbox
                                :className="filter.code == 'diamond_color_grade' ? 'grid-cols-3' : 'grid-cols-2'"
                                v-if="(filter?.type == 'checkbox' || filter?.type == 'radio') && filter.value.length && !rangeWithtext.includes(filter.code)"
                                :filter="filter" :type="filter?.type" :name="filter?.text" class="text-xs" @setMobileFilters="setMobileState" :selectedFilterValue="getFilterValue(filter?.code)"/>
                            <RangeSlider
                                v-if="filter?.type == 'range' && filter.value.length && !rangeWithtext.includes(filter.code)"
                                :filter="filter" @setMobileFilters="setMobileState" :selectedFilterValue="getFilterValue(filter?.code)"/>
                            <!--v-if="rangeWithtext.includes(filter.code) && filter?.type == 'range' && filter.value.length"-->
                            <RangeTextSlider
                                v-if="rangeWithtext.includes(filter.code) && filter?.code != 'diamond_cut_grade'"
                                :filter="filter"
                                @setMobileFilters="setMobileState"
                             :selectedFilterValue="getFilterValue(filter?.code)"/>
                            <RangeTextSlider
                                v-if="rangeWithtext.includes(filter.code) && filter?.code == 'diamond_cut_grade'"
                                :filter="getCaratOptions(filter)"
                                :key="filter.code + (reRenderComponent[filter.code] || 0)"
                                :updateSlider="reRenderComponent[filter.code] || 0"
                                @setMobileFilters="setMobileState"
                             :selectedFilterValue="getFilterValue(filter?.code)"/>
                            <CombinedRadioCheckbox
                                v-if="!['checkbox', 'radio', 'range', 'icon', 'color_pattern'].includes(filter?.type) && filter?.value?.length"
                                :filter="filter" :type="'checkbox'" :name="filter?.text" class="text-xs" @setMobileFilters="setMobileState"/>
                        </div>
                    </Accordion>
                    <template v-if="isDiamondFilter">
                        <button type="button"
                            ref="advancedHeader"
                            class="flex justify-between items-center py-2 sm:py-[1.125rem] border-b border-gray-200 bg-[#f0f3f8] px-4 w-full"
                            :class="{ 'mb-4': !openAdvancedFilter }"
                            @click="toggleAdvancedFilters"
                            :aria-expanded="openAdvancedFilter.toString()"
                            aria-controls="advanced-filter-section"
                        >
                            <h3 class="text-xs font-semibold uppercase tracking-wider text-stone-600 group-hover:text-stone-800 transition-colors">Advanced Filters</h3>
                            <Icon name="uni-sort" class="w-6 h-6" />
                        </button>
                        <Accordion v-show="openAdvancedFilter" :title="filter?.text" :code="filter?.code" :isOpen="currentOpen.includes(filter?.code)"
                          @toggle="handleToggle(filter?.code)" v-for="(filter, key, index) in getAdvanvedFilters" :key="`${key}-${index}-${filter?.code}-${isFilter}`" :parentClass="'hidden md:block'" :type="'search'">
                          <div class="flex gap-4 pt-2 pb-6 text-sm range-slider-padding">
                              <IconFilter v-if="filter?.type == 'icon' && filter.value.length" :filter="filter"
                                  className="pt-2 -my-2 grid grid-cols-4 gap-y-1 gap-x-2 w-full"
                               @setMobileFilters="setMobileState" :selectedFilterValue="getFilterValue(filter?.code)"/>
                              <ColorPallete v-if="filter?.type == 'color_pattern' && filter.value.length" :filter="filter"
                                  :showName="true" @setMobileFilters="setMobileState" :selectedFilterValue="getFilterValue(filter?.code)"/>
                              <CombinedRadioCheckbox
                                  :className="filter.code == 'diamond_color_grade' ? 'grid-cols-3' : 'grid-cols-2'"
                                  v-if="(filter?.type == 'checkbox' || filter?.type == 'radio') && filter.value.length && !rangeWithtext.includes(filter.code)"
                                  :filter="filter" :type="filter?.type" :name="filter?.text" class="text-xs" @setMobileFilters="setMobileState" :selectedFilterValue="getFilterValue(filter?.code)"/>
                              <RangeSlider
                                  v-if="filter?.type == 'range' && filter.value.length && !rangeWithtext.includes(filter.code)"
                                  :filter="filter" @setMobileFilters="setMobileState"  :selectedFilterValue="getFilterValue(filter?.code)"/>
                              <!--v-if="rangeWithtext.includes(filter.code) && filter?.type == 'range' && filter.value.length"-->
                              <RangeTextSlider v-if="rangeWithtext.includes(filter.code) && filter?.value?.length"
                                  :filter="filter" @setMobileFilters="setMobileState" :selectedFilterValue="getFilterValue(filter?.code)"/>
                              <CombinedRadioCheckbox
                                  v-if="!['checkbox', 'radio', 'range', 'icon', 'color_pattern'].includes(filter?.type) && filter?.value?.length"
                                  :filter="filter" :type="'checkbox'" :name="filter?.text" class="text-xs" @setMobileFilters="setMobileState" :selectedFilterValue="getFilterValue(filter?.code)"/>
                          </div>
                        </Accordion>
                       <WithMediaCheckBox @setMobileFilters="setMobileState"/>
                    </template>
                </div>
                <div class="bg-white p-4 border-t border-gray-200">
                    <Button type="button" @click="applyMobileFilter"
                        class="abolute bottom-0 inset-x-0 sm:hidden flex items-center w-full justify-center text-xs font-light !py-3 border-t border-gray-200">
                        View Results
                    </Button>
                </div>
            </form>
        </div>
        <RecaptchaV3 v-if="checkIfRecaptcha" :siteKey="getSiteKey" @reCaptchaVerified="callApiNow" />
    </div>
</template>
<script>
import { debounce, uniqBy } from '~/utils/debounce.js';
import { advancedFilters, topPanelFilter, diamondDynamicFilter } from '~/static/js/recommendedFilters';
import { FocusTrap } from 'focus-trap-vue';
import Icon from "~/components/common/Icon.vue";
import InputField from "~/components/ui/InputField.vue";
import Accordion from "~/components/ui/Accordion.vue";
import IconFilter from "~/components/filter/IconFilter.vue";
import ColorPallete from "~/components/filter/ColorPallete.vue";
import CombinedRadioCheckbox from "~/components/ui/CombinedRadioCheckbox.vue";
import RangeSlider from "~/components/common/RangeSlider.vue";
import RangeTextSlider from "~/components/common/RangeTextSlider.vue";
import Button from "~/components/common/Button.vue";
import RecaptchaV3 from "~/components/form/RecaptchaV3.vue";
import WithMediaCheckBox from "~/components/filter/WithMediaCheckBox.vue";
import { cleanPostfix } from "~/utils/universalHelper";
export default {
    name : 'CustomFilter',
    components: { FocusTrap, Icon, InputField, Accordion, IconFilter, ColorPallete, CombinedRadioCheckbox, RangeSlider, RangeTextSlider, Button, RecaptchaV3, WithMediaCheckBox },
    props: ['isFilter', 'filterList', 'filterData'],
    data() {
        return {
            currentOpen: [], // Tracks the currently open accordion (1, 2, or 3)
            selectedFilter: {},
            showDropdown: false,
            rangeGroup: null,
            reRenderComponent: {},
            renderIt: false,
            search: '',
            showRecaptcha: false,
            recatchaVerified: false,
            rangeWithtext: ['diamond_cut_grade', 'diamond_color_grade', 'diamond_clarity_grade', 'diamond_polish', 'diamond_symmetry', 'diamond_fluorescence'],
            isRecaptchaVerified: false,
            debounceRecaptcha: false,
            openAdvancedFilter: false,
            mobileFilters: {},
            isXlScreen: import.meta.client ? window.innerWidth >= 1280 : false
        };
    },
    computed: {
        isDiamondFilter() {
			return this.$route.params?.prefix === 'diamonds';
		},
        checkIfRecaptcha() {
            let recaptchaset = this.$store.getters.getReCaptchaVerified;
            return !recaptchaset && this.isDiamondFilter && this.search && this.debounceRecaptcha;
        },
        getSiteKey() {
            return this.$config.public.searchRecaptchaSiteKey;
        },
        isPairFilter() {
            return this.$route.params?.prefix?.toLowerCase() === 'diamonds' && cleanPostfix(this.$route.params?.postfix?.toLowerCase()) === 'diamond-pair';
        },
        getModifiedFilters(){
            return typeof this.filterList === 'object' && Object.keys(this.filterList).length ? this.filterList : {};
        },
        getBasicFilters() {
            let filters = this.getModifiedFilters;
            if(!this.isDiamondFilter) return filters;
            // Get Basic Filters
            if(this.$isMobile) return Object.values(filters).filter((filter) => !topPanelFilter.includes(filter.code) && !advancedFilters.hasOwnProperty(filter.code));
            return Object.values(filters).filter(
                (filter) => !advancedFilters.hasOwnProperty(filter.code)
            );
        },
        getAdvanvedFilters() {
            let filters = this.getModifiedFilters;
            if(!this.isDiamondFilter) return filters;
            // Get Advanced Filters
            return Object.values(filters).filter(
                (filter) => advancedFilters.hasOwnProperty(filter.code)
            );
        },
    },
    watch: {
        'filterData': {
            handler(newValue, oldValue) {
                this.assignAdvancedFilter();
            },
            deep: true,
            immediate: true
        },
        search: debounce(function (newVal, oldVal) {
            this.isRecaptchaVerified = this.$store.state.reCaptchaVerified;
            //add recaptcha
            this.debounceRecaptcha = true;
            if(newVal != oldVal && this.isRecaptchaVerified) {
                this.debounceRecaptcha = false;
                this.setFiltersForApi();
            }
        }, 400),
        '$store.state.reCaptchaVerified': {
            handler(newValue, oldValue) {
                this.isRecaptchaVerified = newValue;
            }
        },
        isFilter(newVal) {
            this.disableOuterScroll();
        },
        // Watch for shape changes to manage the Excellent/Affinity sync
        '$route.query.diamond_shape': {
            async handler(newShapeQuery, oldShapeQuery) {
                if (!newShapeQuery || newShapeQuery === oldShapeQuery) return;
                let filterCode = 'diamond_cut_grade';
                const selectedShapes = newShapeQuery.split(',');
                const currentFilters = this.$store.getters.getFilters;
                const cutGrades = currentFilters?.diamond_cut_grade || [];

                // Get configuration from recommendedFilters.js
                const config = diamondDynamicFilter[filterCode];
                if (!config) return;

                // shouldExclude is true if the current selection only contains "Fancy" shapes
                const shouldExclude = selectedShapes.length > 0 &&
                                    selectedShapes.every(shape => config.excludeFor.includes(shape));

                const hasExcellent = cutGrades.some(g => g.code === 'excellent');
                const hasAffinity = cutGrades.some(g => g.code === 'affinity');

                // CASE: Moving to a shape that ALLOWS Affinity (e.g., Round)
                if (!shouldExclude && hasExcellent && !hasAffinity) {
                    await this.handleAutoGradeUpdate(filterCode, 'affinity', true);
                    return;
                }
                // CASE: Moving to a shape that EXCLUDES Affinity (e.g., Pear)
                else if (shouldExclude && hasAffinity) {
                    await this.handleAutoGradeUpdate(filterCode, 'affinity', false);
                    return;
                }

                // CASE: Shape change but no previous carat selection done
                if (this.reRenderComponent[filterCode] !== undefined) {
                  this.reRenderComponent[filterCode] = this.reRenderComponent[filterCode] + 1;
                }
            },
        },
        '$route.query.search': {
            async handler(newCaratQuery, oldCaratQuery) {
                if (newCaratQuery === oldCaratQuery) return;
                this.search = newCaratQuery;
            },
        },
    },
    methods: {
        getFilterValue(code) {
            return this.filterData ? this.filterData[code] : null;
        },
        setMobileState({ key, value }) {
            this.mobileFilters[key] = value;
        },
        getCaratOptions(filter) {
            if (!filter || !filter.code || !this.filterList) return filter;

            const filterData = this.$store.getters.getFilters;
            const config = diamondDynamicFilter[filter.code];
            if (!config) return filter;

            const { targetCode, exclude, excludeFor } = config;

            if(!filterData || !Object.keys(filterData).length || !filterData[targetCode]) return filter;
            const selectedShapes = filterData[targetCode]?.map(item => item?.code) || [];

            const shouldExclude = selectedShapes.length > 0 &&
                                selectedShapes.every(shape => excludeFor.includes(shape));

            // Pull from master filterList to ensure array stability
            const originalFilter = Object.values(this.filterList).find(f => f.code === filter.code);
            const masterValues = originalFilter ? originalFilter.value : filter.value;

            return {
                ...filter,
                value: shouldExclude
                    ? masterValues.filter(item => !exclude.includes(item.code))
                    : masterValues
            };
        },
        toggleAdvancedFilters() {
            try {
                this.openAdvancedFilter = !this.openAdvancedFilter;
                if(this.openAdvancedFilter){
                    this.$store.dispatch('runGtmEvent', { store: this.$store, action_type : 'viewed_advanced_search_filter' });
                }
                this.$nextTick(() => {
                    const container = this.$refs.filtersScroll;
                    const headerEl = this.$refs.advancedHeader;
                    if (!container) return;
                    if (headerEl && headerEl.offsetParent) {
                       setTimeout(() => {
                            let height = 66;
                            if(this.$refs.filterHeader && this.$refs.filterHeader.offsetParent) {
                                height = this.$refs.filterHeader.offsetHeight;
                            }
                            const headerTop = headerEl.offsetTop - height;
                            // Smooth scroll
                            container.scrollTo({
                                top: headerTop,
                                behavior: 'smooth'
                            });
                        }, 50);
                    }
                });
            } catch (e) {
            }
        },
        callApiNow() {
            this.isRecaptchaVerified = true;
            this.setFiltersForApi();
        },
        setFiltersForApi() {
            let data = { key: 'search', value: this.search };
            if(this.$isMobile) {
                this.setMobileState(data);
                return;
            }
            if(this.search) this.$emit('resetFilters');
            this.$store.commit('setFilters', { key: 'search', value: this.search });
            this.$store.commit('setFilterCount');
        },
        closeFilter() {
            document.body.style.overflow = '';
            this.$emit('closeFilter');
            this.mobileFilters = {};
        },
        handleToggle(key) {
            // this.currentOpen = this.currentOpen === filter?.code ? null : filter?.code;
            this.currentOpen = this.currentOpen.includes(key) ? this.currentOpen.filter(code => code !== key) : [...this.currentOpen, key];
            let gtmEventCode = ['price','material_variation'];
            if(!this.isDiamondFilter && gtmEventCode.includes(key) && this.currentOpen?.includes(key)) {
                this.$emit('callParentGTMEvent',[]);
            }

        },
        formatLabel(label) {
            return (label || '')?.toLowerCase(); // Safely convert to lowercase
        },
        disableOuterScroll() {
            // Only disable scroll if diamond filter is active and screen width <= 768px
            if (this.isDiamondFilter && this.$isMobile) {
                const shouldDisable = this.isFilter;

                document.body.style.overflow = shouldDisable ? 'hidden' : '';
                document.body.style.position = shouldDisable ? 'fixed' : '';
                document.body.style.top = shouldDisable ? '0' : '';
                document.body.style.left = shouldDisable ? '0' : '';
                document.body.style.right = shouldDisable ? '0' : '';
                document.body.style.width = shouldDisable ? '100%' : '';
            }
        },
        applyMobileFilter () {

            // Mobile UI fast respond
            if (this.$isMobile) {
                if(this.mobileFilters?.search) {
                    this.$store.commit('setFilters', { key: 'search', value: this.mobileFilters.search });
                } else {
                    // Commit all stored mobile filters to Vuex store
                    Object.keys(this.mobileFilters).forEach(key => {
                        this.$store.commit('setFilters', { key, value: this.mobileFilters[key] });
                    });
                }

                // Close filter
                this.closeFilter();

                // heavy data update 0ms delay
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$store.commit('setFilterCount');
                    }, 10); // 10ms delay to ensure UI opening is smooth
                });

                return;
            }

            // Desktop normal behavior
            this.$store.commit('setFilterCount');
            this.closeFilter();
        },
        async handleAutoGradeUpdate(filterCode, targetCode, shouldBePresent) {
            const filterData = this.$store.getters.getFilters;
            let currentSelection = [...(filterData[filterCode] || [])];

            const masterFilter = Object.values(this.filterList).find(f => f.code === filterCode);
            const targetObject = masterFilter?.value?.find(v => v.code === targetCode);
            const excellentObject = masterFilter?.value?.find(v => v.code === 'excellent');

            let stateChanged = false;

            if (shouldBePresent) {
                // Add Affinity back into the array (preserves Excellent)
                if (targetObject && !currentSelection.some(item => item.code === targetCode)) {
                    currentSelection.push(targetObject);
                    stateChanged = true;
                }
            } else {
                // Strip Affinity out for Fancy shapes
                currentSelection = currentSelection.filter(item => item.code !== targetCode);
                // Fallback anchor to Excellent if range is now empty
                if (currentSelection.length === 0 && excellentObject) {
                    currentSelection = [excellentObject];
                }

                stateChanged = true;
            }

            if (!stateChanged) return; // Exit if no actual selection change was made

            const finalValues = uniqBy(currentSelection, 'code');

            // 1. Update Vuex State
            this.$store.commit('setFilters', { key: filterCode, value: finalValues });

            // 2. Force Slider Refresh via Key
            if (this.reRenderComponent[filterCode] !== undefined) {
                this.reRenderComponent[filterCode] = this.reRenderComponent[filterCode] + 1;
            }

            // 3. Finalize Bagisto Count/Route
            await this.$nextTick();
            if (!this.$isMobile) {
                this.$store.commit('setFilterCount');
            } else {
                this.setMobileState({ key: filterCode, value: finalValues });
            }
        },
        assignAdvancedFilter() {
             // Open advanced filter if any of the advanced filters are selected
            this.openAdvancedFilter = Object.keys(this.$route.query).some(code =>
                Object.prototype.hasOwnProperty.call(advancedFilters, code)
            );
        }
    },
    mounted() {
        this._onResize = () => { this.isXlScreen = window.innerWidth >= 1280; };
        window.addEventListener('resize', this._onResize);
        if (this.filterList && Object.keys(this.filterList).length) {
            Object.values(this.filterList).forEach((filter) =>
            {
                this.reRenderComponent[filter?.code] = 0;
                this.currentOpen.push(filter?.code);
            });
        }
        let filterData = this.$store.getters.getFilters;
        if (filterData && Object.keys(filterData).length || this.$route.query.search) {
            this.search = filterData?.search ?? this.$route.query.search ?? '';
        }

        this.assignAdvancedFilter();
        this.disableOuterScroll();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this._onResize);
    },
}
</script>