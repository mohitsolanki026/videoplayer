import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import ImageEditor from './RectangleDrawer';
// import RectangleDrawer from './RectangleDrawer';
import "./VideoPlayer.css";

// const Container = styled.div`
//   position: relative;
//   padding-top: 36.25%; /* 16:9 aspect ratio */
// `;

// const Video = styled(ReactPlayer)`
//   // position: absolute;
//   // top: 0;
//   // left: 0;
//   width:100%;
// `;

const ScreenshotButton = styled.button`
  //   position: absolute;
  //   bottom: 10px;
  //   right: 10px;
`;

const VideoPlayer = ({ url }) => {
  const playerRef = useRef(null);
  const [screenshotUrl, setScreenshotUrl] = useState(null);
  // const [show,setshow]= useState(false);
  const navigate = useNavigate();
  const handleScreenshot = () => {
    const canvas = document.createElement("canvas");
    canvas.width = playerRef.current.getInternalPlayer().videoWidth;
    canvas.height = playerRef.current.getInternalPlayer().videoHeight;
    canvas
      .getContext("2d")
      .drawImage(playerRef.current.getInternalPlayer(), 0, 0);
    setScreenshotUrl(canvas.toDataURL());
  };

  return (
    <div className="videoPlayer">
      <div className="player">
        {/* <Video url={url} controls ref={playerRef}  /> */}
        <ReactPlayer url={url} controls ref={playerRef}  width="100%" height="100%" />
      </div>
      <div className="buttons">
        <ScreenshotButton onClick={handleScreenshot} className='btn'>
          Take Frame
        </ScreenshotButton>
        {screenshotUrl && <button onClick={() => navigate(`/draw/${encodeURIComponent(screenshotUrl)}`)} className='btn'>
          Next
        </button> }
        
      </div>
    </div>
  );
};

export default VideoPlayer;
