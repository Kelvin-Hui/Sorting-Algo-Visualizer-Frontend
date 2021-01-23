import React from "react";

import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import SpeedIcon from "@material-ui/icons/Speed";
import ViewArrayIcon from "@material-ui/icons/ViewArray";

import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

function Input({ array, setArray }) {
  const domain = "https://sortingalgo.herokuapp.com";

  const [arraysize, setArraysize] = React.useState(20);
  const [speed, setSpeed] = React.useState(50);
  const [algorithm, setAlgorithm] = React.useState("quickSort");
  const [complexity, setComplexity] = React.useState({
    Average: "O(n log(n))",
    Best: "O(n log(n))",
    Worst: "O(n log(n))",
  });
  const [running, setRunning] = React.useState(false);
  const [successSnackOpen, setSuccessSnackOpen] = React.useState(false);
  const [warningSnackOpen, setWarningSnackOpen] = React.useState(false);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const fetcharray = async () => {
    const parms = `/generate?parms={"arraySize" : ${arraysize}}`;
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
      setWarningSnackOpen(true);
    }
  };

  const arraySizeOnChange = (e) => {
    let value = parseInt(e.target.ariaValueNow);
    setArraysize(parseInt(value * 2.8) + 20);
    fetcharray();
  };

  const speedOnChange = (e) => {
    let value = parseInt(e.target.ariaValueNow);
    setSpeed(parseInt(-100 * (value / 100)) + 100.1);
  };

  const algoOnChange = async (e) => {
    setAlgorithm(e.target.value);
    const parms = `/complexity?parms={"algo":"${algorithm}"}`;
    const response = await fetch(domain + parms).then((res) => res.json());
    setComplexity(response.data);
  };

  const handleSuccessOnClose = () => {
    setSuccessSnackOpen(false);
  };
  const handleWarningOnClose = () => {
    setWarningSnackOpen(false);
  };

  const marks = [
    { value: 0, label: "Slowest" },
    { value: 50, label: "Recommended" },
    { value: 100, label: "Fastest" },
  ];

  return (
    <div className="input" style={{ height: `${window.innerHeight * 0.9}px` }}>
      <Snackbar
        open={running}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" severity="info">
          {" "}
          Sorting <CircularProgress size="10px" thickness="5" />{" "}
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={successSnackOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={() => handleSuccessOnClose()}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={() => handleSuccessOnClose()}
        >
          Sorted :)
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={warningSnackOpen}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => handleWarningOnClose()}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="warning"
          onClose={() => handleWarningOnClose()}
        >
          Already Sorted! Plase Generate Another Random Array
        </MuiAlert>
      </Snackbar>

      <Button
        variant="contained"
        size="large"
        onClick={() => fetcharray()}
        disabled={running}
      >
        Create a New Random Array
      </Button>
      <br />

      <div>
        <h3>Change Array Size :</h3>
        <Grid container spacing={1}>
          <Grid item>
            <ViewArrayIcon />
          </Grid>
          <Grid item xs>
            <Slider
              valueLabelDisplay="auto"
              disabled={running}
              onChangeCommitted={(e) => arraySizeOnChange(e)}
            />
          </Grid>
        </Grid>
      </div>

      <div>
        <h3>Change Sorting Speed :</h3>
        <Grid container spacing={1}>
          <Grid item>
            <SpeedIcon />
          </Grid>
          <Grid item xs>
            <Slider
              valueLabelDisplay="auto"
              disabled={running}
              marks={marks}
              track={false}
              onChangeCommitted={(e) => speedOnChange(e)}
              defaultValue={50}
            />
          </Grid>
        </Grid>
      </div>

      <div>
        <h3>Select Algorithms :</h3>
        <Select
          onChange={(e) => algoOnChange(e)}
          disabled={running}
          defaultValue="quickSort"
        >
          <MenuItem value="selectionSort">Selection Sort</MenuItem>
          <MenuItem value="insertionSort">Insertion Sort</MenuItem>
          <MenuItem value="bubbleSort">Bubble Sort</MenuItem>
          <MenuItem value="mergeSort">Merge Sort</MenuItem>
          <MenuItem value="heapSort">Heap Sort</MenuItem>
          <MenuItem value="quickSort">Quick Sort</MenuItem>
        </Select>
      </div>

      <Button
        variant="contained"
        size="large"
        disabled={running}
        onClick={() => sort()}
      >
        Sort!
      </Button>
      <br />
      <Card>
        <CardHeader title={<u>Algorithms's Complexity</u>} />

        {Object.entries(complexity).map(([key, value]) => {
          return (
            <CardContent key={key}>
              <Typography variant="body1">
                <i>{key}</i>: <b>{value}</b>
              </Typography>
            </CardContent>
          );
        })}
      </Card>
    </div>
  );
}

export default Input;
