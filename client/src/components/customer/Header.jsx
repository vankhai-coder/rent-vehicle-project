import React, { useEffect, useState } from "react";
import { Car, Menu, X } from "lucide-react";
import { Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  logoutUser,
  resetUser,
  setUpdatePasswordFalse,
  updatePassword,
} from "@/redux/features/customer/userSlice";
import { store } from "@/redux/store/store";
import {
  getUserProfile,
  resetUserProfile,
} from "@/redux/features/customer/userProfileSlice";

const Header = () => {
  // redirect :
  const navigate = useNavigate();
  // redux state :
  const dispatch = useDispatch();
  const { fullName, image } = useSelector((state) => state.userProfile);
  const {
    role,
    userId,
    loading,
    error,
    errorMessage,
    updatePasswordSuccess,
    email,
  } = useSelector((state) => state.user);
  // state :
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // state for popup when click avatar :
  const [open, setOpen] = useState(false);

  // state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // update password function :
  const handleSubmit = async (e) => {
    e.preventDefault();
    // requied field :
    if (!currentPassword) {
      toast.error("Current password is required!");
      return;
    }
    if (!newPassword) {
      toast.error("New password is required!");
      return;
    }
    if (!confirmPassword) {
      toast.error("Confirm password is required!");
      return;
    }
    // check match :
    if (newPassword !== confirmPassword) {
      toast.error("Confirm password do not match!");
      return;
    }
    // update password :
    await dispatch(updatePassword({ currentPassword, newPassword }));

    setCurrentPassword("");
    setConfirmPassword("");
    setNewPassword("");
  };
  // logout function :
  const handleLogout = async () => {
    await dispatch(logoutUser());
    await dispatch(resetUserProfile());
    await dispatch(resetUser());
    // check error :
    if (!error && !loading) {
      setOpen((prev) => !prev);
      setMobileMenuOpen(false);
      window.scrollTo(0, 0);
      navigate("/login");
      return;
    }
  };
  // toast error :
  useEffect(() => {
    if (error) {
      toast.error(errorMessage || "Error when update password , try again!");
      return;
    }
    if (!error && updatePasswordSuccess) {
      toast.success("Change password successfully!");
      setOpen((prev) => !prev);
      store.dispatch(setUpdatePasswordFalse());
      return;
    }
  }, [error, errorMessage, updatePasswordSuccess]);

  // useEffect to get user profile :
  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile());
    }
    return;
  }, []);

  if (loading) {
    return <Loader className="animate-spin" />;
  }

  return (
    // header :
    <div className="flex justify-between bg-white py-3 px-4 md:px-6 lg:px-8 relative">
      {/* Logo bên trái */}
      <div className="flex items-center justify-center">
        <Car color="black" size={48} fill="true" />
        <div className="flex justify-center">
          <Link to={"/"}>
            <p className="font-bold ml-2">V5 Rental</p>
          </Link>
        </div>
      </div>

      {/* Desktop Navigation - giữ nguyên như ban đầu */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to={"/"}>
          <p className="font-bold text-sm">Home</p>
        </Link>
        <Link to={"/vehicle"}>
          <p className="font-medium text-sm">Vehicle</p>
        </Link>
        <Link to={"/about-us"}>
          {" "}
          <p className="font-medium text-sm">About Us</p>
        </Link>
        <Link to={"/contact-us"}>
          {" "}
          <p className="font-medium text-sm">Contact Us</p>
        </Link>
      </div>

      {/* Desktop Dashboard Buttons - giữ nguyên như ban đầu */}
      <div className="hidden md:flex items-center">
        {/* owner dashboard */}
        {role === "owner" ? (
          <div className="flex items-center">
            <Link to={"/owner-dashboard"}>
              <Button variant={""} className="bg-[#5937E0] rounded-2xl px-8">
                {" "}
                Owner Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <></>
        )}

        {/* admin dashboard */}
        {role === "admin" ? (
          <div className="flex items-center">
            <Link to={"/admin-dashboard"}>
              <Button variant={""} className="bg-[#5937E0] rounded-2xl px-8">
                {" "}
                Admin Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <></>
        )}

        {/* fullName or email :  */}
        <div className="flex items-center font-bold">
          {fullName ? fullName : email}
        </div>

        {/* login or avatar : */}
        <div className="flex items-center">
          {!userId ? (
            <Link to={"/login"}>
              <Button variant={""} className="bg-[#5937E0] rounded-2xl px-8">
                Log in
              </Button>
            </Link>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger>
                <Avatar className="size-12">
                  <AvatarImage
                    src={image ? image : "./default_avt.jpg"}
                    alt="Customer Avatar"
                  />
                  <AvatarFallback>Customer Avatar</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-[250px]">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account">
                    <Card className={"flex gap-2 items-center"}>
                      {role === "customer" ? (
                        <Button
                          variant="outline"
                          className="w-2/3"
                          onClick={() => setOpen((prev) => !prev)}
                        >
                          Become Owner
                        </Button>
                      ) : (
                        <></>
                      )}
                      {role === "owner" ? (
                        <Link className="w-2/3" to={"/owner-dashboard"}>
                          <Button
                            variant="outline"
                            className=""
                            onClick={() => setOpen((prev) => !prev)}
                          >
                            Owner Dashboard
                          </Button>
                        </Link>
                      ) : (
                        <></>
                      )}
                      {role === "admin" ? (
                        <Button
                          variant="outline"
                          className="w-2/3"
                          onClick={() => setOpen((prev) => !prev)}
                        >
                          Admin Dashboard
                        </Button>
                      ) : (
                        <></>
                      )}

                      <Link to={"/update-profile"} className="block w-2/3">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => setOpen((prev) => !prev)}
                        >
                          Update Profile
                        </Button>
                      </Link>

                      {/* manage booking :  */}
                      {role === "customer" ? (
                        <Link
                          to={"/customer-dashboard"}
                          className="block w-2/3"
                        >
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => setOpen((prev) => !prev)}
                          >
                            Manage Booking
                          </Button>
                        </Link>
                      ) : (
                        <></>
                      )}

                      <Button
                        variant="outline"
                        className="w-2/3 hover:cursor-pointer"
                        onClick={handleLogout}
                      >
                        {loading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          " Logout"
                        )}
                      </Button>
                    </Card>
                  </TabsContent>
                  <TabsContent value="password">
                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                          Change your password here. After saving, you'll be
                          logged out.
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
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
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
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                          </div>
                        </form>
                      </CardContent>
                      <CardFooter>
                        <Button
                          onClick={handleSubmit}
                          className={`${
                            loading
                              ? "opacity-50 cursor-not-allowed w-full"
                              : ""
                          }`}
                        >
                          {loading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            " Update password"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                </Tabs>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Menu Button - chỉ hiển thị trên mobile */}
      <div className="md:hidden flex items-center space-x-2">
        {/* User info on mobile */}
        {userId && (
          <div className="text-xs font-bold truncate max-w-16">
            {fullName ? fullName : email}
          </div>
        )}

        {/* Mobile menu toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
          <div className="flex flex-col space-y-3 p-3">
            {/* Navigation Links */}
            <div className="flex flex-col space-y-2">
              <Link to={"/"} onClick={() => setMobileMenuOpen(false)}>
                <p className="font-bold text-sm py-2 border-b border-gray-100">
                  Home
                </p>
              </Link>
              <Link to={"/vehicle"} onClick={() => setMobileMenuOpen(false)}>
                <p className="font-medium text-sm py-2 border-b border-gray-100">
                  Vehicle
                </p>
              </Link>
              <Link to={"/about-us"} onClick={() => setMobileMenuOpen(false)}>
                <p className="font-medium text-sm py-2 border-b border-gray-100">
                  About Us
                </p>
              </Link>
              <Link to={"/contact-us"} onClick={() => setMobileMenuOpen(false)}>
                <p className="font-medium text-sm py-2 border-b border-gray-100">
                  Contact Us
                </p>
              </Link>
            </div>

            {/* Dashboard Buttons */}
            <div className="flex flex-col space-y-2">
              {role === "owner" && (
                <Link
                  to={"/owner-dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={""}
                    className="bg-[#5937E0] rounded-2xl w-full text-xs"
                  >
                    Owner Dashboard
                  </Button>
                </Link>
              )}

              {role === "admin" && (
                <Link
                  to={"/admin-dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant={""}
                    className="bg-[#5937E0] rounded-2xl w-full text-xs"
                  >
                    Admin Dashboard
                  </Button>
                </Link>
              )}

              {role === "customer" && (
                <Link
                  to={"/customer-dashboard"}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full text-xs">
                    Manage Booking
                  </Button>
                </Link>
              )}

              <Link
                to={"/update-profile"}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full text-xs">
                  Update Profile
                </Button>
              </Link>

              {!userId ? (
                <Link to={"/login"} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={""}
                    className="bg-[#5937E0] rounded-2xl w-full text-xs"
                  >
                    Log in
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  className="w-full text-xs"
                  onClick={handleLogout}
                >
                  {loading ? <Loader className="animate-spin" /> : "Logout"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
