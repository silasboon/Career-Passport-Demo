"use client";
import { useEffect, useState } from "react";
import { Success, Error } from "./toasts";
const AddKnowledgeForm = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [link, setLink] = useState("");
	const [faculty, setFaculty] = useState("itas");
	const [availableToAll, setAvailableToAll] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(false);

	const checkboxHandler = () => {
		setAvailableToAll(!availableToAll);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (availableToAll) {
			fetch("/api/addKnowledgeCard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
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
			fetch("/api/addKnowledgeCard", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
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

	const handleSubmissionAndToast = (data: any) => {
		if (data.message === "Successfully Added Knowledge Card") {
			setSuccess(true);
			setTitle("");
			setDescription("");
			setLink("");
			setFaculty("itas");
			setAvailableToAll(false);
		} else {
			setError(true);
		}
		setTimeout(() => {
			setSuccess(false);
			setError(false);
		}, 3000);
	};

	return (
		<>
			<div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
				<h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
					Add Knowledge Card
				</h5>
				{/* Toasts */}
				{success ? <Success message="Successfully Added Knowledge Card" /> : ""}
				{error ? <Error message="Failed to process the request" /> : ""}

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
								<option value={"computer_science"}>Computer Science</option>
							</select>
						</div>
					) : (
						""
					)}

					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
					>
						Submit
					</button>
				</form>
			</div>
		</>
	);
};

export default AddKnowledgeForm;

// TODO: Add animation after submit based on response code (200 or 500)
