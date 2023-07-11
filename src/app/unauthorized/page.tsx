"use client";

import { LoginButton } from "@/components/buttons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Unauthorized() {
    const { status } = useSession();
    const { push } = useRouter();

    useEffect(() => {        
        if (status === 'authenticated') {
            push('/profile');
        }
    }, [status])

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden p-24 m-8">
                <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
                <p>You are not authorized to access this page.</p>
            </div>
            <LoginButton />
        </main>
    );
};
