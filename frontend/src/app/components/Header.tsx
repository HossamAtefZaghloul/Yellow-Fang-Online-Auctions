import Link from 'next/link'
import { Home, Upload, ShoppingBag } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Art Museum</Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="flex items-center hover:text-gray-300 transition-colors">
              <Home className="mr-2" size={18} />
              Home
            </Link>
          </li>
          <li>
            <Link href="/upload" className="flex items-center hover:text-gray-300 transition-colors">
              <Upload className="mr-2" size={18} />
              Upload
            </Link>
          </li>
          <li>
            <Link href="/shop" className="flex items-center hover:text-gray-300 transition-colors">
              <ShoppingBag className="mr-2" size={18} />
              Shop
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header