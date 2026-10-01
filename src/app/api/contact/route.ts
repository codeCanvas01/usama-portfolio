import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, type = "contact" } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const emailUser = process.env.EMAIL_USER || "cntctwithusama512@gmail.com";
    const emailPass = process.env.EMAIL_PASS;
    const recipientEmail = process.env.RECIPIENT_EMAIL || "cntctwithusama512@gmail.com";

    const isNewsletter = type === "newsletter";
    const senderName = name?.trim() || (isNewsletter ? "Newsletter Subscriber" : "Prospective Client");
    const senderMessage = message?.trim() || (isNewsletter ? "User subscribed to the portfolio newsletter." : "No message provided.");

    // Subject lines
    const subject = isNewsletter
      ? `📩 New Newsletter Subscription: ${email}`
      : `🔥 New Portfolio Inquiry from ${senderName}`;

    // Branded HTML template for Usama (admin notification)
    const adminHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0c0d10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0c0d10; padding: 30px 15px;">
          <tr>
            <td align="center">
              <table width="100%" max-width="600" style="max-width: 600px; background-color: #14161b; border: 1px solid rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
                
                <!-- Header Banner -->
                <tr>
                  <td style="padding: 24px 30px; background: linear-gradient(135deg, #b83808 0%, #ea580c 50%, #7c1d06 100%);">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <span style="font-size: 24px; font-weight: 900; letter-spacing: 0.1em; color: #ffffff; text-transform: uppercase;">USAMA<sup style="font-size: 11px; margin-left: 2px;">®</sup></span>
                          <span style="display: block; font-size: 12px; color: rgba(255,255,255,0.9); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 600;">Shopify Architect &amp; Developer</span>
                        </td>
                        <td align="right">
                          <span style="display: inline-block; padding: 6px 12px; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); font-size: 11px; font-weight: 700; color: #ffffff; letter-spacing: 0.15em; text-transform: uppercase;">
                            ${isNewsletter ? "NEWSLETTER" : "NEW INQUIRY"}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Main Content Body -->
                <tr>
                  <td style="padding: 30px;">
                    <h2 style="margin: 0 0 20px 0; font-size: 19px; font-weight: 700; color: #ffffff; letter-spacing: -0.01em;">
                      ${isNewsletter ? "New Newsletter Subscriber" : "New Client Message Received"}
                    </h2>

                    <!-- Information Fields -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 25px;">
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #8e929b; width: 120px;">
                          Name
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; font-weight: 600; color: #ffffff;">
                          ${senderName}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #8e929b;">
                          Email Address
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 14px; font-weight: 600; color: #ea580c;">
                          <a href="mailto:${email}" style="color: #ea580c; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #8e929b;">
                          Form Source
                        </td>
                        <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.08); font-size: 13px; color: #d1d5db;">
                          ${type === "newsletter" ? "Footer Newsletter Form" : type === "modal" ? "Project Drawer Modal" : "Main Contact Banner Form"}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; font-size: 13px; color: #8e929b;">
                          Received Time
                        </td>
                        <td style="padding: 10px 0; font-size: 13px; color: #d1d5db;">
                          ${new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })} (PKT)
                        </td>
                      </tr>
                    </table>

                    <!-- Message Quotation -->
                    <div style="background-color: #0c0d10; border-left: 3px solid #ea580c; padding: 18px 20px; margin-bottom: 30px;">
                      <span style="display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #8e929b; margin-bottom: 8px; font-weight: 700;">
                        ${isNewsletter ? "Action Required" : "Message / Project Scope"}
                      </span>
                      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #f3f4f6; white-space: pre-wrap;">
                        ${senderMessage}
                      </p>
                    </div>

                    <!-- Direct Action Buttons -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td>
                          <a href="mailto:${email}?subject=Re:%20Shopify%20Project%20Inquiry%20-%20Usama" style="display: inline-block; background-color: #ea580c; color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; padding: 12px 24px; text-decoration: none; border-radius: 2px;">
                            Reply to ${senderName.split(" ")[0]}
                          </a>
                          <a href="https://wa.me/923455152512" style="display: inline-block; margin-left: 10px; background-color: #1f2229; color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; padding: 12px 24px; text-decoration: none; border-radius: 2px; border: 1px solid rgba(255,255,255,0.1);">
                            Open WhatsApp
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #0c0d10; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
                    <p style="margin: 0; font-size: 11px; color: #6b7280; letter-spacing: 0.05em;">
                      Sent automatically from Usama's Official Shopify Portfolio system.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Client automated confirmation email
    const clientHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Thank you for reaching out | Usama</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0c0d10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding: 40px 15px;">
          <tr>
            <td align="center">
              <table width="100%" style="max-width: 560px; background-color: #14161b; border: 1px solid rgba(255,255,255,0.1); padding: 35px; border-radius: 4px;">
                <tr>
                  <td>
                    <span style="font-size: 22px; font-weight: 900; letter-spacing: 0.1em; color: #ffffff;">USAMA<sup style="font-size: 10px;">®</sup></span>
                    <p style="font-size: 15px; line-height: 1.6; color: #d1d5db; margin: 20px 0 16px 0;">
                      Hi ${name?.split(" ")[0] || "there"},
                    </p>
                    <p style="font-size: 14px; line-height: 1.6; color: #9ca3af; margin: 0 0 20px 0;">
                      Thank you for reaching out! I have received your message regarding your Shopify project goals.
                    </p>
                    <div style="background-color: #0c0d10; border-left: 3px solid #ea580c; padding: 14px 18px; margin-bottom: 24px;">
                      <p style="margin: 0; font-size: 13px; color: #e5e7eb; font-style: italic;">
                        &ldquo;${senderMessage.length > 180 ? senderMessage.substring(0, 180) + "..." : senderMessage}&rdquo;
                      </p>
                    </div>
                    <p style="font-size: 14px; line-height: 1.6; color: #9ca3af; margin: 0 0 24px 0;">
                      I personally review all project requests and typically respond within 12–24 hours with architecture insights and next steps. If your project is urgent, you can also connect with me directly on WhatsApp:
                    </p>
                    <a href="https://wa.me/923455152512" style="display: inline-block; background-color: #25d366; color: #ffffff; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; padding: 12px 24px; text-decoration: none; border-radius: 2px;">
                      Chat on WhatsApp (+92 345 5152512)
                    </a>
                    <div style="margin-top: 35px; pt-20px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #6b7280;">
                      <strong style="color: #ffffff;">Usama</strong><br>
                      Shopify Expert &amp; E-Commerce Architect<br>
                      <a href="mailto:cntctwithusama512@gmail.com" style="color: #ea580c; text-decoration: none;">cntctwithusama512@gmail.com</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // If EMAIL_PASS is not yet provided, return explicit error
    if (!emailPass || emailPass.trim() === "" || emailPass === "your_16_char_google_app_password") {
      console.error(
        "❌ [EMAIL DISPATCH ERROR] EMAIL_PASS is missing in .env.local. " +
        "Gmail requires a 16-character App Password to send real emails to " + recipientEmail
      );

      return NextResponse.json(
        {
          error: "Email delivery setup: Please add your 16-character Gmail App Password to EMAIL_PASS in .env.local to send live emails.",
          code: "MISSING_EMAIL_PASS",
        },
        { status: 500 }
      );
    }

    // Configure Nodemailer transporter (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser.trim(),
        pass: emailPass.replace(/\s+/g, ""),
      },
    });

    // 1. Send notification to Usama
    await transporter.sendMail({
      from: `"Usama Portfolio" <${emailUser}>`,
      to: recipientEmail,
      replyTo: email,
      subject: subject,
      html: adminHtml,
    });

    // 2. Send friendly confirmation to the client (for contact/modal inquiries)
    if (!isNewsletter) {
      try {
        await transporter.sendMail({
          from: `"Usama | Shopify Architect" <${emailUser}>`,
          to: email,
          subject: "Thank you for reaching out | Usama",
          html: clientHtml,
        });
      } catch (autoReplyErr) {
        console.warn("Client auto-reply failed, but main message was delivered:", autoReplyErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to send email.";
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
