"use client";
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface SolutionCardProps {
  children: ReactNode;
  className?: string;
}

const SolutionCard = ({ children, className }: SolutionCardProps) => {
  return (
    <StyledWrapper className={className}>
      <div className="card-container">
        {children}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  height: 100%;

  .card-container {
    width: 100%;
    height: 100%;
    background: linear-gradient(#212121, #212121) padding-box,
                linear-gradient(145deg, transparent 35%,#e81cff, #40c9ff) border-box;
    border: 2px solid transparent;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 16px;
    transition: transform 0.3s ease;
  }
  
  .card-container:hover {
    transform: translateY(-5px);
  }
`;

export default SolutionCard;
