import {Api} from "./api";
const client = new Api();

export const countArticles = () => client.articles.countList().then(count => count.data)

export const getArticles = (page: number, search: string, rowPerPage: number) => client.articles
    .articlesList({
        title_contains: search,
        _limit: rowPerPage,
        _start: (page * rowPerPage) - rowPerPage,
    })
    .then(({data}) => {
        return data
    });
