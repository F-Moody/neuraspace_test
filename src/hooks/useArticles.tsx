import React from 'react'
import {useQuery} from "react-query";
import {countArticles, getArticles} from "../api/apiCalls";


export const useArticlesCount = () => useQuery('count', countArticles)

export const useArticles = (search: string, articlesCount: number, page: number, rowPerPage: number) => useQuery(['articleList', search, articlesCount, page, rowPerPage], () => getArticles(page, search, rowPerPage))

