"use client";

import React, { useState, useCallback, useRef } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "#/components/ui/alert-dialog";
import { IconSquareRoundedPlusFilled, IconX } from "@tabler/icons-react";

type Props = {};

type UploadedImage = {
  id: string;
  file: File;
  preview: string;
};

const UploaderComp: React.FC<Props> = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const newImages = files.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
      }));

      setUploadedImages((prevImages) => {
        // Limit the number of new images if needed, e.g., only take the first 10
        const combined = [...prevImages, ...newImages];
        // if (combined.length > 10) { /* show error or notification */ }
        return combined; //.slice(0, 10); // Example limit
      });
      setOpen(true);
    },
    []
  );

  const handleRemoveImage = useCallback((id: string) => {
    setUploadedImages((prevImages) => {
      const imageToRemove = prevImages.find((image) => image.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      const remainingImages = prevImages.filter((image) => image.id !== id);
      if (remainingImages.length === 0) {
        setOpen(false);
      }
      return remainingImages;
    });
  }, []);

  React.useEffect(() => {
    return () => {
      uploadedImages.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [uploadedImages]);

  const handleMockUpload = useCallback(() => {
    console.log("Uploading images...", uploadedImages);
    uploadedImages.forEach((image) => URL.revokeObjectURL(image.preview));
    setUploadedImages([]);
    setOpen(false);
  }, [uploadedImages]);

  const handleTriggerClick = () => {
    inputRef.current?.click();
  };

  const clearImages = useCallback(() => {
    uploadedImages.forEach((image) => URL.revokeObjectURL(image.preview));
    setUploadedImages([]);
    setOpen(false);
  }, [uploadedImages]);

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && uploadedImages.length > 0) {
      setAlertOpen(true);
    } else {
      setOpen(isOpen);
    }
  };

  const handleAlertClose = (action: "clear" | "cancel") => {
    if (action === "clear") {
      clearImages();
    } else {
      setOpen(true);
    }
    setAlertOpen(false);
  };

  return (
    <div className="p-4">
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="relative cursor-pointer flex items-center justify-center rounded-2xl border border-dashed w-full bg-neutral-900 aspect-square min-h-[200px]"
          >
            <span className="text-white text-sm">Upload Images</span>
            <input
              type="file"
              id="image-upload"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              ref={inputRef}
              onClick={(e) => ((e.target as HTMLInputElement).value = "")}
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col">
          <DrawerHeader className="flex flex-row justify-between items-start flex-shrink-0">
            <div>
              <DrawerTitle>Confirm Image Upload</DrawerTitle>
              <DrawerDescription>
                Review your images before uploading.
              </DrawerDescription>
            </div>
            <button
              onClick={handleTriggerClick}
              className="p-1 cursor-pointer hover:opacity-80 transition-opacity text-blue-600 dark:text-blue-500"
              aria-label="Add more images"
            >
              <IconSquareRoundedPlusFilled size={32} />
            </button>
          </DrawerHeader>

          <div className="">
            {uploadedImages.length > 0 ? (
              <Carousel
                opts={{ align: "start" }}
                plugins={
                  uploadedImages.length > 1
                    ? [Autoplay({ delay: 4000, stopOnInteraction: true })]
                    : []
                }
                className="w-full"
              >
                <CarouselContent className="p-4 h-full">
                  {uploadedImages.map((image) => (
                    <CarouselItem
                      key={image.id}
                      className="flex justify-center basis-1/2 items-center"
                    >
                      <div className="relative group w-full h-full max-w-full max-h-full">
                        <Image
                          src={image.preview}
                          alt={image.file.name}
                          width={300}
                          height={300}
                          className="object-contain rounded-md border border-neutral-700 w-full"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 right-2 rounded-full w-7 h-7 opacity-70 group-hover:opacity-100 transition-opacity z-10"
                          onClick={() => handleRemoveImage(image.id)}
                          aria-label={`Remove ${image.file.name}`}
                        >
                          <IconX className="h-4 w-4" />
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8">
                <span>No images selected.</span>
                <button
                  onClick={handleTriggerClick}
                  className="mt-2 p-3 px-6 hover:opacity-80  transition-opacity text-blue-500 dark:text-blue-400 cursor-pointer hover:bg-blue-600/5 rounded-2xl"
                >
                  Click here or the plus icon to add images.
                </button>
              </div>
            )}
          </div>

          <DrawerFooter className="flex-shrink-0 border-t border-neutral-800">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button
              onClick={handleMockUpload}
              disabled={uploadedImages.length === 0}
            >
              Upload{" "}
              {uploadedImages.length > 0 ? `(${uploadedImages.length})` : ""}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discard Changes?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved images. Closing now will discard them. Are you
              sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleAlertClose("cancel")}>
              Keep Editing
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAlertClose("clear")}>
              Discard
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UploaderComp;
