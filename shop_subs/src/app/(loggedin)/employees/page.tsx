import { getEmployees } from "@/actions/employees";
import type { Employee } from "@/types";
import EmployeeForm from "../ui/employee-form";

export default async function EmployeesPage() {
  const employees: Employee[] = await getEmployees();
  return (
    <section className='mx-auto max-w-5xl space-y-6'>
      <header className='space-y-1'>
        <h1 className='text-2xl font-semibold'>Employees</h1>
        <p className='text-sm text-muted-foreground'>
          Manage employee roles and compensation.
        </p>
      </header>
      <div className='space-y-3'>
        <h2 className='text-base font-semibold'>Add employee</h2>
        <EmployeeForm employee={null} />
      </div>
      <div className='space-y-3'>
        <h2 className='text-base font-semibold'>Employee records</h2>
        <div className='grid gap-3'>
          {employees.map((employee) => (
            <EmployeeForm key={employee.id} employee={employee} />
          ))}
        </div>
      </div>
    </section>
  );
}
