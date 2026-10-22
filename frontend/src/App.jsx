import { useEffect, useState } from 'react'
import axios from 'axios'
import { ShoppingCart } from 'lucide-react'

function App() {
  const [apiStatus, setApiStatus] = useState('Conectando al backend...')

  useEffect(() => {
    // Variable de entorno apuntando a nuestra API
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
    
    axios.get(`${apiUrl}/health`)
      .then(response => {
        setApiStatus(response.data.message)
      })
      .catch(error => {
        setApiStatus('Error conectando al backend: ' + error.message)
      })
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
        <ShoppingCart className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Tienda Tecnológica</h1>
        <p className="text-gray-600 font-medium">{apiStatus}</p>
      </div>
    </div>
  )
}

export default App