import React from 'react'
import {Avatar, CardHeader, Box} from "@mui/material";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

type Props = {
    imageUrl?: string,
    title?: string,
    subheader?: string,
    favourite: boolean,
    onFavouriteCb: React.MouseEventHandler<SVGSVGElement>
}

export default ({imageUrl, title, subheader, favourite = false, onFavouriteCb}: Props) => {
    return (
        <Box sx={{flexDirection: "row", display: "flex", alignItems: "center"}}>
            <CardHeader
                sx={{
                    display: "flex",
                    flex: 1,
                }}
                avatar={<Avatar src={imageUrl}/>}
                title={title}
                subheader={subheader}
            >

            </CardHeader>
            {favourite ? <StarIcon sx={{cursor: 'pointer'}} onClick={onFavouriteCb}/> :
                <StarBorderIcon sx={{cursor: 'pointer'}} onClick={onFavouriteCb}/>}
        </Box>
    )
}
