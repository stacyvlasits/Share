import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    color: "WhiteSmoke",
    fontSize: 20,
    marginRight: "20px",
  },
}));

const Row = ({ firstColumn, secondColumn }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: 500,
        justifyContent: "flex-start",
        fontSize: 12,
        marginBottom: 5,
      }}
    >
      <div
        style={{
          minWidth: 140,
          marginRight: 20,
          border: "1px solid lightGray",
        }}
      >
        {firstColumn}
      </div>
      <div style={{ minWidth: 300, border: "1px solid lightGray" }}>
        {secondColumn}
      </div>
    </div>
  );
};

const Info = (elementProps) => {
  elementProps = elementProps.elementProps;
  let serial = 0;
  return (
    <table>
      <tbody>
        {Object.keys(elementProps).map((key) => {
          console.log("key", key);
          if (JSON.stringify(elementProps[key])) {
            return (
              <Row
                firstColumn={key}
                secondColumn={JSON.stringify(elementProps[key])}
              />
            );
          }
        })}
      </tbody>
      <Row />
    </table>
  );
};

export { Info };

// const Info = (elementProps) => {
//   elementProps = elementProps.elementProps;
//   let serial = 0;
//   return (
//     <table>
//       <tbody>
//         {Object.keys(elementProps).map((key) => (
//           <tr key={serial++}>
//             <td>{key}</td>
//             <td>{JSON.stringify(elementProps[key])}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export { Info };
