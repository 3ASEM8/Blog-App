import { connectToDB } from "@/lib/config/db";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import BlogModel from "@/lib/models/BlogModel";
const fs = require("fs");

// التأكد من الاتصال بقاعدة البيانات
const LoadDB = async () => {
  await connectToDB();
};

LoadDB();

// دالة GET لمعالجة طلبات GET
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get("id");
  if (blogId) {
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json({ blog });
  } else {
    const blogs = await BlogModel.find({});
    return NextResponse.json({ blogs });
  }
}

// دالة POST لمعالجة طلبات POST
export async function POST(request) {
  try {
    // الحصول على formData من الطلب
    const formData = await request.formData();
    const timestamp = Date.now(); // الحصول على الطابع الزمني الحالي
    const image = formData.get("image"); // الحصول على الصورة من formData

    if (!image) {
      throw new Error("No image provided");
    }

    // تحويل بيانات الصورة إلى مصفوفة بايت
    const imageByteData = await image.arrayBuffer();
    // تحويل مصفوفة البايت إلى مخزن مؤقت (Buffer)
    const buffer = Buffer.from(imageByteData);
    // تحديد مسار حفظ الصورة
    const path = `./public/${timestamp}_${image.name}`;

    // حفظ الصورة في المسار المحدد
    await writeFile(path, buffer);

    // إنشاء رابط للصورة
    const imgUrl = `/${timestamp}_${image.name}`;

    // تجميع بيانات المدونة
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      author_img: formData.get("authorImg"),
    };

    // تحقق من البيانات المدخلة
    for (const [key, value] of Object.entries(blogData)) {
      if (!value) {
        throw new Error(`Missing field: ${key}`);
      }
    }

    // إنشاء وحفظ المدونة في قاعدة البيانات
    await BlogModel.create(blogData);
    console.log("blog saved");

    // إرجاع استجابة بصيغة JSON تحتوي على رابط الصورة
    return NextResponse.json({
      success: true,
      msg: "Blog saved successfully",
      imgUrl,
    });
  } catch (error) {
    // التعامل مع الأخطاء
    console.error("Error processing the request", error);
    return NextResponse.json({
      success: false,
      msg: "An error occurred while processing the request",
      error: error.message,
    });
  }
}

export async function DELETE(request) {
  const id = await request.nextUrl.searchParams.get("id");
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public/${blog.image}`, () => {});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({ success: true, msg: "Blog deleted successfully" });
}
