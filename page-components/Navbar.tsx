"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export function Navbar() {
  const router = useRouter();
  const [userData, setUserData] = useState({});

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error?.message);
      } else {
        toast.success("Logged out successfully!!");
        setUserData({})
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Implement error handling for user (e.g., display message)
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUserData(data?.user);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="flex justify-end md:justify-between px-[20px] md:px-[80px] py-[20px]">
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="#" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      userData?.email ? (
        <Button className="bg-[#9575CD]" onClick={() => logout()}>
          Log out
        </Button>
      ) : (
        <div className="flex gap-[20px]">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/login" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            className="bg-[#9575CD]"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}
