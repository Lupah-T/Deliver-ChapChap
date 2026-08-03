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
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dropflexa';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const bookingSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  senderName: String,
  senderEmail: String,
  recipientName: String,
  recipientEmail: String,
  parcelDetails: String,
  expectedTime: String,
  status: { type: String, default: 'Booking Confirmed' },
  progress: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model('Booking', bookingSchema);

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
    
    // Generate unique tracking ID
    const trackingId = 'DC' + Math.random().toString().slice(2, 11);
    
    // Save booking to DB
    const booking = new Booking({
      trackingId,
      senderName,
      senderEmail,
      recipientName,
      recipientEmail,
      parcelDetails,
      expectedTime
    });
    await booking.save();
    
    // Send email to Sender
    try {
      await transporter.sendMail({
        from: '"DropFlexa" <noreply@dropflexa.co.ke>',
        to: senderEmail,
        subject: 'Booking Confirmed - DropFlexa',
        text: `Hello ${senderName},\n\nYour booking for the parcel (${parcelDetails}) has been confirmed. Your tracking number is ${trackingId}. It is expected to arrive at ${expectedTime}.\n\nThank you for using DropFlexa.`
      });

      // Send email to Recipient
      await transporter.sendMail({
        from: '"DropFlexa" <noreply@dropflexa.co.ke>',
        to: recipientEmail,
        subject: 'Incoming Parcel - DropFlexa',
        text: `Hello ${recipientName},\n\nYou have an incoming parcel (${parcelDetails}) from ${senderName}. Your tracking number is ${trackingId}. It is expected to arrive at ${expectedTime}.\n\nThank you for using DropFlexa.`
      });
    } catch (emailError) {
      console.error('Email failed to send, but booking saved:', emailError);
    }

    res.status(200).json({ status: 'success', trackingId, message: 'Booking confirmed and emails sent.' });
  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ status: 'error', message: 'Failed to process booking.' });
  }
});

app.get('/api/bookings/:trackingId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ trackingId: req.params.trackingId });
    if (!booking) return res.status(404).json({ error: 'Tracking ID not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracking info' });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
