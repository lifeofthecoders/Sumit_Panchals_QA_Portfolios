import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function LiveStatus() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      // Formats current time in Pakistan Standard Time (IST)
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-status-pill">
      <span className="pulsing-live-dot" />
      <span className="live-status-text">Available for work</span>
      <span className="status-separator">•</span>
      <span className="live-clock">
        <Clock size={12} style={{ display: 'inline', marginRight: '4px' }} />
        {time || 'Loading...'} IST
      </span>
    </div>
  );
}