"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export const LoginButton = () => {
    return (
        <button onClick={() => signIn("asgardeo")}>
            Sign in
        </button>
    );
};

export const LogoutButton = () => {
    const { data } = useSession();

    const handleLogout = () => {
        const idToken = data?.user?.idToken;

        if (idToken) {
            // Since next-auth does not support OIDC logout, we have to manually call the OIDC logout endpoint.
            signOut()
                .then(
                    () => window.location.assign(
                        process.env.NEXT_PUBLIC_ASGARDEO_SERVER_ORIGIN +
                        "/oidc/logout?id_token_hint=" + idToken + 
                        "&post_logout_redirect_uri=" + process.env.NEXT_PUBLIC_ASGARDEO_POST_LOGOUT_REDIRECT_URI
                    )
                );
        } else {
            signOut({ callbackUrl: "/" });
        }
    }

    return (
        <button onClick={() => handleLogout()}>
            Sign Out
        </button>
    );
};
