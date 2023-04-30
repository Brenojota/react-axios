import React from "react";
import { useEffect, useState } from "react";

import url from "../axios/config";
import './Home.css'

export default function Home() {
  const [clientes, setClientes] = useState([]);

  const [usuario, setUsuario] = useState();
  const [senha, setSenha] = useState();

  const getClientes = async () => {
    try {
      const response = await url.get("/clientes");

      setClientes(response.data);
      console.log(clientes);
    } catch (error) {
      console.log(error);
    }
  };

  const postCliente = async (e) => {
    const clienteNew = {
      usuario,
      senha,
    };

    await fetch("http://localhost:3001/clientes", {
      method: "POST",
      body: JSON.stringify(clienteNew),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(getClientes());


  };

  const deleteCliente = async (id) => {
    await fetch(`http://localhost:3001/clientes/${id}`, {
      method: "DELETE",
    }).then(getClientes());
  };

  const putCliente = async (id, data) => {
    await fetch(`http://localhost:3001/clientes/${id}`, {
      method: "PUT",
      body: JSON.stringify({usuario: data.client, senha: data.senha}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(getClientes());
  };

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <div>
      <div className="container-cadastro" >
        <h1 className="titulo">Cadastre-se agora: </h1>

        <form onSubmit={(e) => postCliente(e)}>
          <div className="input-form">
            <label className="text-label" htmlFor="usuario">Usuário: </label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="input-form">
            <label className="text-label"  htmlFor="senha">Senha: </label>
            <input
              className="input-campo"
              size={20}
              type="password"
              placeholder="Digite sua senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <input type="submit" value="Criar conta" />
        </form>
      </div>

      <h1>Usuários</h1>
      {clientes.length === 0 ? (
        <p>Carregando</p>
      ) : (
        clientes.map((cliente) => (
         <Card
          key={cliente._id}
          cliente={cliente} 
          putCliente={putCliente} 
          deleteCliente={deleteCliente}
         />
        ))
      )}
    </div>
  );
}

function Card({ cliente , putCliente, deleteCliente} ) {

  const [client, setClient] = useState(cliente.usuario)
  const [senha, setSenha] = useState(cliente.senha)

  return (
    <div>
      <textarea 
      onChange={(e) => setClient(e.target.value)}>{cliente.usuario}</textarea>

      <textarea
        onChange={(e) => setSenha(e.target.value)} 
      >{cliente.senha}</textarea>

      <button onClick={() => putCliente(cliente._id, {client, senha})}>Editar</button>
      <button onClick={() => deleteCliente(cliente._id)}>Excluir</button>
    </div>
  );
}
