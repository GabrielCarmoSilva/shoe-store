import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import logoImg from '../../assets/sneaker-2.png';

import api from '../../services/api';

export default function NewColor() {
    const [color_name, setColorName] = useState('');

    const model_id = localStorage.getItem('model_id');

    const history = useHistory();

    async function handleNewColor(e) {
        e.preventDefault();

        const data = ({ model_id, color_name });

        try {
            const response = await api.post('colors', data);

            alert('Cor cadastrada com sucesso.');

            history.push('/colors');
        }
        catch (err) {
            alert('Não foi possível cadastrar a cor. Tente novamente');
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
                    <Link to="/colors">
                        <button type="button" className="btn btn-danger">Voltar</button>
                    </Link>
                </div>
                <div className="col-sm-1">
                    <button onClick={handleLogout} type="button" className="btn btn-dark">Sair</button>
                </div>
            </div>
            <div className="container quant-box border rounded border-secondary">
                <h1>Cadastrar nova cor</h1>
                <form onSubmit={handleNewColor}>
                    <div className="row">
                        <div className="col-sm-8">
                            <input 
                                className="form-control" 
                                placeholder="Nome da cor"
                                value={color_name}
                                onChange={e => setColorName(e.target.value)} />
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