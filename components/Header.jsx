"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const [email, setEmail] = useState("");
  // دالة لمعالجة إرسال النموذج
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة الافتراضية عند إرسال النموذج

    try {
      // إنشاء كائن FormData وإضافة البيانات إليه
      const formData = new FormData();
      formData.append("email", email); // إضافة البريد الإلكتروني إلى FormData

      // إرسال طلب POST إلى API
      const response = await axios.post("/api/email", formData);

      // التحقق من نجاح العملية من خلال فحص response.data.success
      if (response.data.success) {
        toast.success(response.data.msg); // عرض رسالة نجاح
      } else {
        toast.error("Error from onSubmit handler "); // عرض رسالة خطأ
      }
    } catch (error) {
      // التعامل مع الأخطاء التي قد تحدث أثناء الطلب
      console.error("Error submitting the form:", error);
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          alt="logo"
          width={180}
          className="w-[130px] sm:w-auto "
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          Get Started <Image src={assets.arrow} alt="arrow" />
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Letest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis et
          debitis esse pariatur eos similique nam doloribus facere ab modi
          necessitatibus quidem ipsa, accusamus cum sunt veniam. Dolores,
          sapiente quasi.
        </p>
        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black  shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter your email"
            className="pl-4 outline-none"
          />
          <button
            type="submit"
            className="border-l border-black p-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
