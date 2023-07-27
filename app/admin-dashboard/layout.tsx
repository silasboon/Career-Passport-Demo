import SideNav from "../components/SideNav";
export default function DashboardLayout({
	children, // will be a page or nested layout
}: {
	children: React.ReactNode;
}) {
	const user = {
		id: 2,
		first_name: "John",
		last_name: "Doe",
		email: "johndoe@gmail.com",
	};
	return (
		<section className="w-5/6 float-right p-10">
			{/* Include shared UI here e.g. a header or sidebar */}
			<SideNav user={user} />

			{children}
		</section>
	);
}
