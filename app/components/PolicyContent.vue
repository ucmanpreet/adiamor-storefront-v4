<template>
    <div class="flex-1 prose-p:my-2 prose-hr:my-6 prose-strong:font-semibold w-full">
        <section v-if="getRouteSlug === 'conflict-free-policy'">
            <article
                class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
                aria-labelledby="conflict-policy-title">
                <h1 id="conflict-policy-title" class="mb-4 text-xl sm:text-2xl font-normal">
                    Conflict Free Policy
                </h1>

                <section>
                    <h2>What are conflict diamonds?</h2>
                    <p>
                        Conflict diamonds are diamonds used to fund military action by rebel armies opposed to
                        legitimate and
                        internationally recognized governments. These conditions are prominent in Central and West
                        African
                        areas such as Sierra Leone. Rebels use inhumane methods to extract diamonds from these regions.
                        Eliminating this human rights crisis is a top priority for governments, the global diamond
                        industry,
                        the United Nations, and nongovernmental organizations (NGOs).
                    </p>
                </section>

                <section>
                    <h2>Our conflict-free diamond policy</h2>
                    <p>
                        At Adiamor, we adhere to a strict, zero-tolerance policy toward conflict diamonds. Adiamor only
                        deals
                        with highly reputable and well-known diamond suppliers who participate in the System of
                        Warranties
                        and follow the guidelines of the Kimberley Process. All diamonds provided by Adiamor are
                        obtained
                        through legitimate sources and are guaranteed to be conflict-free.
                    </p>

                    <p>
                        The World Diamond Council was formed in 2000 to help stop the trade of conflict diamonds.
                        Governments
                        and nongovernmental organizations have adopted the Kimberley Process to police trade lines and
                        aid in
                        banning the sale of conflict diamonds. The Kimberley Process, which came into operation on
                        January 1,
                        2003, is a system to ensure every rough diamond crossing the border is certified conflict-free
                        by a
                        strict system of forgery-resistant documents and serial numbers. This process has helped make
                        more
                        than 99% of all diamonds traded in the industry conflict-free.
                    </p>

                    <p>
                        If you have any questions or concerns regarding your diamond purchase, please contact one of our
                        knowledgeable representatives to assist you.
                    </p>

                    <p>
                        <NuxtLink :to="STATIC_ROUTES.DIAMONDS_SEARCH">
                            Start searching our online inventory of over 150,000 loose diamonds.
                        </NuxtLink>
                    </p>
                </section>

                <section>
                    <h2>Our stance on conflict gold</h2>
                    <p>
                        We understand the environmental and socio-economic impact that conflict gold mining practices
                        have on
                        our world. Along with other leaders of the retail jewelry industry, we have made a commitment to
                        call
                        for more responsible mining of gold and other precious metals.
                    </p>

                    <p>
                        Adiamor has signed the Golden Rules, which demonstrate the importance of responsible mining
                        principles.
                        The Golden Rules call on mining companies to meet the following basic standards:
                    </p>

                    <ul class="list-disc ml-6 space-y-2">
                        <li>Respect basic human rights outlined in international conventions and law</li>
                        <li>Obtain the free, prior, and informed consent of affected communities</li>
                        <li>Respect workers' rights and labor standards, including safe working conditions</li>
                        <li>Ensure that operations are not located in areas of armed or militarized conflict</li>
                        <li>Ensure that projects do not force communities off their lands</li>
                        <li>Ensure that projects are not located in protected areas, fragile ecosystems, or high
                            conservation areas</li>
                        <li>Refrain from dumping mine waste into oceans, rivers, lakes, or streams</li>
                        <li>Cover all costs of closing down and cleaning up mine sites</li>
                        <li>Fully disclose information about social and environmental effects of projects</li>
                        <li>Allow independent verification of the above standards</li>
                    </ul>

                    <p class="mt-4">
                        <NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_WHITE_GOLD">
                            Begin shopping for your perfect gold engagement ring.
                        </NuxtLink>
                    </p>
                </section>

            </article>
        </section>
        <section v-if="getRouteSlug === 'shipping-policy'">
            <article
                class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
                aria-labelledby="shipping-policy-title">
                <h1 id="shipping-policy-title" class="mb-4 text-xl sm:text-2xl font-normal">
                    Shipping Policy
                </h1>

                <!-- General Policy -->
                <section>
                    <p>All orders will be shipped to you fully insured.</p>
                    <p>Payment of all orders is collected in USD.</p>
                    <p>Deliveries require the signature of an adult over the age of 18.</p>
                    <p>Shipments must be made to a physical address and not a P.O. Box.</p>
                    <p>
                        Under certain circumstances, it is possible to have your package shipped to and held at a local
                        FedEx
                        location. The FedEx location must be fully staffed and able to accommodate holding packages for
                        pickup.
                        Photo identification is required for release.
                    </p>
                </section>

                <!-- Shipping Information -->
                <section>
                    <h2>Shipping Information</h2>
                    <p>
                        We offer FREE FedEx Priority Overnight Shipping on all domestic orders over $250. Orders under
                        $250
                        ship via FedEx 2Day with a $10 shipping fee. Saturday delivery is subject to availability and
                        available
                        upon request for an additional $25 fee. International orders ship via FedEx Priority
                        International at no
                        extra charge.
                    </p>
                </section>

                <!-- Processing Time -->
                <section>
                    <h2>When Will My Order Be Shipped?</h2>
                    <p>
                        Estimated ship dates are listed on product pages. Because all items are made to order,
                        processing time
                        varies by item. Once shipped, a confirmation email will be sent.
                    </p>
                    <p>
                        Orders placed before 3pm PST (Monday–Friday) are processed the same day. Orders placed after 3pm
                        PST,
                        on weekends, or holidays are processed the next business day.
                    </p>
                </section>

                <!-- International Shipping -->
                <section id="international-shipments">
                    <h2>International Shipping</h2>

                    <h3>Minimum Order Requirement</h3>
                    <p>Minimum order value for international purchases is <strong>$1,500 USD</strong>.</p>

                    <h3>Shipping and Delivery</h3>
                    <p>
                        All international orders ship free via FedEx International Priority. Estimated transit time is
                        two
                        business days, plus customs clearance time.
                    </p>

                    <h3>Duties, Taxes, and Fees</h3>
                    <p>
                        Customers are responsible for all duties, VAT, taxes, broker fees, and surcharges. These are
                        collected
                        in the destination country’s currency and are non-refundable.
                    </p>

                    <h3>APO/FPO/DPO Addresses</h3>
                    <p>We ship to APO/FPO/DPO addresses via USPS Priority Mail at no additional cost.</p>

                    <h3>Shipping Restrictions</h3>
                    <p>Adiamor reserves the right to refuse shipment to certain countries.</p>
                </section>

                <!-- Canadian Shipping -->
                <section id="canadian">
                    <h2>Canadian Shipping</h2>
                    <p>
                        No import duties apply beyond GST, PST, or HST. Taxes are collected before FedEx releases the
                        package.
                        Rates are estimates; contact FedEx for current values.
                    </p>

                    <table class="shipping-table">
                        <caption class="sr-only">Canadian Tax Rates by Province</caption>
                        <thead>
                            <tr>
                                <th scope="col">Province</th>
                                <th scope="col">Tax Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Alberta</th>
                                <td>5% GST</td>
                            </tr>
                            <tr>
                                <th scope="row">British Columbia</th>
                                <td>12% HST</td>
                            </tr>
                            <tr>
                                <th scope="row">Manitoba</th>
                                <td>5% GST, 8% PST</td>
                            </tr>
                            <tr>
                                <th scope="row">New Brunswick</th>
                                <td>13% HST</td>
                            </tr>
                            <tr>
                                <th scope="row">Nova Scotia</th>
                                <td>15% HST</td>
                            </tr>
                            <tr>
                                <th scope="row">Ontario</th>
                                <td>13% HST</td>
                            </tr>
                            <tr>
                                <th scope="row">Quebec</th>
                                <td>13% HST</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <!-- Australia -->
                <section>
                    <h2>Australian Shipping</h2>
                    <p>
                        Import duties and GST may apply depending on order value. Actual customs charges may vary.
                    </p>

                    <table class="shipping-table">
                        <caption class="sr-only">Australian Duty and Tax Estimates</caption>
                        <thead>
                            <tr>
                                <th scope="col">Category</th>
                                <th scope="col">Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">U.S. Origin Goods</th>
                                <td>0% Duty, 10% GST</td>
                            </tr>
                            <tr>
                                <th scope="row">Other Orders</th>
                                <td>5% Duty</td>
                            </tr>
                            <tr>
                                <th scope="row">Total Estimate</th>
                                <td>0% – 15.5%</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <!-- Other Countries -->
                <section>
                    <h2>ALL OTHER COUNTRIES</h2>
                    <p>Please see the chart below to calculate the duties and taxes for your order. Shipments to France
                        and Mexico require the use of an import broker to clear the package at customs. For countries
                        not listed, contact us at 1-213-627-5057 to see if shipping is available in that area.</p>
                    <table class="shipping-table">
                        <tbody>
                            <tr>
                                <td>Australia</td>
                                <td>*See Australia Shipping Detail*</td>
                            </tr>
                            <tr>
                                <td>Austria</td>
                                <td>20% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Belgium</td>
                                <td>21% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Bulgaria</td>
                                <td>20% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Canada</td>
                                <td>*See Canadian Shipping Detail*</td>
                            </tr>
                            <tr>
                                <td>Cyprus</td>
                                <td>19% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Czech Republic</td>
                                <td>21% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Denmark</td>
                                <td>25% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Estonia</td>
                                <td>20% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Finland</td>
                                <td>24% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>France</td>
                                <td>20% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Germany</td>
                                <td>19% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Greece</td>
                                <td>23% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Hong Kong</td>
                                <td>0% VAT (Value Added Tax) <br>Read More: <a target="_blank"
                                        href="https://www.customs.gov.hk/" rel="noopener">www.customs.gov.hk</a>
                                </td>
                            </tr>
                            <tr>
                                <td>Hungary</td>
                                <td>27% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Ireland</td>
                                <td>23% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Italy</td>
                                <td>22% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Japan</td>
                                <td>8-13% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Latvia</td>
                                <td>21% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Lithuania</td>
                                <td>21% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Luxembourg</td>
                                <td>17% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Mexico</td>
                                <td>16% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Netherlands</td>
                                <td>21% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>New Zealand</td>
                                <td>15% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Norway</td>
                                <td>25% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Poland</td>
                                <td>23% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Portugal</td>
                                <td>23% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Romania</td>
                                <td>20% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Singapore</td>
                                <td>7% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Slovakia</td>
                                <td>20% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Slovenia</td>
                                <td>22% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Spain</td>
                                <td>21% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Sweden</td>
                                <td>25% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>Switzerland</td>
                                <td>8% VAT (Value Added Tax)</td>
                            </tr>
                            <tr>
                                <td>United Kingdom (England, Scotland, Wales, N. Ireland)</td>
                                <td>20% VAT (Value Added Tax)</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

            </article>
        </section>
        <section v-if="getRouteSlug === 'return-policy'"
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            role="region" aria-labelledby="return-policy-title">
            <h1 id="return-policy-title" class="mb-4 text-xl sm:text-2xl font-normal">
                Return Policy
            </h1>

            <div>
                <p>
                    Adiamor believes in your complete satisfaction and will gladly refund, replace or exchange any
                    unworn
                    item received back in our facility within 30 days.
                </p>

                <hr aria-hidden="true" />

                <p>To return an item:</p>

                <h2>1. Obtain a Return Authorization Code.</h2>
                <p>
                    Call Adiamor toll-free at {{ phoneNumber }} to obtain your return authorization number and please be
                    sure
                    to write it on the outside of the package.
                </p>

                <h2>2. Repackage the item as securely as possible.</h2>
                <p>
                    Repack your item securely with the diamond certificate, if appropriate. Please ensure that the
                    contents of the package are in their original condition and secure within the box. For your
                    security, please do not indicate the contents of the package on the exterior of the box.
                </p>

                <h2>3. Ship the package.</h2>
                <p>
                    Return the package to us by registered mail. Insure the package for the full purchase price. For
                    security reasons, do not disclose the contents when insuring the package. Adiamor is not responsible
                    for any loss or damage that occurs during shipping.
                </p>

                <h2>4. Name and address.</h2>
                <p>
                    Please make sure that your name and address are clearly printed on the outside of the package, and
                    mail it to:
                </p>

                <p>
                    Adiamor, Inc.<br />
                    <span v-html="$sanitize(store.officeAddress)"></span>
                </p>

                <p>
                    Orders are typically refunded in full within 4 business days after we receive and inspect the
                    returned item.
                </p>
            </div>
        </section>
        <section v-if="getRouteSlug === 'gift-packaging'"
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            role="region" aria-labelledby="gift-packaging-title">
            <h1 id="gift-packaging-title" class="mb-4 text-xl sm:text-2xl font-normal">
                Luxury Gift Packaging
            </h1>

            <div class="section-top">
                <p>The Perfect Presentation</p>

                <hr aria-hidden="true" />

                <p>
                    Adiamor presents each diamond engagement ring, wedding band or other diamond keepsake in a luxurious
                    Rosewood jewelry box with a cream leather interior.
                </p>

                <p>
                    Upon request we are pleased to include our signature dark brown ribbon embellished with the Adiamor
                    logo.
                </p>

                <p>
                    You can be confident in your presentation knowing that Adiamor has taken care of every aspect of
                    your
                    order, down to the smallest detail.
                </p>

                <p>
                    To request a specialty ribbon, simply contact Customer Service at
                    <a :href="`tel:${telPhoneNumber}`" aria-label="Call customer service">
                        {{ phoneNumber }}
                    </a>,
                    or
                    <a href="mailto:service@adiamor.com" aria-label="Email customer service">
                        send us an email
                    </a>.
                </p>

                <p>
                    Start shopping for your perfect
                    <NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH" aria-label="Shop diamond engagement rings">
                        diamond engagement ring
                    </NuxtLink>
                    or
                    <NuxtLink :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH" aria-label="Shop wedding bands">
                        wedding band
                    </NuxtLink>
                    today!
                </p>
            </div>
        </section>
        <section v-if="getRouteSlug === 'warranty'"
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            role="region" aria-labelledby="warranty-title">
            <h1 id="warranty-title" class="mb-4 text-xl sm:text-2xl font-normal">
                Lifetime Warranty
            </h1>

            <div>
                <p>
                    Adiamor believes in complete customer satisfaction and peace of mind, therefore, your engagement
                    ring
                    purchase is backed by our lifetime warranty. As a jewelry manufacturing company, Adiamor has the
                    advantage of closely inspecting each ring throughout the various stages of production. This
                    opportunity allows us to provide high quality hand-crafted products with superior craftsmanship.
                </p>

                <p>
                    Precious metals and diamonds are delicate by nature and require care and attention to extend the
                    lifetime of the jewelry piece. Rings in particular need routine preventative maintenance due to the
                    constant impact incurred by day-to-day wear. Issues that you may encounter from regular wear such as
                    a bent band, missing or broken diamonds, worn out, bent or broken prongs are considered "wear and
                    tear" and will not be covered by our warranty. Since these occurrences are anticipated through the
                    lifetime of your rings, it is recommended to obtain insurance coverage for the possibility of loss,
                    theft or damage which is not covered by Adiamor. In addition, damage caused during sizing or
                    services performed by someone other than Adiamor will not be covered by our warranty.
                </p>

                <p>
                    If you experience an issue requiring repair, Adiamor will gladly inspect your ring and evaluate the
                    problem. If the issue is determined to be the cause of manufacturing defect, we will address the
                    repairs at no cost to you. If the problem is determined to be the cause of wear and tear, you may
                    choose to obtain a quote for costs of repair, or submit your claim with your insurance company.
                </p>

                <h2>Ring Care and Preventative Maintenance</h2>

                <p>
                    Adiamor recommends visiting your local jeweler every 6-12 months to maintain the beauty and
                    integrity
                    of your ring. Regular maintenance will help ensure the security of your diamonds. This care is
                    particularly essential in rings, as our hands are subject to constant impact during regular daily
                    activity. During the preventative maintenance, your ring should be reviewed for structural integrity
                    and loose or damaged diamonds. After a thorough cleaning and polishing of the metal, each diamond
                    should be checked and tightened as loosening is expected. Rhodium plating is the final step of 14k
                    and
                    18k white gold.
                </p>

                <p>
                    Your Adiamor purchase includes complimentary service of tightening, polishing, rhodium plating and
                    cleaning for the life of your fine jewelry. Items shipped to Adiamor for routine maintenance are
                    subject to a nominal shipping fee.
                </p>

                <p>
                    Between professional cleanings, your rings can be maintained with our Adiamor Foaming Cleaner or one
                    like it. It is not recommended to use professional grade cleaners or an ultrasonic cleaning device
                    without professional assistance. If you would like to send your Adiamor rings to be serviced by our
                    jewelers, please contact one of our customer service representatives by phone at
                    <a :href="`tel:${telPhoneNumber}`" aria-label="Call customer service">
                        {{ phoneNumber }}
                    </a>
                    or by email at
                    <a href="mailto:service@adiamor.com" aria-label="Email customer service">
                        service@adiamor.com
                    </a>.
                </p>
            </div>
        </section>
        <section v-if="getRouteSlug === 'diamond-price-match'"
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            role="region" aria-labelledby="diamond-price-match-title">
            <h1 id="diamond-price-match-title" class="mb-4 text-xl sm:text-2xl font-normal">
                Diamond Price Match
            </h1>

            <div>
                <p>
                    Adiamor is committed to providing the highest quality diamond jewelry at the lowest possible prices,
                    which is why we are extending a diamond price match policy to all of our valued customers. If you
                    find a specific loose diamond publicly listed at a lower price on a competitor’s website - simply
                    contact us and provide one of our experts with the diamond specifications.
                </p>

                <p>
                    Our on-site diamond experts do not work on commission and are dedicated to providing you with the
                    best service possible. Why pay more somewhere else for the same diamond? Please contact one of our
                    representatives at
                    <a :href="`tel:${telPhoneNumber}`" aria-label="Call customer service">
                        {{ phoneNumber }}
                    </a>
                    or by email at
                    <a href="mailto:service@adiamor.com" aria-label="Email customer service">
                        service@adiamor.com
                    </a>
                    for more information.
                </p>

                <p>
                    <a :href="STATIC_ROUTES.DIAMONDS_SEARCH">
                        Click here
                        <span class="sr-only">to browse loose diamonds</span>
                    </a>
                    to begin searching our online collection of over 150,000
                    loose diamonds, and find your perfect gem today!
                </p>

                <h2>Terms of Adiamor’s Diamond Price Match Policy</h2>

                <p>
                    All price matches must be based on current, verifiable public listings by an authorized U.S.-based
                    diamond retailer with an established business history and publicly accessible business information,
                    including a valid business address. Price match requests relying on screenshots, archived listings,
                    or otherwise unverifiable sources will not be accepted.
                </p>

                <p>
                    Since all diamonds are unique, we require diamonds to be graded by one of the following reputable
                    institutions: Gemological Institute of America (GIA), American Gem Society (AGS), Gem Certification
                    &
                    Assurance Lab (GCAL), or International Gemological Institute (IGI).
                </p>

                <p>
                    For a price match to be considered, the competitor’s listing must include the diamond’s certificate
                    number, which must be verifiable directly through their website.
                </p>

                <p>
                    We are unable to price match loose diamonds sold by unauthorized sellers, private individuals, or
                    retailers without sufficient public information to verify legitimacy.
                </p>

                <p>
                    Price matches must be requested prior to purchase and cannot be applied retroactively. All price
                    matches are at the sole discretion of Adiamor and must be in U.S. dollars. We reserve the right to
                    refuse any price match request and may modify or terminate this policy at any time.
                </p>
            </div>
        </section>
        <section v-if="getRouteSlug === 'engraving'"
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            role="region" aria-labelledby="engraving-title">
            <h1 id="engraving-title" class="mb-4 text-xl sm:text-2xl font-normal">
                Ring Engraving
            </h1>

            <div>
                <p>
                    <em>Personalize your wedding band or engagement ring with our ring engraving services.</em>
                </p>

                <hr aria-hidden="true" />

                <p>
                    If you would like to add a custom message to your wedding band or diamond engagement ring, please
                    enter a note with your custom message and font selection in the comments box on the Order
                    Confirmation step of your shopping cart. You can choose between our standard block font or a script
                    font as shown below. A fee of $30 per engraved ring will be applied to your order. Since all rings
                    and bands differ slightly in size, we may not always be able to accommodate the size of your
                    message. In this event, we will contact you by phone to discuss your options.
                </p>

                <div class="grid grid-cols-2 gap-4" role="group" aria-label="Engraving font samples">
                    <div>
                        <nuxt-img provider="cdn" src="/landing-pages/Policy/block_sample_2.webp"
                            alt="Block font engraving sample" style="width: 100%; padding: 10px;" />
                    </div>

                    <div>
                        <nuxt-img provider="cdn" src="/landing-pages/Policy/script_sample_2.webp"
                            alt="Script font engraving sample" style="width: 100%; padding: 10px;" />
                    </div>
                </div>

                <p>
                    While all engraved engagement rings and wedding bands are still protected by our 30-Day Return
                    Policy, all engraving fees are non-refundable. Please note that while in most cases custom jewelry
                    engraving will not affect your estimated ship date, there may be special cases where it may require
                    an additional day.
                </p>

                <p>
                    If you have a special engraving request or a question about our engraving service that is not
                    answered here, please contact one of our Customer Service Representatives by phone at
                    <a :href="`tel:${telPhoneNumber}`" aria-label="Call customer service">
                        {{ phoneNumber }}
                    </a>
                    or by email at
                    <a href="mailto:service@adiamor.com" aria-label="Email customer service">
                        service@adiamor.com
                    </a>.
                </p>

                <p>
                    Return to searching for your perfect
                    <NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH" aria-label="Browse diamond engagement rings">
                        diamond engagement ring
                    </NuxtLink>.
                </p>
            </div>
        </section>
        <!-- <section v-if="getRouteSlug === 'diamond-upgrade-program'"
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            role="region" aria-labelledby="diamond-upgrade-title">
            <h1 id="diamond-upgrade-title" class="mb-4 text-xl sm:text-2xl font-normal">
                Diamond Upgrade Program
            </h1>

            <div>
                <p>
                    If for any reason you would like to upgrade your GIA certified natural diamond to one of greater
                    quality, Adiamor will apply the full credit of your original GIA certified natural diamond purchase
                    towards the purchase of any new GIA certified natural diamond priced at least twice the original
                    amount or higher. Your natural diamond must be in its original condition and accompanied by its
                    original GIA diamond grading report. Please note that any diamond sent in for our upgrade policy
                    will require inspection prior to finalizing agreement. Our Diamond Upgrade Policy applies to GIA
                    certified natural diamonds only; on orders placed between January 1, 2012 and January 1, 2023.
                </p>

                <p>
                    <NuxtLink :to="STATIC_ROUTES.DIAMONDS_SEARCH" aria-label="Browse loose diamonds">
                        Start searching
                    </NuxtLink>
                    for a new, loose diamond. Our online inventory features over 400,000 diamonds to choose from!
                </p>
            </div>
        </section> -->
        <section v-if="getRouteSlug === 'financing-and-insurance'"
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            role="region" aria-labelledby="financing-insurance-title">
            <h1 id="financing-insurance-title" class="mb-4 font-normal text-xl sm:text-2xl">
                Financing And Insurance
            </h1>

            <div>
                <!-- Affirm -->
                <h2>Financing with Affirm</h2>

                <p>
                    <img style="width: 100%; max-width: 205px; float: right;"
                        src="https://cdn-assets.affirm.com/images/buttons/42x205-blue.svg"
                        alt="Affirm financing logo" />
                </p>

                <p>We have partnered with Affirm to give you a simple way to make your purchase with no hidden fees.</p>

                <p>
                    Easy monthly payments: Provide some basic information and get a real-time credit decision to split
                    your purchase into monthly payments.
                </p>

                <p>
                    Flexible repayment: Simply pay your monthly bill using a debit card or bank transfer at
                    <a target="_blank" href="https://www.affirm.com/pay" rel="noopener"
                        aria-label="Pay your Affirm bill online">
                        www.affirm.com/pay
                    </a>.
                </p>

                <p>
                    Your rate will be 0–36% APR based on credit, and is subject to an eligibility check. For example, a
                    $700 purchase might cost $63.18/mo over 12 months at 15% APR. Payment options through Affirm are
                    provided by these lending partners:
                    <a target="_blank" href="http://affirm.com/lenders" rel="noopener"
                        aria-label="Affirm lending partners">
                        https://www.affirm.com/lenders
                    </a>.
                    Options depend on your purchase amount and a down payment may be required.
                </p>

                <p>
                    Read more at
                    <a target="_blank" href="https://www.affirm.com/how-it-works" rel="noopener"
                        aria-label="How Affirm works">
                        https://www.affirm.com/how-it-works
                    </a>
                </p>

                <hr aria-hidden="true" />

                <!-- Jewelers Mutual -->
                <h2>Jewelers Mutual</h2>

                <p>
                    <img style="width: 100%; max-width: 205px; float: right;"
                        src="https://www.jewelersmutual.com/sites/default/files/2023-08/JM-Logo-Blue.svg"
                        alt="Jewelers Mutual Insurance logo" />
                </p>

                <p>
                    Your Adiamor purchase is covered by our insurance from the time it leaves our jeweler’s workshop to
                    the moment it arrives at your door. Learn how to continue this protection once your purchase is in
                    your hands.
                </p>

                <p>
                    Your favorite pieces of jewelry reflect who you are and connect you to special moments with the ones
                    you love. Jewelers Mutual Insurance Company – the only company specializing exclusively in jewelry
                    insurance in the US and Canada – offers Jewelers Mutual Jewelry Insurance to safeguard your
                    treasured
                    keepsakes and protect the cherished memories each item represents.
                </p>

                <h3>Jewelry insurance built around the way you live your life.</h3>

                <p>
                    Adiamor has partnered with Jewelers Mutual Insurance Company to provide you with the option of
                    insuring your new jewelry with its comprehensive repair or replacement coverage. Insuring your
                    Adiamor jewelry is quick and easy, and gives you the freedom to wear your jewelry without worry,
                    knowing it’s being protected by the only insurer dedicated exclusively to jewelry insurance for more
                    than 100 years.
                </p>

                <h3>Advantages include:</h3>

                <ul style="list-style-type: unset; margin: 15px 30px 25px; padding: unset; line-height: 30px;">
                    <li>Coverage that often goes beyond standard homeowners insurance and warranties</li>
                    <li>Worldwide protection against loss, theft, damage and mysterious disappearance</li>
                    <li>Flexibility to choose your own jeweler; no need for multiple estimates</li>
                    <li>Repair of damaged jewelry with the same level of quality as the original</li>
                    <li>Repair or replacement with the same kind and quality as the original</li>
                    <li>GIA Graduate Gemologists and American Gem Society Certified Gemologists on staff</li>
                    <li>Fast, professional, compassionate claim experience</li>
                    <li>Personal assistance when you need it</li>
                </ul>

                <p>
                    <a class="btn jquery-button blue-button" href="https://www.jewelersmutual.com/adiamor"
                        target="_blank" rel="noopener"
                        aria-label="Get a jewelry insurance quote instantly from Jewelers Mutual"
                        style="margin-left: 2em;">
                        GET A QUOTE INSTANTLY
                    </a>
                </p>

                <h2>Have questions about jewelry insurance?</h2>

                <p>
                    If you have any questions about Jewelers Mutual’s Jewelry Insurance, please email
                    <a href="mailto:personaljewelry@jminsure.com" aria-label="Email Jewelers Mutual">
                        personaljewelry@jminsure.com
                    </a>
                    or call
                    <a href="tel:18888842424" aria-label="Call Jewelers Mutual">888.884.2424</a>.
                </p>

                <p><em>*Product not available in Quebec.</em></p>

                <p>
                    Must be at least 18 years of age to apply for insurance. Jewelers Mutual has provided this content.
                    Jewelers Mutual is an alternative to other insurance companies you may be considering. Adiamor is
                    not a licensed agent of Jewelers Mutual and may not sell or recommend insurance.
                </p>

                <p>
                    <em>
                        Coverage is subject to the provisions, limitations, exclusions, and endorsements in the policy
                        and
                        the level of coverage you select.
                    </em>
                </p>

                <p>
                    <em>
                        By clicking the button above – "Get a quote instantly" – you authorize Jewelers Mutual to use a
                        secure system to retrieve and save details of this purchase from Adiamor for the purpose of
                        calculating an insurance quote. Retrieved information may include your name and address.
                    </em>
                </p>
            </div>
        </section>
        <!--Pending-->
        <section
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            v-if="getRouteSlug === 'privacy-policy'">
            <div>
                <h1 class="mb-4 text-xl sm:text-2xl font-normal">Privacy Policy of <strong>Adiamor</strong></h1>
                <p>This Application collects some Personal Data from its Users.</p>
                <p>Users may be subject to different protection standards and broader standards may therefore apply to
                    some. Users can contact the Owner, to learn more about such standards.</p>

                <p>This document contains <a href="#cookie_policy_further_information" target="_self">a section
                        dedicated to Users in the European Union and their privacy rights</a>.</p>
                <p>This document contains <a href="#all_us_laws_info" target="_self">a section dedicated to Users in the
                        United States and their privacy rights.</a></p>
                <p>This document can be printed for reference by using the print command in the settings of any browser.
                </p>
                <h2 id="owner_of_the_data">
                    Owner and Data Controller
                </h2>
                <p>Adiamor
                    <br>
                    <span v-html="$sanitize(store.officeAddress)"></span>
                </p>
                <p><strong>Owner contact email:</strong> service@adiamor.com</p>
                <h2 id="types_of_data">
                    Types of Data collected
                </h2>
                <p>
                    Among the types of Personal Data that this Application collects, by itself or through third parties,
                    there are:
                    email address; Cookies; Usage Data; first name; last name; phone number; device information; number
                    of Users; city; session statistics; latitude (of city); longitude (of city); browser information;
                    answers to questions; clicks; keypress events; motion sensor events; mouse movements; scroll
                    position; touch events; User ID; unique device identifiers for advertising (Google Advertiser ID or
                    IDFA, for example); various types of Data; physical address; billing address; state; ZIP/Postal
                    code; contents of the email or message; purchase history; product interaction; Data communicated in
                    order to use the Service; order ID.
                </p>
                <p>Complete details on each type of Personal Data collected are provided in the dedicated sections of
                    this privacy policy or by specific explanation texts displayed prior to the Data
                    collection.<br>Personal Data may be freely provided by the User, or, in case of Usage Data,
                    collected automatically when using this Application.<br>Unless specified otherwise, all Data
                    requested by this Application is mandatory and failure to provide this Data may make it impossible
                    for this Application to provide its services. In cases where this Application specifically states
                    that some Data is not mandatory, Users are free not to communicate this Data without consequences to
                    the availability or the functioning of the Service.<br>Users who are uncertain about which Personal
                    Data is mandatory are welcome to contact the Owner.<br>Any use of Cookies – or of other tracking
                    tools — by this Application or by the owners of third-party services used by this Application serves
                    the purpose of providing the Service required by the User, in addition to any other purposes
                    described in the present document and in the Cookie Policy.</p>
                <p>Users are responsible for any third-party Personal Data obtained, published or shared through this
                    Application.</p>
                <h2 id="place_of_processing">Mode and place of processing the Data</h2>
                <h3>
                    Methods of processing
                </h3>
                <p>The Owner takes appropriate security measures to prevent unauthorized access, disclosure,
                    modification, or unauthorized destruction of the Data.<br>The Data processing is carried out using
                    computers and/or IT enabled tools, following organizational procedures and modes strictly related to
                    the purposes indicated. In addition to the Owner, in some cases, the Data may be accessible to
                    certain types of persons in charge, involved with the operation of this Application (administration,
                    sales, marketing, legal, system administration) or external parties (such as third-party technical
                    service providers, mail carriers, hosting providers, IT companies, communications agencies)
                    appointed, if necessary, as Data Processors by the Owner. The updated list of these parties may be
                    requested from the Owner at any time.</p>
                <h3>
                    Place
                </h3>
                <p>The Data is processed at the Owner's operating offices and in any other places where the parties
                    involved in the processing are located.<br><br>
                    Depending on the User's location, data transfers may involve transferring the User's Data to a
                    country other than their own. To find out more about the place of processing of such transferred
                    Data, Users can check the section containing details about the processing of Personal Data.</p>
                <h3>
                    Retention time
                </h3>
                <p>Unless specified otherwise in this document, Personal Data shall be processed and stored for as long
                    as required by the purpose they have been collected for and may be retained for longer due to
                    applicable legal obligation or based on the Users’ consent.</p>
                <h2 id="use_collected_data">The purposes of processing</h2>
                <p>
                    The Data concerning the User is collected to allow the Owner to provide its Service, comply with its
                    legal obligations, respond to enforcement requests, protect its rights and interests (or those of
                    its Users or third parties), detect any malicious or fraudulent activity, as well as the following:
                    Infrastructure monitoring, Analytics, Tag Management, Displaying content from external platforms,
                    Advertising, Handling productivity related activity , Interaction with data collection platforms and
                    other third parties, Interaction with external social networks and platforms, Heat mapping and
                    session recording, Remarketing and behavioral targeting, SPAM protection, Hosting and backend
                    infrastructure, Contacting the User, Registration and authentication provided directly by this
                    Application and Managing contacts and sending messages.
                </p>
                <p>For specific information about the Personal Data used for each purpose, the User may refer to the
                    section “Detailed information on the processing of Personal Data”.</p>

                <div data-locale="en"></div>
                <h2 id="data_processing_detailed_info">Detailed information on the processing of Personal Data</h2>
                <p>Personal Data is collected for the following purposes and using the following services:</p>
                <h3>
                    Advertising
                </h3>
                <p>This type of service allows User Data to be utilized for advertising communication purposes. These
                    communications are displayed in the form of banners and other advertisements on this Application,
                    possibly based on User interests.<br>
                    This does not mean that all Personal Data are used for this purpose. Information and conditions of
                    use are shown below. <br>
                    Some of the services listed below may use Trackers to identify Users or they may use the behavioral
                    retargeting technique, i.e. displaying ads tailored to the User’s interests and behavior, including
                    those detected outside this Application. For more information, please check the privacy policies of
                    the relevant services.<br>
                    Services of this kind usually offer the possibility to opt out of such tracking. In addition to any
                    opt-out feature offered by any of the services below, Users may learn more on how to generally opt
                    out of interest-based advertising within the dedicated section "How to opt-out of interest-based
                    advertising" in this document.</p>
                <h4>
                    Microsoft Advertising (Microsoft Corporation)
                </h4>
                <p>Microsoft Advertising is an advertising service provided by Microsoft Corporation.</p>
                <p>Personal Data processed: Cookies; Usage Data.</p>
                <p>Place of processing: United States – <a href="https://privacy.microsoft.com/PrivacyStatement "
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a> – <a
                        href="https://account.microsoft.com/privacy/ad-settings/signedout?ru=https:%2F%2Faccount.microsoft.com%2Fprivacy%2Fad-settings">Opt
                        Out</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>

                    <li>a Sharing in California</li>

                </ul>
                <h4>
                    Criteo (Criteo SA)
                </h4>
                <p>Criteo is an advertising service provided by Criteo SA.</p>
                <p>Personal Data processed: Cookies; Usage Data.</p>
                <p>Place of processing: France – <a href="https://www.criteo.com/privacy/" target="_blank"
                        rel="noopener noreferrer">Privacy Policy</a> – <a href="https://www.criteo.com/privacy/">Opt
                        Out</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>

                    <li>a Sharing in California</li>

                </ul>
                <h4>
                    Pinterest Conversion Tag (Pinterest, Inc.)
                </h4>
                <p>Pinterest Conversion Tag is an analytics service provided by Pinterest, Inc. that connects data from
                    the Pinterest advertising network with actions performed on this Application.</p>

                <p>Users may opt out of behavioral advertising features through their device settings, their Pinterest
                    <a href="https://www.pinterest.com/settings/">personalization settings</a> or by visiting the <a
                        href="https://optout.aboutads.info/">AdChoices opt-out page</a>.
                </p>
                <p>Personal Data processed: device information; Trackers; Usage Data.</p>
                <p>Place of processing: United States – <a href="https://policy.pinterest.com/en/privacy-policy"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a> – <a
                        href="https://policy.pinterest.com/en/privacy-policy#section-choices-you-have-about-your-info">Opt
                        out</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>


                </ul>
                <h4>
                    Google Ads conversion tracking
                </h4>
                <p>Google Ads conversion tracking is an analytics service provided by Google LLC or by Google Ireland
                    Limited, depending on how the Owner manages the Data processing, that connects data from the Google
                    Ads advertising network with actions performed on this Application.</p>
                <p>Personal Data processed: Trackers; Usage Data.</p>
                <p>Place of processing: United States – <a href="https://policies.google.com/privacy" target="_blank"
                        rel="noopener noreferrer">Privacy Policy</a>; Ireland – <a
                        href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy
                        Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                </ul>
                <h4>
                    Meta ads conversion tracking (Meta pixel) (Meta Platforms, Inc.)
                </h4>
                <p>Meta ads conversion tracking (Meta pixel) is an analytics service provided by Meta Platforms, Inc.
                    that connects data from the Meta Audience Network with actions performed on this Application. The
                    Meta pixel tracks conversions that can be attributed to ads on Facebook, Instagram and Meta Audience
                    Network.</p>

                <p>Personal Data processed: Trackers; Usage Data.</p>
                <p>Place of processing: United States – <a href="https://www.facebook.com/about/privacy/"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a> – <a
                        href="https://www.facebook.com/adpreferences/ad_settings">Opt out</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                </ul>
                <h4>
                    Pinterest Ads (Pinterest, Inc.)
                </h4>
                <p>Pinterest Ads is an advertising service provided by Pinterest, Inc. that allows the Owner to run
                    advertising campaigns on the Pinterest advertising network.</p>
                <p>Users may opt out of behavioral advertising features through their device settings, their Pinterest
                    <a href="https://www.pinterest.com/settings/">personalization settings</a>.
                </p>
                <p>Personal Data processed: device information; email address; Trackers; unique device identifiers for
                    advertising (Google Advertiser ID or IDFA, for example); Usage Data; User ID.</p>
                <p>Place of processing: United States – <a href="https://policy.pinterest.com/en/privacy-policy"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a> – <a
                        href="https://policy.pinterest.com/en/privacy-policy#section-choices-you-have-about-your-info">Opt
                        out</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers; internet or other
                    electronic network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>

                    <li>a Sharing in California</li>
                </ul>
                <h3 class="iub-purpose iub-purpose-7409194">
                    Analytics
                </h3>
                <p>The services contained in this section enable the Owner to monitor and analyze web traffic and can be
                    used to keep track of User behavior.</p>
                <h4>
                    Google Analytics (Universal Analytics) (Google LLC)
                </h4>
                <p>Google Analytics (Universal Analytics) is a web analysis service provided by Google LLC (“Google”).
                    Google utilizes the Data collected to track and examine the use of this Application, to prepare
                    reports on its activities and share them with other Google services.<br>
                    Google may use the Data collected to contextualize and personalize the ads of its own advertising
                    network.</p>

                <p>In order to understand Google's use of Data, consult <a
                        href="https://www.google.com/policies/privacy/partners/">Google's partner policy</a>.</p>

                <p>Personal Data processed: Cookies; Usage Data.</p>
                <p>Place of processing: United States – <a href="https://business.safety.google/privacy/"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a> – <a
                        href="https://tools.google.com/dlpage/gaoptout?hl=en"
                        @click.prevent="$callGlobal('tryFunc', 'tryGaOptOut', { href: 'https://tools.google.com/dlpage/gaoptout?hl=en' })"
                        target="_blank">Opt Out</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in the United States</li>
                </ul>
                <h4>
                    Google Analytics 4 (Google LLC)
                </h4>
                <p>Google Analytics 4 is a web analysis service provided by Google LLC (“Google”). Google utilizes the
                    Data collected to track and examine the use of this Application, to prepare reports on its
                    activities and share them with other Google services.<br>
                    Google may use the Data collected to contextualize and personalize the ads of its own advertising
                    network.<br>
                    In Google Analytics 4, IP addresses are used at collection time and then discarded before Data is
                    logged in any data center or server. Users can learn more by consulting <a
                        href="https://support.google.com/analytics/answer/12017362?hl=en&amp;ref_topic=2919631">Google’s
                        official documentation</a>.</p>
                <p>In order to understand Google's use of Data, consult <a
                        href="https://www.google.com/policies/privacy/partners/">Google's partner policy</a>.</p>
                <p>Personal Data processed: browser information; city; device information; latitude (of city); longitude
                    (of city); number of Users; session statistics; Trackers; Usage Data.</p>
                <p>Place of processing: United States – <a href="https://business.safety.google/privacy/"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a> – <a
                        href="https://tools.google.com/dlpage/gaoptout?hl=en">Opt Out</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers; internet or other
                    electronic network activity information; geolocation data.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                </ul>
                <h4>
                    Meta Events Manager (Meta Platforms, Inc.)
                </h4>
                <p>Meta Events Manager is an analytics service provided by Meta Platforms, Inc. By integrating the Meta
                    pixel, Meta Events Manager can give the Owner insights into the traffic and interactions on this
                    Application.</p>

                <p>Personal Data processed: Trackers; Usage Data.</p>
                <p>Place of processing: United States – <a href="https://www.facebook.com/privacy/policy/"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a> – <a
                        href="https://www.facebook.com/adpreferences/ad_settings">Opt out</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                </ul>
                <h3 class="iub-purpose iub-purpose-11075090">
                    Contacting the User
                </h3>
                <h4>
                    Contact form (this Application)
                </h4>
                <p>By filling in the contact form with their Data, the User authorizes this Application to use these
                    details to reply to requests for information, quotes or any other kind of request as indicated by
                    the form’s header.</p>
                <p>Personal Data processed: email address; first name; last name; phone number; various types of Data.
                </p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                </ul>
                <h4>
                    Mailing list or newsletter (this Application)
                </h4>
                <p>By registering on the mailing list or for the newsletter, the User’s email address will be added to
                    the contact list of those who may receive email messages containing information of commercial or
                    promotional nature concerning this Application. Your email address might also be added to this list
                    as a result of signing up to this Application or after making a purchase.</p>
                <p>Personal Data processed: email address; phone number.</p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in the United States</li>
                </ul>
                <h3 class="iub-purpose iub-purpose-7409196">
                    Displaying content from external platforms
                </h3>
                <p>This type of service allows you to view content hosted on external platforms directly from the pages
                    of this Application and interact with them.<br>
                    This type of service might still collect web traffic data for the pages where the service is
                    installed, even when Users do not use it.</p>
                <h4>
                    Google Fonts (Google LLC)
                </h4>
                <p>Google Fonts is a typeface visualization service provided by Google LLC that allows this Application
                    to incorporate content of this kind on its pages.</p>

                <p>Personal Data processed: Usage Data; various types of Data as specified in the privacy policy of the
                    service.</p>

                <p>Place of processing: United States – <a href="https://policies.google.com/privacy" target="_blank"
                        rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                </ul>
                <h3 class="iub-purpose iub-purpose-8006471">
                    Handling productivity related activity
                </h3>
                <p>This type of service helps the Owner to manage tasks, collaboration and, in general, activities
                    related to productivity. In using this type of service, Data of Users will be processed and may be
                    retained, depending on the purpose of the activity in question.<br>
                    These services may be integrated with a wide range of third-party services disclosed within this
                    privacy policy to enable the Owner to import or export Data needed for the relative activity.</p>
                <h4>
                    Google Workspace (Google LLC)
                </h4>
                <p>Google Workspace is an integrated suite of cloud-based productivity, collaboration and storage
                    services provided by Google LLC. Gmail or other G Suite services are not scanned by Google for
                    advertising purposes. In addition, Google does not collect or use data inside these services for
                    advertising purposes in any other way.</p>
                <p>Personal Data processed: email address.</p>
                <p>Place of processing: United States – <a href="https://policies.google.com/privacy " target="_blank"
                        rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                </ul>
                <h3 class="iub-purpose iub-purpose-9937687">
                    Heat mapping and session recording
                </h3>
                <p>Heat mapping services are used to display the areas of this Application that Users interact with most
                    frequently. This shows where the points of interest are. These services make it possible to monitor
                    and analyze web traffic and keep track of User behavior.<br>
                    Some of these services may record sessions and make them available for later visual playback.</p>
                <h4>
                    Microsoft Clarity (Microsoft Corporation)
                </h4>
                <p>Microsoft Clarity is a session recording and heat mapping service provided by Microsoft
                    Corporation.<br>
                    Microsoft processes or receives Personal Data via Microsoft Clarity, which in turn may be used for
                    any purpose in accordance with the Microsoft Privacy Statement, including improving and providing
                    Microsoft Advertising.</p>
                <p>Personal Data processed: Trackers.</p>
                <p>Place of processing: United States – <a href="https://privacy.microsoft.com/en-us/privacystatement"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                </ul>
                <h3 class="iub-purpose iub-purpose-11075087">
                    Hosting and backend infrastructure
                </h3>
                <p>This type of service has the purpose of hosting Data and files that enable this Application to run
                    and be distributed as well as to provide a ready-made infrastructure to run specific features or
                    parts of this Application.</p>
                <p>Some services among those listed below, if any, may work through geographically distributed servers,
                    making it difficult to determine the actual location where the Personal Data are stored.</p>
                <h4>
                    Amazon Web Services (AWS) (Amazon Web Services, Inc.)
                </h4>
                <p>Amazon Web Services (AWS) is a hosting and backend service provided by Amazon Web Services, Inc.</p>
                <p>Personal Data processed: various types of Data as specified in the privacy policy of the service.</p>
                <p>Place of processing: United States – <a href="https://aws.amazon.com/compliance/data-privacy-faq/"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers.
                </p>
                <h3 class="iub-purpose iub-purpose-7409193">
                    Infrastructure monitoring
                </h3>
                <p>This type of service allows this Application to monitor the use and behavior of its components so its
                    performance, operation, maintenance and troubleshooting can be improved.<br>
                    Which Personal Data are processed depends on the characteristics and mode of implementation of these
                    services, whose function is to filter the activities of this Application.</p>
                <h4>
                    Bugsnag (Bugsnag Inc.)
                </h4>
                <p>Bugsnag is a monitoring service provided by Bugsnag Inc.</p>
                <p>Personal Data processed: email address.</p>
                <p>Place of processing: United States – <a href="https://docs.bugsnag.com/legal/privacy-policy/"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <h4>
                    Sentry (Functional Software, Inc. )
                </h4>
                <p>Sentry is a monitoring service provided by Functional Software, Inc. .</p>
                <p>Personal Data processed: various types of Data as specified in the privacy policy of the service.</p>
                <p>Place of processing: United States – <a href="https://sentry.io/privacy/" target="_blank"
                        rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers.
                </p>
                <!-- Service end -->
                <h3 class="iub-purpose iub-purpose-8142198">
                    Interaction with data collection platforms and other third parties
                </h3>
                <p>This type of service allows Users to interact with data collection platforms or other services
                    directly from the pages of this Application for the purpose of saving and reusing data.<br>
                    If one of these services is installed, it may collect browsing and Usage Data in the pages where it
                    is installed, even if the Users do not actively use the service.</p>
                <!-- Service start -->
                <h4>
                    Mailchimp widget (The Rocket Science Group LLC)
                </h4>
                <p>The Mailchimp widget is a service for interacting with the Mailchimp email address management and
                    message sending service provided by The Rocket Science Group LLC.</p>
                <p>Personal Data processed: email address; first name; last name; phone number.</p>

                <p>Place of processing: United States – <a href="https://mailchimp.com/legal/privacy/" target="_blank"
                        rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                    <li>a Sharing in California</li>
                </ul>
                <!-- Service end -->
                <h3 class="iub-purpose iub-purpose-8142200">
                    Interaction with external social networks and platforms
                </h3>
                <p>This type of service allows interaction with social networks or other external platforms directly
                    from the pages of this Application.<br>
                    The interaction and information obtained through this Application are always subject to the User’s
                    privacy settings for each social network.<br>
                    This type of service might still collect traffic data for the pages where the service is installed,
                    even when Users do not use it.<br>
                    It is recommended to log out from the respective services in order to make sure that the processed
                    data on this Application isn’t being connected back to the User’s profile.</p>
                <!-- Service start -->
                <h4>
                    YouTube button and social widgets (Google LLC)
                </h4>
                <p>The YouTube button and social widgets are services allowing interaction with the YouTube social
                    network provided by Google LLC.</p>
                <p>Personal Data processed: Usage Data.</p>
                <p>Place of processing: United States – <a href="https://policies.google.com/privacy" target="_blank"
                        rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>
                </ul>
                <!-- Service end -->
                <h3 class="iub-purpose iub-purpose-12772070">
                    Managing contacts and sending messages
                </h3>
                <p>This type of service makes it possible to manage a database of email contacts, phone contacts or any
                    other contact information to communicate with the User.
                    These services may also collect data concerning the date and time when the message was viewed by the
                    User, as well as when the User interacted with it, such as by clicking on links included in the
                    message.</p>
                <!-- Service start -->
                <h4>
                    Attentive (Attentive Mobile, Inc.)
                </h4>
                <p>Attentive is a message-sending service provided by Attentive Mobile, Inc. Attentive uses the
                    Attentive tag as a Tracker to recognize and track User behavior as well as to manage any
                    User-entered data such as email or telephone numbers.</p>
                <p>Personal Data processed: city; clicks; contents of the email or message; Data communicated in order
                    to use the Service; email address; first name; last name; order ID; phone number; product
                    interaction; purchase history; state; ZIP/Postal code.</p>
                <p>Place of processing: United States – <a href="https://www.attentive.com/legal/privacy"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers; commercial
                    information; internet or other electronic network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in the United States</li>

                    <li>a Sharing in California</li>

                    <li>
                        Targeted Advertising in Virginia, Colorado, Connecticut, Utah, Texas, Oregon, Nevada, Delaware,
                        Iowa, New Hampshire, New Jersey, Nebraska and Montana
                    </li>
                </ul>
                <!-- Service end -->
                <h3 class="iub-purpose iub-purpose-11308874">
                    Registration and authentication provided directly by this Application
                </h3>
                <p>By registering or authenticating, Users allow this Application to identify them and give them access
                    to dedicated services. The Personal Data is collected and stored for registration or identification
                    purposes only. The Data collected are only those necessary for the provision of the service
                    requested by the Users.</p>
                <!-- Service start -->
                <h4>
                    Direct registration (this Application)
                </h4>
                <p>The User registers by filling out the registration form and providing the Personal Data directly to
                    this Application.</p>

                <p>Personal Data processed: billing address; email address; phone number; physical address.</p>
                <p>
                    Category of Personal Information collected according to the CCPA: identifiers.
                </p>
                <!-- Service end -->
                <h3 class="iub-purpose iub-purpose-10004002">
                    Remarketing and behavioral targeting
                </h3>
                <p>This type of service allows this Application and its partners to inform, optimize and serve
                    advertising based on past use of this Application by the User.<br>
                    This activity is facilitated by tracking Usage Data and by using Trackers to collect information
                    which is then transferred to the partners that manage the remarketing and behavioral targeting
                    activity.<br>
                    Some services offer a remarketing option based on email address lists.<br>
                    Services of this kind usually offer the possibility to opt out of such tracking. In addition to any
                    opt-out feature offered by any of the services below, Users may learn more on how to generally opt
                    out of interest-based advertising within the dedicated section "How to opt-out of interest-based
                    advertising" in this document.</p>
                <!-- Service start -->
                <h4>
                    Adobe Audience Manager
                </h4>
                <p>Adobe Audience Manager is a remarketing and behavioral targeting service provided by Adobe Systems
                    Incorporated or by Adobe Systems Software Ireland Limited, depending on how the Owner manages the
                    Data processing.<br>
                    Adobe Audience Manager makes use of tracking technologies to monitor User behavior. This Data is
                    then used to personalize the User's experience and to provide targeted advertising. Adobe Audience
                    Manager may also connect the collected Data with other networks, including advertising networks, and
                    enable these parties to track and target the User. The Owner, unless otherwise specified in this
                    document, has no direct relationship with the third parties that Adobe Audience Manager may be
                    including.</p>
                <p>Personal Data processed: Trackers; Usage Data.</p>
                <p>Place of processing: United States – <a href="https://www.adobe.com/privacy/policy.html"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a> – <a
                        href="https://www.adobe.com/privacy/opt-out.html">Opt Out</a>; Ireland – <a
                        href="https://www.adobe.com/privacy/policy.html" target="_blank"
                        rel="noopener noreferrer">Privacy Policy</a> – <a
                        href="https://www.adobe.com/privacy/opt-out.html">Opt Out</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>

                    <li>a Sharing in California</li>

                </ul>
                <!-- Service end -->
                <h3 class="iub-purpose iub-purpose-11075082">
                    SPAM protection
                </h3>
                <p>This type of service analyzes the traffic of this Application, potentially containing Users' Personal
                    Data, with the purpose of filtering it from parts of traffic, messages and content that are
                    recognized as SPAM.</p>
                <!-- Service start -->
                <h4>
                    Google reCAPTCHA (Google LLC)
                </h4>
                <p>Google reCAPTCHA is a SPAM protection service provided by Google LLC.<br>
                    The use of reCAPTCHA is subject to the Google <a
                        href="https://www.google.com/policies/privacy/">privacy policy</a> and <a
                        href="https://www.google.com/intl/en/policies/terms/">terms of use</a>.</p>

                <p>In order to understand Google's use of Data, consult <a
                        href="https://www.google.com/policies/privacy/partners/">Google's partner policy</a>.</p>

                <p>Personal Data processed: answers to questions; clicks; keypress events; motion sensor events; mouse
                    movements; scroll position; touch events; Trackers; Usage Data.</p>
                <p>Place of processing: United States – <a href="https://business.safety.google/privacy/"
                        target="_blank" rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information; inferences drawn from other personal information.
                </p>
                <!-- Service end -->
                <h3 class="iub-purpose iub-purpose-7409195">
                    Tag Management
                </h3>
                <p>This type of service helps the Owner to manage the tags or scripts needed on this Application in a
                    centralized fashion.<br>
                    This results in the Users' Data flowing through these services, potentially resulting in the
                    retention of this Data.</p>
                <!-- Service start -->
                <h4>
                    Google Tag Manager (Google LLC)
                </h4>
                <p>Google Tag Manager is a tag management service provided by Google LLC.</p>
                <p>Personal Data processed: Usage Data.</p>
                <p>Place of processing: United States – <a href="https://policies.google.com/privacy" target="_blank"
                        rel="noopener noreferrer">Privacy Policy</a>. </p>
                <p>
                    Category of Personal Information collected according to the CCPA: internet or other electronic
                    network activity information.
                </p>
                <p>
                    This processing constitutes:
                </p>
                <ul>
                    <li>a Sale in California</li>


                </ul>
                <!-- Service end -->
                <h2 id="opt_out">Information on opting out of interest-based advertising</h2>
                <p>
                    In addition to any opt-out feature provided by
                    any of the services listed in this document, Users may learn more on
                    how to generally opt out of interest-based advertising within the
                    dedicated section of the Cookie Policy.
                </p>
                <div class="one_line_col">
                    <h2 id="cookie_policy">Cookie Policy</h2>
                    <p>This Application uses Trackers. To learn more, Users may consult the <a
                            :href="`${getIubendaPrefix}privacy-policy/${$config.public.IUBENDA_COOKIE_POLICY_ID}/cookie-policy`"
                            title="Cookie Policy" class="show_comp_link iframe-preserve an-preserve">Cookie Policy</a>.
                    </p>
                </div>
                <h2 id="cookie_policy_further_information">
                    Further Information for Users
                    in the European Union </h2>
                <p id="gdpr_info">This section applies to all Users in the European Union, according to the General Data
                    Protection Regulation (the “GDPR”), and, for such Users, supersedes any other possibly divergent or
                    conflicting information contained in the privacy policy. Further details regarding the categories of
                    Data processed, the purposes of processing, the categories of recipients of the Personal Data, if
                    any, and further information about Personal Data can be found in <strong>the section titled
                        “Detailed information on the processing of Personal Data” within this document</strong>.</p>
                <h3 class="iub-subheading iub-subheading-legal-basis-of-processing">
                    Legal basis of processing
                </h3>
                <p>The Owner may process Personal Data relating to Users if one of the following applies:</p>
                <ul>
                    <li>Users have given their consent for one or more specific purposes.</li>
                    <li>provision of Data is necessary for the performance of an agreement with the User and/or for any
                        pre-contractual obligations thereof;</li>
                    <li>processing is necessary for compliance with a legal obligation to which the Owner is subject;
                    </li>
                    <li>processing is related to a task that is carried out in the public interest or in the exercise of
                        official authority vested in the Owner;</li>
                    <li>processing is necessary for the purposes of the legitimate interests pursued by the Owner or by
                        a third party.</li>
                </ul>
                <p>In any case, the Owner will gladly help to clarify the specific legal basis that applies to the
                    processing, and in particular whether the provision of Personal Data is a statutory or contractual
                    requirement, or a requirement necessary to enter into a contract. </p>
                <h3>
                    Further information about retention time
                </h3>
                <p>Unless specified otherwise in this document, Personal Data shall be processed and stored for as long
                    as required by the purpose they have been collected for and may be retained for longer due to
                    applicable legal obligation or based on the Users’ consent.</p>
                <p>Therefore:</p>
                <ul>
                    <li>Personal Data collected for purposes related to the performance of a contract between the Owner
                        and the User shall be retained until such contract has been fully performed.</li>
                    <li>Personal Data collected for the purposes of the Owner’s legitimate interests shall be retained
                        as long as needed to fulfill such purposes. Users may find specific information regarding the
                        legitimate interests pursued by the Owner within the relevant sections of this document or by
                        contacting the Owner.</li>
                </ul>
                <p>The Owner may be allowed to retain Personal Data for a longer period whenever the User has given
                    consent to such processing, as long as such consent is not withdrawn. Furthermore, the Owner may be
                    obliged to retain Personal Data for a longer period whenever required to fulfil a legal obligation
                    or upon order of an authority.<br><br>
                    Once the retention period expires, Personal Data shall be deleted. Therefore, the right of access,
                    the right to erasure, the right to rectification and the right to data portability cannot be
                    enforced after expiration of the retention period.</p>
                <h3 id="rights_subjects">The rights of Users based on the General Data Protection Regulation (GDPR)</h3>
                <p>Users may exercise certain rights regarding their Data processed by the Owner.</p>
                <p>In particular, Users have the right to do the following, to the extent permitted by law:</p>
                <ul>
                    <li><strong>Withdraw their consent at any time.</strong> Users have the right to withdraw consent
                        where they have previously given their consent to the processing of their Personal Data.</li>
                    <li><strong>Object to processing of their Data.</strong> Users have the right to object to the
                        processing of their Data if the processing is carried out on a legal basis other than consent.
                    </li>
                    <li><strong>Access their Data.</strong> Users have the right to learn if Data is being processed by
                        the Owner, obtain disclosure regarding certain aspects of the processing and obtain a copy of
                        the Data undergoing processing.</li>
                    <li><strong>Verify and seek rectification.</strong> Users have the right to verify the accuracy of
                        their Data and ask for it to be updated or corrected.</li>
                    <li><strong>Restrict the processing of their Data.</strong> Users have the right to restrict the
                        processing of their Data. In this case, the Owner will not process their Data for any purpose
                        other than storing it.
                    </li>
                    <li><strong>Have their Personal Data deleted or otherwise removed.</strong> Users have the right to
                        obtain the erasure of their Data from the Owner.</li>
                    <li><strong>Receive their Data and have it transferred to another controller.</strong> Users have
                        the right to receive their Data in a structured, commonly used and machine readable format and,
                        if technically feasible, to have it transmitted to another controller without any hindrance.
                    </li>
                    <li><strong>Lodge a complaint.</strong> Users have the right to bring a claim before their competent
                        data protection authority.</li>
                </ul>
                <p>
                    Users are also entitled to learn about the legal basis for Data transfers abroad including to any
                    international organization governed by public international law or set up by two or more countries,
                    such as the UN, and about the security measures taken by the Owner to safeguard their Data.
                </p>
                <h4 class="iub-subheading iub-subheading-legal-right-to-object">
                    Details about the right to object to processing
                </h4>
                <p><strong>Where Personal Data is processed for a public interest, in the exercise of an official
                        authority vested in the Owner or for the purposes of the legitimate interests pursued by the
                        Owner, Users may object to such processing by providing a ground related to their particular
                        situation to justify the objection.</strong></p>
                <p><strong>Users must know that, however, should their Personal Data be processed for direct marketing
                        purposes, they can object to that processing at any time, free of charge and without providing
                        any justification. Where the User objects to processing for direct marketing purposes, the
                        Personal Data will no longer be processed for such purposes. To learn whether the Owner is
                        processing Personal Data for direct marketing purposes, Users may refer to the relevant sections
                        of this document. </strong></p>
                <h4 class="iub-subheading iub-subheading-legal-how-to-exercise">
                    How to exercise these rights
                </h4>
                <p>Any requests to exercise User rights can be directed to the Owner through the contact details
                    provided in this document. Such requests are free of charge and will be answered by the Owner as
                    early as possible and always within one month, providing Users with the information required by law.
                    Any rectification or erasure of Personal Data or restriction of processing will be communicated by
                    the Owner to each recipient, if any, to whom the Personal Data has been disclosed unless this proves
                    impossible or involves disproportionate effort. At the Users’ request, the Owner will inform them
                    about those recipients.</p>
                <h2 id="all_us_laws_info">
                    Further information for Users
                    in the United States
                </h2>
                <p>This part of the document integrates with and supplements the information contained in the rest of
                    the privacy policy and is provided by the business running this Application and, if the case may be,
                    its parent, subsidiaries and affiliates (for the purposes of this section referred to collectively
                    as “we”, “us”, “our”).</p>
                <p>The information contained in this section applies to all Users (Users are referred to below, simply
                    as “you”, “your”, “yours”), who are residents in the following states: <b>California, Virginia,
                        Colorado, Connecticut, Utah, Texas, Oregon, Nevada, Delaware, Iowa, New Hampshire, New Jersey,
                        Nebraska and Montana.</b></p>
                <p>For such Users, this information supersedes any other possibly divergent or conflicting provisions
                    contained in the privacy policy.</p>
                <p>
                    This part of the document uses the term Personal Information
                    (and Sensitive Personal Information).
                </p>
                <h3 id="notice_at_collection">
                    Notice at collection
                </h3>
                <p>The following Notice at collection provides you with timely notice about the <b>categories of
                        Personal Information collected or disclosed in the past 12 months</b> so that you can exercise
                    meaningful control over our use of that Information.</p>
                <p><i>While such categorization of Personal Information is mainly based on California privacy laws, it
                        can also be helpful for anyone who is not a California resident to get a general idea of what
                        types of Personal Information are collected.</i></p>
                <div>
                    <ul>
                        <li>
                            <details>
                                <summary class="flex underline">
                                    <h3>
                                        Identifiers
                                    </h3>
                                </summary>
                                <div>
                                    <p>
                                        <b>Personal Information collected or disclosed:</b>
                                        email address, first name, last name, phone number, Trackers, Usage Data, number
                                        of Users, city, device information, session statistics, latitude (of city),
                                        longitude (of city), browser information, User ID, unique device identifiers for
                                        advertising (Google Advertiser ID or IDFA, for example), various types of Data
                                        as specified in the privacy policy of the service, various types of Data,
                                        physical address, billing address, state, ZIP/Postal code, clicks, purchase
                                        history, product interaction, Data communicated in order to use the Service,
                                        order ID
                                    </p>

                                    <p>
                                        <b>Sensitive Personal Information collected or disclosed ℹ️:</b>
                                        contents of the email or message
                                    </p>

                                    <div>
                                        <p><b>Purposes:</b></p>
                                        <ul>
                                            <li>Infrastructure monitoring</li>
                                            <li>Handling productivity related activity </li>
                                            <li>Interaction with data collection platforms and other third parties</li>
                                            <li>Analytics</li>
                                            <li>Advertising</li>
                                            <li>Hosting and backend infrastructure</li>
                                            <li>Contacting the User</li>
                                            <li>Registration and authentication provided directly by this Application
                                            </li>
                                            <li>Managing contacts and sending messages</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <p>
                                            <b>Retention period:</b>
                                            for the time necessary to fulfill the purpose
                                        </p>
                                    </div>

                                    <p>
                                        <b>Sold or Shared ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Targeted Advertising: ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Third-parties:</b> Bugsnag Inc., Google LLC, The Rocket Science Group LLC,
                                        Pinterest, Inc., Amazon Web Services, Inc., Attentive Mobile, Inc., Functional
                                        Software, Inc.
                                    </p>

                                    <p>
                                        <b>Service providers or contractors:</b> this Application
                                    </p>

                                </div>
                            </details>
                        </li>
                        <li>
                            <details class="box_primary category_ccpaInternetI box_10 expand">
                                <summary class="flex underline">
                                    <h3
                                        class="w_icon_24 policyicon_purpose_ccpaInternetI iub-purpose iub-purpose-ccpaInternetI">
                                        Internet or other electronic network activity information
                                    </h3>
                                </summary>
                                <div class="details_body">
                                    <p>
                                        <b>Personal Information collected or disclosed:</b>
                                        Cookies, Usage Data, various types of Data as specified in the privacy policy of
                                        the service, Trackers, device information, number of Users, city, session
                                        statistics, latitude (of city), longitude (of city), browser information,
                                        answers to questions, clicks, keypress events, motion sensor events, mouse
                                        movements, scroll position, touch events, email address, User ID, unique device
                                        identifiers for advertising (Google Advertiser ID or IDFA, for example), phone
                                        number, first name, last name, state, ZIP/Postal code, purchase history, product
                                        interaction, Data communicated in order to use the Service, order ID
                                    </p>

                                    <p>
                                        <b>Sensitive Personal Information collected or disclosed ℹ️:</b>
                                        contents of the email or message
                                    </p>

                                    <div>
                                        <p><b>Purposes:</b></p>
                                        <ul>
                                            <li>Analytics</li>
                                            <li>Tag Management</li>
                                            <li>Displaying content from external platforms</li>
                                            <li>Advertising</li>
                                            <li>Interaction with external social networks and platforms</li>
                                            <li>Heat mapping and session recording</li>
                                            <li>Remarketing and behavioral targeting</li>
                                            <li>SPAM protection</li>
                                            <li>Managing contacts and sending messages</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <p>
                                            <b>Retention period:</b>
                                            for the time necessary to fulfill the purpose
                                        </p>
                                    </div>

                                    <p>
                                        <b>Sold or Shared ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Targeted Advertising: ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Third-parties:</b> Google LLC, Microsoft Corporation, Criteo SA, Pinterest,
                                        Inc., Adobe Systems Incorporated, Meta Platforms, Inc., Attentive Mobile, Inc.
                                    </p>


                                </div>
                            </details>
                        </li>
                        <li>
                            <details class="box_primary category_ccpaGeolocationI box_10 expand">
                                <summary class="flex underline">
                                    <h3
                                        class="w_icon_24 policyicon_purpose_ccpaGeolocationI iub-purpose iub-purpose-ccpaGeolocationI">
                                        Geolocation data
                                    </h3>
                                </summary>
                                <div class="details_body">
                                    <p>
                                        <b>Personal Information collected or disclosed:</b>
                                        Trackers, Usage Data, number of Users, city, device information, session
                                        statistics, latitude (of city), longitude (of city), browser information
                                    </p>


                                    <div>
                                        <p><b>Purposes:</b></p>
                                        <ul>
                                            <li>Analytics</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <p>
                                            <b>Retention period:</b>
                                            for the time necessary to fulfill the purpose
                                        </p>
                                    </div>

                                    <p>
                                        <b>Sold or Shared ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Targeted Advertising: ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Third-parties:</b> Google LLC
                                    </p>


                                </div>
                            </details>
                        </li>
                        <li>
                            <details class="box_primary category_ccpaInferredI box_10 expand">
                                <summary class="flex underline">
                                    <h3
                                        class="w_icon_24 policyicon_purpose_ccpaInferredI iub-purpose iub-purpose-ccpaInferredI">
                                        Inferences drawn from other personal information
                                    </h3>
                                </summary>
                                <div class="details_body">
                                    <p>
                                        <b>Personal Information collected or disclosed:</b>
                                        Usage Data, Trackers, answers to questions, clicks, keypress events, motion
                                        sensor events, mouse movements, scroll position, touch events
                                    </p>


                                    <div>
                                        <p><b>Purposes:</b></p>
                                        <ul>
                                            <li>SPAM protection</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <p>
                                            <b>Retention period:</b>
                                            for the time necessary to fulfill the purpose
                                        </p>
                                    </div>

                                    <p>
                                        <b>Sold or Shared ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Targeted Advertising: ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Third-parties:</b> Google LLC
                                    </p>


                                </div>
                            </details>
                        </li>
                        <li>
                            <details class="box_primary category_ccpaCommI box_10 expand">
                                <summary class="flex underline">
                                    <h3
                                        class="w_icon_24 policyicon_purpose_ccpaCommI iub-purpose iub-purpose-ccpaCommI">
                                        Commercial information
                                    </h3>
                                </summary>
                                <div class="details_body">
                                    <p>
                                        <b>Personal Information collected or disclosed:</b>
                                        email address, phone number, first name, last name, city, state, ZIP/Postal
                                        code, clicks, purchase history, product interaction, Data communicated in order
                                        to use the Service, order ID
                                    </p>

                                    <p>
                                        <b>Sensitive Personal Information collected or disclosed ℹ️:</b>
                                        contents of the email or message
                                    </p>

                                    <div>
                                        <p><b>Purposes:</b></p>
                                        <ul>
                                            <li>Managing contacts and sending messages</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <p>
                                            <b>Retention period:</b>
                                            for the time necessary to fulfill the purpose
                                        </p>
                                    </div>

                                    <p>
                                        <b>Sold or Shared ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Targeted Advertising: ℹ️:</b>
                                        Yes
                                    </p>

                                    <p>
                                        <b>Third-parties:</b> Attentive Mobile, Inc.
                                    </p>


                                </div>
                            </details>
                        </li>


                    </ul>
                </div>
                <p>ℹ️ You can read the definitions of these concepts inside the “<a
                        href="#definitions_and_legal_references" target="_self">Definitions and legal references
                        section</a>” of the privacy policy.</p>
                <p>
                    <b>
                        To know more about your rights in particular to opt out of certain processing activities and to
                        limit the use of your sensitive personal information (“Limit the Use of My Sensitive Personal
                        Information”) you can refer to the “<a href="#privacy_rights_under_us_state_laws"
                            target="_self">Your privacy rights under US state laws</a>” section of our privacy policy.
                    </b>
                </p>
                <p>For more details on the collection of Personal Information, please read the section “<a
                        href="#data_processing_detailed_info" target="_self">Detailed information on the processing of
                        Personal Data</a>” of our privacy policy.</p>
                <p>We won’t process your Information for unexpected purposes, or for purposes that are not reasonably
                    necessary to and compatible with the purposes originally disclosed, without your consent.</p>
                <h3>What are the sources of the Personal Information we collect?</h3>
                <p>We collect the above-mentioned categories of Personal Information, either directly or indirectly,
                    from you when you use this Application.</p>
                <p>For example, you directly provide your Personal Information when you submit requests via any forms on
                    this Application. You also provide Personal Information indirectly when you navigate this
                    Application, as Personal Information about you is automatically observed and collected.</p>
                <p>Finally, we may collect your Personal Information from third parties that work with us in connection
                    with the Service or with the functioning of this Application and features thereof.</p>
                <h3 id="privacy_rights_under_us_state_laws" class="iub-subheading iub-subheading-ccpa-your-rigths">
                    Your privacy rights under US state laws
                </h3>
                <p>You may exercise certain rights regarding your Personal Information. In particular, to the extent
                    permitted by applicable law, you have:</p>
                <ul>
                    <li><b>The right to access Personal Information: the right to know.</b> You have the right to
                        request that we confirm whether or not we are processing your Personal Information. You also
                        have the right to access such Personal Information;</li>
                    <li><b>The right to correct inaccurate Personal Information.</b> You have the right to request that
                        we correct any inaccurate Personal Information we maintain about you;</li>
                    <li><b>The right to request the deletion of your Personal Information.</b> You have the right to
                        request that we delete any of your Personal Information;</li>
                    <li><b>The right to obtain a copy of your Personal Information.</b> We will provide your Personal
                        Information in a portable and usable format that allows you to transfer data easily to another
                        entity – provided that this is technically feasible;</li>
                    <li><b>The right to opt out from the Sale of your Personal Information;</b> We will not discriminate
                        against you for exercising your privacy rights. </li>
                    <li><b>The right to non-discrimination.</b> </li>
                </ul>
                <h4>Additional rights for Users residing in California</h4>
                <p>In addition to the rights listed above common to all Users in the United States, as a User residing
                    in California, you have</p>
                <ul>
                    <li><b>The right to opt out of the Sharing of your Personal Information</b> for cross-context
                        behavioral advertising;</li>
                    <li><b>The right to request to limit our use or disclosure of your Sensitive Personal
                            Information</b> to only that which is necessary to perform the services or provide the
                        goods, as is reasonably expected by an average consumer. Please note that certain exceptions
                        outlined in the law may apply, such as, when the collection and processing of Sensitive Personal
                        Information is necessary to verify or maintain the quality or safety of our service.</li>
                </ul>
                <h4>Additional rights for Users residing in Virginia, Colorado, Connecticut, Texas, Oregon, Nevada,
                    Delaware, Iowa, New Hampshire, New Jersey, Nebraska and Montana</h4>
                <p>In addition to the rights listed above common to all Users in the United States, as a User residing
                    in Virginia, Colorado, Connecticut, Texas, Oregon, Nevada, Delaware, Iowa, New Hampshire, New
                    Jersey, Nebraska and Montana you have</p>
                <ul>
                    <li><b>The right to opt out of</b> the processing of your personal information for <b>Targeted
                            Advertising or profiling</b> in furtherance of decisions that produce legal or similarly
                        significant effects concerning you;</li>
                    <li><b>The right to freely give, deny or withdraw your consent for the processing of your Sensitive
                            Personal Information.</b> Please note that certain exceptions outlined in the law may apply,
                        such as, but not limited to, when the collection and processing of Sensitive Personal
                        Information is necessary for the provision of a product or service specifically requested by the
                        consumer.</li>
                </ul>
                <h4>Additional rights for users residing in Utah and Iowa</h4>
                <p>In addition to the rights listed above common to all Users in the United States, as a User residing
                    in Utah and Iowa, you have</p>
                <ul>
                    <li><b>The right to opt out of </b> the processing of your Personal Information for <b>Targeted
                            Advertising</b>;</li>
                    <li><b>The right to opt out of the processing of your Sensitive Personal Information.</b> Please
                        note that certain exceptions outlined in the law may apply, such as, but not limited to, when
                        the collection and processing of Sensitive Personal Information is necessary for the provision
                        of a product or service specifically requested by the consumer.</li>
                </ul>
                <h3 class="iub-subheading iub-subheading-ccpa-your-rigths">
                    How to exercise your privacy rights under US state laws
                </h3>
                <p>To exercise the rights described above, you need to submit your request to us by contacting us via
                    the contact details provided in this document.</p>
                <p>For us to respond to your request, we must know who you are. We will not respond to any request if we
                    are unable to verify your identity and therefore confirm the Personal Information in our possession
                    relates to you. You are not required to create an account with us to submit your request. We will
                    use any Personal Information collected from you in connection with the verification of your request
                    solely for verification and shall not further disclose the Personal Information, retain it longer
                    than necessary for purposes of verification, or use it for unrelated purposes.</p>
                <p>If you are an adult, you can make a request on behalf of a child under your parental authority.</p>
                <h4>How to exercise your rights to opt out</h4>
                <p>In addition to what is stated above, to exercise your right to opt-out of Sale or Sharing and
                    Targeted Advertising you can also use the privacy choices link provided on this Application.</p>
                <p>If you want to submit requests to opt out of Sale or Sharing and Targeted Advertising activities via
                    a user-enabled <b>global privacy control</b>, such as for example the Global Privacy Control (“<a
                        href="https://globalprivacycontrol.org/" target="_blank">GPC</a>”), you are free to do so and we
                    will abide by such request in a frictionless manner.</p>
                <h4>How and when we are expected to handle your request</h4>
                <p>We will respond to your request without undue delay, but in all cases within the timeframe required
                    by applicable law. Should we need more time, we will explain to you the reasons why, and how much
                    more time we need.</p>
                <p>Should we deny your request, we will explain to you the reasons behind our denial (where envisaged by
                    applicable law you may then contact the relevant authority to submit a complaint).</p>
                <p>We do not charge a fee to process or respond to your request unless such request is manifestly
                    unfounded or excessive and in all other cases where it is permitted by the applicable law. In such
                    cases, we may charge a reasonable fee or refuse to act on the request. In either case, we will
                    communicate our choices and explain the reasons behind them.</p>
                <h2 id="further_data_processing_info">Additional information about Data collection and processing</h2>
                <h3 class="iub-subheading iub-subheading-legal-protection">
                    Legal action
                </h3>
                <p>The User's Personal Data may be used for legal purposes by the Owner in Court or in the stages
                    leading to possible legal action arising from improper use of this Application or the related
                    Services.<br>The User declares to be aware that the Owner may be required to reveal personal data
                    upon request of public authorities.</p>
                <h3 class="iub-subheading iub-subheading-legal-specific-info">
                    Additional information about User's Personal Data
                </h3>
                <p>In addition to the information contained in this privacy policy, this Application may provide the
                    User with additional and contextual information concerning particular Services or the collection and
                    processing of Personal Data upon request.</p>
                <h3 class="iub-subheading iub-subheading-legal-maintenance">
                    System logs and maintenance
                </h3>
                <p>For operation and maintenance purposes, this Application and any third-party services may collect
                    files that record interaction with this Application (System logs) or use other Personal Data (such
                    as the IP Address) for this purpose.</p>
                <h3 class="iub-subheading iub-subheading-legal-information-not-contained">
                    Information not contained in this policy
                </h3>
                <p>More details concerning the collection or processing of Personal Data may be requested from the Owner
                    at any time. Please see the contact information at the beginning of this document.</p>
                <h3>Changes to this privacy policy</h3>
                <p>The Owner reserves the right to make changes to this privacy policy at any time by notifying its
                    Users on this page and possibly within this Application and/or - as far as technically and legally
                    feasible - sending a notice to Users via any contact information available to the Owner. It is
                    strongly recommended to check this page often, referring to the date of the last modification listed
                    at the bottom. <br><br>
                    Should the changes affect processing activities performed on the basis of the User’s consent, the
                    Owner shall collect new consent from the User, where required.</p>
                <h3 id="definitions_and_legal_references">
                    Definitions and legal references
                </h3>
                <h4>
                    Personal Data (or Data)
                    / Personal Information (or Information)
                </h4>
                <p>Any information that directly, indirectly, or in connection with other information — including a
                    personal identification number — allows for the identification or identifiability of a natural
                    person.</p>
                <h4>Sensitive Personal Information</h4>
                <p>Sensitive Personal Information means any Personal Information that is not publicly available and
                    reveals information considered sensitive according to the applicable privacy law.</p>
                <h4>Usage Data</h4>
                <p>Information collected automatically through this Application (or third-party services employed in
                    this Application), which can include: the IP addresses or domain names of the computers utilized by
                    the Users who use this Application, the URI addresses (Uniform Resource Identifier), the time of the
                    request, the method utilized to submit the request to the server, the size of the file received in
                    response, the numerical code indicating the status of the server's answer (successful outcome,
                    error, etc.), the country of origin, the features of the browser and the operating system utilized
                    by the User, the various time details per visit (e.g., the time spent on each page within the
                    Application) and the details about the path followed within the Application with special reference
                    to the sequence of pages visited, and other parameters about the device operating system and/or the
                    User's IT environment.</p>
                <h4>User</h4>
                <p>The individual using this Application who, unless otherwise specified, coincides with the Data
                    Subject.</p>
                <h4>Data Subject</h4>
                <p>The natural person to whom the Personal Data refers.</p>
                <h4>Data Processor (or Processor)</h4>
                <p>The natural or legal person, public authority, agency or other body which processes Personal Data on
                    behalf of the Controller, as described in this privacy policy.</p>
                <h4>Data Controller (or Owner)</h4>
                <p>The natural or legal person, public authority, agency or other body which, alone or jointly with
                    others, determines the purposes and means of the processing of Personal Data, including the security
                    measures concerning the operation and use of this Application. The Data Controller, unless otherwise
                    specified, is the Owner of this Application.</p>
                <h4>This Application</h4>
                <p>The means by which the Personal Data of the User is collected and processed.</p>
                <h4>Service</h4>
                <p>The service provided by this Application as described in the relative terms (if available) and on
                    this site/application.</p>
                <h4>Sale</h4>
                <p>Sale means any exchange of Personal Information by the Owner to <b>a third party, for monetary or
                        other valuable consideration</b>, as defined by the applicable privacy US state law. Please note
                    that the exchange of Personal Information with a service provider pursuant to a written contract
                    that meets the requirements set by the applicable law, does not constitute a Sale of your Personal
                    Information.</p>
                <h4>Sharing</h4>
                <p>Sharing means any sharing, renting, releasing, disclosing, disseminating, making available,
                    transferring, or otherwise communicating orally, in writing, or by electronic or other means, a
                    consumer's Personal Information by the business to a <b>third party for cross-context behavioral
                        advertising</b>, whether for monetary or other valuable consideration, including transactions
                    between a business and a third party for cross-context behavioral advertising for the benefit of a
                    business in which no money is exchanged, as defined by the California privacy laws. Please note that
                    the exchange of Personal Information with a service provider pursuant to a written contract that
                    meets the requirements set by the California privacy laws, does not constitute sharing of your
                    Personal Information.</p>
                <h4>Targeted advertising</h4>
                <p>Targeted advertising means displaying advertisements to a consumer where the advertisement is
                    selected based on Personal Information obtained from that consumer’s activities over time and across
                    nonaffiliated websites or online applications to predict such consumer’s preferences or interests,
                    as defined by the applicable privacy US state law.</p>
                <h4>European Union (or EU)</h4>
                <p>Unless otherwise specified, all references made within this document to the European Union include
                    all current member states to the European Union and the European Economic Area.</p>
                <h4>Cookie</h4>
                <p>Cookies are Trackers consisting of small sets of data stored in the User's browser.</p>
                <h4>Tracker</h4>
                <p>Tracker indicates any technology - e.g Cookies, unique identifiers, web beacons, embedded scripts,
                    e-tags and fingerprinting - that enables the tracking of Users, for example by accessing or storing
                    information on the User’s device.</p>
                <h4>Legal information</h4>
                <p>This privacy statement has been prepared based on provisions of multiple legislations.</p>
                <p>This privacy policy relates solely to this Application, if not stated otherwise within this document.
                </p>
                <p>
                    Latest update: October 31, 2024
                </p>
                <p>
                    <a class="link-underline" target="_top"
                        :href="`${getIubendaPrefix}/en/privacy-and-cookie-policy-generator`"
                        title="iubenda - Privacy Policy generator">iubenda</a> hosts this content and only collects <a
                        class="link-underline" target="_top"
                        :href="`${getIubendaPrefix}privacy-policy/${$config.public.iubendaPersonalCookiePolicyID}`">the
                        Personal Data strictly necessary</a> for it to be provided.
                </p>
            </div>
        </section>
        <section v-if="getRouteSlug === 'terms-and-conditions'"
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            role="region" aria-labelledby="terms-title">
            <div>
                <div class="iub_header">
                    <h1 id="terms-title" class="mb-4 text-xl sm:text-2xl font-normal">
                        Terms and Conditions of <strong>Adiamor</strong>
                    </h1>

                    <h2>Introduction</h2>
                    <p>These Terms govern</p>
                    <ul>
                        <li>the use of this Application, and,</li>
                        <li>any other related Agreement or legal relationship with the Owner</li>
                    </ul>
                    <p>
                        in a legally binding way. Capitalized words are defined in the relevant dedicated section of
                        this
                        document.
                    </p>

                    <br />

                    <p>The User must read this document carefully.</p>
                </div>

                <p>This Application is provided by:</p>

                <p>
                    Adiamor
                    <br />
                    <span v-html="$sanitize(store.officeAddress)"></span>
                </p>

                <p>
                    <b>Owner contact email:</b>
                    <a href="mailto:service@adiamor.com" aria-label="Email Adiamor customer service">
                        service@adiamor.com
                    </a>
                </p>

                <h2 id="what-the-user-should-know-at-a-glance">What the User should know at a glance</h2>
                <ul>
                    <li>
                        Please note that some provisions in these Terms may only apply to certain categories of Users.
                        In particular, certain provisions may only apply to Consumers or to those Users that do not
                        qualify as Consumers. Such limitations are always explicitly mentioned within each affected
                        clause. In the absence of any such mention, clauses apply to all Users.
                    </li>
                </ul>

                <hr aria-hidden="true" />

                <h2 id="terms-of-use">TERMS OF USE</h2>
                <p>
                    Unless otherwise specified, the terms of use detailed in this section apply generally when using
                    this Application.
                </p>

                <p>
                    Single or additional conditions of use or access may apply in specific scenarios and in such
                    cases are additionally indicated within this document.
                </p>

                <p>By using this Application, Users confirm to meet the following requirements:</p>
                <ul>
                    <li>There are no restrictions for Users in terms of being Consumers or Business Users;</li>
                </ul>

                <h3 id="account-registration">Account registration</h3>
                <p>
                    To use the Service Users may register or create a User account, providing all required data or
                    information in a complete and truthful manner.
                    <br />
                    Users may also use the Service without registering or creating a User account, however, this may
                    cause limited availability of certain features or functions.
                </p>

                <p>
                    Users are responsible for keeping their login credentials confidential and safe. For this
                    reason, Users are also required to choose passwords that meet the highest standards of strength
                    permitted by this Application.
                </p>

                <p>
                    By registering, Users agree to be fully responsible for all activities that occur under their
                    username and password.
                    <br />
                    Users are required to immediately and unambiguously inform the Owner via the contact details
                    indicated in this document, if they think their personal information, including but not limited
                    to User accounts, access credentials or personal data, have been violated, unduly disclosed or
                    stolen.
                </p>

                <h4 id="account-termination">Account termination</h4>
                <p>Users can terminate their account and stop using the Service at any time by doing the following:</p>
                <ul>
                    <li>By directly contacting the Owner at the contact details provided in this document.</li>
                </ul>

                <h4 id="account-suspension-and-deletion">Account suspension and deletion</h4>
                <p>
                    The Owner reserves the right, at its sole discretion, to suspend or delete at any time and without
                    notice, User accounts that it deems inappropriate, offensive or in violation of these Terms.
                </p>

                <p>
                    The suspension or deletion of User accounts shall not entitle Users to any claims for
                    compensation, damages or reimbursement.
                </p>

                <p>
                    The suspension or deletion of accounts due to causes attributable to the User does not exempt the
                    User from paying any applicable fees or prices.
                </p>

                <!-- (Content unchanged structurally, only semantic + accessibility-safe modifications above) -->

                <div class="iub_footer">
                    <p>Latest update: October 31, 2024</p>

                    <p>
                        <a target="_top" :href="`${getIubendaPrefix}en/terms-and-conditions-generator`"
                            title="iubenda - Terms and Conditions generator"
                            aria-label="Iubenda terms and conditions generator">
                            iubenda
                        </a>
                        hosts this content and only collects
                        <a target="_top"
                            :href="`${getIubendaPrefix}privacy-policy/${$config.public.iubendaPersonalCookiePolicyID}`"
                            aria-label="Read personal data policy">
                            the Personal Data strictly necessary
                        </a>
                        for it to be provided.
                    </p>
                </div>
            </div>
        </section>
        <section v-if="getRouteSlug === 'accessibility'"
            class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full prose-h1:first:mt-0"
            role="region" aria-labelledby="terms-title">
            <h1>Accessibility Statement</h1>
            <section>
                <p> At <strong>Adiamor</strong>, we are committed to ensuring that our website and digital services are
                    accessible to all individuals, including those with disabilities. We believe everyone should be able
                    to explore and shop for fine jewelry with ease, dignity, and independence. </p>
                <p> Our goal is to provide an inclusive digital experience that reflects the same care, craftsmanship,
                    and customer-first service that define our brand. </p>
            </section>
            <h2>Our Commitment</h2>
            <section>
                <p> Adiamor strives to make its website accessible and usable for all customers, and we work to align
                    our efforts with generally recognized accessibility best practices, including the <strong>Web
                        Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> where feasible. </p>
                <p> We continually work to improve the usability and accessibility of our website by implementing
                    enhancements intended to support a broad range of users and assistive technologies. </p>
            </section>
            <h2>Accessibility Efforts</h2>
            <section>
                <p>Our ongoing efforts may include:</p>
                <ul class="grid grid-cols-2 gap-2 sm:gap-4">
                    <li>Maintaining clear and consistent navigation</li>
                    <li>Using readable text and logical heading structures</li>
                    <li>Supporting keyboard navigation where possible</li>
                    <li>Providing text alternatives for meaningful visual content</li>
                    <li>Seeking sufficient contrast between text and background elements</li>
                    <li>Reviewing and improving accessibility as our site evolves</li>
                </ul>
            </section>
            <h2>Ongoing Improvement</h2>
            <section>
                <p> Accessibility is an ongoing effort. We regularly evaluate our website, content, and functionality in
                    order to identify opportunities for improvement and to help ensure a more inclusive experience for
                    all visitors. </p>
            </section>
            <h2>Third-Party Content</h2>
            <section>
                <p> While we strive to provide accessibility across all areas of our website, certain third-party tools,
                    integrations, or embedded content may not be fully under our control. Where possible, we encourage
                    our partners and providers to support accessible user experiences. </p>
                <div class="grid grid-cosls-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    <div>
                        <h2>Need Assistance?</h2>
                        <p class="mr-4"> If you experience any difficulty accessing any part of our website, or if you
                            need assistance with any of our products or services, please contact us. We welcome your
                            feedback and will make reasonable efforts to assist you and improve the accessibility of our
                            website. </p>
                    </div>
                    <div>
                        <h2>Contact Us</h2>
                        <div class="grid grid-cols-2 gap-2 sm:gap-4">
                            <div>
                                <h4>US &amp; Canadian Customers</h4>
                                <a href="tel:877-627-5094" aria-label="Call 877-627-5094 for US and Canadian customers"
                                    class="focus:outline-none focus:ring-2 focus:ring-blue-500"> 877-627-5094 </a>
                                <br>
                                <span>OR </span>
                                <br>
                                <a href="tel:213-627-5057" aria-label="Call 213-627-5057 for US and Canadian customers"
                                    class="focus:outline-none focus:ring-2 focus:ring-blue-500"> 213-627-5057 </a>
                            </div>
                            <div>
                                <h4>UK Customers</h4>
                                <a href="tel:0808-271-1071" aria-label="Call 0808-271-1071 for UK customers"
                                    class="focus:outline-none focus:ring-2 focus:ring-blue-500"> 0808-271-1071 </a>
                            </div>
                            <div>
                                <h4>Australia Customers</h4>
                                <a href="tel:1-800-821-917" aria-label="Call 1-800-821-917 for Australia customers"
                                    class="focus:outline-none focus:ring-2 focus:ring-blue-500"> 1-800-821-917 </a>
                            </div>
                            <div>
                                <h4>Other International Customers</h4>
                                <a href="tel:+12136275057"
                                    aria-label="Call plus 1 213 627 5057 for international customers"
                                    class="focus:outline-none focus:ring-2 focus:ring-blue-500"> +1-213-627-5057 </a>
                            </div>
                            <div>
                                <h4>Service Hours</h4>
                                <p> Monday-Friday: 7am - 7pm PST <br> Saturday: 9am - 4pm PST </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
        <section v-if="isUnknownSlug">
            <NoDataFound :type="getModifiedSlug" />
        </section>
    </div>
</template>
<script setup>
import KEYS from "~/utils/constant.js";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import NoDataFound from "./common/NoDataFound.vue";

const store = useMainStore();
const route = useRoute();

const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));
const getIubendaPrefix = computed(() => KEYS.IUBENDA_PREFIX);
const getRouteSlug = computed(() => route.params.slug);
const getModifiedSlug = computed(() => getRouteSlug.value.replace(/-/g, " "));
const isUnknownSlug = computed(() => {
    const known = ['conflict-free-policy', 'shipping-policy', 'return-policy', 'gift-packaging', 'warranty', 'diamond-price-match', 'engraving', 'financing-and-insurance', 'privacy-policy', 'terms-and-conditions', 'accessibility'];
    return !known.includes(getRouteSlug.value);
});
</script>