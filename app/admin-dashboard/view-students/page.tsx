"use client";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

const ViewStudentsPage = () => {
	const [loading, setLoading] = useState(true);
	const [students, setStudents] = useState({
		students: [
			{
				id: null,
				first_name: null,
				last_name: null,
				faculty: null,
				email: null,
				created_at: null,
				updated_at: null,
				status: null,
			},
		],
	});

	useEffect(() => {
		setLoading(true);
		fetch("/api/getAllStudents")
			.then(async (res) => {
				const response = await res.json();
				setStudents(response);
				const randomNumber = Math.floor(Math.random() * 1400);
				setTimeout(() => {
					setLoading(false);
				}, randomNumber);
			})
			.catch((err) => console.log(err));
	}, []);

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
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
			<h1 className="text-3xl font-bold text-center py-3">All Students</h1>
			<div className="flex items-center justify-between py-4 bg-white">
				<label htmlFor="table-search" className="sr-only">
					Search
				</label>
				<div className="relative">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
						<svg
							className="w-4 h-4 text-gray-500"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
							/>
						</svg>
					</div>
					<input
						type="text"
						id="table-search-users"
						className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Search for users"
					/>
				</div>
			</div>
			<table className="w-full text-sm text-left text-gray-500 ">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					<tr>
						<th scope="col" className="px-6 py-3">
							Name
						</th>
						<th scope="col" className="px-6 py-3">
							Faculty
						</th>
						<th scope="col" className="px-6 py-3">
							Status
						</th>
						<th scope="col" className="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					{students &&
						students.students.map((student) => (
							<tr className="bg-white border-b" key={student.id}>
								<th
									scope="row"
									className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap"
								>
									<img
										className="w-10 h-10 rounded-full"
										src="https://i.pravatar.cc/100"
										alt="Jese image"
									/>
									<div className="pl-3">
										<div className="text-base font-semibold">
											{student.first_name} {student.last_name}
										</div>
										<div className="font-normal text-gray-500">
											{student.email}
										</div>
									</div>
								</th>
								<td className="px-6 py-4">{student.faculty}</td>
								<td className="px-6 py-4">
									{student.status ? (
										<div className="flex items-center">
											<div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
											Online
										</div>
									) : (
										<div className="flex items-center">
											<div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
											Offline
										</div>
									)}
								</td>
								<td className="px-6 py-4">
									<a
										href="#"
										type="button"
										data-modal-target="editUserModal"
										data-modal-show="editUserModal"
										className="font-medium text-blue-600 hover:underline"
									>
										View User
									</a>
									<a
										href="#"
										type="button"
										data-modal-target="editUserModal"
										data-modal-show="editUserModal"
										className="font-medium text-red-600 hover:underline ml-4"
									>
										Delete User
									</a>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default ViewStudentsPage;
