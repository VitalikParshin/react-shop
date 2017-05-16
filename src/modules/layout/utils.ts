const isSafariBrowser = () => {
  // From `react-browser-detection` npm package
  return Object.prototype.toString.call((window as any).HTMLElement).indexOf('Constructor') > 0
}

const swipeEnabled = () => {
  return isSafariBrowser() == false;
}

export {
  swipeEnabled,
  isSafariBrowser,
}
