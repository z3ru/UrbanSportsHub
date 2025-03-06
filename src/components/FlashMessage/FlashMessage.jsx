import { useEffect, useState } from 'react';
import './FlashMessage.css';

const FlashMessage = ({ message, duration = 3000, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose(); // Notify parent component when hidden
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return <div className="flash-message">{message}</div>;
};

export default FlashMessage;
