// Global <head> (`app.head` in nuxt.config.ts), unhead format.
export const head = {
    htmlAttrs: { lang: 'en' },
    meta: [
      { name: 'apple-mobile-web-app-title', content: 'Adiamor' },
      { name: 'theme-color', content: '#ffffff', media: '(prefers-color-scheme: light)' },
      { name: 'theme-color', content: '#000000', media: '(prefers-color-scheme: dark)' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: 'https://cdn.adiamor.com/landing-pages/icons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/svg+xml', href: 'https://cdn.adiamor.com/landing-pages/icons/favicon.svg' },
      { rel: 'shortcut icon', href: 'https://cdn.adiamor.com/landing-pages/icons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'https://cdn.adiamor.com/landing-pages/icons/apple-touch-icon.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@48,300,0,0&display=swap',
        as: 'style',
        crossorigin: 'anonymous',
        onload: "this.onload=null;this.rel='stylesheet'"
      },
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Tangerine:wght@400;700&display=swap',
        as: 'style',
        crossorigin: "anonymous",
        onload: "this.onload=null;this.rel='stylesheet'"
      },
      { rel: "preconnect", href: "https://staticw2.yotpo.com" },
      // Loaded without blocking the first paint (same preload + onload swap as the Google Fonts above)
      {
        rel: 'preload',
        href: '//staticw2.yotpo.com/' + process.env.YOTPO_SITE_KEY + '/widget.css',
        as: 'style',
        onload: "this.onload=null;this.rel='stylesheet'"
      },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
    ],
    script: [
      {
        key: 'yotpo-widget',
        src: '//staticw2.yotpo.com/' + process.env.YOTPO_SITE_KEY + '/widget.js',
        defer: true,
        async: true,
        tagPosition: 'bodyClose'
      },
      {
        key: 'liveAgentInit',
        innerHTML: "(function (d, src, c) { var t = d.scripts[d.scripts.length - 1], s = d.createElement('script'); s.id = 'la_x2s6df8d'; s.defer = true; s.src = '" + process.env.LIVE_AGENT_SCRIPT + "'; s.onload = s.onreadystatechange = function () { var rs = this.readyState; if (rs && (rs != 'complete') && (rs != 'loaded')) { return; } c(this); }; t.parentElement.insertBefore(s, t.nextSibling); })(document, '" + process.env.LIVE_AGENT_SCRIPT + "', function (e) {});",
        type: 'text/javascript',
        defer: true,
        async: true,
        tagPosition: 'bodyClose'
      },
      {
        key: 'iubendaLoader',
        innerHTML: `(function (w, d) {
          var loader = function () {
            var s = d.createElement("script"),
                tag = d.getElementsByTagName("script")[0];
            s.src = "https://cdn.iubenda.com/iubenda.js";
            tag.parentNode.insertBefore(s, tag);
          };
          if (w.addEventListener) {
            w.addEventListener("load", loader, false);
          }
        })(window, document);`,
        type: 'text/javascript',
        defer: true,
        async: true,
        tagPosition: 'bodyClose'
      },
      {
        key: 'klaviyoOnsite',
        innerHTML: `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`,
        type: 'text/javascript',
        // No `charset` attribute: unhead treats a tag with `charset` as the <meta charset> and drops it as a duplicate,
        // so this stub was never rendered. Must run before GTM and any other tag that touches `window.klaviyo`: a tag that creates `window.klaviyo = []`
        // first makes this stub skip itself, and `klaviyo.identify` is then not a function.
        tagPosition: 'head',
        tagPriority: 'critical'
      },
      {
        src: "https://t.contentsquare.net/uxa/4d697e8bf4c84.js",
        defer: true,
        async: true,
        tagPosition: 'bodyClose'
      }
    ]
  }
