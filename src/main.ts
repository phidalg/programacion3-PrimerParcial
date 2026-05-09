import { checkAuthUser } from "./utils/auth";


export function guard(): void {

    const adminRoutes = ["/src/pages/admin/home/home.html"];
    const clientRoutes = ["/src/pages/client/home/home.html"];

    const currentPath = window.location.pathname;

    const isAdminRoute = adminRoutes.some(route => currentPath.includes(route));
    const isClientRoute = clientRoutes.some(route => currentPath.includes(route));

    if (isAdminRoute) {
        checkAuthUser(
            "/src/pages/auth/login/login.html",
            "admin"
        );
    }

    if (isClientRoute) {
        checkAuthUser(
            "/src/pages/auth/login/login.html",
            "client"
        );
    }

    document.body.style.visibility = "visible";
}