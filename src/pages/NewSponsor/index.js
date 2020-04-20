import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import logoImg from '../../assets/sneaker-2.png';

export default function NewSponsor() {
    const [name, setName] = useState('');

    const history = useHistory();

    async function handleNewSponsor(e) {
        e.preventDefault();

        const data = ({ name });

        try {
            const response = await api.post('sponsors', data);

            alert('Marca cadastrada com sucesso.');

            history.push('/sponsors');
        } catch (err) {
            alert('Erro ao cadastrar marca, tente novamente.');
        }
    }

    async function handleLogout() {
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
                    <Link to="/sponsors">
                        <button type="button" className="btn btn-danger">Voltar</button>
                    </Link>
                </div>
                <div className="col-sm-1">
                    <button onClick={handleLogout} type="button" className="btn btn-dark">Sair</button>
                </div>
            </div>
            <div className="container quant-box border rounded border-secondary">
                <h1>Cadastrar nova marca</h1>
                <form onSubmit={handleNewSponsor}>
                    <div className="row">
                        <div className="col-sm-8">
                            <input 
                                className="form-control" 
                                placeholder="Nome da marca"
                                value={name}
                                onChange={e => setName(e.target.value)}
                             />   
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