import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: Request, { params }: { params: { id: any } }) {
	const id = params.id;
	const studentId = parseInt(id, 10);

	if (isNaN(studentId)) {
		prisma.$disconnect();
		return NextResponse.json(
			{
				error: "Invalid Student ID",
			},
			{
				status: 400,
			}
		);
	}

	const student = await prisma.users.findUnique({
		where: {
			id: studentId,
		},
	});
	prisma.$disconnect();

	return NextResponse.json(
		{
			student,
		},
		{
			status: 200,
		}
	);
}
