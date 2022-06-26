import React from 'react'
import ListItem from '../../design-system/List/ListItem'
import ListItemBody from '../../design-system/List/ListItemBody'
import ListItemHeader from '../../design-system/List/ListItemHeader'
import ListItemMedia from '../../design-system/List/ListItemMedia'
import {Article} from "../../api/api";
import {useArticleContext} from "../../context/context";

type Props = {
    item: Article
}

export default ({item}: Props) => {
    const {favourites, toggleFavourite} = useArticleContext()
    const isFavouriteItem = !!favourites[item.id!.toString()]

    const toggleWrapper = () => toggleFavourite(item.id!)
    return (
        <ListItem id={item.id}
                  header={<ListItemHeader title={item.title}
                                          subheader={item.publishedAt}
                                          imageUrl={item.imageUrl}
                                          favourite={isFavouriteItem}
                                          onFavouriteCb={toggleWrapper}

                  />}
                  body={<ListItemBody summary={item.summary} title={item.title}/>}
                  media={<ListItemMedia imageUrl={item.imageUrl}/>}
        />
    )
}
