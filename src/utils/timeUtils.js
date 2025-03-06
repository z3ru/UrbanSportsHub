// Format date and time e.g. Mar 3, 15:46
export const formatDateAndTime = (date) => {
  const options = {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return new Date(date).toLocaleString([], options);
};

// Format timer (MM:SS)
export const formatTimer = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;
};
