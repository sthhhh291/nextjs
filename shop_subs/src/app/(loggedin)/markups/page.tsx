import { getMarkup } from "@/actions/markup";
import type { Markup } from "@/types";
import MarkupForm from "../ui/markup-form";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export default async function MarkupsPage() {
  const markups: Markup[] = await getMarkup();
  return (
    <>
      {/* create form here */}
      <h2>Add an markup here</h2>
      <MarkupForm markup={null} />
      {/* array of edit forms here */}
      <h2>View/Edit existing markups here</h2>
      {markups.map((emp) => (
        <div key={emp.id}>
          <MarkupForm markup={emp} />
          {/* <Button>
            <Trash />
          </Button> */}
        </div>
      ))}
    </>
  );
}
