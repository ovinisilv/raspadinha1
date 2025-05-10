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