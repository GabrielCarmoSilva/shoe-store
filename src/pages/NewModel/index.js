import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import logoImg from '../../assets/sneaker-2.png';

export default function NewModel() {
    const [name, setName] = useState('');

    const sponsor_id = localStorage.getItem('sponsor_id');
    console.log(sponsor_id);

    const history = useHistory();

    async function handleNewModel(e) {
        e.preventDefault();

        const data = ({ sponsor_id, name })

        try {
            const response = await api.post('models', data);

            alert('Modelo cadastrado com sucesso.');

            history.push('/models');
        } catch (err) {
            alert('Erro ao cadastrar modelo, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="container-fluid">
            <Helmet>
                <style>{'body { background-color: #f7f7f7; }'}</style>
            </Helmet>
            <br></br>
            <div className="row">
                <div className="col-sm-1" />
                <div className="col-sm-2">
                    <img src={logoImg} alt="System Logo" />
                </div>
                <div className="col-sm-7" />
                <div className="col-sm-1">
                    <Link to="/models">
                        <button type="button" className="btn btn-danger">Voltar</button>
                    </Link>
                </div>
                <div className="col-sm-1">
                    <Link>
                        <button onClick={handleLogout} type="button" className="btn btn-dark">Sair</button>
                    </Link>
                </div>
            </div>
            <div className="container quant-box border rounded border-secondary">
                <h1>Cadastrar novo modelo</h1>
                <form onSubmit={handleNewModel}>
                    <div className="row">
                        <div className="col-sm-8">
                            <input 
                                className="form-control" 
                                placeholder="Nome do modelo"
                                value={name}
                                onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="col-sm-4">    
                            <button className="btn btn-dark btn-text" type="submit">Cadastrar</button>
                        </div>    
                    </div>    
                </form>
            </div>
        </div>
    );
}