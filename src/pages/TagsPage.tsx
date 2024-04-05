import {FC, useContext, useEffect} from 'react';
import QuatableCard from "../components/QuatableCard.tsx";
import {Context} from "../main.tsx";
import {observer} from "mobx-react-lite";
import {Grid, Typography} from "@mui/material";

interface TagsProps {
    tags: string
}
const TagsPage: FC<TagsProps> = ({tags}) => {
    const {store} = useContext(Context)

    useEffect(() => {
        const storedData = localStorage.getItem('quatableWithTags');
        console.log('Хранимые данные:', storedData);
        if (!storedData) {
            store.getQuatableByTag(tags);
        } else {
            store.setQuatableByTag(JSON.parse(storedData));
        }
    }, []);

    return (
        <>
            <Typography variant="h5">{tags}</Typography>
            <Grid container spacing={2}>
                {store.quatableByTag.map((item) => (
                    <QuatableCard
                        key={item._id}
                        _id={item._id}
                        content={item.content}
                        author={item.author}
                        tags={item.tags}
                        isLiked={item.isLiked}
                    />
                ))}
            </Grid>
        </>
    )
}
export default observer(TagsPage);