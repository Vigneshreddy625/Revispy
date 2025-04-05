import React from "react";
import { motion } from "framer-motion";
import videoSrc from "../../assets/LoadingVideo.mp4"; 


function MainLoading() {
    const [loaded, setLoaded] = React.useState(false);

    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setLoaded(true)}
          aria-hidden="true"
        />
        {loaded && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="sr-only">Loading content, please wait while the backend responds.</span>
          </div>
        )}
      </div>
    );
}

export default MainLoading;