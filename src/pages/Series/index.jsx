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

export default function Series() {
    const [series, setSeries] = useState([]);
    const [carousel, setCarousel] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('popular');
    const [title, setTitle] = useState('Popular Series');
    const navigate = useNavigate();

    const cineTypes = [
        {
            id: 'popular',
            label: 'Popular Series',
            value: 'popular',
        },
        { id: 'top-rated', label: 'Top Rated', value: 'top_rated' },
        {
            id: 'airing_today',
            label: 'Airing today',
            value: 'airing_today',
        },
        { id: 'on_the_air', label: 'On the air', value: 'on_the_air' },
    ];

    useEffect(() => {
        async function getPopularSeries() {
            try {
                const response = await axios.get(
                    `/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                );
                setSeries(response.data.results);
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

        getPopularSeries();
    }, []);

    async function redirectSerie(serie) {
        navigate(`/serie/${serie.id}`);
    }

    useEffect(() => {
        async function fetchMovies() {
            if (search.trim() === '') {
                try {
                    const response = await axios.get(
                        `/tv/${selectedType}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`,
                    );
                    setSeries(response.data.results);
                    setTitle(
                        selectedType === 'popular'
                            ? 'Popular Movies'
                            : selectedType === 'top_rated'
                              ? 'Top Rated'
                              : selectedType === 'airing_today'
                                ? 'Airing today'
                                : 'On the air',
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
                const response = await axios.get(
                    `/search/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${search}`,
                );
                setSeries(response.data.results);
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
                            onClick={() => redirectSerie(carouselItem)}
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
                    {series.length > 0 ? (
                        series.map((serie) => (
                            <div
                                key={serie.id}
                                onClick={() => redirectSerie(serie)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300${serie.poster_path}`}
                                    alt={serie.title}
                                />
                                <span>
                                    {serie.vote_average.toFixed(2)}{' '}
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
