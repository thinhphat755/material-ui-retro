import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
//import GridList from '@material-ui/core/GridList';
import Box from '@material-ui/core/Box';
//import './user.css';



export default function Board() {
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9,
            marginTop: '30'
        },
    });

    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [boards, setBoards] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:5000/boards")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setBoards(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Box color="text.primary">
                {boards.map(board => (
                    <Card variant="outlined" className={classes.root} key={board.id}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {board.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {board.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="outlined" size="small" color="primary">
                                    Share
                                </Button>
                            </CardActions>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

        );
    }
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