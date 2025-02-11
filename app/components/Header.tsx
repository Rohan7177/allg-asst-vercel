import { Utensils } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center space-x-4">
        <Utensils className="w-10 h-10 text-purple-600" />
        <h1 className="text-3xl font-bold text-purple-700">Allergy Assistant</h1>
      </div>
    </header>
  )
}
