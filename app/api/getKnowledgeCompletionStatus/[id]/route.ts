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

	const knowledge_completion = await prisma.user_knowledge.findMany({
		where: {
			user_id: studentId,
		},
	});

	const id_list: any = [];

	for (let i = 0; i < knowledge_completion.length; i++) {
		id_list.push(knowledge_completion[i].knowledge_id);
	}
	// get knowledge cards
	const knowledge = await prisma.knowledge.findMany();
	const knowledge_list: any = [];
	for (let i = 0; i < knowledge.length; i++) {
		knowledge_list.push(knowledge[i].id);
	}
	const knowledge_completion_status: any = [];
	for (let i = 0; i < knowledge_list.length; i++) {
		if (id_list.includes(knowledge_list[i])) {
			knowledge_completion_status.push(true);
		} else {
			knowledge_completion_status.push(false);
		}
	}
	console.log(knowledge_completion_status);

	prisma.$disconnect();

	return NextResponse.json(
		{
			knowledge_completion,
		},
		{
			status: 200,
		}
	);
}
