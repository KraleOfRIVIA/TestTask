import { FC, useContext, useEffect } from 'react';
import QuatableCard from "../components/QuatableCard.tsx";
import { Context } from "../main.tsx";
import { observer } from "mobx-react-lite";
import { Grid, Typography } from "@mui/material";
import {useParams} from "react-router-dom";



const TagsPage: FC = () => {
    const { store } = useContext(Context);
    const { name = '' } = useParams<{ name?: string }>();
    useEffect(() => {
        // Попытка извлечь данные из локального хранилища для конкретного тега
        const storedData = localStorage.getItem(`quatableWithTags_${name}`);
        if (storedData) {
            // Если данные по тегу есть в хранилище, используем их, преобразовав из строки в объект
            store.setQuatableByTag(name, JSON.parse(storedData));
        } else {
            // В противном случае запрашиваем данные по тегу
            store.getQuatableByTag(name);
        }
    }, [name, store]); // Добавляем tags и store в массив зависимостей

    const quatables = store.quatableByTag[name] || []; // Получаем цитаты по тегу или пустой массив

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
