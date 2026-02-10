"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function GoogleLoginButton({ text = "Sign in with Google" }: { text?: string }) {
    return (
        <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full py-4 rounded-2xl border-2 border-gray-100 font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-gray-700"
        >
            <img src="https://img.icons8.com/color/48/google-logo.png" className="w-5 h-5" alt="Google" />
            {text}
        </button>
    );
}
