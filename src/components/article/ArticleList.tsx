import React, {useDeferredValue, useTransition} from 'react'
import {Article} from "../../api/api";
import {useQuery} from "react-query";
import {TablePagination} from "@mui/material";
import ListComponent from "../../design-system/List/ListComponent";
import ArticleComponent from "./Article"
import { countArticles, getArticles} from "../../api/apiCalls";


type Props = {
    search: string
}

export default ({search}: Props) => {
    const [page, setPage] = React.useState<number>(1);
    const [rowPerPage, setRowPerPage] = React.useState<number>(10)
    const [pending, startTransition] = useTransition()
    const deferredSearch = useDeferredValue(search)


    const {data: articlesCount} = useQuery('count', countArticles)
    const {data: articles} = useQuery(['articleList', deferredSearch, articlesCount, page, rowPerPage], () => getArticles(page, deferredSearch, rowPerPage))

    const onPageChange = (e: any, page: number) => {
        if(page > 0) {
            startTransition(() => setPage(page))
        }
    }

    const onRowPerPageChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setRowPerPage(+event.target.value)
    }



    return (
        <div>
            <ListComponent style={{opacity : pending ? 0.2 : 1}}>
                {articles?.map((article: Article) => (
                        <ArticleComponent item={article}/>
                ))}

            </ListComponent>
            <TablePagination
                count={articlesCount as number || 1}
                page={articlesCount ? page : 0}
                rowsPerPage={rowPerPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowPerPageChange}
            />
        </div>

    )
}
