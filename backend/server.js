const corsOptions = {
  origin: [
    'https://ovinisilv.github.io',  // Seu frontend
    'http://localhost:3000'         // Para testes locais
  ]
};
app.use(cors(corsOptions));

app.post('/api/pagamento', async (req, res) => {
  const preference = {
    items: [{
      title: "Raspadinha",
      unit_price: 1,
      quantity: 1
    }],
    back_urls: {
      success: "https://ovinisilv.github.io/raspadinha1?status=success",
    }
  };
  
  const response = await mercadopago.preferences.create(preference);
  res.json({ url: response.body.init_point });
});