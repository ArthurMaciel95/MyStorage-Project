const mongoose = require('mongoose');
const port = process.env.PORT || 4447;

require('dotenv').config();

require('./src/models/Post');
const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('conectado à base de dados');
    app.emit('pronto');
  })
  .catch((e) => console.log(e));

app.on('pronto', () => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
