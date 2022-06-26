import React from 'react'
import {Box, Card} from "@mui/material";


type Props = {
    header: JSX.Element,
    body: JSX.Element,
    media: JSX.Element,
    id?: number
}

export default ({header, body, media, id}: Props) => {
    return (<Card
        key={id}
        sx={{display: "flex", flexDirection: "column", mb: 2}}
    >
        {header}
        <Box
            sx={{
                display: "flex",
                flex: 1,
                flexDirection: "row",
            }}
        >
            {body}
            {media}
        </Box>
    </Card>)
}
