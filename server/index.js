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
    subject: `New Contact Form - ${name}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);">
        <div style="background: rgba(20, 20, 35, 0.95); padding: 32px; border-radius: 16px; border: 1px solid rgba(255, 127, 0, 0.3); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 2px solid rgba(255, 127, 0, 0.4);">
            <h1 style="color: #ff7f00; font-size: 28px; margin: 0 0 8px 0; letter-spacing: 3px; font-weight: 800;">CODEFORGE</h1>
            <p style="color: rgba(255, 255, 255, 0.6); margin: 0; font-size: 12px; letter-spacing: 1px;">NEW CONTACT SUBMISSION</p>
          </div>
          
          <!-- Contact Details -->
          <div style="background: linear-gradient(135deg, rgba(255, 127, 0, 0.15) 0%, rgba(255, 149, 0, 0.08) 100%); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #ff7f00;">
            <h3 style="color: #ff9500; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Contact Details</h3>
            <p style="margin: 10px 0; color: rgba(255, 255, 255, 0.9);"><strong style="color: #ff7f00;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0; color: rgba(255, 255, 255, 0.9);"><strong style="color: #ff7f00;">Email:</strong> <a href="mailto:${email}" style="color: #ff9500; text-decoration: none;">${email}</a></p>
            <p style="margin: 10px 0; color: rgba(255, 255, 255, 0.9);"><strong style="color: #ff7f00;">Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <!-- Project Description -->
          <div style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.12) 0%, rgba(102, 51, 153, 0.08) 100%); padding: 24px; border-radius: 12px; margin: 20px 0; border-left: 4px solid #8a2be2;">
            <h3 style="color: #a855f7; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Project Description</h3>
            <p style="color: rgba(255, 255, 255, 0.85); line-height: 1.7; white-space: pre-wrap; margin: 0;">${project}</p>
          </div>

          <!-- Action Required -->
          <div style="background: linear-gradient(135deg, rgba(255, 127, 0, 0.2) 0%, rgba(255, 87, 34, 0.12) 100%); padding: 24px; border-radius: 12px; margin: 20px 0; border: 1px solid rgba(255, 127, 0, 0.3);">
            <h3 style="color: #ff7f00; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Action Required</h3>
            <p style="color: rgba(255, 255, 255, 0.9); margin: 0 0 8px 0;">
              <strong>Please respond within 24 hours to maintain our professional standards.</strong>
            </p>
            <p style="color: rgba(255, 255, 255, 0.7); margin: 0; font-size: 14px;">
              Click reply to respond directly to the customer.
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <p style="color: rgba(255, 255, 255, 0.5); margin: 0; font-size: 13px;">
              <strong style="color: #ff7f00;">CodeForge Contact System</strong><br>
              <span style="font-size: 12px;">Automated from thecodeforge.dev</span>
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
    subject: "Thank you for contacting CodeForge!",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);">
        <div style="background: rgba(20, 20, 35, 0.95); padding: 40px; border-radius: 20px; border: 1px solid rgba(255, 127, 0, 0.2); box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="color: #ff7f00; font-size: 32px; margin: 0 0 8px 0; letter-spacing: 4px; font-weight: 800;">CODEFORGE</h1>
            <p style="color: rgba(255, 255, 255, 0.6); margin: 0; font-size: 13px; letter-spacing: 1px;">Forging the future of technology</p>
          </div>

          <!-- Greeting -->
          <h2 style="color: white; margin: 0 0 20px 0; font-size: 24px;">Hi ${name}!</h2>
          
          <p style="color: rgba(255, 255, 255, 0.85); line-height: 1.7; font-size: 16px; margin: 0 0 28px 0;">
            Thank you for reaching out to <strong style="color: #ff7f00;">CodeForge</strong>! We've received your project inquiry and are excited to discuss your vision.
          </p>

          <!-- Your Submission -->
          <div style="background: linear-gradient(135deg, rgba(255, 127, 0, 0.2) 0%, rgba(255, 149, 0, 0.1) 100%); padding: 24px; border-radius: 14px; margin: 0 0 28px 0; border: 1px solid rgba(255, 127, 0, 0.3);">
            <h3 style="margin: 0 0 16px 0; color: #ff9500; font-size: 16px; font-weight: 600;">Your Submission</h3>
            <div style="background: rgba(0, 0, 0, 0.3); padding: 16px; border-radius: 10px;">
              <p style="margin: 0; white-space: pre-wrap; color: rgba(255, 255, 255, 0.9); line-height: 1.6;">${project}</p>
            </div>
          </div>

          <!-- What Happens Next -->
          <div style="background: linear-gradient(135deg, rgba(138, 43, 226, 0.12) 0%, rgba(102, 51, 153, 0.08) 100%); padding: 28px; border-radius: 14px; margin: 0 0 28px 0; border: 1px solid rgba(138, 43, 226, 0.2);">
            <h3 style="color: #a855f7; margin: 0 0 20px 0; font-size: 16px; font-weight: 600;">What Happens Next</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; vertical-align: top; width: 40px;">
                  <div style="background: linear-gradient(135deg, #ff7f00, #ff9500); color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">1</div>
                </td>
                <td style="padding: 10px 0; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.5;">Our team reviews your requirements within 24 hours</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; vertical-align: top; width: 40px;">
                  <div style="background: linear-gradient(135deg, #ff7f00, #ff9500); color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">2</div>
                </td>
                <td style="padding: 10px 0; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.5;">We prepare a tailored proposal and timeline</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; vertical-align: top; width: 40px;">
                  <div style="background: linear-gradient(135deg, #ff7f00, #ff9500); color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">3</div>
                </td>
                <td style="padding: 10px 0; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.5;">We schedule a consultation call to discuss your vision</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; vertical-align: top; width: 40px;">
                  <div style="background: linear-gradient(135deg, #a855f7, #8a2be2); color: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">4</div>
                </td>
                <td style="padding: 10px 0; color: rgba(255, 255, 255, 0.85); font-size: 14px; line-height: 1.5;">We begin crafting your digital solution</td>
              </tr>
            </table>
          </div>

          <!-- Need Assistance -->
          <div style="background: linear-gradient(135deg, rgba(255, 127, 0, 0.1) 0%, rgba(138, 43, 226, 0.08) 100%); padding: 24px; border-radius: 14px; margin: 0 0 28px 0; border-left: 4px solid #ff7f00;">
            <h3 style="color: #ff9500; margin: 0 0 14px 0; font-size: 16px; font-weight: 600;">Need Immediate Assistance?</h3>
            <p style="color: rgba(255, 255, 255, 0.85); margin: 8px 0;">
              <strong style="color: #ff7f00;">Email:</strong> <a href="mailto:info@thecodeforge.dev" style="color: #a855f7; text-decoration: none;">info@thecodeforge.dev</a>
            </p>
            <p style="color: rgba(255, 255, 255, 0.85); margin: 8px 0;">
              <strong style="color: #ff7f00;">Response Time:</strong> Within 4 business hours
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 36px; padding-top: 28px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
            <p style="color: rgba(255, 255, 255, 0.6); margin: 0 0 8px 0; font-size: 14px;">Best regards,</p>
            <p style="color: #ff7f00; margin: 0 0 16px 0; font-weight: bold; font-size: 18px;">The CodeForge Team</p>
            <p style="color: rgba(255, 255, 255, 0.5); margin: 0; font-size: 13px; font-style: italic;">
              Crafting digital excellence through code, creativity, and boundless imagination.
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

    console.log(`Emails sent successfully for: ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: "Emails sent successfully! We'll be in touch soon.",
    });
  } catch (error) {
    console.error("Email sending failed:", error);

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
    console.log(`Server running on port ${PORT}`);
    console.log(`Email service configured for: ${process.env.ADMIN_EMAIL}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

export default app;
