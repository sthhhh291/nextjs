import { getEmployees } from "@/actions/employees";
import type { Employee } from "@/types";
import EmployeeForm from "../ui/employee-form";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default async function EmployeesPage() {
  const employees: Employee[] = await getEmployees();
  return (
    <>
      {/* create form here */}
      <h2>Add an employee here</h2>
      <EmployeeForm employee={null} />
      {/* array of edit forms here */}
      <h2>View/Edit existing employees here</h2>
      {employees.map((emp) => (
        <div key={emp.id}>
          <EmployeeForm employee={emp} />
          {/* <Button>
            <Trash />
          </Button> */}
        </div>
      ))}
    </>
  );
}
