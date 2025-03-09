import styled from 'styled-components';
import * as Colors from '../../config/colors';

export const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f8f8f8;
    border-radius: 8px;
`;

// Título da lista
export const Title = styled.h2`
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    color: #333;
    margin-top: 30px;
`;

export const List = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    list-style: none;
    padding: 0;
    border-bottom: 1px solid ${Colors.primaryColor};
    padding-bottom: 30px;

    li{
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
    }
`;

export const ListItem = styled.li`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

export const MovieImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-bottom: 2px solid #ddd;
`;

export const NoImageText = styled.p`
    text-align: center;
    color: #888;
    padding: 20px;
    font-size: 1rem;
    font-style: italic;
`;
