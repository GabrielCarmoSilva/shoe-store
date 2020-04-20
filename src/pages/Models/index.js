import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../services/api';

import logoImg from '../../assets/sneaker-2.png';

export default function Models() {
    const [models, setModels] = useState([]);

    const history = useHistory();

    const sponsor_id = localStorage.getItem('sponsor_id');

    useEffect(() => {
        api.get('models', {
            headers: {
                Authorization: sponsor_id,
            }
        }).then(response => {
            setModels(response.data);
        });
    }, []);

    async function handleDeleteModel(id) {
        try {
            await api.post('/models/delete', { id });

            setModels(models.filter(model => model.id !== id));
        } catch (err) {
            alert('Erro ao deletar. Tente novamente');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function getModelId(id) {
        localStorage.setItem('model_id', id);

        history.push('/colors');
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
            <div className="row">
                <div className="col-1" />
                <div className="col-2"><h1 className="title">Modelos</h1></div>
                <div className="col-9" /> 
            </div>
            <br></br>
            <ul className="list-group list-group-flush list-text">
                {models.map(model => (
                    <li key={model.id} className="list-group-item item">
                        <a href="#" onClick={() => getModelId(model.id)} className="item">{model.name}</a>
                        <button
                            onClick={() => handleDeleteModel(model.id)}
                            type="button"
                            className="btn btn-list btn-dark">
                                Deletar</button>
                    </li>
                ))}
                <li className="list-group-item item">
                    <Link to="/newmodel">
                        <button className="btn btn-danger">Cadastrar novo modelo</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}