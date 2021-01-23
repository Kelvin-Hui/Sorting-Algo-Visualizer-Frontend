import React from "react";

import Input from "./Input";
import ArrayVisualizer from "./ArrayVisualizer";

import { CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Body() {
  const [array, setArray] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetcharray();
  }, []);

  const fetcharray = async () => {
    const domain = "https://sortingalgo.herokuapp.com";
    const parms = `/generate?parms={"arraySize" : ${20}}`;
    const response = await fetch(domain + parms).then((res) => res.json());
    setArray(response.data);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Snackbar
        open={loading}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert elevation={6} variant="filled" severity="warning">
          Please Wait! Starting Server
        </MuiAlert>
      </Snackbar>

      <Input array={array} setArray={setArray} />
      {loading ? (
        <CircularProgress style={{ margin: "auto" }} />
      ) : (
        <ArrayVisualizer array={array} />
      )}
    </React.Fragment>
  );
}

export default Body;
