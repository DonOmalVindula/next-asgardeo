"use client";

import { LoginButton, LogoutButton } from '@/components/buttons'
import { useSession } from 'next-auth/react';

export default function Home() {
    const { data, status } = useSession();
    const profileData  = data?.user?.profile;

    if (status === "loading") {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <p className="text-xl pb-24">Loading...</p>
            </main>
        )
    }
    
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            { status === "authenticated" ? (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold">Welcome to Next.js + Asgardeo App</h1>
                    <p className="text-xl pb-24">You are logged in as {profileData?.username}!</p>
                    <LogoutButton/>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xl pb-24">You are not logged in!</p>
                    <LoginButton/>
                </div>
            ) }
        </main>
    )
}
