// This Cloudflare Worker acts as the edge router for the frontend domain.

/**
 * Adds clickjacking-prevention headers to a Response.
 * Returns a new Response with the same body/status but with X-Frame-Options
 * and Content-Security-Policy: frame-ancestors set.
 */
function withSecurityHeaders(response) {
  const res = new Response(response.body, response);
  res.headers.set('X-Frame-Options', 'SAMEORIGIN');
  res.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
  return res;
}

const config = {
  // --- Redirect Lookup ---
  REDIRECT_API_URL: "https://afd.adiamor.com/api/redirect-lookup",
};

const LEGACY_PREFIX = "/products/";
const CATEGORY_PREFIXES = [
  "/lab-diamonds/",
  "/diamonds/",
  "/engagement-rings/",
  "/wedding-rings/",
  "/earrings/",
  "/pendants/",
  "/bracelets/",
  "/jewelry/",
  "/necklaces/",
  "/gifts/",
];
const PAGES_PREFIXES = [
  "/policies/",
  "/education/",
  "/services/",
  "/your-setting"
];
const API_END_POINTS = {
  product : "products-seo",
  page : "page-seo"
};

const BLOG_ORIGIN = "https://wordpress-blog-origin.adiamor.com";
const BLOG_PREFIX = "/blog";

export default {
  /**
   * The fetch handler is executed for every incoming request that matches a Worker route.
   * @param {Request} request The incoming request object.
   * @param {Env} env The environment variables/bindings (KV namespaces, etc.).
   * @param {ExecutionContext} ctx The context object for the request.
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname; // The URL path being requested (e.g., /old-product.html)

    // SECRET shared between Worker and Caddy
    const ORIGIN_SECRET = env.CADDY_ORIGIN_SECRET;

    console.log(`Incoming Path: "${path}"`);

    // --- Order of Operations is CRITICAL for efficiency and correctness ---

    // 1. Handle Sitemap Requests:
    //    Check if the path starts with '/sitemap'. Sitemaps are direct file fetches from S3.
    if (path.startsWith('/sitemap.xml') || path.startsWith('/sitemaps')) {
      const s3SitemapBaseUrl = 'https://adiamor-sitemap-prod.s3.us-west-2.amazonaws.com';
      const s3SitemapUrl = s3SitemapBaseUrl + path;

      // Fetch the sitemap content directly from S3.
      // This response will be passed through to the client.
      return fetch(s3SitemapUrl);
    }


    // Force trailing slash for 'your-setting' AND preserve query params
    if (path === '/your-setting') {
      const newUrl = new URL('/your-setting/', request.url);
      newUrl.search = url.search;
      return Response.redirect(newUrl.toString(), 301);
    }

    // 2. Handle /blog Requests:
    if (url.pathname === BLOG_PREFIX || url.pathname.startsWith(BLOG_PREFIX + "/")) {
      // Strip /blog from request path
      let newPath = url.pathname.slice(BLOG_PREFIX.length);
      if (newPath === "" || newPath === "/") newPath = "/";

      const targetUrl = new URL(BLOG_ORIGIN);
      targetUrl.pathname = newPath;
      targetUrl.search = url.search;

      // Build headers for origin request
      const reqHeaders = new Headers(request.headers);

      // Shared secret for origin protection
      reqHeaders.set("X-Origin-Key", ORIGIN_SECRET);

      // Tell origin what the real external host + scheme are
      reqHeaders.set("X-Forwarded-Host", url.host);   // e.g. adiamor.com
      reqHeaders.set("X-Forwarded-Proto", "https");

      // (Optional) let Cloudflare set the correct Host for the origin
      reqHeaders.delete("Host");

      // Prepare request init
      const init = {
        method: request.method,
        headers: reqHeaders,
      };

      // Include body for non-GET/HEAD
      if (request.method !== "GET" && request.method !== "HEAD") {
        init.body = await request.clone().arrayBuffer();
      }

      const originResponse = await fetch(targetUrl.toString(), init);

      // Clone the origin response so we keep all headers (including multiple Set-Cookie)
      const response = new Response(originResponse.body, originResponse);

      // Strip hop-by-hop headers that shouldn't be forwarded
      const hopByHop = [
        "connection",
        "keep-alive",
        "proxy-authenticate",
        "proxy-authorization",
        "te",
        "trailer",
        "transfer-encoding",
        "upgrade",
      ];
      for (const header of hopByHop) {
        response.headers.delete(header);
      }

      // Make absolutely sure we never leak the shared secret
      response.headers.delete("X-Origin-Key");

      // Note: do NOT touch Set-Cookie, Location, or Cache-Control

      return withSecurityHeaders(response);
    }

    // 3. Handle 301 Redirect Requests:
    //    Check the Cloudflare KV store for a redirect mapping.
    //    'env.REDIRECTS' refers to the KV namespace binding.
    let newPath = await env.REDIRECTS.get(path);

    console.log(`KV Lookup Result for "${path}": ${newPath}`);

    if (newPath) {
      // --- Sanitize Target URL (Strip /products/ or /product/) ---
      const prefixRegex = /^\/?products?\//i;

      if (prefixRegex.test(newPath)) {
          console.log(`Sanitizing dirty KV value: ${newPath}`);
          newPath = newPath.replace(prefixRegex, '');

          // Ensure the new path starts with '/' so it is treated
          // as root-relative by the URL constructor.
          if (!newPath.startsWith('/')) {
              newPath = '/' + newPath;
          }
      }

      // A redirect mapping was found in KV!
      // Construct the full new URL using the original request's origin (domain)
      // and the new path retrieved from KV.
      const newUrl = new URL(newPath, url.origin);

      // Preserve original query parameters (e.g., ?source=campaign) and fragment (e.g., #section)
      // This is crucial for SEO link equity and analytics.
      newUrl.search = url.search;
      newUrl.hash = url.hash;

      // Check if the destination is the same as the current URL.
      // We use 'pathname' + 'search' to compare effectively.
      const currentRequestPath = url.pathname + url.search;
      const targetRedirectPath = newUrl.pathname + newUrl.search;

      if (currentRequestPath === targetRedirectPath) {
        console.warn(`Skipping KV self-redirect loop for: ${path}`);
        // If it's a loop, we break out and let the request proceed to the next step (SEO/SSR)
      } else {
        console.log(`Redirecting to: ${newUrl.toString()}`)
        // Issue a permanent (301) redirect response.
        // Response.redirect automatically sets the Location header and appropriate status.
        return Response.redirect(newUrl.toString(), 301);
      }
    }


    // 3b. Early 404 for junk/spam URL patterns
    //     Block legacy file extensions and known spam paths that can never
    //     be valid pages. Placed after KV lookup so legitimate redirects
    //     for legacy URLs are still honoured.
    const JUNK_EXTENSIONS = /\.(html|htm|aspx|php|jsp|cgi)$/i;
    const JUNK_PREFIXES = ['/query/', '/home/detailredirect', '/pdfview/', '/diamond/imagerequest'];
    const lowerPathForJunk = path.toLowerCase();

    if (JUNK_EXTENSIONS.test(path) || JUNK_PREFIXES.some(p => lowerPathForJunk.startsWith(p))) {
      console.log(`Junk URL blocked: "${path}"`);
      return new Response('Not Found', {
        status: 404,
        headers: { 'X-Robots-Tag': 'noindex' },
      });
    }

    // 4. Handle Dynamic Redirects from API
    // For any products which are of type of simple but have a configurable
    // parent, we want the simple products to be redirected to the main
    // parent product.
    const dynamicRedirectResponse = await handleDynamicRedirects(request);

    if (dynamicRedirectResponse) {
      return dynamicRedirectResponse;
    }

    // --- P0 SEO Fix: Canonical lowercase path normalization ---
    // Many legacy URLs, Google Shopping feeds, and old backlinks use mixed-case
    // paths (e.g., /Lab-Diamonds/, /Engagement-Rings/). The category prefix
    // matching in step 5 below is case-sensitive, so mixed-case paths bypass
    // SEO injection and fall through to the SPA which returns 404.
    //
    // This 301 redirect consolidates all case variants to the canonical
    // lowercase URL, preserving link equity and fixing ~97% of the 953K GSC
    // 404 errors.
    //
    // POSITION: Intentionally placed AFTER KV redirect lookup (step 3) and
    // dynamic redirects (step 4) so that existing mixed-case KV keys
    // (e.g., "/Diamonds" → "/diamonds") continue to resolve correctly.
    const lowerPath = path.toLowerCase();
    if (path !== lowerPath) {
      const canonicalUrl = new URL(request.url);
      canonicalUrl.pathname = lowerPath;
      console.log(`Case normalization: "${path}" -> "${lowerPath}"`);
      return Response.redirect(canonicalUrl.toString(), 301);
    }

    // 5. Handle Product Pages with Edge-Side Rendering for SEO
    let slug = null;
    let type = 'product';
    if (path.startsWith(LEGACY_PREFIX)) {
      slug = path.substring(LEGACY_PREFIX.length);
    } else {
      // Check if the path starts with any of the page prefixes
      const pagePrefix = PAGES_PREFIXES.find((prefix) =>
        path.startsWith(prefix)
      );
      if (pagePrefix && path.length >= pagePrefix.length) {
        slug = path.replace(/^\/+|\/+$/g, '');
        type = "page";
      }

      // Check if the path starts with any of the category prefixes
      const matchedPrefix = CATEGORY_PREFIXES.find((prefix) =>
        path.startsWith(prefix)
      );
      if (
        matchedPrefix &&
        !path.includes("/search/") &&
        path.length > matchedPrefix.length
      ) {
        slug = path.replace(/^\/+|\/+$/g, '');
      }

      if (
        matchedPrefix &&
        path.includes("/search/") &&
        path.length > matchedPrefix.length
      ) {
        slug = path.replace(/^\/+|\/+$/g, '');
        type = "page";
      }
    }

    if (slug) {
      const CACHE_TTL_SECONDS = 3600; // Cache for 1 hour
      const cache = caches.default;
      let response = await cache.match(request);

      if (response) {
        console.log(`Cache HIT for: ${path}`);
        return withSecurityHeaders(response);
      }

      console.log(`Cache MISS for: ${path}`);

      console.log(slug);
      // Fetch the base Nuxt app from Pages and the SEO data from your API in parallel
      const pagePromise = env.ASSETS.fetch(request);
      const apiSearch = new URLSearchParams(url.search);
      apiSearch.set('slug', slug);

      console.log(`https://afd.adiamor.com/api/${API_END_POINTS[type]}/?` + apiSearch.toString());
      const apiPromise = fetch(`https://afd.adiamor.com/api/${API_END_POINTS[type]}/?` + apiSearch.toString());

      const [pageResponse, apiResponse] = await Promise.all([pagePromise, apiPromise]);

      const newHeaders = new Headers(pageResponse.headers);
      newHeaders.set('Cache-Control', `public, max-age=${CACHE_TTL_SECONDS}`);
      newHeaders.set('X-Frame-Options', 'SAMEORIGIN');
      newHeaders.set('Content-Security-Policy', "frame-ancestors 'self'");

      let injectSeo = false;
      let productData = null;

      if (apiResponse.ok) {
        // API found data -> Inject SEO meta tags
        injectSeo = true;

        try {
          productData = await apiResponse.json();

          // FORCE 'product_bundle' for 'your-setting'
          // This ensures the JSON-LD and Images are generated.
          if (slug === 'your-setting') {
              productData.type = 'product_bundle';
          }
          // For other pages, keep default behavior
          else if (productData.type !== 'product_bundle') {
              productData.type = type;
          }
        } catch (e) {
          console.error('Failed to parse SEO API response:', e);
          productData = null;
          injectSeo = false;
        }
      } else if (apiResponse.status === 404) {
        // Product confirmed not found — redirect removed diamonds to filtered search
        const redirectTarget = buildDiamondSearchRedirect(path);
        if (redirectTarget) {
          const redirectUrl = new URL(redirectTarget, url.origin);
          console.log(`Removed product redirect: "${path}" -> "${redirectUrl.pathname}${redirectUrl.search}"`);
          return Response.redirect(redirectUrl.toString(), 301);
        }
        // Non-diamond categories: fall through to serve SPA as-is
      }

      let finalBody = pageResponse.body;

      // Inject SEO if we have data
      if (injectSeo && productData) {
        // Assiging the product type
        if(!productData.type) productData.type = type;

        const rewriter = new HTMLRewriter()
          .on('title', new ElementRemover())
          .on('meta[name="title"]', new ElementRemover())
          .on('meta[name="description"]', new ElementRemover())
          .on('meta[name="keywords"]', new ElementRemover())
          .on('link[rel="canonical"]', new ElementRemover())
          .on('meta[property^="og:"]', new ElementRemover())
          .on('meta[data-hid="og:title"]', new ElementRemover())
          .on('meta[data-hid="og:description"]', new ElementRemover())
          .on('meta[data-hid="og:image"]', new ElementRemover())
          .on('meta[data-hid="og:url"]', new ElementRemover())
          .on('meta[data-hid="og:type"]', new ElementRemover())
          .on('meta[data-n-head="ssr"]', new ElementRemover())
          .on('head', new HeadAndStructuredDataInjector(productData));
        // Transform expects a response or stream, we give it the original response
        // Note: Use the rewriter to transform the body stream
        const transformed = rewriter.transform(pageResponse);
        finalBody = transformed.body;
      }

      // Create a new response so we can set Cache-Control headers
      const finalResponse = new Response(finalBody, {
        status: 200,
        statusText: 'OK',
        headers: newHeaders
      });

      // Cache the generated page for future requests. ctx.waitUntil ensures this doesn't block the response.
      ctx.waitUntil(cache.put(request, finalResponse.clone()));

      return finalResponse;
    }

    // 6. Fallback to Cloudflare Pages (Serve the VueStorefront Application):
    //    If the request was not for a sitemap and no redirect was found,
    //    pass the request to your Cloudflare Pages deployment.
    //    'env.ASSETS.fetch(request)' is the standard way to do this when using Cloudflare Pages.
    return withSecurityHeaders(await env.ASSETS.fetch(request));
  }
};


/**
 * For removed diamond products (SEO API 404), builds a redirect URL to the
 * category search page with filters parsed from the URL slug.
 *
 * Slug pattern (after case normalization):
 *   /{category}/{carat}-ct-{color}-{clarity}-{cut}-cut-{shape}-diamond/{id}
 *   /{category}/{color}-{clarity}-{cut}-cut-{shape}-diamond/{id}
 *
 * @param {string} path  The lowercase URL pathname.
 * @returns {string|null} Redirect path with query string, or null if not a parseable diamond URL.
 */
const DIAMOND_PREFIXES = ['/lab-diamonds/', '/diamonds/'];

function buildDiamondSearchRedirect(path) {
  const matchedPrefix = DIAMOND_PREFIXES.find(p => path.startsWith(p));
  if (!matchedPrefix) return null;

  const afterPrefix = path.substring(matchedPrefix.length);
  const slugPart = afterPrefix.split('/')[0];
  const match = slugPart.match(
    /^(?:([\d.]+)-ct-)?([\w])-([\w]+)-([\w-]+)-cut-([\w]+)-diamond$/i
  );
  if (!match) return null;

  const [, carat, color, clarity, cut, shape] = match;
  const params = new URLSearchParams({
    diamond_shape: shape.toLowerCase(),
    diamond_color_grade: color.toLowerCase(),
    diamond_clarity_grade: clarity.toLowerCase(),
    diamond_cut_grade: cut.toLowerCase(),
  });

  if (carat) {
    const caratNum = parseFloat(carat);
    if (!isNaN(caratNum)) {
      const min = Math.max(0.01, Math.floor(caratNum * 0.8 * 100) / 100);
      const max = Math.ceil(caratNum * 1.2 * 100) / 100;
      params.set('diamond_carat_weight', JSON.stringify({ min, max }));
    }
  }

  // /lab-diamonds/ → /diamonds/search/lab-grown, /diamonds/ → /diamonds/search
  const searchPath = matchedPrefix === '/lab-diamonds/'
    ? '/diamonds/search/lab-grown'
    : '/diamonds/search';

  return `${searchPath}?${params.toString()}`;
}


/**
 * Checks with an external API to see if the current URL needs a redirect.
 * @param {Request} request The incoming request.
 * @returns {Response | null} A Response object if a redirect is needed, otherwise null.
 */
async function handleDynamicRedirects(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  console.log('Dynamic Redirect Handling');

  const matchedPrefix = CATEGORY_PREFIXES.find((prefix) => path.startsWith(prefix));

  if (request.method !== 'GET' || !matchedPrefix || path.includes('/search') || path.length <= matchedPrefix.length) {
    return null;
  }

  console.log('Dynamic Redirect Handling: ' +  path);

  try {
    const normalized = path.replace(/^\/+|\/+$/g, '');
    const lastSegment = normalized.split('/').pop();

    // Build variants to try against the redirect API.
    // This covers cases where DB stores: "diamonds/slug", "slug", "/diamonds/slug", "/slug"
    const variants = Array.from(new Set([
      normalized,
      '/' + normalized,
      lastSegment,
      '/' + lastSegment
    ]));

    console.log('Dynamic Redirect variants to try:', variants);

    for (const urlKey of variants) {
      if (!urlKey) {
        continue;
      }

      console.log(`Attempting redirect lookup for url_key: "${urlKey}"`);

      const apiResponse = await fetch(config.REDIRECT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ url_key: urlKey }),
      });

      if (!apiResponse.ok) {
        console.log(`Redirect API returned ${apiResponse.status} for "${urlKey}"`);
        continue;
      }

      const data = await apiResponse.json();
      console.log('Redirect API response for', urlKey, data);

      if (data && data.action === 'redirect' && data.redirectTo) {
        return Response.redirect(data.redirectTo, data.status || 301);
      }
    }
  } catch (error) {
    console.error('Error in URL resolver:', error);
  }

  return null;
}


/**
 * Escapes HTML special characters to prevent injection in meta tag attributes.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Infers image MIME type from URL extension. Defaults to image/jpeg.
 */
function getImageMimeType(url) {
  if (!url) return 'image/jpeg';
  const ext = url.split('?')[0].split('.').pop()?.toLowerCase();
  const types = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp' };
  return types[ext] || 'image/jpeg';
}

/**
 * Helper to remove existing tags to prevent duplicates
 */
class ElementRemover {
  element(element) {
    // Get the 'name' attribute of the meta tag being processed
    const name = element.getAttribute('name');

    // 1. Do not remove viewport tag.
    if (name === 'viewport') {
      return;
    }

    // 2. Do not remove charset definition
    if (element.getAttribute('charset')) {
      return;
    }

    // 3. For everything else (old descriptions, keywords, og tags), remove them.
    element.remove();
  }
}

/**
 * This class injects meta tags and crucial JSON-LD structured data into the <head> of the document.
 */
class HeadAndStructuredDataInjector {
  constructor(productData) {
    this.productData = productData;
  }

  element(element) {
    if (this.productData.type == 'page'){
      element.append(`<title>${escapeHtml(this.productData.title)}</title>`, { html: true });
      element.append(`<meta name="title" content="${escapeHtml(this.productData.meta_title)}">`, { html: true });
      element.append(`<meta name="description" content="${escapeHtml(this.productData.meta_description)}">`, { html: true });
      element.append(`<meta name="keywords" content="${escapeHtml(this.productData.meta_keywords)}">`, { html: true });
      element.append(`<link rel="canonical" href="${this.productData.canonical_url}" />`, { html: true });

      return;
    }

    if (this.productData.type === 'product_bundle') {
      element.append(`<title>${escapeHtml(this.productData.title)}</title>`, { html: true });
      element.append(`<meta name="description" content="${escapeHtml(this.productData.meta_description)}">`, { html: true });
      element.append(`<meta name="keywords" content="${escapeHtml(this.productData.meta_keywords)}">`, { html: true });
      element.append(`<link rel="canonical" href="${this.productData.canonical_url}" />`, { html: true });

      // OG Tags (This makes the image appear on Facebook/Slack/Pinterest)
      element.append(`<meta property="og:type" content="product" />`, { html: true });
      element.append(`<meta property="og:title" content="${escapeHtml(this.productData.meta_title)}" />`, { html: true });
      element.append(`<meta property="og:description" content="${escapeHtml(this.productData.meta_description)}" />`, { html: true });
      element.append(`<meta property="og:url" content="${this.productData.canonical_url}" />`, { html: true });
      element.append(`<meta property="og:image" content="${this.productData.og_image_url}" />`, { html: true });
      element.append(`<meta property="og:image:type" content="${getImageMimeType(this.productData.og_image_url)}" />`, { html: true });
      element.append(`<meta property="og:image:width" content="1200" />`, { html: true });
      element.append(`<meta property="og:image:height" content="630" />`, { html: true });
      element.append(`<meta name="pinterest-rich-pin" content="true" />`, { html: true });

      // JSON-LD for Bundles
      const bundleStructuredData = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": this.productData.name,
        "image": this.productData.og_image_url,
        "description": this.productData.description,
        "sku": this.productData.sku,
        "brand": { "@type": "Brand", "name": "Adiamor" },
        "offers": {
          "@type": "Offer",
          "url": this.productData.canonical_url,
          "priceCurrency": this.productData.currency,
          "price": this.productData.price,
          "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          "availability": `https://schema.org/${this.productData.availability}`
        }
      };
      element.append(`<script type="application/ld+json">${JSON.stringify(bundleStructuredData)}</script>`, { html: true });
      return;
    }

    element.append(`<title>${escapeHtml(this.productData.name)}</title>`, { html: true });
    element.append(`<meta name="description" content="${escapeHtml(this.productData.meta_description)}">`, { html: true });
    element.append(`<meta name="keywords" content="${escapeHtml(this.productData.meta_keywords)}">`, { html: true });
    element.append(`<link rel="canonical" href="${this.productData.canonical_url}" />`, { html: true });

    element.append(`<meta property="og:type" content="product" />`, { html: true });
    element.append(`<meta property="og:title" content="${escapeHtml(this.productData.meta_title)}" />`, { html: true });
    element.append(`<meta property="og:description" content="${escapeHtml(this.productData.meta_description)}" />`, { html: true });
    element.append(`<meta property="og:url" content="${this.productData.canonical_url}" />`, { html: true });
    element.append(`<meta property="og:image" content="${this.productData.og_image_url}" />`, { html: true });
    element.append(`<meta property="og:image:type" content="${getImageMimeType(this.productData.og_image_url)}" />`, { html: true });
    element.append(`<meta property="og:image:width" content="1200" />`, { html: true });
    element.append(`<meta property="og:image:height" content="630" />`, { html: true });
    element.append(`<meta name="pinterest-rich-pin" content="true" />`, { html: true });

    // Inject JSON-LD Structured Data for rich results in Google
    const structuredData = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": this.productData.name,
      "image": this.productData.og_image_url,
      "description": this.productData.description,
      "sku": this.productData.sku,
      "offers": {
        "@type": "Offer",
        "url": this.productData.canonical_url,
        "priceCurrency": this.productData.currency,
        "price": this.productData.price,
        "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        "availability": `https://schema.org/${this.productData.availability}` // e.g., "InStock"
      }
    };
    element.append(`<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`, { html: true });
  }
}