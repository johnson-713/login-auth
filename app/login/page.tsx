"use client";
import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import Text from "../components/Text";
import { InputContainer } from "../components/InputContainer";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "../components/GoogleIcon";
import { Slider } from "../components/Slider";
import toast from "react-hot-toast";

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
      if (data) console.log(data);
      if (error) {
        toast.error(error?.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Implement error handling for user (e.g., display message)
    }
  };

  const signup = async () => {
    try {
      const { data, error } = await supabase.auth.signUp(formdata);
      if (data) console.log(data);
      setNewView(data?.user?.email);
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
      if (data) console.log(data);
      if (error) {
        toast.error(error?.message);
      }
    } catch (err) {
      console.log("Google sign in Error", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("is login", isLogin);

  return (
    <div className="flex flex-col justify-center h-[100vh] items-center gap-[10px]">
      <Text text="Log in to your account" className="font-bold text-[28px]" />
      <Text
        text="Welcome back! Please enter your details"
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
