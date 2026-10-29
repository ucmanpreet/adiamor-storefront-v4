// Puts a virtualized row back at the same distance from the top of the viewport that it had when the shopper left.
// Row heights above it are estimates after a reload, so a saved scrollY lands on the wrong row; instead jump to the
// row and correct by how far its rendered top is from the saved one (twice, because measuring rows shifts layout).
export function restoreRowAnchor(virtualizer, rowIndex, anchorTop) {
  virtualizer.scrollToIndex(rowIndex, { align: 'start' });
  let stopped = false;
  const stop = () => { stopped = true; };
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((ev) => window.addEventListener(ev, stop, { once: true, passive: true }));
  const adjust = () => {
    if (stopped) return;
    const row = [...document.querySelectorAll(`[data-index="${rowIndex}"]`)].find((el) => el.parentElement?.style?.height);
    if (!row) {
      // the list can briefly collapse and clamp the scroll position; jump to the row again
      virtualizer.scrollToIndex(rowIndex, { align: 'start' });
      return;
    }
    const delta = row.getBoundingClientRect().top - anchorTop;
    if (Math.abs(delta) > 2) window.scrollBy(0, delta);
  };
  // the grid's offset in the document keeps changing while banners and filters render, so keep correcting for a while
  [250, 600, 1000, 1500, 2200, 3000].forEach((ms) => setTimeout(adjust, ms));
}

// Viewport top of the virtualized row that holds the link/pair the shopper is opening (null if it is not rendered).
export function getRowAnchorTop(toPath, toFullPath, isPair) {
  const rows = [...document.querySelectorAll('[data-index]')].filter((el) => el.parentElement?.style?.height);
  const pairKeys = (url) => {
    const params = new URLSearchParams((url || '').split('?')[1] || '');
    return `${params.get('first_pair_key')}|${params.get('second_pair_key')}`;
  };
  const trim = (url) => (url || '').split('?')[0].replace(/\/+$/, '');
  const row = rows.find((el) => {
    if (!isPair) {
      if ([...el.querySelectorAll('a[href]')].some((a) => a.getAttribute('href').split('?')[0] === toPath)) return true;
      // list rows have no link: match the product prop of a child component instead
      return [...el.querySelectorAll('*')].some((n) => {
        const props = n.__vueParentComponent?.props;
        return trim((props?.diamond || props?.product || props?.item)?.url_key) === trim(toPath);
      });
    }
    // the row's own template holds no product prop; a child (the header) does
    const child = [...el.querySelectorAll('*')].find((n) => n.__vueParentComponent?.props?.product?.pair_url_key);
    return !!child && pairKeys(child.__vueParentComponent.props.product.pair_url_key) === pairKeys(toFullPath);
  });
  return row ? Math.round(row.getBoundingClientRect().top) : null;
}
