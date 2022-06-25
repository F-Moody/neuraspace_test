import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Box,
    CardMedia,
    CardHeader,
    Avatar,
    TextField,
    InputAdornment,
    Button,
} from "@mui/material";
import { Api, Article } from "./api";
import SearchRounded from "@mui/icons-material/SearchRounded";

const client = new Api();

export const Home = () => {
    const [search, setSearch] = React.useState("");
    const [articles, setArticles] = React.useState<Article[]>([]);

    const getArticles = React.useCallback(() => {
        client.articles
            .articlesList({
                title_contains: search,
            })
            .then(({ data }) => {
                setArticles(data);
            });
    }, []);

    React.useEffect(() => {
        getArticles();
    }, []);

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
                                    <SearchRounded />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                    />
                    <Button onClick={() => getArticles()}>Search</Button>
                </Box>
                <Box sx={{ px: 2, border: "1px solid red" }}>
                    <p>Task 2: Implement pagination</p>
                </Box>
            </Box>
            <div>
                {articles.map((article) => (
                    <Card
                        key={article.id}
                        sx={{ display: "flex", flexDirection: "column", mb: 2 }}
                    >
                        <CardHeader
                            sx={{
                                display: "flex",
                                flex: 1,
                            }}
                            avatar={<Avatar src={article.imageUrl} />}
                            title={article.newsSite}
                            subheader={article.publishedAt}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                flex: 1,
                                flexDirection: "row",
                            }}
                        >
                            <CardContent sx={{ flex: "1" }}>
                                <Typography component="div" variant="h5">
                                    {article.title}
                                </Typography>
                                <Typography component="div">
                                    {article.summary}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                sx={{
                                    height: 128,
                                    maxWidth: 128,
                                    padding: 2,
                                    objectFit: "cover",
                                }}
                                image={article.imageUrl}
                            />
                        </Box>
                    </Card>
                ))}
            </div>
        </>
    );
};
