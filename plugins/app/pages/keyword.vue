<template>
    <div>
        <header class="hidden sm:block py-4 sm:py-8 border-b border-gray-200">
            <h1 class="text-center text-base sm:text-2xl uppercase">Keyword Search</h1>
        </header>

        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 py-4 space-y-6">
            <div class="grid grid-cols-1 max-w-3xl mx-auto">
                <input type="text"
                    class="col-start-1 row-start-1 h-12 w-full pl-11 pr-4 text-base text-gray-900 outline-none placeholder:text-gray-600 sm:text-sm border"
                    placeholder="Enter Keyword(s) or item #"
                    role="combobox"
                    :aria-expanded="productList && productList.length > 0 ? 'true' : 'false'"
                    aria-controls="search-results"
                    aria-describedby="search-instructions"
                    @focus="$bus.emit('aria-announce', 'Search input focused. Type to search products and keywords')"
                    v-model="search"
                >
                <svg class="pointer-events-none col-start-1 row-start-1 ml-4 w-5 h-5 self-center text-gray-400"
                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd"
                        d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <p id="search-instructions" class="sr-only text-xs text-gray-500 mt-1">
                Press Enter to search or Escape to clear
            </p>
            <div class="absolute inset-0 bg-black/5 flex items-center justify-center z-20 group-dark" role="status" aria-live="polite" v-if="loading">
                <CustomLoader />
                <span class="sr-only">Searching for results...</span>
            </div>
            <div v-else id="search-results">
                <div class="max-w-3xl mx-auto prose prose-sm sm:prose-base prose-p:text-sm prose-p:mt-1 prose-ul:list-none prose-ul:pl-0 prose-li:pl-0 prose-li:border-b prose-li:border-gray-200"
                    v-show="relatedSearch && relatedSearch.length > 0">
                    <article aria-labelledby="related-heading">
                        <h2 id="related-heading" class="text-lg font-normal border-b pb-2">Related Search</h2>
                        <ul role="list">
                            <li v-for="(item, index) in relatedSearch" :key="index">
                                <NuxtLink
                                    v-if="item.slug"
                                    :to="{ path: `/search/${item.slug}` }"
                                    class="block text-primary hover:text-primary/90 active:text-primary/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 py-1"
                                    @click="$bus.emit('aria-announce', `Searching for ${item?.name}`)"
                                >
                                    {{ item?.name }}
                                </NuxtLink>
                                <p>{{ item?.description }}</p>
                            </li>
                        </ul>
                    </article>
                </div>
                <div class="max-w-3xl mx-auto prose prose-sm sm:prose-base prose-p:text-sm prose-p:mt-1 prose-ul:list-none prose-ul:pl-0 prose-li:pl-0 prose-li:border-b prose-li:border-gray-200"
                    v-show="productList && productList.length > 0">
                    <article aria-labelledby="products-heading">
                        <h2 id="products-heading" class="text-lg font-normal border-b pb-2">Product Search</h2>
                        <ul role="list">
                            <li v-for="(item, index) in productList" :key="index">
                                <NuxtLink
                                    v-if="item.name"
                                    :to="getRedirectUrl(item)"
                                    class="block text-primary hover:text-primary/90 active:text-primary/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 py-1"
                                    @click="$bus.emit('aria-announce', `View product: ${item?.name}`)">
                                    {{ item?.name }}
                                </NuxtLink>
                            </li>
                        </ul>
                    </article>
                </div>

                <template v-if="!loading && !productList.length && !relatedSearch.length">
                    <div class="abolute inset-0 flex flex-col items-center justify-center pt-4 pb-24 gap-5">
                        <NoDataFound :type="search" />
                        <div class="prose prose-sm mx-auto max-w-sm">
                            <p>We couldn't find any results matching your search. Please try one of the options below to
                                find exactly what you're looking for.</p>
                            <ul list-style-type="square" role="list">
                                <li>Try broadening your search.</li>
                                <li>Visit our <NuxtLink :to="STATIC_ROUTES.HOME" @click="$bus.emit('aria-announce', 'Navigated to home page')">Home Page</NuxtLink>.</li>
                                <li>
                                    <NuxtLink :to="STATIC_ROUTES.CONTACT" @click="$bus.emit('aria-announce', 'Navigated to contact page')">Contact us online</NuxtLink> or 
                                    <a :href="`tel:${telPhoneNumber}`" @click="$bus.emit('aria-announce', 'Calling Adiamor customer service')">call us at {{ phoneNumber }}</a> with any
                                    questions.
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>

                <div class="col-span-full pt-2" v-if="!loading && productList && (totalProducts > 10 && totalProducts > productList?.length)" aria-live="polite">
                    <Button type="button" colorType="bordered-primary-fill" :aria-busy="listLoader"
                        @click="page++; $bus.emit('aria-announce', listLoader ? 'Loading more results...' : 'Loading more search results')"
                        class="max-w-xs w-full m-auto sm:max-w-screen-sm">{{ listLoader ?
                            `Loading......` : `Load More` }}</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { debounce } from '~/utils/debounce.js';
import api from '~/api-client/rest-api/index.js';
import CustomLoader from '~/components/ui/CustomLoader.vue';
import NoDataFound from '~/components/common/NoDataFound.vue';
import Button from '~/components/common/Button.vue';
import { redirectionUrl } from '~/utils/universalHelper.js';
import { STATIC_ROUTES } from '~/utils/staticRoutes';
export default {
    name : "KeywordPage",
    components: { CustomLoader, NoDataFound, Button },
    data() {
        return {
            inputSearchShow: false,
            search: '',
            relatedSearch: [],
            productList: [],
            loading: true,
            page: 1,
            listLoader: false,
            totalProducts: 0,
            STATIC_ROUTES
        }
    },
    watch: {
        '$route.query.q': function(newVal, oldVal) {
            this.search = newVal ?? null;
        },
        search: debounce(function (newVal, oldValue) {
            if (newVal) {
                if(newVal != oldValue){
                    this.$router.replace({ query: { q: newVal } });
                    this.$bus.emit('aria-announce', `Searching for: ${newVal}`);
                }
                this.page == 1 ? this.loading = true : '';
                this.handleSearch();
            }
            else {
                this.relatedSearch = [];
                this.productList = [];
                this.inputSearchShow = false; 
                 if (!newVal) {
                    this.$bus.emit('aria-announce', 'Search cleared');
                }
            };
        }, 1500),
        page: function (newVal, oldValue) {
            if (this.search) this.handleSearch();
        }
    },
    methods: {
        getRedirectUrl(item) {
            return redirectionUrl(item);
        },
        handleFocusOut(event) {
            const relatedTarget = event.relatedTarget;
            if (!this.$el.contains(relatedTarget)) {
                this.inputSearchShow = false;
            }
        },
        openSearchInput() {
            this.inputSearchShow = true;  // Show the dropdown
            this.$nextTick(() => {
                let el = document.getElementById('input_field');
                el ? el.focus() : '';
            });
            this.$emit('update:activeDropdown', '');
        },
        highlightText(text) {
            if (!this.search) return text;
            const regex = new RegExp(`(${this.search})`, 'gi');
            return text.replace(regex, `<span class="text-sm font-medium">$1</span>`);
        },
        async handleSearch() {
            try {
                this.page != 1 ? this.listLoader = true : '';
                const response = await api.getRequest(this.$axios, this.$cookies, `search?q=${this.search}&limit=10&page=${this.page}`);
                if (!response) {
                    this.loading = false;
                    this.$bus.emit('aria-announce', 'Search failed. Please try again.');
                    return;
                }
                this.loading = false;
                if (response && response.data && response.status) {
                    if (this.page == 1) {
                        this.productList = response.data.data ?? [];
                        const count = this.productList.length;
                        this.$bus.emit('aria-announce',
                            count > 0
                                ? `See more results: ${count} product${count > 1 ? 's' : ''} found for ${this.search}`
                                : `No results found for ${this.search}`
                        );
                        if (count > 0) {
                            this.$nextTick(() => {
                                setTimeout(() => {
                                    const firstLink = document.querySelector('#search-results a');
                                    if (firstLink) firstLink.focus();
                                }, 1500);
                            });
                        }
                    } else {
                        this.listLoader = false;
                        // this.relatedSearch = [...this.relatedSearch, ...response.data.suggestions] ?? [];
                        this.productList = [...this.productList, ...response.data.data] ?? [];
                        this.$bus.emit('aria-announce', `${response.data.data.length} more products loaded`);
                    }
                    let pagination = response?.data?.pagination;
                    this.totalProducts = pagination ? pagination.total_products : 0;
                    // this.inputSearchShow = false;
                    // this.search = '';
                }
            } catch (error) {
                this.loading = false;
                this.$bus.emit('aria-announce', 'Search error occurred. Please try again.');
                console.log('Get Similar Product Error' + error);
            }
        },
        onClickOutside() {
            this.search = '';
            this.inputSearchShow = false;
            this.loading = true;
            // this.search = '';
        }
    },
    mounted() {
        let queryParams = this.$route.query?.q ?? null;
        if (queryParams){
            this.search = queryParams;
        } else{
            this.loading = false;
            this.$bus.emit('aria-announce', 'Keyword search page loaded. Enter search terms to begin.');
        }
    },
    computed: {
        phoneNumber() {
            return this.$store.state.phoneNumber;
        },
        telPhoneNumber() {
            return this.$store.state.phoneNumber?.replace(/[^+\d]/g, '');
        },
    },
}
</script>