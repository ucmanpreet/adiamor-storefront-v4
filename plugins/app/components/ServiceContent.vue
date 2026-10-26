<template>
  <div class="flex-1 prose-p:my-2 prose-hr:my-6 prose-strong:font-semibold w-full">

    <!-- AFTER YOU ORDER -->
    <article
      v-if="getRouteSlug === 'after-you-order'"
      class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full"
      aria-labelledby="after-order-title"
    >
      <h1 id="after-order-title" class="mb-4 text-xl sm:text-2xl font-normal">
        After You Order
      </h1>

      <section>
        <p>
          Years of experience makes the difference. Adiamor takes great pride in our collection of fine diamond jewelry.
          With over 30 years of experience in this profession, we can guarantee to meet and exceed your expectations.
          Our knowledgeable graduate gemologists are on staff to assist you every step of the way until you choose an
          engagement ring that's ideal for you. This section explains each stage in detail after placing your order.
        </p>

        <hr aria-hidden="true">

        <h2>Confirming Your Order</h2>
        <p>
          As soon as you click Place My Order, an automated email will be sent to the address you provided.
          This email serves as a confirmation that your order has been received. The email contains a summary
          of your order along with your individual order number. At this stage your order is reviewed by one
          of our sales representatives to ensure the accuracy of the details. In the unlikely event that there
          is an issue with your order which requires further attention, a representative will promptly contact
          you to review your order.
        </p>

        <h2>The Very Best Quality</h2>
        <p>
          Once your order has been confirmed, we will then begin the manufacturing process. Orders confirmed by
          two o'clock (Pacific Time) will enter the manufacturing phase the same day. The manufacturing
          process lasts about 3-5 business days depending on the complexity of the item. After your ring is
          manufactured specifically to your request of metal and ring size, the mounting is then put into the
          diamond setting process, where our professional diamond setters will carefully mount each side stone
          and center diamond.
        </p>

        <h2>High Quality Control Standards</h2>
        <p>
          Before each order is shipped every diamond and its certificate is inspected by our graduate
          gemologists to ensure compliance. Your ring is also carefully inspected one last time to double
          check the ring size, metal and manufacturing, diamond setting, and top quality workmanship.
        </p>

        <h2>From Our Office to Your Doorstep</h2>
        <p>
          After your ring has passed inspection, it is now ready for shipping. All engagement rings ordered
          from Adiamor are presented in an elegant lacquered wood ring box. The ring box is then packaged
          securely in a medium Federal Express box. Orders are shipped priority overnight free of charge.
          Your package will arrive the next morning by 10:30am at the indicated shipping address.
          Each order is insured for the full value until signed for by the recipient.
        </p>

        <p>
          Start shopping for your perfect
          <NuxtLink :to="STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH">engagement ring</NuxtLink>,
          <NuxtLink :to="STATIC_ROUTES.EARRINGS_SEARCH_DIAMOND">diamond earrings</NuxtLink>
          or other timeless keepsake today!
        </p>
      </section>
    </article>

    <!-- PAYMENT OPTIONS -->
    <article
      v-if="getRouteSlug === 'payment-options'"
      class="prose prose-sm prose-a:text-primary prose-headings:font-normal prose-headings:uppercase prose-h2:text-lg md:prose-h2:text-2xl prose-h2:mt-7 md:leading-7 max-w-full"
      aria-labelledby="payment-options-title"
    >
      <h1 id="payment-options-title" class="mb-4 text-xl sm:text-2xl font-normal">
        Payment Options
      </h1>

      <section>
        <p>For your convenience, Adiamor accepts the following forms of payment:</p>

        <ul class="flex gap-3 items-center" role="list" aria-label="Accepted payment methods">
          <li>
            <nuxt-img provider="cdn" class="m-0" src="/landing-pages/payment%20card/visa_icon.webp?updatedAt=1748415127682" alt="Visa"/>
          </li>
          <li>
            <nuxt-img provider="cdn" class="m-0" src="/landing-pages/payment%20card/mastercard_icon.webp?updatedAt=1748415127794" alt="Mastercard"/>
          </li>
          <li>
            <nuxt-img provider="cdn" class="m-0" src="/landing-pages/payment%20card/amex_icon.webp?updatedAt=1748415127861" alt="American Express"/>
          </li>
          <li>
            <nuxt-img provider="cdn" class="m-0" src="/landing-pages/payment%20card/discover_icon.webp?updatedAt=1748415127622" alt="Discover"/>
          </li>
          <li>
            <nuxt-img provider="cdn" class="m-0" src="/landing-pages/payment%20card/paypal_icon.webp?updatedAt=1748415127660" alt="PayPal"/>
          </li>
        </ul>

        <hr aria-hidden="true">

        <!-- Affirm -->
        <section aria-labelledby="affirm-heading">
          <img
            src="https://cdn-assets.affirm.com/images/buttons/42x205-blue.svg"
            alt="Affirm financing"
            class="float-right mt-6"
          >

          <h2 id="affirm-heading">Financing with Affirm</h2>
          <p>We have partnered with Affirm to give you a simple way to make your purchase with no hidden fees.</p>

          <p>
            Easy monthly payments: Provide some basic information and get a real-time credit decision to split your purchase into monthly payments.
            Rates from 0% to 36% APR with loans of 3, 6, or 12 month terms.
          </p>

          <p>
            Flexible repayment: Simply pay your monthly bill using a debit card, bank transfer at
            <a href="https://www.affirm.com/pay" target="_blank" rel="noopener noreferrer" aria-label="Visit affirm dot com slash pay, opens in a new tab">affirm.com/pay</a>.
          </p>

          <a
            href="https://www.affirm.com/disclosures"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Affirm Lending Disclosure, opens in a new tab"
          >
            Affirm Lending Disclosure
          </a>
        </section>

        <hr aria-hidden="true">

        <!-- PayPal -->
        <section aria-labelledby="paypal-heading">
          <img
            src="https://www.paypal.com/en_US/i/btn/btn_xpressCheckout.gif"
            alt="PayPal Express Checkout"
            class="float-right mt-6"
          >

          <h2 id="paypal-heading">PayPal</h2>
          <p>
            After selecting PayPal you will be directed to log in to your pre-existing PayPal account or
            create a new account. After logging in you will select your preferred billing, shipping and
            payment options; upon completion you will be prompted to provide consent for Adiamor to charge
            your PayPal account.
          </p>
        </section>

        <hr aria-hidden="true">

        <section aria-labelledby="wire-heading">
          <h2 id="wire-heading">Bank Wire</h2>
          <p>
            Once you have confirmed Wire Transfer as your payment method, we will send you an email containing instructions
            for initiating the bank wire transfer. All payments made by bank wire receive a 1.5% discount.
          </p>
        </section>

        <hr aria-hidden="true">

        <section aria-labelledby="zelle-heading">
          <h2 id="zelle-heading">Zelle</h2>
          <p>Zelle may be available as an alternative payment method when arranged directly with an Adiamor representative.</p>
          <p>
            Zelle is not currently offered as a standard option during online checkout. If Zelle is appropriate for your order,
            an Adiamor representative will provide payment instructions directly.
          </p>
          <p>
            For your security, only send Zelle payments using instructions provided through an official @adiamor.com email address.
            If you would like to verify any payment instructions before sending funds, please contact Adiamor at
            <a href="tel:+18776275094" aria-label="Call Adiamor at 1-877-627-5094">1-877-627-5094</a>.
          </p>
        </section>

        <hr aria-hidden="true">

        <section aria-labelledby="split-heading">
          <h2 id="split-heading">Split Payment</h2>
          <p>
            If you need to split your payment between two credit cards or would like to speak with a customer support
            representative, select Pay By Phone and one of our support specialists will contact you.
          </p>
        </section>

      </section>
    </article>

  </div>
</template>
<script>
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name : 'ServiceContent',
    computed: {
        getRouteSlug() {
            return this.$route.params.slug;
        },
        STATIC_ROUTES() {
            return STATIC_ROUTES;
        }
    }
}
</script>
