import { lazy } from "react";

const Home = lazy(() => import("./Public/Home"));
const Login = lazy(() => import("./Public/Login"));
const NotFound = lazy(() => import("./Public/NotFound"));
const Dashboard = lazy(() => import("./Private/Dashboard"));
const ProductAdmin = lazy(() => import("./Private/ProductAdmin"));
const CategoryAdmin = lazy(() => import("./Private/CategoryAdmin"));
const ProductDetail = lazy(() => import("./Private/ProductDetail"));

export { Home, Dashboard, ProductAdmin, CategoryAdmin, Login, ProductDetail, NotFound };
