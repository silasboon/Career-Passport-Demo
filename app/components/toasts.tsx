"use client";

import { AiOutlineCheckCircle } from "react-icons/ai";

interface ToastProps {
	message: string;
}

const Success = ({ message }: ToastProps) => {
	return (
		<div
			id="toast-top-right"
			className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-green-200 divide-x divide-gray-200 rounded-lg shadow top-5 right-5"
			role="alert"
		>
			<div className="flex items-center space-x-2">
				<AiOutlineCheckCircle className="text-green-500 text-3xl" />
				<div className="text-sm font-normal text-green-500">{message}</div>
			</div>
		</div>
	);
};

const Error = ({ message }: ToastProps) => {
	return (
		<div
			id="toast-top-right"
			className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-green-300 divide-x divide-gray-200 rounded-lg shadow top-5 right-5"
			role="alert"
		>
			<div className="flex items-center space-x-2">
				<AiOutlineCheckCircle className="text-red-500 text-3xl" />
				<div className="text-sm font-normal text-red-500">{message}</div>
			</div>
		</div>
	);
};

export { Success, Error };
