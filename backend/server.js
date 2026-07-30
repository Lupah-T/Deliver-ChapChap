import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/deliver-chapchap';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/bookings', async (req, res) => {
  try {
    const { senderEmail, recipientEmail, senderName, recipientName, parcelDetails, expectedTime } = req.body;
    
    // Simulate booking save to DB here...
    
    // Send email to Sender
    await transporter.sendMail({
      from: '"Deliver Chap Chap" <noreply@deliverchapchap.co.ke>',
      to: senderEmail,
      subject: 'Booking Confirmed - Deliver Chap Chap',
      text: `Hello ${senderName},\n\nYour booking for the parcel (${parcelDetails}) has been confirmed. It is expected to arrive at ${expectedTime}.\n\nThank you for using Deliver Chap Chap.`
    });

    // Send email to Recipient
    await transporter.sendMail({
      from: '"Deliver Chap Chap" <noreply@deliverchapchap.co.ke>',
      to: recipientEmail,
      subject: 'Incoming Parcel - Deliver Chap Chap',
      text: `Hello ${recipientName},\n\nYou have an incoming parcel (${parcelDetails}) from ${senderName}. It is expected to arrive at ${expectedTime}.\n\nThank you for using Deliver Chap Chap.`
    });

    res.status(200).json({ status: 'success', message: 'Booking confirmed and emails sent.' });
  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ status: 'error', message: 'Failed to process booking.' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
