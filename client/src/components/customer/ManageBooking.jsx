import { fetchCustomerBookings } from "@/redux/features/customer/billSlice"
import { Loader } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ManageBooking = () => {

  // redux : 
  const dispatch = useDispatch()
  const { loading, bookings } = useSelector(state => state.bill)

  // get : 
  useEffect(() => {
    dispatch(fetchCustomerBookings())
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center">
      <Loader className="animate-spin text-center" size={32} />
    </div>
  }
  console.log('bills : ', bookings);

  return (
    <div>
      <div className="overflow-x-auwto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Customer Name</th>
              <th className="px-4 py-2 border">Owner Name</th>
              <th className="px-4 py-2 border">Motobike Name</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Pickup</th>
              <th className="px-4 py-2 border">Dropoff</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-4 py-2 border">{booking.customerName}</td>
                  <td className="px-4 py-2 border">{booking.ownerName}</td>
                  <td className="px-4 py-2 border">{booking.motobikeName}</td>
                  <td className="px-4 py-2 border">{booking.date}</td>
                  <td className="px-4 py-2 border">{booking.total}</td>
                  <td className="px-4 py-2 border">{booking.amount}</td>
                  <td className="px-4 py-2 border">{booking.pickup}</td>
                  <td className="px-4 py-2 border">{booking.dropoff}</td>
                  <td className="px-4 py-2 border">{booking.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center px-4 py-2 border">
                  No bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageBooking