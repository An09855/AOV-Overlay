import styled from "styled-components";

export const Container = styled.div`
    width: 1920px;
    height: 1080px;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
`;
// bar infomation
export const BarContainer = styled.div`
    display: flex;
    height: 210px;
    width: 100%;
`;

export const TeamInfoContainer = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    color: #FFFFFF;
`;

export const TeamInitials = styled.div`
    font-family: AkiraExpanded;
    font-size: 65px;
    line-height: 65px;
    text-transform: uppercase;
`;

export const TeamName = styled.div`
    font: 600 12px "Montserrat", sans-serif;
    letter-spacing: 10px;
    text-transform: uppercase;
`;

export const Game = styled.div`
    font-size: 24px;
    height: 55px;
    text-align: center;
    margin-bottom: 5px;
    margin-top: 64px; // Tăng khoảng cách phía trên Game (phase_game)
`;
export const Round = styled.div`
    width: 100%; // Đảm bảo chiếm toàn bộ chiều ngang
    min-width: 400px; // Đặt chiều rộng tối thiểu lớn hơn 192px
    text-align: center;
    font-size: 40px;
`;

export const Timer = styled.div`
    font-size: 60px;
`;

export const TimerContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`

export const GameInfo = styled.div`
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
`;

export const PhaseInfoText = styled.div``;

export const Score = styled.div`
    height: 100px;
    width: 200px;
    color: #FFFFFF;
    font-size: 100px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    letter-spacing: 0;
`;

export const Blue = styled.div`
    width: 45%;
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > ${TeamInfoContainer} {
        margin-left: 40px;
    }
    
    & > ${Score} {
        margin-right: 50px;
    }
`;

export const Red = styled.div`
    width: 45%;
    height: inherit;
    direction: rtl;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > ${TeamInfoContainer} {
        margin-right: 40px;
    }

    & > ${Score} {
        margin-left: 50px;
    }
`;

export const Pick = styled.div`
    & {
        position: relative;
        width: 100%;
        flex: 1;
        transition: 2s;
    }

    &:after {
        content: "";
        position: absolute;
        height: 1px;
        background: rgba(255, 255, 255, .25);
        top: 100%;
        width: 450px;
        z-index: 1;
    }

     ${({phase}) => phase === 'three-big-two-small' ? (`
        &:nth-child(n+1) {
            flex: 3 1 0;
        }

        &:nth-child(n+4) {
            flex: 1 1 0;
        }
    `) : phase === 'three-small-two-big' && (`
        &:nth-child(n+1) {
            flex: 1 1 0;
        }

        &:nth-child(n+4) {
            flex: 3 1 0;
        }
    `)}
`;

export const ChampionPickSplash = styled.div`
    height: 100%;
    width: 100%;

    transition: background-color 0.5s ease, opacity 0.75s;

    border-width: 0px;

    ${({ blank }) => blank ? 
    `
        background-size: 15%;
        background-position: 50% 50%;
        background-repeat: no-repeat;
    `
    : 
    `
        background-size: 100%;
        background-position: 20% 25%;
    `}

    ${({ active }) => active === true &&
    `
        animation: pick-shadow 5s infinite;
        
        @keyframes pick-shadow {
            50% {box-shadow: inset 0 -150px 100px -100px rgb(219, 200, 93);}
        }
    `}
`;

export const ChampionName = styled.div`
    color: white;
    font-weight: 500;
    position: absolute;
    left: 10px;
    bottom: 35px;
`;

export const PlayerName = styled.div`
    color: white;
`;

export const PicksContainer = styled.div`
    position: absolute;
    top: 218px;
    ${({team}) => team === "blue" ? `left: 0;` : `right: 0;`}
    width: 321px;
    height: 704px;

    display: grid;
    grid-row-gap: 17.3px;


    ${({team}) => team === 'red' && (`
        ${Pick}:after {
            right: 0px;
        }   
    `)}
`;

export const BlueBansContainer = styled.div`
    overflow: hidden;
    position: absolute;
    top: 973px;
    width: 355px;
    height: 79px;
    display: flex;
    gap: 13px;
    align-items: center;
    justify-content: space-around;
    left: 91px;
`;

export const RedBansContainer = styled.div`
    overflow: hidden;
    position: absolute;
    top: 973px;
    width: 354px;
    height: 79px;
    display: flex;
    gap: 13px;
    align-items: center;
    justify-content: space-around;
    right: 91px;
    flex-direction: row-reverse;
`;

export const BanSymbol = styled.div`
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: 25%;
    background-position: 50% 50% !important;
    height: 100% !important;
    width: 100%;
`

export const ProgressBarContainer = styled.div`
  top : 126px;
  width: 1920px;
  height: 8px;
  background: rgba(255,255,255,0.15);
  overflow: hidden;
  position: relative;
`;

export const ProgressBarInner = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #FFFFFF, #FFFFFF);
  transition: width 1s linear;
  width: ${({percent}) => percent}%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;