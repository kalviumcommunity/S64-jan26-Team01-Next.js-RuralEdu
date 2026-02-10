import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await auth();

    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { role } = body;

        if (!role || !["LEARNER", "TEACHER", "PARENT"].includes(role)) {
            return NextResponse.json({ error: "Invalid role" }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { role },
        });

        return NextResponse.json({ user: updatedUser });
    } catch (error) {
        console.error("Error updating role:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
