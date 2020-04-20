import React, { useState} from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import logoImg from '../../assets/sneaker-2.png';

import api from '../../services/api';

export default function NewNumber() {
    const [number, setNumber] = useState('');
    const [quant, setQuant] = useState('');

    const color_id = localStorage.getItem('color_id');

    const history = useHistory();

    async function handleNewNumber(e) {
        e.preventDefault();

        const data = ({ color_id, number, quant });

        try {
            const response = api.post('numbers', data);

            alert('Número cadastrado com sucesso.');

            history.push('/numbers');
        } catch (err) {
            alert('Não foi possível cadastrar o número. Tente novamente');
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
                    <Link to="/numbers">
                        <button type="button" className="btn btn-danger">Voltar</button>
                    </Link>
                </div>
                <div className="col-sm-1">
                    <button onChange={handleLogout} type="button" className="btn btn-dark">Sair</button>
                </div>
            </div>
            <div className="container quant-box border rounded border-secondary">
                <h1>Cadastrar novo número</h1>
                <form onSubmit={handleNewNumber}>
                    <div className="row">
                        <div className="col-sm-2">
                            <input 
                                type="number" 
                                className="form-control" 
                                placeholder="Número"
                                value={number}
                                onChange={e => setNumber(e.target.value)}></input>
                        </div>
                        <div className="col-sm-4">
                            <input 
                                className="form-control" 
                                placeholder="Informe a quantidade de pares"
                                value={quant}
                                onChange={e => setQuant(e.target.value)}>
                            </input>
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