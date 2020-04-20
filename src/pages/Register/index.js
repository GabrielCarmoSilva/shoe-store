import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import logoImg from '../../assets/sneaker.png';

export default function Register() {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    
    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = ({
            name,
            cpf
        });

        try {
            const response = await api.post('users', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente');
        }    
    }

    return (
        <div className="row">
            <Helmet>
                <style>{'body { background-color: #f2f2f2; }'}</style>
            </Helmet>
            <div className="col-sm-3" />
            <div className="col-sm-6">
                <div className="row">
                    <div className="col" />
                    <div className="col">
                        <img src={logoImg} alt="System Logo" />
                    </div>
                    <div className="col" />
                </div>
                <div className="register-container border rounded border-secondary">
                    <form onSubmit={handleRegister}>
                        <div className="row justify-content-center">
                            <h1 className="title">Faça seu registro</h1>
                        </div>
                        <div className="row justify-content-center form-item">
                            <input 
                                className="form-control" 
                                value={name}
                                placeholder="Seu nome"
                                onChange={e => setName(e.target.value)}
                                />
                        </div>
                        <div className="row justify-content-center form-item">
                            <input 
                                className="form-control" 
                                value={cpf}
                                placeholder="Seu CPF"
                                onChange={e => setCpf(e.target.value)}
                                />
                        </div>
                        <div className="row justify-content-center form-item">
                            <button className="btn btn-dark btn-text" type="submit">Registrar</button>
                        </div>
                    </form>
                    <br></br>
                    <Link to="/">
                        Voltar para a tela de login
                    </Link>
                </div>
            <div className="col-sm-3" />
            </div>
        </div>
    )
}