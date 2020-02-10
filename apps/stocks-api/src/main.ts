/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
const Server = require('hapi');
const axios = require('axios');
const apiKey =  'Tpk_ceacd85a06524a0b8d53adb8681b76ae';
const apiURL= 'https://sandbox.iexapis.com';
const init = async () => {
  const server = new Server({
    port: 3000,
    host: 'localhost'
  });
 
  server.route({
    method: 'GET',
    path: '/beta/stock/{symbol}/chart/{period}',
    handler: async(request, h) => {
      const stockData = await axios.get(apiURL + '/beta/stock/{symbol}/chart/{period}?token=' + apiKey)
      return h.response(stockData);
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
