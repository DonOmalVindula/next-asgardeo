"use client";

import { LogoutButton } from '@/components/buttons'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Profile() {
    const { data, status } = useSession();
    const { push } = useRouter();

    const profileData = data?.user?.profile;

    useEffect(() => {        
        if (status === 'unauthenticated') {
            push('/unauthorized');
        }
    }, [status])

    if (status !== "authenticated") {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center p-24">
                <p className="text-xl pb-24">Loading...</p>
            </main>
        )
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden p-24 m-8">
                <div className="mt-6">
                    <h2 className="font-semibold">Profile Information</h2>
                    <div className="mt-2 mb-8">
                        <p className="text-gray-300">
                            <span className="font-semibold">First Name:</span> {profileData?.given_name}
                        </p>
                        <p className="text-gray-300">
                            <span className="font-semibold">Last Name:</span> {profileData?.family_name}
                        </p>
                        <p className="text-gray-300">
                            <span className="font-semibold">Email:</span> {profileData?.username}
                        </p>
                    </div>
                </div>
            </div>
            <LogoutButton />
        </main>
    )
}
