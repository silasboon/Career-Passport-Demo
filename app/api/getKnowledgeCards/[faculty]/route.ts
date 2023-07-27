import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
	req: Request,
	{ params }: { params: { faculty: any } }
) {
	// get faculty id from params
	const faculty = params.faculty;

	// Convert faculty id to a number (if needed) and validate it's a valid number
	const facultyId = parseInt(faculty, 10);
	if (isNaN(facultyId)) {
		return NextResponse.json(
			{
				error: "Invalid faculty ID",
			},
			{
				status: 400,
			}
		);
	}

	// get faculty data from database
	const facultyData = await prisma.knowledge.findMany({
		where: {
			OR: [{ faculty: facultyId }, { available_to_all: true }],
		},
	});

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
