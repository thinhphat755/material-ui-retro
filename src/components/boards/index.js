import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
//import Container from '@material-ui/core/Container';
//import AddIcon from '@material-ui/icons/AddCircle';
//import AddBoardDialog from '../addBoardDialog';
//import Box from '@material-ui/core/Box';
//import './user.css';

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

    const handleDelete = () => {
        onClickDelete(board.id);
    };

    return (
        <Grid item xs={12} sm={4} md={4}>
            <Card variant="outlined" className={classes.card}>
                <CardActionArea >
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {board.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {board.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button variant="outlined" size="small" color="primary">
                            Share
                        </Button >
                        <Button onClick={handleDelete} variant="outlined" size="small" color="primary">
                            Delete
                        </Button >
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

// function Board() {
//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [boards, setBoards] = useState([]);

//     // Note: the empty deps array [] means
//     // this useEffect will run once
//     // similar to componentDidMount()
//     useEffect(() => {
//         fetch("http://localhost:5000/boards")
//             .then(res => res.json())
//             .then(
//                 (result) => {
//                     setIsLoaded(true);
//                     setBoards(result);
//                 },
//                 // Note: it's important to handle errors here
//                 // instead of a catch() block so that we don't swallow
//                 // exceptions from actual bugs in components.
//                 (error) => {
//                     setIsLoaded(true);
//                     setError(error);
//                 }
//             )
//     }, [])

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//         return <div>Loading...</div>;
//     } else {
//         return (
//             <ul>
//                 {boards.map(board => (
//                     <li key={board.id}>
//                         {board.name} {board.content}
//                     </li>
//                 ))}
//             </ul>
//         );
//     }
// }

//export default Board;