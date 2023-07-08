import React, { useEffect, useState } from "react";
import Main from "../template/Main";
import axios from "axios";
import './UserCrud.css'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: incluir, listar, alterar e excluir'
}

const baseURL = 'http://localhost:3001/users';

const initialState = {
  user: { name: '', email: '' },
  list: []
}

export default function UserCrud(props){
  const [state, setState] = useState({...initialState});

  useEffect(()=> {
    axios.get(baseURL).then(resp => {
      setState(prevState => ({ ...prevState, list: resp.data }));
    }, [])
  })

  function clear() {
    setState({user: initialState.user});
  }

  function save() {
    const user = state.user;
    const method = user.id ? 'put' : 'post';
    const url = user.id ? `${baseURL}/${user.id}` : baseURL;
    axios[method](url, user)
    .then(resp => {
      const list = getUpdatedList(resp.data);
      setState({user: initialState.user, list: list});
    })
  }

  function getUpdatedList(user, add = true) {
    const list = state.list.filter(u => u.id !== user.id);
    if(add) list.unshift(user);
    return list;
  }

  function updateField(event) {
    const user = {...state.user};
    user[event.target.name] = event.target.value;
    setState(prevState => ({ ...prevState, user}));
  }

  function renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" className="form-control" name="name"
              value={state.user.name} onChange={e => updateField(e)}
              placeholder="Digite o nome..." />
            </div>
          </div>

          <div className="col-12 col-md-6 formulario">
            <div className="form-group">
              <label>Email</label>
              <input type="text" className="form-control" name="email"
              value={state.user.email} onChange={e => updateField(e)}
              placeholder="Digite o email..." />
            </div>
          </div>
        </div>

        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={save}>
              Salvar
            </button>
            <button className="btn btn-secondary ml-2 botao" onClick={clear}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  function load(user) {
    setState(prevState => ({
      ...prevState,
      user: { ...user }
    }));
  }

  function remove(user) {
    axios.delete(`${baseURL}/${user.id}`)
    .then(resp => {
      const list = getUpdatedList(user, false);
      setState( prevState => ({...prevState,  list }))
    })
  }

  function renderTable() {
    return(
    <table className="table mt-4">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {renderRows()}
      </tbody>
    </table>
    )
  }

  function renderRows() {
    return state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button className="btn btn-warning" onClick={() => load(user)}>
              <i className="fa fa-pencil"></i>
            </button>
            <button className="btn btn-danger ml-2 botao" onClick={() => remove(user)}>
              <i className="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      )
    })
  }
  
  return (
    <Main {...headerProps}>
      {renderForm()}
      {renderTable()}
    </Main>
  )
}