import { useState } from "react";
import styled from "styled-components";
import bulbOn from "../../assets/bulbon.png";
import bulbOff from "../../assets/bulboff.png";

export default function BitBall() {
  const [bits, setBits] = useState(() => Array(16).fill(false));
  const [mode, setMode] = useState("unsigned");
  const [showHelp, setShowHelp] = useState(false);

  const toggleBit = (index) => {
    setBits((prev) => prev.map((b, i) => (i === index ? !b : b)));
  };

  const valueUnsigned = bits.reduce(
    (acc, bit, idx) => (bit ? acc + 2 ** (15 - idx) : acc),
    0
  );

  const valueSigned =
    bits[0] && valueUnsigned !== 0 ? valueUnsigned - 65536 : valueUnsigned;

  const binaryString = bits
    .map((b) => (b ? "1" : "0"))
    .join("")
    .replace(/(.{4})/g, "$1 ")
    .trim();

  const hexString = `0x${valueUnsigned.toString(16).toUpperCase().padStart(4, "0")}`;

  const decimalToShow = mode === "unsigned" ? valueUnsigned : valueSigned;

  return (
    <Screen>
      <HelpButton onClick={() => setShowHelp(true)}>?</HelpButton>
      {showHelp && (
        <HelpOverlay onClick={() => setShowHelp(false)}>
          <HelpCard onClick={(e) => e.stopPropagation()}>
            <HelpTitle>How to play</HelpTitle>
            <HelpText>
            {`• Click a bulb to toggle between 0 and 1
            • Each bulb represents a bit
            • The rightmost bulb is the LSB
            • Switch between signed/unsigned modes
            • Binary, Decimal and Hex update automatically`}
            </HelpText>

            <HelpHint>click anywhere to close</HelpHint>
          </HelpCard>
        </HelpOverlay>
      )}
      <HeaderBlock>
        <Title>bitball</Title>
        <BulbWrap>
          <BulbRow>
            {bits.map((isOn, idx) => (
              <BulbButton
                key={idx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleBit(idx);
                }}
                $isOn={isOn}
                aria-pressed={isOn}
                aria-label={`Bit ${15 - idx} ${isOn ? "on" : "off"}`}
              >
                <BulbImg
                  src={isOn ? bulbOn : bulbOff}
                  alt={isOn ? "Bulb on" : "Bulb off"}
                />
              </BulbButton>
            ))}
          </BulbRow>

          <LsbLabel> &larr; LSB </LsbLabel>
        </BulbWrap>
      </HeaderBlock>

      <DividerRow>{"* ".repeat(16)}</DividerRow>

      <ValuesPanel>
        <ValueRow>
          <ValueLabel>Binary </ValueLabel>
          <Colon>:</Colon>
          <ValueText>{binaryString}</ValueText>
        </ValueRow>
        <ValueRow>
          <ValueLabel>Decimal</ValueLabel>
          <Colon>:</Colon>
          <ValueText>{decimalToShow}</ValueText>
        </ValueRow>
        <ValueRow>
          <ValueLabel>Hexadecimal</ValueLabel>
          <Colon>:</Colon>
          <ValueText>{hexString}</ValueText>
        </ValueRow>
      </ValuesPanel>

      <ModeButtons>
        <ModeButton
          type="button"
          onClick={() => setMode("signed")}
          $active={mode === "signed"}
        >
          signed
        </ModeButton>
        <ModeButton
          type="button"
          onClick={() => setMode("unsigned")}
          $active={mode === "unsigned"}
        >
          unsigned
        </ModeButton>
      </ModeButtons>
    </Screen>
  );
}

const Screen = styled.div`
  min-height: 100vh;
  box-sizing: border-box;
  padding: 60px 24px 40px;
  background: #050607;
  color: #f5f5f5;
  font-family: "Press Start 2P";
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(46px, 7vw, 64px);
  letter-spacing: 0.06em;
  transform: translateX(12px);
  margin-bottom: 20px;

  text-transform: lowercase;
  color: #94f5ff;
  text-shadow:
    0 0 12px rgba(148, 245, 255, 0.7),
    0 0 40px rgba(0, 255, 247, 0.9);
`;

const BulbWrap = styled.div`
  position: relative;
  display: inline-block;
`;

const BulbRow = styled.div`
  display: grid;
  grid-template-columns: repeat(8, auto);
  grid-template-rows: repeat(2, auto);
  gap: 18px;
  align-items: center;
  justify-content: center;
`;

const BulbButton = styled.button`
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 999px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 80ms ease,
  &:active {
    transform: translateY(1px);
  }
`;

const BulbImg = styled.img`
  display: block;
  width: 60px;
  height: auto;

  @media (max-width: 600px) {
    width: 44px;
  }
`;

const LsbLabel = styled.div`
  position: absolute;
  left: 100%;
  margin-left: 18px;
  top: calc(50% + 42px);
  font-size: 18px;
  color: #f5f5f5;
  white-space: nowrap;
`;

const DividerRow = styled.div`
  font-size: 22px;
  letter-spacing: 0.12em;
`;

const ValuesPanel = styled.div`
  font-family: "Press Start 2P";
  font-size: 16px;
  line-height: 2.4;
  display: flex;
  flex-direction: column;
  gap: 24px;
  transform: translateX(65px);
`;

const ValueRow = styled.div`
  display: grid;
  grid-template-columns: 200px 60px auto;
  align-items: center;
`;

const ValueLabel = styled.span`
  text-align: left;
`;

const Colon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;    
`;

const ValueText = styled.span`
  font-family: "Press Start 2P";
  font-size: 16px;
  line-height: 1.8;
  letter-spacing: 0.08em;
`;

const ModeButtons = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 32px;
`;

const ModeButton = styled.button`
  width: 190px;
  height: 56px;
  padding: 0;
  border-radius: 0;
  border: 1px solid ${({ $active }) => ($active ? "#C6F6F6" : "#8bb0b3")};
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(to bottom right, #007d79 0%, #005a5a 50%, #002f3a 100%)"
      : "rgba(0, 45, 58, 0.6)"};
  color: #c6f6f6;
  text-transform: lowercase;
  font-size: 18px;
  letter-spacing: 0.12em;
  cursor: pointer;
  font-family: "Press Start 2P", monospace;

  text-shadow: ${({ $active }) =>
    $active
      ? "0 0 8px rgba(198, 246, 246, 0.8), 0 0 16px rgba(198, 246, 246, 0.6)"
      : "0 0 4px rgba(198, 246, 246, 0.4)"};

  box-shadow: ${({ $active }) =>
    $active
      ? "0 0 20px rgba(198, 246, 246, 0.6), 0 4px 12px rgba(0, 0, 0, 0.5)"
      : "0 2px 8px rgba(0, 0, 0, 0.3)"};

  transition:
    background 120ms ease,
    box-shadow 120ms ease,
    transform 120ms ease,
    border-color 120ms ease,
    text-shadow 120ms ease;

  &:hover {
    border-color: #c6f6f6;
    text-shadow:
      0 0 8px rgba(198, 246, 246, 0.8),
      0 0 16px rgba(198, 246, 246, 0.6);
    box-shadow:
      0 0 20px rgba(198, 246, 246, 0.6),
      0 4px 12px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: translateY(1px);
    box-shadow:
      0 0 12px rgba(198, 246, 246, 0.4),
      0 2px 6px rgba(0, 0, 0, 0.4);
  }
`;

const HelpButton = styled.button`
  position: absolute;
  top: 24px;
  left: 24px;

  width: 36px;
  height: 36px;
  border-radius: 50%;

  background: rgba(0, 45, 58, 0.8);
  border: 1px solid #94f5ff;
  color: #94f5ff;

  font-family: "Press Start 2P";
  font-size: 18px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 0 12px rgba(148, 245, 255, 0.4);

  &:hover {
    box-shadow: 0 0 18px rgba(148, 245, 255, 0.8);
  }
`;

const HelpOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const HelpCard = styled.div`
  background: #050607;
  border: 1px solid #94f5ff;
  padding: 28px 32px;
  width: 560px;

  box-shadow:
    0 0 24px rgba(148, 245, 255, 0.4);

  text-align: left;
`;

const HelpTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #94f5ff;
`;

const HelpText = styled.div`
  font-size: 12px;
  line-height: 3;
  color: #f5f5f5;
  white-space: pre-line;
`;

const HelpHint = styled.div`
  margin-top: 16px;
  font-size: 12px;
  opacity: 0.6;
  text-align: center;
`;
