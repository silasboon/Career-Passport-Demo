import AddKnowledgeForm from "../components/addKnowledgeForm";
import AddActivityForm from "../components/addActivityForm";
const AdminDashboard = () => {
	return (
		<>
			<h1 className="text-3xl font-bold text-center py-1">
				Administrator Dashboard
			</h1>
			<p className="text-center py-2">
				This page is only visible to administrators.
			</p>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
				<AddKnowledgeForm />
				<AddActivityForm />
			</div>
		</>
	);
};

export default AdminDashboard;
