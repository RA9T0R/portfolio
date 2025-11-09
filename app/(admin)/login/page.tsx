// FILE: app/admin/login/page.tsx
"use client"

import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setError(error.message);
        } else {
            router.push('/dashboard');
        }
    };

    return (
            <div className="w-full flex justify-center bg-bg dark:bg-Dark_bg">
                <form
                    onSubmit={handleLogin}
                    className="w-full max-w-sm bg-surface dark:bg-Dark_surface p-8 rounded-2xl shadow-lg border border-subtext/20"
                >
                    <h1 className="text-3xl font-bold mb-6 text-center">Phongphat Login</h1>

                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-3"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="bg-bg dark:bg-Dark_bg border border-subtext/20 rounded-lg p-3"
                        />
                        <button
                            type="submit"
                            className="cursor-pointer bg-primary text-white font-bold py-3 rounded-lg uppercase"
                        >
                            Login
                        </button>
                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                    </div>
                </form>
            </div>
    );
};

export default LoginPage;