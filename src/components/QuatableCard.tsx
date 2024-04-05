import React, { useState, useEffect, useContext } from 'react';
import {Button, Card, CardContent, Grid, Typography} from '@mui/material';
import { Context } from '../main.tsx';

interface QuatableCardProps {
    _id: string;
    content: string;
    author: string;
    tags: string[];
    isLiked: boolean;
}

const QuatableCard: React.FC<QuatableCardProps> = ({ _id, content, author, tags, isLiked }) => {
    const [liked, setLiked] = useState(isLiked);
    const { store } = useContext(Context);

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);

    const handleLike = () => {
        store.postLike(_id);
        setLiked(!liked);
    };

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ width: '100%', height: '100%' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {content}
                    </Typography>
                    <Typography>
                        {tags}
                    </Typography>
                    <Button onClick={handleLike}>{liked ? 'Удалить лайк' : 'Поставить лайк'}</Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default QuatableCard;
