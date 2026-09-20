import AdminForm from "../ui/admin-form";
import { getadmin } from "@/actions/admin";
export default async function AdminPage () {
    const admin = await getadmin();
    return (
        <AdminForm admin={admin} />
    )
}