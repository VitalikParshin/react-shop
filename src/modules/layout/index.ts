import Header from "./Header/Header";
import Layout from "./Layout/Layout";
import Footer from "./Footer/Footer";
import Loading from "./Loading/Loading";
import SidebarCatalog from "./SidebarCatalog/SidebarCatalog";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import Catalog from "./Catalog/Catalog";
import CatalogTrigger from "./CatalogTrigger/CatalogTrigger";
import SubCatalog from "./SubCatalog/SubCatalog";
import FlatPages from "./FlatPages/FlatPages";
import MenuTrigger from "./MenuTrigger/MenuTrigger";
import Menu from "./Menu/Menu";

import reducer from "./reducer";

const isSafariBrowser = () => {
  // From `react-browser-detection` npm package
  return Object.prototype.toString.call((window as any).HTMLElement).indexOf('Constructor') > 0
}

const swipeEnabled = () => {
  return isSafariBrowser() == false;
}

export {
  Header,
  Layout,
  Footer,
  Loading,
  CatalogTrigger,
  Catalog,
  SubCatalog,
  SidebarCatalog,
  FlatPages,
  MenuTrigger,
  Menu,
  SidebarMenu,

  isSafariBrowser,
  swipeEnabled,
}
