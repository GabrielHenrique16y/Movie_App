import styled from 'styled-components';
import * as Colors from '../../config/colors';

export const CarouselContainer = styled.div`
    width: 100%;
    margin: 0 auto;
`;

export const CarouselItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 100%;
        height: 600px;
        object-fit: cover;

        @media (max-width: 1024px) {
            height: 450px;
        }

        @media (max-width: 768px) {
            height: 350px;
        }

        @media (max-width: 480px) {
            height: 250px;
        }
    }
`;

export const InputControll = styled.div`
    width: 100%;
    background-color: ${Colors.primaryColor};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;

    .search-content {
        max-width: 1000px;
        width: 90%;
        height: 50px;
        background: ${Colors.secondaryColor};
        border-radius: 30px;
        display: flex;
        align-items: center;
        padding: 0 20px;

        @media (max-width: 480px) {
            height: 45px;
            border-radius: 25px;
            padding: 0 15px;
        }
    }

    .search-input {
        flex: 1;
        font-size: 20px;
        background: transparent;
        border: none;
        color: #fff;
        outline: none;
        padding-left: 10px;

        @media (max-width: 768px) {
            font-size: 18px;
        }

        @media (max-width: 480px) {
            font-size: 16px;
        }
    }

    .icon-Search {
        color: #fff;
        font-size: 24px;

        @media (max-width: 480px) {
            font-size: 20px;
        }
    }
`;

export const Movies = styled.div`
    margin: 30px auto;
    padding-bottom: 5%;
    width: 100%;
    max-width: 1280px;

    h1 {
        margin-left: 20px;
        font-size: 24px;

        @media (max-width: 480px) {
            font-size: 20px;
            margin-left: 10px;
        }
    }

    .movieSection {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 20px;
        padding: 0 10px;
        justify-content: center;
    }

    .movieSection div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 0.2s ease-in-out;
        background: #222;
        border-radius: 10px;
        overflow: hidden;
        width: 100%;
        max-width: 250px;
        margin: 0 auto;
        position: relative; 

        span{
            position: absolute;
            top: 10px;
            left: 10px;
            color: #fff;
            font-size: 14px;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 5px;
            border-radius: 5px;
            opacity: 1; 
            transition: opacity 0.2s ease;
        }

        &:hover {
            transform: scale(1.05);

            span {
                opacity: 0.9;
            }
        }

        img {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }

        @media (max-width: 768px) {
            max-width: 200px;
        }

        @media (max-width: 480px) {
            max-width: 160px;
        }
    }
`;

export const MovieTypes = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;

    .buttons-type {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
    }

    .buttons-type label {
        background-color: #ddd;
        padding: 8px 15px;
        border-radius: 10px;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.3s;

        &:hover {
            background-color: #cfcfcf;
        }

        @media (max-width: 768px) {
            font-size: 12px;
            padding: 6px 12px;
        }
    }

    .buttons-type input[type='radio'] {
        display: none;
    }

    .buttons-type input[type='radio']:checked ~ label {
        background-color: ${Colors.primaryColor};
        color: #fff;
    }

    @media (max-width: 480px) {
        justify-content: center;
    }
`;
