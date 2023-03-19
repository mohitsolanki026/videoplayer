import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RectangleDrawer.css"

function ImageEditor() {
  const [rectangles, setRectangles] = useState([]);
  const [selectedRectangleIndex, setSelectedRectangleIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const parms = useParams();
  const imageUrl= parms.id
  const[color,setcolor]= useState('red')
  const[bordersize,setbordersize]= useState("2")

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = decodeURIComponent(imageUrl);

    image.onload = () => {
      imageRef.current = image;
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
    };
  }, [imageUrl]);

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    const { offsetX, offsetY } = event.nativeEvent;
    const clickedRectangleIndex = rectangles.findIndex((rect) => {
      const { x, y, width, height } = rect;
      return (
        offsetX >= x &&
        offsetX <= x + width &&
        offsetY >= y &&
        offsetY <= y + height
      );
    });
    if (clickedRectangleIndex !== -1) {
      setSelectedRectangleIndex(clickedRectangleIndex);
      setIsDragging(true);
      setDragStart({ x: offsetX, y: offsetY });
    } else {
      setRectangles([
        ...rectangles,
        { x: offsetX, y: offsetY, width: 0, height: 0 },
      ]);
      setSelectedRectangleIndex(rectangles.length);
      setIsDragging(true);
      setDragStart({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const { offsetX, offsetY } = event.nativeEvent;
    if (isDragging && dragStart && canvas) {
      const { x: startX, y: startY } = dragStart;
      const { x: endX, y: endY } = { x: offsetX, y: offsetY };
      const newRectangles = [...rectangles];
      const selectedRectangle = newRectangles[selectedRectangleIndex];
      selectedRectangle.width = endX - startX;
      selectedRectangle.height = endY - startY;
      setRectangles(newRectangles);
      drawRectangles(newRectangles);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  const drawRectangles = (rectanglesToDraw) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imageRef.current, 0, 0);
    rectanglesToDraw.forEach(({ x, y, width, height }) => {
      context.strokeStyle = color;
      context.lineWidth = bordersize;
      context.strokeRect(x, y, width, height);
    });
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "image.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="container">
      <div className="top">
      <h1 >Draw on Image</h1>
      <div className="inputt">
        <input  type="color" onChange={(e)=>setcolor(e.target.value)} />
      <input type="number" className="draw-input" onChange={(e)=>setbordersize(e.target.value)} placeholder="width of border" />
      </div>
      <button onClick={saveImage} className='btn'>Save Image</button>
      </div>
      <div className="img-con">

      <canvas  
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
     
      </div>
    </div>
  )}
  export default ImageEditor