import { banAccount, fetchAccountsByRole } from '@/redux/features/admin/customerSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ViewAllCustomer = () => {

  const { accounts } = useSelector(state => state.admin_account_customer)
  const dispatch = useDispatch()

  // get list of customer accounts : 
  useEffect(() => {
    dispatch(fetchAccountsByRole('customer'))
  }, [])

  // ban account : 
  const handleBanAccountById = async (accountid) => {
    await dispatch(banAccount(accountid))
    await dispatch(fetchAccountsByRole('customer'))
  }


  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-6">Customer Accounts</h1>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Identity</th>
              <th className="px-4 py-2 border">License</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Address</th>
              <th className="px-4 py-2 border">Gender</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  <div
                    className="w-16 h-16 bg-cover bg-center rounded-full"
                    style={{ backgroundImage: `url('${account.image || '/default_avt.jpg'}')` }}
                  ></div>
                </td>
                <td className="px-4 py-2 border">
                  <div
                    className="w-16 h-16 bg-cover bg-center rounded"
                    style={{ backgroundImage: `url('${account.identityCardBefore}')` }}
                  ></div>
                </td>
                <td className="px-4 py-2 border">
                  <div
                    className="w-16 h-16 bg-cover bg-center rounded"
                    style={{ backgroundImage: `url('${account.driverLicenseBefore}')` }}
                  ></div>
                </td>
                <td className="px-4 py-2 border">{account.fullName}</td>
                <td className="px-4 py-2 border">
                  {account.address}
                </td>
                <td className="px-4 py-2 border">{account.gender}</td>

                <td className="px-4 py-2 border">
                  <button
                    className={`px-3 py-1 rounded hover:cursor-pointer ${account.isBanned
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                      }`}
                    onClick={() => handleBanAccountById(account._id)}
                  >
                    {account.isBanned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewAllCustomer