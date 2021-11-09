import React, {useState} from 'react';

import {move, flipGrid, newGame, rotateGrid, isGameOver} from "./GridManager";
import Cell from "./Cell";
import {Box, Button} from "@mui/material";



const TfeGame = () => {
    const [game, setGame] = useState<number[][]>([]);
    const [gameOver, setGameOver] = useState<boolean>(false);

    function onClickDirection(number: number) {

        switch (number) {
            case 0:
                setGame(move(game))
                setGameOver(isGameOver(game))
                return;
            case 1:  //up
                setGame(rotateGrid(move(rotateGrid(game))))
                setGameOver(isGameOver(game))
                return;
            case 2: //down
                setGame(rotateGrid(flipGrid(move(flipGrid(rotateGrid(game))))))
                setGameOver(isGameOver(game))
                return;
            case 3: //right
                setGame(flipGrid(move(flipGrid(game))))
                setGameOver(isGameOver(game))
                return;
        }
    }


    return (
        <div>
            <Box>
                <Button onClick={() => setGame(newGame(4))}>new Game</Button>
            </Box>
            <Box>
                game {gameOver ? "over" : "active"}
            </Box>
            <Box>
                <Button onClick={() => onClickDirection(0)}>left</Button>
                <Button onClick={() => onClickDirection(1)}>Up</Button>
                <Button onClick={() => onClickDirection(2)}>down</Button>
                <Button onClick={() => onClickDirection(3)}>right</Button>
            </Box>
            <Box width={"500px"} height={"500px"} display={"flex"} flexDirection={"column"}>
                {game.map((x, i) =>
                    <Box key={i} display={"flex"}  flexDirection="row">
                        {game[i].map((cell, j) =>
                            <Box key={j} bgcolor="lightgray"  p={0.5}>
                                <Cell value={cell}/>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </div>
    );
};

export default TfeGame;

