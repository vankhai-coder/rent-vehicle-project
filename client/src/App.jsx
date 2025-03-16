import Header from "./components/Header"
import Footer from "@/components/Footer"
import { Routes, Route } from "react-router-dom"
import Home from '@/pages/Home'
import Login from "./pages/Login"
import Vehicle from "./pages/Vehicle"
import MotobikeDetail from './pages/MotobikeDetail'
import ForgotPassword from "./pages/ForgotPassword"
import Register from "./pages/Register"
import UpdateProfile from "./pages/UpdateProfile"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <div className="w-full h-full bg-white">
      <div className="max-w-8/12 mx-auto ">

        {/* Header :  */}
        <Header />

        {/* Routes */}
        <Routes>

          <Route path="/" element={<Home />} />

          {/* auth: */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* customer */}
          <Route path="/vehicle" element={<Vehicle />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["customer", "owner", "admin"]} />}>
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>

          {/* owner */}


          {/* admin */}

        </Routes>

        {/* Footer :  */}
        <Footer />
      </div>
    </div>
  )
}

export default App
