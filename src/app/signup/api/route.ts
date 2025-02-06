import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface MailOptions extends nodemailer.SendMailOptions {
    to: string;
  }

export const POST = async (req: NextRequest) => {
  try {

    const {recipient,otp}=await req.json();
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions: MailOptions = {
      from: process.env.GMAIL_USER,
      to: recipient,

      subject: "Verification Email",
      html: `
          <p>Dear user,</p>
          <p>This is your OTP:- ${otp}</p>
          <p>- Souradeep Hazra</p>
        `,
    };

    await transporter.sendMail(mailOptions);
    return Response.json(
      {
        message: "Email sent successfully",
      },
      {
        status: 200,
        statusText: "email sent",
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json("An error occurred", { status: 500 });
  }
};
