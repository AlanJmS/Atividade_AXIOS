import { useState, useEffect } from "react";
import AdicionarDado from "./AdicionarDado";
import ListaDados from "./ListaDados";
import api from "../api";
import "./styles.css";

const App = () => {
  const [dados, setDados] = useState([]);

  // Carregar dados da API ao iniciar
  useEffect(() => {
    api.get("/dados").then((res) => setDados(res.data));
  }, []);

  // Função para adicionar dados
  const adicionarDados = async ({nome, profissao}) => {
    const res = await api.post("/dados", { nome, profissao });
    setDados([...dados, res.data]);
  };

  // Função para excluir dados
  const excluirDados = async (id) => {
    await api.delete(`/dados/${id}`);
    setDados(dados.filter((n) => n.id !== id));
  };

  // Função para editar dados
  const editarDados = async (id, {nome, profissao}) => {
    const res = await api.put(`/dados/${id}`, {nome, profissao });
    setDados(dados.map((n) => (n.id === id ? res.data : n)));
    
  };

  return (
    <div>
      <h1>Manipulador de dados</h1>
      <AdicionarDado adicionarDado={adicionarDados} />
      <ListaDados dados={dados} editarDados={editarDados} excluirDados={excluirDados} />
    </div>
  );
};

export default App;
