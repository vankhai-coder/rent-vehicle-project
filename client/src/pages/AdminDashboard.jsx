import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, banUser, deleteUser } from '@/redux/features/customer/userSlice';
import { getBookings, deleteBooking } from '@/redux/features/customer/bookingSlice';
import { getMotobikes, deleteMotobike } from '@/redux/features/customer/motobikeSlice';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { users, loading: usersLoading } = useSelector(state => state.user);
    const { bookings, loading: bookingsLoading } = useSelector(state => state.booking);
    const { motobikes, loading: motobikesLoading } = useSelector(state => state.motobike);

    const [activeTab, setActiveTab] = useState('users');
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    
    // Add pagination state for motobikes
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Calculate pagination for motobikes
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMotobikes = motobikes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(motobikes.length / itemsPerPage);

    // Debug logs for motobikes state
    useEffect(() => {
        dispatch(getUsers());
        dispatch(getBookings());
        dispatch(getMotobikes());
    }, [dispatch]);

    // Separate useEffect for motobikes tab
    useEffect(() => {
        if (activeTab === 'motobikes') {
            dispatch(getMotobikes());
        }
    }, [activeTab, dispatch]);

    const handleBanUser = (userId) => {
        dispatch(banUser(userId))
            .unwrap()
            .then((response) => {
                toast.success(response.message || 'User status updated successfully');
                // Refresh the users list
                dispatch(getUsers());
            })
            .catch((error) => {
                toast.error(error || 'Error updating user status');
            });
    };

    const openDeleteConfirmation = (user) => {
        setUserToDelete(user);
        setShowConfirmDialog(true);
    };

    const confirmDeleteUser = () => {
        if (!userToDelete) return;
        
        dispatch(deleteUser(userToDelete._id))
            .unwrap()
            .then((response) => {
                toast.success('User deleted successfully');
                setShowConfirmDialog(false);
                setUserToDelete(null);
            })
            .catch((error) => {
                toast.error(error || 'Error deleting user');
                setShowConfirmDialog(false);
                setUserToDelete(null);
            });
    };

    const cancelDeleteUser = () => {
        setShowConfirmDialog(false);
        setUserToDelete(null);
    };

    const handleDeleteBooking = (bookingId) => {
        if (!bookingId) {
            toast.error('Invalid booking ID');
            return;
        }
        
        dispatch(deleteBooking(bookingId))
            .unwrap()
            .then((response) => {
                toast.success(response.message || 'Booking deleted successfully');
                // Refresh the bookings list
                dispatch(getBookings());
            })
            .catch((error) => {
                toast.error(error || 'Error deleting booking');
            });
    };

    const handleDeleteMotobike = (motobikeId) => {
        dispatch(deleteMotobike(motobikeId))
            .unwrap()
            .then((response) => {
                toast.success('Motobike deleted successfully');
                // Refresh the motobikes list
                dispatch(getMotobikes());
            })
            .catch((error) => {
                toast.error(error || 'Error deleting motobike');
            });
    };

    // Add pagination controls component
    const Pagination = () => {
        return (
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    Previous
                </button>
                <span className="px-3 py-1">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                    Next
                </button>
            </div>
        );
    };

   return (
        <div className="admin-dashboard min-h-screen bg-gray-50">
            <div className="flex">
                {/* Sidebar Navigation */}
                <div className="w-64 bg-white h-screen shadow-xl p-4 border-r border-gray-200">
                    <h1 className="text-2xl font-bold mb-8 text-gray-800 pl-3">Admin Panel</h1>
                    <nav className="space-y-1">
                        <button 
                            onClick={() => setActiveTab('users')}
                            className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 flex items-center
                                ${activeTab === 'users' 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}>
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                            </svg>
                            Users
                        </button>
                        
                        <button 
                            onClick={() => setActiveTab('bookings')}
                            className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 flex items-center
                                ${activeTab === 'bookings' 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}>
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                            Bookings
                        </button>
                        
                        <button 
                            onClick={() => setActiveTab('motobikes')}
                            className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 flex items-center
                                ${activeTab === 'motobikes' 
                                    ? 'bg-blue-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}>
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                            </svg>
                            Motobikes
                        </button>
                    </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Users Tab */}
                        {activeTab === 'users' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800">Users Management</h2>
                                </div>
                                <div className="p-6">
                                    {usersLoading ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                            <p className="mt-4">Loading users...</p>
                                        </div>
                                    ) : users && users.length > 0 ? (
                                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                                            <table className="w-full">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Role</th>
                                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                                                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {users.map((user) => (
                                                        <tr key={user._id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    {user.role}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-sm">
                                                                {user.isBanned ? (
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                                        Banned
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                        Active
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="px-6 py-4 text-right text-sm">
                                                                <button 
                                                                    onClick={() => handleBanUser(user._id)}
                                                                    className="text-red-600 hover:text-red-900 font-medium mr-4">
                                                                    {user.isBanned ? 'Unban' : 'Ban'}
                                                                </button>
                                                                <button 
                                                                    onClick={() => openDeleteConfirmation(user)}
                                                                    className="text-red-600 hover:text-red-900 font-medium">
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <p className="text-lg">No users found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Bookings Tab */}
                        {activeTab === 'bookings' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800">Booking Management</h2>
                                </div>
                                <div className="p-6">
                                    {bookingsLoading ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                            <p className="mt-4">Loading bookings...</p>
                                        </div>
                                    ) : bookings && bookings.length > 0 ? (
                                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                                            <table className="w-full">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Customer</th>
                                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Owner</th>
                                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Motobike</th>
                                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Total Price</th>
                                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                                                        <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {bookings.map((booking) => (
                                                        <tr key={booking._id} className="hover:bg-gray-50">
                                                            <td className="px-6 py-4 text-sm text-gray-700">{booking.customerName}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-700">{booking.ownerName}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-700">{booking.motobikeName}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-700">{booking.date}</td>
                                                            <td className="px-6 py-4 text-sm text-gray-700">${booking.total}</td>
                                                            <td className="px-6 py-4 text-sm">
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                                    {booking.status}
                                                                </span>
                                                            </td>
                                                            <td className="px-6 py-4 text-right text-sm">
                                                                <button 
                                                                    onClick={() => handleDeleteBooking(booking._id)}
                                                                    className="text-red-600 hover:text-red-900 font-medium">
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <p className="text-lg">No bookings found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Motobikes Tab */}
                        {activeTab === 'motobikes' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800">Motobike Management</h2>
                                </div>
                                <div className="p-6">
                                    {motobikesLoading ? (
                                        <div className="text-center py-8 text-gray-500">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                            <p className="mt-4">Loading motobikes...</p>
                                        </div>
                                    ) : currentMotobikes && currentMotobikes.length > 0 ? (
                                        <>
                                            <div className="overflow-x-auto rounded-lg border border-gray-200">
                                                <table className="w-full">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Vehicle Number</th>
                                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Type</th>
                                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Price/Day</th>
                                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Owner</th>
                                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Location</th>
                                                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                                                            <th className="px-6 py-4 text-right text-sm font-medium text-gray-700">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {currentMotobikes.map((motobike) => (
                                                            <tr key={motobike._id} className="hover:bg-gray-50">
                                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                                    {motobike.vehicleNumber || 'N/A'}
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                                    {motobike.motobikeType?.name || 'N/A'}
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                                    {motobike.pricePerDay ? `$${Number(motobike.pricePerDay).toLocaleString()}` : 'N/A'}
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                                    {(motobike.owner?.fullName || motobike.owner?.email) || 'N/A'}
                                                                </td>
                                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                                    {motobike.storeLocation ? 
                                                                        `${motobike.storeLocation.district || ''} ${motobike.storeLocation.commune ? `, ${motobike.storeLocation.commune}` : ''}`
                                                                        : 'N/A'
                                                                    }
                                                                </td>
                                                                <td className="px-6 py-4 text-sm">
                                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                                        motobike.isAvailable 
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : 'bg-red-100 text-red-800'
                                                                    }`}>
                                                                        {motobike.isAvailable ? 'Available' : 'Not Available'}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 text-right text-sm">
                                                                    <button 
                                                                        onClick={() => handleDeleteMotobike(motobike._id)}
                                                                        className="text-red-600 hover:text-red-900 font-medium">
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Pagination />
                                        </>
                                    ) : (
                                        <div className="text-center py-12 text-gray-500">
                                            <p className="text-lg">No motobikes found</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Confirmation Dialog */}
            {showConfirmDialog && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                        <p className="mb-6">
                            Are you sure you want to delete the user <span className="font-bold">{userToDelete?.email}</span>? 
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={cancelDeleteUser}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteUser}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;