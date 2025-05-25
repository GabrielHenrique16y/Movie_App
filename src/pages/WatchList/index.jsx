import React, { useEffect, useState } from 'react';
import axiosAuth from '../../services/axiosAuth';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { Container, List, ListItem, Title } from './styled';
import { useNavigate, useParams } from 'react-router-dom';
import { IoStar } from 'react-icons/io5';
import Loading from '../../components/Loading';
import Cookies from 'js-cookie';
import { get } from 'lodash';

export default function WatchList() {
    const [databaseMovies, setDatabaseMovies] = useState([]);
    const [databaseSeries, setDatabaseSeries] = useState([]);
    const [movieImages, setMovieImages] = useState({});
    const [serieImages, setSerieImages] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const userCookie = Cookies.get('user');

    const user = userCookie ? JSON.parse(userCookie) : null;
    const { name } = useParams();

    useEffect(() => {
        const getData = async () => {
            try {
                if (!name) {
                    setIsLoading(true);
                    const responseMovie = await axiosAuth.get(
                        `/movies/${user.id}`,
                    );
                    const responseSerie = await axiosAuth.get(
                        `/series/${user.id}`,
                    );
                    setIsLoading(false);
                    setDatabaseMovies(responseMovie.data);
                    setDatabaseSeries(responseSerie.data);
                } else {
                    setIsLoading(true);
                    const responseUser = await axiosAuth.get(
                        `users/searchByName/${name}`,
                    );
                    const isPublic = await axiosAuth.get(
                        `users/isPublicUser/${responseUser.data.id}`,
                    );
                    setIsLoading(false);
                    if (isPublic.data) {
                        setIsLoading(true);
                        const responseMovie = await axiosAuth.get(
                            `/movies/${responseUser.data.id}`,
                        );
                        const responseSerie = await axiosAuth.get(
                            `/series/${responseUser.data.id}`,
                        );
                        setIsLoading(false);
                        setDatabaseMovies(responseMovie.data);
                        setDatabaseSeries(responseSerie.data);
                    } else {
                        toast.error('O usuário não existe ou está privado');
                        navigate('/');
                    }
                }
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (status === 400) {
                    errors.map((error) => toast.error(error));
                    navigate('/');
                }
            }
        };

        getData();
    }, []);

    const addMovie = async (movieId) => {
        try {
            if (!movieId) {
                throw new Error('ID do filme não fornecido');
            }

            const response = await axios.get(
                `/movie/${movieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
            );

            const movie = response.data;

            if (movie.poster_path) {
                setMovieImages((prevImages) => ({
                    ...prevImages,
                    [movieId]: movie.poster_path,
                }));
            }

            setDatabaseMovies((prevMovies) =>
                prevMovies.map((prevMovie) =>
                    prevMovie.movie_id === movieId
                        ? { ...prevMovie, vote_average: movie.vote_average }
                        : prevMovie,
                ),
            );
        } catch (e) {
            const errors = get(e, 'response.data.errors', []);
            const status = get(e, 'response.status', 0);
            if (status === 400) {
                errors.map((error) => toast.error(error));
                navigate('/');
            }
        }
    };

    const addSerie = async (serieId) => {
        try {
            if (!serieId) {
                throw new Error('ID da série não fornecido');
            }
            const response = await axios.get(
                `/tv/${serieId}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
            );

            const serie = response.data;

            if (serie.poster_path) {
                setSerieImages((prevImages) => ({
                    ...prevImages,
                    [serieId]: serie.poster_path,
                }));
            }

            setDatabaseSeries((prevSeries) =>
                prevSeries.map((prevSerie) =>
                    prevSerie.serie_id === serieId
                        ? { ...prevSerie, vote_average: serie.vote_average }
                        : prevSerie,
                ),
            );
        } catch (e) {
            const errors = get(e, 'response.data.errors', []);
            const status = get(e, 'response.status', 0);
            if (status === 400) {
                errors.map((error) => toast.error(error));
                navigate('/');
            }
        }
    };

    useEffect(() => {
        databaseMovies.forEach((movie) => {
            if (movie.movie_id && !movieImages[movie.movie_id]) {
                addMovie(movie.movie_id);
            }
        });

        databaseSeries.forEach((serie) => {
            if (serie.serie_id && !serieImages[serie.serie_id]) {
                addSerie(serie.serie_id);
            }
        });
    }, [databaseMovies, databaseSeries]);

    async function redirectMovie(movie) {
        navigate(`/movie/${movie.movie_id}`);
    }

    async function redirectSerie(serie) {
        navigate(`/serie/${serie.serie_id}`);
    }

    return (
        <Container>
            <Loading isLoading={isLoading} />
            <Title>Movie List</Title>
            <List>
                {databaseMovies.length > 0 ? (
                    databaseMovies.map((movie) => (
                        <ListItem
                            key={movie.movie_id}
                            onClick={() => redirectMovie(movie)}
                        >
                            {movieImages[movie.movie_id] ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movieImages[movie.movie_id]}`}
                                    alt={movie.title}
                                />
                            ) : (
                                <p>Imagem não disponível</p>
                            )}
                            <span>
                                {movie.vote_average
                                    ? movie.vote_average.toFixed(2)
                                    : 'N/A'}{' '}
                                <IoStar color="yellow" />
                            </span>
                        </ListItem>
                    ))
                ) : (
                    <p>Nenhum filme encontrado</p>
                )}
            </List>

            <Title>Series List</Title>
            <List>
                {databaseSeries.length > 0 ? (
                    databaseSeries.map((serie) => (
                        <ListItem
                            key={serie.serie_id}
                            onClick={() => redirectSerie(serie)}
                        >
                            {serieImages[serie.serie_id] ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${serieImages[serie.serie_id]}`}
                                    alt={serie.name}
                                />
                            ) : (
                                <p>Imagem não disponível</p>
                            )}
                            <span>
                                {serie.vote_average
                                    ? serie.vote_average.toFixed(2)
                                    : 'N/A'}{' '}
                                <IoStar color="yellow" />
                            </span>
                        </ListItem>
                    ))
                ) : (
                    <p>Nenhuma série encontrada</p>
                )}
            </List>
        </Container>
    );
}
