const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Resend } = require('resend');
const mongodb = require('mongodb');

dotenv.config();

const app = express();

const resend = new Resend(process.env.RESEND_API_KEY);

console.log('MongoDB URI loaded:', !!process.env.MONGODB_URI);

const client = new mongodb.MongoClient(process.env.MONGODB_URI);

let db;

async function connectDatabase() {
try {
await client.connect();
db = client.db('almira');


process.stdout.write('MongoDB connected successfully!\n');


} catch (error) {
console.error('MongoDB connection failed:', error);
}
}

connectDatabase();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
res.send('Almira backend is running!');
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await db
      .collection('orders')
      .find()
      .sort({ createdAt: -1 })
      .toArray()

    res.json(orders)
  } catch (error) {
    console.error('Failed to fetch orders:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    })
  }
})

app.post('/send-order-email', async (req, res) => {
try {
const {
name,
email,
phone,
address,
city,
orderItems,
orderTotal
} = req.body;


const order = {
  name: name,
  email: email,
  phone: phone,
  address: address,
  city: city,
  orderItems: orderItems,
  orderTotal: orderTotal,
  status: 'Pending',
  createdAt: new Date()
};

await db.collection('orders').insertOne(order);

console.log('Order saved to MongoDB!');

const emailHtml =
  '<div style="margin:0;padding:40px 20px;background:#f7f1e8;font-family:Georgia,serif;color:#55352a;">' +

    '<div style="max-width:650px;margin:0 auto;background:#ffffff;border:1px solid #dfcdb9;">' +

      '<div style="padding:35px 40px;text-align:center;background:#ead8c5;border-bottom:1px solid #dfcdb9;">' +
        '<div style="font-size:28px;letter-spacing:4px;color:#55352a;">ALMIRA</div>' +
        '<div style="margin-top:8px;font-size:13px;letter-spacing:1.5px;color:#765c50;">WHERE TRADITION MEETS ELEGANCE</div>' +
      '</div>' +

      '<div style="padding:40px;">' +

        '<p style="margin:0 0 10px;font-size:12px;letter-spacing:2px;color:#8b451f;">ORDER CONFIRMATION</p>' +

        '<h1 style="margin:0 0 20px;font-size:28px;font-weight:500;color:#55352a;">Thank you for your order, ' +
          name +
        '!</h1>' +

        '<p style="margin:0 0 30px;font-size:15px;line-height:1.7;color:#765c50;">' +
          'Your order has been successfully placed. Here are your order details:' +
        '</p>' +

        '<div style="padding:25px;background:#f7f1e8;border:1px solid #dfcdb9;">' +

          '<p style="margin:0 0 12px;font-size:12px;letter-spacing:1.5px;color:#8b451f;">ORDER DETAILS</p>' +

          '<p style="margin:0 0 18px;font-size:14px;line-height:1.7;color:#55352a;">' +
            orderItems +
          '</p>' +

          '<div style="border-top:1px solid #dfcdb9;padding-top:15px;">' +
            '<span style="font-size:14px;color:#765c50;">TOTAL</span>' +
            '<strong style="float:right;font-size:16px;color:#55352a;">' +
              orderTotal +
            '</strong>' +
          '</div>' +

        '</div>' +

        '<div style="margin-top:30px;">' +

          '<p style="margin:0 0 15px;font-size:12px;letter-spacing:1.5px;color:#8b451f;">DELIVERY INFORMATION</p>' +

          '<p style="margin:6px 0;font-size:14px;color:#765c50;">' +
            '<strong style="color:#55352a;">Name:</strong> ' + name +
          '</p>' +

          '<p style="margin:6px 0;font-size:14px;color:#765c50;">' +
            '<strong style="color:#55352a;">Phone:</strong> ' + phone +
          '</p>' +

          '<p style="margin:6px 0;font-size:14px;color:#765c50;">' +
            '<strong style="color:#55352a;">Address:</strong> ' + address +
          '</p>' +

          '<p style="margin:6px 0;font-size:14px;color:#765c50;">' +
            '<strong style="color:#55352a;">City:</strong> ' + city +
          '</p>' +

        '</div>' +

      '</div>' +

      '<div style="padding:25px 40px;text-align:center;background:#3b2118;color:#ead8c5;">' +
        '<p style="margin:0;font-size:13px;letter-spacing:1px;">Thank you for shopping with Almira.</p>' +
      '</div>' +

    '</div>' +

  '</div>';

const { data, error } = await resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'albinash334@gmail.com',
  subject: 'Almira Order Confirmation',
  html: emailHtml
});

if (error) {
  console.error('Email error:', error);

  return res.status(500).json({
    success: false,
    message: error.message
  });
}

res.json({
  success: true,
  message: 'Order saved and confirmation email sent!',
  data: data
});


} catch (error) {
console.error('Order error:', error);


res.status(500).json({
  success: false,
  message: 'Failed to process order.'
});


}
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body

    const result = await db.collection('orders').updateOne(
      { _id: new mongodb.ObjectId(req.params.id) },
      { $set: { status: status } }
    )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    res.json({
      success: true,
      message: 'Order status updated'
    })

  } catch (error) {
    console.error('Status update error:', error)

    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    })
  }
})

app.listen(5000, () => {
console.log('Almira backend running on http://localhost:5000');
});
