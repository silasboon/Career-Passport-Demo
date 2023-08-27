"use client";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Success, Error } from "@/app/components/toasts";

import HashLoader from "react-spinners/HashLoader";

const ViewStudentsPage = () => {
	const [loading, setLoading] = useState(true);
	const [toastMessage, setToastMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
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

	const deleteUser = (id: any) => {
		fetch("/api/deleteStudent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id }),
		})
			.then(async (res) => {
				if (res.status === 200) {
					const response = await res.json();
					setToastMessage(response.message);
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 3000);
				} else if (res.status === 404) {
					const response = await res.json();
					setToastMessage(response.error);
					setError(true);
					setTimeout(() => {
						setError(false);
					}, 3000);
				}
			})
			.catch((err) => console.log(err));
	};

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
			{/* Toasts */}
			{success ? <Success message={toastMessage} /> : ""}
			{error ? <Error message="Failed to process the request" /> : ""}
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
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
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
										{/* Student Modal */}
										<Dialog.Root>
											<Dialog.Trigger asChild>
												<button
													type="button"
													data-modal-target="editUserModal"
													data-modal-show="editUserModal"
													className="font-medium text-blue-600 hover:underline"
												>
													View User
												</button>
											</Dialog.Trigger>
											<Dialog.Portal>
												<Dialog.Overlay className="bg-black/[0.4] data-[state=open]:animate-overlayShow fixed inset-0" />
												<Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
													<Dialog.Title className="m-0 text-[17px] font-medium">
														{student.first_name} {student.last_name}
													</Dialog.Title>
													<Dialog.Description className="mt-[10px] mb-5 text-[15px] leading-normal">
														Make changes to your profile here. Click save when
														you&aposre done.
													</Dialog.Description>
													<fieldset className="mb-[15px] flex items-center gap-5">
														<label
															className="text-violet11 w-[90px] text-right text-[15px]"
															htmlFor="name"
														>
															Name
														</label>
														<input
															className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
															id="name"
															defaultValue="Pedro Duarte"
														/>
													</fieldset>
													<fieldset className="mb-[15px] flex items-center gap-5">
														<label
															className="text-violet11 w-[90px] text-right text-[15px]"
															htmlFor="username"
														>
															Username
														</label>
														<input
															className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
															id="username"
															defaultValue="@peduarte"
														/>
													</fieldset>
													<div className="mt-[25px] flex justify-end">
														<Dialog.Close asChild>
															<button
																type="button"
																className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
															>
																Close
															</button>
														</Dialog.Close>
													</div>
													<Dialog.Close asChild>
														<button
															className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
															aria-label="Close"
														>
															<Cross2Icon />
														</button>
													</Dialog.Close>
												</Dialog.Content>
											</Dialog.Portal>
										</Dialog.Root>
										{/* Student Modal End */}
										{/* Delete Modal  */}

										<AlertDialog.Root>
											<AlertDialog.Trigger asChild>
												<button
													type="button"
													data-modal-target="editUserModal"
													data-modal-show="editUserModal"
													className="font-medium text-red-600 hover:underline ml-4"
												>
													Delete User
												</button>
											</AlertDialog.Trigger>
											<AlertDialog.Portal>
												<AlertDialog.Overlay className="bg-black/[0.4] data-[state=open]:animate-overlayShow fixed inset-0" />
												<AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
													<AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
														Are you absolutely sure?
													</AlertDialog.Title>
													<AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
														This action cannot be undone. This will permanently
														delete their account and remove their data from our
														servers.
													</AlertDialog.Description>
													<div className="flex justify-end gap-[25px]">
														<AlertDialog.Cancel asChild>
															<button
																type="button"
																className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
															>
																Cancel
															</button>
														</AlertDialog.Cancel>
														<AlertDialog.Action asChild>
															<button
																type="button"
																onClick={() => deleteUser(student.id)}
																className="text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
															>
																Yes, Delete Account
															</button>
														</AlertDialog.Action>
													</div>
												</AlertDialog.Content>
											</AlertDialog.Portal>
										</AlertDialog.Root>
										{/* Delete Modal End */}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default ViewStudentsPage;
