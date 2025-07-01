import React, { useEffect, useState } from "react";
import styled from "styled-components";

export const PickSplashWrapper = styled.div`
    height: 100%;
    width: 100%;
    transition: transform 0.7s cubic-bezier(.77,0,.18,1);
    will-change: transform;
    transform: ${({ entered, team }) =>
        entered
            ? "translateX(0)"
            : team === "blue"
                ? "translateX(-330px)"
                : "translateX(330px)"};
`;

export const ChampionPickSplash = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    transition: box-shadow 0.5s, background-color 0.5s, opacity 0.75s;
    border-width: 0px;
    overflow: hidden;

    ${({ active }) => active === true &&
    `   
        animation: pick-shadow 3s infinite;
        @keyframes pick-shadow {
            50% {box-shadow: 0 0 0 6px #fff, 0 0 40px 8px #fff;}
        }
    `}
`;

// Thêm styled cho nền động
const SplashBG = styled.div`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: ${({urlBG}) => `url(${urlBG})`};
    background-size: ${({blank}) => blank ? "15%" : "100%"};
    background-position: ${({blank}) => blank ? "50% 50%" : "20% 25%"};
    background-repeat: no-repeat;
    transition: transform 0.7s cubic-bezier(.77,0,.18,1);
    will-change: transform;
    z-index: 1;
    transform: ${({ entered, team }) =>
        entered
            ? "translateX(0)"
            : team === "blue"
                ? "translateX(-330px)"
                : "translateX(330px)"};
`;

export const ChampionName = styled.div`
    color: white;
    font: italic 100 15px 'Montserrat', sans-serif;
    position: absolute;
    left: 10px;
    top: 5%;
`;

export const PlayerName = styled.div`
    position: absolute;
    left: 10px;
    bottom: 10px;
    color: white;
    font-family: Vegan Abattoir;
    font-weight: 500;
    font-size: 15px;
    letter-spacing: 5px;
    text-transform: uppercase;
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
        width: 1px;
        background: rgba(255, 255, 255, .25);
        top: 0;
        bottom: 0;
    }

    & > ${PlayerName},${ChampionName} {
        ${({team}) => team === "blue" ?
        `
            right: 10px;
            text-align: right;
        ` :
        `
            left: 10px;
            text-align: left;
        `}
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

var roles = ["top", "jungle", "middle", "bottom", "utility"];

const PickComponent = ({ phase, champion, playerIGN, currentSlot, team, idx, slot }) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (champion !== "") {
      setEntered(false);
      // Delay để reset animation nếu pick lại
      setTimeout(() => setEntered(true), 30);
    } else {
      setEntered(false);
    }
  }, [champion]);

  var urlBG = champion === "" ? require(`../../../images/role-${roles[idx]}.png`).default : require(`../../../images/cache/11.21.1/champion/${champion.replace(/[^A-Z0-9]/ig, "")}_skins.jpg`).default;
  return (
    <Pick team={team} id={`"pick_${team}_${idx}"`} key={slot} phase={phase}>
      <ChampionPickSplash
        active={slot === currentSlot}
        id={`"pick_${team}_splash_${idx}"`}
        team={team}
      >
        <SplashBG
          urlBG={urlBG}
          blank={champion === ""}
          entered={champion !== "" && entered}
          team={team}
        />
      </ChampionPickSplash>
      <PlayerName className={"text-ign"} id={`"pick_${team}_ign_${idx}"`}>
        {playerIGN}
      </PlayerName>
    </Pick>
  );
};

export default PickComponent;