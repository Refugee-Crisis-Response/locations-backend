import restify from 'restify';


let server = restify.createServer();
server.use(restify.bodyParser());

server.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the home of the EU Migrants Refuge API'
  });
});

server.listen(3000, () => {
  console.log('now listening at %s', server.url);
});
