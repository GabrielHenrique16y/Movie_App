import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Tvcontent, ActorContent } from './styled';
import { IoStar } from 'react-icons/io5';
import { get } from 'lodash';

export default function ActorDetails() {
    const [actor, setActor] = useState(null);
    const [movieCredits, setMovieCredits] = useState([]);
    const [tvCredits, setTvCredits] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [visibleMovie, setVisibleMovie] = useState(8);
    const [visibleSerie, setVisibleSerie] = useState(8);

    async function redirectMovie(movie) {
        navigate(`/movie/${movie.id}`);
    }

    async function redirectSerie(serie) {
        navigate(`/serie/${serie.id}`);
    }

    const loadMoreMovies = () => {
        setVisibleMovie((prev) => prev + 8);
    };

    const loadMoreSeries = () => {
        setVisibleSerie((prev) => prev + 8);
    };

    useEffect(() => {
        async function fetchActorDetails() {
            try {
                const response = await axios.get(
                    `/person/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );
                setActor(response.data);

                const movieResponse = await axios.get(
                    `/person/${id}/movie_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );
                setMovieCredits(movieResponse.data.cast);

                const tvResponse = await axios.get(
                    `/person/${id}/tv_credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );
                setTvCredits(tvResponse.data.cast);
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (status === 400) {
                    errors.map((error) => toast.error(error));
                    history.push('/');
                }
            }
        }

        fetchActorDetails();
    }, [id]);

    if (!actor) return <p>Carregando...</p>;

    return (
        <>
            <ActorContent>
                <div className="img-content">
                    <img
                        src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                        alt={actor.name}
                    />
                </div>
                <div className="info-content">
                    <h1>{actor.name}</h1>
                    <p className="bio-text">
                        <strong>Biografia:</strong> {actor.biography}
                    </p>
                    <p>
                        <strong>Data de Nascimento:</strong> {actor.birthday}
                    </p>
                    <p>
                        <strong>Local de Nascimento:</strong>{' '}
                        {actor.place_of_birth}
                    </p>
                </div>
            </ActorContent>

            <Tvcontent>
                <h2>Filmes:</h2>

                <div className="movie-content">
                    {movieCredits.length > 0 ? (
                        movieCredits.slice(0, visibleMovie).map((movie) => (
                            <div
                                key={movie.id}
                                onClick={() => redirectMovie(movie)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                    alt=""
                                />
                                <span>
                                    {movie.vote_average.toFixed(2)}{' '}
                                    <IoStar color="yellow" />
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>O ator não participou de filmes conhecidos.</p>
                    )}
                    <div className="btn-load-more">
                        {visibleMovie < movieCredits.length && (
                            <button onClick={loadMoreMovies}>Load More</button>
                        )}
                    </div>
                </div>
                <h2>Séries:</h2>

                <div className="serie-content">
                    {tvCredits.length > 0 ? (
                        tvCredits.slice(0, visibleSerie).map((tvShow) => (
                            <div
                                key={tvShow.id}
                                onClick={() => redirectSerie(tvShow)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300/${tvShow.poster_path}`}
                                    alt=""
                                />
                                <span>
                                    {tvShow.vote_average.toFixed(2)}{' '}
                                    <IoStar color="yellow" />
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>O ator não participou de séries conhecidas.</p>
                    )}
                    <div className="btn-load-more">
                        {visibleSerie < tvCredits.length && (
                            <button onClick={loadMoreSeries}>Load More</button>
                        )}
                    </div>
                </div>
            </Tvcontent>
        </>
    );
}
