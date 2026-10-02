import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const { name, email, message: userMessage } = req.body;

  if (!name || !email || !userMessage) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const projectName = process.env.PROJECT_NAME || 'Your Project';

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2a5386; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">New Inquiry Received</h2>
          <p style="color: #aed157; margin: 5px 0 0;">Via ${projectName} Contact Form</p>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hello Team,</p>
          <p style="font-size: 16px;">You have received a new message from the contact form. Here are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 100px;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #2a5386; text-decoration: none;">${email}</a></td>
            </tr>
          </table>
          
          <h3 style="margin-top: 30px; font-size: 16px; border-bottom: 2px solid #aed157; padding-bottom: 5px; display: inline-block;">Message</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #aed157; border-radius: 4px; margin-top: 10px;">
            <p style="margin: 0; white-space: pre-wrap;">${userMessage}</p>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #aed157; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reply to ${name}</a>
          </div>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          This email was generated automatically by the ${projectName} website.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${projectName} Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${userMessage}`,
      html: htmlTemplate,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
}
