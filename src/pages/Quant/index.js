import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../services/api';

import logoImg from '../../assets/sneaker-2.png';

export default function Quant() {
    const [numbers, setNumbers] = useState([]);

    const history = useHistory();
    
    const color_id = localStorage.getItem('color_id');
    const number_id = localStorage.getItem('number_id');

    useEffect(() => {
        api.get('/numbers/quant', {
            headers: {
                Authorization: number_id,
            }    
        }).then(response => {
            setNumbers(response.data);
        });
    }, []);

    async function handleIncrementQuant() {
        try {
            await api.post(`numbers/${number_id}/increment`);

            history.go();
        }
        catch (err) {
            alert('Erro ao incrementar. Tente novamente');
        }
    }

    async function handleDecrementQuant() {
        try {
            await api.post(`numbers/${number_id}/decrement`);

            history.go();
        } 
        catch (err) {
            alert('Erro ao decrementar. Tente novamente');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function getNumberId() {
        localStorage.setItem('number_id', number_id);

        history.push('/newquant');
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
                    <button onClick={handleLogout} type="button" className="btn btn-dark">Sair</button>
                </div>
            </div>
            <br></br>
            <div className="container quant-box border rounded border-secondary">
                <div className="row">
                    {numbers.map(number => (
                        <h1>{number.quant} pares disponíveis</h1>
                    ))}
                </div>
                <div className="row buttons">
                    <div className="btn-group mr-2">
                        <button onClick={handleDecrementQuant} type="button" className="btn btn-secondary crement-button">-</button>
                    </div>
                    <div>
                        <button onClick={getNumberId} className="btn btn-danger mr-2">Atualizar</button>
                    </div>
                    <div className="btn-group mr-2">
                        <button onClick={handleIncrementQuant} type="button" className="btn btn-secondary crement-button">+</button>
                    </div>
                </div>
            </div>
        </div>
    )
}