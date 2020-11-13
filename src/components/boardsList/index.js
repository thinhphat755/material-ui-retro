import React, { useState, useEffect } from 'react';
import config from '../../config/config.json';
import Board from '../boards/index';
import AddBoardDialog from '../addBoardDialog/index';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router';
//import { Link } from 'react-router-dom';

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
	breadCrumbsBlock: {
		display: 'flex',
		marginLeft: 800,
	},
	link: {
		display: 'flex',
		marginRight: 10,
	},
	iconForBreadSrum: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
}));

//const cards = [1, 2, 3, 4, 5, 6, 7, 8];

export default function BoardsList() {
	const classes = useStyles();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [boards, setBoards] = useState([]);
	const isAuth = localStorage.getItem("isAuth");
	const userID = localStorage.getItem("userID");
	//const userID = user.id;
	const history = useHistory();

	if (isAuth === "null" || isAuth === "false") {
		history.push('/signin');
	}

	// Note: the empty deps array [] means
	// this useEffect will run once
	// similar to componentDidMount()
	useEffect(() => {
		// console.log(isAuth);
		// console.log(userID);
		loadData();
		loadData().catch(error => {
			error.message();
		});
	}, [])

	const loadData = async () => {

		fetch(`${config.uriPath}/boards`, {
			headers: {
				'Content-Type': 'application/json',
				"userID": userID
			},
				//userID: userID
        }).then(resp => resp.json())
            .then(data => {
                if(data.code === 0){
                    // localStorage.setItem("Username", data.result.user.id);
                    // localStorage.setItem("isAuth", true);
                    //console.log(localStorage.getItem("Username"));
                    //window.alert('Login succesfully!');
                    // handleChangeLoginStatus();
					//history.push('/');
					setBoards(data.results);
                }else{
                    window.alert('Can not load your data!. Please try again!');
				}
            })

		// const response = await fetch("http://localhost:5000/boards");

		// if (!response.ok) {
		// 	const message = `An error has occured: ${response.status}`;
		// 	// throw new Error(message);
		// 	alert(message);
		// }

		// const results = await response.json();
		// setBoards(results);
		// setLoading(false);
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
					onClickDelete={handleDelete}
					loadData={loadData} />
			);
		}
	});

	function handleDelete(boardId) {
		fetch(`${config.uriPath}/boards/${boardId}`, {
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

			<Container className={classes.cardGrid} maxWidth="lg">
				<Grid container spacing={4} alignItems="flex-end">
					{boardElement}
					<Grid item xs={12} sm={4} md={4}>
						<AddBoardDialog loadData={loadData} />
					</Grid>
				</Grid>
			</Container>
		</main>
	);
}