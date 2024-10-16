'use client'

import React, { useState } from "react";
import { supabase } from "@/lib/supabase";
import toast from "react-hot-toast";
import Text from "@/page-components/Text";
import { InputContainer } from "@/page-components/InputContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface LoginData {
  email: string;
  password: string;
}

const Page = () => {
  const [formdata, setformData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const setNewView = async (user: string | undefined) => {
    const { data, error } = await supabase.from("views").insert({
      name: user,
    });

    if (data) console.log(data);
    if (error) console.log(error);
  };

  const updateUser = async () => {
    try {
      const { data, error } = await supabase.auth.updateUser(formdata);
      if (data) {
        console.log(data);
        setNewView(data?.user?.email);
        setformData({ email: "", password: "" });
      }
      if (error) {
        toast.error(error?.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Implement error handling for user (e.g., display message)
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="flex flex-col justify-center h-[100vh] items-center gap-[10px]">
      <Image src={'/login.png'} alt="" width={64} height={64} />
      <Text text={"Forgot Password"} className="font-bold text-[28px] mb-[20px]" />
      <div className="flex flex-col gap-[20px] min-w-[300px]">
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
          <Button className="bg-[#9575CD] w-[100%]" onClick={updateUser}>
            Create Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
