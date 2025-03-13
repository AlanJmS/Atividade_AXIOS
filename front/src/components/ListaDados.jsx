  import { useState } from "react";
  import "./styles.css";

  const ListaDados = ({ dados, editarDados, excluirDados }) => {
    const [editando, setEditando] = useState(null);
    const [novoNome, setNovoNome] = useState("");
    const [novaProfissao, setNovaProfissao] = useState("");

    return (
      <ul>
        {dados.length > 0 ? (
          dados.map((n) => (
            <li key={n.id}>
              {editando === n.id ? (
                <>
                  <input
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                  /> 
                  <input
                  value={novaProfissao}
                  onChange={(e) => setNovaProfissao(e.target.value)}
                />
                  <button
                    onClick={() => {
                      editarDados(n.id, {nome: novoNome, profissao: novaProfissao});
                      setEditando(null);
                    }}
                  >
                    Salvar
                  </button>
                </>
              ) : (
                <>
                
                  {n.nome} <br />
                  {n.profissao}
                  <button
                    onClick={() => {
                      setEditando(n.id);
                      setNovoNome(n.nome);
                      setNovaProfissao(n.profissao || "")
                    }}
                  >
                    ✏️
                  </button>
                  <button onClick={() => excluirDados(n.id)}>🗑️</button>
                </>
              )}
            </li>
          ))
        ) : (
          <li>Nenhum dado cadastrado.</li>
        )}
      </ul>
    );
  };

  export default ListaDados;
