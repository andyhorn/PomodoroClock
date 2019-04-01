import React from 'react';

class Controls extends React.Component {
  render() {
    return (
      <div id="controls">
        <button id="start_stop" className={"btn" + (this.props.paused ? '' : ' play')} onClick={(e) => this.props.startAction(e)}>
          <i className="fas fa-play mr-1"></i> <i className="fas fa-pause ml-1"> </i>
        </button>
        <button id="reset" className="btn" onClick={(e) => this.props.resetAction(e)}><i className="fas fa-sync"></i></button>
      </div>
    );
  }
}

export default Controls;