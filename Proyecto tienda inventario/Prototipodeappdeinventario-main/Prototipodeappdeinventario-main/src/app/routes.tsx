import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { InventoryPage } from "./pages/InventoryPage";
import { ProductFormPage } from "./pages/ProductFormPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { UsersPage } from "./pages/UsersPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "inventory", Component: InventoryPage },
      { path: "inventory/new", Component: ProductFormPage },
      { path: "inventory/:id/edit", Component: ProductFormPage },
      { path: "inventory/:id", Component: ProductDetailPage },
      { path: "users", Component: UsersPage },
    ],
  },
]);
