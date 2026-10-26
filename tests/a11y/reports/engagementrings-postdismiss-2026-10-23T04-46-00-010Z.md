# WCAG 2.2 AA Audit — EngagementRings-PostDismiss
**URL:** http://localhost:3000/engagement-rings/
**Tested:** 2026-10-23T04:45:59.495Z
**Violations:** 4

## 1. [SERIOUS] aria-prohibited-attr
**Description:** Ensure ARIA attributes are not prohibited for an element's role
**Help:** https://dequeuniversity.com/rules/axe/4.14/aria-prohibited-attr?application=playwright
**Affected nodes (1):**
- `<span class="text-sm leading-6" tabindex="0" aria-label="Visitor ID: UASAQKT"><span aria-hidden="true">UASAQKT</span><!-`
  - Failure: Fix all of the following:

## 2. [CRITICAL] aria-valid-attr-value
**Description:** Ensure all ARIA attributes have valid values
**Help:** https://dequeuniversity.com/rules/axe/4.14/aria-valid-attr-value?application=playwright
**Affected nodes (6):**
- `<a href="/diamonds/" class="inline-block hover:text-primary focus:text-primary tk-gill-sans-nova uppercase tracking-wide`
  - Failure: Fix all of the following:
- `<a aria-current="page" href="/engagement-rings/" class="router-link-active router-link-exact-active inline-block hover:t`
  - Failure: Fix all of the following:
- `<a href="/wedding-rings/" class="inline-block hover:text-primary focus:text-primary tk-gill-sans-nova uppercase tracking`
  - Failure: Fix all of the following:
- `<a href="/jewelry/" class="inline-block hover:text-primary focus:text-primary tk-gill-sans-nova uppercase tracking-wides`
  - Failure: Fix all of the following:
- `<a href="/education/" class="inline-block hover:text-primary focus:text-primary tk-gill-sans-nova uppercase tracking-wid`
  - Failure: Fix all of the following:
  *(+1 more nodes)*

## 3. [SERIOUS] color-contrast
**Description:** Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds
**Help:** https://dequeuniversity.com/rules/axe/4.14/color-contrast?application=playwright
**Affected nodes (1):**
- `<span style="font-weight: 600;">Get The Code</span>`
  - Failure: Fix any of the following:

## 4. [SERIOUS] label-content-name-mismatch
**Description:** Ensure that elements labelled through their content must have their visible text as part of their accessible name
**Help:** https://dequeuniversity.com/rules/axe/4.14/label-content-name-mismatch?application=playwright
**Affected nodes (8):**
- `<a href="/policies/return-pol..." class="text-[10px] uppercas..." aria-label="Free shipping and ea..." data-v-aa0ee67c="`
  - Failure: Fix any of the following:
- `<button type="button" aria-expanded="false" aria-haspopup="listbox" aria-label="Change your shipping..." class="flex ite`
  - Failure: Fix any of the following:
- `<a href="/engagement-rings/search/thin-band-collection/" class="relative col-span-2 sm:col-span-4 sm:row-span-2 flex fle`
  - Failure: Fix any of the following:
- `<a href="/engagement-rings/search/yellow-gold/" class="relative sm:col-span-2 flex flex-col space-y-4 focus:outline-none`
  - Failure: Fix any of the following:
- `<a href="/engagement-rings/search/platinum/" class="relative sm:col-span-2 flex flex-col space-y-4 focus:outline-none fo`
  - Failure: Fix any of the following:
  *(+3 more nodes)*
