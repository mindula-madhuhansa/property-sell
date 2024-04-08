import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { ListingForm } from "@/components/ListingForm";

const EditListing = async ({ params }: { params: { id: string } }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="font-bold text-2xl">Details about your Property</h1>

      <ListingForm id={params.id} user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
};

export default EditListing;
