import React from "react";
import github from "../assets/github.svg";

export default function Input({ array, setArray, size, setSize }) {
    const [complexity, setComplexity] = React.useState({
        Average: "O(n log(n))",
        Best: "O(n log(n))",
        Worst: "O(n log(n))",
    });
    const [algorithm, setAlgorithm] = React.useState("quickSort");
    const [running, setRunning] = React.useState(false);
    const [speed, setSpeed] = React.useState(75);
    const [successSnackOpen, setSuccessSnackOpen] = React.useState(false);

    const domain = "https://sortingalgo.herokuapp.com";

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const fetchArray = async () => {
        setSuccessSnackOpen(false);
        const parms = `/generate?parms={"arraySize" : ${size}}`;
        const response = await fetch(domain + parms).then((res) => res.json());
        setArray(response.data);
    };

    const sort = async () => {
        const parms = `/sort?parms={"data":[${array}],"algo":"${algorithm}"}`;
        const response = await fetch(domain + parms).then((res) => res.json());

        if (response.isSorted === false) {
            setRunning(true);
            let animatedarray = response.data;

            for (var i = 0; i < animatedarray.length; i++) {
                await sleep(speed);
                setArray(animatedarray[i]);
            }

            sleep(2000);
            setRunning(false);
            setSuccessSnackOpen(true);
        } else {
            window.alert("Already Sorted!");
        }
    };

    const sizeOnChange = (e) => {
        setSize(parseInt(e.target.value) + 10);
        setSuccessSnackOpen(false);
    };
    const speedOnChange = (e) => {
        setSpeed(-parseInt(e.target.value) + 101);
    };
    const algoOnChange = async (e) => {
        setAlgorithm(e.target.value);
        const parms = `/complexity?parms={"algo":"${algorithm}"}`;
        const response = await fetch(domain + parms).then((res) => res.json());
        setComplexity(response.data);
    };

    const statusOnChange = () => {
        if (array.length === 0) {
            return "Waiting For Backend To Start";
        }
        if (running) {
            return "Sorting";
        } else {
            if (successSnackOpen) {
                return "Sorted";
            } else {
                return "Ready To Sort";
            }
        }
    };

    return (
        <div className="input">
            <h3 className={running ? "running" : null}>
                Status : {statusOnChange()}
            </h3>
            <button
                className="btn"
                disabled={running}
                onClick={() => fetchArray()}
            >
                Generate New Array
            </button>
            <h4>Array Length: {size}</h4>
            <input
                type="range"
                min={0}
                max={100}
                step={10}
                defaultValue={50}
                onClick={(e) => sizeOnChange(e)}
                disabled={running}
            ></input>
            <h4>Speed</h4>
            <input
                type="range"
                min={1}
                max={100}
                step={1}
                onClick={(e) => speedOnChange(e)}
                disabled={running}
            ></input>
            <h4>Algorithms:</h4>
            <select
                className="select"
                defaultValue="quickSort"
                onChange={(e) => algoOnChange(e)}
                disabled={running}
            >
                <option value="selectionSort">Selection Sort</option>
                <option value="insertionSort">Insertion Sort</option>
                <option value="bubbleSort">Bubble Sort</option>
                <option value="mergeSort">Merge Sort</option>
                <option value="heapSort">Heap Sort</option>
                <option value="quickSort">Quick Sort</option>
            </select>
            <button className="btn" disabled={running} onClick={() => sort()}>
                Sort
            </button>
            <h3>Algorithm Complexity:</h3>

            <div className="card">
                <span>
                    Where <b>n</b> is the Length of the Array
                </span>
                <span>
                    {Object.entries(complexity).map(([key, value]) => {
                        return (
                            <p>
                                <i>{key}</i>: <b>{value}</b>
                            </p>
                        );
                    })}
                </span>
            </div>
            <span>Kelvin Hui ©2021</span>
            <a
                href="https://github.com/Kelvin-Hui/Sorting-Algo-Visualizer-Frontend"
                target="_blank"
                rel="noreferrer"
            >
                <img
                    className="logo"
                    src={github}
                    alt="Github Logo"
                    sizes="small"
                    href="https://github.com/Kelvin-Hui/Sorting-Algo-Visualizer-Frontend"
                />
            </a>
        </div>
    );
}
