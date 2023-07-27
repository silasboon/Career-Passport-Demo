"use client";
import { useEffect, useState } from "react";
const AddActivityForm = () => {


	return (
		<>
			<div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
				<h5 className="mb-2 text-2xl text-center font-bold tracking-tight text-gray-900">
					Add Activity Card
				</h5>
				<p className="text-center text-red-500">Non functional</p>

				<form>
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
						/>
					</div>
					<div className="mb-6">
						<label
							htmlFor="countries"
							className="block mb-2 text-sm font-medium text-gray-900"
						>
							Select Faculty
						</label>
						<select
							id="countries"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						>
							<option>-------</option>
							<option value={"itas"}>ITAS</option>
							<option value={"computer_science"}>Computer Science</option>
						</select>
					</div>
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

export default AddActivityForm;
