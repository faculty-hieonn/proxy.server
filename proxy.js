const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

//app.use('/api', createProxyMiddleware({ 
//  target: 'https://script.google.com/macros/s/AKfycbymucHyMeANwDRi7xtl0IbXppo4PJt8DgWmsAK4g-KMBKuZ6veqCZymTy2GpVqPVLX5/exec',
//  changeOrigin: true,
//}));

app.use('/api', createProxyMiddleware({
  target: 'https://api.example.com',
  changeOrigin: true,
  preserveHeaderKeyCase: true,
  cookieDomainRewrite: { '*': '' },
  headers: {
    'Cookie': req => req.headers.cookie || '',
  },
  onProxyReq: (proxyReq, req, res) => {
    // 원본 요청의 헤더를 프록시 요청에 복사
    Object.keys(req.headers).forEach(function (key) {
      proxyReq.setHeader(key, req.headers[key]);
    });

    // 원본 쿠키를 프록시 요청에 포함
    if (req.headers.cookie) {
      proxyReq.setHeader('Cookie', req.headers.cookie);
    }
  }
}));


app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
