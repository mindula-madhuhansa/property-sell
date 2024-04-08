"use client";

import { UploadCloudIcon } from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ImageUploaderProps = {
  setImages: any;
  imageList: ListingImage[] | undefined;
};

const ImageUploader = ({ setImages, imageList }: ImageUploaderProps) => {
  console.log(imageList);

  const imageUploaderRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setImages(files);
      const previews = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreview(previews);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl">
            Upload Property Images
          </CardTitle>
          <CardDescription>
            Drag and drop your images or click the button below to select files.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center m-2 border-2 border-dashed border-zinc-200 rounded-lg p-10 space-y-6">
          <UploadCloudIcon className="w-16 h-16 text-zinc-500 dark:text-zinc-400" />
          <Button
            onClick={() => imageUploaderRef.current?.click()}
            type="button"
            variant="outline"
          >
            Select Files
          </Button>
          <input
            ref={imageUploaderRef}
            type="file"
            multiple
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            className="sr-only"
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 mt-4">
        {imagePreview.map((image, i) => (
          <div key={i}>
            <Image
              src={image}
              alt="Image"
              width={100}
              height={100}
              className="border rounded-md object-cover aspect-square h-24 w-24"
            />
          </div>
        ))}
      </div>

      {imageList && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3 mt-4">
          {imageList.map((img) => (
            <div key={img.listing_id}>
              <Image
                src={img?.url}
                alt="Image"
                width={100}
                height={100}
                className="border rounded-md object-cover aspect-square h-24 w-24"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
