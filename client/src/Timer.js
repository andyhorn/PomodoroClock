import React from 'react';

class Timer extends React.Component {
    render() {
      return (
        <div id="timer" className={this.props.warning ? "warning" : ""}>
          <h2 id="timer-label">{this.props.sessionTitle}</h2>
          <span id="time-left" className="number">{this.props.currentTime}</span>
        </div>
      );
    }
  }

  export default Timer;