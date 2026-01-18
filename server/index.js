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

// Email templates - Using design system: primary amber (#D4A853), clean white background, modern typography
// Email templates - Using orange gradient design system
const createAdminEmail = (name, email, project, OurEmail) => {
  return {
    from: process.env.EMAIL_USER,
    to: OurEmail,
    subject: `New Contact Form - ${name}`,
    html: `
      <div style="font-family: Inter, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8f8f7;">
        <div style="background-color: #ffffff; padding: 32px; border-radius: 6px; border: 1px solid #e5e5e3; box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 3px solid transparent; background: linear-gradient(white, white) padding-box, linear-gradient(90deg, #ff7f00 0%, #ff9500 50%, #ffb700 100%) border-box;">
            <h1 style="background: linear-gradient(90deg, #ff7f00 0%, #ff9500 50%, #ffb700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 28px; margin: 0 0 8px 0; letter-spacing: 2px; font-weight: 700;">CODEFORGE</h1>
            <p style="color: #737373; margin: 0; font-size: 12px; letter-spacing: 1px; text-transform: uppercase;">New Contact Submission</p>
          </div>
          
          <!-- Contact Details -->
          <div style="background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%); padding: 24px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #ff9500;">
            <h3 style="color: #cc6600; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Contact Details</h3>
            <p style="margin: 10px 0; color: #1a1a1a;"><strong style="color: #cc6600;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0; color: #1a1a1a;"><strong style="color: #cc6600;">Email:</strong> <a href="mailto:${email}" style="color: #ff7f00; text-decoration: none;">${email}</a></p>
            <p style="margin: 10px 0; color: #1a1a1a;"><strong style="color: #cc6600;">Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>

          <!-- Project Description -->
          <div style="background-color: #f8f8f7; padding: 24px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #737373;">
            <h3 style="color: #1a1a1a; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">Project Description</h3>
            <p style="color: #404040; line-height: 1.7; white-space: pre-wrap; margin: 0;">${project}</p>
          </div>

          <!-- Action Required -->
          <div style="background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%); padding: 24px; border-radius: 6px; margin: 20px 0; border: 1px solid #ff9500;">
            <h3 style="color: #cc6600; margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">Action Required</h3>
            <p style="color: #1a1a1a; margin: 0 0 8px 0;">
              <strong>Please respond within 24 hours to maintain our professional standards.</strong>
            </p>
            <p style="color: #737373; margin: 0; font-size: 14px;">
              Click reply to respond directly to the customer.
            </p>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e5e3;">
            <p style="color: #737373; margin: 0; font-size: 13px;">
              <strong style="background: linear-gradient(90deg, #ff7f00 0%, #ff9500 50%, #ffb700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">CodeForge Contact System</strong><br>
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
    subject: "Thank you for contacting CodeForge",
    html: `
      <div style="font-family: Inter, 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f8f8f7;">
        <div style="background-color: #ffffff; padding: 40px; border-radius: 6px; border: 1px solid #e5e5e3; box-shadow: 0px 4px 8px -1px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 32px;">
            <h1 style="background: linear-gradient(90deg, #ff7f00 0%, #ff9500 50%, #ffb700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 32px; margin: 0 0 8px 0; letter-spacing: 3px; font-weight: 700;">CODEFORGE</h1>
            <p style="color: #737373; margin: 0; font-size: 13px; letter-spacing: 1px;">Forging the future of technology</p>
          </div>

          <!-- Greeting -->
          <h2 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Hi ${name},</h2>
          
          <p style="color: #404040; line-height: 1.7; font-size: 16px; margin: 0 0 28px 0;">
            Thank you for reaching out to <strong style="background: linear-gradient(90deg, #ff7f00 0%, #ff9500 50%, #ffb700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">CodeForge</strong>. We have received your project inquiry and are excited to discuss your vision.
          </p>

          <!-- Your Submission -->
          <div style="background: linear-gradient(135deg, #fff5e6 0%, #ffe8cc 100%); padding: 24px; border-radius: 6px; margin: 0 0 28px 0; border: 1px solid #ff9500;">
            <h3 style="margin: 0 0 16px 0; color: #cc6600; font-size: 16px; font-weight: 600;">Your Submission</h3>
            <div style="background-color: #ffffff; padding: 16px; border-radius: 6px; border: 1px solid #e5e5e3;">
              <p style="margin: 0; white-space: pre-wrap; color: #404040; line-height: 1.6;">${project}</p>
            </div>
          </div>

          <!-- What Happens Next -->
          <div style="background-color: #f8f8f7; padding: 28px; border-radius: 6px; margin: 0 0 28px 0; border: 1px solid #e5e5e3;">
            <h3 style="color: #1a1a1a; margin: 0 0 20px 0; font-size: 16px; font-weight: 600;">What Happens Next</h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; vertical-align: top; width: 40px;">
                  <div style="background: linear-gradient(90deg, #ff7f00 0%, #ff9500 50%, #ffb700 100%); color: #ffffff; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">1</div>
                </td>
                <td style="padding: 10px 0; color: #404040; font-size: 14px; line-height: 1.5;">Our team reviews your requirements within 24 hours</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; vertical-align: top; width: 40px;">
                  <div style="background: linear-gradient(90deg, #ff7f00 0%, #ff9500 50%, #ffb700 100%); color: #ffffff; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">2</div>
                </td>
                <td style="padding: 10px 0; color: #404040; font-size: 14px; line-height: 1.5;">We prepare a tailored proposal and timeline</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; vertical-align: top; width: 40px;">
                  <div style="background: linear-gradient(90deg, #ff7f00 0%, #ff9500 50%, #ffb700 100%); color: #ffffff; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">3</div>
                </td>
                <td style="padding: 10px 0; color: #404040; font-size: 14px; line-height: 1.5;">We schedule a consultation call to discuss your vision</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; vertical-align: top; width: 40px;">
                  <div style="background: linear-gradient(135deg, #cc6600 0%, #ff7f00 100%); color: #ffffff; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; font-size: 14px;">4</div>
                </td>
                <td style="padding: 10px 0; color: #404040; font-size: 14px; line-height: 1.5;">We begin crafting your digital solution</td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 36px; padding-top: 28px; border-top: 1px solid #e5e5e3;">
            <p style="color: #737373; margin: 0 0 8px 0; font-size: 14px;">Best regards,</p>
            <p style="background: linear-gradient(90deg, #ff7f00 0%, #ff9500 50%, #ffb700 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0 0 16px 0; font-weight: 600; font-size: 18px;">The CodeForge Team</p>
            <p style="color: #737373; margin: 0; font-size: 13px;">
              Crafting digital excellence through code, creativity, and innovation.
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
