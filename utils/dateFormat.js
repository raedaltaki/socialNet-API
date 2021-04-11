module.exports = date => 
{
  let month = new Date(date).getMonth() + 1;
  let day = new Date(date).getDate();
  let year = new Date(date).getFullYear();
  let hour = new Date(date).getHours();
  let minutes = new Date(date).getMinutes();
  if(hour>12)
  {
    return `${month}/${day}/${year} at ${hour-12}:${minutes}PM`;
  }
  else
  {
    return `${month}/${day}/${year} at ${hour}:${minutes}AM`;
  }
  
};
