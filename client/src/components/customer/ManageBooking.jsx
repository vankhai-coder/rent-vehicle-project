import { fetchCustomerBookings } from "@/redux/features/customer/billSlice";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatNumberWithCommas } from "@/utils/formatFunction";

const ManageBooking = () => {
  // redux :
  const dispatch = useDispatch();
  const { loading, bookings } = useSelector((state) => state.bill);

  // get :
  useEffect(() => {
    dispatch(fetchCustomerBookings());
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="animate-spin text-center" size={32} />
      </div>
    );
  }
  console.log("bills : ", bookings);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-xs md:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 md:px-4 py-2 border whitespace-nowrap">
                Customer Name
              </th>
              <th className="px-2 md:px-4 py-2 border whitespace-nowrap">
                Owner Name
              </th>
              <th className="px-2 md:px-4 py-2 border whitespace-nowrap">
                Motobike Name
              </th>
              <th className="px-2 md:px-4 py-2 border whitespace-nowrap">
                Date
              </th>
              <th className="px-2 md:px-4 py-2 border whitespace-nowrap">
                Total
              </th>
              <th className="px-2 md:px-4 py-2 border whitespace-nowrap">
                Amount
              </th>
              <th className="px-2 md:px-4 py-2 border whitespace-nowrap">
                Pickup
              </th>
              <th className="px-2 md:px-4 py-2 border whitespace-nowrap">
                Dropoff
              </th>
              <th className="px-2 md:px-4 py-2 border whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                >
                  <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
                    {booking.customerName}
                  </td>
                  <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
                    {booking.ownerName}
                  </td>
                  <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
                    {booking.motobikeName}
                  </td>
                  <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
                    {booking.date}
                  </td>
                  <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
                    {formatNumberWithCommas(booking.total)}
                  </td>
                  <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
                    {booking.amount}
                  </td>
                  <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
                    {booking.pickup}
                  </td>
                  <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
                    {booking.dropoff}
                  </td>
                  <td className="px-2 md:px-4 py-2 border whitespace-nowrap">
                    {booking.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="9"
                  className="text-center px-2 md:px-4 py-2 border"
                >
                  No bookings available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
