import React, { useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading'

import { LoginContainer, Form } from './styled';
import * as actions from '../../store/modules/Auth/actions';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
    const isLoading = useSelector((state) => state.Auth.isLoading)

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            toast.info('Você já está logado!');
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let formError = false;

        if (!isEmail(email)) {
            formError = true;
            toast.error('E-mail inválido');
        }

        if (password.length < 6 || password.length > 50) {
            formError = true;
            toast.error('Senha inválida');
        }

        if (formError) return;

        dispatch(actions.login_request({ email, password, navigate }));
    };

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

    return (
        <div style={{
            backgroundColor: '#f5f5f5', 
            minHeight: '100vh', 
            display: 'flex', 
            justifyContent: 'center'
        }}>
            <Loading isLoading={isLoading}/>
            <LoginContainer>
                <h1>Login</h1>
                <Form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        E-mail:
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Seu e-mail"
                        />
                    </label>
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
                    <button type="submit">Fazer login</button>
                    <Link to={'/register'}>Don't have an account? Sign Up</Link>
                </Form>
            </LoginContainer>
        </div>
    );
}
