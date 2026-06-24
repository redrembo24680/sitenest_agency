'use server';

import nodemailer from 'nodemailer';

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
    const mailOptions = {
      from: process.env.EMAIL_USER || 'sitenest.ua@gmail.com',
      to: 'sitenest.ua@gmail.com',
      replyTo: email,
      subject: `Нова заявка з сайту від ${name}`,
      html: `
        <h2>Нова заявка з сайту SiteNest</h2>
        <p><strong>Ім'я:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Тип проекту:</strong> ${projectType}</p>
        <p><strong>Бюджет:</strong> ${budget}</p>
        <p><strong>Повідомлення:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}
