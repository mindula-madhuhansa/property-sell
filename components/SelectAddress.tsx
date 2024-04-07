"use client";

import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { useListingStore } from "@/store";
import { Button } from "@/components/ui/button";
import { AddressSearchInput } from "@/components/AddressSearchInput";
import { LoaderIcon } from "lucide-react";

export const SelectAddress = () => {
  const { user } = useUser();
  const { address, coordinates, isLoading, setisLoading } = useListingStore();

  const handleSaveAddress = async () => {
    setisLoading(true);
    const { data, error } = await supabase
      .from("listings")
      .insert([
        {
          address: address?.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress?.emailAddress,
        },
      ])
      .select();

    if (data) {
      setisLoading(false);
      toast.success("New address added");
    }

    if (error) {
      setisLoading(false);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="mt-12 p-5 py-10 border rounded-md shadow-md flex flex-col bg-gray-50 gap-5">
      <h2 className="text-muted-foreground">
        Enter the property address to begin the process
      </h2>
      <AddressSearchInput />

      <div>
        <div className="mt-4 border border-gray-200 rounded-full" />
        <Button
          disabled={!address || !coordinates}
          onClick={handleSaveAddress}
          className="mt-4 w-full"
        >
          {isLoading ? (
            <>
              <span>Saving</span>
              <LoaderIcon className="ml-2 animate-spin" />
            </>
          ) : (
            <span>Next</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default SelectAddress;
