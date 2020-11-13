import React from 'react';
import config from '../../config/config.json';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import EditTagDialog from '../editTagDialog';

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
        backgroundColor: "blue",
        color: "black",
        width: 300,
    }
}));

export default function TagsList(props) {
    const classes = useStyles();
    const tags = props.tags;
    const loadTagsData = props.loadData;

    function handleDelete(tagId) {
        fetch(`${config.uriPath}/tags/${tagId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                loadTagsData();
            })
    }

    return (
        <Grid>
            {tags.map(tag => (
                <Grid item key={tag.tag_content}>
                    <Typography style={{ marginTop: 20 }} variant="h4" component="h4" className={classes.typography}>{tag.tag_content}</Typography>
                    <EditTagDialog tag={tag} loadData={loadTagsData}/>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(tag.tag_id)}>Delete</Button>
                </Grid>
            ))}
        </Grid>
    );
}