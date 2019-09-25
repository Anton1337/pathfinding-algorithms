import React, { useState } from "react";
import ReactDOM from "react-dom";

import gridData from "./data";
import breadtFirst from "./search-algorithms/breadtFirst";

import "./styles.css";
import { delay } from "q";

const squareColor = sqr => {
  switch (sqr) {
    default:
      return "";
    case 1:
      return "green";
    case 2:
      return "red";
    case 3:
      return "gray";
    case 4:
      return "blue";
    case 5:
      return "yellow";
  }
};

const App = () => {
  const [squares, setSquares] = useState(gridData);

  const search = async grid => {
    const success = breadtFirst(grid);
    console.log(success);
    if (success) {
      const { explored, goalPath } = success;
      // Show explored squares.
      await Promise.all(
        Array.from(
          { length: explored.length },
          (_, i) =>
            new Promise(res =>
              setTimeout(() => {
                const tempSqr = [...squares];
                const len = tempSqr[0].length;
                for (let j = 0; j < len; j++) {
                  for (let k = 0; k < len; k++) {
                    if (
                      tempSqr[j][k].id === explored[i] &&
                      tempSqr[j][k].type !== 1 &&
                      tempSqr[j][k].type !== 2
                    ) {
                      tempSqr[j][k].type = 4;
                      setSquares(tempSqr);
                    }
                  }
                }
                res();
              }, 30 * (i + 1))
            )
        )
      );
      // Show nearest path.
      for (let i = 0; i < goalPath.length; i++) {
        setTimeout(() => {
          const tempSqr = [...squares];
          const len = tempSqr[0].length;
          for (let j = 0; j < len; j++) {
            for (let k = 0; k < len; k++) {
              if (
                tempSqr[j][k].id === goalPath[i] &&
                tempSqr[j][k].type !== 1 &&
                tempSqr[j][k].type !== 2
              ) {
                tempSqr[j][k].type = 5;
                setSquares(tempSqr);
              }
            }
          }
        }, 40 * (i + 1));
      }
    }
  };

  const resetGrid = () => {
    console.log("reset.");
    setSquares(gridData);
  };

  return (
    <div className="App">
      <h1>Search visualization</h1>
      <h2>Press "Search" to start searching!</h2>
      {squares.map(row => {
        return (
          <div key={row[0].id}>
            {row.map(sqr => {
              return (
                <div
                  key={sqr.id}
                  style={{
                    backgroundColor: squareColor(sqr.type)
                  }}
                  className="square"
                />
              );
            })}
          </div>
        );
      })}
      <button onClick={() => search(squares)}>Search</button>
      <button onClick={() => resetGrid()}>Reset Grid</button>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
