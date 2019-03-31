import React from 'react';

class Controls extends React.Component {
    render() {
      return (
        <div id="controls">
          <button id="start_stop" className={"btn" + (this.props.paused ? '' : ' play')} onClick={(e) => this.props.startAction(e)}>
            <i className="fas fa-play"> </i> 
            <i className="fas fa-pause"> </i>
          </button>
          <button id="reset" className="btn" onClick={(e) => this.props.resetAction(e)}><i className="fas fa-sync"></i></button>
        </div>
      );
    }
  }

  export default Controls;