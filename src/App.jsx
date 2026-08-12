import { Routes, Route } from 'react-router-dom'
import BrowseCreators from './components/BrowseCreators'
import CreatorProfile from './components/CreatorProfile'
import SubscribeFlow from './components/SubscribeFlow'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BrowseCreators />} />
      <Route path="/creators/:slug" element={<CreatorProfile />} />
      <Route path="/creators/:slug/subscribe" element={<SubscribeFlow />} />
    </Routes>
  )
}

export default App
