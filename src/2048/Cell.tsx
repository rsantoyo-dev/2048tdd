import React from 'react';
import {Box,Typography } from "@mui/material";

type CellProps = {
    value: number,

}

const colors: Array<{ val: number, color: string }> = [{val: 0, color: "#ffffff"},
    {val: 2, color: "#ddffee"}, {val: 4, color: "#ccddaa"}, {val: 8, color: "#aacc99"},
    {val: 16, color: "#aabb99"}, {val: 32, color: "#bbbb99"}, {val: 64, color: "#ccbb99"},
    {val: 128, color: "#ddffaa"}, {val: 256, color: "#ccddcc"}, {val: 512, color: "#aaccdd"},
    {val: 1024, color: "#ddff99"}, {val: 2048, color: "#ccdd55"}];


const Cell= (props:CellProps) => {
    return (
        <Box bgcolor={colors.filter(x => (x.val === props.value))[0]?.color} p={1} display={"flex"}
             flexGrow={1}
             width={50}
             height={50}
             justifyContent={"center"}
             alignItems={"center"}>
            {( props.value > 0) && <Typography variant={"subtitle2"}>{ props.value}</Typography>}
        </Box>
    );
};

export default Cell;