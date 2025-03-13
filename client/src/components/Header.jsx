import React from 'react'
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
import { Link } from 'react-router-dom';



const Header = () => {
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
      {/* <div className='flex items-center'>
                <Button variant={''} className='bg-[#5937E0] rounded-2xl px-8' > Owner Dashboard</Button>
            </div> */}

      {/* login or avatar : */}
      <div className='flex items-center'>
        {/* <Button variant={''} className='bg-[#5937E0] rounded-2xl px-8' >Log in</Button> */}
        {/* OR : */}
        <Popover>
          <PopoverTrigger>
            <Avatar className='size-12'>
              <AvatarImage src="https://github.com/shadcn.png" alt="Customer Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <Tabs defaultValue="account" className="w-[250px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <Card>
                  <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>
                      Make changes to your account here. Click save when you're done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Pedro Duarte" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" defaultValue="@peduarte" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save changes</Button>
                  </CardFooter>
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
                    <div className="space-y-1">
                      <Label htmlFor="current">Current password</Label>
                      <Input id="current" type="password" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="new">New password</Label>
                      <Input id="new" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </PopoverContent>
        </Popover>

      </div>
    </div>
  )
}

export default Header