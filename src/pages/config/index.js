// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div className="container">
        <h1>Lista de configurações:</h1>
        <div className="list-group">
          {data.length <= 0
            ? 'Nenhuma conf. cadastrada'
            : data.map((dat) => (
                <button type="button" key={data.message} className="list-group-item list-group-item-action">
                  <span> id: </span> {dat.id} <br />
                  <span> data: </span>
                  {dat.message}
                </button>
              ))}
        </div>
        <h1>Ações:</h1>
        <div className="form-group">
        <label>String de conexão: </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => this.setState({ message: e.target.value })}
            placeholder="configurações da conexão"
          />
          <button className="btn btn-secondary" onClick={() => this.putDataToDB(this.state.message)}>
            Adicionar
          </button>
        </div>
        <div className="form-group">
        <label>Deletar por ID: </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="ID da conf. para deletar"
          />
          <button className="btn btn-secondary" onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            Deletar
          </button>
        </div>
        <div className="form-group">
        <label>Atualizar String: </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="ID da conf. para atualizar"
          />
          <input
            type="text"
            className="form-control"
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="Valor a atualizar"
          />
          <button className="btn btn-secondary" 
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            Atualizar
          </button>
        </div>
      </div>
    );
  }
}

export default App;


/*import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

export default class Config extends Component {
    render() {
        return (
            <div class="container">
                <h1>Exibe Configurações</h1>
                <a href="/config/create"><button className="btn btn-primary">Criar Configuração</button></a>
            </div>
        )
    }
}*/