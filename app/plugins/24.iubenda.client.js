export default defineNuxtPlugin(() => {
  const $config = useRuntimeConfig()
  {
    // Get iubenda configuration
    const siteId = $config.public.iubendaSiteID;
    const cookiePolicyId = $config.public.iubendaCookiePolicyID;
    const lang = 'en';

    // Define iubenda global config
    window._iub = window._iub || {};
    window._iub.csConfiguration = {
        siteId,
        cookiePolicyId,
        lang,
        "countryDetection": true,
        "enableUspr": true,
        "gdprAppliesGlobally": false,
        "perPurposeConsent": true,
        "usprPurposes": "s,sh,adv",
        "whitelabel": false,
        "banner": {
            "acceptButtonCaptionColor": "white",
            "acceptButtonColor": "#5286cc",
            "acceptButtonDisplay": true,
            "backgroundColor": "white",
            "closeButtonRejects": true,
            "customizeButtonCaptionColor": "white",
            "customizeButtonColor": "#5286cc",
            "customizeButtonDisplay": true,
            "explicitWithdrawal": true,
            "listPurposes": true,
            "position": "float-bottom-left",
            "rejectButtonCaptionColor": "white",
            "rejectButtonColor": "#5286cc",
            "rejectButtonDisplay": true,
            "textColor": "black"
        }
    };

    // Dynamically load the iubenda script
    const script = document.createElement('script');
    script.src = 'https://cdn.iubenda.com/cs/iubenda_cs.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
})
