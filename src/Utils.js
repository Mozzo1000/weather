const convertTime = (unixSeconds, timezone) => {
    const time = new Date((unixSeconds + timezone) * 1000)
      .toISOString()
      .match(/(\d{2}:\d{2})/);
  
    return time;
};

export default convertTime;