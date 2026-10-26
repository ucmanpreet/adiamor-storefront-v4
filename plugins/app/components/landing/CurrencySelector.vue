<template>
    <div class="relative" v-click-outside="closePopover">
        <!-- Trigger -->
        <button
            type="button"
            ref="triggerBtn"
            @click="togglePopover"
            @keydown.esc="closePopover"
            :aria-expanded="open.toString()"
            aria-haspopup="listbox"
            aria-label="Change your shipping country and currency"
            class="flex items-center gap-1.5 px-2.5 py-1.5 text-white text-[11px] uppercase tracking-[0.09em] font-gill-sans hover:bg-white/10 hover:border-white/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-700 cursor-pointer"
        >
            <Icon v-if="lowerCaseCode" :name="`flags/${lowerCaseCode}`" class="w-[18px] h-[18px] rounded-full flex-shrink-0" aria-hidden="true" />
            <span>{{ currencyName }}</span>
            <svg
                class="w-2.5 h-2.5 opacity-60 flex-shrink-0 transition-transform duration-200"
                :class="{ 'rotate-180': open }"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
            >
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>

        <!-- Popover -->
        <FocusTrap
            v-if="open"
            :active="true"
            :escape-deactivates="false"
            :initial-focus="() => $refs.searchInput"
            :fallback-focus="() => $refs.popover"
            @deactivate="closePopover"
        >
        <div
            v-show="open"
            ref="popover"
            id="cs-listbox"
            role="listbox"
            aria-label="Select your country and currency"
            :aria-hidden="(!open).toString()"
            class="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl border border-stone-200 z-[70] overflow-hidden"
            @keydown.esc.stop="closePopover"
            tabindex="-1"
        >
            <!-- Search -->
            <div class="p-3 border-b border-stone-100">
                <div class="relative">
                    <svg
                        class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.5" />
                        <path d="M11 11L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                    <input
                        ref="searchInput"
                        v-model="searchQuery"
                        type="text"
                        placeholder="Search country..."
                        aria-label="Search countries"
                        aria-controls="cs-listbox"
                        aria-autocomplete="list"
                        autocomplete="off"
                        class="w-full pl-8 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-md text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        @keydown.down.prevent="focusOption(0)"
                        @keydown.esc.stop="closePopover"
                    />
                </div>
                <p class="sr-only" aria-live="polite" aria-atomic="true">
                    {{ filteredCountries.length }} {{ filteredCountries.length === 1 ? 'country' : 'countries' }} available
                </p>
            </div>

            <!-- Options -->
            <ul class="max-h-60 overflow-y-auto py-1" role="group">
                <template v-if="filteredCountries.length">
                    <li
                        v-for="(country, index) in filteredCountries"
                        :key="country.code"
                        role="option"
                        :aria-selected="country.code === currentCountry"
                    >
                        <button
                            type="button"
                            :ref="`opt-${index}`"
                            @click="selectCountry(country.code)"
                            @keydown.down.prevent="focusOption(index + 1)"
                            @keydown.up.prevent="index === 0 ? focusSearch() : focusOption(index - 1)"
                            @keydown.esc.stop="closePopover"
                            @focus="announceOption(country)"
                            class="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-left min-h-[44px] border-l-[3px] transition-colors focus:outline-none focus:bg-blue-50"
                            :class="country.code === currentCountry
                                ? 'bg-blue-50 border-l-primary'
                                : 'border-l-transparent hover:bg-stone-50'"
                        >
                            <Icon :name="`flags/${country.flag}`" class="w-5 h-5 rounded-full flex-shrink-0" aria-hidden="true" />
                            <span
                                class="flex-1 text-sm"
                                :class="country.code === currentCountry ? 'text-primary font-medium' : 'text-stone-800 font-normal'"
                            >{{ country.name }}</span>
                            <span
                                class="text-[11px] uppercase tracking-wider"
                                :class="country.code === currentCountry ? 'text-primary/70' : 'text-stone-400'"
                            >{{ country.currency }}</span>
                            <Icon
                                v-if="country.code === currentCountry"
                                name="check"
                                class="w-3.5 h-3.5 text-primary flex-shrink-0"
                                aria-hidden="true"
                            />
                        </button>
                    </li>
                </template>
                <li v-else class="px-4 py-6 text-sm text-stone-400 text-center" role="option" aria-selected="false">
                    No countries match "<span class="font-medium text-stone-600">{{ searchQuery }}</span>"
                </li>
            </ul>

            <!-- Footer -->
            <div class="border-t border-stone-100 px-4 py-2.5">
                <NuxtLink
                    :to="STATIC_ROUTES.POLICIES_SHIPPING_INTERNATIONAL"
                    @click="closePopover"
                    class="text-xs text-stone-500 hover:text-primary transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded block text-center"
                >
                    International Shipping Policy
                </NuxtLink>
            </div>
        </div>
        </FocusTrap>
    </div>
</template>

<script>
import countryList from '@/static/js/countryList.js';
import Icon from '~/components/common/Icon.vue';
import { FocusTrap } from 'focus-trap-vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

export default {
    name: 'CurrencySelector',
    components: { Icon, FocusTrap },
    data() {
        return {
            STATIC_ROUTES,
            open: false,
            searchQuery: '',
            countryListData: countryList,
            currentCountry: '',
            selectedCountry: '',
            currencyName: '',
        };
    },
    computed: {
        lowerCaseCode() {
            return this.currentCountry?.toLowerCase();
        },
        filteredCountries() {
            if (!this.searchQuery.trim()) return this.countryListData;
            const q = this.searchQuery.toLowerCase();
            return this.countryListData.filter(
                (c) => c.name.toLowerCase().includes(q) || c.currency.toLowerCase().includes(q)
            );
        },
    },
    mounted() {
        const cookieData = this.$cookies.get('countryData');
        if (cookieData?.code) {
            this.currentCountry = cookieData.code;
            this.currencyName = cookieData.currency;
            this.$store.commit('setPhoneNumber', cookieData.phone);
            this.$store.commit('setCountryReady', true);
        } else {
            this.resolveCountry();
        }
    },
    methods: {
        togglePopover() {
            this.open ? this.closePopover() : this.openPopover();
        },
        openPopover() {
            this.open = true;
            this.searchQuery = '';
            this.$bus.emit(
                'aria-announce',
                `Country selector expanded. ${this.countryListData.length} countries available. Type to search, use arrow keys to navigate.`
            );
        },
        closePopover() {
            if (!this.open) return;
            this.open = false;
            this.searchQuery = '';
            this.$bus.emit('aria-announce', 'Country selector closed.');
            this.$nextTick(() => this.$refs.triggerBtn && this.$refs.triggerBtn.focus());
        },
        focusSearch() {
            this.$refs.searchInput && this.$refs.searchInput.focus();
        },
        focusOption(index) {
            if (index >= this.filteredCountries.length) return;
            this.$nextTick(() => {
                const el = this.$refs[`opt-${index}`];
                const btn = Array.isArray(el) ? el[0] : el;
                btn && btn.focus();
            });
        },
        announceOption(country) {
            const selected = country.code === this.currentCountry ? ', currently selected' : '';
            this.$bus.emit('aria-announce', `${country.name}, ${country.currency}${selected}. Press Enter to select.`);
        },
        selectCountry(code) {
            this.selectedCountry = code;
            this.changeCountryData();
        },
        changeCountryData() {
            this.currentCountry = this.selectedCountry;
            this.assignCountryCookie(this.currentCountry);
            const selected = this.countryListData.find(c => c.code === this.currentCountry);
            if (selected) {
                this.$bus.emit('aria-announce', `${selected.name} selected. Page will reload.`);
            }
            this.$router.go();
            this.closePopover();
        },
        async resolveCountry() {
            try {
                const locationData = await this.$getLocation();
                this.assignCountryCookie(locationData?.country ?? 'US');
            } catch {
                this.assignCountryCookie('US');
            } finally {
                this.$store.commit('setCountryReady', true);
            }
        },
        assignCountryCookie(code) {
            const selectedCountry = this.countryListData.find((country) => country.code === code);
            if (this.$cookies && selectedCountry) {
                this.currencyName = selectedCountry.currency;
                this.selectedCountry = selectedCountry.code;
                this.currentCountry = selectedCountry.code;
                this.$cookies.set('countryData', selectedCountry, {
                    path: STATIC_ROUTES.HOME,
                    maxAge: 60 * 60 * 24 * 7,
                });
                this.$store.commit('setPhoneNumber', selectedCountry?.phone);
            } else {
                this.selectedCountry = this.currentCountry = 'US';
                if (!this.currencyName) this.currencyName = 'USD';
                this.$store.commit('setPhoneNumber', '877-627-5094');
            }
        },
    },
};
</script>
