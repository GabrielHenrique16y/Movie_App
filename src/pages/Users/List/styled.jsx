import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    max-width: 1200px;
    background-color: #f9f9f9;
    margin: 20px auto;
    padding: 25px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

export const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    text-align: center;
    padding: 0 15px;

    h1 {
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
    }

    input {
        font-size: 16px;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-top: 10px;
        width: 100%;
        max-width: 450px;
        outline: none;
        height: 45px;
        background-color: #fff;
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

        &:focus {
            border-color: #aaa;
        }
    }
`;

export const UserContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
`;

export const Card = styled.div`
    width: 100%;
    max-width: 350px;
    background: #fff;
    border-radius: 12px;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);

    &:hover {
        box-shadow: 0px 6px 20px rgba(121, 121, 121, 0.3);
        transform: scale(1.02);
    }
`;

export const CardUserImg = styled.div`
    width: 90px;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 12px;
    background-color: #e0e0e0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
`;

export const CardUserInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    h2 {
        font-size: 18px;
        color: #151b32;
        font-weight: 600;
        margin-bottom: 6px;
    }

    h3 {
        font-size: 14px;
        color: #666;
        font-weight: 400;
    }
`;