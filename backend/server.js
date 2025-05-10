require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

// Inicializa o app Express
const app = express();

// Configura o CORS
const corsOptions = {
  origin: [
    'https://ovinisilv.github.io',  // Seu frontend no GitHub Pages
    'http://localhost:3000'         // Para testes locais
  ]
};
app.use(cors(corsOptions));
app.use(express.json());

// Configura o Mercado Pago
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
        success: "https://ovinisilv.github.io/raspadinha1?status=success",
        failure: "https://ovinisilv.github.io/raspadinha1?status=failure",
        pending: "https://ovinisilv.github.io/raspadinha1?status=pending"
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

// Rota de saúde (opcional)
app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

// Inicia o servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});