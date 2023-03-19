import React, { useState } from 'react'
import VideoPlayer from './VideoPlayer';
import "./Home.css"

function Home() {
    const [videourl, setvideourl] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setvideourl(fileReader.result);
        console.log("img data", fileReader.result);
      }
    };
  };
  return (
    <div className='home'>
        <div className="input">
        <input type="file" accept="video/*" onChange={handleImageChange} id="files" className='hidden' />
        <label for="files">Select Video</label>
        </div>
        { videourl ?  <div className="container-video">
            <VideoPlayer url={videourl} />
        </div>
        :
        <div className="container-text">
            <h2>Selected Video Shown here</h2>
        </div>

        }
       
    </div>
  )
}

export default Home