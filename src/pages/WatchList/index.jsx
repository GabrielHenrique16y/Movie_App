import React, { useEffect, useState } from 'react';
import axiosAuth from '../../services/axiosAuth';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { Container, List, ListItem, Title } from './styled';
import { useNavigate } from 'react-router-dom';
import { IoStar } from 'react-icons/io5';
import Loading from '../../components/Loading';

export default function WatchList() {
    const [databaseMovies, setDatabaseMovies] = useState([]);
    const [databaseSeries, setDatabaseSeries] = useState([]);
    const [movieImages, setMovieImages] = useState({});
    const [serieImages, setSerieImages] = useState({});
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            try {
                setIsLoading(true);
                const response = await axiosAuth.get('/movies/');
                const responseSerie = await axiosAuth.get('/series/');
                setIsLoading(false);
                setDatabaseMovies(response.data);
                setDatabaseSeries(responseSerie.data);
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (status === 400) {
                    errors.map((error) => toast.error(error));
                    history.push('/');
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
                history.push('/');
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
                history.push('/');
            }
        }
    };

    useEffect(() => {
        databaseMovies.forEach((movie) => {
            const movieId = movie.movie_id;
            if (movieId) {
                addMovie(movieId);
            } else {
                console.log('ID do filme ausente para:', movie);
            }
        });

        databaseSeries.forEach((serie) => {
            const serieId = serie.serie_id;
            if (serieId) {
                addSerie(serieId);
            } else {
                console.log('ID da série ausente para:', serie);
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
