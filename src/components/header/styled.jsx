import styled from 'styled-components';

import { primaryColor } from '../../config/colors';

export const NavBar = styled.nav`
    padding: 20px;
    background-color: ${primaryColor};
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    a{
        color: #FFF;
        margin-right: 10px;
        font-weight: bold;
    }

    img{
        cursor: pointer;
    }

    .center-content{
        text-align: center;
        gap: 30px;
    }

    .dropdown {
        float: left;
        overflow: hidden;
        margin-right: 10px;
    }

    .dropdown .dropbtn {
        font-size: 16px;  
        border: none;
        outline: none;
        color: white;
        padding: 14px 16px;
        background-color: inherit;
        font-family: inherit;
        margin: 0;
        display: flex;
        align-items: center;
    }

    .dropdown .dropbtn svg{
        margin-right: 5px;
    }

    .dropdown .dropbtn svg + svg{
        margin-left: 10px;
    }

    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-content a {
        float: none;
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        text-align: left;
    }

    .dropdown-content a:hover {
        background-color: #ddd;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown .dropdown-content .confirm-button{
        display: none;
    }

    @media (max-width: 425px){
        img{
            display: none;
        }
    }
`;
