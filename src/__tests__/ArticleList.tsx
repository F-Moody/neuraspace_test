import React from "react";
import { render, screen } from "@testing-library/react";
import  ArticleList  from "../components/article/ArticleList";
import * as api from "../api/apiCalls";
import {QueryClient, QueryClientProvider} from "react-query";

type ChildrenProps = {
    children: JSX.Element | JSX.Element[] | undefined;
}
const createWrapper = () => {
    const queryClient = new QueryClient()
    return ({ children } :ChildrenProps ) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
test("renders learn react link", () => {
    const searchValue = "Nasa"
    const fetchArticle = jest.spyOn(api, 'getArticles')
    render(<ArticleList search={searchValue} />, {
        wrapper: createWrapper()
    });
    expect(fetchArticle).toBeCalledWith(1, searchValue, 10)

});
