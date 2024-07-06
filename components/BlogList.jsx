"use client";
import { blog_data } from "@/Assets/assets";
import BlogItem from "./BlogItem";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogList = () => {
  const [menue, setMenue] = useState("All");
  // تعريف الحالة لتخزين المدونات
  const [blogs, setBlogs] = useState([]);

  // دالة لجلب المدونات من API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs); // تحديث الحالة بالمدونات المسترجعة
      // console.log(response.data.blogs); // عرض المدونات المسترجعة في الكونسول
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  // استخدام useEffect لجلب المدونات عند تحميل المكون لأول مرة
  useEffect(() => {
    fetchBlogs();
  }, []); // المصفوفة الفارغة تعني أن هذا الـ useEffect سيتم تشغيله مرة واحدة فقط عند تحميل المكون

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenue("All")}
          className={
            menue === "All" ? `bg-black text-white py-1 px-4 rounded-sm` : ``
          }
        >
          All
        </button>
        <button
          className={
            menue === "Technology"
              ? `bg-black text-white py-1 px-4 rounded-sm`
              : ``
          }
          onClick={() => setMenue("Technology")}
        >
          Technology
        </button>
        <button
          className={
            menue === "Startup"
              ? `bg-black text-white py-1 px-4 rounded-sm`
              : ``
          }
          onClick={() => setMenue("Startup")}
        >
          Startup
        </button>
        <button
          className={
            menue === "Lifestyle"
              ? `bg-black text-white py-1 px-4 rounded-sm`
              : ``
          }
          onClick={() => setMenue("Lifestyle")}
        >
          Lifestyle
        </button>
      </div>
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24 ">
        {blogs
          .filter((item) => (menue === "All" ? true : item.category === menue))
          .map((item, idx) => {
            return <BlogItem key={idx} {...item} />;
          })}
      </div>
    </div>
  );
};

export default BlogList;
