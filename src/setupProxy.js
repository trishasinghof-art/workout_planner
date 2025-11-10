const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/workout-type',
    createProxyMiddleware({
      target: 'https://workout-type-api.onrender.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/workout-type': '',
      },
      onProxyReq: (proxyReq) => {
        console.log('Proxying workout-type request to:', proxyReq.path);
      },
      onError: (err, req, res) => {
        console.error('Proxy error (workout-type):', err);
        res.status(500).json({ error: 'Proxy error' });
      },
    })
  );

  app.use(
    '/api/exercise',
    createProxyMiddleware({
      target: 'https://exercise-api-cvza.onrender.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/exercise': '',
      },
      onProxyReq: (proxyReq) => {
        console.log('Proxying exercise request to:', proxyReq.path);
      },
      onError: (err, req, res) => {
        console.error('Proxy error (exercise):', err);
        res.status(500).json({ error: 'Proxy error' });
      },
    })
  );

  app.use(
    '/api/macro',
    createProxyMiddleware({
      target: 'https://macro-api-igmt.onrender.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/macro': '',
      },
      onProxyReq: (proxyReq) => {
        console.log('Proxying macro request to:', proxyReq.path);
      },
      onError: (err, req, res) => {
        console.error('Proxy error (macro):', err);
        res.status(500).json({ error: 'Proxy error' });
      },
    })
  );

  app.use(
    '/api/meal-plan',
    createProxyMiddleware({
      target: 'https://meal-plan-new-api.onrender.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/meal-plan': '',
      },
      onProxyReq: (proxyReq) => {
        console.log('Proxying meal-plan request to:', proxyReq.path);
      },
      onError: (err, req, res) => {
        console.error('Proxy error (meal-plan):', err);
        res.status(500).json({ error: 'Proxy error' });
      },
    })
  );
};
