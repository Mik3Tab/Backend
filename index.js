const express = require('express');
const app = express();
const puerto = 5500;

app.use(express.json());

app.use('/products', require('./routes/products'));
app.use('/categories',require('./routes/categories'));
app.use('/orders',require('./routes/orders'));
app.use('/users',require('./routes/users'));

app.listen(puerto, ()=> console.log('Servidor levantado en el puerto: ',puerto));

