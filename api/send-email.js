import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, project } = req.body;

    if (!name || !email || !project) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Create transporter using environment variables
        const transporter = nodemailer.createTransporter({
            service: 'gmail', // or your preferred email service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS, // Use app password for Gmail
            },
        });

        // Email to admin
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: `New Project Inquiry from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #ff7f00; padding-bottom: 10px;">New Project Inquiry</h2>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #ff7f00; margin-bottom: 5px;">Client Information:</h3>
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #ff7f00; margin-bottom: 10px;">Project Description:</h3>
              <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #ff7f00;">
                <p style="margin: 0; white-space: pre-wrap;">${project}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                This inquiry was submitted through the CodeForge contact form.
              </p>
            </div>
          </div>
        </div>
      `,
        };

        // Email to user (confirmation)
        const userMailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for reaching out to CodeForge!',
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #ff7f00; padding-bottom: 10px;">Thank You, ${name}!</h2>
            
            <p style="color: #666; line-height: 1.6;">
              We've received your project inquiry and are excited to learn more about your vision. 
              Our team will review your requirements and get back to you within 24 hours.
            </p>
            
            <div style="background-color: #f8f8f8; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ff7f00;">
              <h3 style="color: #ff7f00; margin-top: 0;">What happens next?</h3>
              <ul style="color: #666; padding-left: 20px;">
                <li>Our team reviews your project requirements</li>
                <li>We prepare a detailed proposal and timeline</li>
                <li>We schedule a consultation call to discuss your vision</li>
                <li>We begin crafting your digital solution</li>
              </ul>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #ff7f00; margin-bottom: 10px;">Your Project Summary:</h3>
              <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px;">
                <p style="margin: 0; white-space: pre-wrap;">${project}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
              <p style="color: #666; margin: 10px 0;">
                <strong>CodeForge Team</strong><br>
                Forging the future of technology
              </p>
              <p style="color: #999; font-size: 14px; margin: 0;">
                If you have any immediate questions, feel free to reply to this email.
              </p>
            </div>
          </div>
        </div>
      `,
        };

        // Send both emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions),
        ]);

        res.status(200).json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
}
