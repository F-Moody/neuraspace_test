import React from 'react'
import {CardMedia} from "@mui/material";

type Props = {
    imageUrl?: string
}

export default ({imageUrl}: Props) => {
    return (
        <CardMedia
            component="img"
            sx={{
                height: 128,
                maxWidth: 128,
                padding: 2,
                objectFit: "cover",
            }}
            image={imageUrl}
        />
    )
}
