"use client";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import CardSkeleton from "./components/skeletons/CardSkeleton";

import { useState, useEffect } from "react";
const Index = () => {
	// Change this id to the id of the user once auth is implemented
	const id = 2;
	const [loading, setLoading] = useState(true);
	const [knowledge, setKnowledge] = useState({
		facultyData: [
			{
				id: null,
				title: null,
				description: null,
				link: null,
				faculty: null,
				available_to_all: null,
			},
		],
	});

	const user = {
		id: 2,
		first_name: "John",
		last_name: "Doe",
		email: "johndoe@gmail.com",
	};

	useEffect(() => {
		setLoading(true);
		fetch(`/api/getKnowledgeCards/${id}`)
			.then(async (res) => {
				const response = await res.json();
				setKnowledge(response);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<>
			<Navbar user={user} />
			<div className="w-1/2 mx-auto">
				<h1 className="text-3xl text-center text-black py-12">
					Welcome to the VIU Career Passport
				</h1>
			</div>

			<div className="w-10/12 mx-auto">
				<h2 className="text-2xl text-center text-black pb-6">
					Knowledge Resources
				</h2>{" "}
				<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
					{loading ? (
						<>
							<CardSkeleton />
							<CardSkeleton />
							<CardSkeleton />
						</>
					) : (
						<>
							{knowledge.facultyData &&
								knowledge.facultyData.map((item) => (
									<Card
										key={item.id}
										title={item.title ? item.title : ""}
										description={item.description ? item.description : ""}
										link={item.link ? item.link : ""}
									/>
								))}
						</>
					)}{" "}
				</div>
			</div>
			<div className="w-10/12 mx-auto mt-16">
				<h2 className="text-2xl text-center text-black pb-6">Activities</h2>{" "}
				<div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
					{loading ? (
						<>
							<CardSkeleton />
							<CardSkeleton />
							<CardSkeleton />
						</>
					) : (
						<>
							{knowledge.facultyData &&
								knowledge.facultyData.map((item) => (
									<Card
										key={item.id}
										title={item.title ? item.title : ""}
										description={item.description ? item.description : ""}
										link={item.link ? item.link : ""}
									/>
								))}
						</>
					)}{" "}
				</div>
			</div>
		</>
	);
};

export default Index;
