import React from 'react'
import {Avatar, CardHeader} from "@mui/material";

type Props = {
    imageUrl?: string,
    title?: string,
    subheader?: string
}

export default ({imageUrl, title, subheader} : Props) => {
    return(
        <CardHeader
            sx={{
                display: "flex",
                flex: 1,
            }}
            avatar={<Avatar src={imageUrl} />}
            title={title}
            subheader={subheader}
        />
    )
}
