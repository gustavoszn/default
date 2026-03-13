import { useState } from 'react'
import NossoDia from './NossoDia'
import DiaDosNamorados from './DiaDosNamorados'

function App() {
  const [currentPage, setCurrentPage] = useState('profile')

  const handleProfileClick = () => {
    setCurrentPage('namorados')
  }

  if (currentPage === 'namorados') {
    return <DiaDosNamorados />
  }

  return (
    <NossoDia onProfileClick={handleProfileClick} />
  )
}

export default App