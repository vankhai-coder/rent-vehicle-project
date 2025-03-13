import Header from "./components/Header"
import Footer from "@/components/Footer"
import { Routes, Route } from "react-router-dom"
import Home from '@/pages/Home'
import Login from "./pages/Login"
import Vehicle from "./pages/Vehicle"
import MotobikeDetail from './pages/MotobikeDetail'

function App() {
  return (
    <div className="w-full h-full bg-white">
      <div className="max-w-8/12 mx-auto ">

        {/* Header :  */}
        <Header />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/detail" element={<MotobikeDetail />} />
          {/* <Route path="/post" element={<Post />} />  */}
        </Routes>

        {/* Footer :  */}
        <Footer />
      </div>
    </div>
  )
}

export default App
