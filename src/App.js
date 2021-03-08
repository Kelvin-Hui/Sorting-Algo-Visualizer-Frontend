import "./App.css";
import React from "react";
import Input from "./components/Input";
import BarGraph from "./components/BarGraph";

function App() {
    const [array, setArray] = React.useState([]);
    const [size, setSize] = React.useState(60);

    const domain = "https://sortingalgo.herokuapp.com";

    React.useEffect(() => {
        fetchArray();
    }, [size]);

    const fetchArray = async () => {
        const parms = `/generate?parms={"arraySize" : ${size}}`;
        const response = await fetch(domain + parms).then((res) => res.json());
        setArray(response.data);
    };

    return (
        <div className="layout">
            <Input
                size={size}
                setSize={setSize}
                array={array}
                setArray={setArray}
            />
            <BarGraph array={array} />
        </div>
    );
}

export default App;
