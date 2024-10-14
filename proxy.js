const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', createProxyMiddleware({ 
  target: 'https://script.google.com/macros/s/AKfycbymucHyMeANwDRi7xtl0IbXppo4PJt8DgWmsAK4g-KMBKuZ6veqCZymTy2GpVqPVLX5/exec',
  changeOrigin: true,
}));


app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
