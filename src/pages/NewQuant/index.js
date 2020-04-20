import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import logoImg from '../../assets/sneaker-2.png';

export default function NewQuant() {
    const [quant, setQuant] = useState(0);

    const number_id = localStorage.getItem('number_id');
    console.log(number_id);

    const history = useHistory();

    async function handleNewQuant(e) {
        e.preventDefault();

        try {
            await api.post(`numbers/${quant}/${number_id}/update`);

            alert('Quantidade alterada com sucesso');

            history.push('/quant');
        }
        catch (err) {
            alert('Erro ao atualizar quantidade');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="container-fluid">
            <Helmet>
                <style>{'body { background-color: #f7f7f7; } '}</style>
            </Helmet>
            <br></br>
            <div className="row">
                <div className="col-sm-1" />
                <div className="col-sm-2">
                    <img src={logoImg} alt="System Logo" />
                </div>
                <div className="col-sm-7" />
                <div className="col-sm-1">
                    <Link to="/quant">
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
                <h1>Atualizar quantidade de pares</h1>
                <form onSubmit={handleNewQuant}>
                    <div className="row">
                        <div className="col-sm-8">
                            <input
                                type="number" 
                                className="form-control" 
                                placeholder="Nova quantidade de pares"
                                value={quant}
                                onChange={e => setQuant(e.target.value)} />
                        </div>
                        <div className="col-sm-4">    
                            <button className="btn btn-dark btn-text" type="submit">Atualizar</button>
                        </div>    
                    </div>    
                </form>
            </div>
        </div>
    );
}