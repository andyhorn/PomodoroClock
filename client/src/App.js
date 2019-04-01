import React, { Component } from 'react';
import Audio from './Audio';
import Checkbox from './Checkbox';
import Controls from './Controls';
import Range from './Range';
import Modal from './Modal';
import SettingFrame from './SettingFrame';
import Timer from './Timer';
import wavFile from './BeepSound.wav';

const MAX_TIME = 3600;
const TIMEOUT = 100;
var timeout;
const DEFAULT_STATE = {
  breakSeconds: 300,
  workSeconds: 1500,
  alarmUrl: wavFile,
  currentSession: 'Session',
  currentTime: 1500,
  interval: '',
  incInterval: '',
  decInterval: '',
  pause: true,
  playAudio: false,
  continuousTimer: false,
  volume: 0.33,
  audio: React.createRef()
};

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = (DEFAULT_STATE);
    
    this.incrementBreak = this.incrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.clockify = this.clockify.bind(this);
    this.soundAlarm = this.soundAlarm.bind(this);
    this.start_stop = this.start_stop.bind(this);
	this.play = this.play.bind(this);
	this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
	this.toggleAudio = this.toggleAudio.bind(this);
	this.toggleContinuousTimer = this.toggleContinuousTimer.bind(this);
	this.setVolume = this.setVolume.bind(this);
	this.incrementSessionHold = this.incrementSessionHold.bind(this);
	this.decrementSessionHold = this.decrementSessionHold.bind(this);
	this.incrementBreakHold = this.incrementBreakHold.bind(this);
	this.decrementBreakHold = this.decrementBreakHold.bind(this);
	this.stopIncrement = this.stopIncrement.bind(this);
	this.stopDecrement = this.stopDecrement.bind(this);
  }
	
	toggleAudio() {
		//console.log("Audio button clicked");
		this.setState({
			playAudio : this.state.playAudio ? false : true
		}, () => {
			this.state.audio.current.muted = !this.state.playAudio;
		});
	}
	
	toggleContinuousTimer() {
		//console.log("Timer button clicked");
		this.setState({
			continuousTimer : this.state.continuousTimer ? false : true
		});
	}
	
	setVolume(e) {
		//console.log("volume changed");
		//console.log(e.target.value);
		this.setState({
			volume: e.target.value / 100
		}, () => {
			let audio = this.state.audio.current;
			audio.volume = this.state.volume;
		});		
	}
  
  	incrementBreak() {
		if (this.state.breakSeconds < MAX_TIME) {
      		this.setState({
        		breakSeconds: this.state.breakSeconds + 60,
			}
			, this.state.currentSession === 'Break' ? this.updateTimer : null);
	  	}
  	}	
	
	incrementBreakHold() {
		this.incrementBreak();
		timeout = setTimeout(() => {
			let incInterval = setInterval(this.incrementBreak, TIMEOUT);
			this.setState({ incInterval : incInterval });
		}, TIMEOUT * 2);
	}
	
	stopIncrement() {
		clearTimeout(timeout);
		clearTimeout(this.state.incInterval);
	}
  
  	decrementBreak() {
    	if (this.state.breakSeconds > 60) {
      		this.setState({
        		breakSeconds: this.state.breakSeconds - 60
      		}, this.state.currentSession === 'Break' ? this.updateTimer : null);
    	}		 
  	}
	
	decrementBreakHold() {
		this.decrementBreak();
		timeout = setTimeout(() => {
			let decInterval = setInterval(this.decrementBreak, TIMEOUT);
			this.setState({ decInterval : decInterval });	
		}, TIMEOUT * 2);
	}
	
	stopDecrement() {
		clearTimeout(timeout);
		clearInterval(this.state.decInterval);
	}
  
  	incrementSession() {
    	if (this.state.workSeconds < MAX_TIME) {
      		this.setState({
        		workSeconds: this.state.workSeconds + 60
			  }
			  , this.state.currentSession === 'Session' ? this.updateTimer : null);
    	}
  	}
	
	incrementSessionHold() {
		this.incrementSession();
		timeout = setTimeout(() => {
			let incInterval = setInterval(this.incrementSession, TIMEOUT);
			this.setState({ incInterval : incInterval });	
		}, TIMEOUT * 2);
	}
  
  	decrementSession() {
    	if (this.state.workSeconds > 60) {
      		this.setState({
	        	workSeconds: this.state.workSeconds - 60
			}
			, this.state.currentSession === 'Session' ? this.updateTimer : null);
    	}
  	}
	
	decrementSessionHold() {
		this.decrementSession();
		timeout = setTimeout(() => {
			let decInterval = setInterval(this.decrementSession, TIMEOUT);
			this.setState({ decInterval : decInterval });	
		}, TIMEOUT * 2);
	}
  
  	updateTimer() {
    	this.setState({
      		currentTime: this.state.currentSession === 'Session' ? this.state.workSeconds : this.state.breakSeconds
    	});
  	}
  
  	clockify(time) {
    	let timeDisplay = '';
    	let minutes = Math.floor(time / 60);
    	let seconds = Math.floor(time % 60);
    	timeDisplay = minutes < 10 ? '0' + String(minutes) : String(minutes);
    	timeDisplay += ':';
    	timeDisplay += seconds < 10 ? '0' + String(seconds) : String(seconds);
    	return timeDisplay;
  	}
  
  	decrementTimer() {
  		if (this.state.currentTime > 0) {
			if (this.state.currentTime === 1) {
				this.soundAlarm();
				if (!this.state.continuousTimer)
					this.start_stop();
    		}			
			this.setState({
      			currentTime: this.state.currentTime - 1
      		});
  		} else if (this.state.currentTime === 0) {
			this.setState({
			  currentSession: this.state.currentSession === 'Session' ? 'Break' : 'Session',
			  currentTime : (this.state.currentSession === 'Session' ? this.state.breakSeconds : this.state.workSeconds) - 1
		  	});
	  	}
	}
  
  	soundAlarm() {
		if (this.state.playAudio) {
			console.log('audio enabled');
			let audio = this.state.audio.current;
			console.log(audio);
			//audio.volume = this.state.volume;
			console.log('volume: ' + audio.volume);
			audio.currentTime = 0.25;
			console.log('currentTime: ' + audio.currentTime);
			console.log('playing audio...');
			audio.muted = false;
			let promise = audio.play();
			if (promise != undefined && promise != null) {
				promise.catch((e) => {
					console.log(e);
					audio.play();
				})
			}
		}
  	}
	
	pause(btn) {
		let audio = this.state.audio.current;
		audio.pause();
		clearInterval(this.state.interval);
		this.setState({ pause : true, interval : '' });
	}
	
	play(btn) {
		this.setState({
			pause: false,
			interval: setInterval(this.decrementTimer, 1000)
		});
	}
  
	start_stop() {
    	if (this.state.pause === true) {
			this.play();
    	} else {
			this.pause();
    	}
	}
  
  	reset() {
		this.pause();
		clearInterval(this.state.interval);
		let audio = this.state.audio.current;
    	audio.currentTime = 0.25;
    	this.setState(DEFAULT_STATE);
  	}
  
  render() {
    return (	 
      	<div id="clock">
		  	<button id="settingsButton" type="button" className="btn" data-toggle="modal" data-target="#settingsModal"><i className="fas fa-cog"></i></button>
			<Modal
				title="Settings"
				content={
					<div className="d-flex flex-column">
						<Checkbox 
							label="Play Alarm"
							isSelected={this.state.playAudio}
							onCheckboxChange={this.toggleAudio}
							key="audioToggle"
						/>
						<Range
							label="Volume"
							value={this.state.volume * 100}
							onRangeChange={(e) => this.setVolume(e)}
							key="volumeSlider"
						/>
						<Checkbox
							label="Continuous Timer"
							isSelected={this.state.continuousTimer}
							onCheckboxChange={this.toggleContinuousTimer}
							key="timerToggle"
						/>
					</div>
				}
			/>

        <div id="title">
        	<Audio
				source={this.state.alarmUrl}
				volume={this.state.volume}
				controls={false}
				autoplay={false}
				reference={this.state.audio}
		  	/>
          	<h1>Pomodoro Clock</h1>
        </div>
        <div id="settings">
        	<SettingFrame
            	id="session"
            	sessionId="session-length"
            	label="session-label"
            	title="Session Length"
            	incrementButton="session-increment"
            	decrementButton="session-decrement"
            	increment={this.incrementSessionHold}
            	decrement={this.decrementSessionHold}
				stopIncrement={this.stopIncrement}
				stopDecrement={this.stopDecrement}
            	time={Math.floor(this.state.workSeconds / 60)}
          	/>
          	<SettingFrame
            	elementId="break"
            	sessionId="break-length"
            	label="break-label"
            	title="Break Length"
            	incrementButton="break-increment"
            	decrementButton="break-decrement"
            	increment={this.incrementBreakHold}
            	decrement={this.decrementBreakHold}
				stopIncrement={this.stopIncrement}
				stopDecrement={this.stopDecrement}
            	time={Math.floor(this.state.breakSeconds / 60)}
          	/>
        </div>
        	<Timer
          		sessionTitle={this.state.currentSession}
				currentTime={this.clockify(this.state.currentTime)}
				warning={this.state.currentTime <= 60}
        	/>
        	<Controls
          		startAction={this.start_stop}
				resetAction={this.reset}
				paused={this.state.pause}
        	/>
      	</div>
    );
  }
}

export default Clock;