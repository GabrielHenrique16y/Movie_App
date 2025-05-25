import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import * as actions from './actions';
import * as types from '../types';
import axiosAuth from '../../../services/axiosAuth';
import { get } from 'lodash';

function* loginRequest({ payload }) {
    try {
        const { email, password, navigate } = payload;

        axiosAuth.defaults.withCredentials = true;

        const response = yield call(
            axiosAuth.post,
            '/tokens',
            { email, password },
            { withCredentials: true },
        );

        if (response.status !== 200) {
            throw new Error('Usuário ou senha inválidos');
        }

        const { token, user } = response.data;
        Cookies.set('token', token, {
            expires: 7,
            secure: true,
            sameSite: 'Strict',
        });
        Cookies.set('user', JSON.stringify(user), {
            expires: 7,
            secure: true,
            sameSite: 'Strict',
        });

        yield put(actions.login_success());

        toast.success('Success');
        navigate('/');
    } catch (e) {
        console.error('Erro no login:', e.response?.data?.message || e.message);
        toast.error('Invalid user or password');
        yield put(actions.login_failure());
    }
}

function logout() {
    Cookies.remove('token');
    Cookies.remove('user');
    axiosAuth.defaults.headers.Authorization = undefined;
}

function persistRehydrate() {
    const token = Cookies.get('token');
    console.log('Persist Rehydrate rodando, token:', token);
    if (!token) return;
    axiosAuth.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
    const { nome, email, password, isPublic, navigate } = payload; // Renomeando 'public' para 'isPublic'

    const userCookie = Cookies.get('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const token = Cookies.get('token');

    try {
        const publicValue = isPublic ? 'TRUE' : 'FALSE'; 

        if (user?.id) {
            yield call(
                axiosAuth.put,
                '/users/update',
                {
                    name: nome,
                    email,
                    password: password || undefined,
                    public: publicValue,
                },
                {
                    withCredentials: true,
                },
            );
            toast.success('Perfil editado com sucesso!');
            Cookies.set('user', JSON.stringify({ ...user, nome, email }), {
                expires: 7,
                secure: true,
                sameSite: 'none',
            });

            yield put(actions.registerUpdatedSuccess());
            navigate('/');
        } else {
            yield call(axiosAuth.post, '/users/store', {
                name: nome,
                email,
                password: password || undefined,
                public: false,
            });
            toast.success('Conta criada com sucesso!');
            yield put(
                actions.registerCreatedSuccess({ nome, email, password }),
            );
            navigate('/login');
        }
    } catch (e) {
        const errors = get(e, 'response.data.errors') || 0;
        const status = get(e, 'response.status');

        if (status === 401) {
            toast.error(
                'Ocorreu um erro com seu login atual, faça login novamente para acessar a pagina.',
            );
            yield put(actions.login_failure());
            return navigate('/login');
        }

        if (errors?.length > 0) {
            errors.map((err) => toast.error(err));
            yield put(actions.registerFailure());
        }
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.LOGIN_FAILURE, logout),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
