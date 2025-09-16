// Coloque estas duas linhas no topo de tudo!
require("dotenv").config();

console.log(
  "URL de Conexão que o Node está tentando usar:",
  process.env.MONGO_URL
);
const mongoose = require("mongoose");

// ... outras importações como 'express', etc.

const MONGO_URL = process.env.MONGO_URL;

// Adicione um log para ter certeza de que a URL está sendo carregada
console.log("Tentando conectar com a URL:", MONGO_URL);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    // A conexão funcionou!
    console.log("✅ Conectado ao MongoDB com sucesso!");
  })
  .catch((error) => {
    // A conexão falhou!
    console.error("❌ Erro ao conectar ao MongoDB:", error.message);
  });

// ... resto do seu código do servidor (app.listen, etc.)
