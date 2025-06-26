"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useGetSignedUrlMutation } from "@/features/api/properties.api";

const SignedImage = ({
  imageUrl,
  width = 500,
  height = 500,
  alt = "Property Image",
}) => {
  // useGetSignedUrlMutation returns a tuple: the trigger function and an object containing data, error, and isLoading.
  const [getSignedUrl, { data, error, isLoading, isSuccess }] =
    useGetSignedUrlMutation();

  // When imageUrl becomes defined, trigger the mutation.
  useEffect(() => {
    if (imageUrl) {
      getSignedUrl(imageUrl);
    }
  }, [imageUrl, getSignedUrl]);

  // Optionally, log status:
  console.log("SignedImage status:", { isLoading, error, data });

  if (isLoading) return <p>Loading image...</p>;
  if (error) return <p>Error loading image</p>;

  // Expect the API response to be an object like { signedUrl: '...' }
  if (!isSuccess || !data?.signedUrl)
    return <p>No signed URL for this image...</p>;

  return <Image src={data.signedUrl} width={width} height={height} alt={alt} />;
};

export default SignedImage;
