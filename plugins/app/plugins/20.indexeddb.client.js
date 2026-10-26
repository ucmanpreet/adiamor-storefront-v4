import { openDB } from 'idb';

export default defineNuxtPlugin((nuxtApp) => {
    // Initialize the database
    const initDB = async () => {
        try {
            return await openDB('storefront-db', 2, {
                upgrade(db) {
                    if (!db.objectStoreNames.contains('recent_viewed')) {
                        const store = db.createObjectStore('recent_viewed', { keyPath: 'sku' });
                        store.createIndex('family', 'family', { unique: false });
                        store.createIndex('skuPrefix', 'sku', { unique: false }); // New index to help find similar SKUs
                    } else {
                        console.log("Object store 'recent_viewed' already exists.");
                    }
                },
            });
        } catch (error) {
            console.error('Error initializing IndexedDB:', error);
            return null;
        }
    };

    // Function to add product data
    const addProduct = async (product) => {
        try {
            const db = await initDB();
            if (!db) return;

            const tx = db.transaction('recent_viewed', 'readwrite');
            const store = tx.objectStore('recent_viewed');

            if(product.family != 'certified_diamond'){
                // Extract the SKU prefix (e.g., "r23")
                const skuPrefix = product.sku.split('-')[0];

                // Get all products with the same SKU prefix
                const allProducts = await store.getAll();  // Get all products in the store
                const productsToDelete = allProducts.filter(p => p.sku?.startsWith(skuPrefix));  // Filter products by prefix

                // Delete all products with the same SKU prefix
                for (const productToDelete of productsToDelete) {
                    await store.delete(productToDelete.sku);
                }
            }

            // Add the new product
            const recentItem = {
                id: product.id,
                sku: product.sku,
                family: product.family || 'default_family',  // Dynamic attribute family
                timestamp: Date.now()  // Add timestamp for sorting
            };
            await store.put(recentItem);

            // Get all products after adding the new one
            const allProducts = await store.getAll();

            // If more than 10 products, remove the oldest one
            if (allProducts.length > 10) {
                // Sort by timestamp (oldest first)
                allProducts.sort((a, b) => a.timestamp - b.timestamp);

                // Remove the oldest product
                const oldestProduct = allProducts[0];
                await store.delete(oldestProduct.sku);
            }

            await tx.done;
        } catch (error) {
            console.error('Error adding product to IndexedDB:', error);
        }
    };

    const getRecentViewedByFamily = async (family) => {
        try {
            const db = await initDB();
            if (!db) return [];

            const tx = db.transaction('recent_viewed', 'readonly');
            const store = tx.objectStore('recent_viewed');
            const index = store.index('family');
            const products = family ? await index.getAll(family) : await index.getAll();

            // Sort products by timestamp in descending order (most recent first)
            return products.sort((a, b) => b.timestamp - a.timestamp);
        } catch (error) {
            console.error('Error getting recent viewed products:', error);
            return [];
        }
    };

    // Expose as $indexedDB
    nuxtApp.provide('indexedDB', {
        addProduct,
        getRecentViewedByFamily
    });
});
