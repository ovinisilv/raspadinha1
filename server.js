require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
app.use(express.json());
app.use(cors());

mercadopago.configure({
  access_token: 'APP_USR-8380993607403713-061818-89057b688387830fa2dee641606bd99a-171848371'
});

const premios = [2, 3, 10, 20, 50, 100, 500];

app.post('/api/pagamento', async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: 'Raspadinha Raspou Lavou',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 1.00
        }
      ],
      back_urls: {
        success: 'http://localhost:3000?status=approved',
        failure: 'http://localhost:3000?status=failure'
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar pagamento' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
