import React from 'react'
import {CardContent, Typography} from "@mui/material";

type Props = {
    title?: string,
    summary?: string
}

export default ({title, summary}: Props) => {
    return (
        <CardContent sx={{flex: "1"}}>
            <Typography component="div" variant="h5">
                {title}
            </Typography>
            <Typography component="div">
                {summary}
            </Typography>
        </CardContent>
    )
}
