import React from 'react';

const alert = (source, volume, play) => {
    this.myRef = React.createRef();
    if (play) {
        return (
            <audio ref={this.myRef} src={source} volume={volume} autoPlay/>
        )
    }
}