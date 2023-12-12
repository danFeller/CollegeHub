import { Fragment } from "react";
import "./Overlay.css";
import styled from 'styled-components';

const OverlayBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  cursor: pointer;
  z-index: 9;
`
const OverlayContainer = styled.div`
  background-color: white;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 10;
  padding: 30px;
  border-radius: 15px;
  width: fit-content;
  height: fit-content;
`
const OverlayControls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
export function Overlay({ isOpen, onClose, children }) {
  return (
    <Fragment>
      {isOpen && (
        <div className="overlay">
          <OverlayBackground onClick={onClose} />
          <OverlayContainer>
            <OverlayControls>
              <button
                className="overlay__close"
                type="button"
                onClick={onClose}
              />
            </OverlayControls>
            {children}
          </OverlayContainer>
        </div>
      )}
    </Fragment>
  );
}

export default Overlay;
