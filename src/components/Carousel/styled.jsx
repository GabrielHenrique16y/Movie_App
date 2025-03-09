import styled from 'styled-components';
import * as Colors from '../../config/colors';

export const GalleryContainer = styled.div`
    text-align: center;
    padding: 20px;
    background-color: ${Colors.primaryColor};
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (max-width: 1240px){
        display: none;
    }
`;

export const MainImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin-bottom: 15px;
    margin-top: 20px;
    
    img {
        width: 100%;
        max-height: 400px;
        object-fit: cover;
        border-radius: 10px;
        transition: 0.3s ease-in-out;
    }
`;

export const Thumbnails = styled.div`
    justify-content: center;
    gap: 10px;
    padding: 10px;
    max-width: 900px;
    white-space: nowrap;
    scrollbar-width: thin;

    display: flex;
    overflow-x: auto; /* Permite rolagem horizontal */
    scrollbar-width: none; /* Para Firefox */
    
    /* Para Chrome, Safari e Edge */
    ::-webkit-scrollbar {
        display: none;
    }


    img {
        width: 80px;
        height: 50px;
        object-fit: cover;
        border-radius: 5px;
        cursor: pointer;
        transition: transform 0.3s, opacity 0.3s;
        opacity: 0.6;
    }

    img.active,
    img:hover {
        opacity: 1;
        transform: scale(1.1);
        border: 2px solid #fff;
    }
`;
