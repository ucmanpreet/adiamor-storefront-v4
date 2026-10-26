# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: search.spec.ts >> diamond search: list/grid scrollers render, update events fire, GTM view_item_list grows on scroll
- Location: tests/search.spec.ts:8:1

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 2
Received:   0
```

# Page snapshot

```yaml
- generic [active] [ref=f12e1]:
  - generic [ref=f12e3]:
    - link "Skip to content":
      - /url: "#main-content"
      - text: Skip to content
      - generic [aria-hidden]:
        - generic: ↵
        - text: ENTER
    - banner [ref=f12e5]:
      - generic [ref=f12e7]:
        - generic [ref=f12e8]:
          - link "Free shipping and easy return" [ref=f12e9] [cursor=pointer]:
            - /url: /policies/return-policy/
            - generic [aria-hidden] [ref=f12e10]: ✦
            - text: Free Shipping & Easy Returns
          - generic [aria-hidden] [ref=f12e11]: "|"
          - link "Lab Grown diamonds on sale" [ref=f12e12] [cursor=pointer]:
            - /url: /promotions/
            - generic [aria-hidden] [ref=f12e13]: ◈
            - text: Lab Grown Diamonds on Sale
        - button "Change your shipping country and currency" [ref=f12e15] [cursor=pointer]
      - generic [ref=f12e19]:
        - generic [ref=f12e21]:
          - list [ref=f12e22]:
            - listitem [ref=f12e23]:
              - link "Contact Adiamor at 877-627-5094" [ref=f12e24] [cursor=pointer]:
                - /url: /contact-adiamor/
                - text: 877-627-5094
            - listitem [ref=f12e25]:
              - button "Open help desk" [ref=f12e28] [cursor=pointer]
            - listitem [ref=f12e30]:
              - link "Send email to support" [ref=f12e33] [cursor=pointer]:
                - /url: mailto:Service@Adiamor.com
          - list [ref=f12e35]:
            - listitem:
              - button "Open search" [ref=f12e36] [cursor=pointer]
            - listitem [ref=f12e40]:
              - button "Wishlist, 0 items" [ref=f12e43] [cursor=pointer]
            - listitem [ref=f12e47]:
              - button "Shopping cart, 0 items" [ref=f12e50] [cursor=pointer]
            - listitem [ref=f12e54]:
              - link "Login" [ref=f12e56] [cursor=pointer]:
                - /url: /auth/login/
        - generic [ref=f12e62]:
          - link "Adiamor home" [ref=f12e63] [cursor=pointer]:
            - /url: /
          - navigation "Global navigation" [ref=f12e64]:
            - generic [ref=f12e65]:
              - link "Diamonds" [ref=f12e67] [cursor=pointer]:
                - /url: /diamonds/
              - link "Engagement Rings" [ref=f12e69] [cursor=pointer]:
                - /url: /engagement-rings/
              - link "Wedding" [ref=f12e71] [cursor=pointer]:
                - /url: /wedding-rings/
              - link "Jewelry" [ref=f12e73] [cursor=pointer]:
                - /url: /jewelry/
              - link "Education" [ref=f12e75] [cursor=pointer]:
                - /url: /education/
              - link "About Us" [ref=f12e77] [cursor=pointer]:
                - /url: /about-adiamor/
              - link "On Sale" [ref=f12e79] [cursor=pointer]:
                - /url: /jewelry/search/sale/
    - main [ref=f12e80]:
      - generic [ref=f12e81]:
        - generic [ref=f12e82]:
          - link "Design your perfect Engagement Ring" [ref=f12e83] [cursor=pointer]:
            - /url: /engagement-rings/search/
          - img "Design your perfect Engagement Ring" [ref=f12e85]
          - generic [ref=f12e87]:
            - heading "Design your perfect Engagement Ring" [level=1] [ref=f12e88]:
              - generic [ref=f12e89]: Design your perfect
              - generic [ref=f12e90]: Engagement Ring
            - paragraph [ref=f12e91]: Made in Los Angeles · Free Shipping · 30-day Returns
            - generic [ref=f12e92]:
              - link "Engagement Rings" [ref=f12e93] [cursor=pointer]:
                - /url: /engagement-rings/search/
              - link "Loose Diamonds" [ref=f12e94] [cursor=pointer]:
                - /url: /diamonds/search/
        - region [ref=f12e95]:
          - generic [ref=f12e96]:
            - generic [ref=f12e97]:
              - heading "As Featured in" [level=2] [ref=f12e98]
              - paragraph [ref=f12e99]: As seen in prominent media outlets, endorsed by top brands, and celebrated for outstanding quality globally.
            - generic [ref=f12e100]:
              - link "nbc" [ref=f12e102] [cursor=pointer]:
                - /url: /in-the-media/
                - img "nbc media feature logo" [ref=f12e104]
              - link "this_is_la" [ref=f12e106] [cursor=pointer]:
                - /url: /in-the-media/
                - img "this_is_la media feature logo" [ref=f12e108]
              - link "weddingwire" [ref=f12e110] [cursor=pointer]:
                - /url: /in-the-media/
                - img "weddingwire media feature logo" [ref=f12e112]
              - link "the_knot" [ref=f12e114] [cursor=pointer]:
                - /url: /in-the-media/
                - img "the_knot media feature logo" [ref=f12e116]
              - link "telemundo" [ref=f12e118] [cursor=pointer]:
                - /url: /in-the-media/
                - img "telemundo media feature logo" [ref=f12e120]
              - link "buzzfeed" [ref=f12e122] [cursor=pointer]:
                - /url: /in-the-media/
                - img "buzzfeed media feature logo" [ref=f12e124]
        - region [ref=f12e125]:
          - generic [ref=f12e126]:
            - heading "Explore Our Collections" [level=2] [ref=f12e127]
            - paragraph [ref=f12e128]: Find timeless wedding rings and bands for every style — from elegant solitaires to matching sets and diamond accents.
          - list [ref=f12e129]:
            - listitem [ref=f12e130]:
              - generic [ref=f12e131]:
                - link "Engagement Rings" [ref=f12e132] [cursor=pointer]:
                  - /url: /engagement-rings/
                - generic [ref=f12e135]:
                  - heading [level=2] [aria-hidden] [ref=f12e136]: Engagement Rings
                  - link "Shop Now" [ref=f12e138] [cursor=pointer]:
                    - /url: /engagement-rings/
            - listitem [ref=f12e139]:
              - generic [ref=f12e140]:
                - link "Wedding Rings" [ref=f12e141] [cursor=pointer]:
                  - /url: /wedding-rings/
                - generic [ref=f12e144]:
                  - heading [level=2] [aria-hidden] [ref=f12e145]: Wedding Rings
                  - link "Shop Now" [ref=f12e147] [cursor=pointer]:
                    - /url: /wedding-rings/
            - listitem [ref=f12e148]:
              - generic [ref=f12e149]:
                - link "Diamond Earrings" [ref=f12e150] [cursor=pointer]:
                  - /url: /earrings/
                - generic [ref=f12e153]:
                  - heading [level=2] [aria-hidden] [ref=f12e154]: Diamond Earrings
                  - link "Shop Now" [ref=f12e156] [cursor=pointer]:
                    - /url: /earrings/
            - listitem [ref=f12e157]:
              - generic [ref=f12e158]:
                - link "Diamond Pendants" [ref=f12e159] [cursor=pointer]:
                  - /url: /necklaces/
                - generic [ref=f12e162]:
                  - heading [level=2] [aria-hidden] [ref=f12e163]: Diamond Pendants
                  - link "Shop Now" [ref=f12e165] [cursor=pointer]:
                    - /url: /necklaces/
        - generic [ref=f12e168]:
          - generic [ref=f12e170]:
            - heading "Shop By Diamond Shapes" [level=2] [ref=f12e171]
            - paragraph [ref=f12e172]: Explore our exquisite collection of diamonds categorized by shape to find your perfect gem.
          - list [ref=f12e173]:
            - listitem [ref=f12e174]:
              - link "Shop Round diamond shape" [ref=f12e175] [cursor=pointer]:
                - /url: /diamonds/search/round/
                - generic [ref=f12e178]: Round
            - listitem [ref=f12e179]:
              - link "Shop Princess diamond shape" [ref=f12e180] [cursor=pointer]:
                - /url: /diamonds/search/princess/
                - generic [ref=f12e183]: Princess
            - listitem [ref=f12e184]:
              - link "Shop Emerald diamond shape" [ref=f12e185] [cursor=pointer]:
                - /url: /diamonds/search/emerald/
                - generic [ref=f12e188]: Emerald
            - listitem [ref=f12e189]:
              - link "Shop Marquise diamond shape" [ref=f12e190] [cursor=pointer]:
                - /url: /diamonds/search/marquise/
                - generic [ref=f12e193]: Marquise
            - listitem [ref=f12e194]:
              - link "Shop Heart diamond shape" [ref=f12e195] [cursor=pointer]:
                - /url: /diamonds/search/heart/
                - generic [ref=f12e198]: Heart
            - listitem [ref=f12e199]:
              - link "Shop Pear diamond shape" [ref=f12e200] [cursor=pointer]:
                - /url: /diamonds/search/pear/
                - generic [ref=f12e203]: Pear
            - listitem [ref=f12e204]:
              - link "Shop Cushion diamond shape" [ref=f12e205] [cursor=pointer]:
                - /url: /diamonds/search/cushion/
                - generic [ref=f12e208]: Cushion
            - listitem [ref=f12e209]:
              - link "Shop Oval diamond shape" [ref=f12e210] [cursor=pointer]:
                - /url: /diamonds/search/oval/
                - generic [ref=f12e213]: Oval
            - listitem [ref=f12e214]:
              - link "Shop Radiant diamond shape" [ref=f12e215] [cursor=pointer]:
                - /url: /diamonds/search/radiant/
                - generic [ref=f12e218]: Radiant
            - listitem [ref=f12e219]:
              - link "Shop Asscher diamond shape" [ref=f12e220] [cursor=pointer]:
                - /url: /diamonds/search/asscher/
                - generic [ref=f12e223]: Asscher
        - region [ref=f12e224]:
          - generic [ref=f12e228]:
            - heading [level=2] [ref=f12e229]:
              - text: You
              - strong [ref=f12e230]: Design
              - text: It, We
              - strong [ref=f12e231]: Build
              - text: It
            - paragraph [ref=f12e232]: Make it your own. Each ring is a one of a kind masterpiece made for you in our Los Angeles manufacturing house.
            - link "Design your own custom engagement ring" [ref=f12e233] [cursor=pointer]:
              - /url: /design-your-own/ring/
              - text: Design Your Own Ring
        - region [ref=f12e235]:
          - generic [ref=f12e236]:
            - generic [ref=f12e237]:
              - heading "Photos From Our Community" [level=2] [ref=f12e240]
              - paragraph [ref=f12e241]: Community photo gallery is loading.
            - link "View more community photos and social media gallery" [ref=f12e243] [cursor=pointer]:
              - /url: /social-media-gallery/
              - text: View More
        - generic [ref=f12e244]:
          - article [ref=f12e245]:
            - generic [ref=f12e246]:
              - heading [level=2] [ref=f12e247]:
                - link "Open diamond certification education page" [ref=f12e248] [cursor=pointer]:
                  - /url: /education/diamond-certification/
                  - text: Certification
              - paragraph [ref=f12e249]: Adiamor diamonds are graded by the two most reputable laboratories in the industry, GIA and IGI
            - generic [ref=f12e250]:
              - link "Visit GIA certification website" [ref=f12e251] [cursor=pointer]:
                - /url: https://www.gia.edu/
                - img "GIA diamond certification logo" [ref=f12e252]
              - link "Visit IGI certification website" [ref=f12e253] [cursor=pointer]:
                - /url: https://www.igi.org/
                - img "IGI diamond certification logo" [ref=f12e254]
          - article [ref=f12e255]:
            - generic [ref=f12e256]:
              - heading "Diamond Education" [level=2] [ref=f12e257]
              - paragraph [ref=f12e258]: "Learn about the “4 C’s” to help you with your online diamond shopping:"
            - navigation "Diamond education topics" [ref=f12e259]:
              - link "Diamond Cut" [ref=f12e260] [cursor=pointer]:
                - /url: /education/diamond-cut/
              - link "Diamond Color" [ref=f12e263] [cursor=pointer]:
                - /url: /education/diamond-color/
              - link "Diamond Clarity" [ref=f12e266] [cursor=pointer]:
                - /url: /education/diamond-clarity/
              - link "Carat Weight" [ref=f12e269] [cursor=pointer]:
                - /url: /education/carat-weight/
        - region [ref=f12e272]:
          - heading "Testimonials" [level=2] [ref=f12e273]
          - link "Read customer testimonials" [ref=f12e276] [cursor=pointer]:
            - /url: /testimonials/
            - img "Customer testimonials image" [ref=f12e277]
          - link "Read more customer testimonials" [ref=f12e279] [cursor=pointer]:
            - /url: /testimonials/
            - text: Read Customer Testimonials
        - region [ref=f12e280]:
          - generic [ref=f12e282]:
            - img "Adiamor jewelry box packaging" [ref=f12e284]
            - link "Why Shop At Adiamor Manufacturer Direct Complimentary Appraisal Complimentary Preventive Maintenance 30-Days Return Complimentary Resizing for 90 Days Free Shipping Worldwide" [ref=f12e285] [cursor=pointer]:
              - /url: /why-shop-at-adiamor/
              - generic [ref=f12e286]:
                - heading "Why Shop At Adiamor" [level=2] [ref=f12e287]
                - list [ref=f12e288]:
                  - listitem [ref=f12e289]:
                    - generic [ref=f12e291]: Manufacturer Direct
                  - listitem [ref=f12e292]:
                    - generic [ref=f12e294]: Complimentary Appraisal
                  - listitem [ref=f12e295]:
                    - generic [ref=f12e297]: Complimentary Preventive Maintenance
                  - listitem [ref=f12e298]:
                    - generic [ref=f12e300]: 30-Days Return
                  - listitem [ref=f12e301]:
                    - generic [ref=f12e303]: Complimentary Resizing for 90 Days
                  - listitem [ref=f12e304]:
                    - generic [ref=f12e306]: Free Shipping Worldwide
        - generic [ref=f12e307]:
          - article [ref=f12e308]:
            - img "About Adiamor jewelry craftsmanship" [ref=f12e309]
            - generic [ref=f12e311]:
              - heading "About Adiamor" [level=2] [ref=f12e312]
              - paragraph [ref=f12e313]: We are artisans, expert jewelers, jewelry consultants and GIA trained gemologists who are passionate about what we do. Our award winning services continue to win the loyalty of customers worldwide.
              - link "Learn more about Adiamor, our services and team" [ref=f12e314] [cursor=pointer]:
                - /url: /about-adiamor/
                - text: Learn More About Adiamor
          - article [ref=f12e315]:
            - img "Adiamor financing options with Affirm" [ref=f12e316]
            - generic [ref=f12e318]:
              - heading "Financing" [level=2] [ref=f12e319]
              - paragraph [ref=f12e320]: We have partnered with Affirm to give you a simple way to make your purchase with no hidden fees.
              - link "Learn about financing options through Affirm" [ref=f12e321] [cursor=pointer]:
                - /url: /education/financing-insurance/
        - region "Contact Assistance" [ref=f12e323]:
          - region [ref=f12e324]:
            - heading [level=2] [aria-hidden] [ref=f12e325]: Customer Support and Services
            - list [ref=f12e326]:
              - listitem [ref=f12e327]:
                - button [ref=f12e328] [cursor=pointer]:
                  - paragraph [ref=f12e330]: Chat with us live!
                  - paragraph [ref=f12e331]: Connect with us now for instant assistance!
              - listitem [ref=f12e332]:
                - link [ref=f12e333] [cursor=pointer]:
                  - /url: tel:8776275094
                  - paragraph [ref=f12e335]: Reach Out to Us
                  - paragraph [ref=f12e336]: Need help? Contact one of our gemologists for expert advice!
              - listitem [ref=f12e337]:
                - link [ref=f12e338] [cursor=pointer]:
                  - /url: /services/payment-options/
                  - paragraph [ref=f12e340]: Flexible Payment Options
                  - paragraph [ref=f12e341]: Adiamor accepts credit cards, Affirm, Paypal or bank transfer
              - listitem [ref=f12e342]:
                - link [ref=f12e343] [cursor=pointer]:
                  - /url: /policies/warranty/
                  - paragraph [ref=f12e345]: Lifetime Warranty
                  - paragraph [ref=f12e346]: Enjoy peace of mind with our Lifetime Warranty.
    - contentinfo [ref=f12e347]:
      - heading "Footer" [level=2] [ref=f12e348]
      - generic [ref=f12e351]:
        - generic [ref=f12e352]:
          - link "Go to homepage":
            - /url: /
          - generic [ref=f12e353]:
            - paragraph [ref=f12e354]: 510 W 6th St. Suite 1200Los Angeles, CA 90014
            - list [ref=f12e355]:
              - listitem [ref=f12e356]:
                - link "Call us at 877-627-5094" [ref=f12e357] [cursor=pointer]:
                  - /url: tel:8776275094
                  - generic [ref=f12e359]: 877-627-5094
              - listitem [ref=f12e360]:
                - link "Email Us" [ref=f12e361] [cursor=pointer]:
                  - /url: mailto:Service@Adiamor.com
        - generic [ref=f12e365]:
          - generic [ref=f12e366]:
            - generic [ref=f12e367]:
              - link "Customer Service" [ref=f12e368] [cursor=pointer]:
                - /url: /customer-service/
              - button "Toggle accordion for Customer Service"
            - list [ref=f12e369]:
              - listitem [ref=f12e370]:
                - link "Free FedEx Shipping®" [ref=f12e371] [cursor=pointer]:
                  - /url: /policies/shipping-policy/
              - listitem [ref=f12e372]:
                - link "30-Day Returns" [ref=f12e373] [cursor=pointer]:
                  - /url: /policies/return-policy/
              - listitem [ref=f12e374]:
                - link "Jewelry Insurance" [ref=f12e375] [cursor=pointer]:
                  - /url: /policies/financing-and-insurance/
              - listitem [ref=f12e376]:
                - link "Privacy Policy" [ref=f12e377] [cursor=pointer]:
                  - /url: https://www.iubenda.com/privacy-policy/37125914
              - listitem [ref=f12e378]:
                - link "Cookie Policy" [ref=f12e379] [cursor=pointer]:
                  - /url: https://www.iubenda.com/privacy-policy/37125914/cookie-policy
              - listitem [ref=f12e380]:
                - link "Terms and Conditions" [ref=f12e381] [cursor=pointer]:
                  - /url: https://www.iubenda.com/terms-and-conditions/37125914
          - generic [ref=f12e382]:
            - generic [ref=f12e383]:
              - link "About Us" [ref=f12e384] [cursor=pointer]:
                - /url: /about-adiamor/
              - button "Toggle accordion for About Us"
            - list [ref=f12e385]:
              - listitem [ref=f12e386]:
                - link "Why Buy From Adiamor" [ref=f12e387] [cursor=pointer]:
                  - /url: /why-shop-at-adiamor/
              - listitem [ref=f12e388]:
                - link "Adiamor Reviews" [ref=f12e389] [cursor=pointer]:
                  - /url: /testimonials/
              - listitem [ref=f12e390]:
                - link "Flexible Financing" [ref=f12e391] [cursor=pointer]:
                  - /url: /flexible-financing/
              - listitem [ref=f12e392]:
                - link "Conflict-Free Policy" [ref=f12e393] [cursor=pointer]:
                  - /url: /policies/conflict-free-policy/
              - listitem [ref=f12e394]:
                - link "Social Media Gallery" [ref=f12e395] [cursor=pointer]:
                  - /url: /social-media-gallery/
              - listitem [ref=f12e396]:
                - link "Sitemap" [ref=f12e397] [cursor=pointer]:
                  - /url: /sitemap/
              - listitem [ref=f12e398]:
                - link "Blog" [ref=f12e399] [cursor=pointer]:
                  - /url: https://www.adiamor.com/blog/
          - generic [ref=f12e400]:
            - generic [ref=f12e401]:
              - link "Contact" [ref=f12e402] [cursor=pointer]:
                - /url: /contact-adiamor/
              - button "Toggle accordion for Contact"
            - list [ref=f12e403]:
              - listitem [ref=f12e404]:
                - link "Accessibility" [ref=f12e405] [cursor=pointer]:
                  - /url: /policies/accessibility/
              - listitem [ref=f12e406]:
                - link "Your Privacy Choices" [ref=f12e407] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=f12e408]:
                - link "Notice at Collection" [ref=f12e409] [cursor=pointer]:
                  - /url: "#"
              - listitem:
                - generic "Visitor ID:"
      - generic [ref=f12e412]:
        - paragraph [ref=f12e413]: © 1999-2026 Adiamor.com
        - list [ref=f12e414]:
          - listitem [ref=f12e415]:
            - link "BBB Accredited" [ref=f12e416] [cursor=pointer]:
              - /url: https://www.bbb.org/us/ca/los-angeles/profile/jewelry-stores/adiamor-1216-13137794/
              - img "BBB Accredited" [ref=f12e418]
          - listitem [ref=f12e419]:
            - link "Norton Shopping Guarantee" [ref=f12e420] [cursor=pointer]:
              - /url: https://www.digicert.com/what-is-ssl-tls-and-https
              - img "Norton Shopping Guarantee" [ref=f12e422]
          - listitem [ref=f12e423]:
            - link "Verified Reviews" [ref=f12e424] [cursor=pointer]:
              - /url: https://bizratesurveys.com/reviews/adiamor-reviews
              - img "Verified Reviews" [ref=f12e426]
        - list [ref=f12e427]:
          - listitem [ref=f12e428]:
            - link "Facebook" [ref=f12e429] [cursor=pointer]:
              - /url: https://www.facebook.com/Adiamor
              - img "Facebook" [ref=f12e431]
          - listitem [ref=f12e432]:
            - link "Twitter" [ref=f12e433] [cursor=pointer]:
              - /url: https://twitter.com/Adiamor
              - img "X" [ref=f12e435]
          - listitem [ref=f12e436]:
            - link "Pinterest" [ref=f12e437] [cursor=pointer]:
              - /url: https://www.pinterest.com/Adiamor/
          - listitem [ref=f12e441]:
            - link "Instagram" [ref=f12e442] [cursor=pointer]:
              - /url: https://www.instagram.com/adiamordiamonds
          - listitem [ref=f12e446]:
            - link "Youtube" [ref=f12e447] [cursor=pointer]:
              - /url: https://www.youtube.com/AdiamorDiamonds
          - listitem [ref=f12e451]:
            - link "RSS" [ref=f12e452] [cursor=pointer]:
              - /url: https://www.adiamor.com/blog/
  - iframe [ref=f12e459]:
    - generic [ref=f14e6]:
      - text: protected by
      - strong [ref=f14e7]: reCAPTCHA
```

# Test source

```ts
  1  | import { test, expect, Page } from '@playwright/test'
  2  | 
  3  | const rows = (page: Page) => page.evaluate(() => [...document.querySelectorAll('[data-index]')]
  4  |   .filter((e: any) => getComputedStyle(e.closest('.vue-recycle-scroller__item-view') || e).visibility !== 'hidden')
  5  |   .map((e: any) => ({ i: +e.dataset.index, y: Math.round(e.getBoundingClientRect().y), h: Math.round(e.getBoundingClientRect().height) })))
  6  | const gtm = (page: Page) => page.evaluate(() => (window as any).dataLayer.filter((d: any) => d.event === 'view_item_list').length)
  7  | 
  8  | test('diamond search: list/grid scrollers render, update events fire, GTM view_item_list grows on scroll', async ({ page }) => {
  9  |   const errors: string[] = []
  10 |   page.on('pageerror', (e) => errors.push(e.message))
  11 |   await page.route('**/*klaviyo*', (r) => r.abort())
  12 |   await page.goto('/diamonds/search/round/')
  13 |   await page.waitForFunction(() => document.querySelectorAll('[data-index]').length > 0, null, { timeout: 30000 })
  14 |   await page.waitForTimeout(1500)
  15 |   const first = await rows(page)
  16 |   console.log('S1 first rows', JSON.stringify(first.slice(0, 5)), 'count', first.length)
> 17 |   expect(first.length).toBeGreaterThan(2)
     |                        ^ Error: expect(received).toBeGreaterThan(expected)
  18 |   const g0 = await gtm(page)
  19 |   for (let i = 0; i < 6; i++) { await page.mouse.wheel(0, 1200); await page.waitForTimeout(300) }
  20 |   const g1 = await gtm(page)
  21 |   const scrolled = await rows(page)
  22 |   console.log('S1 gtm view_item_list', g0, '->', g1, 'rows after scroll', scrolled.length, 'min index', Math.min(...scrolled.map((r) => r.i)))
  23 |   expect(g1).toBeGreaterThan(g0)
  24 |   expect(Math.min(...scrolled.map((r) => r.i))).toBeGreaterThan(0)
  25 |   // klaviyo: a GTM tag calls klaviyo.identify() while the blocked Klaviyo SDK is absent; GTM re-throws it as "Uncaught [object Object]"
  26 |   expect(errors.filter((e) => !/Yotpo|yotpo|querySelector|klaviyo\.identify|Uncaught \[object Object\]/.test(e))).toEqual([])
  27 | })
  28 | 
  29 | test('diamond search: keyboard order of rows after load is DOM-ordered', async ({ page }) => {
  30 |   await page.route('**/*klaviyo*', (r) => r.abort())
  31 |   await page.goto('/diamonds/search/round/')
  32 |   await page.waitForFunction(() => document.querySelectorAll('[data-index]').length > 0, null, { timeout: 30000 })
  33 |   const orders: number[][] = []
  34 |   for (let i = 0; i < 12; i++) {
  35 |     orders.push(await page.evaluate(() => [...document.querySelectorAll('[data-index]')].filter((e: any) => getComputedStyle(e.closest('.vue-recycle-scroller__item-view') || e).visibility !== 'hidden').map((e: any) => +e.dataset.index)))
  36 |     await page.waitForTimeout(100)
  37 |   }
  38 |   const sorted = orders.map((o) => o.every((n, k) => k === 0 || n > o[k - 1]))
  39 |   console.log('S2 DOM sorted over first 1.2s:', sorted.join(','))
  40 | })
  41 | 
  42 | test('settings search: grid renders and restores via scrollToRow helper', async ({ page }) => {
  43 |   await page.goto('/engagement-rings/search/')
  44 |   await page.waitForFunction(() => document.querySelectorAll('[data-index]').length > 0, null, { timeout: 30000 })
  45 |   await page.waitForTimeout(1200)
  46 |   const r = await rows(page)
  47 |   console.log('S3 setting rows', r.length, JSON.stringify(r.slice(0, 3)))
  48 |   expect(r.length).toBeGreaterThan(1)
  49 | })
  50 | 
```