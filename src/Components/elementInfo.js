import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Info } from "./info.js";

const useStyles = makeStyles((theme) => ({
  contextualMenu: {
    width: 240,
    height: 300,
    border: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "50px",
    width: "160px",
    width: "auto",
    height: "auto",
    minHeight: "20%",
  },
}));

const ElementsInfo = (elementProps) => {
  elementProps = elementProps.elementProps;
  const classes = useStyles();
  return (
    <div className={classes.contextualMenu}>
      <Paper elevation={3} className={classes.paper}>
        <Info elementProps={elementProps} />
      </Paper>
    </div>
  );
};

export default ElementsInfo;
