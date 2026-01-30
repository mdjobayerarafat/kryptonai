import React from 'react';
import styled from 'styled-components';

const CyberCube = () => {
  return (
    <StyledWrapper>
      <div className="my-loader">
        <div className="rubiks-cube">
          <div className="face front">
            <div style={{background: '#111111'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
            <div style={{background: '#999999'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
          </div>
          <div className="face back">
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
            <div style={{background: '#999999'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
          </div>
          <div className="face left">
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
            <div style={{background: '#999999'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
          </div>
          <div className="face right">
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
            <div style={{background: '#999999'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
          </div>
          <div className="face top">
            <div style={{background: '#666666'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#999999'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
          </div>
          <div className="face bottom">
            <div style={{background: '#999999'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
            <div style={{background: '#ffffff'}} className="cube" />
            <div style={{background: '#333333'}} className="cube" />
            <div style={{background: '#666666'}} className="cube" />
            <div style={{background: '#999999'}} className="cube" />
            <div style={{background: '#111111'}} className="cube" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .my-loader {
    width: 200px;
    height: 200px;
    perspective: 1000px;
    /* Removed fixed margin so parent can control positioning */
  }

  .rubiks-cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    animation: my-rotateCube 10s infinite linear;
  }

  .my-loader .face {
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
  }

  .my-loader .face.front {
    transform: translateZ(100px);
  }
  .my-loader .face.back {
    transform: rotateY(180deg) translateZ(100px);
  }
  .my-loader .face.left {
    transform: rotateY(-90deg) translateZ(100px);
  }
  .my-loader .face.right {
    transform: rotateY(90deg) translateZ(100px);
  }
  .my-loader .face.top {
    transform: rotateX(90deg) translateZ(100px);
  }
  .my-loader .face.bottom {
    transform: rotateX(-90deg) translateZ(100px);
  }

  .my-loader .cube {
    width: calc(100% / 3);
    height: calc(100% / 3);
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: background 0.3s ease;
  }
  
  .my-loader .cube:hover {
    background: #00ff00 !important; /* Cyber accent on hover */
    box-shadow: 0 0 10px #00ff00;
  }

  @keyframes my-rotateCube {
    0% {
      transform: rotateX(0deg) rotateY(0deg);
    }
    100% {
      transform: rotateX(360deg) rotateY(360deg);
    }
  }`;

export default CyberCube;
