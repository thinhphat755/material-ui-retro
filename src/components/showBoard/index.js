import React, { useEffect, useState } from 'react';
import config from '../../config/config.json';
import { makeStyles } from '@material-ui/core/styles';
import AddTagDialog from '../addTagDialog/index';
import TagsList from '../tagsList/index';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 280,
    },
    control: {
        padding: theme.spacing(2),
    },
    typography: {
        backgroundColor: "red",
        color: "white",
        width: 300,
    }
}));

export default function ShowBoard({match}) {
    const classes = useStyles();
    const { id } = useParams();  //tương đương match.params.id;
    const [board, setBoard] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const userID = localStorage.getItem("userID");

    const [tags, setTags] = useState([]);

    const wentWellTags = tags.filter((tag) => {
        return (tag.tag_column_id === 1)
    });

    const toImproveTags = tags.filter((tag) => {
        return (tag.tag_column_id === 2)
    });

    const actionItemsTags = tags.filter((tag) => {
        return (tag.tag_column_id === 3)
    });

    useEffect(() => {
        const loadData = () => {
            fetch(`${config.uriPath}/boards/${id}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
                    //userID: userID
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        setBoard(result);
                        //console.log(result);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setError(error);
                        console.log(error);
                    }
                );
            setLoading(false);
        }
        loadData();
    }, [])

    /*Load all tags by board id*/
    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        fetch(`${config.uriPath}/tags/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setTags(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setError(error);
                    console.log(error);
                }
            );
        setLoading(false);
    }
    /*Load all tags by board id*/

    return (
        loading ? null :
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={10}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="h4" component="h4" className={classes.typography}>Went well</Typography>
                                <AddTagDialog boardId={board.id} columnId={1} loadData={loadData}/>
                                <TagsList tags={wentWellTags} loadData={loadData}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="h4" component="h4" className={classes.typography} >To improve</Typography>
                                <AddTagDialog boardId={board.id} columnId={2} loadData={loadData}/>
                                <TagsList tags={toImproveTags} loadData={loadData}/>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="h4" component="h4" className={classes.typography} >Action items</Typography>
                                <AddTagDialog boardId={board.id} columnId={3} loadData={loadData}/>
                                <TagsList tags={actionItemsTags} loadData={loadData}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
    );
}