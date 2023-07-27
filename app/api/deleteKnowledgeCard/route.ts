import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// TODO: Make this work 

export async function POST(
	request: Request,
	{ params }: { params: { id: any } }
) {
	// get id from params
	const id = parseInt(params.id, 10);
	try {
		console.log(id);
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
