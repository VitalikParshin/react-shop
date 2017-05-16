import reducer from "./reducer";
import * as model from "./model";
import * as utils from "./utils";

import Header from "./Header/Header";
import Layout from "./Layout/Layout";
import Footer from "./Footer/Footer";
import Loading from "./Loading/Loading";
import Menu from "./Menu/Menu";
import SidebarCatalog from "./SidebarCatalog/SidebarCatalog";
import SidebarMenu from "./SidebarMenu/SidebarMenu";
import Catalog from "./Catalog/Catalog";
import CatalogTrigger from "./CatalogTrigger/CatalogTrigger";
import SubCatalog from "./SubCatalog/SubCatalog";
import FlatPages from "./FlatPages/FlatPages";
import MenuTrigger from "./MenuTrigger/MenuTrigger";
import HomeTrigger from "./HomeTrigger/HomeTrigger";
import {swipeEnabled} from "./utils";

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
  HomeTrigger,

  model,
  reducer,
  utils,
}
