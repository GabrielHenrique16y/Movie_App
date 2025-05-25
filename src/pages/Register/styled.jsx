import styled from 'styled-components';
import * as colors from '../../config/colors';

export const RegisterContainer = styled.section`
    max-width: 530px;
    background-color: #fff;
    margin: 30px auto;
    padding: 30px;
    border-radius: 10px;
    width: 100%;
    height: max-content;

    h1 {
        color: #000;
        margin-bottom: 20px;
    }

    button {
        width: 30%;
    }
`;

export const Form = styled.form`
    margin-top: 20px;
    display: flex;
    flex-direction: column;

    label {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    input {
        height: 40px;
        font-size: 18px;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-top: 8px;

        &:hover {
            border: 1px solid ${colors.primaryColor};
        }
    }

    .warn-text {
        font-size: 12px;
        margin-top: 10px;
        color: #616161;
        font-weight: 700;
    }

    .password-container {
        position: relative;
    }

    .eyeIcon {
        position: absolute;
        top: 70%;
        right: 10px;
        transform: translateY(-50%);
    }

    .actived-icon {
        display: block;
    }

    a {
        margin-top: 10px;
        color: ${colors.primaryColor};
    }

    .toggle-container {
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        padding: 10px;
        border-radius: 5px;
        background: #f9f9f9;
        border: 1px solid #ddd;
    }

    @media (max-width: 450px) {
        button {
            width: 50%;
        }
    }
`;

export const SwitchContainer = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    margin-top: 10px;
    
    span {
        flex: 1;
    }

    .switch {
        position: relative;
        width: 50px;
        height: 26px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #bbb;
        border-radius: 34px;
        transition: 0.4s;
        box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 20px;
        width: 20px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    input:checked + .slider {
        background-color: ${colors.primaryColor};
        box-shadow: 0 0 6px ${colors.primaryColor};
    }

    input:checked + .slider:before {
        transform: translateX(24px);
        background-color: #fff;
    }
`;
