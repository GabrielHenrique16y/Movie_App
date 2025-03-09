import styled from 'styled-components';
import * as Colors from '../../config/colors';

export const ActorContent = styled.div`
    display: flex;
    flex-direction: row;
    padding: 50px;
    border-bottom: 1px solid ${Colors.secondaryColor};
    align-items: center;
    text-align: left;

    .img-content{
        margin-right: 20px;
        max-width: 200px;
    }

    .img-content img {
        width: 100%;
        border-radius: 10px;
    }

    .info-content {
        flex: 1;
    }

    .info-content h1{
        color: gold;
        margin-bottom: 20px;
    }

    .info-content .bio-text{
        font-size: 18px;
        margin-bottom: 30px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 30px;

        .img-content{
            margin-bottom: 20px;
            margin-right: 0;
        }
    }
`;

export const Tvcontent = styled.div`
    h2{
        margin-top: 50px;
        margin-left: 20px;
        text-align: center;
    }

    .movie-content, .serie-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
        padding: 0 10px;
        justify-content: center;
        padding-bottom: 40px;
        border-bottom: 1px solid ${Colors.secondaryColor};
    }

    .movie-content div, .serie-content div {
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
    }

    .movie-content div img, .serie-content div img {
        width: 100%;
        border-radius: 10px;
    }

    .movie-content div span, .serie-content div span {
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

    .movie-content div:hover, .serie-content div:hover {
        transform: scale(1.05);
    }

    .btn-load-more {
        grid-column: 1 / -1;
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .btn-load-more button {
        padding: 10px 20px;
        border: none;
        background-color: ${Colors.secondaryColor};
        font-weight: bold;
        cursor: pointer;
        border-radius: 5px;
        width: 100%;
    }

    @media (max-width: 768px) {
        .movie-content, .serie-content {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
    }

    @media (max-width: 480px) {
        .movie-content, .serie-content {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
        }
    }
`;
