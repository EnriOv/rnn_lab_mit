import {useEffect} from 'react'
import abcjs from 'abcjs/midi';

const Song = () => {
    useEffect(() => {
        const abc = "T:Huwckartye\n"
            + "Z: id:dc-jig-122\n"
            + "M:6/8\n"
            + "L:1/8\n"
            + "K:F Minor\n"
            + "ABd egd|BAd AFA|B2e e2d|BdB e3|!\n"
            + "bag agf|edB B2d|efg edB|AGEA GEDa|!\n"
            + "g2fg ebab|gdfA d2ed|cAeB AFEG|Aed^c d3:|!\n"
            + "BdB|eAA2 BAGA|B2dB GBdB|cABG AGEG|BAGF D2:|!\n";

        var visualObj = abcjs.renderAbc("paper", abc, {responsive: "resize" })[0];
    }, [])

    return (
        <>
            <div>
                <div id="paper"></div>
            </div>
            <h2 className="example-song">Example song generated by the neural network</h2>
        </>
    )
}

export default Song