'use server';

import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { headers } from 'next/headers';

const SECRET = process.env.EMAIL_PASS || 'fallback-secret-12345';

export async function sendContactEmail(formData: FormData) {
  // Honeypot check
  const honeypot = formData.get('botcheck');
  if (honeypot) {
    // If the hidden field is filled out, it's likely a bot
    return { success: false, message: 'Spam detected' };
  }

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const projectType = formData.get('projectType') as string;
  const budget = formData.get('budget') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !message) {
    return { success: false, message: 'Missing required fields' };
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'sitenest.ua@gmail.com',
      pass: process.env.EMAIL_PASS, // User must provide Gmail App Password
    },
  });

  try {
    const data = { name, email, projectType, budget, message };
    const json = JSON.stringify(data);
    const base64 = Buffer.from(json).toString('base64');
    const hmac = crypto.createHmac('sha256', SECRET).update(base64).digest('hex');
    const token = `${base64}.${hmac}`;

    // Get the base URL
    const headersList = await headers();
    const host = headersList.get('host') || 'sitenest.work';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = `${protocol}://${host}`;

    const confirmUrl = `${baseUrl}/api/confirm?token=${token}`;

    const confirmEmailOptions = {
      from: process.env.EMAIL_USER || 'sitenest.ua@gmail.com',
      to: email,
      subject: `Підтвердження заявки - SiteNest Agency`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e1e4e8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">SiteNest Agency</h1>
            <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">Розробка розумних сайтів</p>
          </div>
          <div style="padding: 40px 30px;">
            <h2 style="color: #1e293b; margin-top: 0; font-size: 20px;">Привіт, ${name}!</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">Дякуємо за звернення до <strong>SiteNest Agency</strong>. Ми отримали ваш запит.</p>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">Щоб ми могли обробити вашу заявку та передати її менеджеру, будь ласка, підтвердіть вашу електронну адресу.</p>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${confirmUrl}" style="background: linear-gradient(to right, #3b82f6, #0ea5e9); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.25);">Підтвердити заявку</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
            
            <p style="color: #64748b; font-size: 14px; margin: 0;">З повагою,<br/><strong style="color: #1e293b;">Команда SiteNest</strong></p>
          </div>
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e1e4e8;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">Якщо ви не робили цього запиту, просто проігноруйте цей лист.</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmEmailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}
