import React, {Suspense} from "react";
import {
    Box,
    TextField,
    InputAdornment,
    Button,
    CircularProgress
} from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import ArticleList from './components/article/ArticleList'


export const Home = () => {
    const [search, setSearch] = React.useState("");

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
                <Box>
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
                    <Button onClick={() => {
                    }}>Search</Button>
                </Box>
                <Box sx={{px: 2, border: "1px solid red"}}>
                    <p>Task 2: Implement pagination</p>
                </Box>
            </Box>
            <div>
                <Suspense fallback={<CircularProgress/>}>
                    <ArticleList search={search}/>
                </Suspense>
            </div>

        </>
    );
};
