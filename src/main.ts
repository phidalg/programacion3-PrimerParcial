import { checkAuthUser } from "./utils/auth";


export function guard(): void {

    const adminRoutes = ["/src/pages/admin/home/home.html"];

    const currentPath = window.location.pathname;

    const isAdminRoute = adminRoutes.some(route => currentPath.includes(route));

    if (isAdminRoute) {
        checkAuthUser(
            "/src/pages/auth/login/login.html",
            "admin"
        );
    }

    document.body.style.visibility = "visible";
}