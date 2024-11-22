import axios from "axios";

export async function loadAuctionsToRedis() {
  try {
    const { data } = await axios.get("/api/init");

    return data; 
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw new Error("Failed to fetch auctions.");
  }
}
