import { lazy } from "react";

const Home = lazy(() => import("./Public/Home"));
const Dashboard = lazy(() => import("./Private/Dashboard"));
const ProductAdmin = lazy(() => import("./Private/ProductAdmin"));
const CategoryAdmin = lazy(() => import("./Private/CategoryAdmin"));

export { Home, Dashboard, ProductAdmin, CategoryAdmin };
