import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	const facultyId = 2;
	try {
		const students = await prisma.users.findMany();
		prisma.$disconnect();
		return NextResponse.json(
			{
				students,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error("Error fetching students:", error); // Log the error for debugging

		return NextResponse.json(
			{
				message: "Something went wrong",
			},
			{
				status: 500,
			}
		);
	}
}
