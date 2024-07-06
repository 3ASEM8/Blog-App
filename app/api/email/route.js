import { connectToDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const connectDatabase = async () => {
  await connectToDB();
};

connectDatabase();

export async function POST(request) {
  try {
    const formData = await request.formData();
    const emailData = {
      email: formData.get("email"),
    };

    await EmailModel.create(emailData);
    return NextResponse.json({ success: true, msg: "Email Subscribed" });
  } catch (error) {
    console.error("Error in POST /api/email:", error);
    return NextResponse.json(
      { success: false, msg: "Error subscribing email" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const email = await EmailModel.find({});

  return NextResponse.json({ email });
}

export async function DELETE(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          msg: "No ID provided",
        },
        { status: 400 }
      );
    }
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      msg: "Email deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting email:", error);
    return NextResponse.json(
      {
        success: false,
        msg: "Error deleting email",
      },
      { status: 500 }
    );
  }
}
