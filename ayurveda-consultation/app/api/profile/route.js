import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { NextResponse } from "next/server";

<<<<<<< HEAD
export const runtime = "nodejs"; // Prisma and bcrypt need Node.js runtime


=======
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
export async function GET(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const profile = await prisma.user.findUnique({
      where: { id: Number(user.userId) },
<<<<<<< HEAD
      select: { id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, role: true },
=======
      select: { id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, role: true }
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
    });

    return NextResponse.json({ user: profile });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = await getCurrentUser(request);
    if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { name, phone, age, gender, address } = await request.json();

    const profile = await prisma.user.update({
      where: { id: Number(user.userId) },
      data: {
        name,
        phone,
        age: age ? Number(age) : null,
        gender,
<<<<<<< HEAD
        address,
      },
      select: { id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, role: true },
=======
        address
      },
      select: { id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, role: true }
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
    });

    return NextResponse.json({ user: profile });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
