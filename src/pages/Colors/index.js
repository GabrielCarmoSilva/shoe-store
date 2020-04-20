import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../services/api';

import logoImg from '../../assets/sneaker-2.png';

export default function Colors() {
    const [colors, setColors] = useState([]);

    const history = useHistory();

    const model_id = localStorage.getItem('model_id');

    useEffect(() => {
        api.get('colors', {
            headers: {
                Authorization: model_id,
            }
        }).then(response => {
            setColors(response.data);
        });
    }, []);

    async function handleDeleteColor(id) {
        try {
            await api.post('/colors/delete', { id });

            setColors(colors.filter(color => color.id !== id));
        } catch (err) {
            alert('Erro ao deletar. Tente novamente');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function getColorId(id) {
        localStorage.setItem('color_id', id);

        history.push('/numbers');
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
                        <button type="button" class="btn btn-danger">Voltar</button>
                    </Link>    
                </div>
                <div className="col-sm-1">
                    <button onClick={handleLogout} type="button" class="btn btn-dark">Sair</button>
                </div>   
            </div>
            <div className="row">
                <div className="col-1" />
                <div className="col-2"><h1 className="title">Cores</h1></div>
                <div className="col-9" />   
            </div>
            <br></br>
            <ul className="list-group list-group-flush list-text">
                {colors.map(color => (
                    <li key={color.id} className="list-group-item item">
                        <a href="#" onClick={() => getColorId(color.id)} className="item">{color.color_name}</a>
                        <button
                            onClick={() => handleDeleteColor(color.id)}
                            type="button"
                            className="btn btn-list btn-dark">
                            Deletar</button>
                    </li>  
                ))}
                <li className="list-group-item item">
                    <Link to="/newcolor">
                        <button className="btn btn-danger">Cadastrar nova cor</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}