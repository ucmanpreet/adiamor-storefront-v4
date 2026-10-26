# Nuxt 2 -> Nuxt 4 migration: status and handoff

Last updated: 2026-10-23. Read this first if you are continuing the work from another Claude account.

## 1. Goal and rules (decided by the user)
- Convert the Nuxt 2 / Vue 2 storefront to **native Nuxt 4 + Vue 3** and follow the **Nuxt 4 docs** conventions.
- **Full native conversion:** no compat shims (no `$store`, `$axios`, `$cookies`, `this.$...` left behind).
- **No functional change:** same behaviour, markup, classes, ARIA/ADA attributes, text, GTM events, and API calls.
- **No baseline git commit was made.** Nothing in this folder is committed (`git status` shows everything untracked). Commit only when the user asks.
- Source of truth for behaviour is the original Nuxt 2 project: `/Users/ucodesoft/Sites/adiamor-storefront` (not modified).

## 2. Current state
| Check | Result |
|---|---|
| `node scripts/check-sfc.mjs` | `0/247` SFCs with problems (all use `<script setup>`) |
| `npm run build` | exit 0 |
| Runtime (built app) | Pages render (`/`, `/engagement-rings/`, `/auth/login/`, `/cart/summary/`, `/care-plan/`, `/search/diamonds/round/`) |
| Login form validation | Verified in browser (empty submit, invalid email, valid input) |
| Contact / my-account / payment / care-plan / reset-password | Page loads with 200 and no uncaught errors (`tests/forms-debug.spec.ts`, API mocked). Form submit/validation not yet exercised. `/cart/contact/` has no form without cart data |
| Modal forms (ForgetPassword, Signup, EmailAFriend, FedexModal, EngraveModal, ProngModal, CustomLiveAgentForm) | **Not runtime-tested yet**. They are components opened from other pages, not routes |

## 3. What is done
- **Stores (Pinia, native):** `app/stores/main.js` (state, getters, former Vuex mutations/actions as store actions), `app/stores/bundle.js` ("Design Your Own" builder). Persistence to localStorage key `persistDataStorage` lives in `app/plugins/02.store-persist.client.js`, same paths as before.
- **API:** `app/composables/useApi.js` (built on `$fetch`; 429 / network-error handling like the old axios interceptor). `app/api-client/rest-api/index.js` is native now (signatures: `getRequest(url, {headers})`, `postRequest(url, body, {headers})`, `putRequest`, `updateCartItem(url, body)`, `getFitleredProductList(apiUrl, params, signal)`, `getProductFitlerList(params)`).
- **Alerts:** `app/composables/useAlert.js` (`createSwalAlert`, `useAlert()`), replaces `mixin/sweetAlert.js`.
- **Config:** `nuxt.config.ts` imports `config/head.mjs` (unhead `app.head`, third-party scripts with empty src/innerHTML are filtered out) and `config/runtime.mjs` (`runtimeConfig.public`). Legacy `head.legacy.mjs` / `runtime.legacy.mjs` were removed.
- **Plugins** (`app/plugins/`): `01.config.js` (hydration flag `$hydrated`, event bus `$bus` via mitt), `02.helpers.js` (`$formatPrice`, `$asset`, `$sanitize`, `$isMobile`, `$openHelpDesk`, ...), `03.userProperties.js`, `20.indexeddb.client.js`, `21.directives.js` (`v-click-outside`), `22.gtm.client.js`, `23.yotpo.client.js`, `24.iubenda.client.js`, `26.veeValidate.js` (rules + messages), `27.recaptcha.js`, `30.router.client.js`, `25.client-init.client.js`.
- **Components and pages:** all 247 `.vue` files converted to `<script setup>`. Checker output above.
- **Forms:** all vee-validate forms use native vee-validate 4 (`useForm`, `useField`, `validate()`), not the old `v-validate` directive. `app/utils/veeCompat.js` now only provides `localize` and `generateMessage`.
- **Search page:** `pages/search.vue` maps component names to imported components (no string `:is`).
- **Bolt payment:** `pages/cart/payment.vue` exposes `txnSave` and `close` (BoltPayment calls them through the component instance).

### Bugs found and fixed during the migration (behaviour is intended to be the original one)
- `plugins/22.gtm.client.js` and `23.yotpo.client.js` used `nuxtApp.$store` (removed). This crashed every page on the client.
- `stores/main.js` `getCart` used `this.$cookies` (always undefined), so it never read the visitor code. Now `useCookie('visitorCode')`.
- `components/carousel/WeddingCarousel.vue`: random heading id via `Math.random()` caused hydration mismatch. Now `useId()`.
- `components/layout/header/mobile/index.vue`: `isLoggedIn` read `localStorage` during render (hydration mismatch). Now set in `onMounted`.
- `components/common/{DiamondSearch,DiamondPairSearch,SettingSearch}Component.vue`: still called `getFitleredProductList` with the old axios-style signature (`axiosAdapter, queryStr, cookiesAdapter[, signal]`). The native helper is `(apiUrl, queryStr, signal)`, so the URL became `settings?[object Object]...` and `fetch` threw "Failed to convert value to 'AbortSignal'". Call sites are fixed and the adapters removed. Verified: `/search/settings/` requests `settings?limit=48&…&currency=USD&locale=en-US` with no errors.
- `components/layout/header/mobile/index.vue`: `item.label === 'My bag'` never matched (label is `'My Bag'`), so the My Bag link had no visitor code. Fixed to `'My Bag'`. **This is a deliberate behaviour change** (link now includes `?visitor_code=`).

## 4. Open items (in priority order)
1. **Forms runtime tests.** Test contact (`/cart/contact/` redirects to `/cart/summary/` without a cart; needs cart data or a mocked store), my-account, payment, care-plan, ForgetPassword, ResetPassword, Signup, EmailAFriend, FedexModal, EngraveModal, ProngModal, CustomLiveAgentForm.
2. **Done:** hydration mismatch on `/engagement-rings/` and `/care-plan/` for returning visitors. Root cause: `$hydrated` flipped on `app:mounted`, but `vueApp.mount()` returns before Suspense (async) subtrees such as the layout Footer and header links are hydrated. Those subtrees rendered the cookie value into a server-rendered empty DOM. Fix in `app/plugins/01.config.js`: `$hydrated` now flips on `app:suspense:resolve` (plus `nextTick`). Verified in a prod build with `__VUE_PROD_HYDRATION_MISMATCH_DETAILS__` (temporary, removed again): no mismatch warnings for a returning visitor, the visitor code renders after hydration, and a new visitor still gets a generated code.
3. **Consolidate 401 helpers.** Several pages (`care-plan`, `wishlist`, `summary`, `view-order`, `review`, `contact`, `my-account`, `BundleProduct`, `ProductLayout`, etc.) have local `getRequest`/`postRequest` copies that redirect to login on 401. Move them into one composable (e.g. `composables/useRestApi.js`) and use it everywhere.
4. **Verify cross-file `defineExpose` contracts:** `EmblaCarousel` (`next`, `prev`, `goTo`, `currentSlide`), `HoverCard` (`hidePopover`, used by CartButton through a ref), `BundleProduct` (`createBundleItem`), `Recaptcha` (`getResponse`, `reset`), `DiamondSearch` / `DiamondPairSearch` / `SettingSearch` (`getRouteState`, used by `pages/search.vue`). Confirm each one is exposed.
5. **Known original bugs kept as-is** (decide later whether to fix):
   - `pages/cart/review.vue`, `pages/cart/payment.vue` send `Authorization: Bearer undefined` (`this.token` was never defined).
   - `DiamondGallery.vue` `nextImg` reads an undefined `getArrLength`, so "next" never advances.
   - `pages/diamond-stud-earrings.vue` `onMetalChange` references an undefined `item`.
   - `components/common/DiamondPairSearchComponent.vue` filters on an undefined `this.filterType` (always true).
6. **Mobile-only `$isMobile` hydration:** `$isMobile` is computed from the user agent on the client only, so mobile visitors may see a mismatch in `v-if="isMobile"` blocks (Footer, PdfViewer). Not tested on a mobile UA.
7. **Full test pass with API mocked.** See section 6.
8. **Baseline git commit** (only when the user asks). Suggested: commit the current state before any further refactor.

## 5. Files to know
- `scripts/check-sfc.mjs`: checks every SFC for Options API / Vue 2 leftovers and unbound template identifiers. Run: `node scripts/check-sfc.mjs` (no args = all of `app/`).
- `tests/*.spec.ts` + `playwright.smoke.config.ts`: the config only runs files whose name ends with `smoke|debug|search|gtm|dbg|filter|forms|slash` + `.spec.ts`. Name new tests accordingly (e.g. `forms-debug.spec.ts`).
- `PLUGIN-VETTING-ANALYSIS.md`: the original analysis of packages and the virtual scroller (section 3 has the ADA/GTM constraints).
- `.env`: required for the build and the app (not committed; gitignored). Copy it from the original project.

## 6. How to run and test
```
cd /Users/ucodesoft/Sites/adiamor-storefront-nuxt4
npm install            # if node_modules is missing
node scripts/check-sfc.mjs
npm run build          # exit 0 expected
PORT=3110 node .output/server/index.mjs     # serve the built app on :3110
PAGES="/,/engagement-rings/" npx playwright test --config=playwright.smoke.config.ts
```
- **Serve the app with the Nuxt server, not a static server.** Product and other dynamic URLs (for example `/diamonds/<slug>/<sku>/`) are not pre-rendered and have no `200.html`. `npx serve public` (or any plain static server) returns 404 for them. In production the Cloudflare worker (`public/_worker.js`) handles them. Locally use `PORT=3000 node .output/server/index.mjs`.
- **The real API (`afd.adiamor.com`) rejects `http://localhost:3110` with CORS.** In the browser every API call then fails. `useApi` treats a network error as "connection problem" and redirects to `/` after 2 seconds (same as the original axios interceptor). For browser tests, mock the API:
```ts
await page.route(/afd\.adiamor\.com\/api\//, (r) => r.fulfill({
  status: 200, contentType: 'application/json',
  headers: { 'Access-Control-Allow-Origin': '*' },
  body: JSON.stringify({ success: true, data: null, message: 'ok' }) }))
await page.route(/klaviyo|ladesk|affirm|paypal|bolt|yotpo|iubenda|contentsquare|google|gtm/, (r) => r.abort())
```
- Dev server (`npx nuxt dev --port 3000`) gives Vue warnings with details, but the prod build hides them.

## 7. Where things came from
- The original Nuxt 2 code: `/Users/ucodesoft/Sites/adiamor-storefront` (for comparing behaviour).
- The earlier backup of the converted-from files lives in the session scratchpad (`/private/tmp/claude-501/-Users-ucodesoft-Sites-adiamor-storefront-nuxt4/3c7921d2-25e0-47d5-bcc9-a8cd59a47706/scratchpad/backup/`). That path is session-specific and may not exist on another account, so use the original project instead.
- The conversion guide used by the sub-agents: `scratchpad/GUIDE.md` (same session-specific location). The key rules are summarized in section 3 above.
