import { useState } from "react";
import "./styles.css";

const AdicionarDado = ({ adicionarDado }) => {
  const [nome, setNome] = useState("");
  const [profissao, setProfissao] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarDado({nome, profissao});
    setNome("");
    setProfissao("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
  type="text"
  placeholder="Profissão"
  value={profissao}
  onChange={(e) => setProfissao(e.target.value)}
  required
/>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default AdicionarDado;

