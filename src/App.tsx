import {
    AppBar,
    Box,
    Container,
    createTheme,
    CssBaseline,
    MenuItem,
    ThemeProvider,
    Toolbar,
    Typography,
} from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./Home";

const mdTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export const App = () => {
    return (
        <ThemeProvider theme={mdTheme}>
            <BrowserRouter>
                <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <AppBar>
                        <Toolbar component="nav">
                            <MenuItem>
                                <Typography textAlign="center">
                                    <Link to="/" style={{ color: "white" }}>
                                        Home
                                    </Link>
                                </Typography>
                            </MenuItem>
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            height: "100vh",
                            overflow: "auto",
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </Container>
                    </Box>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    );
};
