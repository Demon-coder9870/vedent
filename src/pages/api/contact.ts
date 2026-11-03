import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  success: boolean;
  message: string;
};

// In-memory rate limiting map: IP -> timestamp[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Periodic cleanup if map grows
  if (rateLimitMap.size > 1000) {
    rateLimitMap.forEach((times, key) => {
      const active = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        rateLimitMap.delete(key);
      } else {
        rateLimitMap.set(key, active);
      }
    });
  }

  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  // Rate limiting check
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket.remoteAddress ||
    'unknown';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a few minutes before trying again.',
    });
  }

  const { name, email, message: userMessage, hp } = req.body;

  // Bot honeypot trap: if hidden field is filled, silently return success without sending
  if (hp) {
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  }

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof userMessage !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !userMessage.trim()
  ) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Input length limits
  if (name.length > 100 || email.length > 150 || userMessage.length > 5000) {
    return res.status(400).json({ success: false, message: 'Field length exceeds permitted limit' });
  }

  // Basic email pattern validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Invalid email address' });
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

    const projectName = process.env.PROJECT_NAME || 'VEDVET';

    // HTML-escaped content for email body
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(userMessage.trim());

    // Neutralize CRLF for subject line to prevent email header injection
    const cleanSubjectName = name.replace(/[\r\n]+/g, ' ').trim().slice(0, 80);

    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #2a5386; padding: 20px; text-align: center;">
          <h2 style="color: #ffffff; margin: 0;">New Inquiry Received</h2>
          <p style="color: #aed157; margin: 5px 0 0;">Via ${escapeHtml(projectName)} Contact Form</p>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hello Team,</p>
          <p style="font-size: 16px;">You have received a new message from the contact form. Here are the details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 100px;">Name</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${safeEmail}" style="color: #2a5386; text-decoration: none;">${safeEmail}</a></td>
            </tr>
          </table>
          
          <h3 style="margin-top: 30px; font-size: 16px; border-bottom: 2px solid #aed157; padding-bottom: 5px; display: inline-block;">Message</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #aed157; border-radius: 4px; margin-top: 10px;">
            <p style="margin: 0; white-space: pre-wrap;">${safeMessage}</p>
          </div>
          
          <div style="margin-top: 40px; text-align: center;">
            <a href="mailto:${safeEmail}" style="background-color: #aed157; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reply to ${safeName}</a>
          </div>
        </div>
        <div style="background-color: #f1f1f1; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          This email was generated automatically by the ${escapeHtml(projectName)} website.
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${cleanSubjectName} via Contact Form" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO,
      replyTo: email.trim(),
      subject: `New Contact Form Submission from ${cleanSubjectName}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${userMessage.trim()}`,
      html: htmlTemplate,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
}
