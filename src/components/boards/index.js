import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import EditBoardDialog from '../editBoardDialog';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    additionCard: {
        height: (150),
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    }
}));

export default function Board(props) {
    const classes = useStyles();
    const board = props.boardItem;
    const onClickDelete = props.onClickDelete;
    //const onClickBoard = props.onClickBoard;
    const loadData = props.loadData;

    const handleDelete = () => {
        onClickDelete(board.id);
    };

    function handleShare(){
        const id = board.id;
        fetch(`http://localhost:5000/boards/share/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        }).then(resp => resp.json())
            .then(data => {
                if(data.code === 0){
                    alert('Board has been shared to everyone. Now they can join in and edit with you!');
                } else{
                    alert('Ohh! Something went wrong...');
                }
            })
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined" className={classes.card}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/boards/${board.id}`}>
                <CardActionArea>
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {board.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {board.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                </Link>
                <CardActions >
                    <Button onClick={handleShare} variant="outlined" size="small" color="primary">
                        Share
                    </Button >
                    <Button onClick={handleDelete} variant="outlined" size="small" color="primary">
                        Delete
                    </Button >

                    <EditBoardDialog board={board} loadData={loadData} />
                </CardActions>
            </Card>
        </Grid>
    );
}