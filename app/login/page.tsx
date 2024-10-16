"use client";
import { supabase } from "@/lib/supabase";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Text from "@/page-components/Text";
import { Slider } from "@/page-components/Slider";
import { InputContainer } from "@/page-components/InputContainer";
import { CommonDialog } from "@/page-components/Dialog";
import { GoogleIcon } from "@/page-components/GoogleIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

const Page = () => {
  const [formdata, setformData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const [userData, setUserData] = useState({});
  console.log(userData)
  const router = useRouter();

  const setNewView = async (user: string | undefined) => {
    const { data, error } = await supabase.from("views").insert({
      name: user,
    });

    if (data) console.log(data);
    if (error) console.log(error);
  };

  const login = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword(formdata);
      if (data) {
        console.log(data);
        setUserData(!!data?.user);
        setformData({ email: "", password: "" });
        toast.success('Logged In successfully!!')
      }
      if (error) {
        toast.error(error?.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Implement error handling for user (e.g., display message)
    }
  };

  const forgotPassword = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        formdata?.email
      );
      if (data) {
        console.log(data);
        setformData({ email: "", password: "" });
      }
      if (error) {
        toast.error(error?.message);
      }
    } catch (error) {
      console.error("Forgot password Error:", error);
      // Implement error handling for user (e.g., display message)
    }
  };

  const signup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp(formdata);
      if (data) {
        console.log(data);
        setformData({ email: "", password: "" });
        setNewView(data?.user?.email);
        toast.success('Account created successfully!!')
      }     
      if (error) {
        toast.error(error?.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Implement error handling for user (e.g., display message)
    }
  };

  const googleSignin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });
      if (data) {
        console.log(data);
        router.push("/login");
      }
      if (error) {
        toast.error(error?.message);
      }
    } catch (err) {
      console.log("Google sign in Error", err);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col justify-center h-[100vh] items-center gap-[10px]">
      <Image src={"/login.png"} alt="" width={64} height={64} />
      <Text
        text={isLogin ? "Log in to your account" : "Create an Account"}
        className="font-bold text-[28px]"
      />
      <Text
        text={isLogin && "Welcome back! Please enter your details"}
        className="font-medium text-[16px] text-[#808080]"
      />
      <div className="flex flex-col gap-[20px] min-w-[300px]">
        <Slider isLogin={isLogin} setIsLogin={setIsLogin} />
        <InputContainer
          label="Email"
          type="email"
          name="email"
          value={formdata?.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <InputContainer
          label="Password"
          type="password"
          name="password"
          value={formdata?.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        {isLogin && (
          <div className="flex justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-[12px]">
                Remember for 30 days
              </Label>
            </div>
            <CommonDialog
              title="Forgot password"
              label="Email"
              buttonLabel="Send Email"
              placeholder="Enter your Email"
              name="email"
              value={formdata?.email}
              onChange={handleChange}
              onClick={() => forgotPassword()}
            />
          </div>
        )}
        <div>
          <Button
            className="bg-[#9575CD] w-[100%]"
            onClick={isLogin ? login : signup}
          >
            Sign {isLogin ? "in" : "up"}
          </Button>
        </div>
        <div>
          <Button
            className="w-[100%] flex gap-[10px]"
            variant={"outline"}
            onClick={googleSignin}
          >
            <GoogleIcon /> Sign in with Google
          </Button>
        </div>
        {isLogin && (
          <div className="text-center">
            <Text className="text-[14px]">
              Don&apos;t have an account?{" "}
              <span className="text-[#9575CD]">Sign up</span>
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
