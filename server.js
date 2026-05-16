const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Health check endpoint (for Kubernetes liveness probe)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    service: 'FinPay Payment API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Ready check endpoint (for Kubernetes readiness probe)
app.get('/ready', (req, res) => {
  res.status(200).json({
    ready: true,
    version: '1.0.0',
  });
});

// API: Payment initiation
app.post('/api/payments', (req, res) => {
  const { amount, merchant_id, order_id } = req.body;

  if (!amount || !merchant_id || !order_id) {
    return res.status(400).json({
      error: 'Missing required fields: amount, merchant_id, order_id',
    });
  }

  res.status(201).json({
    payment_id: `PAY_${Date.now()}`,
    status: 'initiated',
    amount: amount,
    merchant_id: merchant_id,
    order_id: order_id,
    timestamp: new Date().toISOString(),
  });
});

// API: Payment status check
app.get('/api/payments/:payment_id', (req, res) => {
  const { payment_id } = req.params;

  res.status(200).json({
    payment_id: payment_id,
    status: 'completed',
    amount: 9999,
    merchant_id: 'merchant_123',
    timestamp: new Date().toISOString(),
  });
});

// API: Hello endpoint (for testing)
app.get('/api/hello', (req, res) => {
  res.status(200).json({
    message: 'Welcome to FinPay Payment Service',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`✅ FinPay API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 Ready check: http://localhost:${PORT}/ready`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Graceful shutdown...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
