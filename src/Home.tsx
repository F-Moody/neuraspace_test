import React, {Suspense} from "react";
import {
    Box,
    TextField,
    InputAdornment,
    CircularProgress
} from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import ArticleList from './components/article/ArticleList'
import {useArticleContext} from "./context/context";


export const Home = () => {
    const [search, setSearch] = React.useState("");
    const {favourites} = useArticleContext()
    const favouritecount = Object.keys(favourites).length

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    mb: 2,
                    justifyContent: "space-between",
                }}
            >
                <Box sx={{display: 'flex', columnGap: "8px"}}>
                    <TextField
                        id="input-with-icon-textfield"
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchRounded/>
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <p>Search</p>

                </Box>
                <Box><p>Favourite articles number : {favouritecount}</p></Box>

            </Box>
            <div>
                <Suspense fallback={<CircularProgress/>}>
                    <ArticleList search={search}/>
                </Suspense>
            </div>

        </>
    );
};
