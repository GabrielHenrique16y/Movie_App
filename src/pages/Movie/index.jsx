import React, { useEffect, useState } from 'react';
import { MovieInfo, Background, Actors } from './styled';
import axios from '../../services/axios';
import axiosAuth from '../../services/axiosAuth';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import Rating from '../../components/Rating';
import Gallery from '../../components/Carousel/index';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import { get } from 'lodash';

export default function Movie() {
    const [movie, setMovie] = useState({});
    const [imgs, setImgs] = useState({});
    const [videos, setVideo] = useState({});
    const { id } = useParams();
    const [actors, setActors] = useState({ cast: [] });
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();
    const [visible, setVisible] = useState(6);
    const isLoggedIn = useSelector((state) => state.Auth.isLoggedIn);
    const [isLoading, setIsLoading] = useState(false);
    const [exists, setExists] = useState(null);

    const loadMore = () => {
        setVisible((prev) => prev + 6);
    };

    useEffect(() => {
        async function getMovie() {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `/movie/${id}?append_to_response=videos,images&api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );

                const responseActors = await axios.get(
                    `/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );

                setMovie(response.data);
                setImgs(response.data.images);
                setVideo(response.data.videos);
                setActors(responseActors.data);

                if (response.data.images.backdrops.length > 0) {
                    setSelectedImage(
                        response.data.images.backdrops[0].file_path,
                    );
                }
                setIsLoading(false);
            } catch (error) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (status === 400) {
                    errors.map((error) => toast.error(error));
                    history.push('/');
                }
            }
        }

        getMovie();
    }, [id]);

    const formatRuntime = (minutes) => {
        if (!minutes) return 'N/A';
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}min`;
    };

    const formatDate = (release_date) => {
        if (!release_date) return 'N/A';
        const [year, week, day] = release_date.split('-');
        return `${day}/${week}/${year}`;
    };

    const redirectActor = (actor) => {
        const id = actor.id;

        navigate(`/actor/${id}`);
    };

    const WatchListBtn = async () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        try {
            setIsLoading(true);
            await axiosAuth.post(`/movies/store/`, {
                movie_id: id,
            });

            setIsLoading(true);
            toast.success('Successfully added to Watchlist');
            navigate('/watchList');
        } catch (e) {
            const errors = get(e, 'response.data.errors', []);
            const status = get(e, 'response.status', 0);
            if (status === 400) {
                errors.map((error) => toast.error(error));
                history.push('/');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const removeWatchListBtn = async () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        try {
            setIsLoading(true);
            await axiosAuth.delete(`/movies/delete/${id}`, {});
            setIsLoading(false);

            toast.success('Successfully removed to Watchlist');
            navigate('/watchList');
        } catch (e) {
            const errors = get(e, 'response.data.errors', []);
            const status = get(e, 'response.status', 0);
            if (status === 400) {
                errors.map((error) => toast.error(error));
                history.push('/');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setIsLoading(false);
            return;
        }

        async function checkMovie() {
            try {
                const response = await axiosAuth.get(`/movies/verify/${id}`, {
                    withCredentials: true,
                });
                setExists(response.data.exists);
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (status === 400) {
                    errors.map((error) => toast.error(error));
                    history.push('/');
                }
            } finally {
                setIsLoading(false);
            }
        }

        checkMovie();
    }, [id, isLoggedIn]);

    return (
        <>
            <Loading isLoading={isLoading} />
            {imgs.backdrops && imgs.backdrops.length > 0 && (
                <Background
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${imgs.backdrops[0].file_path})`,
                    }}
                >
                    <MovieInfo>
                        <div className="card-movie">
                            <div className="">
                                {imgs.posters && imgs.posters.length > 2 && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${imgs.posters[2].file_path}`}
                                        alt={movie.title}
                                    />
                                )}
                            </div>
                            <div className="infos-movie">
                                <h2 className="title">{movie.title}</h2>
                                <p className="overview">{movie.overview}</p>
                                <p className="genre-title">
                                    <strong>Genres</strong>:
                                </p>
                                <div className="genres">
                                    {movie.genres.map((genre) => (
                                        <p>{genre.name}</p>
                                    ))}
                                </div>
                                <p className="rating-title">
                                    <strong>IMDB Rating</strong>
                                </p>
                                <Rating rating={movie.vote_average} />
                                {movie.runtime && (
                                    <p className="duration">
                                        Duration: {formatRuntime(movie.runtime)}
                                    </p>
                                )}
                                <p className="release_date">
                                    Release date:{' '}
                                    {formatDate(movie.release_date)}
                                </p>
                                {isLoggedIn ? (
                                    exists !== null ? (
                                        exists ? (
                                            <button
                                                onClick={removeWatchListBtn}
                                                className="listBtn"
                                            >
                                                Remove to my Watchlist
                                            </button>
                                        ) : (
                                            <button
                                                onClick={WatchListBtn}
                                                className="listBtn"
                                            >
                                                Add to my Watchlist
                                            </button>
                                        )
                                    ) : (
                                        ''
                                    )
                                ) : (
                                    <button
                                        onClick={WatchListBtn}
                                        className="listBtn"
                                    >
                                        Add to my Watchlist
                                    </button>
                                )}
                            </div>
                        </div>
                    </MovieInfo>
                </Background>
            )}
            <Actors>
                <h1>Actors</h1>
                <div className="actors-content">
                    {actors.cast.slice(0, visible).map((actor) => (
                        <div
                            className="card-actor"
                            onClick={() => redirectActor(actor)}
                        >
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : 'https://via.placeholder.com/200x300?text=Sem+Imagem'
                                }
                                alt={actor.name}
                            />
                            <h4>{actor.name}</h4>
                            <h4>({actor.character})</h4>
                        </div>
                    ))}
                </div>
                <div className="btn-load-more">
                    {visible < actors.cast.length && (
                        <button onClick={loadMore}>Load More</button>
                    )}
                </div>
            </Actors>
            <Gallery
                images={imgs.backdrops || []}
                videos={videos.results || []}
            />
        </>
    );
}
