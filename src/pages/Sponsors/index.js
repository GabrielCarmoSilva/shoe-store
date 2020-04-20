import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from '../../services/api';

import logoImg from '../../assets/sneaker-2.png';

export default function Sponsors() {
    const [sponsors, setSponsors] = useState([]);

    const history = useHistory();

    useEffect(() => {
        api.get('sponsors').then(response => {
            setSponsors(response.data);
        })
    }, []);

    async function handleDeleteSponsor(id) {
        try {
            await api.post('sponsors/delete', { id });

            setSponsors(sponsors.filter(sponsor => sponsor.id !== id));
        } catch(err) {
            alert('Erro ao deletar marca, tente novamente');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function getSponsorId(id, name) {
        localStorage.setItem('sponsor_id', id);

        history.push('/models');
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
                <div className="col-sm-5" />
                <div className="col-sm-3" />
                <div className="col-sm-1">
                    <button onClick={handleLogout} type="button" className="btn btn-dark">Sair</button>
                </div>   
            </div>
            <div className="row">
                <div className="col-1" />
                <h1 className="title">Marcas</h1>
            </div>
            <br></br>
            <ul className="list-group list-group-flush list-text">
                {sponsors.map(sponsor => (
                    <li key={sponsor.id} className="list-group-item item">
                        <a href="#" onClick={() => getSponsorId(sponsor.id)} className="item">{sponsor.name}</a>
                        <button 
                            onClick={() => handleDeleteSponsor(sponsor.id)} 
                            type="button" 
                            className="btn btn-list btn-dark">
                            Deletar</button>
                    </li>
                ))}  
                <li className="list-group-item item">
                    <Link to="/newsponsor">
                        <button className="btn btn-danger">Cadastrar nova marca</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
}