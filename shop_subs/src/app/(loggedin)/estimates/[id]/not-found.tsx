import { Card } from "@/components/ui/card";


export default function NotFound() {
    return (
        <div className="flex justify-center items-center">
            <Card className="border-gray-400 p-20 m-20">

            <h1 className="text-2xl">Estimate does not exist.</h1>
            </Card>
        </div>
    )
}