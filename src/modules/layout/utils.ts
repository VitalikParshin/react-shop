export const isSafariBrowser = () => {
  // From `react-browser-detection` npm package
  return Object.prototype.toString.call((window as any).HTMLElement).indexOf('Constructor') > 0
}

export const swipeEnabled = () => {
  return isSafariBrowser() == false;
}
