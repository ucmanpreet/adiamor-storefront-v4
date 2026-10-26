# Nuxt 4 Migration - Plugin / Package Vetting (Phase A: Analysis only)

Source repo: `/Users/ucodesoft/Sites/adiamor-storefront` (Nuxt 2.15.8, Vue 2.7.10) - **not modified**
Target: `/Users/ucodesoft/Sites/adiamor-storefront-nuxt4` (this folder, empty except this file)
Date: 2026-10-22. Versions below were read from the npm registry today (`npm view`).

## 0. Ground rules (assumed - tell me if wrong)
1. **Same behaviour, same features.** Options API stays (Nuxt 4 / Vue 3 supports it). No redesign, no UX change.
2. **ADA/WCAG behaviour is a hard requirement**: skip link, `#main-content`, global `aria-live` region, focus trap in modals, keyboard handling, NVDA fixes, form error semantics, live announcements.
3. Business logic (`utils/*`, `STATIC_ROUTES`, API calls, coupon logic) is copied unchanged.
4. Nothing gets built until each package below has a verdict, and the virtual scroller is proven in a prototype.

## 1. Verdict legend
- **KEEP** - framework-agnostic, works unchanged
- **UPGRADE** - same package/author, newer Vue 3 version, small API diff
- **REPLACE** - different package, needs code change
- **PROVE** - compatible on paper, must be proven in a prototype before we commit

## 2. Package-by-package vetting

| # | Current (Nuxt 2) | Target (verified on npm today) | Verdict | What we use today | Parity / ADA concern |
|---|---|---|---|---|---|
| 1 | `nuxt` 2.15.8 | `nuxt` 4.6.2 (Vue 3.5.44) | REPLACE | whole app | Node ≥ 20 required (Docker is Node 18) |
| 2 | `vuex` + `vuex-persistedstate` | `pinia` 4.1.0 + `@pinia/nuxt` 1.0.3 + `pinia-plugin-persistedstate` 4.7.1 | REPLACE | 36 getters, 41 mutations, 13 actions, 18 persisted paths under key `persistDataStorage` | Keep same storage key/paths so carts survive release. Alternative: Vuex 4 first (zero store rewrite) |
| 3 | `@nuxtjs/axios` 5 | `axios` 1.20.0 (own plugin) | REPLACE | 39 files, `$axios.onRequest/onError` interceptors (country-ready wait, 429 handling) | Plain `axios` has the same interceptors, so a plugin that provides `$axios` keeps all 39 files unchanged |
| 4 | `vee-validate` 2.2.15 | `vee-validate` 4.15.1 + `@vee-validate/rules` 4.15.1 | REPLACE | 15 files, 3 custom rules (postcode, phoneNumber, password_match) | **ADA-critical**: error messages must keep `aria-describedby`, `role="alert"`/live announcement, focus-first-error. Needs per-form check |
| 5 | `vue-virtual-scroller` 1.1.2 | `vue-virtual-scroller` 3.0.5 (Vue 3 only) or `@tanstack/vue-virtual` 3.13.47 | **PROVE** | see Section 3 | see Section 3 |
| 6 | `vue-slick-carousel` 1.0.6 | `swiper` 14.3.0 or `embla-carousel-vue` 8.6.0 (`vue3-slick-carousel` 1.0.6 last updated 2022 → rejected) | REPLACE | 2 components (ProductCarousel, WeddingCarousel), responsive `settings`, `$refs` slide control | Must reproduce keyboard nav, `aria-label`s, pause/arrow buttons, responsive breakpoints, slide-to behaviour (ProductCarousel line ~379 uses `slidesToShow`) |
| 7 | `focus-trap-vue` 1.1.1 | `focus-trap-vue` 4.1.0 (Vue 3, peer `focus-trap ^7`) | UPGRADE | `ui/Modal.vue` (initial-focus, fallback-focus, escapeDeactivates:false), CustomFilter, CurrencySelector, ImagePreview | **ADA-critical**: same props exist; verify focus return on close |
| 8 | `nuxt-sweetalert2` | `sweetalert2` 11.26.25 (already wrapped by `mixin/sweetAlert.js`) | KEEP/UPGRADE | `createSwalAlert()` in 18 files | Alert `role` / focus behaviour same as today |
| 9 | `@nuxtjs/recaptcha` 1.1.2 (v2 widget; `$recaptcha.getResponse/reset`) | `vue3-recaptcha-v2` 2.1.0 (Vue 3) **or** direct `grecaptcha` API | REPLACE | 2 files (CustomLiveAgentForm, EmailAFriend: 5 calls). `RecaptchaV3.vue` already loads `grecaptcha` manually | Only 5 call sites → direct `grecaptcha` wrapper composable is safest, no extra dependency |
| 10 | `nuxt-svg-loader` | `vite-svg-loader` 5.1.3 (or `nuxt-svgo` 5.3.0) | REPLACE | `Icon.vue` dynamic `import(\`~/assets/svg/${name}.svg\`)` for 107 icons, `<component :is>` | Vite needs `import.meta.glob`; icon `aria-hidden`/`role` attributes unchanged |
| 11 | `@nuxt/image` 0.7.2 + custom `providers/cdn.js` | `@nuxt/image` 2.2.0 | UPGRADE | 42 files `<nuxt-img provider="cdn">`, `?tr=w-,h-,q-,f-` | Provider API (`getImage(src,{modifiers,baseURL})`) is stable; keep alt text/lazy/decoding props |
| 12 | `@nuxtjs/tailwindcss` 4.2.1 + `tailwindcss` 3.3 | `@nuxtjs/tailwindcss` 6.14.0 (Tailwind 3 config unchanged) | UPGRADE | tailwind.config.js (primary, fonts, xs) | `nuxt-purgecss` removed → Tailwind `safelist` for runtime-injected classes (Yotpo, Iubenda, slider) |
| 13 | `cookie-universal-nuxt` | `useCookie` + small `$cookies` shim | REPLACE | 34 files, 79 calls, keys `visitorCode`, `countryData` | Shim keeps `get/set/remove` signature → zero call-site edits |
| 14 | `nouislider` 15.8.1 | same (no Vue dependency) | KEEP | RangeSlider.vue (660 lines), 2 files | Client-only; keep ARIA on handles |
| 15 | `isomorphic-dompurify` 4.6.0 | same (upgrade) | KEEP | `$sanitize` via `Vue.prototype` | → `globalProperties.$sanitize` |
| 16 | `idb` 8.0.4 | same | KEEP | `indexeddb.js` (recently viewed) | Client-only |
| 17 | `mobile-detect` 1.4.5 | same | KEEP | `$isMobile` (36 uses, 25 files) | Static build: server has no UA → detect on client; check hydration flicker/CLS |
| 18 | `libphonenumber-js`, `postcode-validator`, `lodash`, `js-cookie` | same (`lodash-es` optional) | KEEP | utilities | - |
| 19 | `@nuxt/content` 1 | remove (only `content/hello.md`, no `$content` calls) | REMOVE | none | - |
| 20 | `@nuxtjs/pwa` | remove (already disabled) / `@vite-pwa/nuxt` 1.1.1 if wanted | REMOVE | `static/sw.js` 17 lines, `site.webmanifest` | Decide if service worker is still wanted |
| 21 | `nuxt-purgecss`, `@nuxtjs/dotenv`, `url-loader`, `core-js`, `vue-template-compiler`, `vue-server-renderer` | remove | REMOVE | config only | - |
| 22 | `@axe-core/playwright`, `@playwright/test` | keep (dev) | KEEP | a11y suite (8 tests) | Reuse as regression gate |

## 3. Virtual scroller - deep analysis (the high-risk item)

### 3.1 What our code actually uses
Three components render long lists with `DynamicScroller` + `DynamicScrollerItem` (library v1.1.2):

| Component | Scrollers | Props used | Exposed method | Event |
|---|---|---|---|---|
| `DiamondSearchComponent` | grid (`id`) + list (`sku`) | `page-mode`, `min-item-size` 320 / 80, `:buffer` (computed gridBuffer/listBuffer), `:prerender` 6 / 10, `emit-update`, `key-field`, `ref`; item: `:active`, `:data-index`, `:size-dependencies="[expandedSku === item.sku]"` | `scrollToItem(rowIndex)` (restore position after returning from product page) | `@update(start,end,visibleStart,visibleEnd)` |
| `DiamondPairSearchComponent` | list (`pair_id`) | `page-mode`, `:buffer="300"`, `:prerender="20"`, `min-item-size` 80, `emit-update`, `:size-dependencies` | `scrollToItem` | `@update` |
| `SettingSearchComponent` | grid (`id`) | `page-mode`, `min-item-size` 380, `:buffer`, `:prerender="20"`, `emit-update` | `scrollToItem` | `@update` |

Business-critical uses behind those props:
1. **`@update` visible range → GTM `view_item_list` analytics** (`onScrollerUpdate` slices rows by `visibleStartIndex/visibleEndIndex` and fires each SKU once). If the event stops or changes semantics, **analytics silently break**.
2. **`scrollToItem` after back navigation** (`finishRestoration`) - scroll position restore.
3. **Row expand** (list view): `size-dependencies` triggers re-measure; surrounding code also captures `window.scrollY` and restores focus (**ADA**: focus must stay on the toggled row, no scroll jump).
4. **Variable row heights** (cards, expanded details) → must support dynamic measurement.
5. **`page-mode`** (window scroll, not inner box) - page header/filters stay in normal flow; keyboard Tab through rows must follow DOM order.

### 3.2 Option A - `vue-virtual-scroller` 3.0.5 (same library, Vue 3 rewrite)
Verified by downloading the tarball and reading its types/docs/runtime:
- Same component names: `DynamicScroller`, `DynamicScrollerItem`, `RecycleScroller`, **new** `WindowScroller`.
- `scrollToItem(index)` is exposed (also `scrollToPosition`, `findItemIndex`, `getItemOffset`, `cacheSnapshot/restoreCache`, `forceUpdate`).
- `pageMode` exists on `DynamicScroller`; new `scrollParent` prop; docs say new code should prefer `WindowScroller` for page scrolling (but WindowScroller needs fixed/known sizes; ours are measured → stay on `DynamicScroller` + `pageMode`).
- `DynamicScrollerItem.sizeDependencies` is marked **deprecated** ("legacy fallback"): it still exists; v3 re-measures automatically via ResizeObserver → expand/collapse should still resize correctly.
- **Doc/types discrepancy found:** the TypeScript declaration of `DynamicScroller` lists no `buffer`, `prerender`, `emitUpdate`, or `update` event, but the shipped runtime of `DynamicScroller` contains `buffer`, `prerender`, `emitUpdate` and the docs state it "supports the documented RecycleScroller props and exposes the same events". It is **very likely** they work (types may just be incomplete), but **I have not run it** → must be proven.
- Peer: `vue ^3.3.0`. Active (modified 2026-08). Same maintainer as v1.
- v1 → v3 changes we must handle: import CSS path (`vue-virtual-scroller/index.css`), register component names, `$refs` access works the same, `item`/`active`/`index` slot props kept.
- Effect on earlier note `custom-dynamic-scroller.md`: it says v2 beta failed on Vue 2; that is irrelevant on Vue 3 (v3.0.5 is stable and Vue 3-native), so the custom-scroller workaround should **not** be needed.

### 3.3 Option B - `@tanstack/vue-virtual` 3.13.47 (headless fallback)
- Vue 3 (also Vue 2.7 peer), very active (2026-10), framework-neutral core.
- `useWindowVirtualizer` = page-mode equivalent; `estimateSize` (= min-item-size), `overscan` (= buffer), `measureElement` (= dynamic height), `scrollToIndex` (= scrollToItem), `getVirtualItems()` gives start/end → we compute visible indexes ourselves to feed `onScrollerUpdate`.
- Cost: we write the template ourselves (absolute-positioned rows or spacer pattern) in 3 components; `prerender` has no equivalent; focus/Tab order and `aria-setsize/aria-posinset` must be added deliberately (arguably better for ADA, but more work and more regression risk).

### 3.4 Option C - `virtua` 0.53.6
- Vue ≥3.2 supported, handles dynamic sizes, window scroller mode. Less documented for our patterns (visible-range callback, prerender); smaller community → **not first choice**, only if A and B fail.

### 3.5 Recommendation
**Primary: A (`vue-virtual-scroller` 3.0.5)** - smallest diff (props and component names unchanged), same author. **Fallback: B (`@tanstack/vue-virtual`).** Do **not** pick between them on paper: run the prototype below.

### 3.6 Prototype test plan (pass/fail criteria)
Build a throwaway Nuxt 4 page using real `DiamondSearchComponent` markup with 1000+ items:

| # | Test | Pass criteria |
|---|---|---|
| 1 | `buffer`, `prerender`, `emit-update` accepted by `DynamicScroller` v3 | `@update` fires with `(start,end,visibleStart,visibleEnd)` and matches rendered rows |
| 2 | Visible-range analytics | GTM `view_item_list` fires once per SKU, same count as production for the same scroll |
| 3 | Variable heights, expand a row in list view | No jump, no overlap, row re-measured; `window.scrollY` unchanged (±5px) |
| 4 | `scrollToItem(n)` after reload / back from PDP | Lands on correct row within 100 ms |
| 5 | Item recycling flicker | No flash of stale content when sorting/filtering (the issue recorded in the old note) |
| 6 | Keyboard: Tab / Shift+Tab, Enter/Space on row | Focus order = DOM order; focus not lost when rows unmount; `data-row-sku` focus restore works |
| 7 | NVDA + VoiceOver | Announcements ("details expanded") fire once; list semantics intact |
| 8 | Prerender / hydration | No hydration mismatch (wrap in `<ClientOnly>` if needed - list is API-driven client-side anyway) |
| 9 | Mobile Safari/Chrome | Smooth scroll, no CLS spike (Lighthouse CLS ≤ baseline) |
| 10 | 3 components x grid/list | All 4 scroller instances (Diamond grid, Diamond list, Pair list, Setting grid) behave |

If A fails #1-#4 → switch to B and rerun. Decision after the spike, before any other migration work.

## 4. Other plugins (`plugins/*.js`) - vetting

| Plugin | What it does | Nuxt 4 approach | Risk | ADA / behaviour note |
|---|---|---|---|---|
| `veeValidate.js` + `utils/validationRules.js` | register 3 rules with country-aware postcode | `defineRule` in a client plugin | HIGH | error semantics |
| `router.js` | popstate flag, `fetchDynamicMeta` on every navigation (blocking for `searchPage`), cart→thankyou redirect, chunk-error reload | global route middleware + `app:chunkError`/`vite:preloadError` hook | HIGH | page title/meta updates are a WCAG 2.4.2 requirement → must still set title per route |
| `axiosRequest.js` | 429/network-error handling → SweetAlert + redirect home | axios interceptor plugin | MED | alert must stay focus-managed |
| `currencyFilter.js` | `$formatPrice`, `$getCurrencySymbol`, `$waitForCountry` + request interceptor (waits for country, 3 s timeout) | `provide()` + same interceptor | MED | `$formatPrice` is used 86× → keep name |
| `persistedState.client.js` | persist 18 paths | pinia persisted plugin, same key | MED | cart/wishlist continuity |
| `client-init.js` | dispatches `nuxtClientInit` | `app:mounted` hook/plugin | LOW | - |
| `mobile-detect.js` | `$isMobile`, `$isTabAndMobile` | client-only plugin (no `req` on static build) | MED | avoid layout shift |
| `v-click-outside.js` | Vue 2 directive using `vnode.context[binding.expression]` | rewrite with function value (`bind→beforeMount`, `unbind→unmounted`); 13 call sites | MED | dropdown close on click/Escape for ADA |
| `dompurify.js` | `$sanitize` | `globalProperties` | LOW | - |
| `gtm.js`, `gtmframe.js` | inject GTM script/noscript at DOM ready | plugin or `useHead`; keep same insertion order | MED | verify with GTM Preview |
| `gtm-session.client.js` | `begin_session`, `provided_cookie_consent`, tel-link `begin_call` | client plugin | MED | event parity |
| `userProperties.js`, `visitorCode.js`, `ipGeolocation.js` | provide analytics identity / geo fetch | `provide()` | LOW | - |
| `indexeddb.js` | recently viewed (idb v2 DB `storefront-db`) | client plugin, same DB name/version | LOW | data continuity |
| `yotpo.client.js` | re-init Yotpo widgets on every route change using `app.router.afterEach` + store/product check | client plugin with `router.afterEach` | MED | widget markup is third-party; existing CSS overrides in `main.css` stay |
| `iubenda.client.js` | cookie banner config + script load | client plugin | MED | banner accessibility is third-party; keep config identical |

## 5. ADA preservation checklist (carried over to Nuxt 4)
1. `layouts/default.vue`: skip link → `#main-content` (`tabindex="-1"`), global `#global-aria-live` region `aria-live="polite" aria-atomic="true"`.
2. Replace `$root.$emit('aria-announce')` (399 call sites, 76 files; only 3 listeners) with one shared announce bus/composable **without changing message text or timing** ("one message per action, after API success").
3. Payment/checkout events (`$nuxt.$emit`: 8 events, 8 files) → shared emitter.
4. `FocusTrap` modal behaviour (initial focus on heading, no Esc close by trap, focus return).
5. Form error semantics after vee-validate 4 rewrite.
6. `ScrollToTop`, breadcrumbs `head()` JSON-LD / titles.
7. Virtual scroller focus/keyboard tests (3.6 #6-#7).
8. Gate: existing Playwright + axe suite (`tests/a11y/*`) must pass on the new build; manual NVDA pass for the 5 critical flows (search, product, cart, checkout, account).

## 6. Open questions I need answered before building
1. OK to treat "Nuxt 2 features should be used" as **"keep Options API + same features/behaviour"** (not rewrite to Composition API)?
2. Rendering: keep **static prerender + SPA fallback** (as now) or move to SSR?
3. State: **Pinia now** or **Vuex 4 first**? (Vuex 4 reduces risk; Pinia is the Nuxt 4 standard.)
4. Carousel replacement: Swiper or Embla? (needs design/ADA sign-off)
5. Should the PWA/service worker (`static/sw.js`) stay?

## 7. Not verified yet (honest list)
- Whether `DynamicScroller` v3.0.5 really accepts `buffer`, `prerender`, `emit-update` and emits `update` (runtime strings present; types/docs inconsistent) → Section 3.6 tests #1-#2.
- vue-router 4/5 matching of the custom wildcard routes (`/:prefix?/search/:postfix(.*)*`, catch-all).
- Third-party script behaviour under Vite/unhead (Affirm, PayPal, Bolt, Yotpo, Iubenda).
- Cloudflare Worker + Caddy behaviour with the new build output.

## 8. Next step (awaiting your go-ahead)
Phase B = scaffold this folder as a Nuxt 4 project (Node 22), then build **only** the virtual-scroller prototype (Section 3.6) and the shared infrastructure (event/announce bus, axios plugin, cookies shim, persisted store) to prove the stack. No page migration starts until Section 3.6 passes.


---

## 9. PHASE B RESULT - virtual scroller prototype (executed 2026-10-22)

Stack installed in this folder: Nuxt 4.6.2, Vue 3.5.44, Pinia 4.1.0, vue-virtual-scroller 3.0.5, Embla 8.6.0 (+ all vetted packages in Section 2).
Prototype: `app/pages/proto/virtual-scroller.vue` (1500 items, list + grid, `DynamicScroller` + `page-mode`, same props as production). Tests: `tests/virtual-scroller.spec.ts` (Playwright, real Chrome). Run: `npm run test:proto`. **Result: 11/11 pass** (one is an intentional documentation test).

| Test | Result | Finding |
|---|---|---|
| T1 `buffer` + `prerender` + `emit-update` + `@update` | PASS | `@update` fires with 4 numbers `(start,end,visibleStart,visibleEnd)` - **same signature as v1**. The type-definition gap in Section 3.2 was only typings. Analytics hook is feasible unchanged. |
| T2 once-per-SKU analytics | PASS | fired SKU set grows with scroll (17 → 130 after 6 wheel scrolls), bounded by item count |
| T3b expand row WITHOUT `size-dependencies` | PASS | next row moves 272 → 409 px, `scrollY` unchanged (2000 → 2000) |
| T3 expand row WITH `size-dependencies` (production code today) | **FAILS (documented via `test.fail`)** | next row did **not** move (272 → 272) → overlap. **Action: remove `:size-dependencies` in all 3 components** (v3 auto-measures via ResizeObserver; prop is deprecated and logs a console warning) |
| T4 `scrollToItem(800)` from top | PASS | row lands at viewport top |
| T5 re-sort/filter | PASS | first item is the new first (no stale recycled content) |
| T6 keyboard | PASS | Tab order SKU-0 → SKU-1, Enter/Space toggle, focus stays on row |
| T7 grid mode + helper | PASS | `scrollToRow()` helper lands exactly on target row |
| T8 console/hydration | PASS | only warning = deprecated `sizeDependencies` (goes away when prop is removed) |
| T9 DOM order after first paint | PASS with caveat | DOM order is **reversed for ~0.5 s after first render**, then sorted. Tabbing in that window visits SKU-9, 8, 7… (ADA risk, small window). Mitigation: render the list only after data is ready + one `nextTick`, or keep `prerender` small; re-test in real page |
| T10 raw `scrollToItem` while already scrolled | documents bug | in page-mode, calling `scrollToItem` (or `scrollToPosition`) **when the window is not at the top overshoots to the bottom** (scrollY 64288 → 119712). Only correct from top. Production `finishRestoration` calls it after reload (scroll = 0) so it works, but the helper must reset to top first |

Also observed: with real row heights different from `min-item-size`, first `scrollToItem` lands a few rows off (grid: row 197-203 for target 200) → helper aligns the real element with `scrollIntoView`. DOM stays small (21 rendered rows for list, 8 for grid out of 1500 / 375).

### Verdict
**`vue-virtual-scroller` 3.0.5 is APPROVED** for the three search components, with these mandatory code changes:
1. Remove `:size-dependencies` (list rows in DiamondSearch and DiamondPair).
2. Import CSS from `vue-virtual-scroller/index.css`.
3. Replace direct `scrollToItem(rowIndex)` + `rowIndex - 7` hack with the tested `scrollToRow()` helper (reset to top → scrollToItem → `scrollIntoView` on the real row).
4. Guard first render (T9) so focus order is correct from first paint.
5. Wrap scrollers in `<ClientOnly>` (they use `window`).
`@tanstack/vue-virtual` is no longer needed as a fallback unless real-page tests fail.

### Decisions received
Nuxt 4 | static | Pinia | Embla | keep service worker | Options API kept.

### Environment note
Nuxt 4.6.2 warns that Node 22.20.0 is below its supported range (needs `^22.21` / 24.11 / 26). It ran fine for tests, but **use Node ≥ 22.21 in Docker/CI**.
Also: `@nuxtjs/tailwindcss` 6.14 logs a harmless warning about `tailwindcss/nesting` (we use Tailwind 3 plain); to be silenced when we port the real `postcss.config.js`.

### Next (Phase C - awaiting go-ahead)
1. Port shared infrastructure: announce/event bus (399 `aria-announce` + 8 `$nuxt` events), `$axios` plugin with interceptors, `$cookies` shim, Pinia store (+ persisted key `persistDataStorage`), plugins (`$formatPrice`, `$isMobile`, etc.), `v-click-outside` directive, redirect/meta route middleware, `layouts/default` (skip link + live region).
2. Port search components one at a time starting with `DiamondSearchComponent` using the approved scroller changes; run ADA suite after each.


---

## 10. PHASE C RESULT - infrastructure + layout + first render (executed 2026-10-22)

Decisions applied: Nuxt 4.6.2, static prerender, Pinia, Embla, service worker kept, Options API kept. **No Docker work** (not requested).

### What now exists in this folder
| Area | Status | Notes |
|---|---|---|
| Project skeleton (`nuxt.config.ts`, `app/` srcDir, `public/`, `routes.js`) | DONE | routes still come only from `routes.js` via `pages:extend`; catch-all `*` -> `/:pathMatch(.*)*`; `head`/`runtimeConfig` generated from the Nuxt 2 config |
| `$store` (Pinia) | DONE | The 36 getters / 41 mutations / 13 actions are the **original Vuex code**, run by a Pinia store (`app/stores/*`) behind a `$store` bridge (`commit/dispatch/state/getters/watch`), so 66 components work unchanged. Persistence keeps the same localStorage key `persistDataStorage` + 18 paths |
| `$axios` | DONE | plain axios instance with `$get/$post...`, `onRequest/onError`; 429 + country-wait interceptors ported |
| `$cookies` | DONE | cookie-universal-compatible shim |
| Event bus | DONE | `$root.$emit/$on` (399+) and `$nuxt.$emit/$on` -> `$bus` (mitt) via codemod; `window.$bus` for SDK callbacks (PayPal/Bolt) |
| 18 old plugins | DONE | config, helpers (`$formatPrice`, `$isMobile`, `$sanitize`...), userProperties, GTM, Yotpo, Iubenda, IndexedDB, directive, router/meta, client-init, redirect middleware, scroll behaviour |
| `head()` option (15 files) | DONE via compat mixin | translates vue-meta (`hid`, `json`, `body`) to unhead - no per-file edits |
| `_uid` (a11y ids) | DONE | `this.uid` (per-component-type counter, identical on server and client) |
| Carousels | DONE | `vue-slick-carousel` -> **Embla** wrapper `components/common/EmblaCarousel.vue` (same props/`next()/prev()/currentSlide()`, `slick-*` classes kept, off-screen slides get `aria-hidden` + `inert`) |
| SVG icons, `require()` images | DONE | `Icon.vue` uses `import.meta.glob` (supports `flags/us`); `require('~/assets/...')` -> `assetUrl()` / `$asset()` |
| Template codemods | DONE | `.native` (157), `beforeDestroy`, `process.client`, `v-for`+`v-if` (5 files), `<template v-for :key>` (4), `srcset` with commas, duplicate `@click`, `v-text` with children |
| Yotpo containers (11 files) | DONE | wrapped in `<ClientOnly>`: the Yotpo script rewrites their DOM before Vue hydrates |
| `$config.x` | DONE | Nuxt 4 `$config` is the full runtime config -> all call sites now `$config.public.x` (71 occurrences) |
| Missing globals found | FIXED | global `_` (lodash) was implicit in Nuxt 2 -> explicit `lodash-es` imports in 3 files; SweetAlert2 v11 `onOpen` -> `didOpen`; Footer `removeEventListener` bug |

### Verification (dev server, real Chrome, Playwright `tests/smoke.spec.ts`)
- **50 static routes loaded; 43 render correctly** (title, H1, no hydration warnings, no page errors from our code).
- **7 fail with the Nuxt 500 page:** `/auth/login/`, `/cart/contact/`, `/cart/payment/`, `/my-account/`, `/contact-adiamor/`, `/custom-search/`, `/custom-design-engagement-rings/` -> all are **vee-validate 2 form pages** (waiting for Phase D rewrite).
- `/education/` logs one uncaught non-Error object (third-party script) - to investigate.
- `nuxt generate` works: **47 pages pre-rendered** (`.output/public/**/index.html`), `200.html`/`404.html` SPA fallbacks, `_worker.js`/`robots.txt`/manifest copied unchanged.
- Virtual scroller prototype tests (11) still pass.

### Behaviour differences discovered (important for review)
1. **Vue 3 does not patch mismatched attributes during hydration** (Vue 2 did). Any attribute depending on cookies/localStorage/user agent that differs from the prerendered HTML stays at the server value. Mitigation implemented: global `$hydrated` flag; already applied to the `visitor_code` links/labels (Footer, BreadCrumb, mobile header, ProductButtons). New mismatch hot-spots will keep showing up as dev-mode warnings: **we must read the smoke-test warnings page by page**.
2. `$isMobile` (user agent) and persisted store state are read before hydration -> possible first-paint differences; to be re-checked on product/search pages.
3. `v-click-outside="expr = false"` (1 place) used to throw on every outside click in Nuxt 2 (inline assignment is not a function); the Vue 3 directive ignores non-functions.

### Still to do (Phase D)
1. vee-validate **4** rewrite of the 15 form files + `InputField/Textarea` `v-model` (`modelValue`) - unblocks the 7 failing routes.
2. Port the three search components with the approved scroller changes (remove `size-dependencies`, `scrollToRow` helper, ClientOnly) and test search/product/cart/checkout flows.
3. `.sync` (9 files), `this.$set` (21 calls), `filters` (5), `asyncData` in `thankyou.vue`, `focus-trap-vue` v4 check, nouislider, reCAPTCHA wrapper.
4. Dynamic URLs (`/search/...`, product URLs via catch-all) and `searchPage` regex route verification.
5. ADA regression: port Playwright/axe suite, NVDA pass.
6. Hydration warning sweep + service worker (`public/sw.js`) decision wiring.


---

## 11. PHASE D RESULT - forms, search/product pages, parity checks (2026-10-23)

### Verified against the Nuxt 2 app (same machine, same API, port 3000, one server at a time)
| Check | Result |
|---|---|
| All 50 static routes (dev) | 50/50 render, 0 Nuxt 500 pages, 0 hydration warnings |
| `nuxt generate` | 50 pages pre-rendered, 0 SSR errors; SPA fallback `200.html` present |
| Production build served statically (`nuxt preview`) | static pages OK; search pages and product pages (dynamic URLs) render from the SPA fallback |
| axe WCAG 2.2 AA (ported suite) Home / Rings / Diamonds / Jewelry / Login / Cart | **identical violation rules and counts to Nuxt 2** (all pre-existing, mostly third-party); 2 pages have 1 fewer `label-content-name-mismatch` |
| `diamond-list-focus` a11y spec | same 2 pass / 2 fail as Nuxt 2 (the 2 failures are pre-existing: `role="row"` still inside the list row button) |
| Filter click on diamond search | URL, `filter_item_list`, `view_item_list` events and results update correctly |
| Login form validation | required / email / min, custom messages (`Email Address is required.`), live clearing, `role="alert"` + `aria-invalid` all work |

### Fixes made in this phase (Nuxt 2 -> Vue 3 behaviour differences found by running the app)
1. **vee-validate**: a vee-validate 2 compatibility layer (`utils/veeCompat.js`) on top of vee-validate 4 keeps `v-validate`, `errors.first/has/clear/count/items`, `$validator.validate/validateAll/reset/localize` and `data-vv-as`, so the 15 form files are unchanged. Gotcha: directives on components receive the root element's vnode in Vue 3, so the component is found via `el.__vueParentComponent`.
2. **Bare `<template>`** (no v-if/v-for/v-slot) is an inert native element in Vue 3 (it hid the whole settings grid). 3 occurrences fixed; `scripts-bare-template.mjs` finds them.
3. **Route params**: Vue Router 4 percent-encodes `/` in wildcard params (`/diamonds/search/round/` became `round%2F` after any query change). Query-only `router.push/replace` now keeps the current path; the search route param is a string `(.*)?`.
4. **SVG icons**: svgo stripped `viewBox`, icons stopped scaling; `removeViewBox:false`.
5. **Props are readonly in Vue 3**: 4 assignments to props fixed (`CustomFilter`, mobile header, `AffirmPayment`); `scripts-find-prop-mutations.mjs` finds them.
6. **`structuredClone` of reactive objects** throws -> `deepClone()`; `markRaw(null)` throws -> safe wrapper in the store.
7. **String event handlers** (`onclick="helpDesk.click()"`, `onSubmit="return false"`) are ignored by Vue 3 -> converted to `@click` + `$openHelpDesk/$openWindow/$callGlobal` helpers. (The live-chat buttons would have silently stopped working.)
8. `<recaptcha>` (v2 widget) replaced by `components/common/Recaptcha.vue` + `$recaptcha`; `$router.history._startLocation` -> `$startLocation`; `$router.currentRoute.name` -> `.value.name`; `$nuxt.$forceUpdate`; asyncData guard -> route middleware; `<model-viewer>` registered as custom element; `.sync` -> `v-model:`; `$set` removed; `v-for`+`v-if` priority; custom `v-model` components (`InputField`, `Textarea`, `FloatingInputField`) now `modelValue` + still emit `input`.
9. Cart / auth / account / wishlist / thank-you / search routes are `ssr:false` (client-state pages, not indexable): this removes every hydration mismatch class on them.

### Known differences (decision needed)
- **GTM on first load of a search page**: Nuxt 2 pushed `filter_item_list` and *two* `view_item_list` events (its filter watcher ran several times because the search page re-mounted repeatedly). Nuxt 4 pushes one `view_item_list`. User-driven filter changes push `filter_item_list` + `view_item_list` exactly as before. If analytics must keep the duplicate initial `filter_item_list`, it has to be fired explicitly.
- `OrderAddress.vue` reads an undefined `addressType` and `ProductButtons.vue` an undefined `diamond` (warnings exist in Nuxt 2 too).
- Vue Router 4 prints a deprecation warning for the `next()` callback in 3 in-component guards (search page, thank-you); they still work.

### Still to do
1. Checkout end-to-end with a real cart (contact -> payment -> review) incl. postcode/phone rules and Affirm/PayPal/Bolt sandboxes.
2. Remaining flows: design-your-own bundle, diamond-pair search, wishlist/compare, my-account, glossary/education/policy slugs, redirect map (`utils/menu.js`) and the `/products/` Worker redirects.
3. Trailing-slash behaviour on a real host (Caddy/Cloudflare) and canonical URLs.
4. Service worker (`public/sw.js`) registration decision, performance/CLS comparison, NVDA manual pass.

---

## 12. DECISIONS APPLIED (2026-10-23)

| # | Decision | What was done |
|---|---|---|
| 1 | Trailing slash required | Global route middleware `00.trailing-slash.global.js` redirects `/page` -> `/page/` (query/hash kept; file-like URLs skipped). All pre-rendered routes use the slashed form. Same behaviour as Nuxt 2 (verified side by side: `/faq`, search, product, glossary). On the static host the folder-style output (`faq/index.html`) already gets the 301 from Cloudflare Pages; for other hosts add the Worker rule below |
| 2 | 301 inside the project, rest via Worker | Legacy URL map (`utils/menu.js`: `/design-your-own`, `/your-setting`, `/education/glossary`) is emitted as real 301s into `.output/public/_redirects` at generate time + `routeRules` + client middleware. Everything else (KV redirects, `/products/`, case normalisation) stays in `public/_worker.js` untouched |
| 3 | Service worker + meta for dynamic routes | `public/sw.js` (the self-destroying worker that removes the old Nuxt 2 service worker) and `public/_worker.js` (edge SEO injection) are copied unchanged. Meta on page load for dynamic routes is also set client-side (route guard `fetchDynamicMeta` + `head()` compat), verified: product, search, education, policy pages have identical titles/H1 to Nuxt 2 |
| 4 | Remove duplicate analytics | Nuxt 4 pushes a single `view_item_list` on load; no duplicate `filter_item_list` is fired. Filter changes by the user still push `filter_item_list` + `view_item_list` |
| 5 | Build with default config | `nitro.preset` override removed. `npm run generate` (= `nuxt generate`) produces `.output/public`; `npm run build` / `preview` are the Nuxt defaults |
| 6 | Remove lodash | `lodash-es` removed. `debounce`/`uniqBy` live in `app/utils/debounce.js`; `cloneDeep` -> `deepClone`; `_.find/_.join/_.slice` -> native array methods |

### Dynamic-route meta WITHOUT a worker (options)
1. **Client-side only (current fallback)**: titles/meta/JSON-LD are set after the API call. Google renders JS, but social crawlers (WhatsApp, Facebook, X) and non-JS bots only see the generic shell -> weaker link previews and slower SEO indexing.
2. **Pre-render at build time**: feasible for categories/landing pages; for the full product catalogue it needs an API endpoint that lists all slugs (build time grows with product count, every price/stock change needs a rebuild or redeploy).
3. **Node SSR / hybrid (`routeRules` swr/isr)** on a Node or edge runtime: real server rendering per request, but it replaces static hosting with a running server.
4. **Keep the Worker (recommended)**: it already injects SEO meta + JSON-LD per product/page/search URL, caches for 1 h, and costs nothing extra on static hosting. The Nuxt 4 app is compatible with it unchanged (same `<head>` placeholders, same API endpoints).

### Optional Worker snippet for the trailing slash (for hosts that do not add it themselves)
```js
// before the KV lookup in public/_worker.js
if (!path.endsWith('/') && !path.split('/').pop().includes('.') && !path.startsWith('/blog')) {
  const u = new URL(request.url); u.pathname = path + '/'
  return Response.redirect(u.toString(), 301)
}
```
