import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuButton from "../Components/menuButton";
import ElementsTree from "../Components/elementsTree";
import ElementsInfo from "../Components/elementInfo";
import SearchInput from "../Components/searchInput";
import "../App.css";
import { IfcViewerAPI } from "web-ifc-viewer";
import BuildrsToolBar from "../Components/toolBar";
import { Info } from "../Components/info";

const useStyles = makeStyles((theme) => ({
  menuToolbarContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    "@media (max-width: 1280px)": {
      marginTop: "40px",
      justifyContent: "flex-start",
    },
  },
  elementsButton: {
    position: "absolute",
    top: 80,
    right: 22,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 1280px)": {
      marginTop: theme.spacing(5),
      top: 690,
      right: 15,
    },
  },
  title: {
    flexGrow: 1,
    color: "WhiteSmoke",
    fontSize: 20,
    marginRight: "20px",
  },
  shareContainer: {
    width: 540,
    height: 30,
    paddingLeft: 10,
    color: "aqua",
    border: "1px solid aqua",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    right: 80,
    top: 86,
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    left: 20,
    top: 84,
    width: "100%",
    "@media (max-width: 1280px)": {
      justifyContent: "center",
      alignItems: "center",
      left: 0,
    },
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "50px",
    width: "160px",
  },
  viewContainer: {
    position: "absolute",
    top: "0px",
    left: "0px",
    textAlign: "center",
    color: "blue",
    width: "100vw",
    height: "100vh",
    margin: "auto",
    // display: "none",
    zIndex: 0,
  },
  propertyViewContainer: {
    position: "absolute",
    top: "100px",
    right: "50px",
    width: "400px",
  },
}));

const CadView = () => {
  const classes = useStyles();
  const [openLeft, setOpenLeft] = useState(false);
  const [openRight, setOpenRight] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [viewer, setViewer] = useState({});
  const [ifcElement, setIfcElement] = useState({});
  const [elementProps, setElementProps] = useState({});

  const onClickShare = () => {
    setOpenShare(!openShare);
  };

  const onElementSelect = (expressID) => {
    viewer.pickIfcItemsByID(0, [expressID]);
    const props = viewer.getProperties(0, expressID);
    setElementProps(props);
    setOpenRight(true);
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const container = document.getElementById("viewer-container");
    const viewer = new IfcViewerAPI({ container });
    setViewer(viewer);
    // No setWasmPath here. As of 1.0.14, the default is
    // http://localhost:3000/static/js/web-ifc.wasm, so just putting
    // the binary there in our public directory.
    viewer.addAxes();
    viewer.addGrid();
    window.onmousemove = viewer.prepickIfcItem;
    window.ondblclick = viewer.addClippingPlane;
    window.onkeydown = (event) => {
      viewer.removeClippingPlane();
    };
  }, []);

  const fileOpen = () => {
    const loadIfc = async (event) => {
      await viewer.loadIfc(event.target.files[0], true);
      const ifcRoot = viewer.getSpatialStructure(0);
      setIfcElement(ifcRoot);
      setOpenLeft(true);
    };

    const viewerContainer = document.getElementById("viewer-container");
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.classList.add("file-input");
    fileInput.addEventListener(
      "change",
      (event) => {
        loadIfc(event);
      },
      false
    );
    viewerContainer.appendChild(fileInput);
    fileInput.click();
  };
  console.log("ifc elements", ifcElement);
  console.log("props", Object.keys(elementProps).length);
  return (
    <div>
      <div className={classes.viewContainer} id="viewer-container"></div>
      <BuildrsToolBar fileOpen={fileOpen} onClickShare={onClickShare} />
      <div className={classes.searchContainer}>
        <SearchInput
          onClickMenu={() => setOpenLeft(!openLeft)}
          disabled={Object.keys(ifcElement).length === 0}
        />
      </div>
      <div className={classes.elementsButton}>
        <MenuButton
          onClick={() => setOpenRight(!openRight)}
          disabled={Object.keys(elementProps).length === 0}
          open={openRight}
        />
      </div>

      {openLeft ? (
        <div>
          <ElementsTree
            viewer={viewer}
            ifcElement={ifcElement}
            onElementSelect={onElementSelect}
            elementProps={elementProps}
          />
        </div>
      ) : null}
      {openRight ? (
        <div
          style={{
            position: "absolute",
            top: 140,
            right: 50,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Info elementProps={elementProps} />
        </div>
      ) : null}
    </div>
  );
};

export default CadView;
