import React from 'react';

class SettingFrame extends React.Component {
  render(props) {
    return (
      <div id={this.props.elementId} className="setting-frame">
        <h2 id={this.props.label} className="setting-header">{this.props.title}</h2>
        <div className="session-display">
          <button className="btn" onMouseDown={this.props.increment} onMouseUp={this.props.stopIncrement} onMouseOut={this.props.stopIncrement} id={this.props.incrementButton}><i className="fas fa-arrow-up"></i></button>
          <span className="number" id={this.props.sessionId}>{this.props.time}</span>
          <button className="btn" onMouseDown={this.props.decrement} onMouseUp={this.props.stopDecrement} onMouseOut={this.props.stopDecrement} id={this.props.decrementButton}><i className="fas fa-arrow-down"></i></button>
        </div>
      </div>
    );
  }
}

export default SettingFrame;