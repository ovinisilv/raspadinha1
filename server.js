require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();

// Serve arquivos estáticos
app.use(express.static('public'));

// CORS
const corsOptions = {
  origin: ['https://ovinisilv.github.io', 'http://localhost:3000']
};
app.use(cors(corsOptions));
app.use(express.json());

// Mercado Pago
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

// Rota de pagamento
app.post('/api/pagamento', async (req, res) => {
  try {
    const preference = {
      items: [{
        title: "Raspadinha Raspou Lavou",
        quantity: 1,
        currency_id: "BRL",
        unit_price: 1.00
      }],
      back_urls: {
        success: "http://localhost:3000?status=success",
        failure: "http://localhost:3000?status=failure",
        pending: "http://localhost:3000?status=pending"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({
      success: true,
      init_point: response.body.init_point
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
