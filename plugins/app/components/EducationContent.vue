<template>
    <div class="flex-1 prose-p:my-2 prose-hr:my-6 prose-strong:font-semibold w-full" role="main" aria-label="Education Content">
        <!-- Screen Reader Live Region for Content Changes -->
        <div
            class="sr-only"
            aria-live="polite"
            aria-atomic="true"
            role="status"
        >
            {{ liveAnnouncement }}
        </div>

        <!-- Diamond Education -->
        <ContentCard :isVisible="getSlug === 'diamond-education'">
            <h1>Diamond Education Guide</h1>
            <p>When considering purchasing a diamond, one must navigate the complex criteria that determine a
                diamond's value and quality.</p>
            <p>This guide will provide an in-depth look into the four most popular factors, commonly known as the
                4Cs: Diamond Cut, Diamond Color, Diamond Clarity, and Carat Weight. These factors play a crucial
                role in defining a diamond's beauty and worth.</p>
            <p>In addition to the 4Cs, this guide also delves into the vital role of a diamond's shape in
                determining its overall aesthetic appeal, and the importance of certification authorities in
                verifying the quality of a diamond.</p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
                <div>
                    <h3><NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CUT">Cut</NuxtLink></h3>
                    <p>The cut, the most significant of the four C's, doesn't refer to shape but to the diamond's
                        quality in
                        its raw form. The cut influences the diamond's sparkle and brilliance. A well-cut diamond
                        reflects
                        light beautifully, while a poorly cut one may look dull, regardless of color or clarity.</p>
                    <p>
                        <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CUT">Learn More
                            <span class="sr-only">about diamond cut quality</span>
                        </NuxtLink>
                    </p>
                    <nuxt-img provider="cdn" class="mx-auto" src="/landing-pages/Policy/diamondeduc_cut.webp"
                        alt="Illustration showing diamond cut quality and how it affects light reflection"/>
                </div>
                <div>
                    <h3><NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_COLOR">color</NuxtLink></h3>
                    <p>Color plays a key role in determining the quality of a diamond. While the most desirable diamonds
                        are
                        colorless, they can range up to light yellow or brown. Certified diamond graders use a specific
                        scale for this purpose. Although color differences can be subtle and often unobserved by an
                        untrained eye, they significantly influence a diamond's value and price.</p>
                    <p>
                        <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_COLOR">Learn More
                            <span class="sr-only">about diamond color quality</span>
                        </NuxtLink>
                    </p>
                    <nuxt-img provider="cdn" class="mx-auto" src="/landing-pages/Policy/diamondeduc_color.webp"
                        alt="Illustration showing diamond color grading scale from D to Z"/>
                </div>
                <div>
                    <h3><NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CLARITY">clarity</NuxtLink></h3>
                    <p>Diamond clarity relates to the presence of inclusions or blemishes. Their size or number can
                        impact a
                        diamond's beauty. Clarity grades range from diamonds that are internally flawless under 10x
                        magnification to those with visible flaws. However, many imperfections are not visible to the
                        naked
                        eye, and a high clarity grade doesn't always equate to increased beauty.</p>
                    <p>
                        <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CLARITY">Learn More
                            <span class="sr-only">about diamond clarity</span>
                        </NuxtLink>
                    </p>
                    <nuxt-img provider="cdn" class="mx-auto" src="/landing-pages/Policy/diamondeduc_clarity.webp"
                        alt="Illustration showing diamond clarity characteristics and inclusions"/>
                </div>
                <div>
                    <h3><NuxtLink :to="STATIC_ROUTES.EDUCATION_CARAT_WEIGHT">carat weight</NuxtLink></h3>
                    <p>Carat weight measures a diamond's size. Specifically, one carat equates to 200 milligrams. While
                        larger diamonds are often more desirable, carat weight should not be considered in isolation.
                        Two
                        diamonds of equal carat weight can have different values depending on their cut, color, and
                        clarity.
                    </p>
                    <p>
                        <NuxtLink :to="STATIC_ROUTES.EDUCATION_CARAT_WEIGHT">Learn More
                            <span class="sr-only">about diamond carat weight</span>
                        </NuxtLink>
                    </p>
                    <nuxt-img provider="cdn" class="mx-auto" src="/landing-pages/Policy/diamondeduc_carat.webp"
                        alt="Illustration showing diamond carat weight measurement"/>
                </div>
                <div>
                    <h3><NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_SHAPE">Shape</NuxtLink></h3>
                    <p>The shape of a diamond also contributes to its appeal. Each diamond shape possesses unique
                        properties
                        and facets, influencing the diamond's brightness, fire, and scintillation. From the classic
                        round to
                        the elegant marquise or pear, the shape is a matter of personal preference but can significantly
                        impact a diamond's visual characteristics.</p>
                    <p>
                        <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_SHAPE">Learn More
                            <span class="sr-only">about diamond shape</span>
                        </NuxtLink>
                    </p>
                    <nuxt-img provider="cdn" class="mx-auto" src="/landing-pages/Policy/diamondeduc_shape.webp"
                        alt="Illustration showing various diamond shapes available"/>
                </div>
                <div>
                    <h3><NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CERTIFICATION">Certification</NuxtLink></h3>
                    <p>Adiamor's loose diamonds are graded by recognized laboratories such as the Gemological Institute
                        of
                        America (GIA), International Gemological Institute (IGI), and Gem Certification and Assurance
                        Lab
                        (GCAL). The grading report provides an unbiased assessment of the diamond's quality and verifies
                        its
                        characteristics, ensuring that you are making an informed purchase.</p>
                    <p>
                        <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CERTIFICATION">Learn More
                            <span class="sr-only">about diamond certification</span>
                        </NuxtLink>
                    </p>
                    <nuxt-img provider="cdn" class="mx-auto" src="/landing-pages/Policy/diamondeduc_cert.webp"
                        alt="Illustration showing diamond certification documents and grading reports"/>
                </div>
                <div class="md:col-span-2">
                    <h2>Expert Advice</h2>
                    <div>
                        <p>Understanding the 4Cs—Diamond Cut, Diamond Color, Diamond Clarity, and Carat Weight—is not
                            only a
                            crucial part of the diamond selection process, but it's also an important step in making an
                            informed, confident purchase.</p>
                        <p>Education before purchasing a diamond can significantly enhance your buying experience by
                            allowing
                            you to understand the value of the product you are investing in. Additionally, well-informed
                            buyers
                            are often more satisfied with their purchases because they know exactly what they are
                            getting for
                            their money.</p>
                        <p>To support you in this learning journey, our team is readily available. Should you have any
                            questions
                            or need further clarification on any aspect of your diamond selection process, do not
                            hesitate to
                            reach out to us via chat or telephone. We are here to guide you every step of the way,
                            ensuring you
                            find the perfect diamond that suits both your preferences and budget.</p>
                    </div>
                </div>
                <div>
                    <h2>Contact Us</h2>
                    <h3>Chat with Us</h3>
                    <p><a href="javascript:helpDesk.click()" aria-label="Open customer support chat window">Click to Chat</a></p>

                    <h3>Call Us</h3>
                    <p>US & Canadian Customers: <a :href="`tel:${telPhoneNumber}`">{{phoneNumber}}</a> or <a
                            href="tel:213-627-5057">213-627-5057</a></p>
                    <p>UK Customers: <a href="tel:0808-271-1071">0808-271-1071</a></p>
                    <p>Australia Customers: <a href="tel:1-800-821-917">1-800-821-917</a></p>
                    <p>Other International Customers: <a href="tel:+1-213-627-5057">+1-213-627-5057</a></p>

                    <h3>Service Hours</h3>
                    <p>Monday-Friday: 7am - 7pm PST</p>
                    <p>Saturday: 9am - 4pm PST</p>
                </div>
                
                <CustomLiveAgentForm type="contact-us"/>
            </div>
        </ContentCard>

        <!-- Affinity Collection -->
        <ContentCard :isVisible="getSlug === 'affinity-collection'">
            <h1 class="text-3xl font-normal">Affinity Collection</h1>
            <div>
                <h2>Hearts and Arrows</h2>
                <p>Hearts and Arrows is the name for the unique pattern of shapes visible from the top and bottom of
                    a
                    precisely cut round diamond. Only diamonds with a perfect combination of table width, depth,
                    polish
                    and symmetry will display these magnificent shapes clearly. Each diamond of the Affinity
                    Collection
                    is cut to well within these standards.</p>
                <p>The impact of fluorescence on price depends on its noticeability. Faint fluorescence has very
                    little
                    effect on a diamond of any color, and therefore has no effect on value. For some higher color
                    stones
                    (D to G), strong fluorescence may give the stone a milky white appearance, which greatly lowers
                    the
                    value. Fluorescence often adds value to stones with a hint of color, such as I-color and below,
                    as
                    it can give the diamond a whiter, brighter appearance.</p>
                <p>Further Reading:<br><a
                        href="https://www.adiamor.com/blog/education/fluorescence-and-your-diamonds">Fluorescence
                        and
                        Your Diamonds</a></p>
                <div class="grid grid-cols-2 gap-2 sm:gap-4">
                    <div class="border px-4 text-center">
                        <h3>Hearts viewed from the Bottom</h3>
                        <p><nuxt-img provider="cdn" class="mx-auto" src="/landing-pages/Help%20Center/hna_hearts.webp" alt="Hearts pattern visible when viewing a Hearts and Arrows diamond from the bottom"/></p>
                    </div>
                    <div class="border px-4 text-center">
                        <h3>Arrows viewed from the Top</h3>
                        <p><nuxt-img provider="cdn" class="mx-auto" src="/landing-pages/Help%20Center/hna_arrows.webp" alt="Arrows pattern visible when viewing a Hearts and Arrows diamond from the top"/></p>
                    </div>
                </div>
                <h2>Diamond Cut</h2>
                <p>Cut, more than any other quality aspect, gives the diamond its sparkle. A diamond gets its
                    brilliance
                    and scintillation from the angle of its facets. When all the angles are correct, the maximum
                    amount
                    of light is dispersed back through the diamonds top facets.</p>
                <p><NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CUT">Learn more about Diamond Cut</NuxtLink></p>
                <h2>Polish</h2>
                <p>Polish is a measure of the smoothness of a diamonds facets; a diamond with a high polish grade
                    will
                    appear very crisp and have a vivid sparkle. Diamonds with a lower polish grade will appear dull
                    and
                    blurred.</p>
                <p><NuxtLink :to="`${STATIC_ROUTES.EDUCATION_DIAMOND_CUT}#PolSym`">Learn more about Polish</NuxtLink></p>
                <h2>Symmetry</h2>
                <p>Symmetry is a grade of how a diamond's facets are shaped and aligned. When a diamond has a high
                    symmetry, each facet is perfectly aligned; as light enters, it is reflected back properly and
                    gives
                    the diamond a very bright sparkle and a strong appearance of fire.</p>
                <p><NuxtLink :to="`${STATIC_ROUTES.EDUCATION_DIAMOND_CUT}#PolSym`">Learn more about Symmetry</NuxtLink></p>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'carat-weight'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Carat Weight</h2>
            <div>
                <p>Diamond weight is measured in carats, a small unit of measurement equal to 200 milligrams. Each carat
                    is divided into 100 points. Therefore, a half-carat stone may be referred to as a "50-pointer" or
                    "50-points". Carat weight is the easiest of the 4 C's for gemologists to determine due to the use of
                    highly sophisticated measuring equipment.</p>
                <p>Two diamonds of equal carat weight might vary greatly in value depending upon their cut, color and
                    clarity. This is important because when mounted, one diamond may appear larger than the other,
                    although they actually weigh the same. If size is important to you, focus on diamond measurements as
                    opposed to carat weight. Diamonds that look big for their weight may have reduced brilliance and
                    fire so always insist on great cut.</p>
                <p>An increase in carat weight does not produce the same increase in millimeter diameter. For example,
                    there is a 25% increase in carat weight from 1.00 carats to 1.25 carats but less than 8% increase in
                    diameter (6.5 to 7.0 mm). This concept, along with the increased price per carat, explains why
                    prices increase dramatically in order to get noticeably bigger millimeter size.</p>
                <p>Over 1 million rough diamonds must be mined before one is found that can be cut into a 1.00 carat
                    finished diamond. Because large diamonds are so rare, they generally have a greater value per carat.
                    If all other factors are equal, the heavier the diamond, the greater its cost will be. For example,
                    the price of a two-carat stone will be several times higher than four 50-pointers of equal quality.
                </p>
                <p><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/caratweight.webp" alt="Carat Weight Scale"/></p>
                <p>A diamond's cut is graded by several measurements. Its depth percentage (a measurement of the height
                    vs. the width of the stone) and its table percentage (a measurement of the diameter of the top facet
                    of the stone vs. the stone's average width) are two key factors in determining the quality of a
                    diamond's cut. These percentages are detailed on the GIA or AGSL Diamond Grading Report that
                    accompanies every Adiamor loose diamond. Experts express differing opinions on the best table size
                    (the diameter of the largest facet on the top of the stone) and the best depth for a diamond,
                    because these two factors alone are not sufficient enough to accurately judge a diamond's cut. Other
                    factors such as crown angle, girdle thickness, culet size, polish and symmetry all play a role in
                    judging a diamond's overall cut quality.</p>
                <p>When it comes to buying a diamond for that special lady in your life, whether it is an engagement
                    ring, a pendant, a bracelet, or some classic studs, size isn't everything... but it’s a lot. If you
                    choose a diamond that’s too small, she might have to pull out a magnifying glass every time she
                    wants to admire it (and it’s not very impressive to all of her friends, either). If, on the other
                    hand, you buy a rock that’s way too big, she may not wear it for fear of theft (plus, most women are
                    wary of looking ostentatious). Choosing the right diamond requires a lot of thought, but if you
                    follow a few simple guidelines, you should be able to pick the right stone for every occasion.</p>
                <p>Consider the size of her fingers. If she has a fairly small ring size, a smaller diamond will look
                    proportionate on her hand. Try to find a moderate balance between diamond color and clarity grades
                    to see how much carat weight you can get for your budget. Also, bear in mind the width of your
                    engagement setting. Find a carat weight that complements the setting nicely without overpowering it,
                    and vice versa.</p>
                <p><NuxtLink :to="STATIC_ROUTES.DIAMONDS_SEARCH">Search for a diamond</NuxtLink> or search our selection of pre-set diamond
                    solitaire engagement rings by carat size:</p>
                <ul>
                    <li v-for="(item,index) in productList" :key="index">
                        <NuxtLink :to="getRedirectUrl(item)">{{ item?.name }}</NuxtLink>
                    </li>
                </ul>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'diamond-care'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Diamond Care</h2>
            <div>
                <div>
                    <div>
                        <p>Diamonds are extremely hard and resistant to damage. However, everyday wear can take a
                            toll on your diamonds. Ordinary wear, including the use of hand lotions and hair care
                            products and simple household work, can all cause buildup that can leave a hazy film on
                            your diamond. This buildup will eventually cause your brilliant and gorgeous diamond to
                            appear dull. To keep your diamonds looking their best, they require the proper attention
                            and care.</p>
                        <p>Here are some pointers on how to keep your diamond ring looking as great as it did the
                            day you received it:</p>
                        <hr>
                        <h2>Cleaning and Security</h2>
                        <p>Everyday activity can cause the setting of your diamond to loosen. We suggest removing
                            your engagement ring every evening and visually inspecting it for any bent or loosened
                            prongs. It is important to visit a professional jeweler every six months to a year to
                            have your mounting checked and tightened. During this time, the jeweler can also clean
                            and polish your engagement ring setting to look brand new.</p>
                        <h2>Storing Your Ring</h2>
                        <p>Though diamonds are the hardest substance known to man and extremely scratch resistant,
                            another diamond can scratch it. It is important to store your jewelry separate from one
                            another, most preferably in a fabric-lined case or box with dividers.</p>
                        <hr>
                    </div>
                </div>
                <div class="flex justify-between flex-wrap gap-2 sm:gap-4 -mx-4 lg:-mx-8" v-if="extraItems && extraItems.length">
                    <ProductCarousel :isSummary="true" :arrayData="extraItems" :heading="'Home Care'" :description="'Care for your jewelry with the help of our luxury jewelry care products:'" :isCleaningProduct="true"
                        @addToCartEmit="addToCart" :loadingId="addingToCartId" />
                </div>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'diamond-certification'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Diamond Certification</h2>
            <div>
                <div>
                    <p>When you purchase diamonds from Adiamor, they come with their original certificate, also
                        known as a Diamond Grading Report or Diamond Dossier®. Additionally, Adiamor offers free
                        appraisals for engagement rings, Design Your Own rings, and gemstone jewelry valued over
                        $1000.</p>
                    <h2>What is a Diamond Certificate?</h2>
                    <p>A diamond certificate, issued by an independent third-party laboratory, confirms a
                        diamond's authenticity and evaluates its characteristics. It provides a detailed
                        description of the diamond's quality, covering its shape, weight, color, clarity,
                        fluorescence, measurements, proportions, and overall finish.</p>
                    <h2>Certification and Diamond Grading Laboratories</h2>
                    <p>At Adiamor, we exclusively sell loose diamonds that have been thoroughly analyzed and
                        graded by leading industry laboratories. These include the <a href="https://www.gia.edu/"
                            rel="follow noopener" target="_blank">Gemological
                            Institute of America</a> (GIA), the <a href="https://www.igi.org/" rel="follow noopener"
                            target="_blank">International Gemological Institute</a> (IGI),
                        and the <a href="https://www.gcalusa.com/" rel="follow noopener" target="_blank">Gem
                            Certification &amp; Assurance Lab</a> (GCAL). Each of these labs is known for its
                        stringent, impartial grading standards. Rest assured, when you buy a diamond from us,
                        it's of top quality and value.</p>
                    <h2>View Diamond Certificates While You Shop</h2>
                    <p>Browse our selection online and view certificates for many of the diamonds we offer. If a
                        certificate isn't available for a specific diamond you're interested in, feel free to
                        reach out to our <NuxtLink :to="STATIC_ROUTES.CONTACT" target="_blank">expert support staff</NuxtLink>.</p>
                    <hr style="clear: both;">
                    <h2 style="clear: right;">GIA</h2>
                    <p>The Gemological Institute of America (GIA) stands as the foremost authority in diamond
                        evaluation, having pioneered the concept of the four Cs: carat, cut, color, and clarity.
                        A GIA certificate offers comprehensive insights into these characteristics, alongside
                        details on polish, symmetry, fluorescence, and proportions. Additionally, each GIA
                        certificate includes a distinct serial number for easy verification on the GIA website.
                    </p>
                    <h2 style="clear: right;">Sample GIA Diamond Grading Report</h2>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/sample-dossier.webp"
                            alt="Sample GIA Diamond Grading Report" style="float: right; width: 300px;"/></p>
                    <h3 style="margin-top: 10px;">Laser Inscription Registry</h3>
                    <p>Each diamond with a GIA Diamond Dossier is laser inscribed with the report number.<br><a
                            :href="`${$config?.public?.cdnPrefix}diamond-inscription.mp4?autoplay=1`"
                            title="Laser Inscription Registry" target="_blank" style="display: block; width: 100%;"
                            rel="noopener">View Sample Inscription</a></p>
                    <h3 style="margin-top: 10px;">Shape and Cutting Style</h3>
                    <p>The diamond shape and cutting style.</p>
                    <h3 style="margin-top: 10px;">Measurements</h3>
                    <p>The diamond dimensions in millimeters.</p>
                    <h3 style="margin-top: 10px;">Carat Weight</h3>
                    <p>Weight of diamond listed to the nearest hundredth of a carat.</p>
                    <h3 style="margin-top: 10px;">Color Grade</h3>
                    <p>Color grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Clarity Grade</h3>
                    <p>Clarity grade determined under 10x magnification.</p>
                    <h3 style="margin-top: 10px;">Cut Grade</h3>
                    <p>Cut grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Depth</h3>
                    <p>Depth (for round diamonds) and/or width (for fancy shapes) relative to diameter.</p>
                    <h3 style="margin-top: 10px;">Table</h3>
                    <p>Table facet (for round diamonds) and/or width (for fancy shapes) relative to diameter.
                    </p>
                    <h3 style="margin-top: 10px;">Girdle</h3>
                    <p>Range of girdle thickness.</p>
                    <h3 style="margin-top: 10px;">Culet</h3>
                    <p>Appearance of the culet facet.</p>
                    <h3 style="margin-top: 10px;">Finish</h3>
                    <p>Grades of polish and symmetry.</p>
                    <h3 style="margin-top: 10px;">Fluorescence</h3>
                    <p>Color, and strength of color when diamond is viewed under UV light.</p>
                    <h3 style="margin-top: 10px;">Clarity Plot</h3>
                    <p>A map of the approximate size, type, and position of inclusions as viewed under a
                        microscope.</p>
                    <h3 style="margin-top: 10px;">Comments</h3>
                    <p>Description of additional diamond characteristics not mentioned in the report.</p>
                    <h2 style="clear: right;">Sample GIA Diamond Dossier Grading Report</h2>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/sample-dossier.webp"
                            alt="Sample GIA Diamond Dossier Grading Report" style="float: right; width: 300px;"/></p>
                    <h3 style="margin-top: 10px;">Laser Inscription Registry</h3>
                    <p>Each diamond with a GIA Diamond Dossier is laser inscribed with the report number. <br><a
                            :href="`${$config?.public?.cdnPrefix}diamond-inscription.mp4?autoplay=1`" target="_blank"
                            title="Laser Inscription Registry" style="display: block; width: 100%;" rel="noopener"> View
                            Sample Inscription </a></p>
                    <h3 style="margin-top: 10px;">Shape and Cutting Style</h3>
                    <p>The diamond shape and cutting style.</p>
                    <h3 style="margin-top: 10px;">Measurements</h3>
                    <p>The diamond dimensions in millimeters.</p>
                    <h3 style="margin-top: 10px;">Carat Weight</h3>
                    <p>Weight of diamond listed to the nearest hundredth of a carat.</p>
                    <h3 style="margin-top: 10px;">Color Grade</h3>
                    <p>Color grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Clarity Grade</h3>
                    <p>Clarity grade determined under 10x magnification.</p>
                    <h3 style="margin-top: 10px;">Cut Grade</h3>
                    <p>Cut grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Depth</h3>
                    <p>Depth (for round diamonds) and/or width (for fancy shapes) relative to diameter.</p>
                    <h3 style="margin-top: 10px;">Table</h3>
                    <p>Table facet (for round diamonds) and/or width (for fancy shapes) relative to diameter.
                    </p>
                    <h3 style="margin-top: 10px;">Girdle</h3>
                    <p>Range of girdle thickness.</p>
                    <h3 style="margin-top: 10px;">Culet</h3>
                    <p>Appearance of the culet facet.</p>
                    <h3 style="margin-top: 10px;">Finish</h3>
                    <p>Grades of polish and symmetry.</p>
                    <h3 style="margin-top: 10px;">Fluorescence</h3>
                    <p>Color, and strength of color when diamond is viewed under UV light.</p>
                    <h3 style="margin-top: 10px;">Clarity Characteristics</h3>
                    <p>Description of additional diamond characteristics not mentioned in the report.</p>
                    <hr style="clear: both;">
                    <h2 style="clear: right;">GCAL</h2>
                    <p>The Gem Certification &amp; Assurance Lab (GCAL) is a leading research laboratory
                        specializing in guaranteed diamond grading. Their consumer grading guarantee ensures
                        cash-back for any identification or grading errors. GCAL provides a unique optical
                        fingerprint for each diamond, along with 360°, fire, and scintillation videos. A GCAL
                        certificate offers details on the four Cs of diamond grading, light performance, optical
                        brilliance, and Hearts &amp; Arrows. Additionally, each GCAL certificate includes a
                        unique serial number for convenient verification on the GCAL website.</p>
                    <h2 style="clear: right;">Sample GCAL Diamond Grading Report</h2>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/diamond-detail-img.webp"
                            alt="Sample GCAL Diamond Grading Report" style="float: right; width: 300px;"/></p>
                    <h3 style="margin-top: 10px;">Cut Grade</h3>
                    <p>Cut grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Shape</h3>
                    <p>The diamond shape and cutting style.</p>
                    <h3 style="margin-top: 10px;">Measurements</h3>
                    <p>The diamond dimensions in millimeters.</p>
                    <h3 style="margin-top: 10px;">Hearts &amp; Arrows</h3>
                    <p>The pattern of facets in round brilliant cut diamonds.</p>
                    <h3 style="margin-top: 10px;">Brilliance</h3>
                    <p>The overall amount of light returned to the person viewing the diamond.</p>
                    <h3 style="margin-top: 10px;">Symmetry</h3>
                    <p>Symmetry grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Polish</h3>
                    <p>Polish grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Depth</h3>
                    <p>Depth (for round diamonds) and/or width (for fancy shapes) relative to diameter.</p>
                    <h3 style="margin-top: 10px;">Table</h3>
                    <p>Table facet (for round diamonds) and/or width (for fancy shapes) relative to diameter.
                    </p>
                    <h3 style="margin-top: 10px;">Girdle</h3>
                    <p>Range of girdle thickness.</p>
                    <h3 style="margin-top: 10px;">Culet</h3>
                    <p>Appearance of the culet facet.</p>
                    <h3 style="margin-top: 10px;">Color Grade</h3>
                    <p>Color grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Clarity Grade</h3>
                    <p>Clarity grade determined under 10x magnification.</p>
                    <h2 style="clear: right;">GCAL 8X</h2>
                    <p>The 8X certificate is a pioneering standard designed to identify diamonds of unparalleled
                        cut quality. This innovative certification evaluates eight crucial aspects of cut
                        quality, including polish, symmetry, proportions, brilliance, fire, scintillation,
                        optical symmetry, and Hearts &amp; Arrows.</p>
                    <h2 style="clear: right;">Sample GCAL 8X Grading Report</h2>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/GCAL-8X-Lab-Grown-Diamond-Sample.webp"
                            alt="Sample GCAL 8X Grading Report" class="sm:float-right"  style="width: 300px;"/></p>
                    <h3 style="margin-top: 10px;">Cut Grade</h3>
                    <p>Cut grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Shape</h3>
                    <p>The diamond shape and cutting style.</p>
                    <h3 style="margin-top: 10px;">Measurements</h3>
                    <p>The diamond dimensions in millimeters.</p>
                    <h3 style="margin-top: 10px;">Hearts &amp; Arrows</h3>
                    <p>The pattern of facets in round brilliant cut diamonds.</p>
                    <h3 style="margin-top: 10px;">Brilliance</h3>
                    <p>The overall amount of light returned to the person viewing the diamond.</p>
                    <h3 style="margin-top: 10px;">Symmetry</h3>
                    <p>Symmetry grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Polish</h3>
                    <p>Polish grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Depth</h3>
                    <p>Depth (for round diamonds) and/or width (for fancy shapes) relative to diameter.</p>
                    <h3 style="margin-top: 10px;">Table</h3>
                    <p>Table facet (for round diamonds) and/or width (for fancy shapes) relative to diameter.
                    </p>
                    <h3 style="margin-top: 10px;">Girdle</h3>
                    <p>Range of girdle thickness.</p>
                    <h3 style="margin-top: 10px;">Culet</h3>
                    <p>Appearance of the culet facet.</p>
                    <h3 style="margin-top: 10px;">Color Grade</h3>
                    <p>Color grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Clarity Grade</h3>
                    <p>Clarity grade determined under 10x magnification.</p>
                    <hr style="clear: both;">
                    <h2 style="clear: right;">IGI</h2>
                    <p>The International Gemological Institute (IGI) boasts the largest global presence, with 20
                        laboratory locations worldwide. Their gemologists, certified by the GIA, utilize
                        identical equipment and techniques for diamond grading. An IGI certificate offers
                        insights into the four Cs of diamond grading, along with details on polish, symmetry,
                        fluorescence, and proportions. Additionally, each IGI certificate includes a unique
                        serial number for convenient verification on the IGI website.</p>
                    <h2 style="clear: right;">Sample IGI Diamond Grading Report</h2>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/igi-sample-certificate.webp"
                            alt="Sample IGI Diamond Grading Report" class="sm:float-right" style="width: 300px;"/></p>
                    <h3 style="margin-top: 10px;">Shape and Cut</h3>
                    <p>The diamond shape and cutting style.</p>
                    <h3 style="margin-top: 10px;">Carat weight</h3>
                    <p>The weight of the diamond.</p>
                    <h3 style="margin-top: 10px;">Color Grade</h3>
                    <p>Color grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Clarity Grade</h3>
                    <p>Clarity grade determined under 10x magnification.</p>
                    <h3 style="margin-top: 10px;">Cut Grade</h3>
                    <p>Cut grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Polish</h3>
                    <p>Polish grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Symmetry</h3>
                    <p>Symmetry grade of the diamond.</p>
                    <h3 style="margin-top: 10px;">Measurements</h3>
                    <p>The diamond dimensions in millimeters.</p>
                    <h3 style="margin-top: 10px;">Table Size</h3>
                    <p>Table facet (for round diamonds) and/or width (for fancy shapes) relative to diameter.
                    </p>
                    <h3 style="margin-top: 10px;">Girdle</h3>
                    <p>Range of girdle thickness.</p>
                    <h3 style="margin-top: 10px;">Culet</h3>
                    <p>Appearance of the culet facet.</p>
                    <hr style="clear: both;">
                    <h2>Appraisal and Certification Documents</h2>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/appraisal_example.webp"
                            alt="Appraisal and Certification Documents"/></p>
                    <p>An appraisal is a crucial document indicating the approximate retail replacement value of
                        an item, often required for insurance purposes. In the unfortunate event of loss, theft,
                        or damage, your insurance provider relies on the appraisal to ensure equal replacement
                        of your item. Furthermore, your insurance premium is determined based on the retail
                        replacement value outlined in the appraisal. At Adiamor, we offer complimentary
                        professional appraisals upon request for all diamond engagement ring purchases.</p>
                    <h3 style="margin-top: 10px;">What's in our Appraisal?</h3>
                    <p>Our appraisals, drafted and signed by our team of Gemology experts, guarantee the utmost
                        quality of your purchase. Each center stone undergoes meticulous magnification
                        inspection to align with its accompanying laboratory certificate. Sidestones also
                        undergo thorough examination to meet Adiamor's stringent standards for excellence. In
                        addition, our appraisal for diamond engagement rings contain valuable information,
                        including:</p>
                    <ul style="line-height: 30px; margin-left: 30px;">
                        <li>The precious metal used in the engagement setting.</li>
                        <li>An accurate and complete description of the item being appraised.</li>
                        <li>The shape, carat weight, color, clarity, and measurements of the center diamond.
                        </li>
                        <li>The name of the independent laboratory certification and report number.</li>
                        <li>The approximate retail replacement value. If you have any further questions about
                            the appraisal report, please email us at <a
                                href="mailto:service@adiamor.com">service@adiamor.com</a> or contact a customer
                            service representative by phone at <a :href="`tel:${telPhoneNumber}`">{{phoneNumber}}</a>.</li>
                    </ul>
                </div>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'diamond-clarity'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Diamond Clarity</h2>
            <div>
                <div>
                    <p>Most diamonds have unique clarity characteristics, much like a fingerprint. These
                        distinguishing characteristics can be classified as inclusions and blemishes. Inclusions
                        are enclosed within a diamond or extend into the diamond from its surface while
                        blemishes, on the other hand, are confined to the diamond's surface. When light enters a
                        diamond, it is reflected in and refracted out. If anything disrupts the flow of light
                        through the diamond, such as an inclusion, a proportion of the light reflected may be
                        lost. This effect can detract from the pure beauty of the diamond.</p>
                    <p>To get the most value, Adiamor suggests selecting a diamond that is "eye clean" where no
                        internal flaws are visible to the unaided eye. The table here depicts how a flaw
                        (inclusion or blemish) may appear under 10x magnification.</p>
                    <p>You may not notice a significant difference between an SI1 and a SI2 with the naked eye.
                        However, you should consider the number, size, brightness, nature, and position of the
                        inclusions of an SI2 graded diamond to ensure that it is eye clean. Some inclusions can
                        be hidden by a prong when mounted, thus having little effect on the beauty of a diamond.
                        An inclusion in the middle or top of a diamond, however, could impact the dispersion of
                        light, sometimes making the diamond appear less brilliant.</p>
                    <p>Our diamond consultants can inspect an SI2 graded diamond to ensure that it is eye clean
                        before your purchase. For assistance, please email us at <a
                            href="mailto:service@adiamor.com">service@adiamor.com</a> or contact a customer
                        service representative by phone at {{phoneNumber}}.</p>
                    <p><NuxtLink :to="STATIC_ROUTES.DIAMONDS_SEARCH">Search our online database of loose diamonds in all clarity
                            grades</NuxtLink></p>
                    <hr>
                    <h2>GIA &amp; AGS Clarity Grading Scale</h2>
                    <p>A diamond's cut is considered to be the most important of the four Cs. It is important to
                        understand how a diamond's proportions and the relationship between them affects its
                        brilliance, fire, and scintillation.</p>
                    <p>Most diamonds are "spread" in their cutting to retain maximum weight from the original
                        rough diamond. This technique results in a heavier diamond and also sacrifices the
                        potential fire and brilliance of the stone. The width and depth have the greatest effect
                        on how light travels within the diamond, and also how light exits the diamond in the
                        form of brilliance.</p>
                    <table role="table" aria-label="GIA and AGS Clarity Grading Scale">
                        <tbody>
                            <tr>
                                <td style="border-bottom: solid 1px #ececec; padding: 10px;"><strong>FL -
                                        IF<br>(AGS 0)</strong><br><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/diamondclarity_fl.webp"
                                        alt="Flawless and Internally Flawless diamond clarity example"/><br>Flawless and Internally Flawless</td>
                                <td style="border-bottom: solid 1px #ececec; padding: 10px;"><strong>VVS1 -
                                        VVS2<br>(AGS 1-2)</strong><br><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/diamondclarity_vvs.webp"
                                        alt="Very Very Slightly Included diamond clarity example"/><br>Very Very Slightly Included</td>
                                <td style="border-bottom: solid 1px #ececec; padding: 10px;"><strong>VS1 -
                                        VS2<br>(AGS 3-4)</strong><br><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/diamondclarity_vs.webp"
                                        alt="Very Slightly Included diamond clarity example"/><br>Very Slightly Included</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px;"><strong>SI1 - SI2<br>(AGS 5-6)</strong><br><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/diamondclarity_si.webp"
                                        alt="Slightly Included diamond clarity example"/><br>Slightly Included</td>
                                <td style="padding: 10px;"><strong>I1 - I2 - I3<br>(AGS 7-8-9)</strong><br><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/diamondclarity_i.webp"
                                        alt="Included diamond clarity example"/><br>Included</td>
                                <td style="padding: 10px;"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'diamond-color'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Diamond Color</h2>
            <div>
                <div>
                    <p>Diamond Color is one of the most important factors to consider, as it is noticeable to the
                        naked eye. A diamond's color is graded by GIA on an alphabetical scale from D to Z, with D
                        being absolutely colorless and Z being light yellow. Beyond Z-color, a diamond is considered
                        to be a "fancy" color. Although many diamonds appear to be colorless, some have at least a
                        hint of body color.</p>
                    <div class="flex flex-wrap justify-between">
                        <div class="text-center">
                            <strong>D - J</strong><br>
                            (AGS 0.0-3.0)<br>
                            <nuxt-img provider="cdn" src="/landing-pages/Help%20Center/diamondcolor_dtoj.webp"
                                alt="Diamond color grades D through J showing colorless to near colorless range"/>
                        </div>
                        <div class="text-center">
                            <strong>K - R</strong><br>
                            (AGS 3.5-7.0)<br>
                            <nuxt-img provider="cdn" src="/landing-pages/Help%20Center/diamondcolor_ktor.webp"
                                alt="Diamond color grades K through R showing faint to light yellow range"/>
                        </div>
                        <div class="text-center">
                            <strong>S - Z</strong><br>
                            (AGS 7.5 - 10.0)<br>
                            <nuxt-img provider="cdn" src="/landing-pages/Help%20Center/diamondcolor_stoz.webp"
                                alt="Diamond color grades S through Z showing light yellow to fancy color range"/>
                        </div>
                    </div>
                    <p>A diamond's color has a significant impact on its value. To ensure the highest quality
                        diamonds for your selection, Adiamor carries diamonds in the color range from D to J only.
                        When buying a diamond, take into consideration that it is often very difficult to detect the
                        difference between a colorless diamond (D to F) and a near colorless diamond (G to J),
                        especially when it is mounted in jewelry. Diamonds with a K to Z color grade usually have
                        yellow shading that can be detected by the naked eye, however, a well cut stone with good
                        proportions will still release the brilliance and fire of a lower colored diamond,
                        dispersing light in such a way so as to create a beautiful stone.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/color_scales.webp" alt="Diamond color grading scale comparison chart showing GIA and AGS color grades"
                            width="600"/></p>
                    <h3>Fluorescence</h3>
                    <p>Fluorescence is not directly related to a diamond's color. This separate characteristic
                        refers to the diamond's ability to fluoresce under ultraviolet (UV) light. Our sun emits
                        some UV light, but it is usually not great enough to detect fluorescence. When exposed to UV
                        light, many diamonds will give off a distinctive glowing blue coloration. Although
                        fluorescence may be displayed in various colors, blue is the most common in diamonds. The
                        fluorescence of a diamond is defined by its intensity as either None, Faint, Medium, Strong,
                        or Very Strong. Although fluorescence is a characteristic that can be measured, it is rarely
                        an issue when selecting a diamond and is usually not detectable to the eye.</p>
                    <p>The impact of fluorescence on price depends on its noticeability. Faint fluorescence has very
                        little effect on a diamond of any color, and therefore has no effect on value. For some
                        higher color stones (D to G), strong fluorescence may give the stone a milky white
                        appearance, which greatly lowers the value. Fluorescence often adds value to stones with a
                        hint of color, such as I-color and below, as it can give the diamond a whiter, brighter
                        appearance.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Help%20Center/fluorescence.webp" alt="Diamond fluorescence examples showing how diamonds appear under ultraviolet light"
                            width="600"/></p>
                    <p>Further Reading:<br><a
                            href="https://www.adiamor.com/blog/education/diamond-fluorescence-explained">Diamond
                            Fluorescence Explained</a><br><a
                            href="https://www.adiamor.com/blog/diamonds/how-does-sunlight-affect-diamond-fluorescence">How
                            does sunlight
                            affect diamond fluorescence?</a></p>
                    <h3>Choose Carefully</h3>
                    <p>Diamond fluorescence is a complex science, but in the world of diamonds, a fairly
                        straightforward quality grading process. At the end of the day, the "eye is in the beholder"
                        - but note that the highly fluorescent diamond is not necessarily the best!</p>
                    <h3>How do naturally colored diamonds end up with some of the many amazing hues that we attempt
                        to recreate in much more common colorless stones?</h3>
                    <p>In truth, there are a number of factors that must fall into place in order for the Earth to
                        create these colorful treasures naturally. Here’s a brief overview of the conditions
                        necessary to create these fancy gemstones.</p>
                    <p>You probably know that diamonds are created by carbon that is both heated and compressed,
                        then pushed to the surface of the Earth (or close to it), resulting in the colorless stones
                        that are the bread and butter of the diamond industry. However, no diamond is perfect, and
                        it is the impurities in the stone that can cause coloration. This works in a couple of ways.
                        First, carbon is rarely found in a completely undiluted state. Often there are other
                        elements in the vicinity that can lead to slight discoloration in the finished product,
                        which is why colorless diamonds are so desirable.</p>
                    <p>However, even rarer than completely colorless diamonds are those that display the intense
                        color indicative of mass amounts of some other element in the environment. Boron, for
                        example, will lead to rare blue hues in diamonds while nitrogen will produce the much more
                        common yellows and browns. Radiation will produce a green color (uh, kryptonite, anyone?)
                        and unusual stresses that trap electrons in the stone are thought to result in pink or
                        reddish hues. But that’s not all there is to it.</p>
                    <p>Flaws within the stone can magnify or even cause coloration because of the way light entering
                        the stone is refracted. For this reason, a stone that is already colored may be more
                        appealing with a flaw since it can greatly enhance the color, pushing it into the class of a
                        “fancy colored diamond”, which makes it exponentially more valuable.</p>
                    <p>It’s pretty interesting that the impurities and flaws in diamonds can actually add to their
                        value, but remember that they have to achieve fancy color status in order to be worth more.
                        If the color is pale in a stone, it will hold a low value since it is neither colorless nor
                        saturated (making it one of the most common geological blunders). So before you buy a rare
                        colored stone, make sure it meets proper standards of rarity so that you get a diamond that
                        is as valuable as it is desirable.</p>
                </div>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'diamond-cut'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Diamond Cut</h2>
            <div>
                <div>
                    <p>Unlocking the brilliance of a diamond begins with its cut. Widely regarded as the most critical
                        of the four Cs, understanding a diamond's cut is key to appreciating its sparkle, fire, and
                        scintillation.</p>
                    <p>While many diamonds are cut to maximize their weight from the original rough stone, this approach
                        often sacrifices the stone's potential for brilliance and fire. The interplay of a diamond's
                        proportions profoundly impacts how light interacts within and exits the stone.</p>
                    <p>Graded by a series of meticulous measurements, a diamond's cut is a delicate balance of depth
                        percentage—reflecting the height versus width of the stone—and table percentage—illustrating the
                        diameter of the top facet versus the stone's average width. These essential metrics are
                        meticulously detailed on the GIA, IGI, or GCAL Diamond Grading Report accompanying each Adiamor
                        loose diamond.</p>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="text-center">
                            <h3>Shallow Cut Diamonds</h3>
                            <nuxt-img provider="cdn" src="/landing-pages/Policy/cut1.webp" class="mx-auto"
                                alt="Shallow Cut Diamonds"/>
                        </div>
                        <div class="text-center">
                            <h3>Deep Cut Diamonds</h3>
                            <nuxt-img provider="cdn" src="/landing-pages/Policy/cut2.webp" class="mx-auto"
                                alt="Deep Cut Diamonds"/>
                        </div>
                    </div>
                    <p>GIA, IGI, and GCAL each have their own rigorous criteria for assessing a diamond's cut quality.
                        GIA employs a grading scale ranging from Excellent to Poor, evaluating factors like symmetry,
                        polish, and proportions. IGI similarly grades diamonds on a scale from Excellent to Poor,
                        considering parameters such as symmetry, polish, and proportions. GCAL, renowned for its 8X
                        certification, sets the bar even higher, with an additional level of scrutiny that encompasses
                        brilliance, fire, and light performance beyond traditional grading scales.</p>
                    <h2>Diamond Characteristics</h2>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondcut_proportions.webp"
                            alt="Diamond Characteristics"/>Yet,
                        the story doesn't end there. Beyond these fundamental measures lie nuanced factors like crown
                        angle, girdle thickness, culet size, and the intricacies of craftsmanship, each contributing to
                        the diamond's overall cut quality. While opinions on the ideal table size and depth may vary
                        among experts, it's the harmonious interplay of these factors that truly defines a diamond's
                        brilliance and beauty.</p>
                    <p></p>
                    <p></p>
                    <h2 id="PolSym">Polish &amp; Symmetry</h2>
                    <p>Although polish and symmetry are graded under 10x magnification they can both have an effect on
                        the overall appearance of a diamond. Polish refers to the quality of the diamond's surface and
                        includes such features as nicks, polish lines and abrasions. Symmetry refers to the exactitude
                        of the shape and alignment of the facets.</p>
                    <div class="grid grid-cols-3 gap-2 sm:gap-4">
                        <div class="text-center">
                            <p>Off-center Culet</p>
                            <nuxt-img provider="cdn" class="max-h-[8rem] xl:max-w-none mx-auto"
                                src="/landing-pages/Policy/diamondcut_polsym1.webp"
                                alt="Off-center Culet"/>
                        </div>
                        <div class="text-center">
                            <p>Misshapen Facets</p>
                            <nuxt-img provider="cdn" class="max-h-[8rem] xl:max-w-none mx-auto"
                                src="/landing-pages/Policy/diamondcut_polsym2.webp"
                                alt="Misshapen Facets"/>

                        </div>
                        <div class="text-center">
                            <p>Off-center Table</p>
                            <nuxt-img provider="cdn" class="max-h-[8rem] xl:max-w-none mx-auto"
                                src="/landing-pages/Policy/diamondcut_polsym3.webp"
                                alt="Off-center Table"/>

                        </div>
                    </div>
                    <p>The polish and symmetry grades are listed on each diamond's detail page and within their
                        accompanying GIA or AGSL diamond grading report.</p>
                    <p>GIA grades polish and symmetry as: Excellent (EX), Very Good (VG), Good (G)</p>
                    <p>AGSL grades polish and symmetry as: Ideal (ID), Excellent (EX), Very Good (VG), Good (G)</p>
                    <p>Adiamor does not carry diamonds with polish and symmetry grades of: Fair (F), Poor (P)</p>
                </div>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'diamond-shape'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Diamond shape</h2>
            <div>
                <p>At Adiamor, our strict standards of quality ensure that all of our diamond shapes are of the highest
                    cut and craftsmanship. Our extensive collection of natural, ethically sourced, GIA graded diamonds
                    include every shape from the classic round brilliant to fancy shapes such as emerald cut, oval cut
                    and cushion cut diamonds. Adiamor's Affinity Collection diamonds feature the highest quality of
                    diamond cut and craftsmanship available in the world. Our Affinity Collection diamonds include the
                    "Hearts and Arrows" round brilliant diamond cut, and both emerald and Asscher cut diamonds.</p>
                <p>Further Reading: <a target="_blank" href="https://www.adiamor.com/blog/education/520"
                        rel="noopener">The Evolution of
                        Diamond Shapes</a></p>
                <h2>Choose Your Diamond Shape</h2>
                <p>Various diamond shapes all have their own distinct and unique properties; the way a particular
                    diamond appears to the wearer, reflects and refracts light and displays fire and brilliance all
                    depend upon it's shape. Choose your preferred shape below to learn about what will become your
                    favorite diamond shape. If you have further questions, please contact our one of our on staff
                    gemologists who will happily walk you through the process of selecting a diamond just right for you.
                </p>
                <hr>
                <h2>Round Cut Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_round.webp"
                        class="xl:float-right" alt="Round cut diamond"/></p>
                <p>The round brilliant cut diamond stands as an enduring symbol of elegance and sophistication, beloved
                    for its timeless appeal in engagement and wedding rings. With its versatile nature, the round
                    brilliant effortlessly enhances any jewelry piece, whether it's a ring, pendant, or earrings.</p>
                <p>Featuring 58 precision-cut facets meticulously arranged to maximize sparkle and brilliance, the round
                    brilliant diamond captivates viewers with its mesmerizing fire and scintillation. Renowned for its
                    exceptional light performance, this cut offers unparalleled flexibility in color and clarity
                    options, making it a top choice for those seeking a perfect balance of beauty and quality.</p>
                <p><strong>Tip: </strong>Opt for a round brilliant cut diamond for a wide array of color and clarity
                    options, ensuring you find the perfect match for your preferences and budget.</p>
                <p><strong>Fact: </strong>Each brilliant cut diamond boasts 58 facets, meticulously crafted to deliver
                    unparalleled brilliance and fire, making it a timeless masterpiece of craftsmanship and beauty.</p>
                <p>Further Reading:<br><a target="_blank"
                        href="https://www.adiamor.com/blog/style-and-fashion/can-you-set-a-round-diamond-in-a-cushion-shaped-halo-engagement-ring"
                        rel="noopener">Can you set a Round Diamond in a Cushion Shape Halo Engagement Ring?</a></p>
                <p><iframe 
                        class="aspect-video" 
                        width="100%" 
                        height="314"
                        src="https://www.youtube.com/embed/YsObMCXyIsY?rel=0" 
                        allowfullscreen="allowfullscreen"
                        title="Quick Guide to Buying Round Brilliant Cut Diamonds"
                        aria-label="Video: Quick Guide to Buying Round Brilliant Cut Diamonds"></iframe></p>
                <p><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL, query: { diamond_shape: 'round' } }">Search
                        Natural Round Brilliant Cut Diamonds</NuxtLink><br><NuxtLink
                        :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN, query: { diamond_shape: 'round' } }">Search
                        Lab Grown Round Brilliant Cut Diamonds</NuxtLink></p>
                <hr>
                <h2>Princess Cut Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_princess.webp"
                        class="xl:float-right" alt="Princess cut diamond"/></p>

                <p>Following the round brilliant, the princess cut diamond stands as one of the most popular choices for
                    discerning individuals seeking timeless elegance in their jewelry. With its square shape and pointed
                    corners, princess cut diamonds exude both classic charm and modern sophistication, making them a
                    versatile and coveted choice for any setting.</p>
                <p>Featuring chevron-shaped facets meticulously arranged to maximize scintillation and fire, the
                    princess cut diamond captivates onlookers with its mesmerizing brilliance and sparkle. Defined by
                    the Gemological Institute of America (GIA) as a square modified brilliant or a rectangular modified
                    brilliant cut, princess cut diamonds offer a stunning combination of beauty and versatility.</p>
                <p>Princess cut diamonds showcase their true splendor when their length-to-width ratio falls within the
                    range of 1.0 to 1.05, appearing perfectly square. However, diamonds with ratios between 1.06 and
                    1.09 still retain their near-perfect square appearance, offering flexibility in customization while
                    maintaining exceptional beauty.</p>
                <p><strong>Tip: </strong>Opt for a princess cut diamond for a versatile and timeless choice that
                    effortlessly complements both classic and modern settings.</p>
                <p><strong>Fact: </strong>Princess cut diamonds feature chevron-shaped facets that maximize
                    scintillation and fire, ensuring breathtaking brilliance and sparkle that captivate admirers.</p>
                <p><strong>Further Reading: </strong><a
                        href="https://www.adiamor.com/blog/education/square-diamond-ring-what-is-the-difference-between-princess-and-radiant-cut"
                        rel="follow">What's the difference between a Princess Cut and a Radiant Cut Diamond?</a></p>
                <p><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL, query: { diamond_shape: 'princess' } }">Search
                        Natural Princess Cut Diamonds</NuxtLink><br><NuxtLink
                        :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN, query: { diamond_shape: 'princess' } }">Search
                        Lab Grown Princess Cut Diamonds</NuxtLink></p>
                <hr>
                <h2>Emerald Cut Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_emerald.webp"
                        class="xl:float-right" alt="Emerald cut diamond"/></p>

                <p>The emerald cut diamond epitomizes elegance and sophistication, making it a timeless choice for those
                    with discerning taste. Characterized by its large table and straight, tiered facets reminiscent of a
                    mirrored staircase within the pavilion, the emerald cut showcases the clarity and transparency of
                    the diamond with unparalleled grace.</p>
                <p>As a step cut diamond, the emerald cut's signature features include cut corners on the outer edges,
                    adding to its distinctive allure and charm. With its understated beauty and classic appeal, the
                    emerald cut diamond exudes timeless elegance, making it a sought-after choice for those who
                    appreciate refined aesthetics.</p>
                <p>When selecting the perfect emerald cut diamond, prioritize clarity to ensure maximum brilliance and
                    beauty. Adiamor recommends clarity grades of VS2 and higher, coupled with a thorough visual
                    inspection to ensure no inclusions or blemishes impact the diamond's appearance.</p>
                <p><strong>Tip: </strong>Clarity plays a crucial role in the beauty of an emerald cut diamond. For
                    optimal results, opt for clarity grades of VS2 and higher to ensure a flawless appearance. Take care
                    to inspect for any visible inclusions or blemishes, especially for diamonds with clarity grades of
                    SI1 or lower.</p>
                <p><strong>Fact: </strong>The long, tiered facets of the step cut create a mesmerizing mirrored effect
                    within the pavilion, enhancing the diamond's brilliance and allure.</p>
                <p><strong>Suggested Cut: </strong>A classic-shaped emerald cut diamond typically boasts a
                    length-to-width ratio ranging from 1.3 to 1.55, offering a balanced and visually appealing
                    appearance that accentuates its timeless beauty.</p>
                <p>Further Information: <a
                        href="https://www.adiamor.com/blog/education/emerald-cut-engagement-rings-from-adiamor-are-timeless"
                        title="Emerald Cut Diamond Engagement Rings From Adiamor are Timeless" rel="follow">Emerald Cut
                        Diamond Engagement Rings From Adiamor are Timeless</a></p>
                <p><iframe 
                        class="aspect-video" 
                        width="100%" 
                        height="315"
                        src="https://www.youtube.com/embed/i5UKwE8E0t8?rel=0"
                        title="Quick Guide to Buying Emerald Cut Diamonds" 
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen="allowfullscreen"
                        aria-label="Video: Quick Guide to Buying Emerald Cut Diamonds"></iframe></p>
                <p><a href="https://youtu.be/i5UKwE8E0t8" rel="follow noopener" target="_blank">How To Buy Emerald Cut
                        Diamonds</a></p>
                <p></p>
                <p><NuxtLink :to="STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL_EMERALD">Search Natural Emerald Cut
                        Diamonds</NuxtLink><br><NuxtLink :to="STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN_EMERALD">Search Lab
                        Grown Emerald Cut Diamonds</NuxtLink></p>
                <hr>
                <h2>Marquise Cut Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_marquise.webp"
                        class="xl:float-right" alt="Marquise cut diamond"/></p>

                <p>The Marquise cut diamond exudes a unique and regal charm, setting it apart from other diamond shapes.
                    Originally commissioned by King Louis XIV, the Marquise cut is also known as the "navette" cut,
                    meaning "little boat" in French, owing to its distinctive elongated shape resembling a boat.</p>
                <p>As a modified brilliant cut, the Marquise cut diamond boasts excellent sparkle and brilliance, making
                    it a captivating choice for those seeking elegance and sophistication. Its elongated silhouette not
                    only maximizes the visual size in relation to carat weight but also creates the illusion of long,
                    slender fingers, adding to its allure and charm.</p>
                <p><strong>Tip: </strong>Opt for a Marquise cut diamond to accentuate the appearance of long, slender
                    fingers, thanks to its elongated shape.</p>
                <p><strong>Fact: </strong>The brilliant cut of the Marquise diamond enhances its fire and brilliance,
                    ensuring a dazzling display of light that captivates admirers. Additionally, its elongated shape
                    creates the illusion of a larger visual size, making it an ideal choice for those seeking maximum
                    impact.</p>
                <p><strong>Suggested Cut: </strong>For an ideal Marquise cut diamond, aim for a length-to-width ratio
                    ranging from 1.75 to 2.25, striking the perfect balance between elegance and proportion.</p>
                <p><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL, query: { diamond_shape: 'marquise' } }">Search
                        Natural Marquise Cut Diamonds</NuxtLink><br><NuxtLink
                        :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN, query: { diamond_shape: 'marquise' } }">Search Lab
                        Grown Marquise Cut Diamonds</NuxtLink></p>
                <hr>
                <h2>Heart Shaped Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_heart.webp"
                        class="xl:float-right" alt="Heart shaped diamond"/></p>

                <p>Symbolizing true love and romance, the heart shape diamond is a captivating symbol of affection and
                    devotion, making it an ideal choice for expressing heartfelt sentiments in rings and pendants.
                    Originally derived from the pear shape, this brilliant cut diamond showcases the inherent fire and
                    brilliance within the gemstone, creating a mesmerizing display of light.</p>
                <p>The heart shape diamond features a distinctive notch at the top, a testament to the skill and
                    expertise of the diamond cutters who craft this unique shape. Symmetry and a balanced
                    length-to-width ratio are crucial considerations when selecting a heart-shaped diamond, as diamonds
                    that are cut too wide or too narrow can appear distorted, detracting from their beauty and allure.
                </p>
                <p><strong>Tip: </strong>Opt for a heart-shaped diamond for a timeless and romantic choice that is
                    well-suited for both rings and pendants, perfect for celebrating cherished moments and declarations
                    of love.</p>
                <p><strong>Fact: </strong>Crafting a heart shape diamond requires exceptional skill and precision,
                    making it a symbol of the highest craftsmanship and expertise in diamond cutting.</p>
                <p><strong>Suggested Cut: </strong>When selecting a heart-shaped diamond, aim for a length-to-width
                    ratio ranging from 0.9 to 1.1, with 1.1 being the ideal shape, ensuring a beautifully proportioned
                    and symmetrical diamond that captures the essence of true love and romance.</p>
                <p><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL, query: { diamond_shape: 'heart' } }">Search Natural
                        Heart Shaped Diamonds</NuxtLink><br><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN, query: {
                        diamond_shape: 'heart' } }">Search Lab Grown Heart Shaped Diamonds</NuxtLink></p>
                <hr>
                <h2>Pear Shaped Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_pear.webp"
                        class="xl:float-right" alt="Pear shaped diamond"/></p>

                <p>The pear shape diamond, also known as the tear-drop shape, is a brilliant cut diamond characterized
                    by its rounded bottom and dramatic point, creating a distinctive silhouette that sets it apart from
                    other diamond shapes. The round portion of the pear contributes to its brilliance, while the unique
                    shape of the point adds an element of sophistication and allure.</p>
                <p>The elongated silhouette of the pear shape diamond offers versatility and flattering proportions,
                    with larger measurements per carat compared to other diamond shapes. This timeless shape has
                    remained popular for decades, lending a classically beautiful appeal to any jewelry it adorns.</p>
                <p><strong>Tip: </strong>Opt for a pear shape diamond to create the illusion of longer and slimmer
                    fingers, thanks to its elongated silhouette and tapered point, adding elegance and sophistication to
                    your overall look.</p>
                <p><strong>Fact: </strong> The pear shape diamond is also commonly referred to as the tear-drop shape,
                    owing to its distinctive silhouette reminiscent of a falling teardrop.</p>
                <p><strong>Suggested Cut: </strong> When selecting a pear-shaped diamond, aim for a length-to-width
                    ratio ranging from 1.45 to 1.75, striking the perfect balance between elegance and proportion,
                    ensuring a beautifully balanced and visually appealing diamond that captures attention.</p>
                <p><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL, query: { diamond_shape: 'pear' } }">Search
                        Natural Pear Shaped Diamonds</NuxtLink><br><NuxtLink
                        :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN, query: { diamond_shape: 'pear' } }">Search Lab
                        Grown Pear Shaped Diamonds</NuxtLink></p>
                <hr>
                <h2>Radiant Cut Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_radiant.webp"
                        class="xl:float-right" alt="Radiant cut diamond"/></p>

                <p>The radiant cut diamond, a brilliant cut with square or rectangular shape and cut corners, is
                    renowned for its bright and fiery effect, captivating admirers with its brilliant facets. This
                    popular cut is favored by those who appreciate the clean, linear shape of step-cut diamonds while
                    desiring the dazzling sparkle of brilliant-cut diamonds. Versatile and stylish, the radiant cut
                    diamond looks exceptional in various settings, whether showcased as a solitaire or complemented by
                    other diamond accents.</p>
                <p>The rectangularity of the radiant cut is determined by its length-to-width ratio, with ratios ranging
                    from 1.00 to 1.05 creating a square shape, and ratios from 1.30 to 1.50 producing a more elongated
                    rectangle, offering flexibility in customization to suit individual preferences.</p>
                <p><strong>Tip: </strong>Opt for a radiant cut diamond for a perfect balance of clean lines and
                    brilliant fire, making it an excellent choice for those seeking elegance and sparkle in their
                    jewelry.</p>
                <p><strong>Fact: </strong>The radiant cut diamond features clipped corners reminiscent of a step cut
                    diamond, while its brilliant-cut facets add a captivating sparkle and brilliance to the gemstone,
                    creating a unique and mesmerizing effect.</p>
                <p><strong>Suggested Cut: </strong>For elongated radiant cut diamonds, aim for a length-to-width ratio
                    ranging from 1.2 to 1.5, while square cuts are best achieved with ratios between 1.0 and 1.05,
                    ensuring a beautifully proportioned and visually appealing diamond that captures attention.</p>
                <p><iframe 
                        class="aspect-video" 
                        width="100%" 
                        height="314"
                        src="https://www.youtube.com/embed/D42AJxmH4WI?rel=0" 
                        allowfullscreen="allowfullscreen"
                        title="Quick Guide to Buying Radiant Cut Diamonds"
                        aria-label="Video: Quick Guide to Buying Radiant Cut Diamonds"></iframe>
                </p>
                <p><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL, query: { diamond_shape: 'radiant' } }">Search
                        Natural Radiant Cut Diamonds</NuxtLink><br><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN, query: {
                        diamond_shape: 'radiant' } }">Search Lab Grown Radiant Cut Diamonds</NuxtLink></p>
                <hr>
                <h2>Oval Shaped Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_oval.webp"
                        class="xl:float-right" alt="Oval shaped diamond"/></p>

                <p>Brides seeking originality and uniqueness gravitate towards oval diamonds, which sparkle with the
                    life and brilliance of round diamonds while boasting a gracefully elongated shape that sets them
                    apart. The oval cut diamond not only dazzles with its sparkling brilliance but also creates the
                    illusion of slimmer fingers, thanks to its elongated silhouette that appears larger when mounted.
                </p>
                <p>The overall profile of an oval diamond is determined by its length-to-width ratio, with ratios
                    between 1.33 and 1.66 recommended for achieving a classic oval shape. Featuring 58 facets like the
                    round brilliant cut, the oval diamond boasts a larger table, enhancing its brilliance and allure.
                </p>
                <p><strong>Tip: </strong>Opt for an oval diamond for a perfect combination of the fire and brilliance of
                    a round diamond with a distinctive and unique profile, adding elegance and sophistication to any
                    jewelry piece.</p>
                <p><strong>Fact: </strong>The oval cut diamond features 58 facets and a larger table than the round
                    brilliant cut, maximizing its brilliance and sparkle, making it a captivating choice for those
                    seeking timeless beauty and elegance.</p>
                <p><strong>Suggested Cut: </strong>Aim for length-to-width ratios between 1.33 and 1.66 when selecting
                    an oval cut diamond, ensuring a beautifully proportioned and visually appealing gemstone that
                    captures attention and admiration.</p>
                <p>Further Reading: <a href="https://www.adiamor.com/blog/education/all-about-ovals"
                        title="All About Oval Diamonds" rel="follow">All About Oval Diamonds</a></p>
                <p><iframe 
                        class="aspect-video" 
                        width="100%" 
                        height="315"
                        src="https://www.youtube.com/embed/CT1oEfuCy2s?rel=0"
                        title="Quick Guide to Buying Oval Cut Diamonds" 
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen="allowfullscreen"
                        aria-label="Video: Quick Guide to Buying Oval Cut Diamonds"></iframe></p>
                <p><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL, query: { diamond_shape: 'oval' } }">Search
                        Natural Oval Shaped Diamonds</NuxtLink><br><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN, query: {
                        diamond_shape: 'oval' } }">Search Lab Grown Oval Shaped Diamonds</NuxtLink></p>
                <hr>
                <h2>Asscher Cut Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_asscher.webp"
                        class="xl:float-right" alt="Asscher cut diamond"/></p>

                <p>The Asscher cut diamond bears a striking resemblance to the emerald cut, both being step cuts with
                    tiered facets that create a mirror-like reflection of light. However, the Asscher cut distinguishes
                    itself by its square shape, offering a geometric and modern appeal that sets it apart. Renowned for
                    its ability to emphasize the clarity of the diamond, the Asscher cut is ideal for showcasing higher
                    clarity diamonds, making it a popular choice among those seeking sophistication and elegance.</p>
                <p>Developed in 1902, the Asscher cut diamond rose to prominence during the Art Deco period, capturing
                    the attention of individuals with its geometric look and timeless allure. Over the past decade, the
                    Asscher cut has experienced a resurgence in popularity, attracting those who value individuality and
                    a flair for style.</p>
                <p><strong>Tip: </strong>Prioritize clarity when selecting an Asscher cut diamond, ensuring that
                    diamonds with clarity grades of SI1 or lower are eye-clean, guaranteeing maximum brilliance and
                    beauty.</p>
                <p><strong>Fact: </strong>The Asscher cut diamond was created in 1902 by Joseph Asscher, cementing its
                    place in history as an iconic and timeless diamond cut.</p>
                <p><strong>Suggested Cut: </strong>When searching for a square proportioned Asscher cut diamond, aim for
                    a length-to-width ratio ranging from 1.00 to 1.05, striking the perfect balance between elegance and
                    symmetry, ensuring a beautifully proportioned and visually appealing gemstone that captivates
                    admirers.</p>
                <p><iframe 
                        class="aspect-video" 
                        width="100%" 
                        height="314"
                        src="https://www.youtube.com/embed/9e8LSM-9cd8" 
                        allowfullscreen="allowfullscreen"
                        title="Quick Guide to Buying Asscher Cut Diamonds"
                        aria-label="Video: Quick Guide to Buying Asscher Cut Diamonds"></iframe>
                </p>
                <p><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL, query: { diamond_shape: 'asscher' } }">Search
                        Natural Asscher Cut Diamonds</NuxtLink><br><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN,
                        query: { diamond_shape: 'asscher' } }">Search Lab Grown Asscher Cut Diamonds</NuxtLink></p>
                <hr>
                <h2>Cushion Cut Diamond</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_cushion.webp"
                        class="xl:float-right" alt="Cushion cut diamond"/></p>

                <p>Cushion cut diamonds, an antique cut originating in the 1800s, exude timeless elegance and romantic
                    charm. Featuring larger crown facets that enhance the diamond's fire, cushion cut diamonds are
                    renowned for their mesmerizing sparkle, particularly evident in candlelight, earning them the
                    endearing nickname of "candlelight" diamonds.</p>
                <p>Cushion cut diamonds can be found in rounded square or rectangular shapes, with the overall
                    appearance determined by the length-to-width ratio. When selecting a cushion cut diamond, there is
                    no right or wrong ratio; the final shape depends entirely on personal taste and preference.</p>
                <p><strong>Tip: </strong>Opt for a cushion cut diamond to evoke a romantic and vintage-inspired look,
                    ideal for creating a captivating ambiance in candlelight settings.</p>
                <p><strong>Fact: </strong>The cushion cut diamond boasts 58 facets, with larger facets amplifying the
                    diamond's fire or rainbow effect, adding to its allure and charm.</p>
                <p><strong>Suggested Cut: </strong>For square-shaped cushion cut diamonds, aim for a length-to-width
                    ratio ranging from 1.0 to 1.05, while cushion cut diamonds with ratios of 1.15 and up tend to appear
                    more rectangular, offering versatility in customization to suit individual preferences.</p>
                <p>Further Reading <a
                        href="https://www.adiamor.com/blog/style-and-fashion/cushion-cut-engagement-rings-from-adiamor-are-modern"
                        title="Cushion Cut Diamond Rings Are Modern" rel="follow">Cushion Cut Diamond Rings Are
                        Modern</a></p>
                <p><a href="https://www.adiamor.com/blog/education/what-you-need-to-know-cushion-cut-diamonds"
                        rel="follow noopener" target="_blank">Learn More Cushion Cut Diamonds</a></p>
                <p><iframe 
                        class="aspect-video" 
                        width="100%" 
                        height="314"
                        src="https://www.youtube.com/embed/ON7Xm_wwZQE?rel=0" 
                        allowfullscreen="allowfullscreen"
                        title="Quick Guide to Buying Cushion Cut Diamonds"
                        aria-label="Video: Quick Guide to Buying Cushion Cut Diamonds"></iframe>
                </p>
                <p><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_NATURAL, query: { diamond_shape: 'cushion' } }">Search
                        Natural Cushion Cut Diamonds</NuxtLink><br><NuxtLink :to="{ path: STATIC_ROUTES.DIAMONDS_SEARCH_LAB_GROWN, query: {
                        diamond_shape: 'cushion' } }">Search Lab Grown Cushion Cut Diamonds</NuxtLink></p>
                <hr>
                <h2>Length to Width Ratio</h2>
                <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamondshape_radiant.webp"
                        class="xl:float-right" alt="Length to width ratio"/></p>

                <p>Length to Width Ratio is an important factor in choosing your diamond and is often overlooked.
                    Differing length to width ratios can make a princess cut stone appear rectangular or square and make
                    a marquise shaped stone either appear long and thin or shorter and wider. While ultimately the
                    length to width ratio of a stone is a matter of aesthetic preference, there are a set values that
                    are considered ideal for each of the various fancy shapes. These values are chosen based on the
                    preferred overall characteristics of each fancy shape.</p>
                <p></p>
                <h2>How do I calculate Length to Width Ratio?</h2>
                <p>Calculating the length to width ratio is fairly simple. Simply divide the measurement (generally in
                    millimeters) of the length of the stone by the width measurement. These measurements will appear in
                    the top left portion of your diamond's grading report. They are listed as length by width by depth.
                    So, if a 1.00 carat princess cut diamond had the measurements 5.86mm x 5.67mm x 3.89mm, you would
                    take the length (5.86mm) and divide it by the width (5.67mm). The depth, while factoring highly into
                    the Cut Grade of the diamond, is not important in finding your length to width ratio. After dividing
                    the two, you get a factor of 1.03. This is your ratio and can be thought of as representing the
                    length of the diamond if the width was represented by 1. This is considered an excellent length to
                    width ratio for a princess cut stone and will appear square.</p>
                <p></p>
                <h2>What is the "Bowtie Effect"?</h2>
                <p>The "bowtie" of a diamond refers to a dark spot in the shape of a bowtie that is present in fancy
                    shaped stones. This effect is caused by light leaking out of the bottom of the stone rather than
                    being reflected back to the top due to the unique shape of the stone and faceting of the stone.
                    Round stones, with their complete symmetry, do not have a bowtie and therefore do not require a
                    length to width ratio.</p>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'lab-grown-diamonds'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Lab Grown Diamonds</h2>
            <div>
                <h3>What is a lab-grown diamond?</h3>
                <p>A lab-grown diamond is a diamond that was chemically "grown" in a laboratory setting. These
                    gemstones differ from natural "Earth grown" which are grown deep within the Earth.&nbsp; The
                    difference has been compared to ice made in a freezer vs ice made in nature.</p>
                <p>Further Reading: <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CERTIFICATION">Diamond Certification</NuxtLink></p>
                <h3>Do diamond testers detect lab diamonds as "fake" ?</h3>
                <p>Laboratory-grown diamonds will test the same as natural diamonds when tested with a diamond
                    tester.&nbsp; We suggest having any diamond, lab-grown or natural, graded by a reputable
                    laboratory vs using a diamond tester. Lab-grown diamonds can be identified in a reputable
                    laboratory by their growth pattern.&nbsp; They are also inscribed with LG or Lab Grown on
                    the girdle</p>
                <p></p>
                <h3>Can we come into the showroom to look at stones?</h3>
                <p>Yes! You can make an appointment to view lab-grown or natural diamonds at our Los Angeles
                    design studio. Email service@adiamor.com to make an appointment.</p>
                <p></p>
                <h3>Would I be able to resell a lab diamond?</h3>
                <p>You can resell a lab-grown diamond just as you would a natural diamond.</p>
                <p></p>
                <h3>Are they less sparkly?</h3>
                <p>Sparkle is a subjective characteristic. That being said, a lab-grown diamond that is well-cut
                    and high-quality would sparkle just as much as a well-cut high-quality natural diamond.</p>
                <p></p>
                <h3>Why do people call them fake diamonds?</h3>
                <p>It is common to call imitations fake. Some may confuse lab-grown diamonds with other
                    imitations such as cubic zirconia. Lab-grown diamonds are not imitations, they are diamonds
                    grown in a laboratory versus mined from the ground. That being said, knowing what you are
                    buying is very important. We recommend only purchasing lab-grown diamonds or natural
                    diamonds from a credible source and certified by a reputable grading laboratory.</p>
                <p></p>
                <h3>Will your diamonds have "eye clean" listed?</h3>
                <p>We do not identify "Eye Clean" on any of the diamonds listed on our site. If you have
                    questions about any of the lab-grown diamonds or natural diamonds on our site, contact us by
                    chat, email, or call. We are happy to walk you through the characteristics.</p>
                <p></p>
                <h3>How is a lab-grown diamond grown from a seed?</h3>
                <p>A diamond seed is placed in a specifically designed press. The growth chamber is heated to
                    1300-1600 degrees Celsius with pressures above 870,000 pounds per square inch. The molten
                    metal dissolves the high purity carbon source. Carbon atoms precipitate on a small diamond
                    seed crystal, and a lab-grown diamond begins to grow. The lab-grown crystal is then cut and
                    polished by a diamond cutter.</p>
                <p></p>
                <h3>What is the difference between a lab-grown diamond and moissanite?</h3>
                <p>Most moissanite on the market today are lab-grown (silicon carbide) but they are not
                    lab-grown diamonds, they are lab-grown moissanite. Although moissanite has been used as a
                    diamond substitute over the years, it has different chemical and physical properties than a
                    diamond.</p>
                <p></p>
                <h3>Do they show the same quality? Or can people tell it's not real?</h3>
                <p>Looking at the difference between a lab-grown diamond and an earth-mined diamond is more
                    about what you know, not what others think. It is highly unlikely that a person would know
                    whether a diamond is lab-grown or earth-mined without looking at the inscription.</p>
                <p></p>
                <h3>Do you sell lab-grown or natural diamonds?</h3>
                <p>Adiamor has been selling ethically sourced, earth mined, natural, GIA-certified diamonds
                    online since 1998. We started offering a full assortment of certified lab-grown diamonds in
                    November of 2021.</p>
                <p></p>
                <h3>How do I explain to someone that asks what a lab-grown diamond is?</h3>
                <p>Here is a link to GIA's education on Laboratory Grown Diamonds. We've found their description
                    straightforward and easy to understand.<span class="Apple-converted-space">&nbsp;</span></p>
                <p>Further Reading:<a href="https://discover.gia.edu/GIALGDR" rel="follow">
                        https://discover.gia.edu/GIALGDR</a></p>
            </div>
        </ContentCard>

        <!-- Education Guide -->
        <ContentCard :isVisible="getSlug === 'engagement-ring-guide'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Engagement Ring Guide</h2>
            <div>
                <div>
                    <p>Our diamond engagement ring guide assists you step by step through the buying process. We'll
                        cover important aspects such as <NuxtLink :to="STATIC_ROUTES.EDUCATION_ESTABLISHING_BUDGET">establishing your
                            budget</NuxtLink>, <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION">educating yourself about diamonds</NuxtLink>, <NuxtLink
                            :to="STATIC_ROUTES.EDUCATION_RING_ANATOMY">ring anatomy</NuxtLink>, and <NuxtLink
                            :to="STATIC_ROUTES.EDUCATION_JEWELER_GUIDE">selecting a jeweler you can trust</NuxtLink>.</p>
                </div>
                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="border border-gray-200 px-6 py-4">
                        <div>
                            <NuxtLink :to="STATIC_ROUTES.POLICIES_FINANCING_INSURANCE">
                                <h3 class="!mt-0 text-current">Financing &amp; Insurance</h3>
                            </NuxtLink>
                            <p>Finance your fine jewelry purchase with PayPal Credit and learn about the benefits of
                                insuring your jewelry with Jewelers Mutual.</p>
                            <NuxtLink :to="STATIC_ROUTES.POLICIES_FINANCING_INSURANCE">Learn More
                                <span class="sr-only">Learn more about financing insurance</span>
                            </NuxtLink>
                            <nuxt-img provider="cdn" src="/landing-pages/Policy/ring_finance.webp"
                                alt="Financing &amp; Insurance"/>
                        </div>
                    </div>

                    <div class="border border-gray-200 px-6 py-4">
                        <div>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_ESTABLISHING_BUDGET">
                                <h3 class="!mt-0 text-current">Establishing Your Budget</h3>
                            </NuxtLink>
                            <p>Learn about the various options available to you before you set a budget.</p>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_ESTABLISHING_BUDGET">Learn More
                                <span class="sr-only">Learn more about establishing your budget</span>
                            </NuxtLink>
                            <nuxt-img provider="cdn" src="/landing-pages/Policy/eneduc_budget.webp"
                                alt="Establishing Your Budget"/>
                        </div>
                    </div>

                    <div class="border border-gray-200 px-6 py-4">
                        <div>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION">
                                <h3 class="!mt-0 text-current">Diamond Education</h3>
                            </NuxtLink>
                            <p>Learn about the 4 C's of diamond quality, diamond care, diamond certification and more.
                            </p>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_EDUCATION">Learn More
                                <span class="sr-only">Learn more about diamond education</span>
                            </NuxtLink>
                            <nuxt-img provider="cdn" src="/landing-pages/Policy/eneduc_diamond.webp"
                                alt="Diamond Education"/>
                        </div>
                    </div>

                    <div class="border border-gray-200 px-6 py-4">
                        <div>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_RING_ANATOMY">
                                <h3 class="!mt-0 text-current">Ring Anatomy</h3>
                            </NuxtLink>
                            <p>Learn about all of the components that make up an engagement ring and pick the perfect
                                ring to last a lifetime.</p>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_RING_ANATOMY">Learn More
                                <span class="sr-only">Learn more about ring anatomy</span>
                            </NuxtLink>
                            <nuxt-img provider="cdn" src="/landing-pages/Policy/eneduc_anatomy.webp"
                                alt="Ring Anatomy"/>
                        </div>
                    </div>

                    <div class="border border-gray-200 px-6 py-4">
                        <div>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_JEWELER_GUIDE">
                                <h3 class="!mt-0 text-current">Jeweler Guide</h3>
                            </NuxtLink>
                            <p>Learn about what to expect when you make a fine jewelry purchase with a trusted jeweler.
                            </p>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_JEWELER_GUIDE">Learn More
                                <span class="sr-only">Learn more about jeweler guide</span>
                            </NuxtLink>
                            <nuxt-img provider="cdn" src="/landing-pages/Policy/eneduc_jewelerguide.webp"
                                alt="Jeweler Guide"/>
                        </div>
                    </div>

                    <div class="border border-gray-200 px-6 py-4">
                        <div>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_PROPOSAL_TIPS">
                                <h3 class="!mt-0 text-current">Proposal Tips</h3>
                            </NuxtLink>
                            <p>Read some of our basic tips to help you get all of the information you need while keeping
                                your proposal a surprise.</p>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_PROPOSAL_TIPS">Learn More
                                <span class="sr-only">Learn more about proposal tips</span>
                            </NuxtLink>
                            <nuxt-img provider="cdn" src="/landing-pages/Policy/eneduc_proposal.webp" alt="Proposal"/>
                        </div>
                    </div>
                </div>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'engagement-ring-add-ons'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Engagement Ring Add-Ons</h2>
            <div>
                <h2>Common Engagement Ring Customizations</h2>
                <p>One of the many perks of purchasing a diamond ring directly from the manufacturer is the ability to customize any ring on our site. Common customizations are not the only customizations available; they are the most requested. Multiple customizations can be added to a ring.</p>
                <p>How do you add customizations to your order? Make a note of the customizations you would like in the comments section during checkout. Once your order is placed, we will update it with the customizations and pricing and send you a new confirmation email.</p>
                <p>If you're looking to add a little something special that is not listed here, you can make a note of it in the comments section during checkout or send an email to service@adiamor.com.</p>
                <div class="mt-4">
                    <h3>Hidden Halo</h3>
                    <p>You can customize any ring with a hidden halo. A standard hidden halo is a row of diamonds that is placed in between the prongs and visible from the side view. It is not visible from the top view. Rings with a standard prong are updated to a basket in order to accomodate a hidden halo.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/hidden_halo.webp" alt="Hidden Halo"
                            width="304"/>
                    </p>
                </div>
                <div>
                    <h3>Outside Hidden Halo</h3>
                    <p>An outside hidden halo is a row of diamonds that goes AROUND the outside of the prongs, is visible from the side, and is not visible from the top view. An outside hidden halo can be added to almost any ring. This customization is a common choice for rings with larger center stones.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/outside_hidden_halo.webp"
                            alt="Outside Hidden Halo" width="304" height="304"/>
                    </p>
                </div>
                <div>
                    <h3>Peekaboo Halo</h3>
                    <p>This customization is similar to an outside hidden halo. A peekaboo halo is a row of diamonds that are placed at an angle under the girdle of the main stone. The angle and placement makes the halo slightly visible from the top and side views. This type of hidden halo increases the appearance of the size of the center stone when viewed from the top. A peekaboo halo can be added to any ring on the site.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/peekaboohalo.webp"
                            alt="Outside Hidden Halo" width="304" height="304"/>
                    </p>
                </div>
                <div>
                    <h3>Diamond On the Prongs</h3>
                    <p>Adding diamond on the prongs of an engagement ring is literally just that, adorning your engagement ring with more sparkle that can be seen from the side. This add-on pairs nicely with a Hidden Halo or Outside Hidden Halo for those who love all the extra sparkle.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/diamonds_on_prongs.webp"
                            alt="Diamond On the Prongs" width="304" height="304"/>
                    </p>
                </div>
                <div>
                    <h3>Platinum Basket/Prong</h3>
                    <p>Adding a platinum basket to a setting with a band of another color (yellow gold or rose gold) metal is a great add-on for those looking to make their center stone pop. We recommend platinum as an option for two tone choice vs white gold. Platinum is a naturally white metal and will maintain its color and contrast for the life of your ring. A hidden halo can also be added to a platinum basket.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/platinum_basket.webp"
                            alt="platinum_basket" width="304" height="304"/>
                    </p>
                </div>
                <div>
                    <h3>Custom Contour Prong</h3>
                    <p>A Custom Contour Prong not only holds your diamond in place, it also "contours" to the shape of your center diamond. Contour prongs are soft and rounded vs squared off like a standard prong. They can be made for all diamond shapes and carat weights.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/custom_contour_prong.webp"
                            alt="Custom Contour Prong" width="304" height="304"/>
                    </p>
                </div>
                <div>
                    <h3>Tulip Prong</h3>
                    <p>A Tulip prong is a prong that holds a center stone. Each prong is shaped like a tulip petal and can be substituted in place of a standard prong or basket prong. They can be made in a 6 prong or 4 prong version for any size, any shape center diamond. Any ring on our site can be customized with a tulip petal prong. Make a note in the comments section during checkout. " Custom Tulip Petal Prong (note number of petals and prongs)"</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/tulip.prong.ring.customization.webp"
                            alt="Custom Contour Prong" width="304" height="304"/>
                    </p>
                </div>
                <div>
                    <h3>East West Set</h3>
                    <p>It is extremely common to see fancy shape diamonds set in engagement ring settings straight up and down or "North & South". When you turn the diamond horizontally and set it this way, it is referred to as an "East-West" Set Engagement Ring.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/east_west_set.webp" alt="East West Set"
                            width="304" height="304"/>
                    </p>
                </div>
                <div>
                    <h3>Double Wire Prongs</h3>
                    <p>This customization/add-on is when an engagement ring has two elegant prongs in place of one prong. Each prong is smaller than a single prong making them less visible. Double wire prongs are a great choice for cushion cut diamonds because they accentuate the shape of the rounded corners. This customization is available for any shape, any size center diamond.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/double_wire_prong.webp"
                            alt="Double Wire Prongs" width="304" height="304"/>
                    </p>
                </div>
                <div>
                    <h3>Euro Shank</h3>
                    <p>A Euro Shank, also called a European shank, is a ring band with extra metal at the bottom for a flatter, squared-off exterior rather than a fully rounded profile. This subtle design feature can help reduce spinning while preserving a ring’s traditional appearance from above. This customization is available on any non-eternity engagement ring or wedding band along with completely custom designs. Price varies by band width and rings size. To add a Euro shank to your ring make a note "CUSTOM: add euro shank" in the comments section during checkout. Once your order is place we will contact you to confirm your customization and let you know the pricing. Pricing varies upon width of band and ring size ordered. The average cost of a euro shank customization is $350.</p>
                    <p><nuxt-img provider="cdn" src="/landing-pages/Policy/euro_shank.webp"
                            alt="Euro Shank" width="304" height="304"/>
                    </p>
                </div>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'establishing-your-budget'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Establishing Your Budget</h2>
            <div>
                <p>Establishing your budget is one the most important first steps when choosing the perfect engagement
                    ring. While you know she is worth every penny that you'll spend on this important purchase, you'll
                    also want to make sure you don’t break the bank. The conventional starting point for the budget of
                    an engagement ring is typically two months’ salary, but this can and should be adjusted to you and
                    your specific financial needs. Because diamonds vary in quality, size and price we are confident
                    that you will be able to find the perfect diamond and setting to accommodate you and your unique
                    financial needs.</p>
                <p>Search for a gorgeous new <NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_WHITE_GOLD">diamond engagement ring</NuxtLink>
                    or
                    <NuxtLink :to="STATIC_ROUTES.DIAMONDS_SEARCH">find your perfect diamond</NuxtLink>.
                </p>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'financing-insurance'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Financing &amp; Insurance</h2>
            <div>
                <h3>Financing with Affirm</h3>
                <p><img style="width: 100%; max-width: 205px; float: right;"
                        src="https://cdn-assets.affirm.com/images/buttons/42x205-blue.svg" alt="Affirm financing logo"></p>
                <p>We have partnered with Affirm to give you a simple way to make your purchase with no hidden fees.</p>
                <p>Easy monthly payments: Provide some basic information and get a real-time credit decision to split
                    your purchase into monthly payments.</p>
                <p>Flexible repayment: Simply pay your monthly bill using a debit card or bank transfer at <a
                        target="_blank" href="https://www.affirm.com/pay" rel="noopener">www.affirm.com/pay</a>.</p>
                <p>Your rate will be 0-36% APR based on credit, and is subject to an eligibility check. For example, a
                    $700 purchase might cost $63.18/mo over 12 months at 15% APR. Payment options through Affirm are
                    provided by these lending partners:&nbsp;<a
                        data-saferedirecturl="https://www.google.com/url?q=http://affirm.com/lenders&amp;source=gmail&amp;ust=1698947695553000&amp;usg=AOvVaw2aiW2QtKKueltIAnPxr8eU"
                        target="_blank" href="http://affirm.com/lenders"
                        rel="noopener">https://www.affirm.com/lenders</a>. Options depend on your purchase amount and a
                    down payment may be required.</p>
                <p>Read more at <a target="_blank" href="https://www.affirm.com/how-it-works"
                        rel="noopener">https://www.affirm.com/how-it-works</a></p>
                <p></p>
                <hr>
                <h3>Jewelers Mutual</h3>
                <p><img style="width: 100%; max-width: 205px; float: right;"
                        src="https://www.jewelersmutual.com/sites/default/files/2023-08/JM-Logo-Blue.svg" alt="Jewelers Mutual logo"></p>
                <p>Your Adiamor purchase is covered by our insurance from the time it leaves our jeweler’s workshop to
                    the moment it arrives at your door. Learn how to continue this protection once your purchase is in
                    your hands.</p>
                <p>Your favorite pieces of jewelry reflect who you are and connect you to special moments with the ones
                    you love. Jewelers Mutual Insurance Company – the only company specializing exclusively in jewelry
                    insurance in the US and Canada – offers Jewelers Mutual Jewelry Insurance to safeguard your
                    treasured keepsakes and protect the cherished memories each item represents.</p>
                <h3>Jewelry insurance built around the way you live your life.</h3>
                <p>Adiamor has partnered with Jewelers Mutual Insurance Company to provide you with the option of
                    insuring your new jewelry with its comprehensive repair or replacement coverage. Insuring your
                    Adiamor jewelry is quick and easy, and gives you the freedom to wear your jewelry without worry,
                    knowing it’s being protected by the only insurer dedicated exclusively to jewelry insurance for more
                    than 100 years.</p>
                <h3>Advantages include:</h3>
                <ul style="list-style-type: unset; margin: 15px 30px 25px; padding: unset; line-height: 30px;">
                    <li>Coverage that often goes beyond standard homeowners insurance and warranties;</li>
                    <li>Worldwide protection against loss, theft, damage and mysterious disappearance to;</li>
                    <li>Flexibility to choose your own jeweler; no need for multiple estimates;</li>
                    <li>Repair of damaged jewelry with the same level of quality as the original;</li>
                    <li>Repair or replacement with the same kind and quality as as the original;</li>
                    <li>GIA Graduate Gemologists and American Gem Society Certified Gemologists on staff, whose passion
                        and</li>
                    <li>specialty is jewelry;</li>
                    <li>Fast, professional, compassionate claim experience;</li>
                    <li>Personal assistance when you need it;</li>
                </ul>
                <p><a @click.prevent="$openWindow('https://www.jewelersmutual.com/adiamor','pc','scrollbars=1,resizable=1,directories=0,height=600,width=1000')"
                        href="https://www.jewelersmutual.com/adiamor" target="_blank" style="margin-left: 2em;"
                        rel="noopener">GET A QUOTE INSTANTLY</a></p>
                <h3>Have questions about jewelry insurance?</h3>
                <p>If you have any questions about Jewelers Mutual’s Jewelry Insurance, please email
                    personaljewelry@jminsure.com or call 888.884.2424.</p>
                <p><em>*Product not available in Quebec.</em></p>
                <p>Must be at least 18 years of age to apply for insurance. Jewelers Mutual has provided this content.
                    Jewelers Mutual is an alternative to other insurance companies you may be considering. Adiamor is
                    not a licensed agent of Jewelers Mutual and may not sell or recommend insurance.</p>
                <p><em>Coverage is subject to the provisions, limitations, exclusions, and endorsements in the policy
                        and the level of coverage you select.</em></p>
                <p><em>By clicking the button above – "Learn more and get a free quote" – you authorize Jewelers Mutual
                        to use a secure system to retrieve and save details of this purchase from Adiamor for the
                        purpose of calculating an insurance quote. Retrieved information may include your name and
                        address.</em></p>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'jeweler-guide'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Jeweler Guide</h2>
            <div>
                <hr>
                <h3>What you should expect from a Trusted Jeweler</h3>
                <p>You should feel comfortable and trust your purchase from any jeweler. To give our customers peace of
                    mind, Adiamor offers expert guidance, independent loose diamond grading, a 30-day money back
                    guarantee, and a solid reputation. Read the other topics in this section to learn more details of
                    what Adiamor has to offer.</p>
                <h3>Expert Guidance</h3>
                <p>Adiamor understands that finding your engagement ring can be a difficult task. Rest assured that our
                    GIA-trained Graduate Gemologists will be with you every step of the way to make sure that you get
                    exactly what you want, at a price you can afford. Our dedicated staff has a genuine interest in
                    carefully explaining all the factors necessary in making the selection that is right for you.</p>
                <h3>30-Day Return Policy</h3>
                <p>Adiamor believes in complete customer satisfaction. Your purchase is risk-free and backed by our
                    no-questions-asked return policy.</p>
                <NuxtLink :to="STATIC_ROUTES.POLICIES_RETURN">Learn More
                    <span class="sr-only">Learn more about return policy</span>
                </NuxtLink>
                <h3>Diamond Grading &amp; Certification</h3>
                <p>Diamonds sold at Adiamor are accompanied by a diamond grading report from either the AGSL or GIA, the
                    most respected diamond grading labs.</p>
                <NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CERTIFICATION">Learn More
                    <span class="sr-only">Learn more about diamond certification</span>
                </NuxtLink>
                <h3>A Solid Reputation</h3>
                <p>Thousands of happy customers have made their dreams come true at Adiamor. But, don't take our word
                    for it.</p>
                <NuxtLink :to="STATIC_ROUTES.TESTIMONIALS">Read what our customers had to say
                    <span class="sr-only">Read what our customers had to say</span>
                </NuxtLink>
                <h3>After You Place Your Order</h3>
                <p>Once you decide you like the diamond, the setting, and the company policies, you'll want to know what
                    happens after you order your ring. At Adiamor, your ring is set by a master craftsman, then your
                    diamond and setting are reviewed multiple times for quality assurance, and finally an appraisal of
                    your individual ring is created for you.</p>
                <NuxtLink :to="STATIC_ROUTES.SERVICES_AFTER_YOU_ORDER">Learn More
                    <span class="sr-only">Learn more about after you order</span>
                </NuxtLink>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'proposal-tips'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Proposal Tips</h2>
            <div>
                <hr>
                <h3>How To Keep Your Proposal A Surprise</h3>
                <p>If you're planning on making the proposal a surprise, you want to make sure you have the correct ring
                    size, and more importantly that she'll love the ring! To pick out a ring she is sure to fall for,
                    take her taste and her lifestyle into consideration. Here are a few tips on getting the information
                    you need without her suspecting a thing.</p>
                <p>Further Reading: <br><a
                        href="https://www.adiamor.com/blog/proposal-stories/tell-mom-youre-getting-married">How to Tell
                        Your
                        Mom You're Getting Married</a></p>
                <h3>What Is Her Ring Size?</h3>
                <p>If she has a few rings in her jewelry collection, sneak one away and take it to a local jeweler to
                    have it sized. If borrowing a ring for so long is not possible, put the ring on your finger as far
                    down as you can comfortably and mark your finger with a pen. A jeweler can then measure the mark to
                    determine the correct ring size.</p>
                <h3>What Metal Would She Like?</h3>
                <p>To figure what metal is best for your partner, notice the jewelry she currently wears. This will help
                    you decide if she'd be more interested in yellow gold, white gold, or platinum. If it's a toss up,
                    Adiamor offers a selection of two-tone settings that might help make up your mind.</p>
                <h3>What Is Her Style?</h3>
                <p>Take her lifestyle into consideration when choosing an engagement setting. If she is active and
                    always on the go, you might want to consider a solitaire setting such as the cathedral or contour
                    setting, or select from one of our channel setting styles. Once you determine her ring size, metal,
                    and style, choosing one of our engagement settings should be a cinch. Properly evaluating this
                    information should help you make a decision your future fiancée will be thrilled with, but don't
                    forget — your opinion counts as well! Now that you have learned how to choose a setting, read on to
                    learn how to pick the perfect diamond for your setting.</p>
                <hr>
                <p>When planning to propose, most guys will either go for the obvious (a candlelit dinner that ends with
                    him on one knee) or rack their brains (and empty their wallets) trying to come up with something
                    amazing that’s never been done before. The truth is, you don’t have to opt for either of these
                    extremes. If you know the woman you love, you can easily come up with a proposal plan that will wow
                    her without resorting to over-the-top antics (or phoning it in with a checkered tablecloth and a
                    ridiculously long spaghetti noodle). Here are just a few ways to prepare for a flawless proposal.
                </p>
                <h3>1. Consider her preferences.</h3>
                <p>Does she live life like she’s on a stage? Then maybe a proposal in front of her family or at a
                    sporting event is the way to go. But if she’s like most women, she’ll want the occasion to be
                    intimate, so think about creative ways to get her alone.</p>
                <h3>2. Listen to what she says.</h3>
                <p>Women will often tell you exactly what they expect if you just open your ears and pay attention. Did
                    she fall in love with the bedroom proposal from the movie Stepmom (the ring on a string)? Or has she
                    told you that she always pictured herself receiving a ring at the top of the Eiffel Tower? Your lady
                    will likely drop hints here and there, so make sure you’re listening when she does.</p>
                <h3>3. Ask for help.</h3>
                <p>You might be surprised by all of the creative ideas your friends and family come up with on your
                    behalf. And if all else fails, go to the internet. There is an absolute wealth of information on
                    interesting ways to propose. You’re guaranteed to find at least one that is perfect.</p>
                <h3>4. Go all out.</h3>
                <p>You don’t need to break the bank when you propose (since you’ll probably need that money for the ring
                    or the wedding), but you should do everything you can to make it a special event since you only plan
                    to do it once. This doesn’t necessarily entail added expense, but it will require you to use your
                    imagination and come up with a plan that is as unique and memorable as the woman you’re proposing
                    to.</p>
                <h3>5. Practice makes perfect.</h3>
                <p>If you think there’s a good chance you’ll falter once you get to the starting line, practice what
                    you’re going to say. You shouldn’t memorize it word-for-word (you don’t necessarily want it to sound
                    rehearsed), but get down the basic gist of what you want to say before you take a knee.</p>
                <p>Everyone has their own ideas about the proper way to propose. Most men want the event to be special
                    so that she’ll never forget it (and to improve her chances of saying yes). But that doesn’t always
                    mean things go off without a hitch. In some cases, less is more, and by going completely overboard,
                    all you’re telling the woman of your dreams is that you have no clear idea of the meaning of excess.
                    On the other hand, sometimes just being a guy can work against you. But don’t worry; if you’re not
                    sure if your plan might backfire, here are just a few things you’ll want to avoid when you drop to
                    one knee.</p>
                <h3>1. Putting the ring in the food.</h3>
                <p>Sure, you’ve seen it in the movies, but try to remember that what happens on the silver screen should
                    stay on the silver screen. That world is a fantasy. In reality, what happens when you put a ring in
                    her food or drink is that she’ll probably choke on it or swallow it. And a trip to the emergency
                    room is not romantic. At the very least, it will have to be cleaned before she can put it on. Ring
                    tartar? Gross.</p>
                <h3>2. Proposing with a ring pop.</h3>
                <p>Sorry, guys, this isn’t as cute as you think it is. If you don’t have the money to buy a real ring,
                    you’re going to have to come up with something a little more creative than one made of sugar.
                    Consider famous literary proposals, such as Edmond’s in The Count of Monte Cristo, in which the poor
                    sailor winds a piece of string around the finger of his beloved Mercedes to signify the real ring he
                    will put there one day when he became a wealthy man. The thought counts more if you actually put
                    some thought into it.</p>
                <h3>3. Jumping out of an airplane.</h3>
                <p>Think long and hard before you hand her the ring midair; there are SO many things that could go
                    wrong. For example, consider the likelihood of dropping the ring (high risk). Or imagine how the
                    proposal might go. You: Will you marry me? Her: What? You: Will you marry me? (wind howling loudly)
                    Her: What?!</p>
                <h3>4. Proposing in front of a crowd (especially her family).</h3>
                <p>It might seem romantic to involve others, but this moment is really about the two of you. And do you
                    really want her to 1) bow to peer pressure when she says yes, only to recant later, or 2) listen to
                    the advice of her mother, who hates you? Let her decide on her own, in private, with no one
                    listening but you.</p>
                <h3>5. Checking out other women.</h3>
                <p>This is a bad idea at the best of times, but if you’re looking at other women during the proposal
                    (even if you’re just trying to gauge the approval rating in the room) you might wind up with
                    champagne in your face. Now that you've read over some of our best do's and don'ts where popping the
                    question is concerned, you're ready to begin shopping for the perfect diamond engagement ring.</p>
                <NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH">Click here to begin searching today</NuxtLink>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'ring-anatomy'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Ring Anatomy</h2>
            <div>
                <p>The diamond will most likely account for most of the overall cost of the ring. Educating yourself on
                    the four Cs of diamond quality will ensure that you make an informed decision.</p>
                <p>The setting, also referred to as the head, is the part that holds the diamond in place and is
                    manufactured to fit the size and shape of the diamond you choose. The 3 main types are prong,
                    basket, or bezel settings. With round diamonds, you will have an option of either four or six-prong.
                    A four-prong setting shows a bit more diamond, while a six-prong setting offers a slight security
                    advantage.</p>
                <p>The band, also referred to as the engagement ring setting, is available in a variety of styles from
                    the classic solitaire to diamond accented styles. Your choices of metals are 14k white, yellow or
                    rose gold, 18k white, yellow or rose gold, and platinum. Some engagement settings are also available
                    in two-tone. Now that you've acquainted yourself with the most important terms, you're ready to
                    begin shopping for the perfect diamond engagement ring.</p>
                <p>Further Reading: <a
                        href="https://www.adiamor.com/blog/education/complete-guide-understanding-engagement-ring-anatomy">The
                        Complete Guide to Understanding Engagement Ring Anatomy</a></p>
                <p><NuxtLink class="py-2 px-4 border border-primary !no-underline" :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH">Start
                    shopping now!</NuxtLink></p>
            </div>
        </ContentCard>

        <!-- Fine Jewelry Guide -->
        <ContentCard :isVisible="getSlug === 'fine-jewelry-education-guide'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Fine Jewelry Education Guide</h2>
            <div>
                <p>The fine jewelry education section consists of expert tips on finding the perfect wedding ring or
                    band, how to select the perfect pair of earrings, learning about precious metals, gemstones, pearls
                    and finding that perfect gift for someone you love.</p>

                <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                    <div
                        :style="'background: url(' + $asset(`@/assets/images/fine-jewelry-guide/jeweleduc_earrings.webp`) + ') center bottom no-repeat;'">
                        <div class="mb-32">
                            <h3>Earring Guide</h3>
                            <span class="block font-light">Earrings can be one of the most flattering types of jewelry
                                as well as a great
                                gift idea for any occasion.</span>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_EARRING_GUIDE">Learn More
                                <span class="sr-only">Learn more about earring guide</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <div
                        :style="'background: url(' + $asset(`@/assets/images/fine-jewelry-guide/jeweleduc_wedding.webp`) + ') center bottom no-repeat;'">
                        <div class="mb-32">
                            <h3>Wedding Ring Guide</h3>
                            <span class="block font-light">Consult our wedding ring guide to help you pick the right
                                wedding band to fit
                                your taste, style, and budget.</span>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_WEDDING_RING_GUIDE">Learn More
                                <span class="sr-only">Learn more about wedding ring guide</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <div
                        :style="'background: url(' + $asset(`@/assets/images/fine-jewelry-guide/jeweleduc_pearl.webp`) + ') center bottom no-repeat;'">
                        <div class="mb-32">
                            <h3>Pendant Guide</h3>
                            <span class="block font-light">A gift of a pendant or necklace is just as beautiful a
                                statement of love today
                                as it was in ancient times.</span>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_PENDANT_GUIDE">Learn More
                                <span class="sr-only">Learn more about pendant guide</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <div
                        :style="'background: url(' + $asset(`@/assets/images/fine-jewelry-guide/jeweleduc_metal.webp`) + ') center bottom no-repeat;'">
                        <div class="mb-32">
                            <h3>Metal Education</h3>
                            <span class="block font-light">Each metal has its advantages and disadvantages. Read this
                                section to
                                determine which metal is best for you.</span>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_METAL_EDUCATION">Learn More
                                <span class="sr-only">Learn more about metal education</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <div
                        :style="'background: url(' + $asset(`@/assets/images/fine-jewelry-guide/jeweleduc_gem.webp`) + ') center bottom no-repeat;'">
                        <div class="mb-32">
                            <h3>Gemstone Education</h3>
                            <span class="block font-light">Browse our gemstone education guide and discover the unique
                                characteristics of
                                gemstone quality.</span>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_GEMSTONE_EDUCATION">Learn More
                                <span class="sr-only">Learn more about gemstone education</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <div
                        :style="'background: url(' + $asset(`@/assets/images/fine-jewelry-guide/jeweleduc_pearl.webp`) + ') center bottom no-repeat;'">
                        <div class="mb-32">
                            <h3> Pearl Education</h3>
                            <span class="block font-light">Learn about different cultured pearl types.</span>
                            <NuxtLink :to="STATIC_ROUTES.EDUCATION_PEARL_EDUCATION">Learn More
                                <span class="sr-only">Learn more about pearl education</span>
                            </NuxtLink>
                        </div>
                    </div>

                    <div class="col-span-full flex gap-3">
                        <div class="flex-1">
                            <h3>Gift Guide</h3>
                            <p class="max-w-xl">From weddings and anniversaries to birthdays and graduations, let us
                                help you find the
                                perfect gift for any occasion.</p>
                            <p>
                                <NuxtLink :to="STATIC_ROUTES.EDUCATION_GIFT_GUIDE">Learn More
                                    <span class="sr-only">Learn more about gift guide</span>
                                </NuxtLink>
                            </p>
                        </div>
                        <img class="max-h-36" :src="$asset(`@/assets/images/category/jeweleduc_gift.webp`)"
                            alt="Gift Guide">
                    </div>
                </div>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'earring-guide'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Earring Guide</h2>
            <div>
                <p>Earrings can be one of the most flattering types of jewelry as well as a great gift idea for any
                    occasion. Dangle earrings can elongate the neck and face while earrings featuring brilliant gems and
                    precious metals can illuminate the wearer’s face. Earrings are one of the most essential pieces of
                    jewelry; diamond stud earrings can make even casual outfits pop with a polished, pulled together
                    look. Most earrings will go with a variety of looks and outfits so you can feel confident that
                    whichever style earrings you purchase will be as unique and versatile as she is.</p>
                <h3>Studs</h3>
                <p>Stud style earrings are one of the most popular styles of earring available. They can come in a
                    variety of sizes from small to large. Because of their simplicity, they can go with any outfit and
                    easily transition from day to evening wear.</p>
                <h3>Hoops</h3>
                <p>Hoops are a traditional earring style that can be seen in all time periods and cultures from tribal
                    Africa to Victorian Europe. Hoops can add a soft delicate look to any style for any occasion.</p>
                <h3>Dangle</h3>
                <p>The dangle or drop earring is an elegant style that will elongate the wearer’s neck and face. Dangle
                    earrings come in variety of designs that will showcase their unique form as well as your personal
                    style.</p>
                <NuxtLink :to="STATIC_ROUTES.EARRINGS_SEARCH">Start shopping for a beautiful pair of earrings.</NuxtLink>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'gemstone-education'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Gemstone Education</h2>
            <div>
                <p>Gemstones have a special allure that has fascinated humans for centuries. From the maharajahs of
                    India to the kings of Europe these colorful stones have been valued for their hardness, bright and
                    various colors as well as their rarity. Gemstones can bring your jewelry to life by adding a bright
                    splash of color. This gemstone guide will give you the tools you need to shop for gemstones with
                    confidence by giving you the understanding of the five basic characteristics of gemstones: color,
                    clarity, size, enhancements, and care.</p>
                <p>Like diamonds, gemstones are sold in carats, a measure of weight that equals 0.20 grams. Not all
                    gemstones of equal weight are the same size. All varieties of gemstones are made of different
                    mineral and trace elements making them have their own unique chemical composition and density. Some
                    gemstones, such as emerald, contain many minerals like beryllium, silicon, oxygen, chromium,
                    vanadium and iron; whereas others, like diamond sapphire, only contain a few different minerals.
                    Since gemstones can vary in size even when carat weights remain the same, some gemstones are also
                    sold in calibrated or uniform sizes by measurements in millimeters.</p>
                <hr>
                <p>As you probably know, gemstones can come in essentially every color of the rainbow. The color of the
                    gemstone is considered to be one of its core characteristics and is one of the most important
                    aspects when determining the value and beauty of a gemstone. When choosing a gemstone's color it is
                    important to examine the hue, tone and saturation of the stone.</p>
                <h3>Hue</h3>
                <p>Hue refers to the gradient or variety of a color in a stone. You may be surprised that one gem
                    variety can have a variety of hues. For example the sapphire not only comes in the traditional blue
                    that you think of when you hear the word sapphire, but it can also come in a range of other colors
                    including slightly pink, purple, yellow, orange and green. The hue of a gemstone can greatly impact
                    its value. Some gemstone colors, specifically hues like slightly purplish blue or slightly pinkish
                    orange, are more sought after than others.</p>
                <h3>Tone</h3>
                <p>Tone refers to the relative lightness or darkness of a color. Tone is usually used to describe the
                    intensity of the color which can range from nearly clear to dark and almost opaque. When light,
                    dark, darkish or other adjectives refer to our color descriptions, we are referring to the tone of
                    the color being described. For example, the most valued green color is a “grassy” green. Typical
                    light pale lime or dark hunter greens are not as valued and will be less expensive. Of course color
                    is a personal preference and just because a color isn’t as highly sought after does not mean that it
                    will not appear beautiful and unique to you.</p>
                <h3>Saturation</h3>
                <p>Saturation refers to the relative intensity of a color, ranging from weak to vivid. A gemstone with
                    excellent saturation will reflect a pure vibrant color without any grey or brownish hues. Top valued
                    gemstones are rated with either an excellent or very good saturation giving the stone a vibrant deep
                    color.</p>
                <hr>
                <p>Clarity is another important factor when determining the value of a gemstone. Clarity is a stone's
                    relative freedom of tiny internal characteristics known as inclusions. Inclusions form while the
                    stone is forming deep in the earth. You can think of these inclusions as the fingerprints or
                    birthmarks of the stone and can help in the stone's identification. Generally gemstones with very
                    few or small inclusions that are not visible to the naked are considered to be more valuable than
                    stones with larger and more visible inclusions. While some stones, like aquamarine and rubies, are
                    valued for their lack of inclusions, some stones, such as cat’s-eye chrysoberyl and star sapphires,
                    inclusions give the stone an extra phenomenal effect and add value. Some stones, including emeralds
                    and red tourmaline, almost always have some eye visible inclusions and because of their rich color,
                    a lack in clarity can detract less from their value than other stones which tend to be naturally
                    freer of inclusions.</p>
                <hr>
                <p>Gemstones, in their roughest form, come in a variety of appearances and quality. Some come in
                    beautiful rich colors with no surface or very few inclusions, but most gemstones require some form
                    of enhancement beyond cutting and polishing to make them attractive and appealing to the human eye.
                    Gemstones are treated for many different reasons and many different ways. The most common treatments
                    for gemstones are heating, infusion, bleaching, and dying.</p>
                <h3>Heat Treatment:</h3>
                <p>The heating of gemstones is one of the oldest and widespread enhancements. Almost 95% of corundum and
                    all tanzanite are heated. Other gems such as topaz, aquamarine and amber are also commonly heated.
                    Heating can cause different effects in different types of stones and can improve both the clarity
                    and color of a stone.</p>
                <h3>Infusion:</h3>
                <p>Infusion or fracture filling of gems is also a centuries old practice. Infusion is the process of
                    filling a gem with oil, resin, wax, glass or other material to improve the clarity of a stone.
                    Infusion with oil is a regular treatment for emeralds and some rubies and sapphires to greatly
                    improve their naked eye appearance.</p>
                <p>Shop our selection of gemstone accented <NuxtLink :to="STATIC_ROUTES.NECKLACES_SEARCH_GEMSTONE">pendants</NuxtLink>, <NuxtLink
                        :to="STATIC_ROUTES.EARRINGS_SEARCH_GEMSTONE">earrings</NuxtLink> and <NuxtLink
                        :to="{
                            path: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_GEMSTONE,
                            query: { style: 'engagement-rings-gemstone' }
                        }"
                        >
                        engagement rings
                        </NuxtLink>.
                </p>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'gift-guide'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Gift Guide</h2>
            <div class="section-top">
                <p>Surprise that special someone with a gift of fine jewelry from Adiamor. Present your bride with a
                    romantic jewelry gift on your wedding anniversary day. We also carry many other romantic gifts that
                    are perfect for birthdays, anniversaries, and special occasions.</p>
                <p>Browse the other sections in this gift guide and discover anniversary rings, fashion bracelets,
                    diamond earrings, pendants, accessories and more.</p>
                <hr>
                <h3>Gifts for the Bridesmaids</h3>
                <p>Need bridesmaids gifts? Adiamor has got you covered! Once you’ve got the wedding rings in hand, it’s
                    time to start thinking about gifts for the special ladies who are going to stand by your side on the
                    day of your nuptials. You’ve got a lot on your mind, so you might not have time to put much thought
                    into these gifts, but when you consider that these women are your best friends and/or family
                    members, that they have probably been a part of your life for a good long while (and will continue
                    to play a big role in your future), and that they are making a sacrifice on your behalf (spending
                    the time and money to make sure your special day goes off without a hitch), you might want to
                    rethink your commitment to finding the perfect gifts for them. Luckily, Adiamor makes it easy to say
                    thank you to your bridesmaids.</p>
                <p><NuxtLink :to="STATIC_ROUTES.EARRINGS_SEARCH">Shop Earrings</NuxtLink> | <NuxtLink :to="STATIC_ROUTES.NECKLACES_SEARCH">Shop Pendants</NuxtLink> | <NuxtLink :to="STATIC_ROUTES.BRACELETS">Shop Bracelets</NuxtLink></p>
                <h3>Gifts for the Groomsmen</h3>
                <p>And last but not least, what about the Groomsmen? Surely they deserve something for standing by your
                    side through the most important day of your life.</p>
                <p><NuxtLink :to="STATIC_ROUTES.GIFTS_SEARCH">Shop Accessories</NuxtLink></p>
                <hr>
                <p>If you are a savvy shopper when it comes to appropriate anniversary gifts, you are probably well
                    aware that there is a “diamond” anniversary (the 60th or the 75th…you decide if you make it that
                    far). But if you are a savvy spouse, you’ll know that you can never go wrong with the gift of
                    diamonds. Every year that you’ve been married is another opportunity to wow the one you love with a
                    new set of diamond studs, a necklace, or even an updated ring. Here are just a few reasons why
                    getting an icy gift will help you heat things up on your anniversary:</p>
                <h3>1. It's better than wood.</h3>
                <p>There are some pretty strange items listed for various anniversary years (wood, paper, and cotton to
                    name a few). Although these traditional gifts could force you to get creative (photo frame or
                    jewelry box could both work for wood), don’t you think diamonds will trump anything else you might
                    come up with?</p>
                <h3>2. Get a set, dole it out.</h3>
                <p>If you’re not really into shopping, you can buy a complete set (earrings, necklace, bracelet, etc.)
                    and have gifts lined up for years to come. Best of all, she’ll think you actually remember from year
                    to year which set the original gift came from.</p>
                <h3>3. No guesswork.</h3>
                <p>If you dread the thought of coming up with anniversary gifts for the next 50-80 years, knowing that
                    you’re going to get diamonds every year will certainly make things easier, especially if you’re not
                    particularly keen when it comes to determining what she might like.</p>
                <h3>4. Repetition is encouraged.</h3>
                <p>Diamonds are a girl’s best friend, so you know this is the one gift she’ll never protest. Even if she
                    doesn’t like the setting you choose to house a diamond, she can always get it reset. She’ll
                    appreciate the stone, if nothing else.</p>
                <h3>5. She can never have too many diamonds.</h3>
                <p>This is just jewelry-buying 101. No matter how many sets of diamond earrings she owns, there is
                    always a more perfect pair. And you could consider giving her a loose stone every year so that by
                    the time you actually reach your diamond anniversary, she’ll have a large enough collection to
                    create the necklace, the earrings, and any other accessory her heart desires.</p>
                <hr>
                <p>The holidays are an excellent time to think about buying a gift that will keep a special person in
                    your life happy for the rest of the year, and in that respect there is no better purchase than
                    diamond jewelry. But don’t think that it’s only for women. Although the right diamond will make any
                    woman swoon with joy, there are also many gifts for men that incorporate the hardest substance on
                    Earth. So if you’re thinking about giving that special someone something really special this year,
                    here are some options that may appeal to you.</p>
                <h3>1. Prong-set diamond studs.</h3>
                <p>Every woman can use a pair of dazzling diamond-stud earrings and the best way to display them is
                    generally a prong setting (unless the cut is very shallow). They go with any outfit and make an
                    excellent addition to any collection. In short, this is a gift you can’t go wrong with.</p>
                <NuxtLink :to="STATIC_ROUTES.EARRINGS_SEARCH_STUD">Shop Diamond Studs</NuxtLink>
                <h3>2. Three-stone pendant.</h3>
                <p>This unique pendant necklace features three diamonds in a triangular pattern or a straight line,
                    making it a beautiful piece. But what makes it so special is the meaning that is embodied by the
                    three stones. They serve to represent past, present, and future, symbolizing a lifelong promise of
                    love.</p>
                <h3>3. Cufflinks.</h3>
                <p>Who says men can’t wear jewelry? In fact, men have many options when it comes to accessorizing their
                    outfits. But if the man in your life isn’t particularly keen on, say, bracelets or rings, give him a
                    special piece to go with his dress wear. A fancy pair of cufflinks can class up his suits and let
                    him know how much you love it when they look nice.</p>
                <NuxtLink :to="STATIC_ROUTES.GIFTS_SEARCH_CUFF_LINKS">Shop Cufflinks</NuxtLink>
                <h3>4. Wedding Bands.</h3>
                <p>Either partner in a relationship can do something nice for their significant other by updating the
                    wedding bands. No woman will turn down a gorgeous eternity band and men will appreciate a piece that
                    is more fitting of their style aesthetic (now that you know your partner a little better, you can
                    find a band that he’ll really love).</p>
                <NuxtLink :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_DIAMOND_ACCENTED">Shop Wedding Bands</NuxtLink>
                <h3>5. Engagement ring.</h3>
                <p>If you really want to wow that special woman in your life, consider making this a holiday she’ll
                    never forget by giving her the engagement ring she’s been waiting for. And a tip for the ladies:
                    don’t wait around if you’re ready for wedding bells. Express your intentions by getting down on one
                    knee, presenting him with a ring, and taking the initiative to ask for his hand in marriage.</p>
                <NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_PAVE">Shop Engagement Rings</NuxtLink>
            </div>
        </ContentCard>

        <ContentCard :isVisible="$route.path?.includes('glossary')">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Glossary</h2>
            <div>
                <p>Our dictionary of common jewelry terms and descriptions with illustrations.</p>
                <Glossary />
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'metal-education'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Metal Education</h2>
            <div>
                <p>While Adiamor uses only the highest quality precious metals in our fine jewelry, we understand that
                    the choice between the various metals can be confusing. Each metal has its advantages and
                    disadvantages and you need to consider the characteristic of each metal, the price, and the care
                    required to maintain the metal at its optimum beauty. If you read through this section you will be
                    able to determine which metal fits your lifestyle and is the best choice for you.</p>
                <hr>
                <h3>Gold</h3>
                <p>Gold is a very timeless and durable metal that will not rust, corrode, or tarnish. Jewelers
                    throughout the ages have preferred gold to all other metals for its lustrous beauty and the ease
                    with which it can be worked into gorgeous and timeless designs. It can be alloyed with a number of
                    other metals to increase its strength and produce a variety of colors. The most common colors in
                    addition to yellow are rose and white gold. Since 24k pure gold is considered too soft for jewelry
                    manufacturing, Adiamor manufactures all our jewelry in 14k 18k 19k white, 14k 18k&nbsp; yellow, and
                    14k 18k rose gold.</p>
                <p>When purchasing gold jewelry, always look for the karat mark which should be stamped somewhere on the
                    jewelry; for rings it is usually on the inside of the shank. Gold karat marks are often just 14k,
                    18k, or 19k; however it is also quite common to encounter the numbers 750 and 585. These three digit
                    numerals are referring to the approximate percentage of pure gold within the alloy mix; for example,
                    750 equals 18k because 18k gold is 75% pure while 585 is the standard value for 14k because this
                    karat mix is 58.5% pure gold.</p>
                <p>Further Reading:<br><a
                        href="https://www.adiamor.com/blog/education/color-differences-14k-18k-rose-gold">The Color
                        Differences between 14K and 18K Rose Gold</a><br><a
                        href="https://www.adiamor.com/blog/engagement-rings/rose-gold-expensive-yellow-gold">Are Rose
                        Gold Rings More Expensive
                        than Yellow Gold?<br></a><a
                        href="https://www.adiamor.com/blog/engagement-rings/rose-gold-made">How is Rose Gold Made
                        for Engagement Rings?</a></p>
                <hr>
                <h3>Gold Characteristics and Terms</h3>
                <p>Gold content is measured in karats (not to be confused with the term carat that measures a diamond’s
                    weight). The higher the karat, the greater the gold content and price. The “k” number specifies how
                    many parts (by weight) of pure gold is contained in 24 parts of the alloy. Therefore the content of
                    pure gold in the various karats are as follows below:</p>
                <table class="shipping-table" role="table" aria-label="Gold Karat Content Comparison">
                    <thead>
                        <tr>
                            <th scope="col">Karat</th>
                            <th scope="col">Pure Gold Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>10k</td>
                            <td>10/24 = 41.7% pure gold</td>
                        </tr>
                        <tr>
                            <td>14k</td>
                            <td>14/24 = 58.5% pure gold</td>
                        </tr>
                        <tr>
                            <td>18k</td>
                            <td>18/24 = 75.0% pure gold</td>
                        </tr>
                        <tr>
                            <td>19k</td>
                            <td>19/24 = 79.2% pure gold</td>
                        </tr>
                        <tr>
                            <td>24k</td>
                            <td>24/24 = 100% pure gold</td>
                        </tr>
                    </tbody>
                </table>
                <p>The decision between which gold karat weight to go with is a matter of personal taste and preference.
                    14k has the advantages of added strength, but lacks the higher gold content found in either 18k or
                    19k.</p>
                <p><NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH">Browse Adiamor’s collection of white, yellow, and rose gold
                        engagement rings.</NuxtLink></p>
                <hr>
                <h3>What is White Gold?</h3>
                <p>White gold is an alloy of gold and some white metals such as nickel, silver, and palladium. Adiamor
                    offers white gold in 14k, 18k, and 19k. Since 14k white gold is 58.3% gold and 18k white gold is 75%
                    gold, both will naturally have a yellowish tint. To give 14k and 18k white gold its brilliant white
                    luster, in the final process of manufacturing it is rhodium plated. Rhodium is a shiny white metal,
                    which is extremely hard and durable; however over time the rhodium plating may wear away and leave
                    the natural yellowish tint of the underlying metal. To keep 14k and 18k white gold looking its best
                    it may require re-rhodium plating every 6-12 months, which is included in our complimentary
                    preventative maintenance service for the life of your fine jewelry. In contrast, 19k is 79.2% gold
                    and is naturally white in color. It does not need to be rhodium plated and stays white. 19k white
                    gold compares to the elegance and color of platinum.</p>
                <p><NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH_YELLOW_GOLD">Shop Adiamor’s collection of yellow gold engagement
                        rings.</NuxtLink></p>
                <hr>
                <h3>Gold Care</h3>
                <p>Proper care for your gold jewelry is important to maintain its lifelong beauty and value. Between
                    professional cleanings, most jewelry can be maintained with our Adiamor Foaming Cleaner or one like
                    it. It is not recommended to use professional grade cleaners or an ultrasonic cleaning device
                    without professional assistance. Storage is also important. At the time of shipment, all of our
                    jewelry is packaged in a protective rosewood box. Between wearing, we recommend that you place your
                    jewelry in its original box or another suitably lined box. Our Adiamor fabric lined pouch doubles as
                    a polishing cloth, and it is a great alternative to the original box. Take care to protect your
                    jewelry from impact against hard surfaces and avoid contact with abrasive surfaces. Be sure to check
                    any diamond settings periodically for possible damage; if you see a loose prong or if the setting
                    looks out of line immediately bring it to a professional for inspection.</p>
                <p><NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CARE">Read more about Adiamor’s diamond and jewelry care.</NuxtLink></p>
                <hr>
                <h3>Platinum</h3>
                <p><NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CARE">Read more about Adiamor’s diamond and jewelry care.</NuxtLink></p>
                <p>At Adiamor, all platinum jewelry is made of the finest quality of 950 grade platinum. Platinum is
                    regarded as the preeminent metal for fine jewelry. It is 35 times more rare than gold, has a
                    naturally bright or true white color that never requires additional rhodium treatments, is 90-95%
                    pure, and most importantly is eternal. The white luster of platinum is unique as it will patina over
                    time unlike other metals. Platinum is almost twice as heavy as 14k gold; it is also the strongest
                    precious metal used in jewelry, and for that reason it is highly sought after. Platinum’s purity
                    level makes it the only hypoallergenic metal and ideal for those with sensitive skin. Platinum
                    jewelry is a perfect choice for everyday wear.</p>
                <p><NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH">Shop Adiamor’s collection of platinum engagement
                        rings.</NuxtLink></p>
                <hr>
                <h3>Platinum Characteristics and Terms</h3>
                <p>Platinum is 35 times more rare than gold. Each year 88 tons of platinum is crafted into jewelry,
                    compared to 2,700 tons of gold. It requires 8 weeks and 10 tons of ore to produce a single ounce of
                    platinum. There is just one platinum mine for every 10 gold mines, which makes platinum one of the
                    most uncommon metals on earth. Platinum jewelry is at least 90-95% pure. By comparison, 19k gold is
                    79% pure, 18k gold is 75% pure, 14k is 58% pure gold. Platinum is also a naturally white metal that
                    requires no additives or rhodium plating. Platinum’s brilliant white luster makes it an ideal choice
                    for fine jewelry because its white luster brings out the true beauty of diamonds. Its incredible
                    density and weight make it more durable than other metals; it can scratch, but platinum does not
                    wear away and decrease its volume, unlike other metals. Over time platinum develops a natural patina
                    that many people prefer over the high polished appearance. This look is unique to platinum and can
                    be simply re-polished for those who prefer the high polish.</p>
                <p>Further Reading: <br><a
                        href="https://www.adiamor.com/blog/engagement-rings/ending-engagement-ring-myths-platinum-rings-not-indestructible">Platinum
                        Rings are Not Indestructible</a></p>
                <hr>
                <h3>Platinum Care</h3>
                <p>Proper care for your platinum jewelry is important to maintain its lifelong beauty and value.
                    Platinum is strong and durable, but can still be subject to damage. Between professional cleanings,
                    most jewelry can be maintained with our Adiamor Foaming Cleaner or one like it. It is not
                    recommended to use professional grade cleaners or an ultrasonic cleaning device without professional
                    assistance. Storage is also important. At the time of shipment, all of our jewelry is packaged in a
                    protective rosewood box. Between wearing, we recommend that you place your jewelry in its original
                    box or another suitably lined box. Our Adiamor fabric lined pouch doubles as a polishing cloth and
                    is a great alternative to the original box. Take care to protect your jewelry from impact against
                    hard surfaces and avoid contact with abrasive surfaces. Be sure to check any diamond settings
                    periodically for possible damage; if you see a loose prong or if the setting looks out of line
                    immediately bring it to a professional for inspection.</p>
                <p><NuxtLink :to="STATIC_ROUTES.EDUCATION_DIAMOND_CARE">Read more about Adiamor’s diamond and jewelry care.</NuxtLink></p>
                <p></p>
                <p></p>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'pearl-education'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Pearl Education</h2>
            <div>
                <p>There are two main cultured pearl types available on the jewelry market today: saltwater and
                    freshwater cultured pearls. Freshwater pearls are cultivated in the Hyriopsis cumingii freshwater
                    mussel in China. Saltwater pearls include both the Chinese and Japanese akoya pearl known for its
                    perfectly round, small, white shape, exotic black Tahitian pearls from French Polynesia, and Golden
                    and White South Sea pearls from Northern Australia and the Philippines, which are grown in the
                    Pinctada maxima pearl oyster which has both golden and silver-lipped varieties.</p>
                <NuxtLink :to="STATIC_ROUTES.NECKLACES_SEARCH">Shop Adiamor's collection of hand-selected pearl jewelry.</NuxtLink>
                <hr>
                <h3>Akoya Pearls</h3>
                <p>Akoya Pearls By far the most popular of all pearl types, the akoya pearl is famous for its small,
                    perfectly round shapes and bright,mirror-like luster. Ranging in size from 2.0-9.5mm, the akoya
                    offers one of the most versatile and wardrobe ready looks of all pearl types. Akoya pearls are
                    measured in half-millimeter increments; popular necklace and earring sizes are 7.0-7.5mm, 7.5-8.0mm
                    and 8.0-8.5mm.</p>
                <nuxt-img provider="cdn" src="/landing-pages/Policy/akoya-pearls.webp" style="float: right;"
                    alt="Akoya Pearls"/>
                <p>Cultured mainly in Japan and China, the bulk of akoya pearls measuring over 7.5-8.0mm are still
                    farmed in Japan, which is still considered to be the very best in terms of akoya culturing and
                    processing techniques. China has in recent years become highly skilled at culturing akoya pearls
                    under the 7.5mm in size, and represents most of the yearly harvest for the smaller sizes today.</p>
                <p>The akoya pearl oyster is nucleated only once or twice at a time due to its small size; the akoya
                    oyster, pinctada fucata martensii only reaches about 6 inches in diameter upon maturity and is the
                    smallest of all pearl producing oysters. A pearl surgical technician, called the ‘grafter’,
                    nucleates each oyster with a small, round mother-of-pearl bead and a 1.0mm square piece of donor
                    mantle tissue from another oyster. The bead nucleus and tissue piece are stitched together and
                    inserted into a small slit made in the gonad of the oyster; the nucleus is covered over and the
                    oyster is set aside in a small recovery tank that allows the farmer to monitor the oyster’s
                    progress. Two months later if all goes well, the oyster is transferred to the open ocean waters of
                    the farm. The growing cycle lasts anywhere from 12-18 months depending on the farmer’s preferences
                    and prevailing conditions at the farm. The longer the oyster has had to accumulate nacre around the
                    bead nucleus, the more lustrous and durable the pearl will be, so growth times of at least 12 months
                    are desired. Akoya pearl colors are soft pastels; the body color or main color of the pearls are
                    white to grey, and common overtones or tints of color that show over the body color include rose,
                    silver, cream and even green. Black akoya pearls are also widely available. These pearls are often
                    dyed a solid blue-black or greenish-blue-black color; the result is a pearl with a jet-black body
                    color with midnight blue overtones, and a very bright, ‘hard’ looking luster that is distinctive.
                    There are also blue akoya pearls available today which display bright pink flashes; these are
                    collector’s items and most of these pearls are baroque (not round and slightly asymmetrical) in
                    shape. The softer, pastel shades allow the akoya pearl to be one of the most well-loved and
                    versatile pearl types available to pearl lovers around the world.</p>
                <hr>
                <h3>Freshwater Pearls</h3>
                <p>Freshwater Pearls Freshwater pearls are the budget friendly alternative to the more expensive
                    saltwater pearl types. Cultivated in man-made ponds, reservoirs and lakes in China, the freshwater
                    pearl is the most plentiful pearl type on the market today. These pearls range in size from
                    5.0-12.0mm, and averages between 6.0-9.0mm. Freshwater pearls are measured in whole millimeter
                    increments; the most popular sizes for necklaces and earrings are 6.0-7.0mm, 7.0-8.0mm and
                    8.0-9.0mm.</p>
                <nuxt-img provider="cdn" src="/landing-pages/Policy/freshwater-pearls.webp" style="float: right;"
                    alt="Freshwater Pearls"/>
                <p>Cultured almost exclusively in China, small quantities of freshwater pearls can also be found in
                    Japan in the form of Biwa pearls and the noted pearls from Lake Kasumigaura, although due to
                    pollution and over fishing, the famed Kasumigaura pearls are not available in any real quantities
                    today. The United States also produces freshwater pearls; located in the Mississippi River Valley,
                    freshwater pearls from the US are a rare delight. These pearls are sold under the name of American
                    freshwater pearls and are a collector’s item.</p>
                <p>The freshwater mussels used to culture freshwater pearls are the Hyriopsis cumingii (the triangle
                    shell) and the Hyriopsis schlegeli (the biwa shell) or hybrids of both. The mussel grows to nearly
                    12 inches in diameter at maturity, and can be nucleated up to 24 times on each side of the shell.
                    This accounts for the huge volume of freshwater pearls that are released onto the jewelry market
                    every year; with the wide availability of pearls in an astonishing range of sizes, colors and
                    qualities, the prices for fine quality freshwater pearl jewelry is a fraction of what you’d pay for
                    saltwater pearls of an equivalent quality.</p>
                <p>Freshwater pearls offer an extensive variety of sizes, shapes and colors. Pearls may take the form of
                    rice crispy and potato shapes to the heavily baroque and freeform to the nearly true round shapes of
                    the akoya. Common colors include white, pink, peach and lavender hues which are completely natural;
                    lower quality freshwater pearls are also often dyed in a rainbow of colors ranging from ruby red to
                    bright blues, greens and highly iridescent blacks.</p>
                <hr>
                <h3>Sea Pearls</h3>
                <p>Sea Pearls White and Golden South Sea pearls are the ultimate in luxury cultured pearl jewelry.
                    Cultivated in the tropical lagoons and atolls of the Philippines and Western Australia, South Sea
                    pearls are the largest, rarest and most expensive of all pearl types. The pearls range in size from
                    8.0mm to an astonishing 20.0mm in size, however the average sizes are between 10.0mm and 14.0mm.
                    South Sea pearls are measured in whole millimeter increments; the most popular sizes are 9.0-10.0mm,
                    10.0-11.0mm and 11.0-12.0mm for earrings and pendants. South Sea pearl necklaces typically feature a
                    marked graduation rate, usually about 3.0-5.0mm in range.</p>
                <nuxt-img provider="cdn" src="/landing-pages/Policy/south-sea-pearls.webp" style="float: right;"
                    alt="Sea Pearls"/>
                <p>The highest quality White South Sea pearls are cultured in Western Australia in the silver-lipped
                    Pinctada maxima saltwater oyster which can grow up to 12-inches in diameter. Growth times for South
                    Sea pearls average about 3 years from the time of nucleation to harvest, which allows the oyster to
                    lay down very thick nacre layers around the nucleus, creating lustrous pearls that are known for
                    their soft, somewhat satiny appearance. White South Sea pearls feature natural white body colors
                    that range from deep cream to a bright, neutral white, and the most common overtones include cream,
                    silver and rose, which is the most rare and valued.</p>
                <p>Golden South Sea pearls are cultivated in the Pinctada maxima, gold-lipped oyster, mostly in the
                    Philippines and Indonesia. The warm tropical waters are perfect for cultivating these large,
                    stunning pearls; nucleation to harvest typically takes about 3 years. The natural golden color of
                    Golden South Sea pearls ranges from a pale Champaign to a deep 24k golden tone, which are very rare
                    and highly valued. Common overtones for Golden South Sea pearls include bronze, gold, silver, green
                    and rose.</p>
                <p>Both Golden and White South Sea pearls come in a variety of shapes, colors and sizes. From the
                    classic smooth rounds to symmetrical drops and highly asymmetrical baroque shapes, these large and
                    rare pearls offer something for everyone to enjoy.</p>
                <hr>
                <h3>Tahitian Pearls</h3>
                <p>Tahitian Pearls Black Tahitian pearls are the naturally colored black pearls from French Polynesia.
                    Shimmering with colorful overtones of iridescent peacock, Aubergine (eggplant purple), shimmering
                    silver and copper, chocolate, cherry, green and more, these black pearls come in a rainbow of hues
                    to delight even the pickiest of pearl lovers. Cultivated in the warm tropical lagoons and atolls of
                    islands in French Polynesia, black Tahitian pearls are striking and exotic. The pearls range in size
                    from 8.0mm up to 18.0mm, with an average range of 9.0-13.0mm in size.</p>
                <nuxt-img provider="cdn" src="/landing-pages/Policy/tahitian-pearls.webp" style="float: right;"
                    alt="Tahitian Pearls"/>
                <p>Tahitian pearls are cultivated in the Pinctada margaritifera black-lipped saltwater oyster, which can
                    grow up to 12-inches in size, nearly the size of a dinner plate. The oyster features an iridescent
                    rainbow of colors on its outer lip, which is what gives these pearls their magnificent and unique
                    overtones. Growth times average approximately 3 years from nucleation to harvest, and French
                    Polynesian law bans export of any pearl with an average nacre thickness of less than 0.8mm, which
                    when compared with an akoya pearl is considered extremely thick. The oyster is often grafted with 2
                    bead nuclei at a time, and can be nucleated up to 3 times, producing progressively larger and larger
                    pearls before being released back into the wild in order to maintain genetic diversity within the
                    native population.</p>
                <p>These stunning pearls are available in round, circled round, button shape, drop-shape and
                    asymmetrical baroque shapes that can be used in custom jewelry designs. Despite their relative
                    rareness when compared with Freshwater or akoya pearls, there are more Tahitian pearl farms in
                    operation today than ever before, making these exotic and gorgeous pearls more affordable than ever.
                </p>
                <hr>
                <h3>Pearl Grading Made Easy</h3>
                <p>Currently there is no official, industry-wide agreed upon grading scale that farmers, vendors, gem
                    labs and retailers can employ, however the A-AAA grading system is widely used in the US and can
                    provide an easily understood framework with which to grade the various pearl types. Currently
                    Tahitian and South Sea pearl farmers utilize the A-D grading scale with ‘A’ being the highest
                    quality and ‘D’ representing pearls that are the lowest. The A-D grading scale easily converts into
                    the A-AAA scale, with A representing the very lowest grades, and AAA representing the very best
                    pearls.</p>
                <p>The AAA grade represents the top 3% of all pearls harvested each year; AAA quality pearls feature
                    top-grade luster, a very high degree of reflectivity, smooth, unblemished surfaces and visibly thick
                    nacre. The AAA quality akoya pearl will have a blemish rate of 95% blemish free surfaces with no
                    deep inclusions allowable. The luster will be very sharp and crisp with reflected light sources
                    showing very neat lines on the surface of the pearls; you should be able to see detailed facial
                    features reflected on the surface of the pearls and the nacre will be visibly thick.</p>
                <p>In the case of akoya pearls, pearl matching will be excellent with little to no variation in tone,
                    luster or size throughout the necklace, and pearls will be perfectly round to the eye. The pearl
                    industry calls these pearls “8-Way Rollers.” For freshwater pearls, the blemish rates will be the
                    same as that of the saltwater akoya, however the luster will be somewhat softer and have a more
                    satin effect; the shape of the AAA quality freshwater pearl will appear round to the eye, but upon
                    up-close inspection may show some variation- the pearls may appear very slightly off-round to
                    slightly ovalish in shape.</p>
                <p>AA+ quality akoya pearls feature a blemish rate of less than 10% on the total surface area of the
                    pearl; inclusions should be very small and only visible upon up-close inspection (a distance of
                    2-inches or less). The akoya pearl will be perfectly round and very well matched with little to no
                    variation in tone, color or luster throughout the necklace. Luster is considered Very Good, with
                    only slight satining of reflected light sources on the surface of the pearls; you should still be
                    able to make out your face reflected on the pearl's surface. For freshwater pearls, the blemish and
                    luster rates are the same as that of the akoya, however the freshwater pearls will show more
                    variation in shape and will be visibly off round to the eye.</p>
                <p>Adiamor does not carry any pearls below the AA+ quality grade, and all pearl earrings and pendants
                    are graded AAA quality by our experienced GIA graduate in pearls.</p>
                <NuxtLink :to="{ path: STATIC_ROUTES.NECKLACES_SEARCH, query: { style: 'pearl-necklaces' } }">Shop Adiamor's collection of hand-selected pearl jewelry</NuxtLink>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'pendant-guide'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Pendant Guide</h2>
            <div>
                <p>A gift of a pendant or necklace is just as beautiful a statement of love and endearment today as it
                    was in ancient times. Several cultures, including the Romans, would give their intended an
                    engagement necklace instead of a ring. Although this custom may have changed, giving someone a
                    necklace often holds as much sentiment today as it did so many years ago.</p>
                <p>A necklace can make many different statements. They can be worn as a form of identification, provide
                    a sense of protection or simply be used for decoration. Modern neck pieces can be designed with
                    almost any substance. Silver, gold, platinum, diamonds, semi-precious and precious gemstones are the
                    most valuable and common elements used in necklaces and pendants.</p>
                <p>When looking for a pendant or a necklace, it may help to narrow down the style that you prefer most.
                    Pendants are decorative items, such as a charm or a larger gemstone, that hang loosely from a chain
                    or another type of necklace. The focus of a pendant typically lies with a single hanging decorative
                    element. Necklaces often have a more integrated design element repeated throughout the item and may
                    have multiple pendants attached to it or none at all.</p>
                <p>Necklaces and pendants are available in a variety of different lengths. These lengths may vary in
                    appearance depending on the size of the wearer. The standard guide for necklace length is as
                    follows:</p>
                <ul style="list-style-type: unset; margin: 15px 30px 25px; padding: unset; line-height: 30px;">
                    <li>Choker: 14 - 16 inches (standard length for most pendants)</li>
                    <li>Princess: 18 - 20 inches</li>
                    <li>Matinee: 22 - 33 inches</li>
                    <li>Opera: 30 - 35 inches</li>
                    <li>Sautoir/Rope: 35 inches or longer</li>
                </ul>
                <p>Shop Adiamor's selection of colorful <NuxtLink :to="STATIC_ROUTES.NECKLACES_SEARCH_GEMSTONE">gemstone
                        pendants</NuxtLink>,
                    luxurious <NuxtLink :to="STATIC_ROUTES.NECKLACES_SEARCH_PRE_SET">pre-set diamond pendants</NuxtLink>, and lustrous <NuxtLink
                        :to="STATIC_ROUTES.NECKLACES_SEARCH_PEARL">pearl pendants and necklaces</NuxtLink>.</p>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'wedding-ring-guide'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Wedding Ring Guide</h2>
            <div>
                <div>
                    <p>The wedding ring is traditionally the beautiful band that accompanies an engagement
                        ring and the outward symbol to the world of commitment and love between two
                        people.&nbsp; This symbol of love and commitment reflects each of your individual
                        styles and tastes as well as you as a couple. Choosing the perfect wedding band does
                        not need to be difficult; it just needs to reflect you and your love.</p>
                    <p>Further Reading:<br><a href="https://www.adiamor.com/blog/education/chooses-wedding-bands">Who
                            Chooses the
                            Wedding Band?</a><br><a
                            href="https://www.adiamor.com/blog/engagement-rings/fully-customized-matching-wedding-bands">Fully
                            Customized Matching Wedding Bands</a><br><a
                            href="https://www.adiamor.com/blog/education/eternity-bands">Eternity
                            Bands and Wedding Rings: Whats
                            the difference?</a></p>
                    <hr>
                    <h3>Women's Wedding Rings</h3>
                    <p>There are many different looks and styles to choose from when selecting a woman’s
                        engagement ring. The woman’s wedding band is traditionally worn closer to the heart
                        with the engagement ring and is worn on the same finger. It is important to find a
                        wedding ring that fits you and your personal style.</p>
                    <p><strong>Mix 'n Match:</strong> Your wedding ring should complement your engagement
                        ring, but it does not always have to be an exact match. You may like the style of a
                        wedding ring that is not the exact match for your engagement ring, or your
                        engagement ring may not have an exact matching band.&nbsp; One thing to consider
                        when mixing bands is the height of each ring.&nbsp; Selecting a wedding band that is
                        taller than the engagement ring band may result in constant wear and tear on the
                        prongs that hold the center diamond in the engagement ring.&nbsp; We recommend a
                        spacer wedding band in this case.&nbsp; A spacer wedding band is typically a thin
                        metal band that creates space between the engagement ring and the wedding
                        band.&nbsp; Having a “mix ‘n match” wedding set can give you a unique look that is
                        becoming more popular as it can show your own unique style.</p>
                    <p><strong>Matched Sets:</strong> There are also wedding rings that are an exact match
                        to your engagement ring. These wedding sets are designed to fit together like puzzle
                        pieces and give the appearance of one larger or wider ring. Consider this when you
                        are selecting a matched wedding band for a thin band engagement ring.&nbsp;
                        Selecting the perfect match will increase the appearance of the width of the
                        band.&nbsp; If you selected a thin band ring because you like a dainty look, you may
                        consider against stacking the perfect match. You can customize this look by adding
                        one or even two wedding rings to give it a double or triple shank appearance. Buying
                        a matched set can sometimes be the easiest choice as matched sets were designed to
                        complement one another.</p>
                    <p><NuxtLink :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_WOMENS">Shop Women's Wedding Rings</NuxtLink></p>
                    <h3>Men's Wedding Rings</h3>
                    <p>Today, men have nearly as many choices for wedding rings as women do. The most
                        popular and traditional style is a plain gold or platinum band with no diamonds or
                        detailing.&nbsp; With the many styles available today, men have the option to choose
                        a design that reflects their own unique personality and taste. To add a bit more
                        flair or detail to his ring, choose one with subtle diamonds, a masculine braid,
                        milgrain, or a different type of finishing like a brushed or matte finish. The most
                        popular width for a men's wedding ring is 5mm.&nbsp; Bands that are narrow may be
                        more comfortable to wear, especially for the person that doesn't typically wear
                        rings.&nbsp; Bands that are 7mm and wider are a statement and great for a person
                        that is used to wearing rings. Now trending are men's wedding bands that have a
                        larger single diamond.&nbsp; These are becoming more popular in every band width and
                        are typically bezel set.&nbsp; At Adiamor, we offer a wide variety of men’s wedding
                        rings that can be customized in any way to fit his personal taste.</p>
                    <NuxtLink :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH_MENS">Shop Men's Wedding Rings</NuxtLink>
                </div>
            </div>
        </ContentCard>

        <ContentCard :isVisible="getSlug === 'find-your-ring-size'">
            <h2 class="mb-4 text-xl sm:text-2xl font-normal">Ring Size Guide</h2>
            <div>
                <h3>Find Your Ring Size</h3>
                <p>When finding your ring size, comfort and ring security are the most important aspects. While your
                    ring should fit comfortably, it must be snug enough that it will not fall off while still being able
                    to pass over your knuckle. It is important to note that your finger size changes depending on the
                    time of day and the weather. When measuring your finger, you will get the best results by measuring
                    at the end of the day when your fingers are warm. Be sure to measure your ring size at least 3 times
                    to eliminate any errors made while measuring.</p>
                <p><a target="_blank" :href="`${$config?.public?.cdnPrefix}adiamor_ring_sizer.pdf`">Print out the
                        Adiamor Ring Sizing Guide to determine your ring size at home</a>.</p>

                <h3>Free Ring Resizing</h3>
                <p>Ring Sizing
                    Adiamor offers free ring sizing within the first 90 days from the original shipment date. Most rings
                    can be resized within 4 business days. Depending on the size discrepancy, some rings will take
                    approximately 8-10 business days.
                </p>
                <hr>
                <h3>International Ring Size Conversion</h3>
                <h4>Legend</h4>
                <p>A : US / Canada</p>
                <p>B : UK / Australia / South Africa</p>
                <p>C : France</p>
                <p>D : Germany / Russia / Ukraine / Asia</p>
                <p>E : India / China / Japan / South America / Turkey / Israel</p>
                <p>F : Italy / Spain / Netherlands / Switzerland</p>

                <table role="table" aria-label="International Ring Size Conversion Chart">
                    <thead>
                        <tr>
                            <th scope="col" class="px-3">US / Canada</th>
                            <th scope="col" class="px-3">UK / Australia / South Africa</th>
                            <th scope="col" class="px-3">France</th>
                            <th scope="col" class="px-3">Germany / Russia / Ukraine / Asia</th>
                            <th scope="col" class="px-3">India / China / Japan / South America / Turkey / Israel</th>
                            <th scope="col" class="px-3">Italy / Spain / Netherlands / Switzerland</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="px-3">A</td>
                            <td class="px-3">B</td>
                            <td class="px-3">C</td>
                            <td class="px-3">D</td>
                            <td class="px-3">E</td>
                            <td class="px-3">F</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">½</td>
                            <td class="px-3">A</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                        </tr>
                        <tr>
                            <td class="px-3">1</td>
                            <td class="px-3">B</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">1</td>
                            <td class="px-3">---</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">1 ½</td>
                            <td class="px-3">C</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                        </tr>
                        <tr>
                            <td class="px-3">2</td>
                            <td class="px-3">D</td>
                            <td class="px-3">41 ½</td>
                            <td class="px-3">13 ¼</td>
                            <td class="px-3">2</td>
                            <td class="px-3">1 ½</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">2 ¼</td>
                            <td class="px-3">D-½</td>
                            <td class="px-3">42 1/8</td>
                            <td class="px-3">13 ½</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                        </tr>
                        <tr>
                            <td class="px-3">2 ½</td>
                            <td class="px-3">E</td>
                            <td class="px-3">42 ¾</td>
                            <td class="px-3">13 ¾</td>
                            <td class="px-3">3</td>
                            <td class="px-3">2 ¾</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">2 ¾</td>
                            <td class="px-3">E-½</td>
                            <td class="px-3">43 3/8</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">3 3/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">3</td>
                            <td class="px-3">F</td>
                            <td class="px-3">44</td>
                            <td class="px-3">14</td>
                            <td class="px-3">4</td>
                            <td class="px-3">4</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">3 ¼</td>
                            <td class="px-3">F-½</td>
                            <td class="px-3">44 5/8</td>
                            <td class="px-3">14 ¼</td>
                            <td class="px-3">---</td>
                            <td class="px-3">4 5/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">3 ½</td>
                            <td class="px-3">G</td>
                            <td class="px-3">45 ¼</td>
                            <td class="px-3">14 ½</td>
                            <td class="px-3">5</td>
                            <td class="px-3">5 ¼</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">3 ¾</td>
                            <td class="px-3">G-½</td>
                            <td class="px-3">45 7/8</td>
                            <td class="px-3">14 ¾</td>
                            <td class="px-3">6</td>
                            <td class="px-3">5 7/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">4</td>
                            <td class="px-3">H</td>
                            <td class="px-3">46 ½</td>
                            <td class="px-3">15</td>
                            <td class="px-3">7</td>
                            <td class="px-3">6 ½</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">4 ¼</td>
                            <td class="px-3">H-½</td>
                            <td class="px-3">47 1/8</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">7 1/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">4 ½</td>
                            <td class="px-3">I</td>
                            <td class="px-3">47 ¾</td>
                            <td class="px-3">15 ¼</td>
                            <td class="px-3">8</td>
                            <td class="px-3">7 ¾</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">4 ¾</td>
                            <td class="px-3">J</td>
                            <td class="px-3">48 3/8</td>
                            <td class="px-3">15 ½</td>
                            <td class="px-3">---</td>
                            <td class="px-3">8 3/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">5</td>
                            <td class="px-3">J-½</td>
                            <td class="px-3">49</td>
                            <td class="px-3">15 ¾</td>
                            <td class="px-3">9</td>
                            <td class="px-3">9</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">5 ¼</td>
                            <td class="px-3">K</td>
                            <td class="px-3">49 5/8</td>
                            <td class="px-3">16</td>
                            <td class="px-3">---</td>
                            <td class="px-3">9 5/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">5 ½</td>
                            <td class="px-3">K-½</td>
                            <td class="px-3">50 ¼</td>
                            <td class="px-3">16 ¼</td>
                            <td class="px-3">10</td>
                            <td class="px-3">10 ¼</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">5 ¾</td>
                            <td class="px-3">L</td>
                            <td class="px-3">50 7/8</td>
                            <td class="px-3">---</td>
                            <td class="px-3">11</td>
                            <td class="px-3">10 7/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">6</td>
                            <td class="px-3">L-½</td>
                            <td class="px-3">51 ½</td>
                            <td class="px-3">16 ½</td>
                            <td class="px-3">12</td>
                            <td class="px-3">11 ½</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">6 ¼</td>
                            <td class="px-3">M</td>
                            <td class="px-3">52 1/8</td>
                            <td class="px-3">16 ¾</td>
                            <td class="px-3">---</td>
                            <td class="px-3">12 1/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">6 ½</td>
                            <td class="px-3">M-½</td>
                            <td class="px-3">52 ¾</td>
                            <td class="px-3">17</td>
                            <td class="px-3">13</td>
                            <td class="px-3">12 ¾</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">6 ¾</td>
                            <td class="px-3">N</td>
                            <td class="px-3">53 3/8</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">13 3/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">7</td>
                            <td class="px-3">O</td>
                            <td class="px-3">54</td>
                            <td class="px-3">17 ¼</td>
                            <td class="px-3">14</td>
                            <td class="px-3">14</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">7 ¼</td>
                            <td class="px-3">O-½</td>
                            <td class="px-3">54 5/8</td>
                            <td class="px-3">17 ½</td>
                            <td class="px-3">---</td>
                            <td class="px-3">14 5/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">7 ½</td>
                            <td class="px-3">P</td>
                            <td class="px-3">55 ¼</td>
                            <td class="px-3">17 ¾</td>
                            <td class="px-3">15</td>
                            <td class="px-3">15 ¼</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">7 ¾</td>
                            <td class="px-3">P-½</td>
                            <td class="px-3">55 7/8</td>
                            <td class="px-3">18</td>
                            <td class="px-3">---</td>
                            <td class="px-3">15 7/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">8</td>
                            <td class="px-3">Q</td>
                            <td class="px-3">56 ½</td>
                            <td class="px-3">---</td>
                            <td class="px-3">16</td>
                            <td class="px-3">16 ½</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">8 ¼</td>
                            <td class="px-3">Q-½</td>
                            <td class="px-3">57 1/8</td>
                            <td class="px-3">18 ¼</td>
                            <td class="px-3">---</td>
                            <td class="px-3">17 1/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">8 ½</td>
                            <td class="px-3">R</td>
                            <td class="px-3">57 ¾</td>
                            <td class="px-3">18 ½</td>
                            <td class="px-3">17</td>
                            <td class="px-3">17 ¾</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">8 ¾</td>
                            <td class="px-3">R-½</td>
                            <td class="px-3">58 3/8</td>
                            <td class="px-3">18 ¾</td>
                            <td class="px-3">---</td>
                            <td class="px-3">18 3/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">9</td>
                            <td class="px-3">S</td>
                            <td class="px-3">59</td>
                            <td class="px-3">19</td>
                            <td class="px-3">18</td>
                            <td class="px-3">19</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">9 ¼</td>
                            <td class="px-3">S-½</td>
                            <td class="px-3">59 5/8</td>
                            <td class="px-3">19 ¼</td>
                            <td class="px-3">---</td>
                            <td class="px-3">19 5/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">9 ½</td>
                            <td class="px-3">---</td>
                            <td class="px-3">60 ¼</td>
                            <td class="px-3">19 ½</td>
                            <td class="px-3">19</td>
                            <td class="px-3">20 ¼</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">9 ¾</td>
                            <td class="px-3">T</td>
                            <td class="px-3">60 7/8</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">20 7/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">10</td>
                            <td class="px-3">T-½</td>
                            <td class="px-3">61 ½</td>
                            <td class="px-3">19 ¾</td>
                            <td class="px-3">20</td>
                            <td class="px-3">21 ½</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">10 ¼</td>
                            <td class="px-3">U</td>
                            <td class="px-3">62 1/8</td>
                            <td class="px-3">20</td>
                            <td class="px-3">21</td>
                            <td class="px-3">22 1/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">10 ½</td>
                            <td class="px-3">U-½</td>
                            <td class="px-3">62 ¾</td>
                            <td class="px-3">---</td>
                            <td class="px-3">22</td>
                            <td class="px-3">22 ¾</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">10 ¾</td>
                            <td class="px-3">V</td>
                            <td class="px-3">63 3/8
                            </td>
                            <td class="px-3">20 ½</td>
                            <td class="px-3">--- </td>
                            <td class="px-3">3 3/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">11</td>
                            <td class="px-3">V-½</td>
                            <td class="px-3">64</td>
                            <td class="px-3">20 ¾</td>
                            <td class="px-3">23</td>
                            <td class="px-3">24</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">11 ¼</td>
                            <td class="px-3">W</td>
                            <td class="px-3">64 5/8</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">24 5/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">11 ½</td>
                            <td class="px-3">W-½</td>
                            <td class="px-3">65 ¼</td>
                            <td class="px-3">21</td>
                            <td class="px-3">24</td>
                            <td class="px-3">25 ¼</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">11 ¾</td>
                            <td class="px-3">X</td>
                            <td class="px-3">65 7/8</td>
                            <td class="px-3">21 ¼</td>
                            <td class="px-3">---</td>
                            <td class="px-3">25 7/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">12</td>
                            <td class="px-3">Y</td>
                            <td class="px-3">66 ½</td>
                            <td class="px-3">21 ½</td>
                            <td class="px-3">25</td>
                            <td class="px-3">26 ½</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">12 ¼</td>
                            <td class="px-3">Y-½</td>
                            <td class="px-3">67 1/8</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">27 1/8</td>
                        </tr>
                        <tr>
                            <td class="px-3">12 ½</td>
                            <td class="px-3">Z</td>
                            <td class="px-3">67 ¾</td>
                            <td class="px-3">21 ¾</td>
                            <td class="px-3">26</td>
                            <td class="px-3">27 ¾</td>
                        </tr>
                        <tr class="bg-gray-100">
                            <td class="px-3">12 ¾</td>
                            <td class="px-3">Z-½</td>
                            <td class="px-3">68 3/8</td>
                            <td class="px-3">---</td>
                            <td class="px-3">---</td>
                            <td class="px-3">28 3/8</td>
                        </tr>

                        <tr>
                            <td class="px-3">13</td>
                            <td class="px-3">---</td>
                            <td class="px-3">69</td>
                            <td class="px-3">22</td>
                            <td class="px-3">27</td>
                            <td class="px-3">29</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </ContentCard>
    </div>
</template>
<script>
import api from "~/api-client/rest-api/index";
import ContentCard from "~/components/common/ContentCard.vue";
import ProductCarousel from "~/components/product/ProductCarousel.vue";
import { redirectionUrl, getGTMProductImage, cleanPostfix } from "~/utils/universalHelper.js";
import mixin from "~/mixin/sweetAlert.js";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import Glossary from "~/components/Glossary.vue";
import CustomLiveAgentForm from "./form/CustomLiveAgentForm.vue";
export default {
    name : 'EducationContent',
    components: { ContentCard, ProductCarousel, CustomLiveAgentForm, Glossary },
    data() {
        return {
            STATIC_ROUTES,
            extraItems: [],
            productList: [],
            liveAnnouncement: '',
            addingToCartId: null
        };
    },
    mounted() {
    
        if(this.getSlug?.includes('diamond-care')) {
            this.getExtraItems();
        }
        if(this.getSlug?.includes('carat-weight')) {
            this.getProductItems();
        }
        // Announce content section change for screen readers
        this.announceContentChange();
    },
    watch: {
        getSlug(newSlug) {
            if (newSlug) {
                this.$nextTick(() => {
                    this.announceContentChange();
                });
            }
        }
    },
    methods: {
        createSwalAlert: (msg, type) => mixin.methods.createSwalAlert(msg, type),
        async getExtraItems() {
            let response = await api.getRequest(this.$axios, this.$cookies, 'cleaner-products');
            if (response && response?.data?.products) {
                this.extraItems = response?.data?.products ?? [];
            }
        },

        async addToCart(item) {
            try {
                let payload = {
                    product_id: item.id,
                    quantity: 1,
                };

                //Visitor code
                payload["visitor_code"] = this.$cookies
                ? this.$cookies.get("visitorCode")
                : "";
                
                this.addingToCartId = item.id;
                // Send the API request
                let response = await api.postRequest(
                    this.$axios,
                    "checkout/cart/add-product",
                    payload
                );
                // On successful response
                if (response && response.status === 200 && response.data) {
                    let items = response.data?.data?.items;
                    if (items?.length > 0) {
                        this.createSwalAlert(response?.data?.message, "success");
                        this.$store.commit('setGTMData', item);
                        await this.gtmProductEvent([item], null, 'add_to_cart');
                        this.$router.push(
                            `${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${response.data?.data.visitor_code}`
                        );
                    }
                } else {
                    this.createSwalAlert(response?.data?.message || "Failed to add item to cart", "error");
                }
            } catch (error) {
                this.createSwalAlert("An unexpected error occurred", "error");
            }
        },
    	async gtmProductEvent(filteredData = null, type = null, actionType = null) {	
			const correctSku = (product) => product?.sku?.includes('-') ? product?.sku.split('-')[0] : product?.sku;
            await this.$store.commit('setProductGtmData', null);
            let filteredList = filteredData?.length ? filteredData : [];
			if(!filteredList?.length) return;
			if (type === null && (this.$route.name === 'yourSettingPage') && Array.isArray(filteredList) && filteredList.length === 1) {
				const bundleItem = this.$store?.getters?.getBundleItem;
				const settingSku = bundleItem?.setting?.sku;
				const diamondSku = bundleItem?.diamond?.sku;

				if (bundleItem && settingSku && diamondSku) {
					filteredList[0] = {
						...(typeof filteredList[0] === 'object' && !Array.isArray(filteredList[0]) ? filteredList[0] : {}),
						...(typeof bundleItem === 'object' && !Array.isArray(bundleItem) ? bundleItem : {}),
						sku: `${settingSku}-${diamondSku}`
					};
				}
			}
			const getGTMProductPath = (url = '') => {
				return this.$config.public.adiamorHomeURL.replace(/^(https?:\/\/)?www\./, '$1').replace(/\/$/, '') + '/' + url?.replace(/^\/|\/$/g, '');
			}

            let productType = this.product?.family ? this.product?.family?.replace(' ', '-') : "jewelry";
            let item_list_name = type ? `${type}-items-${productType?.toLowerCase()}` : null;
            let gtmEventData = filteredList?.map((item, index) => {
            if (item) {
				let isDiamond = item?.attribute_family_code == 'certified_diamond';
                return {
                    item_id: item?.type != 'simple' && !isDiamond ? correctSku(item) ?? item?.sku : item?.sku,
                    item_name: item?.name ?? item?.title,
                    index,
                    item_variant: type && !isDiamond ? item?.sku : item?.type != 'simple' && !isDiamond ? this.selectedVariant?.sku ?? item?.sku : null,
                    price: item?.price,
                    quantity: 1,
					item_url: getGTMProductPath(type && item?.href ? `${item?.href}${item?.sku && !isDiamond ? `?sku=${item?.sku}` : ''}` : `${item?.url_key}${this.selectedVariant?.sku ? `?sku=${this.selectedVariant?.sku}` : ''}`),
					item_image_url: getGTMProductImage('front', false, this.product,this.selectedVariant)
                };
            }
            });            
            await this.$store.commit('setProductGtmData', gtmEventData);                    
            const additionalData = item_list_name ? { item_list_name } : {};
            await this.$store.dispatch('runGtmEvent', { store: this.$store, action_type : actionType ? actionType : 'view_item_list', txnId: null, additionalData });
        },
        async getProductItems() {
            const response = await api.getFitleredProductList('settings', this.$axios, `style=135&limit=5`, this.$cookies);
            if (!response || response.data?.status != "success") {
            this.productList = [];
            return;
            }
            this.productList = response.data.data;
        },
        getRedirectUrl(item) {
            return redirectionUrl(item);
        },
        announceContentChange() {
            const slug = this.getSlug;
            if (!slug) return;
            
            const contentTitles = {
                'diamond-education': 'Diamond Education Guide',
                'affinity-collection': 'Affinity Collection',
                'carat-weight': 'Carat Weight',
                'diamond-care': 'Diamond Care',
                'diamond-certification': 'Diamond Certification',
                'diamond-clarity': 'Diamond Clarity',
                'diamond-color': 'Diamond Color',
                'diamond-cut': 'Diamond Cut',
                'diamond-shape': 'Diamond Shape',
                'lab-grown-diamonds': 'Lab Grown Diamonds',
                'engagement-ring-guide': 'Engagement Ring Guide',
                'engagement-ring-add-ons': 'Engagement Ring Add-Ons',
                'establishing-your-budget': 'Establishing Your Budget',
                'financing-insurance': 'Financing and Insurance',
                'jeweler-guide': 'Jeweler Guide',
                'proposal-tips': 'Proposal Tips',
                'ring-anatomy': 'Ring Anatomy',
                'fine-jewelry-education-guide': 'Fine Jewelry Education Guide',
                'earring-guide': 'Earring Guide',
                'gemstone-education': 'Gemstone Education',
                'gift-guide': 'Gift Guide',
                'metal-education': 'Metal Education',
                'pearl-education': 'Pearl Education',
                'pendant-guide': 'Pendant Guide',
                'wedding-ring-guide': 'Wedding Ring Guide',
                'find-your-ring-size': 'Ring Size Guide',
            };
            
            const title = contentTitles[slug] || 'Education Content';
            this.liveAnnouncement = `${title} content loaded`;
            
            // Clear announcement after screen reader has time to read it
            setTimeout(() => {
                this.liveAnnouncement = '';
            }, 1000);
        }
    },
    computed: {
        phoneNumber() {
            return this.$store.state.phoneNumber;
        },
        telPhoneNumber() {
            return this.$store.state.phoneNumber?.replace(/[^+\d]/g, '');
        },
        getSlug() {
            return cleanPostfix(this.$route.params.slug?.toLowerCase()) || this.$route.params.slug;
        },
    },
}
</script>