"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import SubscriptionTableItem from "@/components/admin/SubscriptionTableItem";
import { toast } from "react-toastify";

const Page = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  // دالة لجلب البيانات من API
  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get("/api/email");
      setSubscriptions(response.data.email);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    }
  };

  const deleteSubscription = async (mongoId) => {
    try {
      const response = await axios.delete(`/api/email`, {
        params: {
          id: mongoId,
        },
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        fetchSubscriptions(); // تحديث القائمة بعد الحذف
      } else {
        toast.error("Error deleting email");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error("An error occurred while deleting the email");
    }
  };

  // استخدام useEffect لجلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-3xl font-bold">Subscription</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email Subscription
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((item) => (
              <SubscriptionTableItem
                key={item._id}
                mongoId={item._id}
                email={item.email}
                date={item.date}
                deleteEmail={deleteSubscription}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
