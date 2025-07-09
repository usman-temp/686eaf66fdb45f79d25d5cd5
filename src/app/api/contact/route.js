import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Submission =
  mongoose.models.Submission || mongoose.model('Submission', submissionSchema);

async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI);
}

export async function POST(request) {
  try {
    const body = await request.json();
    await connectDB();

    // Verify CAPTCHA
    const captchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${body.captcha}`,
      { method: 'POST' }
    );
    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return NextResponse.json(
        { error: 'CAPTCHA verification failed' },
        { status: 400 }
      );
    }

    const submission = new Submission(body);
    await submission.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}
