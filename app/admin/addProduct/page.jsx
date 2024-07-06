"use client"; // تمكين وضع العميل

import { assets } from "@/Assets/assets"; // استيراد الأصول
import axios from "axios";
import Image from "next/image"; // استيراد مكون الصورة من Next.js
import React, { useState } from "react"; // استيراد React و useState
import { toast } from "react-toastify";

const Page = () => {
  const [image, setImage] = useState(null); // حالة لتخزين الصورة المحددة
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennet",
    authorImg: "/author_img.png",
  }); // حالة لتخزين بيانات النموذج

  // دالة لمعالجة تغييرات المدخلات وتحديث حالة البيانات
  const handleChange = (e) => {
    const { name, value } = e.target; // استخراج اسم وقيمة المدخل
    setData((prevData) => ({
      ...prevData,
      [name]: value, // تحديث حالة البيانات بناءً على المدخل الذي تم تغييره
    }));
  };

  // دالة لمعالجة إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault(); // منع السلوك الافتراضي للنموذج
    console.log("Form data:", data); // طباعة بيانات النموذج
    console.log("Selected image:", image); // طباعة الصورة المحددة
    //! يمكنك إرسال البيانات إلى الخادم هنا باستخدام fetch أو axios
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);

    // fetch("/api/blog", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));

    try {
      // إرسال طلب POST إلى الخادم باستخدام axios
      const response = await axios.post("/api/blog", formData, {});

      if (response.data.success) {
        toast.success(response.data.msg); // إظهار رسالة نجاح
        // يمكنك إعادة تعيين النموذج هنا إذا أردت
      } else {
        toast.error("An error occurred: " + response.data.msg); // إظهار رسالة خطأ
      }
    } catch (error) {
      console.error("Error submitting the form", error);
      toast.error("An error occurred while submitting the form"); // إظهار رسالة خطأ
    }
  };

  return (
    <>
      <form className="pt-5 px-5 sm:pt-12 sm:pl-12" onSubmit={handleSubmit}>
        {/* عنوان لتحميل الصورة المصغرة */}
        <p className="text-xl">Upload thumbnail</p>

        {/* إدخال لتحميل الصورة */}
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)} // عرض الصورة المحددة أو منطقة التحميل
            alt=""
            width={140}
            height={70}
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])} // تحديث حالة الصورة عند التغيير
          type="file"
          id="image"
          hidden
          required
        />

        {/* عنوان للمدونة */}
        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          value={data.title} // ربط القيمة بحالة البيانات
          onChange={handleChange} // استدعاء دالة handleChange عند التغيير
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />

        {/* وصف للمدونة */}
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          value={data.description} // ربط القيمة بحالة البيانات
          onChange={handleChange} // استدعاء دالة handleChange عند التغيير
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          placeholder="Write content here"
          rows={6}
          required
        />

        {/* تصنيف المدونة */}
        <p className="text-xl mt-4">Blog category</p>
        <select
          name="category"
          value={data.category} // ربط القيمة بحالة البيانات
          onChange={handleChange} // استدعاء دالة handleChange عند التغيير
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />

        {/* زر لإرسال النموذج */}
        <button
          className="bg-black text-white mt-8 w-40 py-3 h-12"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default Page; // تصدير المكون
