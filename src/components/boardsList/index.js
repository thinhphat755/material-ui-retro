import React, { useState, useEffect } from 'react';
import Board from '../boards/index';
import AddBoardDialog from '../addBoardDialog/index';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/Twitter';
//import Card from '@material-ui/core/Card';
//import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://github.com/">
				My Github
      		</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));

//const cards = [1, 2, 3, 4, 5, 6, 7, 8];

export default function BoardsList() {
	const classes = useStyles();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [boards, setBoards] = useState([]);

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		loadData();
	}, [])

	const loadData = () => {
		fetch("http://localhost:5000/boards")
			.then(res => res.json())
			.then(
				(result) => {
					setBoards(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					setError(error);
				}
			);
		setLoading(false);
	}

	const boardElement = boards.map((board) => {
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (loading) {
			return <div>Loading...</div>;
		} else {
			return (
				<Board key={board.id}
					boardItem={board}
					onClickDelete={handleDelete} />
			);
		}
	});

	function handleDelete(itemId) {
		fetch("http://localhost:5000/boards/" + itemId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
		}).then(res => res.json())
			.then(result => {
				console.log(result);
				loadData();
			})
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar position="relative">
				<Toolbar>
					<CameraIcon className={classes.icon} />
					<Typography variant="h6" color="inherit" noWrap>
						Album layout
          			</Typography>
				</Toolbar>
			</AppBar>
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
							Album layout
            			</Typography>
						<Typography variant="h5" align="center" color="textSecondary" paragraph>
							Something short and leading about the collection below—its contents, the creator, etc.
							Make it short and sweet, but not too short so folks don&apos;t simply skip over it
							entirely.
            			</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									<Button variant="contained" color="primary">
										Main call to action
                  					</Button>
								</Grid>
								<Grid item>
									<Button variant="outlined" color="primary">
										Secondary action
                  					</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				{/* End hero unit */}

				<Container className={classes.cardGrid} maxWidth="sm">
					<Grid container spacing={4}>

						{boardElement}

						<Grid item xs={12} sm={4} md={4}>
							{/* <Card variant="outlined" className={classes.additionCard}>
								<CardActionArea display="flex" > */}
									<AddBoardDialog loadData={loadData} />
								{/* </CardActionArea>
							</Card> */}
						</Grid>
					</Grid>
				</Container>
			</main>
			{/* Footer */}
			<footer className={classes.footer}>
				<Typography variant="h6" align="center" gutterBottom>
					Footer
        		</Typography>
				<Typography variant="subtitle1" align="center" color="textSecondary" component="p">
					Something here to give the footer a purpose!
        		</Typography>
				<Copyright />
			</footer>
			{/* End footer */}
		</React.Fragment>
	);
}