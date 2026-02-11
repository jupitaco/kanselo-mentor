import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import {
    EncryptData,
    UserSession,
    UserDataAndAccessToken,
    UserData,
} from "@/types/auths";

const USER_SESSION_KEY = "kanselo-mentor-session";
const EXPIRY_TIME =
    process.env.NODE_ENV === "development" ? 2 * 60 * 60 * 1000 : 10 * 60 * 1000;

const secretKey = process.env.SECRET_KEY!;

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: EncryptData) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${EXPIRY_TIME} sec from now`)
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });

        return payload;
    } catch (error) {
        console.error("Failed to verify session:", error);
        return null;
    }
}

export async function setCookie(userData: UserDataAndAccessToken) {
    const expires = new Date(Date.now() + EXPIRY_TIME);
    const session = await encrypt({ userData, expires });
    const cookieStore = await cookies();

    cookieStore.set(USER_SESSION_KEY, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expires,
        sameSite: "lax",
        path: "/",
    });
}

export async function updateSession(request: NextRequest) {
    const user = await getUserSession();

    const path = request.nextUrl.pathname;

    if (!user && path !== "/signin") {
        return NextResponse.redirect(
            new URL(`/signin?redirect=${path}`, request.url),
        );
    }

    if (!user) {
        return NextResponse.next();
    }

    // Refresh the session so it doesn't expire
    user.expires = new Date(Date.now() + EXPIRY_TIME);
    const res = NextResponse.next();
    res.cookies.set({
        name: USER_SESSION_KEY,
        value: await encrypt(user),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: user.expires,
    });
    return res;
}

export async function getUserSession(): Promise<UserSession | null> {
    const cookieStore = await cookies();

    const session = cookieStore.get(USER_SESSION_KEY)?.value;

    if (!session) return null;

    return await decrypt(session);
}

export async function getUser(): Promise<UserData | undefined> {
    const session = await getUserSession();

    if (!session?.userData) {
        return redirect("/signin");
    }

    return session.userData?.user;
}

export async function logout() {
    const cookieStore = await cookies();

    cookieStore.set(USER_SESSION_KEY, "", { expires: new Date(0) });
}
