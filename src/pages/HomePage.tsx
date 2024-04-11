import {FC, useContext, useEffect} from 'react';
import QuatableCard from "../components/QuatableCard.tsx";
import {Context} from "../main.tsx";
import {observer} from "mobx-react-lite";
import { Grid} from "@mui/material";

const HomePage: FC = () => {
    const {store} = useContext(Context)

    useEffect(() => {
        const storedData = localStorage.getItem('quatable');
        if (storedData) {
            store.setQuatable(JSON.parse(storedData));
        } else {
            store.getQuatable();
        }
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                {store.quatable.map((item) => (
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
export default observer(HomePage);