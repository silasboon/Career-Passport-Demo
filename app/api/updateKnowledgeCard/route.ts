import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	const data = await request.json();
	console.log(data);
	try {
		if (data) {
			await prisma.knowledge.update({
				where: {
					id: data.id,
				},
				data: {
					title: data.title,
					description: data.description,
					link: data.link,
					available_to_all: data.available_to_all,
					faculty: data.faculty,
					updated_at: new Date(),
				},
			});
			prisma.$disconnect();

			return NextResponse.json(
				{
					message: "successfully updated knowledge card",
				},
				{
					status: 200,
				}
			);
		} else {
			return NextResponse.json(
				{
					message: "id not found",
				},
				{
					status: 400,
				}
			);
		}
	} catch (error) {
		prisma.$disconnect();
		return NextResponse.json(
			{
				error: error,
			},
			{
				status: 500,
			}
		);
	}
}
