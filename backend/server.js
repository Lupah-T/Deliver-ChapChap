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
  pickupAddress: String,
  destinationAddress: String,
  pickupLocation: {
    lat: Number,
    lng: Number
  },
  destinationLocation: {
    lat: Number,
    lng: Number
  },
  distance: Number,
  estimatedCost: Number,
  senderName: String,
  senderPhone: String,
  senderEmail: String,
  recipientName: String,
  recipientPhone: String,
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

// Clean up unverified spam bookings every hour
setInterval(async () => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    await Booking.deleteMany({
      status: 'Pending Payment',
      createdAt: { $lt: oneHourAgo }
    });
    console.log('Cleaned up unverified bookings');
  } catch (err) {
    console.error('Cleanup error:', err);
  }
}, 60 * 60 * 1000);

app.post('/api/bookings', async (req, res) => {
  try {
    const { 
      pickupAddress, destinationAddress, pickupLocation, destinationLocation, distance, estimatedCost,
      senderEmail, recipientEmail, senderName, senderPhone, recipientName, recipientPhone, parcelDetails, expectedTime 
    } = req.body;

    
    // Save booking to DB without trackingId (Pending Payment)
    const booking = new Booking({
      trackingId: 'PENDING_' + Math.random().toString().slice(2, 11), // Temporary ID
      pickupAddress,
      destinationAddress,
      pickupLocation,
      destinationLocation,
      distance,
      estimatedCost,
      senderName,
      senderPhone,
      senderEmail,
      recipientName,
      recipientPhone,
      recipientEmail,
      parcelDetails,
      expectedTime,
      status: 'Pending Payment'
    });
    await booking.save();
    
    // We do NOT send emails yet, only after STK success
    res.status(200).json({ status: 'success', bookingId: booking._id, message: 'Booking initialized, waiting for payment.' });
  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).json({ status: 'error', message: 'Failed to process booking.' });
  }
});

// STK Push Endpoint (Sandbox Mock)
app.post('/api/mpesa/stkpush', async (req, res) => {
  const { bookingId, phone, amount } = req.body;
  
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    console.log(`[M-PESA SIMULATION] Initiating STK push to ${phone} for KES ${amount}`);
    
    // Send immediate response to frontend that STK is sent
    res.json({ success: true, message: 'STK Push sent to phone.' });

    // Simulate user taking time to enter PIN (8 seconds)
    setTimeout(async () => {
      try {
        console.log(`[M-PESA SIMULATION] Payment of KES ${amount} received from ${phone}`);
        
        // Generate actual tracking ID
        const trackingId = 'DC' + Math.random().toString().slice(2, 11);
        
        booking.trackingId = trackingId;
        booking.status = 'Booking Confirmed';
        await booking.save();

        // Send confirmation emails
        if (booking.senderEmail) {
          try {
            await transporter.sendMail({
              from: '"DropFlexa" <noreply@dropflexa.co.ke>',
              to: booking.senderEmail,
              subject: 'Booking Confirmed - DropFlexa',
              text: `Hello ${booking.senderName},\n\nYour payment of KES ${booking.estimatedCost} was successful. Your tracking number is ${trackingId}. It is expected to arrive at ${booking.expectedTime}.\n\nThank you for using DropFlexa.`
            });
          } catch (err) {
            console.error('Sender email error:', err.message);
          }
        }
        if (booking.recipientEmail) {
          try {
            await transporter.sendMail({
              from: '"DropFlexa" <noreply@dropflexa.co.ke>',
              to: booking.recipientEmail,
              subject: 'Incoming Parcel - DropFlexa',
              text: `Hello ${booking.recipientName},\n\nYou have an incoming parcel (${booking.parcelDetails}) from ${booking.senderName}. Your tracking number is ${trackingId}. It is expected to arrive at ${booking.expectedTime}.\n\nThank you for using DropFlexa.`
            });
          } catch (err) {
            console.error('Recipient email error:', err.message);
          }
        }
      } catch (err) {
        console.error('Simulated callback error:', err);
      }
    }, 8000);

  } catch (error) {
    res.status(500).json({ error: 'STK push failed' });
  }
});

// Polling endpoint for frontend
app.get('/api/bookings/status/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: 'Not found' });
    res.json({ status: booking.status, trackingId: booking.trackingId });
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
