import React, { useEffect } from 'react'
import JSMpeg from '@cycjimmy/jsmpeg-player'
import './player.scss'

function Player(props:any) {

    var url = props.url;
    
    useEffect(() => {
        var canvas = document.querySelector('.app-canvas');
        new JSMpeg.VideoElement(canvas, url, {control: true} );
    },[])

    return (
        <div className="app-canvas">
            
        </div>
    )
}

export default Player


