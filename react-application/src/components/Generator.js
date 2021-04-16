import { useState, useEffect } from 'react' 
import SongInfo from "./SongInfo"
import * as tf from '@tensorflow/tfjs';

const Generator = () => {
    const [song, setSong] = useState('');
    const [model, setModel] = useState(null);
    const [char2idx, setChar2idx] = useState({})

    const vocab = ['\n', ' ', '!', '"', '#', '\'', '(', ')', ',', '-', '.', '/', '0', '1',
    '2', '3', '4', '5', '6', '7', '8', '9', ':', '<', '=', '>', 'A', 'B', 'C', 'D', 'E', 'F',
    'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
    'Y', 'Z', '[', ']', '^', '_', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '|'];

    const url = {
        model: 'https://irish-song-rnn-model-bucket.s3-us-west-1.amazonaws.com/irish_rnn/model.json',
    };

    async function loadModel(url) {
        try {
            const model = await tf.loadLayersModel(url.model);

            setModel(model);
            console.log("Load model success");
        }
        catch (err) {
            console.log(err);
        }
    }

    const onGenerateSong = () => {
        const length = 500;
        const start_string = "X:1\nT:";

        if(model) {
            var gen_text = [];

            /* Convert the start string to numbers (vectorize) */
            var input_eval = start_string.split('').map(letter => {return char2idx[letter]});

            input_eval = tf.expandDims(input_eval, 0);
            
            for(var counter = 0; counter < length; counter++) {
                /* Evaluate the inputs and generate the next character predictions */
                var predictions = model.predict(input_eval);

                /* Remove the batch dimension */
                predictions = tf.squeeze(predictions, 0);

                /* Use a multinomial distribution to sample */
                var predicted_id = tf.multinomial(predictions, 1)

                const values = predicted_id.dataSync();
                const arr = Array.from(values);
                predicted_id = arr[0];
                
                /* Pass the prediction along with the previous hidden state 
                   as the next inputs to the model */
                input_eval = tf.expandDims([predicted_id], 0);

                /* Add the predicted character to the generated text! */
                gen_text.push(vocab[predicted_id]);
            }

            setSong(start_string + gen_text.join(''));
        }
    }

    useEffect(()=>{
        const objectMapping = {};

        tf.ready().then(()=>{
            loadModel(url);
        });

        for(const [index, element] of vocab.entries()) {
            objectMapping[element] = index;
        }

        setChar2idx(objectMapping);
    }, [])

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
                <div className='generate-btn-container'>
                    <button className='btn generate-btn' onClick={onGenerateSong}>GENERATE SONG</button>
                </div>
            </div>
            <SongInfo song={song}/>
        </>
    )
}

export default Generator
