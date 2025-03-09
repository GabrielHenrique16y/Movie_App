import React, { useEffect, useState } from 'react';
import { MovieInfo, Background, Actors } from './styled';
import axios from '../../services/axios';
import axiosAuth from '../../services/axiosAuth';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '../../components/Rating';
import Gallery from '../../components/Carousel/index';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import Loading from '../../components/Loading';

export default function Serie() {
    const [serie, setSerie] = useState({});
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
        async function getSerie() {
            try {
                setIsLoading(true);

                const response = await axios.get(
                    `/tv/${id}?append_to_response=videos,images&api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );

                const responseActors = await axios.get(
                    `/tv/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );
                setIsLoading(false);

                setSerie(response.data);
                setImgs(response.data.images);
                setVideo(response.data.videos);
                setActors(responseActors.data);

                if (response.data.images.backdrops.length > 0) {
                    setSelectedImage(
                        response.data.images.backdrops[0].file_path,
                    );
                }
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (status === 400) {
                    errors.map((error) => toast.error(error));
                    history.push('/');
                }
            }
        }

        getSerie();
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
            await axiosAuth.post(`/series/store/`, {
                serie_id: id,
            });
            setIsLoading(false);

            toast.success('Successfully added to Watchlist');
            navigate('/watchList');
        } catch (e) {
            toast.error('error');
            console.log(e);
        }
    };

    const removeWatchListBtn = async () => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }

        try {
            setIsLoading(true);
            await axiosAuth.delete(`/series/delete/${id}`, {});
            setIsLoading(false);

            toast.success('Successfully removed to Watchlist');
            navigate('/watchList');
        } catch (e) {
const errors = get(e, 'response.data.errors', []);
            const status = get(e, 'response.status', 0);
            if (status === 400) {
                errors.map((error) => toast.error(error));
                history.push('/');
            }        }
    };

    useEffect(() => {
        if (!isLoggedIn) {
            setIsLoading(false);
            return;
        }

        async function checkMovie() {
            try {
                const response = await axiosAuth.get(`/series/verify/${id}`, {
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
                            <div className="img-movie">
                                {imgs.posters && imgs.posters.length > 0 && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w300${imgs.posters[2].file_path}`}
                                        alt={serie.title}
                                    />
                                )}
                            </div>
                            <div className="infos-movie">
                                <h2 className="title">{serie.name}</h2>
                                <p className="overview">{serie.overview}</p>
                                <p className="genre-title">
                                    <strong>Genres</strong>:
                                </p>
                                <div className="genres">
                                    {serie.genres.map((genre) => (
                                        <p>{genre.name}</p>
                                    ))}
                                </div>
                                <p className="rating-title">
                                    <strong>IMDB Rating</strong>
                                </p>
                                <Rating rating={serie.vote_average} />
                                {serie.runtime && (
                                    <p className="duration">
                                        Duration: {formatRuntime(serie.runtime)}
                                    </p>
                                )}
                                <p className="release_date">
                                    Release date:{' '}
                                    {formatDate(serie.first_air_date)}
                                </p>
                                <div className="number_of_seasons">
                                    Number of seasons: {serie.number_of_seasons}
                                </div>
                                <p className="number_of_episodes">
                                    Number of episodes:{' '}
                                    {serie.number_of_episodes}
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
