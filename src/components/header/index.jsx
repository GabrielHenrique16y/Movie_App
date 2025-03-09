import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as actions from '../../store/modules/Auth/actions';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';
import axios from '../../services/axiosAuth';
import Cookies from 'js-cookie';

import { NavBar } from './styled';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
    const userCookie = Cookies.get('user');

    const user = userCookie ? JSON.parse(userCookie) : null;

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(actions.login_failure());
        navigate('/login');
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const confirmButton = e.currentTarget.nextSibling;
        confirmButton.style.display = 'block';
        e.currentTarget.remove();
    };

    async function handleDeleteAccount(e) {
        e.preventDefault();
        try {
            await axios.delete('/users/', {
                token,
            });
            toast.success('Conta deletada com sucesso!');
            dispatch(actions.login_failure());
            navigate('/login');
        } catch (err) {
            const errors = get(err, 'response.data.errors', []);

            errors.map((error) => toast.error(error));
        }
    }

    return (
        <NavBar>
            <img src="tmdb_logo.png" alt="tmdb_logo" />
            <div className="center-content">
                <Link to={'/'}>Movies</Link>
                <Link to={'/series'}>Series</Link>
            </div>
            {isLoggedIn ? (
                <div className="right-content">
                    <div className="dropdown">
                        <button className="dropbtn">
                            <FaCaretDown />
                            {user?.nome}
                            <FaUserCircle size={24} />
                        </button>
                        <div className="dropdown-content">
                            <Link to="/watchList">Watch list</Link>
                            <Link to="/register">Edit Account</Link>
                            <Link to="/logout" onClick={handleLogout}>
                                Logout
                            </Link>
                            <Link to="/delete" onClick={handleDelete}>
                                delete account
                            </Link>
                            <Link
                                className="confirm-button"
                                to="/delete"
                                onClick={handleDeleteAccount}
                            >
                                Confirm
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="right-content">
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </div>
            )}
        </NavBar>
    );
}
