"use client";
import BlogTableItem from "@/components/admin/BlogTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [blogs, setBlogs] = useState([]);

  const fetchBlogData = async () => {
    const response = await axios.get("/api/blog");
    setBlogs(response.data.blogs);
  };

  // دالة لحذف مدونة باستخدام المعرف (mongoId)
  const deleteBlog = async (mongoId) => {
    try {
      // إرسال طلب DELETE إلى API لحذف المدونة
      const response = await axios.delete(`/api/blog`, {
        params: {
          id: mongoId,
        },
      });
      console.log(response);
      // التحقق من نجاح العملية قبل عرض رسالة النجاح
      if (response.data.success) {
        toast.success(response.data.msg); // عرض رسالة نجاح
        fetchBlogData(); // جلب البيانات المحدثة بعد الحذف
      } else {
        // التعامل مع الحالة في حال لم يكن الحذف ناجحًا
        toast.error("Failed to delete the blog");
      }
    } catch (error) {
      // التعامل مع الأخطاء التي قد تحدث أثناء الطلب
      console.error("Error deleting the blog:", error);
      toast.error("An error occurred while deleting the blog");
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-3xl font-bold">Blog List</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500 ">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3 hidden sm:block">
                Auther name
              </th>
              <th scope="col" className="px-6 py-3 ">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3 ">
                Date
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, idx) => {
              return (
                <BlogTableItem
                  key={idx}
                  mongoId={item._id}
                  {...item}
                  deleteBlog={deleteBlog}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
