import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;

const timerProps = {
  isPlaying: true,
  size: 300,
  strokeWidth: 6,
  duration: 0,
  

};

export default function App() {
  const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = stratTime + 243240; // use UNIX timestamp in seconds

  const remainingTime = endTime - stratTime;

  return (
    <div className="App">
      <CountdownCircleTimer
        {...timerProps}
        colors={[["#218380"]]}
        duration={minuteSeconds}
        colors={[[ '#FB275D' ]]}
        

        initialRemainingTime={ 60- (remainingTime % minuteSeconds)}
        onComplete={() => {
            //totalElapsedTime => [remainingTime - totalElapsedTime > 0]
            console.log('finished')

        } }
      >
        {
            ({ elapsedTime }) => <h3>{parseInt(elapsedTime)}</h3>
        }
      </CountdownCircleTimer>
    </div>
  );
}
