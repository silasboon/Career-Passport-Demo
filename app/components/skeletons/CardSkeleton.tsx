"use client";
const CardSkeleton = () => {
	return (
		<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
			<div role="status" className="animate-pulse">
				<div className="h-2.5 bg-gray-200 rounded-full w-12 mb-4"></div>
				<div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
				<div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
				<div className="h-2 bg-gray-200 rounded-full"></div>
			</div>
		</div>
	);
};

export default CardSkeleton;
