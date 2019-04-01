import React from 'react';

class Audio extends React.Component {
    render() {
        if (this.props.controls) {
            return (
                <audio
                    ref={this.props.reference}
                    src={this.props.source}
                    controls={true}
                    muted={'muted'}
                    autoPlay={this.props.autoplay}
                    preload={this.props.preload}
                    type="audio/mpeg"
                />
            )
        } else {
            return (
                <audio
                    ref={this.props.reference}
                    src={this.props.source}
                    muted={'muted'}
                    autoPlay={this.props.autoplay}
                    preload={this.props.preload}
                    type="audio/mpeg"
                />
            )
        }
    }
}

export default Audio;