import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
	const data = await request.json();
	const id = data.id;
	try {
		// delete knowledge card data from database
		await prisma.users.delete({
			where: {
				id: id,
			},
		});
		prisma.$disconnect();
		return NextResponse.json(
			{
				message: "User Deleted Successfully",
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		prisma.$disconnect;
		return NextResponse.json(
			{
				error: "Error Deleting User",
			},
			{
				status: 404,
			}
		);
	}
}
