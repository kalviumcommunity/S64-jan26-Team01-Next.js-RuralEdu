import { auth } from "@/auth";

export default auth((req) => {
    const isLoggedIn = !!req.auth || !!req.cookies.get("session");
    const isOnDashboard = req.nextUrl.pathname.startsWith('/dashboard');

    if (isOnDashboard) {
        if (isLoggedIn) return;
        return Response.redirect(new URL('/login', req.nextUrl));
    } else if (isLoggedIn) {
        // If user is logged in and tries to access login/signup, redirect to dashboard
        /*
        const isOnAuth = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup');
        if (isOnAuth) {
             return Response.redirect(new URL('/dashboard', req.nextUrl));
        }
        */
    }
});

export const config = {
    matcher: ['/dashboard/:path*', '/home/:path*'],
};
