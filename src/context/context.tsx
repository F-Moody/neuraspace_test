import React, {createContext, useCallback, useContext, useMemo} from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type Props = {
    children: JSX.Element | JSX.Element[] | undefined;
}

type ContextValue = {
    favourites: { [key in string]: string },
    toggleFavourite: (id: number) => void
}

const initialValue: ContextValue = {
    favourites: {},
    toggleFavourite: (id) => {
    }
}
export const ArticleContext = createContext(initialValue)
export const useArticleContext = () => useContext(ArticleContext)

export default ({children}: Props) => {
    const [favourites, setFavourites] = useLocalStorage("favoriteContext", {})

    const toggleFavourite = useCallback((id: number) => {
        const idString = id.toString()
        if (favourites[idString]) {
            const newFav = {...favourites}
            delete newFav[idString]
            setFavourites(newFav)
        } else setFavourites((favourites: {}) => ({...favourites, [idString]: true}))

    }, [setFavourites, favourites])

    const memoValue = useMemo(() => ({favourites, toggleFavourite}), [favourites, toggleFavourite])

    return (
        <ArticleContext.Provider value={memoValue}>
            {children}
        </ArticleContext.Provider>
    )
}
