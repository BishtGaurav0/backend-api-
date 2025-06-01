const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const errorHandler = require('./middlewares/errorHandler');
 const productRoutes = require('./routes/productRoutes');
 const interactionRoutes = require('./routes/interactionRoutes');
 const recommendationRoutes = require('./routes/recommendationRoutes');
 const similarRoutes = require("./routes/similar.routes");

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));



app.use('/api/auth', authRoutes);
 app.use('/api/products', productRoutes);
 app.use('/api/interactions', interactionRoutes);
 app.use('/api/recommendations', recommendationRoutes);
 app.use("/api/products", similarRoutes);
 app.use("/api/recommendations", require("./routes/recommendation"));
 app.use("/api/userinteractions", require("./routes/userInteraction"));

// // Error Handler
// app.use(errorHandler);

module.exports = app;
