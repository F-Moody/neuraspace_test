import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App";
import {QueryClient, QueryClientProvider} from 'react-query'
import ArticleContext from "./context/context";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
})

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ArticleContext>
                <App/>
            </ArticleContext>
        </QueryClientProvider>
    </React.StrictMode>
);
