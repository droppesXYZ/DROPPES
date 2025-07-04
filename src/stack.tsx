import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    // Páginas customizadas para manter o design do app
    signIn: "/login",
    signUp: "/register",
    afterSignIn: "/dashboard",
    afterSignUp: "/dashboard",
    accountSettings: "/settings",
  },
});
