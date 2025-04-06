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
  AlertDialogTrigger,
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
        return [...prevImages, ...newImages];
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
      return prevImages.filter((image) => image.id !== id);
    });
  }, []);

  React.useEffect(() => {
    return () => {
      uploadedImages.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [uploadedImages]);

  const handleMockUpload = useCallback(() => {
    console.log("Uploading images...", uploadedImages);
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
      setOpen(false);
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
            onClick={handleTriggerClick}
          >
            <span className="text-white text-sm">Upload Images</span>
          </Button>
        </DrawerTrigger>
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
        <DrawerContent>
          <DrawerHeader className="flex justify-between flex-row">
            <div>
              <DrawerTitle>Confirm Image Upload</DrawerTitle>
              <DrawerDescription>
                Review your images before uploading.
              </DrawerDescription>
            </div>
            <button
              onClick={handleTriggerClick}
              className="p-0.5 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <IconSquareRoundedPlusFilled size={32} className="opacity-60" />
            </button>
          </DrawerHeader>
          {uploadedImages.length > 0 ? (
            <Carousel
              opts={{ align: "start", loop: uploadedImages.length > 2 }}
              plugins={
                uploadedImages.length > 1
                  ? [Autoplay({ delay: 3000, stopOnInteraction: true })]
                  : []
              }
              className="w-full px-4"
            >
              <CarouselContent className="p-4 ">
                {uploadedImages.map((image) => (
                  <CarouselItem
                    key={image.id}
                    className=" md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="relative group">
                      <Image
                        src={image.preview}
                        alt={image.file.name}
                        width={300}
                        height={300}
                        className="object-cover w-full rounded-md border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 rounded-full w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(image.id)}
                        aria-label={`Remove ${image.file.name}`}
                      >
                        <IconX className="h-3 w-3" />
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              No images selected. Click the plus icon to add images.
            </div>
          )}
          <DrawerFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
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
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Closing will remove all selected images. Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => handleAlertClose("cancel")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => handleAlertClose("clear")}>
              Clear
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UploaderComp;
