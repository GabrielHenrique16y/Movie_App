import React, { useEffect, useState } from 'react';
import axios from '../../services/axios';
import {
    CarouselContainer,
    CarouselItem,
    InputControll,
    Movies,
    MovieTypes,
} from './styled';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BiSearch } from 'react-icons/bi';
import { IoStar } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { get } from 'lodash';

export default function Home() {
    const [movies, setMovies] = useState([]);
    const [carousel, setCarousel] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('popular');
    const [title, setTitle] = useState('Popular Movies');
    const navigate = useNavigate();

    const cineTypes = [
        {
            id: 'popular',
            label: 'Popular Movies',
            value: 'popular',
        },
        { id: 'top-rated', label: 'Top Rated', value: 'top_rated' },
        {
            id: 'now-playing',
            label: 'Now Playing',
            value: 'now_playing',
        },
        { id: 'upcoming', label: 'Upcoming', value: 'upcoming' },
    ];

    useEffect(() => {
        async function getPopularMovies() {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );
                setIsLoading(false);
                setMovies(response.data.results);
                setCarousel(response.data.results);
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (status === 400) {
                    errors.map((error) => toast.error(error));
                    history.push('/');
                }
            }
        }

        getPopularMovies();
    }, []);

    async function redirectMovie(movie) {
        navigate(`movie/${movie.id}`);
    }

    useEffect(() => {
        async function fetchMovies() {
            if (search.trim() === '') {
                try {
                    setIsLoading(true);
                    const response = await axios.get(
                        `/movie/${selectedType}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                    );
                    setIsLoading(false);
                    setMovies(response.data.results);
                    setTitle(
                        selectedType === 'popular'
                            ? 'Popular Movies'
                            : selectedType === 'top_rated'
                              ? 'Top Rated'
                              : selectedType === 'now_playing'
                                ? 'Now Playing'
                                : 'Upcoming',
                    );
                } catch (e) {
                    const errors = get(e, 'response.data.errors', []);
                    const status = get(e, 'response.status', 0);
                    if (status === 400) {
                        errors.map((error) => toast.error(error));
                        history.push('/');
                    }
                }
                return;
            }

            try {
                setIsLoading(true);
                const response = await axios.get(
                    `/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${search}`,
                );
                setIsLoading(false);
                setMovies(response.data.results);
                setTitle(`Resultados para '${search}'`);
            } catch (e) {
                const errors = get(e, 'response.data.errors', []);
                const status = get(e, 'response.status', 0);
                if (status === 400) {
                    errors.map((error) => toast.error(error));
                    history.push('/');
                }
            }
        }

        fetchMovies();
    }, [search, selectedType]);

    const handleRadioChange = (event) => {
        setSelectedType(event.target.value);
        setSearch('');
    };

    return (
        <>
            <CarouselContainer>
                <Loading isLoading={isLoading} />
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay={true}
                    autoPlaySpeed={2000}
                    infinite={true}
                    draggable
                    keyBoardControl
                    pauseOnHover
                    responsive={{
                        desktop: {
                            breakpoint: { max: 3000, min: 0 },
                            items: 1,
                        },
                        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
                        tablet: { breakpoint: { max: 1024, min: 0 }, items: 1 },
                    }}
                    showDots={false}
                    swipeable
                >
                    {carousel.slice(0, 5).map((carouselItem) => (
                        <CarouselItem
                            key={carouselItem.id}
                            onClick={() => redirectMovie(carouselItem)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w1280${carouselItem.backdrop_path}`}
                                alt={carouselItem.title}
                            />
                        </CarouselItem>
                    ))}
                </Carousel>
            </CarouselContainer>

            <InputControll>
                <div className="search-content">
                    <BiSearch className="icon-Search" size={32} />
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </InputControll>

            <Movies>
                <MovieTypes>
                    {cineTypes.map((item) => (
                        <div key={item.id} className="buttons-type">
                            <input
                                type="radio"
                                name="types"
                                id={item.id}
                                value={item.value}
                                checked={selectedType === item.value}
                                onChange={handleRadioChange}
                            />
                            <label htmlFor={item.id}>{item.label}</label>
                        </div>
                    ))}
                </MovieTypes>
                <h1>{title}</h1>
                <div className="movieSection">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <div
                                key={movie.id}
                                onClick={() => redirectMovie(movie)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <span>
                                    {movie.vote_average.toFixed(2)}{' '}
                                    <IoStar color="yellow" />
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum filme encontrado</p>
                    )}
                </div>
            </Movies>
        </>
    );
}
