// ~/utils/db.js
const DB_NAME = 'state-db';
const DB_VERSION = 2;
const STORE_NAME = 'page_states';

export class AppDB {
    constructor() {
        this.db = null;
        this.request = indexedDB.open(DB_NAME, DB_VERSION);

        this.request.onupgradeneeded = (event) => {
            this.db = event.target.result;
            if (!this.db.objectStoreNames.contains(STORE_NAME)) {
                this.db.createObjectStore(STORE_NAME);
            }
        };

        this.request.onsuccess = (event) => {
            this.db = event.target.result;
        };

        this.request.onerror = (event) => {
            console.error('IndexedDB error:', event.target.errorCode);
        };
    }

    async get(key) {
        if (!this.db) {
            await this._openDb();
        }
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async set(key, value) {
        if (!this.db) {
            await this._openDb();
        }
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(value, key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    async delete(key) {
        if (!this.db) {
            await this._openDb();
        }
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    _openDb() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };
            request.onerror = (event) => reject(event.target.error);
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                if (!this.db.objectStoreNames.contains(STORE_NAME)) {
                    this.db.createObjectStore(STORE_NAME);
                }
            };
        });
    }
}