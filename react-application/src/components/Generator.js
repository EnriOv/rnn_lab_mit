import { useState } from 'react' 
import SongInfo from "./SongInfo"

const Generator = () => {
    const [song, setSong] = useState('');

    return (
        <>
            <div className='generator-container'>
                <p>
                    This irish song generator was developed using a deep recurrent neural network. 
                    It was trained using a dataset containing various irish songs in abc notation. 
                    This project was created as a lab assignment from the MIT course:
                </p>
                <br/>
                <p>
                    © Alexander Amini and Ava Soleimany<br/>
                    MIT 6.S191: Introduction to Deep Learning<br/>
                    IntroToDeepLearning.com
                </p>
                <br/>
                <p>
                    Source to code:<br/>
                    Link to code
                </p>
                <div className='generate-btn-container'>
                    <button className='btn generate-btn'>GENERATE SONG</button>
                </div>
            </div>
            <SongInfo />
        </>
    )
}

export default Generator
