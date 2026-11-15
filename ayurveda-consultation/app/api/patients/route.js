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
    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const patients = await prisma.user.findMany({
      where: { role: "PATIENT" },
<<<<<<< HEAD
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        age: true,
        gender: true,
        address: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ patients });
=======
      select: { id: true, name: true, email: true, phone: true, age: true, gender: true, address: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ patients }, { status: 200 });
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 14725c7d73be1e315488b68412e85ebd7a04b70d
