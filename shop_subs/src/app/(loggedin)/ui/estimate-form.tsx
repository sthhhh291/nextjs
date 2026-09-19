"use client";
import { saveEstimate } from "@/actions/estimate";
import { useActionState } from "react";
import type { Employee, Estimate } from "@/types";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SelectContent,
  Select,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";
import { SquarePen } from "lucide-react";
import { getEmployees } from "@/actions/employees";

export default function EstimateForm(params: {
  estimate: Estimate | null;
  car_id: number;
}) {
  const data = params.estimate;
  const car_id = params.car_id;
  const [state, formAction, isPending] = useActionState(saveEstimate, {
    error: null,
    success: false,
    estimate: null,
  });
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employee_id, setEmployeeId] = useState(
    data?.employee_id ? String(data.employee_id) : "",
  );
  const [date, setDate] = useState<Date | undefined>(
    data?.date ? new Date(data.date) : undefined,
  );
  const [hours, setHours] = useState(data?.hours || "");
  const [mileage, setMileage] = useState(data?.mileage || "");
  const [estimate_type, setEstimate_type] = useState(data?.estimate_type || "");
  const [open, setOpen] = useState(false);
  const buttonAction = data?.id ? "Edit" : "Create";

  const estimate_types = [
    { value: "repair_order", label: "Repair Order" },
    { value: "estimate", label: "Estimate" },
    // {value:'repair_order', label:'Repair Order'},
  ];

  useEffect(() => {
    let active = true;

    const loadEmployees = async () => {
      try {
        const data = await getEmployees();
        if (active) {
          setEmployees(data);
        }
      } catch (error) {
        console.error("Failed to load employees:", error);
      }
    };

    loadEmployees();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isPending && state.success) {
      setOpen(false);
    }
  }, [isPending, state.success]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          {data ?
            <SquarePen />
          : "Create Estimate"}
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <form
          action={formAction}
          className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {data && <input type='hidden' name='id' value={data.id} />}
          <input type='hidden' name='car_id' value={car_id} />
          <input
            type='hidden'
            name='date'
            value={date ? format(date, "yyyy-MM-dd") : ""}
          />
          <FieldGroup>
            <FieldSet>
              <Select
                items={employees.map((employee) => ({
                  value: String(employee.id),
                  label: `${employee.first_name} ${employee.last_name}`,
                }))}
                name='employee_id'
                value={employee_id}
                onValueChange={(value) => setEmployeeId(value ?? "")}>
                <SelectTrigger className='w-full max-w-48'>
                  <SelectValue placeholder='Select an employee' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Employees</SelectLabel>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={String(employee.id)}>
                        {employee.first_name} {employee.last_name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Field>
                <Label htmlFor='date'>Date</Label>
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button
                        variant={"outline"}
                        data-empty={!date}
                        className='w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground'>
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <ChevronDownIcon data-icon='inline-end' />
                      </Button>
                    }
                  />
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar
                      mode='single'
                      selected={date}
                      onSelect={setDate}
                      defaultMonth={date}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
            </FieldSet>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label htmlFor='hours'>Hours</Label>
              <Input
                type='text'
                name='hours'
                placeholder='Hours Taken...'
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor='mileage'>Mileage</Label>
              <Input
                type='text'
                name='mileage'
                placeholder='Mileage...'
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <Select
            items={estimate_types}
            name='estimate_type'
            value={estimate_type}
            onValueChange={(value) => setEstimate_type(value ?? "")}>
            <SelectTrigger className='w-full max-w-48'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estimate Type</SelectLabel>
                {estimate_types.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {state.error && (
            <p className='text-sm text-destructive sm:col-span-2'>
              {state.error}
            </p>
          )}
          <Button className='sm:col-span-2' type='submit' disabled={isPending}>
            {isPending ? "Saving..." : buttonAction}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
