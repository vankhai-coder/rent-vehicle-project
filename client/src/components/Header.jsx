import React, { useEffect, useState } from 'react'
import { Car } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { logoutUser, updatePassword } from '@/redux/features/userSlice';


const Header = () => {

  // redirect : 
  const navigate = useNavigate()
  // redux state : 
  const dispatch = useDispatch()
  const { role, userId, userImage, loading, error, errorMessage, updatePasswordSuccess } = useSelector(state => state.user)

  // state : 
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // update password function : 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // requied field : 
    if (!currentPassword) {
      toast.error('Current password is required!')
      return
    }
    if (!newPassword) {
      toast.error('New password is required!')
      return
    }
    if (!confirmPassword) {
      toast.error('Confirm password is required!')
      return
    }
    // check match : 
    if (newPassword !== confirmPassword) {
      toast.error('Confirm password do not match!')
      return;
    }
    // update password : 
    dispatch(updatePassword({ currentPassword, newPassword }))

  };
  // logout function : 
  const handleLogout = () => {
    dispatch(logoutUser())
  }
  // toast error : 
  useEffect(() => {
    if (error) {
      toast.error(errorMessage || 'Error when update password , try again!')
      return
    }
    if (!error && updatePasswordSuccess) {
      toast.success('Change password successfully!')
      dispatch(logoutUser())
      return
    }

  }, [error, errorMessage, updatePasswordSuccess])
  return (
    // header : 
    <div className='flex  justify-between bg-white py-3'>

      {/* logo : */}
      <div className='flex items-center justify-center '>
        {/* logo image :  */}
        <div>
          <Car color="black" size={48} fill='true' />
        </div>
        <div className='flex justify-center'>
          <Link to={'/'}>
            <p className='font-bold ml-2'>V5 Rental</p>
          </Link>
        </div>
      </div>

      {/* navigate :  */}
      <div className='flex items-center space-x-6'>
        <Link to={'/'}>
          <p className='font-bold text-sm'>Home</p>
        </Link>
        <Link to={'/vehicle'}><p className='font-medium text-sm'>Vehicle</p></Link>
        <Link to={'/detail'}><p className='font-medium text-sm'>Detail</p></Link>
        <p className='font-medium text-sm'>About Us</p>
        <p className='font-medium text-sm'>Contact Us</p>
      </div>

      {/* owner dashboard */}
      {role === 'owner' ? <div className='flex items-center'>
        <Button variant={''} className='bg-[#5937E0] rounded-2xl px-8' > Owner Dashboard</Button>
      </div> : <></>}

      {/* admin dashboard */}
      {role === 'admin' ? <div className='flex items-center'>
        <Button variant={''} className='bg-[#5937E0] rounded-2xl px-8' > Admin Dashboard</Button>
      </div> : <></>}

      {/* login or avatar : */}
      <div className='flex items-center'>
        {!userId ? <Link to={'/login'} ><Button variant={''} className='bg-[#5937E0] rounded-2xl px-8' >Log in</Button></Link> :
          <Popover>
            <PopoverTrigger>
              <Avatar className='size-12'>
                <AvatarImage src={userImage ? userImage : './default_avt.jpg'} alt="Customer Avatar" />
                <AvatarFallback>Customer Avatar</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent>
              <Tabs defaultValue="account" className="w-[250px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                  <Card className={'flex gap-2 items-center'}>
                    {role === 'user' ? <Button variant='outline' className='w-2/3'>Manage Rental</Button> : <></>}
                    {role === 'user' ? <Button variant='outline' className='w-2/3'>Become Owner</Button> : <></>}
                    {role === 'owner' ? <Button variant='outline' className='w-2/3'>Owner Dashboard</Button> : <></>}
                    {role === 'admin' ? <Button variant='outline' className='w-2/3'>Admin Dashboard</Button> : <></>}
                    <Button variant='outline' className='w-2/3'>Update Profile</Button>
                    <Button variant='outline' className='w-2/3 hover:cursor-pointer' onClick={handleLogout} >Logout</Button>
                  </Card>
                </TabsContent>
                <TabsContent value="password">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>
                        Change your password here. After saving, you'll be logged out.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-1">
                          <Label htmlFor="current1">Current password</Label>
                          <Input
                            id="current"
                            type="password"
                            required
                            value={currentPassword}
                            autoComplete="off"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="new">New password</Label>
                          <Input
                            id="new"
                            type="password"
                            required
                            autoComplete="off"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="confirm">Confirm password</Label>
                          <Input
                            id="confirm"
                            type="password"
                            autoComplete="off"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={handleSubmit}
                        className={`${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {loading ? 'Updating...' : ' Update password'}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>
        }
      </div>
    </div>
  )
}

export default Header