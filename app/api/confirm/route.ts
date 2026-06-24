import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const SECRET = process.env.EMAIL_PASS || 'fallback-secret-12345';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return new NextResponse('Missing token', { status: 400 });
  }

  try {
    const [base64, hmac] = token.split('.');
    if (!base64 || !hmac) {
      return new NextResponse('Invalid token format', { status: 400 });
    }

    const expectedHmac = crypto.createHmac('sha256', SECRET).update(base64).digest('hex');
    if (hmac !== expectedHmac) {
      return new NextResponse('Invalid or expired token', { status: 400 });
    }

    const json = Buffer.from(base64, 'base64url').toString('utf8');
    const data = JSON.parse(json);

    const { name, email, projectType, budget, message } = data;

    // Send the actual email to the agency
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'sitenest.ua@gmail.com',
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'sitenest.ua@gmail.com',
      to: 'sitenest.ua@gmail.com',
      replyTo: email,
      subject: `Нова заявка з сайту від ${name} (Підтверджена)`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e1e4e8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">Нова Заявка (Підтверджена)</h1>
            <p style="color: #e0f2fe; margin: 8px 0 0 0; font-size: 14px;">Новий клієнт очікує на відповідь</p>
          </div>
          <div style="padding: 40px 30px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px; width: 120px;">Ім'я:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 16px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Email:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 16px; font-weight: 500;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Тип проекту:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 16px; font-weight: 500;">${projectType}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 14px;">Бюджет:</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 16px; font-weight: 500;">${budget}</td>
              </tr>
            </table>
            
            <div style="margin-top: 30px;">
              <p style="color: #64748b; font-size: 14px; margin-bottom: 8px;">Повідомлення:</p>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e1e4e8;">
            <a href="mailto:${email}" style="color: #0f172a; font-size: 14px; font-weight: 600; text-decoration: none;">Відповісти клієнту</a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Redirect to contact page with success parameter
    return NextResponse.redirect(new URL('/contact?confirmed=true', req.url));
  } catch (error) {
    console.error('Confirmation error:', error);
    return new NextResponse('Internal server error during confirmation', { status: 500 });
  }
}
