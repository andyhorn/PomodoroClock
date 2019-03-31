import React from 'react';

class Audio extends React.Component {
    render() {
        if (this.props.controls) {
            return (
                <audio
                    ref={this.props.reference}
                    src={this.props.source}
                    controls={true}
                    autoPlay={this.props.autoplay}
                    preload={this.props.preload}
                />
            )
        } else {
            return (
                <audio
                    ref={this.props.reference}
                    src={this.props.source}
                    autoPlay={this.props.autoplay}
                    preload={this.props.preload}
                />
            )
        }
    }
}

export default Audio;