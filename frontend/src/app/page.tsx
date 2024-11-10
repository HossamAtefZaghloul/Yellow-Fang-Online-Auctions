"use client";
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const featuredItems = [
    { id: 1, title: "Ancient Vase", type: "Artifact", image: "/artifacts/13.jpg" },
    { id: 2, title: "Renaissance Painting", type: "Painting", image: "/artifacts/21.jpg" },
    { id: 3, title: "Modern Sculpture", type: "Artifact", image: "/artifacts/3.jpg" },
    { id: 4, title: "Impressionist Landscape", type: "Painting", image: "/artifacts/4.jpg" },
    { id: 5, title: "Ancient Vase", type: "Artifact", image: "/artifacts/5.jpg" },
    { id: 6, title: "Renaissance Painting", type: "Painting", image: "/artifacts/6.jpg" },
    { id: 7, title: "Modern Sculpture", type: "Artifact", image: "/artifacts/7.jpg" },
    { id: 8, title: "Impressionist Landscape", type: "Painting", image: "/artifacts/8.jpg" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to MusieMe</h1>
      <p className="text-xl mb-8 text-center">Discover our collection of exquisite paintings and rare artifacts.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredItems.map((item) => (
          <div key={item.id} className={`bg-card text-card-foreground rounded-lg shadow-md overflow-hidden border-2  hover-Artifact`}>
            <Image onClick={() => setHoveredImage(item.image)}
              src={item.image} alt={item.title} width={400} height={300}
              className="flex w-full h-[300px] object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-muted-foreground">{item.type}</p>
            </div>
          </div>
        ))}
        {hoveredImage && (
          <div onClick={() => { setHoveredImage(null) }} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative">
              <Image src={hoveredImage} alt="Hovered" width={500} height={500} className=" rounded-l-lg w-full h-[500px] object-cover" />
            </div>
            <div className=' w-[200px] h-[500px] p-2 rounded-r-lg bg-color'>
              Description : <hr className="bg-gray-400 h-px border-0" />
              <span className='bg-color text-xs	'>This sword is Priceless</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}