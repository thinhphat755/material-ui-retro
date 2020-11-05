import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import BoardsList from './components/boardsList';
import LoginSide from './components/login/index';

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CameraIcon from '@material-ui/icons/Twitter';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import AccountIcon from '@material-ui/icons/AccountBox';
import ShowBoard from './components/showBoard';
import LinkUI from '@material-ui/core/Link';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<LinkUI color="inherit" href="https://github.com/">
				My Github
      		</LinkUI>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
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

function App() {
	const classes = useStyles();

	return (
		<Router>
			<React.Fragment>
				<CssBaseline />
				<div className="App">
					<AppBar position="relative">
						<Toolbar>
							<CameraIcon className={classes.icon} />
							<Link to='/'>
								<Typography variant="h6" color="textPrimary" noWrap>
									Retro App
          						</Typography>
							</Link>

							<Breadcrumbs aria-label="breadcrumb" className={classes.breadCrumbsBlock}>
								{/* <Router> */}
								<Link color="inherit" to="/" className={classes.link}>
									<HomeIcon className={classes.iconForBreadSrum} />
        							Home
      							</Link>
								<Link
									color="inherit"
									to="/signin"
									className={classes.link}>
									<AccountIcon className={classes.iconForBreadSrum} />
        							Sign in
      							</Link>
							</Breadcrumbs>
						</Toolbar>
					</AppBar>

					<main>
						<Switch>
							<Route path="/board/:id" component={ShowBoard}></Route>
							<Route path='/signin' component={LoginSide} />
							<Route path='/' component={BoardsList} />
						</Switch>
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
				</div>
			</React.Fragment>
		</Router>
	);
}

export default App;
