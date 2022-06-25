import React from 'react'
import ListItem from '../../design-system/List/ListItem'
import ListItemBody from '../../design-system/List/ListItemBody'
import ListItemHeader from '../../design-system/List/ListItemHeader'
import ListItemMedia from '../../design-system/List/ListItemMedia'
import { Article } from "../../api";

type Props = {
    item: Article
}

export default ({item} : Props) => {
    return(
        <ListItem id={item.id}
                  header={<ListItemHeader title={item.title} subheader={item.publishedAt} imageUrl={item.imageUrl}/>}
                  body={<ListItemBody summary={item.summary} title={item.title}/>}
                    media={<ListItemMedia imageUrl={item.imageUrl} />}
        />
    )
}
