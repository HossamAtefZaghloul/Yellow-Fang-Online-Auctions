import axios from "axios";

export async function uploadItem(formData: FormData) {
  const file = formData.get('image') as File;
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const startingPrice = formData.get('startingPrice') as string;
  const auctionStartDate = formData.get('auctionStartDate') as string;

  if (!file || !name || !description || !startingPrice || !auctionStartDate) {
    return { error: 'All fields are required' };
  }

  try {
    console.log(file)
    const imageUrl = URL.createObjectURL(file);

    const response = await axios.post("/api/uploadItem", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return {
      success: true,
      data: {
        imageUrl,
        name,
        description,
        startingPrice,
        auctionStartDate,
        serverResponse: response.data, 
      },
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: 'Failed to upload file. Please try again.' };
  }
}
