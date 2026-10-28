// Loads a third-party script on demand, once per URL. Use it from the component that needs the script
// instead of adding the script to the global <head>, which makes every page pay for it.
const pending = new Map();

export const MODEL_VIEWER_SRC = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';

export function loadScript(src, { id, module = false } = {}) {
  if (!import.meta.client) return Promise.resolve();
  if (pending.has(src)) return pending.get(src);

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    if (id) script.id = id;
    if (module) script.type = 'module';
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      pending.delete(src); // allow a retry
      script.remove();
      reject(new Error(`Failed to load ${src}`));
    };
    document.head.appendChild(script);
  });
  pending.set(src, promise);
  return promise;
}
