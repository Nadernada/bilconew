import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    // Parse the incoming request body
    const body = await req.json();

    // Validate required fields
    const { fullname, email, phone, business_name, business_website, interest, description } = body;

    if (!fullname || !email || !phone || !business_name || !business_website || !interest || !description) {
      return new Response(
        JSON.stringify({ message: 'All fields are required' }),
        { status: 400 }
      );
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'nada@webloo.com',
      subject: `New Form Submission from ${fullname}`,
      text: `Name: ${fullname}\nEmail: ${email}\nPhone: ${phone}\nBusiness Name: ${business_name}\nBusiness Website: ${business_website}\nDescription: ${description}\nInterest: ${interest}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Thank you for contacting us!' }), { status: 200 });
  } catch (error) {
    console.error('Error in POST handler:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to send email', error: error.message }),
      { status: 500 }
    );
  }
}
