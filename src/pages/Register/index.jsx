import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';

import { RegisterContainer, Form } from './styled';
import * as actions from '../../store/modules/Auth/actions';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const id = user?.id || null;
    const nomeStored = user?.nome || '';
    const emailStored = user?.email || '';
    const isLoading = useSelector((state) => state.Auth.isLoading);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const togglePassword = () => {
        const passwordInput = document.getElementById('passwordInput');
        const eye = document.querySelector('.l1');
        const eyeSlash = document.querySelector('.l2');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eye.classList.remove('actived-icon');
            eyeSlash.classList.add('actived-icon');
        } else {
            passwordInput.type = 'password';
            eye.classList.add('actived-icon');
            eyeSlash.classList.remove('actived-icon');
        }
    };

    React.useEffect(() => {
        if (!id) return;

        setNome(nomeStored);
        setEmail(emailStored);
    }, [id, nomeStored, emailStored]);

    async function handleSubmit(e) {
        e.preventDefault();
        let formError = false;

        if (nome.length < 3 || nome.length > 255) {
            formError = true;
            toast.error('Nome deve ter entre 3 e 255 caracteres');
        }

        if (!isEmail(email)) {
            formError = true;
            toast.error('E-mail inválido');
        }

        if (!id && (password.length < 6 || password.length > 50)) {
            formError = true;
            toast.error('Senha deve ter entre 6 e 50 caracteres');
        }

        if (formError) return;

        dispatch(actions.registerRequest({ nome, email, password, navigate }));
    }

    return (
        <div style={{
            backgroundColor: '#f5f5f5', 
            minHeight: '100vh', 
            display: 'flex', 
            justifyContent: 'center'
        }}>
            <Loading isLoading={isLoading}/>
            <RegisterContainer>
                <h1>{id ? 'Editar perfil' : 'Cria conta'}</h1>
                <Form onSubmit={handleSubmit}>
                    <label htmlFor="nome">
                        Nome:
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Seu nome"
                        />
                    </label>
                    {id ? (
                        <label htmlFor="email">
                            E-mail:
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Seu e-mail"
                            />
                            <p className="warn-text">
                                aviso: se você alterar o email, terá que fazer
                                login novamente com o novo email
                            </p>
                        </label>
                    ) : (
                        <label htmlFor="email">
                            E-mail:
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Seu e-mail"
                            />
                        </label>
                    )}
                    <label className="password-container" htmlFor="Password">
                        Senha:
                        <input
                            type="password"
                            id="passwordInput"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Sua senha"
                        />
                        <FaEye
                            onClick={togglePassword}
                            className="eyeIcon l1 actived-icon"
                            cursor={'pointer'}
                            display={'inline'}
                        />
                        <FaEyeSlash
                            onClick={togglePassword}
                            className="eyeIcon l2"
                            cursor={'Pointer'}
                            display={'none'}
                        />
                    </label>
                    <button type="submit">
                        {id ? 'Editar conta' : 'Cria conta'}
                    </button>
                    {id ? (
                        ''
                    ) : (
                        <Link to={'/login'}>
                            Already have an account? Sign In
                        </Link>
                    )}
                </Form>
            </RegisterContainer>
        </div>
    );
}
