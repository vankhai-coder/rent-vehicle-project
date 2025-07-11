import Header from "./components/customer/Header"
import Footer from "@/components/customer/Footer"
import { Routes, Route } from "react-router-dom"
import Home from '@/pages/customer/Home'
import Login from "./pages/customer/Login"
import Vehicle from "./pages/customer/Vehicle"
import ForgotPassword from "./pages/customer/ForgotPassword"
import Register from "./pages/customer/Register"
import UpdateProfile from "./pages/customer/UpdateProfile"
import ProtectedRoute from "./components/customer/ProtectedRoute"
import AboutUs from "./pages/customer/AboutUs"
import ContactUs from "./pages/customer/ContactUs"
import CustomerDashboard from "./pages/customer/CustomerDashboard"
import AdminDashboard from './pages/admin/AdminDashboard'
import OwnerDashboard from "./pages/owner/OwnerDashboard"
import Details from "./pages/customer/Detail"
import { RejectOauth } from "./pages/customer/RejectOauth"
import CancelBooking from "./pages/customer/CancleBooking"
import SuccessBooking from "./pages/customer/SuccessBooking"

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
          {/* reject-oauth :  */}
          <Route path="/reject-oauth" element={<RejectOauth />} />

          {/* customer */}
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path='/cancelBooking' element={<CancelBooking />} />
          <Route path='/successBooking' element={<SuccessBooking />} />

          {/* Protected Routes for update profile :  */}
          <Route element={<ProtectedRoute allowedRoles={["customer", "owner", "admin"]} />}>
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>

          <Route path="/detail" element={<Details />}></Route>

          {/* customer-dashboard */}
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route path="/customer-dashboard/*" element={<CustomerDashboard />} />
          </Route>

          {/* owner */}
          <Route element={<ProtectedRoute allowedRoles={["owner"]} />}>
            <Route path="/owner-dashboard/*" element={<OwnerDashboard />} />
          </Route>

          {/* admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          </Route>

        </Routes>

        {/* Footer :  */}
        <Footer />
      </div>
    </div>
  )
}

export default App
