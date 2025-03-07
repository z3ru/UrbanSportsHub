import { useRef, useEffect, useState } from 'react';
import jsQR from 'jsqr';
import './Scanner.css';

const Scanner = ({ onStop }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const [isActive, setIsActive] = useState(true);
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDomReady(true);
    }, 100); // Small delay to ensure refs are assigned

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (
      !isActive ||
      !domReady ||
      !videoRef.current ||
      !canvasRef.current ||
      !wrapperRef.current
    )
      return;

    let scanning = true;
    const ctx = canvasRef.current.getContext('2d', {
      willReadFrequently: true,
    });

    async function startScanner() {
      try {
        wrapperRef.current.style.display = 'block';

        streamRef.current = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
          requestAnimationFrame(scanQR);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        stopScanner();
      }
    }

    const scanQR = () => {
      if (!scanning || !videoRef.current) return;

      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        const imageData = ctx.getImageData(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const code = jsQR(
          imageData.data,
          canvasRef.current.width,
          canvasRef.current.height
        );

        if (code) {
          stopScanner(code.data);
        }
      }
      requestAnimationFrame(scanQR);
    };

    const stopScanner = (data = '') => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      if (wrapperRef.current) {
        wrapperRef.current.style.display = 'none';
      }

      setIsActive(false);
      onStop(data);
    };

    startScanner();

    return () => {
      scanning = false;
      stopScanner();
    };
  }, [isActive, domReady, onStop]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="scanner__wrapper"
        style={{ display: isActive ? 'block' : 'none' }}
      >
        <video
          ref={videoRef}
          className="scanner__background"
          autoPlay
          playsInline
        ></video>
        <div className="scanner__overlay">
          <div className="scanner__cutout"></div>
        </div>
        <div className="scanner__cutout-border"></div>
      </div>
      <canvas ref={canvasRef} hidden></canvas>
    </>
  );
};

export default Scanner;
