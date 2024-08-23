import { useParams } from "react-router";

function Employee() {
    const { id } = useParams();
    const { data } = useQuery(["employee", id], async () => {
        const employeeData = await fetch(`http://localhost:3000/employees/${id}`);
        return employeeData.json();
    });

    console.log("employeeData", data);

}

export default Employee;