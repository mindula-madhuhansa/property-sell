"use client";

import { Formik } from "formik";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { User } from "@clerk/nextjs/server";

import { useListingStore } from "@/store";
import { supabase } from "@/lib/supabase";
import { propertyTypes } from "@/constants";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUploader from "@/components/ImageUploader";

type ListingFormProps = {
  id: string;
  user: User;
};
export const ListingForm = ({ id, user }: ListingFormProps) => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useListingStore();
  const [listing, setListing] = useState<ListingFormValues>();
  const [images, setImages] = useState<File[] | null>(null);

  useEffect(() => {
    const verifyUserRecord = async () => {
      const { data, error } = await supabase
        .from("listings")
        .select("*,listing_images(listing_id,url)")
        .eq("createdBy", user.emailAddresses[0].emailAddress)
        .eq("id", id);

      if (data) {
        console.log(data);

        setListing(data[0]);
      }

      if (data && data?.length <= 0) {
        router.push("/");
      }
    };

    verifyUserRecord();
  }, [user, router, id]);

  const onSubmitHandler = async (formValue: ListingFormValues) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("listings")
      .update(formValue)
      .eq("id", id)
      .select();

    if (data) {
      setIsLoading(false);
      toast.success("Listing Published");
    }

    if (error) {
      setIsLoading(false);
      toast.error("Something went wrong");
    }

    if (images) {
      for (const image of images) {
        const file = image;
        const fileName = Date.now().toString();
        const fileExt = fileName.split(".").pop();

        const { data, error } = await supabase.storage
          .from("images")
          .upload(`${fileName}`, file, {
            contentType: `image/${fileExt}`,
            upsert: false,
          });

        if (error) {
          toast.error("Image uploading failed!");
        }

        if (data) {
          const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL}/${fileName}`;
          const { data, error } = await supabase
            .from("listing_images")
            .insert({ url: imageUrl, listing_id: id })
            .select();

          if (error) {
            setIsLoading(false);
          }
        }
      }
    }
    setIsLoading(false);
  };

  const publishBtnHandler = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("listings")
      .update({ active: true })
      .eq("id", id)
      .select();

    if (data) {
      toast.success("Listing published successfully");
      setIsLoading(false);
    }

    if (error) {
      toast.success("Listing publish failed!");
      setIsLoading(false);
    }
  };

  const initialValues: ListingFormValues = {
    type: "sell",
    propertyType: "house",
    bedroom: 3,
    bathroom: 2,
    floorArea: 2000,
    sellingPrice: 1000000,
    description: "",
    username: user.firstName,
    profileImgUrl: user.imageUrl,
    listing_images: [],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmitHandler(values);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className="mt-4 p-8 border rounded-md shadow-md space-y-5 min-w-96 md:w-7xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label className="text-sm md:text-lg text-muted-foreground">
                Rent or Sell
              </Label>
              <RadioGroup
                onValueChange={(e) => (values.type = e)}
                defaultValue={listing?.type}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rent" id="rent" />
                  <Label htmlFor="rent">Rent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sell" id="sell" />
                  <Label htmlFor="sell">Sell</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="propertyType"
                className="text-sm md:text-lg text-muted-foreground"
              >
                Property Type
              </Label>
              <Select
                onValueChange={(e) => (values.propertyType = e)}
                name="propertyType"
                defaultValue={listing?.propertyType}
              >
                <SelectTrigger className="w-full capitalize">
                  <SelectValue
                    placeholder={
                      listing?.propertyType
                        ? listing?.propertyType
                        : "Select Property Type"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="bedroom"
                className="text-sm md:text-lg text-muted-foreground"
              >
                No. of Bedrooms
              </Label>
              <Input
                type="number"
                placeholder="Ex. 3"
                name="bedroom"
                defaultValue={listing?.bedroom}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="bathroom"
                className="text-sm md:text-lg text-muted-foreground"
              >
                No. of Bathrooms
              </Label>
              <Input
                type="number"
                placeholder="Ex. 2"
                name="bathroom"
                defaultValue={listing?.bathroom}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="floorArea"
                className="text-sm md:text-lg text-muted-foreground"
              >
                Floor Area (Sq. ft)
              </Label>
              <Input
                type="number"
                placeholder="Ex. 1600"
                name="floorArea"
                defaultValue={listing?.floorArea}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="sellingPrice"
                className="text-sm md:text-lg text-muted-foreground"
              >
                Selling Price (LKR)
              </Label>
              <Input
                type="number"
                placeholder="Ex. 100,000.00"
                name="sellingPrice"
                defaultValue={listing?.sellingPrice}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <Label
                htmlFor="description"
                className="text-sm md:text-lg text-muted-foreground"
              >
                Description
              </Label>
              <Textarea
                placeholder=""
                name="description"
                defaultValue={listing?.description}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>

          <ImageUploader
            setImages={(value: File[] | null) => setImages(value)}
            imageList={listing?.listing_images}
          />

          <div className="mt-4 border border-gray-200 rounded-full" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Button
              variant="outline"
              type="submit"
              className="w-full border-2 border-primary hover:bg-orange-200"
            >
              {isLoading ? (
                <>
                  <span>Saving</span>
                  <LoaderIcon className="ml-2 animate-spin" />
                </>
              ) : (
                <span>Save</span>
              )}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger>
                <Button type="button" className="w-full">
                  {isLoading ? (
                    <>
                      <span>Saving</span>
                      <LoaderIcon className="ml-2 animate-spin" />
                    </>
                  ) : (
                    <span>Save & Publish</span>
                  )}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Ready to Publish?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure? This will publish your listing.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    disabled={isLoading}
                    onClick={() => publishBtnHandler()}
                  >
                    {isLoading ? (
                      <>
                        <span>Publishing</span>
                        <LoaderIcon className="ml-2 animate-spin" />
                      </>
                    ) : (
                      <span>Publish</span>
                    )}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      )}
    </Formik>
  );
};
