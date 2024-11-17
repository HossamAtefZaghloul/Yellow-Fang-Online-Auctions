import axios from "axios";

export async function uploadItem(formData: FormData) {
  const file = formData.get("file") as File;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const startingPrice = formData.get('startingPrice') as string;
  const auctionStartDate = formData.get('auctionStartDate') as string;

  if (!file || !name || !description || !startingPrice || !auctionStartDate) {
    return { error: 'All fields are required' };
  }

  try {
    const response = await axios.post("/api/uploadItem", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: {
        name,
        description,
        startingPrice,
        auctionStartDate,
        imagePath: response.data.artifact.file, 
        serverResponse: response.data, 
      },
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: 'Failed to upload file. Please try again.' };
  }
}
