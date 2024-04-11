import React from 'react';
import { Grid, Paper, styled, Typography,} from '@mui/material';
import {useNavigate} from "react-router-dom";


interface TagsElementProps {
    name: string;
    quoteCount: number;
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const QuatableCard: React.FC<TagsElementProps> = ({name,quoteCount }) => {
    const navigate = useNavigate();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Item onClick={()=> navigate(`/tags/${name}`)}>

                <Typography> {name} </Typography>
                <Typography>{quoteCount}</Typography>
            </Item>
        </Grid>
    );
};

export default QuatableCard;
