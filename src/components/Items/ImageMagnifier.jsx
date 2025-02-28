import { useState, useRef } from 'react';
import { ZoomIn } from 'lucide-react';
const ImageMagnifier = ({ src, alt, lensSize = 100, zoomLevel = 2.5 }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [showMagnifier, setShowMagnifier] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isZoomMode, setIsZoomMode] = useState(false);
    const imageRef = useRef(null);
  
    const handleMouseMove = (e) => {
      if (!imageRef.current) return;
      
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      
      // Calculate cursor position relative to image
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      // Keep lens within image boundaries
      const lensX = Math.min(Math.max(x, lensSize / 2 / width * 100), 100 - lensSize / 2 / width * 100);
      const lensY = Math.min(Math.max(y, lensSize / 2 / height * 100), 100 - lensSize / 2 / height * 100);
      
      setPosition({ x: lensX, y: lensY });
      setCursorPosition({ x, y });
    };
  
    const toggleZoomMode = () => {
      setIsZoomMode(!isZoomMode);
      setShowMagnifier(false);
    };
  
    return (
      <div className="relative w-full h-full">
        <div 
          className="relative w-full h-full overflow-hidden"
          onMouseEnter={() => isZoomMode && setShowMagnifier(true)}
          onMouseLeave={() => setShowMagnifier(false)}
          onMouseMove={handleMouseMove}
        >
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
          
          {/* Magnifier Lens */}
          {showMagnifier && (
            <div 
              className="absolute border-2 border-white rounded-full shadow-lg pointer-events-none z-10"
              style={{
                width: `${lensSize}px`,
                height: `${lensSize}px`,
                left: `calc(${position.x}% - ${lensSize / 2}px)`,
                top: `calc(${position.y}% - ${lensSize / 2}px)`,
                backgroundImage: `url(${src})`,
                backgroundPosition: `${position.x * zoomLevel}% ${position.y * zoomLevel}%`,
                backgroundSize: `${zoomLevel * 100}%`,
                backgroundRepeat: 'no-repeat'
              }}
            />
          )}
        </div>
        
        {/* Zoom control button */}
        <button 
          onClick={toggleZoomMode}
          className="absolute top-3 right-3 bg-white/80 p-2 rounded-full shadow-md z-10 hover:bg-white"
          aria-label={isZoomMode ? "Disable zoom" : "Enable zoom"}
        >
          <ZoomIn size={18} className={isZoomMode ? "text-blue-500" : "text-gray-700"} />
        </button>
        
        {/* Zoom status indicator */}
        {isZoomMode && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md z-10">
            Zoom {Math.round(zoomLevel * 100)}%
          </div>
        )}
      </div>
    );
  };

  export default ImageMagnifier;