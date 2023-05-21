import { useState } from "react";
import classes from "./game.module.css";

type Input = "O" | "X";

const cases = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const position = ["r", "r", "r", "c", "c", "c", "dl", "dr"];

const Game = () => {
  const [value, setValue] = useState(Array.from({ length: 10 }, () => ""));
  const [strike, setStrike] = useState(Array.from({ length: 10 }, () => false));
  const [digit, setDigit] = useState<Input>("X");
  const [pos, setPos] = useState("");
  const [winner, setWinner] = useState("");
  const [open, setOpen] = useState(false);

  let classPos;
  const handleStart = () => {
    window.location.reload();
  };
  const handleClick = (index: number) => {
    let row: number[];
    let indexation: number;
    let win: string;
    let popup: boolean;
    let count = 0;

    setValue((prevValue) => {
      if (prevValue[index] === "") {
        const newValue = [...prevValue];
        newValue[index] = digit;
        for (let i = 0; i < 8; i++) {
          const curr = cases[i];
          if (
            newValue[curr[0]] !== "" &&
            newValue[curr[0]] === newValue[curr[1]] &&
            newValue[curr[1]] === newValue[curr[2]]
          ) {
            row = curr;
            indexation = i;
            win = newValue[curr[0]];
            popup = true;
            break;
          }
        }

        if(!popup){
            for (let i = 1; i < 10; i++) {
                if(newValue[i] !== "") count++;
            }
            if(count === 9) popup = true;
        }
        return newValue;
      }
      return prevValue;
    });

    setStrike((prevStrike) => {
      if (row !== undefined && row.length === 3) {
        const newStrike = [...prevStrike];
        for (let i = 0; i < row.length; i++) {
          newStrike[row[i]] = true;
        }
        return newStrike;
      }
      return prevStrike;
    });

    setPos((prevPos) => {
      if (indexation !== undefined) return position[indexation];
      return prevPos;
    });

    setWinner((prev) => {
      if (win !== undefined) return win;
      return prev;
    });

    setTimeout(() => {
      setOpen(() => {
        if (popup === true) return true;
        return false;
      });
    }, 500);

    setDigit((prevDigit) => {
      const newDigit = prevDigit === "O" ? "X" : "O";
      return newDigit;
    });
  };

  if (pos === "r") classPos = classes.line;
  else if (pos === "c") classPos = classes.straight;
  else if (pos === "dl") classPos = classes.diagonalLeft;
  else if (pos === "dr") classPos = classes.diagonalRight;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}>TIC TAC TOE</div>
        <div className={classes.row}>
          <div className={classes.column}>
            {strike[1] && <div className={classPos}></div>}
            <input
              className={classes.block}
              defaultValue={value[1]}
              onClick={() => handleClick(1)}
            />
          </div>
          <div className={classes.column}>
            {strike[2] && <div className={classPos}></div>}
            <input
              className={classes.block}
              defaultValue={value[2]}
              onClick={() => handleClick(2)}
            />
          </div>
          <div className={classes.column}>
            {strike[3] && <div className={classPos}></div>}
            <input
              className={classes.block}
              defaultValue={value[3]}
              onClick={() => handleClick(3)}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            {strike[4] && <div className={classPos}></div>}
            <input
              className={classes.block}
              defaultValue={value[4]}
              onClick={() => handleClick(4)}
            />
          </div>
          <div className={classes.column}>
            {strike[5] && <div className={classPos}></div>}
            <input
              className={classes.block}
              defaultValue={value[5]}
              onClick={() => handleClick(5)}
            />
          </div>
          <div className={classes.column}>
            {strike[6] && <div className={classPos}></div>}
            <input
              className={classes.block}
              defaultValue={value[6]}
              onClick={() => handleClick(6)}
            />
          </div>
        </div>
        <div className={classes.row}>
          <div className={classes.column}>
            {strike[7] && <div className={classPos}></div>}
            <input
              className={classes.block}
              defaultValue={value[7]}
              onClick={() => handleClick(7)}
            />
          </div>

          <div className={classes.column}>
            {strike[8] && <div className={classPos}></div>}
            <input
              className={classes.block}
              defaultValue={value[8]}
              onClick={() => handleClick(8)}
            />
          </div>
          <div className={classes.column}>
            {strike[9] && <div className={classPos}></div>}
            <input
              className={classes.block}
              defaultValue={value[9]}
              onClick={() => handleClick(9)}
            />
          </div>
        </div>
      </div>
      {open && (
        <div className={classes.modal}>
          <div className={classes.content}>
            <div className={classes.text}>Match Finished</div>
            {winner === "" ? <div className={classes.bold}>Oops!! Draw</div> : <div className={classes.bold}>Well Done!!! Winner is {winner}</div>}
            <div className={classes.text}>Play Again</div>
            <button onClick={handleStart} className={classes.restart}>Start Again</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Game;
