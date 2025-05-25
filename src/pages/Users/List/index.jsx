import React, { useEffect, useState } from 'react';
import axiosAuth from '../../../services/axiosAuth';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import {
    Container,
    TextContainer,
    UserContainer,
    Card,
    CardUserImg,
    CardUserInfo,
} from './styled';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function List() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function getData() {
            try {
                const response = await axiosAuth.get('/users/publicUser');
                const data = response.data;
                const usersArray = Array.isArray(data) ? data : [data];
                setUsers(usersArray);
                setFilteredUsers(usersArray);
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (status === 400) {
                    errors.forEach((error) => toast.error(error));
                    navigate('/');
                }
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    function handleSearch(event) {
        const value = event.target.value.toLowerCase();
        setSearch(value);
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(value),
        );
        setFilteredUsers(filtered);
    }

    function redirectWatch(user) {
        navigate(`/watchList/${user.name}`);
    }

    return (
        <Container>
            <TextContainer>
                <h1>Lista de Usuários</h1>
                <input
                    type="text"
                    placeholder="Buscar usuários..."
                    value={search}
                    onChange={handleSearch}
                />
            </TextContainer>

            {loading ? (
                <p>Carregando usuários...</p>
            ) : filteredUsers.length === 0 ? (
                <p>Nenhum usuário encontrado.</p>
            ) : (
                <UserContainer>
                    {filteredUsers.map((user) => (
                        <Card onClick={() => redirectWatch(user)} key={user.id}>
                            <CardUserImg>
                                {user.UrlFoto ? (
                                    <img src={user.UrlFoto} alt="User" />
                                ) : (
                                    <FaUserCircle size={80} color="#ccc" />
                                )}
                            </CardUserImg>
                            <CardUserInfo>
                                <h2>{user.name}</h2>
                                <h3>{user.email}</h3>
                            </CardUserInfo>
                        </Card>
                    ))}
                </UserContainer>
            )}
        </Container>
    );
}
