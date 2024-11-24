"use client";
import { useEffect, useState } from 'react'
import { Clock, DollarSign, History, Info } from 'lucide-react'
import axios from 'axios';

interface AuctionData {
  _id: string;
  name: string;
  description: string;
  startingPrice: number;
  currentBid?: number;
  auctionStatus: string;
}
export default function AuctionPage() {
  const [bidAmount, setBidAmount] = useState('')
  const [auction, setAuction] = useState<AuctionData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveAuction = async () => {
      try {
        const response = await axios.get('/api/get_live_auction'); 
        if (response.data.success) {
          setAuction(response.data.data);
        } else {
          setError(response.data.error || 'Failed to fetch live auction');
        }
      } catch (err) {
        setError('An error occurred while fetching live auction');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveAuction();
  }, []); 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: 404</p>;
  console.log(auction);
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Exclusive Single Item Auction</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img
                src={auction.image}
                alt="Vintage Leather Armchair"
                className="w-[500px] h-[500px] rounded-lg shadow-lg"
              />
            </div>

            <div className="md:w-1/2 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">{auction.name}</h2>
                <p className="mt-2 text-gray-600">{auction.description}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 text-green-500 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">{auction.startingPrice}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-5 w-5 mr-1" />
                    <span>2h 15m left</span>
                  </div>
                </div>

                <form className="mt-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex items-center">
                    <input
                      type="number"
                      placeholder="Enter your bid"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="flex-grow mr-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Place Bid
                    </button>
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  Item Details
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  <li>Condition: Excellent</li>
                  <li>Year: Circa 1960</li>
                  <li>Material: Genuine leather, solid wood frame</li>
                  <li>Dimensions: 32" W x 34" D x 38" H</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bid History */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <History className="h-6 w-6 mr-2 text-indigo-500" />
              Bid History
            </h3>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <ul className="divide-y divide-gray-200">
                {[
                  { name: "Alex Thompson", amount: "$1,250", time: "2 hours ago" },
                  { name: "Sarah Lee", amount: "$1,200", time: "3 hours ago" },
                  { name: "Mike Johnson", amount: "$1,150", time: "5 hours ago" },
                ].map((bid, index) => (
                  <li key={index} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{bid.name}</p>
                        <p className="text-sm text-gray-500">{bid.time}</p>
                      </div>
                      <p className="text-sm font-semibold text-green-600">{bid.amount}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

