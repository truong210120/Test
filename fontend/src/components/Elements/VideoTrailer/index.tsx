import React, { useState, useEffect, useCallback, useRef } from "react";
import ReactPlayer from 'react-player/lazy'
interface IProps {
      videoLink: string;
      autoPlay?: boolean;
      title: string;
      isPlay: boolean
}

const VideoIframe: React.FC<IProps> = (props) => {
      const { videoLink, title, isPlay } = props;
      const iframeRef = useRef<HTMLSourceElement>(null);
      const defaultHeight = 495;
      const [videoHeight, setVideoHeight] = useState<number>(
            iframeRef.current ? iframeRef.current.offsetWidth * 0.5625 : defaultHeight
      );

      const handleChangeVideoWidth = useCallback(() => {
            const ratio =
                  window.innerWidth > 990
                        ? 1.0
                        : window.innerWidth > 522
                              ? 1.2
                              : window.innerWidth > 400
                                    ? 1.45
                                    : 1.85;
            const height = iframeRef.current
                  ? iframeRef.current.offsetWidth * 0.5625
                  : defaultHeight;
            return setVideoHeight(Math.floor(height * ratio));
      }, []);

      useEffect(() => {
            window.addEventListener("resize", handleChangeVideoWidth);
            const ratio =
                  window.innerWidth > 990
                        ? 1.0
                        : window.innerWidth > 522
                              ? 1.2
                              : window.innerWidth > 400
                                    ? 1.45
                                    : 1.85;
            const height = iframeRef.current
                  ? iframeRef.current.offsetWidth * 0.5625
                  : defaultHeight;
            setVideoHeight(Math.floor(height * ratio));
            return function cleanup() {
                  window.removeEventListener("resize", handleChangeVideoWidth);
            };
      }, [videoHeight, handleChangeVideoWidth]);

      return (
            <>
                  <ReactPlayer 
                        ref={iframeRef}
                        title={title}
                        controls
                        playing={isPlay}
                        width="100%"
                        height={`${videoHeight}px`} 
                        loop
                        url={videoLink}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                  />
            </>
      );
};

export default VideoIframe;
