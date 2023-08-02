import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	// get faculty data from database
	const facultyData = await prisma.knowledge.findMany( );

	prisma.$disconnect();

	// return faculty data
	if (facultyData.length === 0) {
		return NextResponse.json(
			{
				error: "Faculty not found",
			},
			{
				status: 404,
			}
		);
	}

	return NextResponse.json(
		{
			facultyData,
		},
		{
			status: 200,
		}
	);
}
