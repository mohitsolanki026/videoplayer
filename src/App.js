import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import ImageEditor from "./RectangleDrawer";
import VideoPlayer from "./VideoPlayer";

function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/draw/:id" element={<ImageEditor />} />
      </Routes>

      
    </div>
  );
}

export default App;
