import { SelectAddress } from "@/components/SelectAddress";

const AddNewListing = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="font-bold text-2xl">Add new Property</h1>

      <SelectAddress />
    </div>
  );
};

export default AddNewListing;
