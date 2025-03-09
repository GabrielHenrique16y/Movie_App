import styled from 'styled-components';

export const Background = styled.div`
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }

    @media (max-width: 768px) {
        height: auto;
    }
`;

export const MovieInfo = styled.section`
    position: relative;
    z-index: 2;
    color: white;
    max-width: 1280px;
    width: 100%;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;

    .card-movie {
        background: rgba(0, 0, 0, 0.7);
        padding: 20px;
        border-radius: 10px;
        display: grid;
        grid-template-columns: 1fr 3.5fr;
        gap: 20px;
    }

    .img-movie {
        border-radius: 10px;
        width: 200px;
    }

    .infos-movie{
        margin-left: 30px;
        flex: 1;
    }

    .infos-movie .title{
        color: #ffc107;
        font-size: 32px;
    }

    .infos-movie .overview {
        margin-top: 10px;
        font-size: 14px;
    }

    .infos-movie .genre-title {
        margin-top: 10px;
    }

    .infos-movie .genres {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 10px;
    }

    .genres p {
        background-color: #ffc107;
        padding: 5px;
        border-radius: 10px;
        font-size: 14px;
    }

    .rating-title {
        margin-top: 20px;
    }

    .rating {
        display: flex;
        align-items: center;
        font-size: 24px;
        font-family: Arial, sans-serif;
    }

    .stars {
        position: relative;
        display: inline-block;
        color: #ccc;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        white-space: nowrap;
        color: gold;
    }

    .score {
        margin-left: 8px;
        font-weight: bold;
    }

    .duration {
        margin-top: 20px;
        font-size: 18px;
    }

    .release_date {
        margin-top: 20px;
        font-size: 18px;
    }

    .listBtn {
        margin-top: 20px;
    }

    @media (max-width: 1290px) {
        .card-movie{
            display: grid;
            grid-template-columns: 1fr 2.5fr;
        }
    }

    @media (max-width: 950px) {
        .card-movie{
            display: grid;
            grid-template-columns: 1fr 1.5fr;
        }
    }

    @media (max-width: 768px) {
        .card-movie {
            flex-direction: column;
            text-align: center;
        }

        .img-movie {
            width: 100%;
            max-width: 300px;
            margin-bottom: 20px;
        }

        .infos-movie {
            margin-left: 0;
        }

        .infos-movie .title {
            font-size: 24px;
        }

        .infos-movie .overview,
        .infos-movie .genre-title,
        .infos-movie .genres p {
            font-size: 14px;
        }
    }

    @media (max-width: 510px) {
        .card-movie{
            display: flex;
            align-items: center;
        }

        .rating{
            justify-content: center;
        }

        .genres{
            justify-content: center;
        }
    }

    @media (max-width: 350px) {
        .card-movie .img-movie img{
            width: 150px;
        }
    }

`;

export const Actors = styled.section`
    padding: 30px;

    .actors-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 30px;
    }

    .actors-content div {
        display: flex;
        background-color: #ccc;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        padding: 10px;
        border-radius: 10px;
    }

    .actors-content div img {
        width: 100%;
        border-radius: 10px;
    }

    .btn-load-more {
        grid-column: 1 / -1;
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    @media (max-width: 768px) {
        padding: 15px;

        .actors-content {
            grid-template-columns: 1fr 1fr;
        }
    }

    @media (max-width: 480px) {
        .actors-content {
            grid-template-columns: 1fr;
        }
    }
`;
