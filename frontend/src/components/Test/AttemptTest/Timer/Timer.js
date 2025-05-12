import React from 'react';
import DateTimeDisplay from './DateTimeDisplay';
import { useCountdown } from '../hooks/useCountdown';
import "./Timer.css"
const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter" >
      <div
        className="countdown-link"

        style={{
          backgroundColor: minutes>=10 || minutes!=null || minutes != undefined? 'rgb(5, 209, 223)' : 'red'
        }}
      >
        <DateTimeDisplay value={hours?hours:null} type={'Hours'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes?minutes:null} type={'Mins'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds?seconds:null} type={'Seconds'} isDanger={false} />
      </div>
    </div>
  );
};
const CountdownTimer = (props) => {
  const [days, hours, minutes, seconds] = useCountdown(props.targetDate);
  const NOW_IN_MS = new Date().getTime();
  props.handleTimer(1*1*minutes*60*1000 +  NOW_IN_MS)
  if (days + hours + minutes + seconds <= 0) {
    props.handleTimeUp(true)
  } 
  else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountdownTimer;
