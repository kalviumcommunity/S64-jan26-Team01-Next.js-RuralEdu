"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
    const { data: session, update } = useSession();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleRoleSelection = async (role: "LEARNER" | "TEACHER") => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/update-role", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role }),
            });

            if (response.ok) {
                await update({ role }); // Update session
                if (role === "TEACHER") {
                    router.push("/teacher-dashboard");
                } else {
                    router.push("/dashboard");
                }
            } else {
                console.error("Failed to update role");
            }
        } catch (error) {
            console.error("Error updating role:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!session) return null;

    return (
        <div className="min-h-screen bg-[#f8fbff] flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
                <h1 className="text-3xl font-black text-[#18659e] mb-4">Welcome, {session.user?.name}!</h1>
                <p className="text-gray-600 mb-8">To get started, please tell us how you want to use RuralEdu.</p>

                <div className="space-y-4">
                    <button
                        onClick={() => handleRoleSelection("LEARNER")}
                        disabled={isLoading}
                        className="w-full p-4 border-2 border-blue-50 bg-blue-50 rounded-xl hover:border-[#18659e] hover:bg-white transition-all text-left group"
                    >
                        <span className="block text-lg font-bold text-[#18659e] group-hover:text-[#18659e]">I am a Learner</span>
                        <span className="text-sm text-gray-500">I want to take lessons and quizzes.</span>
                    </button>

                    <button
                        onClick={() => handleRoleSelection("TEACHER")}
                        disabled={isLoading}
                        className="w-full p-4 border-2 border-orange-50 bg-orange-50 rounded-xl hover:border-orange-500 hover:bg-white transition-all text-left group"
                    >
                        <span className="block text-lg font-bold text-orange-600 group-hover:text-orange-600">I am a Teacher</span>
                        <span className="text-sm text-gray-500">I want to manage classes and students.</span>
                    </button>

                    <button
                        onClick={() => alert("Parent role coming soon!")}
                        disabled={isLoading}
                        className="w-full p-4 border-2 border-green-50 bg-green-50 rounded-xl hover:border-green-500 hover:bg-white transition-all text-left group"
                    >
                        <span className="block text-lg font-bold text-green-600 group-hover:text-green-600">I am a Parent</span>
                        <span className="text-sm text-gray-500">I want to track my child's progress.</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
