import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

    .background{
        position: absolute;
        width: 100%;
        height: 100vh;
        z-index: 99;
        background: rgba(0, 0, 0, 0.8);
    }
    
    .loader {
        width: 40px;
        aspect-ratio: 1;
        position: relative;
        z-index: 100;
    }
    .loader:before,
    .loader:after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        margin: -8px 0 0 -8px;
        width: 16px;
        aspect-ratio: 1;
        background: ${colors.primaryDarkColor};
        animation:
            l2-1 2s  infinite,
            l2-2 1s infinite ;
    }
    .loader:after {
        background: ${colors.primaryColor};
        animation-delay: -1s,0s;
    }
    @keyframes l2-1 {
        0%   {top:0   ;left:0}
        25%  {top:100%;left:0}
        50%  {top:100%;left:100%}
        75%  {top:0   ;left:100%}
        100% {top:0   ;left:0}
    }
    @keyframes l2-2 {
        40%,50% {transform: rotate(0.25turn) scale(0.5)}
        100%    {transform: rotate(0.5turn) scale(1)}
    }
`;
