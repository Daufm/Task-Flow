import { Routes, Route } from 'react-router-dom'
import Content from './content.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import Home from './Homepage.jsx'
import Setting from './setting.jsx'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/settings" element={<Setting />} />
      <Route path="/" element={<Home />}>
        <Route index element={<Content />} /> {/* for "/" */}
        <Route path="cat" element={<Content />} />
        <Route path="filter" element={<Content />} />
      </Route>
</Routes>
  )
}

export default App
