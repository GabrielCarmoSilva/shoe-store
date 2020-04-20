import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../services/api';

import logoImg from '../../assets/sneaker-2.png';

export default function Numbers() {
    const [numbers, setNumbers] = useState([]);

    const history = useHistory();

    const color_id = localStorage.getItem('color_id');

    useEffect(() => {
        api.get('numbers', {
            headers: {
                Authorization: color_id,
            }
        }).then(response => {
            setNumbers(response.data);
        });
    }, []);

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function getNumberId(id) {
        localStorage.setItem('number_id', id);

        history.push('/quant');
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
                    <button type="button" onClick={handleLogout} className="btn btn-dark">Sair</button>
                </div>
            </div>
            <div className="row">
                <div className="col-1" />
                <div className="col-2"><h1 className="title">Números</h1></div>
                <div className="col-9" />    
            </div>
            <br></br>
            <div className="container">
                {numbers.map(number => (
                    <div key={number.id} className="btn-group mr-2">
                        <a href="#" onClick={() => getNumberId(number.id)}>
                            <button type="button" className="btn btn-secondary">{number.number}</button>
                        </a>    
                    </div>
                ))}
                <Link to="/newnumber">
                    <button className="btn btn-danger">Cadastrar novo número</button>
                </Link>
            </div>
        </div>    
    );
}