import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	const data = await request.json();
	const id = data.id;
	// get id from params
	try {
		// delete knowledge card data from database
		await prisma.knowledge.delete({
			where: {
				id: id,
			},
		});
		prisma.$disconnect();
		return NextResponse.json(
			{
				message: "knowledge card deleted",
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		prisma.$disconnect;
		return NextResponse.json(
			{
				error: "knowledge card not found",
			},
			{
				status: 404,
			}
		);
	}
}
