import { assetUrl } from '~/utils/assetUrl.js';
import { STATIC_ROUTES } from './staticRoutes';
import lang from '~/utils/commonLocale.js';

export function redirectionUrl(item) {
    let url = item ? item?.url_key : "";
    if (url?.includes("your-setting")) return `${correctUrl(url)}`;
    return productRedirection(item);
}

export function correctUrl(url) {
    let productUrl = url && url?.startsWith("/") ? url : `/${url}`;
    if (productUrl?.includes("your-setting")) return productUrl;
    // Links must already end with "/" (see 00.trailing-slash middleware); otherwise the client redirect uses replace
    // and the search page drops out of browser history, so Back skips it.
    const [, path, suffix] = productUrl.match(/^([^?#]*)(.*)$/);
    if (!path.endsWith("/") && !path.split("/").pop().includes(".")) return `${path}/${suffix}`;
    return productUrl;
}

export function productRedirection(value) {
    let url = value?.url_key ?? value?.href ?? value?.url;

    if (url) {
        let sku = value?.variant_sku ?? value?.sku;

        if (value && value.parent_id) {
            return `${correctUrl(url)}?sku=${sku}`;
        }

        return `${correctUrl(url)}`;
    }

    return value?.link ?? value?.href ?? value;
}

export function showStrikeThroughPrice(item, variant) {
    if (!item) return false;

    if (variant?.price) {
        if (variant.discounted_price) {
            return variant.discounted_price < variant.price ? variant.price : false;
        } else {
            return false;
        }
    }
    return item.discounted_price && item.discounted_price < item.price
        ? item.price
        : false;
}

export function fetchPriceData(item, variant) {
    if (variant?.price) {
        if (variant.discounted_price && variant.discounted_price < variant.price) {
            return variant.discounted_price;
        }
        return variant.price;
    }

    if (item?.price) {
        if (item.discounted_price && item.discounted_price < item.price) {
            return item.discounted_price;
        }
        return item.price;
    }

    return item.price;
}

export function fetchFirstProductImage(item) {
    const noImage = assetUrl('~/assets/images/no-image.webp');
    if (!item) return noImage;
    // Determine the product or image array
    const product = item.product ?? item;
    const productImages = Array.isArray(item) ? item : product?.images;

    if (!Array.isArray(productImages) || productImages.length === 0) return noImage;

    // Find the first image that has 'image' in type or view
    let firstImage = productImages.find(
        img => img?.type?.includes('image') || img?.view?.includes('image')
    ) ?? productImages[0]; // fallback to first image if none found

    if (firstImage) {
        firstImage = firstImage?.path ?? firstImage?.url ?? firstImage;
        if (typeof firstImage === 'string') {
            if (!firstImage.includes('.pdf') && !firstImage.includes('.json')) {
                return firstImage;
            }
            return noImage;
        }
    }

    return firstImage?.path ?? firstImage?.url ?? noImage;
}

export function skuToDisplay(sku) {
    if (!sku) return null;
    const splitIndex = sku.toLowerCase().indexOf('-d-');
    if (splitIndex !== -1) {
        const setting = sku.substring(0, splitIndex);
        const diamond = sku.substring(splitIndex + 1); // includes 'd-'
        return `${diamond}, ${setting}`;
    }
    return sku;
}

export function urlWithCategory(url) {
    return `/${url?.category}/search${url['sub-category'] ? `/${url['sub-category']}` : ''}`;
}

export function getCategoryType(code, subUrl = null) {
    const categoryMap = {
        earring: { action: 'updateEarring', getter: 'getEarring', key: 'earring', search_url: STATIC_ROUTES.DESIGN_SEARCH_EARRINGS },
        ring: { action: 'updateRing', getter: 'getRing', key: 'ring', search_url: STATIC_ROUTES.ENGAGEMENT_RINGS_SEARCH },
        necklace: { action: 'updateNecklace', getter: 'getNecklace', key: 'necklace', search_url: STATIC_ROUTES.DESIGN_SEARCH_NECKLACES },
    };

    categoryMap['engagement-rings'] = categoryMap['ring'];
    categoryMap['engagement-ring'] = categoryMap['ring'];

    const codeMatched = Object.keys(categoryMap).find(keyword =>
        code?.toLowerCase().includes(keyword)
    );
    const subUrlMatched = Object.keys(categoryMap).find(keyword =>
        subUrl?.toLowerCase().includes(keyword)
    );

    let matchedCategory = codeMatched && subUrlMatched ? codeMatched : false;

    if (!subUrl) {
        matchedCategory = codeMatched ? codeMatched : false;
    }

    if (subUrl?.toLowerCase().includes('diamond')) {
        matchedCategory = codeMatched || false;
    }
    if (code?.toLowerCase().includes('diamond')) {
        matchedCategory = subUrlMatched || false;
    }
    if (matchedCategory && categoryMap[matchedCategory]) {
        return categoryMap[matchedCategory]; // { action: '...', getter: '...' }
    } else {
        console.warn('Unknown category type from code or URL:', code, subUrl);
        return categoryMap['ring'];
    }
}

export function getProductImages(view, isCheckExtension, product = null, selectedVariant = null) {
    if (view) {
        if (product && product?.type == 'configurable' && product.variants?.length > 0) {
            if (selectedVariant && selectedVariant.images && selectedVariant.images.length) {
                let imgData = isCheckExtension ? selectedVariant.images?.find((el) => el.view == view && el.path.includes(view)) : selectedVariant.images?.find((el) => el.view == view);
                if (imgData) {
                    return imgData;
                }
            }
            if (selectedVariant && selectedVariant.images && selectedVariant.images.length == 0) {
                return '';
            }
            return '';
        }
        if (product && product.images && product.images.length) {
            let imgData = isCheckExtension ? product.images?.find((el) => el.view == view && el.path.includes(view)) : product.images?.find((el) => el.view == view);
            if (imgData) {
                return imgData;
            }
        }
    }
    if (view == 'front' && product?.type != 'configurable') {
        let path = defaultImage('images', product && product?.type == 'simple' ? 0 : 1, product, selectedVariant);
        return path;
    }
    return '';
}
export function defaultImage(type, position, product, selectedVariant) {
    if (selectedVariant && selectedVariant.images && selectedVariant.images.length) {
        // let imgData = selectedVariant.images?.find((el) => el.type == type && el.position == position);
        let imgData = selectedVariant.images?.find((el) => el.type == type);
        if (imgData) {
            return imgData;
        }
    }
    if (product && product.images && product.images.length) {
        let imgData = product.images?.find((el) => el.type == type);
        if (imgData) {
            return imgData;
        }
    }
    return product && product.images && product.images.length ? product.images[0] : null;
}

export function getGTMProductImage(view, isCheckExtension, product = null, selectedVariant = null) {
    const getImage = (images) =>
        images.find(el =>
            el.view == view &&
            (!isCheckExtension || el.path.includes(view))
        )?.path;

    if (selectedVariant?.images?.length) {
        const path = getImage(selectedVariant.images);
        if (path) return path;
    }

    if (product?.images?.length) {
        const path = getImage(product.images);
        if (path) return path;
    }

    if (view == 'front') {
        return defaultImage(
            'images',
            product?.type == 'simple' ? 0 : 1,
            product,
            selectedVariant
        );
    }

    return '';
}

export function getDescription(item) {
    let name = item?.type == 'bundle' ? item?.product?.short_description : item?.product?.name ?? item?.name;
    if (item?.additional && item?.additional?.attributes && item?.additional?.attributes.backing) {
        return name + ' with ' + item?.additional?.attributes.backing;
    }
    return name;
}

export function cleanPostfix(postfix) {
    return (postfix || '').replace(/\/+$/, '')
}

export function extractDominantColor(poster) {
    if (!poster) return '#ffffff';

    // Sample images are loaded by MediaImage component with cors
    // We can try to extract color directly from the poster image
    const img = new Image();
    img.crossOrigin = 'anonymous';

    return new Promise((resolve) => {
        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d', { willReadFrequently: true });

                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                ctx.drawImage(img, 0, 0);

                // Sample top-left 50×50 area for background color
                const sampleW = Math.min(10, img.naturalWidth);
                const sampleH = Math.min(10, img.naturalHeight);
                const imageData = ctx.getImageData(0, 0, sampleW, sampleH).data;

                let r = 0, g = 0, b = 0;
                const count = imageData.length / 4;

                for (let i = 0; i < imageData.length; i += 4) {
                    r += imageData[i];
                    g += imageData[i + 1];
                    b += imageData[i + 2];
                }

                resolve(`rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`);
            } catch (e) {
                resolve('#ffffff');
            }
        };

        img.onerror = () => {
            resolve('#ffffff');
        };

        img.src = poster;
    });
}

export function getAttr(attributes, code, defaultValue = null) {
    if (!Array.isArray(attributes)) return defaultValue;
    return attributes.find(x => x.code === code)?.value ?? defaultValue;
}

export function fetchSKULabel(product) {
    let attrFamily = product?.attribute_family_code || product?.product?.attribute_family_code;
    return (product?.type == 'simple' && attrFamily == 'certified_diamond') || product?.type == 'bundle' ? `${lang.diamondSku}` : `${lang.settingSku}`;
}