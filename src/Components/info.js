import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    width: 400,
    justifyContent: "center",
    fontSize: 12,
    marginBottom: 5,
    border: "1px solid green",
  },
  first: { minWidth: 140, marginRight: 20, border: "1px solid lightGray" },
  second: {
    minWidth: 200,
    border: "1px solid lightGray",
    wordWrap: "break-word",
  },
}));

const Row = ({ firstColumn, secondColumn }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.first}>{firstColumn}</div>
      <div className={classes.second}>{secondColumn}</div>
    </div>
  );
};

const Info = (elementProps) => {
  elementProps = elementProps.elementProps;
  let serial = 0;
  return (
    <Paper
      style={{
        border: "1px solid red",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {Object.keys(elementProps).map((key) => {
        if (JSON.stringify(elementProps[key])) {
          return (
            <Row
              firstColumn={key}
              secondColumn={JSON.stringify(elementProps[key])}
            />
          );
        }
      })}
    </Paper>
  );
};

export { Info };
