"use client";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { useRouter } from "next/navigation";
import { Success, Error } from "@/app/components/toasts";
const faculty_dict: any = {
	1: "Computer Science",
	2: "ITAS",
};

const Knowledge = () => {
	const [loading, setLoading] = useState(true);
	const [viewModal, setViewModal] = useState(false);
	const [id, setId] = useState(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [link, setLink] = useState("");
	const [faculty, setFaculty] = useState("itas");
	const [availableToAll, setAvailableToAll] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);
	const [updated, setUpdated] = useState(false);
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
	// Handle loading of knowledge cards
	useEffect(() => {
		setLoading(true);
		fetch(`/api/getAllKnowledgeCards`)
			.then(async (res) => {
				const response = await res.json();

				setKnowledge(response);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	}, [updated]);
	// Handle truncating text
	const truncateText = (text: any, maxLength: number) => {
		if (text.length > maxLength) {
			return text.slice(0, maxLength) + "...";
		}
		return text;
	};
	// Handle loading
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
	// Handle modal
	const modal = (item: any) => {
		setId(item.id);
		setTitle(item.title);
		setDescription(item.description);
		setLink(item.link);
		setFaculty(item.faculty);
		setAvailableToAll(item.available_to_all);
		setViewModal(true);
	};
	// Handle checkbox
	const checkboxHandler = () => {
		setAvailableToAll(!availableToAll);
	};

	// Handle closing modal by clicking outside
	const handleInnerClick = (e: any) => {
		e.stopPropagation();
	};
	const handleOuterClick = (e: any) => {
		setViewModal(false);
	};
	// Handle submission of knowledge card
	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (availableToAll) {
			fetch("/api/updateKnowledgeCard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
					title,
					description,
					link,
					availableToAll,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					handleSubmissionAndToast(data);
				})
				.catch((err) => console.log(err));
		} else {
			fetch("/api/updateKnowledgeCard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id,
					title,
					description,
					link,
					faculty,
					availableToAll,
				}),
			})
				.then((res) => res.json())
				.then((data) => {
					handleSubmissionAndToast(data);
				})
				.catch((err) => console.log(err));
		}
	};
	// Handle submission of knowledge card and update toasts
	const handleSubmissionAndToast = (data: any) => {
		if (data.message === "successfully updated knowledge card") {
			setViewModal(false);
			setSuccess(true);
			if (setUpdated) {
				setUpdated(false);
			}
			setUpdated(true);
			setTitle("");
			setDescription("");
			setLink("");
			setFaculty("itas");
			setAvailableToAll(false);
		} else {
			setViewModal(false);
			setError(true);
		}
		setTimeout(() => {
			setSuccess(false);
		}, 3000);
	};
	// Handle delete of knowledge card
	// TODO: Make this a work
	const handleDelete = (id: any) => {
		fetch(`/api/deleteKnowledgeCard/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id }),
		}).then((res) => {
			if (res.status === 200) {
				setSuccess(true);
				if (setUpdated) {
					setUpdated(false);
				}
				setUpdated(true);
			} else {
				setError(true);
			}
			setTimeout(() => {
				setSuccess(false);
				setError(false);
			}, 3000);
		});
	};

	return (
		<>
			<h1 className="text-3xl text-center font-semibold tracking-wide text-gray-800 pb-4">
				Knowledge
			</h1>
			{/* Toasts */}
			{success ? <Success message="Successfully Updated Knowledge Card" /> : ""}
			{error ? <Error message="Failed to process the request" /> : ""}

			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						<tr>
							<th scope="col" className="px-6 py-3">
								Title
							</th>
							<th scope="col" className="px-6 py-3">
								Description
							</th>
							<th scope="col" className="px-6 py-3">
								Link
							</th>
							<th scope="col" className="px-6 py-3">
								Facilty
							</th>
							<th scope="col" className="px-6 py-3">
								Available to All?
							</th>
						</tr>
					</thead>
					<tbody>
						{knowledge.facultyData &&
							knowledge.facultyData.map((item) => (
								<tr
									key={item.id}
									className="bg-white border-b hover:bg-slate-50 hover:cursor-pointer"
									onClick={() => modal(item)}
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
									>
										{truncateText(item.title, 40)}
									</th>
									<td className="px-6 py-4">
										{truncateText(item.description, 50)}
									</td>
									<td className="px-6 py-4">{truncateText(item.link, 50)}</td>
									<td className="px-6 py-4">
										{item.faculty ? faculty_dict[item.faculty] : "All"}
									</td>
									<td className="px-6 py-4">
										{item.available_to_all ? "Yes" : "No"}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
			{viewModal && (
				<>
					<div
						className="fixed w-screen h-screen top-0 left-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
						onClick={handleOuterClick}
					>
						<div
							className="w-1/2"
							aria-hidden="true"
							onClick={handleInnerClick}
						>
							<div className="relative w-full max-h-full">
								<div className="relative bg-white rounded-lg shadow ">
									<div className="flex items-start justify-between pt-2 pr-2 ">
										<button
											type="button"
											className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
											onClick={() => setViewModal(false)}
										>
											<svg
												className="w-3 h-3"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 14 14"
											>
												<path
													stroke="currentColor"
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
												/>
											</svg>
											<span className="sr-only">Close modal</span>
										</button>
									</div>

									<div className="block p-6 bg-white">
										<h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
											Edit Knowledge Card
										</h5>

										<form onSubmit={handleSubmit}>
											<div className="mb-6">
												<label
													htmlFor="title"
													className="block mb-2 text-sm font-medium text-gray-900"
												>
													Title
												</label>

												<input
													type="text"
													id="title"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
													required
													value={title}
													onChange={(e) => setTitle(e.target.value)}
												/>
											</div>
											<div className="mb-6">
												<label
													htmlFor="description"
													className="block mb-2 text-sm font-medium text-gray-900"
												>
													Description
												</label>
												<textarea
													id="description"
													rows={4}
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
													required
													value={description}
													onChange={(e) => setDescription(e.target.value)}
												/>
											</div>
											<div className="mb-6">
												<label
													htmlFor="link"
													className="block mb-2 text-sm font-medium text-gray-900"
												>
													Link
												</label>
												<input
													type="text"
													id="link"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
													required
													value={link}
													onChange={(e) => setLink(e.target.value)}
												/>
											</div>
											<div className="mb-6">
												<label className="relative inline-flex items-center mb-4 cursor-pointer">
													<input
														type="checkbox"
														value=""
														checked={availableToAll}
														className="sr-only peer"
														onChange={() => checkboxHandler()}
													/>
													<div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
													<span className="ml-3 text-sm font-medium text-gray-900">
														Available to all students?
													</span>
												</label>
											</div>
											{!availableToAll ? (
												<div className="mb-6">
													<label
														htmlFor="faculties"
														className="block mb-2 text-sm font-medium text-gray-900"
													>
														Select Faculty
													</label>
													<select
														id="faculties"
														value={faculty}
														className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
														onChange={(e) => setFaculty(e.target.value)}
													>
														<option value={"itas"}>ITAS</option>
														<option value={"computer_science"}>
															Computer Science
														</option>
													</select>
												</div>
											) : (
												""
											)}

											<button
												type="submit"
												className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-3 text-center"
											>
												Update
											</button>
											<a
												// onClick={() => handleDelete(id)}
												className="text-red-700 hover:text-white border border-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 hover:curs"
											>
												Delete
											</a>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Knowledge;
