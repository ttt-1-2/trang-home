import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import TreeSvg from "../assets/home-tree.svg?react";
import Bulbon from "../assets/bulbon.png";

export default function Home() {
  const navigate = useNavigate();
  const [gust, setGust] = useState(false);

  const cards = [
    {
      id: "bitball",
      to: "/bitball",
      icon: <img src={Bulbon} alt="BitBall" />,
      hoverLabel: "BitBall",
      overlay: "#C97373",
    },
    {
      id: "p2",
      to: "#",
      hoverLabel: "coming\nsoon...",
      overlay: "#C97373",
    },
    {
      id: "p3",
      to: "#",
      hoverLabel: "coming\nsoon...",
      overlay: "#C97373",
    },
    {
      id: "p4",
      to: "#",
      hoverLabel: "coming\nsoon...",
      overlay: "#C97373",
    },
  ];

  const onGust = () => {
    setGust(true);
  };

  return (
    <Wrap>
      <TitleBlock>
        <Name>TRANG's</Name>
        <TaglineRow>
          <Tagline>아이디어의 숲</Tagline>

          <Dots aria-hidden="true">
            <Dot style={{ "--i": 0 }} />
            <Dot style={{ "--i": 1 }} />
            <Dot style={{ "--i": 2 }} />
          </Dots>
        </TaglineRow>
      </TitleBlock>

      <Tree
        onClick={onGust}
        className={gust ? "is-gust" : ""}
        onAnimationEnd={() => setGust(false)}
      >
        <TreeSvg />
      </Tree>

      <Cards>
        {cards.map((c) => (
          <Card
            key={c.id}
            type="button"
            onClick={() => c.to !== "#" && navigate(c.to)}
            aria-label={c.hoverLabel?.replace("\n", " ")}
            $overlay={c.overlay}
          >
            {c.icon && (
              <CardIcon className="cardBase" aria-hidden="true">
                {c.icon}
              </CardIcon>
            )}
            {!c.icon && c.hoverLabel && (
              <ComingText className="cardBase" aria-hidden="true">
                {c.hoverLabel}
              </ComingText>
            )}

            <CardHover
              className="cardHover"
              aria-hidden="true"
              $overlay={c.overlay}
            >
              <HoverLabel>{c.hoverLabel}</HoverLabel>
            </CardHover>
          </Card>
        ))}
      </Cards>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  background: #f1f1f1;
  padding: clamp(28px, 6vh, 72px) 24px 0;

  display: flex;
  flex-direction: column;
`;

const TitleBlock = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(5px, 1.5vw, 8px);
`;

const Name = styled.div`
  font-family: "Josefin Sans";
  font-weight: 700;
  font-size: 90px;
`;

const TaglineRow = styled.div`
  position: relative;
  display: inline-block;
  font-family: "Josefin Sans";
  font-weight: 700;
  font-size: 40px;
`;

const Tagline = styled.div`
  display: inline-block;
`;

const Dots = styled.div`
  position: absolute;
  left: 100%;
  top: 60%;
  display: inline-flex;
  align-items: center;
  gap: 20px;
  transform: translate(20px, -50%);
`;

const floatY = keyframes`
  0%   { transform: translateY(0) rotate(var(--r)); }
  10%  { transform: translateY(0) rotate(var(--r)); }    
  22%  { transform: translateY(-10px) rotate(var(--r)); } 
  34%  { transform: translateY(0) rotate(var(--r)); } 
  100% { transform: translateY(0) rotate(var(--r)); } 
`;

const Dot = styled.div`
  --r: 0deg;
  width: 14px;
  height: 14px;
  background: #5acf79;
  display: inline-block;

  animation: ${floatY} 1.8s linear 3;
  animation-delay: calc(var(--i) * 0.6s);
  animation-fill-mode: backwards;

  transform: translateY(0) rotate(var(--r));
  &:nth-child(1) {
    --r: 45deg;
  }
  &:nth-child(2) {
    --r: 18deg;
  }
  &:nth-child(3) {
    --r: 0deg;
  }
`;

const gust = keyframes`
  0%   { transform: rotate(0deg); }
  35%  { transform: rotate(10deg); } 
  60%  { transform: rotate(-4deg); }
  80%  { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
`;

const Tree = styled.div`
  display: block;
  width: fit-content;
  margin: 30px 41% 40px auto;

  &.is-gust {
    animation: ${gust} 450ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
  }
`;

const Cards = styled.div`
  margin: clamp(18px, 3vh, 28px) auto 0;
  display: grid;
  gap: clamp(14px, 3vw, 50px);

  grid-template-columns: repeat(4, 250px);
  justify-content: center;

  @media (max-width: 520px) {
    grid-template-columns: minmax(160px, 1fr);
  }
`;

const Card = styled.button`
  width: 250px;
  height: 200px;
  background: #d9d9d9;
  cursor: pointer;
  border: 0;
  position: relative;
  overflow: hidden;

  .cardBase {
    transition: opacity 160ms ease, transform 160ms ease;
  }

  .cardHover {
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 160ms ease, transform 160ms ease;
  }

  &:hover .cardHover,
  &:focus-visible .cardHover {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover .cardBase,
  &:focus-visible .cardBase {
    opacity: 0;
    transform: scale(0.98);
  }
`;

const CardIcon = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  z-index: 1;

  img {
    width: 150px;
    height: auto;
    object-fit: contain;
    display: block;
  }
`;

const ComingText = styled.div`
  position: absolute;
  white-space: pre-line;
  left: 2%;
  bottom: 2%;

  text-align: left;
  font-family: "Josefin Sans";
  font-weight: 700;
  font-size: 40px;
  z-index: 1;
`;

const CardHover = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: ${(p) => p.$overlay || "#C97373"};
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 160ms ease,
    transform 160ms ease;

  display: grid;
  place-items: center;
`;

const HoverLabel = styled.div`
  white-space: pre-line;
  text-align: center;

  font-family: "Josefin Sans";
  font-weight: 700;
  font-size: 44px;
  line-height: 0.95;
  color: #fff;
`;
