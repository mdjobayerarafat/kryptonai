"use client";
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: CardProps) => {
  return (
    <StyledWrapper className={className}>
      <div className="neumorphic-card">
        {children}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  height: 100%;
  
  .neumorphic-card {
   width: 100%;
   height: 100%;
   min-height: 254px;
   border-radius: 30px;
   background: #212121;
   box-shadow: 8px 8px 16px rgb(25, 25, 25),
               -8px -8px 16px rgb(60, 60, 60);
   padding: 2.5rem;
   display: flex;
   flex-direction: column;
   transition: transform 0.3s ease;
  }
  
  .neumorphic-card:hover {
    transform: translateY(-5px);
  }
`;

export default Card;
