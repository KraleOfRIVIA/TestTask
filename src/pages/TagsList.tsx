import { FC, useContext, useEffect } from 'react';
import TagElement from "../components/TagElement.tsx";
import { Context } from "../main.tsx";
import { observer } from "mobx-react-lite";
import { Grid, Typography } from "@mui/material";


const TagsList: FC = () => {
    const { store } = useContext(Context);

    useEffect(() => {
        const storedData = localStorage.getItem('tags');
        if (storedData) {
            store.setTags(JSON.parse(storedData));
        } else {
            store.getTags();
        }
    }, []); // Добавляем tags и store в массив зависимостей
    return (
        <>
            <Typography variant="h5">{}</Typography>
            <Grid container spacing={2}>
                {store.tags.map((item) => (
                 <TagElement
                 key = {item.id}
                 name = {item.name}
                 quoteCount = {item.quoteCount}
                 />
                ))}
            </Grid>
        </>
    );
};

export default observer(TagsList);
