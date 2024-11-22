"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  DollarSign,
  Calendar,
  FileText,
  ImageIcon,
} from "lucide-react";
import { uploadItem } from "./uploadItem";
import Image from "next/image";
import {loadAuctionsToRedis} from "./loadAuctionsToRedis" 

export default function AuctionItemUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); 

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    setIsUploading(true);
    const result = await uploadItem(formData);
    setIsUploading(false);

    if (result.error) {
      console.log('Upload failed:', result.error);
    } else {
      console.log("Item uploaded successfully:", result.data);
      await loadAuctionsToRedis(); 
      router.push("/auctions");
    }
  }

  return (
    <div className="m-1 bg-color max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <Upload className="mr-2" /> Upload Auction Item
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="image"
            className="text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <ImageIcon className="mr-2" size={18} /> Image
          </label>
          <input
            onChange={handleImageChange}
            id="image"
            name="file"
            type="file"
            accept="image/*"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {imagePreview && (
          <div className="w-full my-4 flex justify-center">
            <Image
              src={imagePreview}
              width={200}
              height={200}
              alt="Preview"
            />
          </div>
        )}
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <FileText className="mr-2" size={18} /> Item Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <FileText className="mr-2" size={18} /> Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="startingPrice"
            className="text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <DollarSign className="mr-2" size={18} /> Starting Price
          </label>
          <input
            id="startingPrice"
            name="startingPrice"
            type="number"
            min="0"
            step="0.01"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="auctionStartDate"
            className="text-sm font-medium text-gray-700 mb-1 flex items-center"
          >
            <Calendar className="mr-2" size={18} /> Auction Start Date
          </label>
          <input
            id="auctionStartDate"
            name="auctionStartDate"
            type="datetime-local"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Upload Item"}
        </button>
      </form>
    </div>
  );
}
