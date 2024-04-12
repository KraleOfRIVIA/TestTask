import { FC, useContext, useEffect } from 'react';
import QuatableCard from "../components/QuatableCard.tsx";
import { Context } from "../main.tsx";
import { Grid, Typography } from "@mui/material";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";



const TagsPage: FC = () => {
    const { store } = useContext(Context);
    const { name = '' } = useParams<{ name?: string }>();
    useEffect(() => {
        const storedData = localStorage.getItem(`quatableWithTags_${name}`);
        if (storedData) {
            store.setQuatableByTag(name, JSON.parse(storedData));
        } else {
            store.getQuatableByTag(name);
        }
    }, [name, store]);

    const quatables = store.quatableByTag[name] || [];

    return (
        <>
            <Typography variant="h5">{name}</Typography>
            <Grid container spacing={2}>
                {quatables.map((item) => (
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
    );
};

export default observer(TagsPage);
