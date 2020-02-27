const formatDate = (date) => {
  const hours = (`0${date.getHours()}`).slice(-2);
  const minutes = (`0${date.getMinutes()}`).slice(-2);
  const seconds = (`0${date.getSeconds()}`).slice(-2);
  const day = (`0${date.getDate() + 1}`).slice(-2);
  const months = (`0${date.getMonth() + 1}`).slice(-2);
  return `${hours}:${minutes}:${seconds} ${day}.${months}.${date.getFullYear()}`;
};

export default formatDate;
