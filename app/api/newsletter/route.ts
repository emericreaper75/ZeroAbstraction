import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import WelcomeEmail from '@/components/emails/welcome';

// The API key is set in standard NextJS env vars, fallback to dummy for development if not present
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_123');

const NewsletterSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = NewsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      );
    }

    const { email } = result.data;

    // Optional: Add to Resend Audience/Contacts
    // We assume an audience ID is in the env var: RESEND_AUDIENCE_ID
    if (process.env.RESEND_AUDIENCE_ID && process.env.RESEND_API_KEY) {
      await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      });
    }

    // Send the Welcome Email
    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Zero Abstraction <newsletter@zero-abstraction.com>', // Replace with verified domain
        to: email,
        subject: 'Welcome to Zero Abstraction',
        react: WelcomeEmail(),
      });
    } else {
      console.log('Skipping Resend email send due to missing API key for:', email);
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to the newsletter!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
