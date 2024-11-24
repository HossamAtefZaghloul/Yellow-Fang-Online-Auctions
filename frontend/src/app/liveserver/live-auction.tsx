"use client"

import { useState, useEffect } from 'react'
import { Clock, DollarSign, Bell, AlertCircle } from 'lucide-react'
import { formatCurrency } from './utils'
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const auctionItem = {
  id: 1,
  name: "Vintage Rolex Watch",
  description: "A rare, collectible Rolex watch from the 1960s in excellent condition.",
  imageUrl: "/placeholder.svg?height=300&width=400",
  startingBid: 5000,
}

export default function LiveAuction() {
  const [currentBid, setCurrentBid] = useState(auctionItem.startingBid)
  const [bidAmount, setBidAmount] = useState('')
  const [bidHistory, setBidHistory] = useState<{ amount: number; username: string; timestamp: Date }[]>([])
  const [isAuctionEnded, setIsAuctionEnded] = useState(false)
  const [winner, setWinner] = useState<{ username: string; amount: number } | null>(null)
  const [timer, setTimer] = useState(60)
  const [errorMessage, setErrorMessage] = useState('')

  const { email } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (!isAuctionEnded) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval)
            endAuction()
            return 0
          }
          return prevTimer - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isAuctionEnded])

  const endAuction = () => {
    setIsAuctionEnded(true)
    if (bidHistory.length > 0) {
      const lastBid = bidHistory[0]
      setWinner({ username: lastBid.username, amount: lastBid.amount })
    } else {
      setWinner(null)
    }
  }

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const bidValue = parseFloat(bidAmount)
    if (bidValue <= 0) {
      setErrorMessage('Bid must be greater than zero!')
      return
    }
    if (bidValue > currentBid) {
      const confirmBid = window.confirm(`Are you sure you want to place a bid of ${formatCurrency(bidValue)}?`)
      if (confirmBid) {
        setCurrentBid(bidValue)
        const newBid = { amount: bidValue, username: email, timestamp: new Date() }
        setBidHistory([newBid, ...bidHistory.slice(0, 4)])
        setBidAmount('')
        setTimer(60) 
        setErrorMessage('')
      }
    } else {
      setErrorMessage('Your bid must be higher than the current bid!')
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 m-1">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{auctionItem.name}</h2>
          <img src={auctionItem.imageUrl} alt={auctionItem.name} className="w-[500px] h-[500px] mb-4 rounded-lg" />
          <p className="text-gray-600 mb-4">{auctionItem.description}</p>
          <div className="text-2xl font-bold mb-4 flex items-center">
            <DollarSign className="mr-2" />
            Current Bid: {formatCurrency(currentBid)}
          </div>
          {!isAuctionEnded ? (
            <>
              <form onSubmit={handleBidSubmit} className="flex flex-col gap-2 mb-4">
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="Enter your bid"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Place Bid
                  </button>
                </div>
                {errorMessage && (
                  <div className="flex items-center text-red-500 mt-2">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
              <div className="text-lg font-semibold">
                Time remaining: {timer} seconds
              </div>
            </>
          ) : (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p className="font-bold">Auction Ended!</p>
              {winner ? (
                <p>Winner: {winner.username} with a bid of {formatCurrency(winner.amount)}</p>
              ) : (
                <p>No bids were placed.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Bids</h2>
          {bidHistory.length > 0 ? (
            <ul className="space-y-2">
              {bidHistory.map((bid, index) => (
                <li key={index} className="flex justify-between items-center border-b border-gray-200 py-2 last:border-b-0">
                  <span className="font-semibold">{formatCurrency(bid.amount)} by {bid.username}</span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {bid.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No bids yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
