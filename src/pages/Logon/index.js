import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../services/api';

import logoImg from '../../assets/sneaker.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('session', { id });

            history.push('/sponsors');
        } catch(err) {
            alert('Falha no login, tente novamente');
        }
    }

    return (
        <div className="row">
            <Helmet>
                <style>{'body { background-color: #f2f2f2; }'}</style>
            </Helmet>
            <div className="col-sm-4" />
            <div className="col-sm-4">
                <div className="row">
                    <div className="col" />
                    <div className="col">
                        <img src={logoImg} alt="System Logo" />
                    </div>
                    <div className="col" />    
                </div>
                <div className="logon-container border rounded border-secondary">
                    <form onSubmit={handleLogin}>
                        <div className="row justify-content-center">
                            <h1 className="title">Faça seu login</h1>
                        </div>
                        <div className="row justify-content-center form-item">
                            <input 
                                className="form-control" 
                                placeholder="Sua ID" 
                                value={id}
                                onChange={e => setId(e.target.value)} />
                        </div>
                        <div className="row justify-content-center form-item">
                            <button className="btn btn-dark btn-text" type="submit">Entrar</button>
                        </div>
                        <br></br>
                        <Link to="/register">
                            Não tenho cadastro
                        </Link>
                    </form>
                </div>
            </div>
            <div className="col-sm-4" />
        </div>
    );
}