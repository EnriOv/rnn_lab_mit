import {useState, useEffect} from 'react'
import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs/midi';

const SongInfo = () => {
    const abc = "T:Huwckartye\n"
            + "Z: id:dc-jig-122\n"
            + "M:6/8\n"
            + "L:1/8\n"
            + "K:F Minor\n"
            + "ABd egd|BAd AFA|B2e e2d|BdB e3|!\n"
            + "bag agf|edB B2d|efg edB|AGEA GEDa|!\n"
            + "g2fg ebab|gdfA d2ed|cAeB AFEG|Aed^c d3:|!\n"
            + "BdB|eAA2 BAGA|B2dB GBdB|cABG AGEG|BAGF D2:|!\n";

    const newLineBreak = text => {
        return text.split('\n').map(function (line) {
            return (<p>{line}</p>);
        })
    }

    useEffect(() => {
        // Draw the music - this supplies an object that has a lot of information about how to create the synth.
        var visualObj = abcjs.renderAbc('paper', abc, {responsive: 'resize' })[0];
        
        abcjs.renderMidi('media-player', abc, { });

        abcjs.midi.setLoop(document.querySelector('.abcjs-inline-midi'), true);
    }, [])

    return (
        <>
            <div className='player'>
                <div id='media-player'>Media Player</div>
            </div>
            <div className='song-abc'>
                {newLineBreak(abc)}
            </div>
            <div>
                <div id='paper'></div>
            </div>
        </>
    )
}

export default SongInfo
