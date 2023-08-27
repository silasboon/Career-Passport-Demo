"use client";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const StudentProgress = ({ params }: { params: { id: any } }) => {
	const studentId = params.id;
	const [loading, setLoading] = useState(true);
	const [student, setStudent] = useState({
		student: {
			id: 0,
			first_name: "",
			last_name: "",
			faculty: "",
			email: "",
			created_at: "",
			updated_at: "",
			status: "",
		},
	});
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

    // get student information
	useEffect(() => {
		const getData = async () => {
			const getStudent = await fetch(`/api/getStudent/${studentId}`);
			if (getStudent.status === 200) {
				const studentData = await getStudent.json();
				setStudent(studentData);
			}
		};
		getData();
	}, []);

    // get knowledge items
	useEffect(() => {
		if (student.student.id !== 0) {
			const getStudentKnowledgeCards = async () => {
				console.log(student.student.faculty);
				switch (student.student.faculty) {
					case "ITAS":
						const getItas = await fetch(`/api/getKnowledgeCards/2`);
						const itasData = await getItas.json();
						setKnowledge(itasData);
						break;
					case "Computer Science":
						const getComputerScience = await fetch(`/api/getKnowledgeCards/1`);
						const computerScienceData = await getComputerScience.json();
						setKnowledge(computerScienceData);
						break;
					default:
						break;
				}
			};
			getStudentKnowledgeCards();
		}
    }, [student]);
    
    // get completion status for user
    useEffect(() => {
        if (knowledge.facultyData[0].id !== null && student.student.id !== 0) {
            const getCompletionStatus = async () => {
                const getKnowledgeCompletionStatus = await fetch(`/api/getKnowledgeCompletionStatus/${student.student.id}`);
                const completionStatusData = await getKnowledgeCompletionStatus.json();
                console.log(completionStatusData);
            }
            getCompletionStatus();
        }

    }, [knowledge, student]);

	// end loading
	useEffect(() => {
		if (knowledge.facultyData[0].id !== null && student.student.id !== 0) {
			setLoading(false);
		}
	}, [student, knowledge]);

	if (loading) {
		return (
			<>
				<div className="w-full h-screen flex justify-center items-center">
					<HashLoader
						loading={loading}
						size={150}
						color={"#123abc"}
						speedMultiplier={0.8}
					/>
				</div>
			</>
		);
	}
	return (
		<>
			<h1 className="text-3xl font-bold mb-4 text-center">Student Progress</h1>
			{/* Display student information */}
			<div className="py-8">
				<div className="container mx-auto">
					<h1 className="text-3xl font-semibold mb-2">Student Information:</h1>
					<div className="bg-gray-100 p-4 rounded-lg shadow-md">
						<p className="text-lg mb-1">
							<span className="font-semibold">Name:</span>{" "}
							{student.student.first_name} {student.student.last_name}
						</p>
						<p className="text-lg mb-1">
							<span className="font-semibold">Email:</span>{" "}
							{student.student.email}
						</p>
						<p className="text-lg">
							<span className="font-semibold">Faculty:</span>{" "}
							{student.student.faculty}
						</p>
					</div>
				</div>
			</div>
			{/* display all knowledge items */}
			<div className="py-8">
				<div className="container mx-auto">
					<h2 className="text-2xl font-semibold mb-4">Student Knowledge Resources</h2>
					<div className="flex flex-wrap -mx-4">
						{knowledge &&
							knowledge.facultyData.map((activity: any) => (
								<div key={activity.id} className="w-1/3 px-4 mb-4">
									<div className="bg-white rounded-lg shadow-md p-4">
										<h3 className="text-xl font-semibold mb-2">
											{activity.title}
										</h3>
										<p>Status: {activity.status}</p>
										<p>Last Accessed: {activity.lastAccessed}</p>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>{" "}
		</>
	);
};

export default StudentProgress;
