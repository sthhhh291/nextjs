"use server";
// import { revalidatePath } from "next/cache";
import { createCustomer } from "@/lib/db/customers";
import { redirect } from "next/navigation";

export async function addCustomer(formdata: FormData) {
  const customer: customerCreate = {
    first_name: formdata.get("first_name") as string,
    last_name: formdata.get("last_name") as string,
    notes: formdata.get("notes") as string,
  };

  const newCustomer = await createCustomer(
    customer.first_name,
    customer.last_name,
    customer.notes
  );
  redirect(`/customers/${newCustomer}`);
  //   revalidatePath("/movies");
}

// export async function editMovie(formdata: FormData) {
//   const movie: movie = {
//     id: Number(formdata.get("id")),
//     title: formdata.get("title") as string,
//     date: new Date(formdata.get("date") as string),
//     runtime_min: Number(formdata.get("runtime_min")),
//     personal_stars: Number(formdata.get("personal_stars")),
//     imdb_id: formdata.get("imdb_id") as string,
//   };
//   const res = await updateMovie(movie);
//   console.log(res);
//   // return movie;
//   // revalidatePath("/movies");
//   redirect("/movies");
// }

// export async function getMovie(id: number) {
//   const mov = await getMovieById(id);
//   return mov;
// }
