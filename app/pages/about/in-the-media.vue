<template>
    <div>
        <div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pb-6 md:pb-14 flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-12">
            <!-- Sidebar navigation -->
            <AboutSidebar />

            <!-- Main content -->
            <div class="flex-1">
                <article class="space-y-4 md:space-y-10 divide-y divide-gray-200">
                    <header>
                        <h2 id="media-heading" class="font-normal text-lg md:text-xl lg:text-3xl">In The Media</h2>
                    </header>
                    <div
                        class="prose prose-sm prose-a:text-primary prose-hr:my-6 prose-h2:font-gill-sans prose-h2:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full">
                        <div>
                            <div class="logo-section">
                                <h2>As Featured In</h2>

                                <div class="flex flex-wrap gap-2 md:gap-4" aria-hidden="true">
                                    <a href="https://www.youtube.com/watch?v=BlkOhoF6gos?fs=1&amp;autoplay=1&amp;rel=0" tabindex="-1">
                                        <i class="nbc"></i>
                                    </a>

                                    <a href="https://www.youtube.com/watch?v=QGncGXngHbQ&amp;autoplay=1&amp;rel=0" tabindex="-1">
                                        <i class="this-is-la"></i>
                                    </a>

                                    <a href="https://www.youtube.com/watch?v=ruyWq5b7UWc&amp;autoplay=1&amp;rel=0" tabindex="-1">
                                        <i class="fyi"></i>
                                    </a>

                                    <a target="_blank" rel="noopener noreferrer"
                                        href="https://www.theknot.com/marketplace/adiamor-los-angeles-ca-972594?utm_source=vendor_website&amp;utm_medium=banner&amp;utm_term=53d43399-8b8e-4a5c-9352-a5df004d2988&amp;utm_campaign=vendor_badge_assets#reviews-area"
                                        tabindex="-1">
                                        <i class="the-knot"></i>
                                    </a>

                                    <a href="https://www.youtube.com/watch?v=gXdLsFdm5GY&amp;autoplay=1&amp;rel=0" tabindex="-1">
                                        <i class="telemundo"></i>
                                    </a>

                                    <a target="_blank" rel="noopener noreferrer"
                                        href="https://www.weddingwire.com/reviews/adiamor-los-angeles/30693d51ff1ea7da.html"
                                        tabindex="-1">
                                        <i class="wedding-wire"></i>
                                    </a>
                                </div>

                                <!-- logos images kept unchanged -->
                                <div class="flex flex-wrap gap-2 md:gap-4 justify-between">
                                    <a href="https://www.youtube.com/watch?v=BlkOhoF6gos?fs=1&amp;autoplay=1&amp;rel=0" aria-label="NBC">
                                        <img class="m-0" :src="$asset('~/assets/images/img/in-the-media/logo-nbc.webp')" alt="NBC">
                                    </a>

                                    <a href="https://www.youtube.com/watch?v=QGncGXngHbQ&amp;autoplay=1&amp;rel=0" aria-label="This is LA">
                                        <img class="m-0" :src="$asset('~/assets/images/img/in-the-media/logo-this-is-la.webp')" alt="This is LA">
                                    </a>

                                    <a href="https://www.youtube.com/watch?v=ruyWq5b7UWc&amp;autoplay=1&amp;rel=0" aria-label="FYI">
                                        <img class="m-0" :src="$asset('~/assets/images/img/in-the-media/logo-fyi.webp')" alt="fyi">
                                    </a>

                                    <a target="_blank" rel="noopener noreferrer"
                                        href="https://www.theknot.com/marketplace/adiamor-los-angeles-ca-972594?utm_source=vendor_website&amp;utm_medium=banner&amp;utm_term=53d43399-8b8e-4a5c-9352-a5df004d2988&amp;utm_campaign=vendor_badge_assets#reviews-area"
                                        aria-label="The Knot">
                                        <img class="m-0" :src="$asset('~/assets/images/img/in-the-media/logo-knot.webp')" alt="The Knot">
                                    </a>

                                    <a href="https://www.youtube.com/watch?v=gXdLsFdm5GY&amp;autoplay=1&amp;rel=0" aria-label="Telemundo">
                                        <img class="m-0" :src="$asset('~/assets/images/img/in-the-media/logo-telemundo.webp')" alt="Telemundo">
                                    </a>

                                    <a target="_blank" rel="noopener noreferrer"
                                        href="https://www.weddingwire.com/reviews/adiamor-los-angeles/30693d51ff1ea7da.html"
                                        aria-label="Wedding Wire">
                                        <img class="m-0" :src="$asset('~/assets/images/img/in-the-media/logo-wedding-wire.webp')" alt="Wedding Wire">
                                    </a>
                                </div>
                            </div>
                            <hr>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">

                                <!-- THIS IS LA -->
                                <div>
                                    <h3 class="mt-0" id="thisisla">This Is LA</h3>

                                    <div class="videothumb">
                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('QGncGXngHbQ',$event)"
                                            @keydown.enter.prevent="openVideo('QGncGXngHbQ',$event)"
                                            @keydown.space.prevent="openVideo('QGncGXngHbQ',$event)">
                                            <img class="m-0 w-full h-full"
                                                    alt="This is LA"
                                                    border="0"
                                                    :src="$asset('~/assets/images/img/in-the-media/thisisla_thumb.webp')">
                                        </a>
                                    </div>

                                    <div>
                                        Watch our This is LA segment.<br>
                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('QGncGXngHbQ',$event)"
                                            @keydown.enter.prevent="openVideo('QGncGXngHbQ',$event)"
                                            @keydown.space.prevent="openVideo('QGncGXngHbQ',$event)">
                                            Watch the video
                                        </a>
                                    </div>
                                </div>

                                <!-- Marry Me Today -->
                                <div>
                                    <h3 class="mt-0">Marry Me Today</h3>

                                    <div class="videothumb">
                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('Q3R-5o2i38o',$event)"
                                            @keydown.enter.prevent="openVideo('Q3R-5o2i38o',$event)"
                                            @keydown.space.prevent="openVideo('Q3R-5o2i38o',$event)">
                                            <img class="m-0 w-full h-full"
                                                    alt="Marry Me Today"
                                                    border="0"
                                                    :src="$asset('~/assets/images/img/in-the-media/marrymetoday_thumb.webp')">
                                        </a>
                                    </div>

                                    <div>
                                        Watch our Marry Me Today segment.<br>
                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('Q3R-5o2i38o',$event)"
                                            @keydown.enter.prevent="openVideo('Q3R-5o2i38o',$event)"
                                            @keydown.space.prevent="openVideo('Q3R-5o2i38o',$event)">
                                            Watch the video
                                        </a>
                                    </div>
                                </div>

                                <!-- TELE MUNDO -->
                                <div>
                                    <h3 class="mt-0">Telemundo</h3>

                                    <div class="videothumb">
                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('gXdLsFdm5GY',$event)"
                                            @keydown.enter.prevent="openVideo('gXdLsFdm5GY',$event)"
                                            @keydown.space.prevent="openVideo('gXdLsFdm5GY',$event)">
                                            <img class="m-0 w-full h-full"
                                                    alt="Telemundo"
                                                    border="0"
                                                    :src="$asset('~/assets/images/img/in-the-media/telemundo_thumb.webp')">
                                        </a>
                                    </div>

                                    <div>
                                        Watch our Telemundo segment.<br>
                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('gXdLsFdm5GY',$event)"
                                            @keydown.enter.prevent="openVideo('gXdLsFdm5GY',$event)"
                                            @keydown.space.prevent="openVideo('gXdLsFdm5GY',$event)">
                                            Watch the video
                                        </a>
                                    </div>
                                </div>

                                <!-- BUZZFEED -->
                                <div>
                                    <h3 class="mt-0" id="buzzfeed">Buzzfeed</h3>

                                    <div class="videothumb">
                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('ruyWq5b7UWc',$event)"
                                            @keydown.enter.prevent="openVideo('ruyWq5b7UWc',$event)"
                                            @keydown.space.prevent="openVideo('ruyWq5b7UWc',$event)">
                                            <img class="m-0 w-full h-full"
                                                    alt="Buzzfeed"
                                                    border="0"
                                                    :src="$asset('~/assets/images/img/in-the-media/buzzfeed_thumb.webp')">
                                        </a>
                                    </div>

                                    <div>
                                        Watch our Buzzfeed segment.<br>
                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('ruyWq5b7UWc',$event)"
                                            @keydown.enter.prevent="openVideo('ruyWq5b7UWc',$event)"
                                            @keydown.space.prevent="openVideo('ruyWq5b7UWc',$event)">
                                            Watch the clip
                                        </a><br>

                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('zEnEfbAOWbI',$event)"
                                            @keydown.enter.prevent="openVideo('zEnEfbAOWbI',$event)"
                                            @keydown.space.prevent="openVideo('zEnEfbAOWbI',$event)">
                                            Watch the full video
                                        </a>
                                    </div>
                                </div>

                                <!-- NBC -->
                                <div>
                                    <h3 class="mt-0">NBC</h3>

                                    <div class="videothumb">
                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('BlkOhoF6gos',$event)"
                                            @keydown.enter.prevent="openVideo('BlkOhoF6gos',$event)"
                                            @keydown.space.prevent="openVideo('BlkOhoF6gos',$event)">
                                            <img class="m-0 w-full h-full"
                                                    alt="NBC"
                                                    border="0"
                                                    title="NBC"
                                                    :src="$asset('~/assets/images/img/in-the-media/nbc_screenshot2.webp')">
                                        </a>
                                    </div>

                                    <div>
                                        <p class="!leading-normal !mb-1.5">
                                            Watch our NBC interview with Adiamor COO Sam Sarkisian about the benefits of buying
                                            diamonds and fine jewelry online.
                                        </p>

                                        <a href="#"
                                            role="button"
                                            tabindex="0"
                                            @click.prevent="openVideo('BlkOhoF6gos',$event)"
                                            @keydown.enter.prevent="openVideo('BlkOhoF6gos',$event)"
                                            @keydown.space.prevent="openVideo('BlkOhoF6gos',$event)">
                                            Watch the video
                                        </a>
                                    </div>
                                </div>

                            </div>
                            <hr>
                            <h2>Press Releases</h2>
                            <h3>Adiamor Engagement Ring &amp; Wedding Rings Featured on Television Show on A+E’s FYI
                            </h3>
                            <p>Los Angeles, CA - February 14, 2015</p>
                            <p>Adiamor engagement ring and wedding rings were recently featured on the television show
                                “Marry Me Today” on A+E’s FYI Network. The reality show produced by The Knot is about an
                                ambitious groom-to-be Brandon that proposes and gets married the same day to his
                                girlfriend Jolie. The show follows Brandon and The Knot’s Liliana Vazquez as they
                                planned everything from the proposal to completing the ceremony within one week.</p>
                            <p>One of the most important parts of the show, the proposal, and the wedding are the
                                engagement ring and wedding rings provided by Adiamor. Brandon and Lilliana visited
                                Adiamor to pick out her dream 8-9mm oval cut Morganite engagement ring that Jolie
                                referred to as “The One!” on her The Knot board as well as his and her wedding bands.
                            </p>
                            <p>The experience was shared on Twitter with Tweets live and afterwards by @adiamor, @FYI,
                                @theknot, @cheapchicas, and @44blue and on other social media including Facebook and
                                Instagram. Even Brandon and Jolie commented on Adiamor social pages.</p>
                            <p>Read more about the show and Adiamor on the Adiamor blog by clicking <a
                                    href="https://www.adiamor.com/blog/celebrity-engagement/morganite-engagement-ring-designed-for-marry-me-today">this link</a>.
                                You can view the entire "Marry Me Today" show by watching it <a
                                    href="https://www.fyi.tv/shows/fyi-specials/videos/marry-me-today">at this link</a>.</p>
                            <h4>About FYI</h4>
                            <p>FYI is a division of A+E Television Networks. It is a joint venture of the Disney-ABC
                                Television Group and Hearst Corporation. FYI covers a wide range of experiences and
                                stories that reflect how people live their lives today, not defined by just one interest
                                or passion.</p>
                            <h4>About The Knot</h4>
                            <p>The Knot is the nation's top wedding resource, reaching almost every couple in America
                                through the #1 wedding website TheKnot.com, mobile apps, The Knot local and national
                                wedding magazines, The Knot book series, and syndicated columns in newspapers
                                nationwide. The Knot is a brand of XO Group Inc.</p>
                            <h4>About Adiamor</h4>
                            <p>Adiamor is an Internet jewelry retailer that specializes in engagement and wedding band
                                designs. The rings are made in house at the company’s locations in the Los Angeles
                                jewelry district. For over five decades, Adiamor has been creating hand-crafted, unique
                                engagement and wedding rings. Adiamor helps couples turn their day of love into a
                                lifetime of memories.</p>
                            <hr>
                            <h3>Adiamor Diamonds &amp; Fine Jewelry Featured on NBC Universal’s Telemundo</h3>
                            <p>Los Angeles, CA - February 13, 2015</p>
                            <p>Adiamor was recently featured on the television show Acceso Total on NBC Universal’s
                                Telemundo. Entertainment host Elva Saray visited Adiamor to talk with jewelry designer
                                Jennifer Sarkisian and one of the heads of manufacturing Tomas Zapata. They discussed
                                diamond engagement rings and jewelry gifts for Valentine’s Day. Jennifer identified what
                                is hot for engagement rings and described a sampling of pendants, earrings, eternity
                                bands, three stone rings, and other diamond jewelry items. Tomas discussed the
                                manufacturing and diamond setting process and showed some of the techniques that are
                                used by the Adiamor artisans.</p>
                            <p>The segment also included information about the 4Cs of diamond grading which are carat
                                weight, cut, clarity, and color. There were several closeups of gorgeous round, princess
                                cut, emerald cut, and heart shaped diamonds which are a popular choice for Valentine’s.
                            </p>
                            <p>One of the topics that was discussed is how safe it is to buy diamonds and fine jewelry
                                online from Adiamor. The two main reasons identified were GIA diamond certification is
                                very strict so you know what you are paying for and all items come with a 30 day money
                                back guarantee.</p>
                            <p>The segment was aired on Telemundo 52 in Los Angeles and affiliates in Las Vegas, Tucson,
                                Phoenix, Denver, Houston, Dallas, San Antonio and Chicago.</p>
                            <h4>About Telemundo</h4>
                            <p>Telemundo, a division of NBCUniversal, is a world-class company leading the media
                                industry in the production and distribution of high quality Spanish language content
                                across its multiplatform portfolio to U.S. Hispanics and audiences around the world.</p>
                            <h4>About Adiamor</h4>
                            <p>Adiamor is an online jewelry retailer that specializes in engagement rings, wedding
                                bands, fine jewelry, and loose diamonds. The rings and jewelry are made in house at the
                                company’s locations in the Los Angeles jewelry district. For over five decades, Adiamor
                                has been creating hand-crafted, unique bridal and diamond jewelry. Adiamor helps couples
                                turn their day of love into a lifetime of memories.</p>
                            <hr>
                            <h3>Adiamor Jewelry Premium Prize for Family Paths Fundraiser Featuring Twitter's Janet Van
                                Huysse</h3>
                            <p>Los Angeles, CA - Sept 22, 2014</p>
                            <p>Adiamor donated Diamond Heart Key Necklace as the premium prize for Family Paths
                                fundraiser featuring Twitter's Janet Van Huysse as the keynote. The Women's Leadership
                                Luncheon and raffle will be held Thursday, September 25 in San Francisco.</p>
                            <p>This Thursday Family Paths, a nonprofit community service organization that strengthens
                                family relationships by providing mental health and supportive services, welcomes
                                Twitter's head of Leadership Development and Inclusion Janet Van Huysse as a keynote
                                speaker. Her lecture, "The Engaged Workplace: Impacting Home and Community from
                                Hyperlocal to Global", is part of the organization's Women's Leadership Luncheon Series.
                            </p>
                            <p>
                                Adiamor is a proud supporter of this charity’s valuable work. For this event, the
                                respected jeweler has generously donated one of its Diamond Heart Key Necklaces as the
                                premium prize for the group’s raffle fundraiser. Family Paths spokesperson Kimberly Cohn
                                (MFT, RDT/BCT) received this eye-catching piece with enthusiasm, saying "It is a perfect
                                complement to our agency vision and event theme of 'A Safe and Secure Home for Every
                                Child' … and our heart-home logo.”
                                Jeweler Sam Sarkisian, owner and CEO of Adiamor, voiced his support for Family Paths'
                                continuing contributions to families, stating "We are honored to provide jewelry that
                                will raise money for a great cause."
                            </p>
                            <p>
                                Family Paths is delighted to present Ms. Van Huysse as this year's keynote speaker and
                                welcomes you to share in her professional insights and inspiring message. The Women's
                                Leadership Luncheon and raffle will be held at 155 Sansome St. in San Francisco,
                                September 25 from 11:30AM-1:30PM. For more information about the non-profit Family Paths
                                and to register for the event, visit http://www.FamilyPaths.org.
                                About Family Paths For more than 40 years, Family Paths has worked to strengthen
                                children and families through promoting healthy relationships, providing mental health
                                outreach, and offering education and support services.
                            </p>
                            <h4>About Adiamor</h4>
                            <p>For five decades, Adiamor has made engagement and wedding day dreams come true by
                                creating unique, hand-crafted diamond engagement, wedding, and fine jewelry.
                                Headquartered in the historic jewelry district in downtown Los Angeles, Adiamor has
                                worked with thousands of couples to design and manufacture the perfect jewelry for any
                                occasion.</p>
                            <hr>
                            <h3>Style Expert Lilliana Vazquez Helps Friend Pick Adiamor Engagement Ring</h3>
                            <p>Los Angeles, CA (PRWEB) July 15, 2014</p>
                            <p>Adiamor is pleased to have helped Style Expert Lilliana Vazquez to the “best day ever!”
                                when she and a friend came by our Downtown Los Angeles location to help a friend pick an
                                engagement ring. She shared her experience with fans and friends via both Twitter
                                @cheapchicas and Instagram.</p>
                            <p>During the visit, she shared a picture of one of her favorites, the Hand-Crafted Cushion
                                Halo Setting R2839 which can be seen in rose gold with a 1.75 carat round diamond in the
                                center on the Adiamor blog. This ring features 38 brilliant cut diamonds set around the
                                center stone and down the sides of the band. The Cushion Halo Setting is also available
                                in both 14K and 18K white and yellow gold, as well as platinum. Other center stones are
                                also available for this ring setting. Other rings similar to the one Vazquez shared
                                through social media include the Braided Pavé Setting, the Pavé Split Shank Setting and
                                the Petite Milgrain and Pavé Engagement Setting.</p>
                            <p>About Lilliana Vazquez: With more than 250 appearances on broadcast television, Lilliana
                                Vazquez is well known for her tips and advice on affordable, yet fashionable, style. She
                                has been seen on shows such as TBS’ Movie and a Makeover and is currently the Style
                                Correspondent for Daily Candy and a host on New York LIVE on NBC New York. She is also
                                the founder and editor-in-chief of The Cheap Chica’s Guide to Style, which is a must
                                have for every frugal fashionista.</p>
                            <p>About Adiamor: Online jewelry retailer Adiamor specializes in engagement and wedding ring
                                designs, which are made in-house at the company’s location in the jewelry district of
                                Los Angeles. For five decades, Adiamor has been creating unique, hand-crafted diamond
                                engagement and wedding rings. Adiamor helps couples turn their day of love into a
                                lifetime of memories.</p>
                            <hr>
                            <h3>Five Best Marriage Proposal Ideas for Valentine's Day from Adiamor</h3>
                            <p>Los Angeles, CA (PRWEB) February 1, 2010</p>
                            <p>Founded in 1998, Adiamor Diamond Engagement Rings has helped thousands of customers find
                                just the right diamond engagement ring at just the right price. This year, in
                                commemoration of Valentine’s Day, Adiamor is enhancing its tradition of service with a
                                list of the most interesting ways to propose.</p>
                            <ul class="service">
                                <li>Assemble a photo album that chronicles your relationship from the beginning. The
                                    album itself can be a new, high-quality item or it can be a vintage piece in
                                    excellent condition. Make sure the last page has a special picture of the two of you
                                    with the caption ‘Will You Marry Me?” underneath, and don’t forget to leave some
                                    space for the ‘She Said Yes!” picture.</li>
                                <li>There are several variations on the theme of surprising a bride-to-be with a
                                    marriage proposal on Valentine's Day. Rent a billboard along a popular commute path
                                    or the scoreboard of a favorite hometown sports team. Have a magician materialize
                                    the ring from out of nowhere or ask the waiter at a fancy restaurant present it on a
                                    tray of rich desserts. Whatever the method, surprise is the key; it’s best to match
                                    the proposal to the day’s activities.</li>
                                <li>Travel back in time to your first date together and re-create it as faithfully as
                                    possible. Near the end of the date get down on one knee, pull out the engagement
                                    ring and propose. This idea will be easier for some than for others, but properly
                                    executed it will be the memory of a lifetime.</li>
                                <li>A public venue proposal is fun and exciting, but especially when surrounded by loved
                                    ones. Maintain the surprise by going on a romantic date for two but arrange for
                                    friends and family to show up “unexpectedly” a few at a time. The Best Man should be
                                    the last to arrive, handing over the box with the diamond engagement ring in it as
                                    you drop to one knee and propose in front of everyone.</li>
                                <li>Lead the bride-to-be on a treasure hunt, working through the clues together to find
                                    the hidden engagement ring treasure. Write little notes that lead through every room
                                    of the house or make pointers out of sticks and stones along the path of a favorite
                                    hiking trail. Whatever the place, each clue should have its own reward that builds
                                    anticipation for the next; favorite candy bar, a single rose, a box of truffles,
                                    theater tickets - each leading up to X marking the spot of a diamond engagement ring
                                    and a proposal of marriage!</li>
                            </ul>
                            <p>Adiamor’s Marketing Manager Sarah Harris says, “Valentine’s Day is the perfect day to
                                propose. It’ll make your engagement date easy to remember and give you one more
                                anniversary to celebrate.” The perfect ring on the perfect day is the life-long dream of
                                every bride-to-be, and Adiamor has been helping customers find both since 1998.</p>
                            <p>Adiamor.com carries an extensive collection of the finest diamond engagement rings and
                                exquisite diamond jewelry for any occasion. Adiamor prides itself on tremendous value
                                and outstanding customer service and offers a 100% Satisfaction guarantee to prove it.
                                Visit Adiamor.com today and let us help turn that special day into that perfect day.</p>
                            <hr>
                            <h3>Affordable Diamond Engagement Rings to Win Her Heart and Pad Your Wallet</h3>
                            <p>Los Angeles, CA (PRWEB) January 4, 2010</p>
                            <p>Adiamor agrees that diamonds are forever but in light of the economic times spending a
                                bag full of cash is not the wisest choice. Saying "I love you" should not break the
                                bank.</p>
                            <p>Spending a small fortune for a diamond engagement ring does not improve the chances of a
                                successful relationship, as a matter of fact it may cause stress in the relationship if
                                paying for it puts a strain on finances. Financial straits are the number one reason
                                that marriages fall apart.</p>
                            <p>In response to the growing demand for affordable diamond engagement rings, there have
                                been quite a few companies that have opened up online venues. Online venues allow the
                                seller to reduce costs that are associated with typical retail jewelry stores. Adiamor,
                                has stepped up to become one of the leaders in online sales of affordable diamond
                                engagement rings.</p>
                            <p>Adiamor.com has a wide selection of loose diamonds, diamond jewelry and engagement
                                settings. This Los Angeles Company has excelled, one of the reasons being that they
                                manufacture all of the jewelry that they sell, right in the heart of the Los Angeles
                                diamond district. Reducing their costs even more, and passing even greater savings onto
                                their customers.</p>
                            <p>Owner, Sam Sarkisian, attributes Adiamor's success to the incredible savings that
                                purchasing online and buying direct from the manufacturer brings. "Getting rid of the
                                middle man and his cut, helps the consumer keep more cash in their own pocket instead of
                                lining someone else's." Of course the triple A rating that Adiamor prides themselves on
                                from the Better Business Bureau may also be a key factor to their success in the online
                                diamond engagement ring market.</p>
                            <p>Adiamor.com allows the client the option to personally select which diamond and setting
                                is right for them. Prices are very affordable and the selection is unique which allows
                                Adiamor's customers the ability to design and choose their diamond and ring from
                                beginning to end. Custom selection in Diamonds and settings is definitely a hot ticket
                                with the romance crowd. Who can say no to a high quality, and still affordable diamond
                                engagement ring built specifically for her?</p>
                            <p>Purchasing a diamond engagement ring through an online vendor is a great way to save some
                                money; a couple of precautionary steps will go a long way in picking the right vendor.
                                Make sure you are familiar with and fully understand the return and exchange policies
                                and check with the BBB for the company's rating. Do your research and know what you are
                                buying by understanding how diamonds are graded and evaluated, and don't get in over
                                your head, buy what you can afford. And finally, buy from a well trusted source.</p>
                            <hr>
                            <h3>5 Common Engagement Ring Shopping Mistakes -- And How to Avoid Them</h3>
                            <p>Los Angeles, CA (PRWEB) December 7, 2009</p>
                            <p>The Holiday shopping season is well underway, and joining the masses are the hopeful but
                                often clueless men charged with finding a perfect engagement ring for their June
                                bride-in-waiting. While a diamond engagement ring is a lifetime investment, many
                                engagement ring shoppers research their next vehicle or television purchase more
                                thoroughly, often proving costly.</p>
                            <p>Diamond engagement ring shoppers make the following five mistakes all too frequently,
                                which are easily prevented, according to Sarah Harris, Marketing Manager at Adiamor, a
                                jewelry manufacturer and online vendor based in Los Angeles:</p>
                            <p>
                                1. Not learning about the four Cs of diamonds: Unsuspecting shoppers for diamond
                                engagement rings could find themselves at the mercy of a "used car salesman," if they
                                don't prepare themselves beforehand.
                                The solution: Know the four Cs: cut, color, clarity and carat. Cut refers to a diamond's
                                proportion and how it affects its brilliance. It is regarded to be the most important
                                trait. The color of a diamond is graded on a scale and has a significant impact on its
                                value. Clarity denotes inclusions and blemishes within and on a diamond's surface, which
                                can detract from its beauty. The weight of a diamond is measured in carats.
                            </p>
                            <p>2. Shopping at a mall: Traditional, brick-and-mortar retailers in shopping malls have
                                extremely high overhead, which they pass on to customers, said Harris. "Commercial
                                locations have to tack on so much money to see any kind of profit."</p>
                            <p>The solution: Consider buying direct from a manufacturer. Direct online manufacturers
                                "can typically beat commercial retailers by 30 to 40 percent," Harris said.</p>
                            <p>
                                3. Not comparison shopping: "Many customers fear shopping for diamond engagement rings
                                online because of the negative stigma associated with it," Harris said.
                                The solution: Shop online with confidence. The days of consumer wariness regarding
                                online transactions are over and the online commerce regulation sites like Bizrate and
                                the Better Business Bureau help consumers shop with confidence. Buyers should steer
                                clear of online diamond engagement ring retailers without positive feedback on
                                regulation sites.
                            </p>
                            <p>4. Settling for the first ring: "Make sure to look at a variety of rings," said Harris.
                                Engagement ring shoppers are often pressured by overzealous salespersons more concerned
                                with making a commission than providing valuable customer service.</p>
                            <p>The solution: Take a peek at the ring recipient's jewelry box to see what pieces she
                                already has. This is often the best clue in selecting a ring that will be a good match.
                            </p>
                            <p>
                                5. Not being familiar with a store's return policy: "If a store's policy is too
                                stringent, and you are not satisfied with your ring, you might be stuck with it - which
                                can be a huge problem," Harris said.
                                The solution: Make sure the store you plan to do business with has a reasonable return
                                policy. Adiamor offers a 30-day policy, which allows shoppers plenty of time to resolve
                                any issue.
                            </p>
                            <hr>
                            <h3>Online Diamond and Jewelry Retailer Adiamor Offers Savings on Diamonds and Diamond
                                Engagement Rings</h3>
                            <p>Los Angeles, CA (PRWEB) February 12, 2009</p>
                            <p>Adiamor, offering diamonds and engagement rings online for over 10 years, announces a
                                special promotion in partnership with Google. On diamond engagement ring and loose
                                diamond orders, Adiamor customers can save $50 by using Google Checkout.</p>
                            <p>Online diamond and jewelry retailer Adiamor is now offering $50 in savings for diamond
                                engagement rings and loose diamond orders when paying with a credit card through Google
                                Checkout (expired).</p>
                            <p>Adiamor offers GIA certified loose diamonds, AGS certified loose diamonds, and engagement
                                rings at Adiamor.com at remarkable savings. Also, all orders for diamonds and engagement
                                rings include free FedEx Priority Overnight shipping and a 30-day no-risk return policy.
                                Now, these savings can be combined with an additional $50 savings through Google
                                Checkout (expired).</p>
                        </div>
                    </div>
                </article>
            </div>
        </div>
        <!-- Video Modal -->
        <Modal
            v-if="showModal"
            :heading="'Watch the video'"
            @close="closeModal"
            maxWidthClass="max-w-3xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-heading"
        >
            <div class="aspect-video overflow-hidden">s
                <iframe
                    v-if="videoId"
                    ref="videoFrame"
                    :src="`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    frameborder="0"
                    class="w-full h-full rounded"
                    title="YouTube video player"
                ></iframe>
            </div>
        </Modal>
    </div>
</template>

<script setup>
import Modal from '~/components/ui/Modal.vue';
import AboutSidebar from '~/components/layout/AboutSidebar.vue';

const { $bus } = useNuxtApp();

const showModal = ref(false);
const videoId = ref(null);
const lastFocusedElement = ref(null);
const videoFrame = ref(null);

function openVideo(id, event) {
    lastFocusedElement.value = event?.currentTarget || document.activeElement;

    videoId.value = id;
    showModal.value = true;

    document.body.style.overflow = 'hidden';

    $bus.emit(
        'aria-announce',
        'Video dialog opened. YouTube video is now playing.'
    );

    nextTick(() => {
        videoFrame.value?.focus?.();
    });
}

function closeModal() {
    showModal.value = false;
    videoId.value = null;

    document.body.style.overflow = '';

    $bus.emit(
        'aria-announce',
        'Video dialog closed.'
    );

    nextTick(() => {
        lastFocusedElement.value?.focus?.();
    });
}

function handleKeydown(e) {
    if (e.key === 'Escape' && showModal.value) {
        closeModal();
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeydown);
});

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeydown);
});
</script>