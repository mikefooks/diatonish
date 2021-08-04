import React from "react";
import Theory from "./music_theory";

class Keybed extends React.Component {
    render() {
        const keyNames = Theory.getKeys("Aeolian").map(val =>
            <p>{ val }</p>    
        );
        return (
            <div className="keybed">
                { keyNames }
            </div>
        );
    }
}

export default Keybed;