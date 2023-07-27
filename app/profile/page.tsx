import Navbar from "../components/Navbar";

const Profile = () => {
	const user = {
		id: 2,
		first_name: "John",
		last_name: "Doe",
		email: "johndoe@gmail.com",
	};
	return (
		<>
			<Navbar user={user} />
			<h1 className="text-3xl font-bold text-center py-6">Profile</h1>

			<div className="w-full max-w-sm bg-slate-50 border border-gray-200 rounded-lg shadow  mx-auto">
				<div className="flex flex-col items-center py-10">
					<img
						className="w-24 h-24 mb-3 rounded-full shadow-lg"
						src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						alt="Bonnie image"
					/>
					<h5 className="mb-1 text-xl font-medium text-gray-900 ">
						{user.first_name} {user.last_name}
					</h5>
					<span className="text-sm text-gray-500">
						ITAS {/* TODO: make this dynamic */}
					</span>
					<div className="flex mt-4 space-x-3 md:mt-6">
						<a
							href="#"
							className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
						>
							Update Info
						</a>
						<a
							href="#"
							className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"
						>
							Change Password
						</a>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
