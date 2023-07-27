import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const faculty_dict: any = {
	computer_science: 1,
	itas: 2,
};

export async function POST(request: Request) {
	try {
		const data = await request.json();
		// replaces faculty string with id from faculty_dict
		if (data.faculty) {
			data.faculty = faculty_dict[data.faculty];
		}
		if (data.availableToAll === true) {
			try {
				const submit = await prisma.knowledge.create({
					data: {
						title: data.title,
						description: data.description,
						link: data.link,
						available_to_all: data.availableToAll,
					},
				});
				prisma.$disconnect();

				return NextResponse.json(
					{ message: "Successfully Added Knowledge Card" },
					{ status: 200 }
				);
			} catch (error) {
				prisma.$disconnect();

				return NextResponse.json(
					{ message: "Failed to process the request" },
					{ status: 500 }
				);
			}
		} else {
			try {
				await prisma.knowledge.create({
					data: {
						title: data.title,
						description: data.description,
						link: data.link,
						faculty: data.faculty,
						available_to_all: data.availableToAll,
					},
				});
				prisma.$disconnect();

				return NextResponse.json(
					{ message: "Successfully Added Knowledge Card" },
					{ status: 200 }
				);
			} catch (error) {
				prisma.$disconnect();

				return NextResponse.json(
					{ message: "Failed to process the request" },
					{ status: 500 }
				);
			}
		}
	} catch (error) {
		prisma.$disconnect();

		return NextResponse.json(
			{ message: "Failed to process the request" },
			{ status: 500 }
		);
	}
}

// TODO: create regex to check if link is valid
