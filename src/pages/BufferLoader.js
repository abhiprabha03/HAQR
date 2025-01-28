import React from 'react';
import styled from 'styled-components';

const BufferLoader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <img src="/logo.png" alt="Logo" className="static-logo" />
        <div className="circular-loader"></div>
      </div>
    </StyledWrapper>
  );
};

export const LoadingOverlay = ({ isLoading, children }) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      {children && <div className="opacity-20">{children}</div>}
      <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
        <BufferLoader />
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: 120px;
    height: 120px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .static-logo {
    width: 100px;
    height: 100px;
    object-fit: contain;
    position: absolute;
    z-index: 1;
  }

  .circular-loader {
    width: 100%;
    height: 100%;
    border: 4px solid rgba(0, 0, 255, 0.1);
    border-top: 4px solid rgba(0, 0, 255, 0.5);
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
    position: absolute;
    z-index: 0;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default BufferLoader;
