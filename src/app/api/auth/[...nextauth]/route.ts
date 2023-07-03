import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth"

declare module "next-auth/jwt" {
    interface JWT {
        provider: string;
        idToken: string;
        accessToken: string;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        {
            id: "asgardeo",
            name: "Asgardeo",
            clientId: process.env.ASGARDEO_CLIENT_ID,
            clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
            issuer: process.env.ASGARDEO_ISSUER,
            userinfo: `https://api.asgardeo.io/t/${process.env.ASGARDEO_ORGANIZATION_NAME}/oauth2/userinfo`,
            type: "oauth",
            wellKnown: `https://api.asgardeo.io/t/${process.env.ASGARDEO_ORGANIZATION_NAME}/oauth2/token/.well-known/openid-configuration`,
            authorization: {
                params:
                    { scope: "openid profile" }
            },
            idToken: true,
            checks: ["pkce", "state"],
            profile(profile) {                
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                }
            },
        },
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }: any) {
            // Adding the token to the session object so it's available in the client            
            if (token) {
                session.user.idToken = token.idToken;
            }

            return session;
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token!
                token.idToken = account.id_token!
            }

            return token;
        }
    },
    debug: true,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
