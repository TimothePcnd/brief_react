import {useState} from "react";

function MyButton() {
    const [count, SetCount] = useState(5);

    function handleClick(){
        SetCount(count - 1);
    }

    if (count <= 0)
        return (
            <button onClick={handleClick}>
                Tu peux arrêter de cliquer
            </button>
        );
    else {
        return (
            <button onClick={handleClick}>
                Le bouton a été cliqué {count} fois
            </button>
        );
    }
}

export default MyButton;