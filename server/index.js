import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import nodemailer from "nodemailer";

dotenv.config();

const ourEmails = ["researcherintycoons@gmail.com", "adyaanrocks15@gmail.com"];

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "https://www.thecodeforge.dev", // Main production domain
  "https://thecodeforge.dev", // Non-www version
  "https://codeforge.vercel.app", // Vercel fallback
  "http://localhost:5173", // Local development
  "http://127.0.0.1:5173", // Local development
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow curl/Postman/server
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    methods: ["GET", "POST", "OPTIONS"], // allow POST + OPTIONS
    allowedHeaders: ["Content-Type"], // allow JSON headers
    credentials: true, // if using cookies/auth
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create transporter for nodemailer
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// Email templates
const createAdminEmail = (name, email, project, OurEmail) => {
  return {
    from: process.env.EMAIL_USER,
    to: OurEmail,
    subject: `🚀 New Contact Form - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 5px solid #ff7f00;">
          <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #ff7f00; padding-bottom: 10px;">
            📋 New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #ff7f00; margin-top: 0;">Contact Details</h3>
            <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${name}</p>
            <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 8px 0;"><strong>⏰ Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066cc;">
            <h3 style="color: #0066cc; margin-top: 0;">💼 Project Description</h3>
            <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${project}</p>
          </div>

          <div style="background-color: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-top: 0;">⚡ Action Required</h3>
            <p style="color: #856404; margin: 0;">
              <strong>Please respond within 24 hours to maintain our professional standards.</strong>
            </p>
            <p style="color: #856404; margin: 5px 0 0 0;">
              Click reply to respond directly to the customer.
            </p>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; margin: 0;">
              <strong>CodeForge Contact System</strong><br>
              Automated from codeforge.dev
            </p>
          </div>
        </div>
      </div>
    `,
    replyTo: email,
  };
};

const createUserEmail = (name, email, project) => {
  return {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank you for contacting CodeForge! 🚀",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div style="background-color: white; padding: 40px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ff7f00; font-size: 32px; margin: 0; letter-spacing: 2px;">CODEFORGE</h1>
            <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Forging the future of technology</p>
          </div>

          <h2 style="color: #333; margin-bottom: 20px;">Hi ${name}! 👋</h2>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Thank you for reaching out to <strong>CodeForge</strong>! We've received your project inquiry and are excited to discuss your vision.
          </p>

          <div style="background: linear-gradient(135deg, #ff7f00, #ff9500); padding: 20px; border-radius: 10px; margin: 25px 0; color: white;">
            <h3 style="margin-top: 0; color: white;">📋 Your Submission</h3>
            <div style="background-color: rgba(255,255,255,0.2); padding: 15px; border-radius: 8px;">
              <p style="margin: 0; white-space: pre-wrap; color: white;">${project}</p>
            </div>
          </div>

          <div style="background-color: #f8f9ff; padding: 25px; border-radius: 10px; margin: 25px 0; border: 2px solid #e3e8ff;">
            <h3 style="color: #4c63d2; margin-top: 0;">⚡ What Happens Next</h3>
            <div style="display: flex; flex-direction: column; gap: 15px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="background: #4c63d2; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</span>
                <span style="color: #333;">Our team reviews your requirements within 24 hours</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="background: #4c63d2; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</span>
                <span style="color: #333;">We prepare a tailored proposal and timeline</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="background: #4c63d2; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</span>
                <span style="color: #333;">We schedule a consultation call to discuss your vision</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <span style="background: #ff7f00; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">🚀</span>
                <span style="color: #333;">We begin crafting your digital solution</span>
              </div>
            </div>
          </div>

          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">📞 Need Immediate Assistance?</h3>
            <p style="color: #333; margin: 8px 0;">
              <strong>Email:</strong> <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #ff7f00;">${process.env.ADMIN_EMAIL}</a>
            </p>
            <p style="color: #333; margin: 8px 0;">
              <strong>Response Time:</strong> Within 4 business hours
            </p>
          </div>

          <div style="text-align: center; margin-top: 40px; padding-top: 25px; border-top: 2px solid #f0f0f0;">
            <p style="color: #666; margin: 10px 0; font-weight: bold;">Best regards,</p>
            <p style="color: #ff7f00; margin: 5px 0; font-weight: bold; font-size: 18px;">The CodeForge Team</p>
            <p style="color: #999; margin: 15px 0 0 0; font-size: 14px; font-style: italic;">
              💻 Crafting digital excellence through code, creativity, and boundless imagination.
            </p>
          </div>
        </div>
      </div>
    `,
  };
};

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, project } = req.body;

    // Validation
    if (!name || !email || !project) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and project description.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const transporter = createTransporter();

    // Send admin notification
    for (const email of ourEmails) {
      const adminEmail = createAdminEmail(name, email, project, email);
      await transporter.sendMail(adminEmail);
    }

    // Send user confirmation
    const userEmail = createUserEmail(name, email, project);
    await transporter.sendMail(userEmail);

    console.log(`📧 Emails sent successfully for: ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: "Emails sent successfully! We'll be in touch soon.",
    });
  } catch (error) {
    console.error("❌ Email sending failed:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again or contact us directly.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 Email service configured for: ${process.env.EMAIL_USER}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

export default app;
