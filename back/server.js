const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const PORT = 4000;

// Listar todos os nomes
app.get("/dados", async (req, res) => {
  try {
    const dados = await prisma.teste_axios.findMany();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar nomes" });
  }
});

// Adicionar um nome
app.post("/dados", async (req, res) => {
  try {
    const { nome, profissao } = req.body;
    const novoDado = await prisma.teste_axios.create({
      data: { nome, profissao },
    });
    res.status(201).json(novoDado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar nome" });
  }
});

// Editar um nome pelo ID
app.put("/dados/:id", async (req, res) => {
  try {
    const { id} = req.params;
    const { nome, profissao } = req.body;

    const dadoAtualizado = await prisma.teste_axios.update({
      where: { id},
      data: { nome, profissao},
    });

    res.json(dadoAtualizado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao editar nome" });
  }
});

// Excluir um dado pelo ID
app.delete("/dados/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.teste_axios.delete({ where: { id } });
    res.json({ message: "Dados excluídos com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir dado" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
