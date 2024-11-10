export default function Footer() {
  return (
    <footer className="bg-background text-foreground shadow-md mt-8">
      <div className="container mx-auto px-4 py-6 text-center">
        <p>&copy; {new Date().getFullYear()} MusieMe. All rights reserved.</p>
      </div>
    </footer>
  )
}