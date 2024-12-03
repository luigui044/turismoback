export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:5173', 'http://localhost', 'https://probalosv.com', 'https://www.probalosv.com', 'https://tm.probalosv.com', 'https://turismomas.com', 'https://www.turismomas.com'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    },
  }
];
