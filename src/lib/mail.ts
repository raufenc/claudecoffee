import nodemailer from 'nodemailer';

export async function sendOrderEmail(toEmail: string, orderData: any) {
  try {
    // If user has not configured SMTP, warn in console but don't crash
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('⚠️ SMTP ayarları (.env dosyasında) eksik! Demo modunda e-posta gönderilemedi.');
      return false;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const itemsHtml = orderData.items.map((i: any) => 
      `<li>${i.quantity}x ${i.name} (${i.variant}) - ₺${i.price * i.quantity}</li>`
    ).join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #1a2744;">Yeni Sipariş Alındı! (#${orderData.orderNo})</h2>
        <p>Merhaba, sistemimize yeni bir sipariş düştü.</p>
        
        <h3>Müşteri / Teslimat Bilgileri:</h3>
        <p><strong>İsim:</strong> ${orderData.address.title}</p>
        <p><strong>Telefon:</strong> ${orderData.address.phone}</p>
        <p><strong>Adres:</strong> ${orderData.address.fullAddress}</p>
        
        <h3>Sipariş Detayı:</h3>
        <ul>
          ${itemsHtml}
        </ul>
        <hr/>
        <p style="font-size: 1.25rem; font-weight: bold; color: #c8973a;">
          Genel Toplam: ₺${orderData.total}
        </p>
        <p>İyi çalışmalar.</p>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"Claude Coffee" <${process.env.SMTP_USER}>`,
      to: 'furkacetinkaya95@gmail.com', // User requested all orders fall here
      subject: `Yeni Sipariş: #${orderData.orderNo}`,
      html: html,
    });

    console.log('E-posta başarıyla gönderildi: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('E-posta gönderim hatası:', error);
    return false;
  }
}
