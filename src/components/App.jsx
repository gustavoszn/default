import { useState } from 'react'
import NossoDia from './NossoDia'
import DiaDosNamorados from './DiaDosNamorados'
import LoadingScreen from './LoadingScreen'

export default function App() {
  const [page,    setPage]    = useState('profile')
  const [loading, setLoading] = useState(false)

  if (loading) return <LoadingScreen onFinish={() => { setLoading(false); setPage('namorados') }} />
  if (page === 'namorados') return <DiaDosNamorados />
  return <NossoDia onProfileClick={() => setLoading(true)} />
}
