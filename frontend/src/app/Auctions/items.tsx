"use client";

import { useState, useEffect } from "react";
import { Star, Calendar, Clock, DollarSign } from "lucide-react";
import Image from "next/image";

// Define the updated Artifact interface
interface Artifact {
  id: number;
  name: string;
  description: string;
  image: string;
  auctionStartDate: string;
  startingPrice: number;
}

// Sample data (replace this with your actual data fetching logic)
const sampleArtifacts: Artifact[] = [
  {
    id: 1,
    name: "123",
    description: "1dad",
    image: "/uploads/1731794189337-3.jpg",
    auctionStartDate: "2024-11-18T21:56:29.348+00:00",
    startingPrice: 123123,
  },
  {
    id: 2,
    name: "Ancient Vase",
    description: "A beautifully preserved vase from the 5th century",
    image: "/artifacts/1.jpg",
    auctionStartDate: "2024-11-17T21:56:29.328+00:00",
    startingPrice: 5000,
  },
  {
    id: 3,
    name: "Medieval Sword",
    description: "A well-crafted sword from the medieval period",
    image: "/artifacts/17.jpg",
    auctionStartDate: "2024-11-16T21:56:29.348+00:00",
    startingPrice: 10000,
  },
  {
    id: 4,
    name: "Renaissance Painting",
    description: "A masterpiece from the Renaissance era",
    image: "/artifacts/18.jpg",
    auctionStartDate: "2024-11-16T21:56:29.348+00:00",
    startingPrice: 50000,
  },
];

// Function to format the countdown
const formatCountdown = (timeLeft: number) => {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
// StarArtifact component for the upcoming artifact
const StarArtifact = ({ artifact }: { artifact: Artifact }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const auctionStart = new Date(artifact.auctionStartDate).getTime();
      const timeLeft = auctionStart - now;

      if (timeLeft > 0) {
        setCountdown(formatCountdown(timeLeft));
      } else {
        setCountdown("Auction has started!");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [artifact.auctionStartDate]);

  return (
    <div className="bg-primary text-primary-foreground p-6 rounded-lg shadow-lg mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{artifact.name}</h2>
        <Star className="w-8 h-8 text-yellow-300" />
      </div>
      <div className="flex items-center justify-center w-full h-[400px] object-cover rounded-md mb-4 bg-white"><Image
        src={artifact.image}
        alt={artifact.name}
        width={300}
        height={300}
        className=""
      /></div>
      
      <p className="mb-4">{artifact.description}</p>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          <span>{new Date(artifact.auctionStartDate).toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 mr-2" />
          <span>Starting at ${artifact.startingPrice.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex items-center text-lg font-semibold">
        <Clock className="w-5 h-5 mr-2" />
        <span>{countdown}</span>
      </div>
    </div>
  );
};

// ArtifactCard component for regular artifacts
const ArtifactCard = ({ artifact }: { artifact: Artifact }) => (
  <div className="bg-card text-card-foreground p-4 rounded-lg shadow">
    <h3 className="text-lg font-semibold mb-2">{artifact.name}</h3>
    <img
      src={artifact.image}
      alt={artifact.name}
      className="w-full h-40 object-cover rounded-md mb-2"
    />
    <p className="text-sm mb-2">{artifact.description}</p>
    <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-1" />
        <span>{new Date(artifact.auctionStartDate).toLocaleString()}</span>
      </div>
      <div className="flex items-center">
        <DollarSign className="w-4 h-4 mr-1" />
        <span>${artifact.startingPrice.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

export default function ArtifactsAuctionPage() {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    // Simulating data fetching
    setArtifacts(sampleArtifacts);
  }, []);

  // Sort artifacts by auction start date and find the upcoming one
  const sortedArtifacts = [...artifacts].sort(
    (a, b) =>
      new Date(a.auctionStartDate).getTime() -
      new Date(b.auctionStartDate).getTime()
  );
  const upcomingArtifact = sortedArtifacts.find(
    (artifact) => new Date(artifact.auctionStartDate) > new Date()
  );
  const remainingArtifacts = sortedArtifacts.filter(
    (artifact) => artifact.id !== upcomingArtifact?.id
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Artifact Auctions</h1>

      {upcomingArtifact && <StarArtifact artifact={upcomingArtifact} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {remainingArtifacts.map((artifact) => (
          <ArtifactCard key={artifact.id} artifact={artifact} />
        ))}
      </div>
    </div>
  );
}
