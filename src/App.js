import React, { useState } from 'react';
import config from './config/config.json';
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from 'react-router-dom';
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
import SignUp from './components/signup';
import UserProfile from './components/userProfile';

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
		marginLeft: 700,
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
	//const history = useHistory();
	// localStorage.setItem("isAuth", null);
	// localStorage.setItem("Username", null);
	// const isAuth = localStorage.getItem("isAuth");
	let name = localStorage.getItem("name");
	const username = localStorage.getItem("username");
	const id = localStorage.getItem("userID");
	// console.log(isAuth)
	const [loginStatus, setLoginStatus] = useState(false);

	const handleLogout = () => {
		fetch(`${config.uriPath}/auth/logout`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		}).then(resp => resp.json())
			.then(data => {
				if (data.code === 0) {
					localStorage.setItem("userID", null);
					localStorage.setItem("name", null);
					localStorage.setItem("isAuth", false);
					// console.log(isAuth);
					// console.log(username);
					handleChangeLoginStatus();
					window.alert('Log out successfully!');
					//history.push('/signin');
				}
			})
	}

	const handleChangeLoginStatus = () => {
		setLoginStatus(!loginStatus);
	}

	function handleEditProfile(nameChanged) {
		name = nameChanged;
	}

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
								{/* <NavLink exact activeStyle={{ color: 'yellow' }} color="inherit" to="/" className={classes.link}>
									<HomeIcon className={classes.iconForBreadSrum} />
        							Home
      							</NavLink> */}

								{!loginStatus ?
									<NavLink
										exact
										activeStyle={{ color: 'yellow' }}
										color="inherit"
										to="/signin"
										className={classes.link}>
										<AccountIcon className={classes.iconForBreadSrum} />
        									Sign in
								</NavLink> : null}
								{!loginStatus ?
									<NavLink
										exact
										activeStyle={{ color: 'yellow' }}
										color="inherit"
										to="/signup"
										className={classes.link}>
										<AccountIcon className={classes.iconForBreadSrum} />
        									Sign up
								  	</NavLink> : null}
								{loginStatus ?
									<NavLink
										exact
										activeStyle={{ color: 'yellow' }}
										color="inherit"
										to={`/profile`}
										className={classes.link}>
										<AccountIcon className={classes.iconForBreadSrum} />
								  			Hi, {name}
									</NavLink> : null}
								{loginStatus ?
									<NavLink
										exact
										activeStyle={{ color: 'yellow' }}
										color="inherit"
										to="/signin"
										onClick={handleLogout}
										className={classes.link}>
										<AccountIcon className={classes.iconForBreadSrum} />
								  			Sign out
									</NavLink> : null}
								{/* {renderValue} */}

							</Breadcrumbs>
						</Toolbar>
					</AppBar>
					{/* () => (<LoginSide handleChangeLoginStatus={handleChangeLoginStatus}/>) */}
					<main>
						<Switch>
							<Route path="/boards/:id" component={ShowBoard}></Route>
							<Route path='/signup' component={SignUp} />
							<Route path='/signin' component={() => (<LoginSide handleChangeLoginStatus={handleChangeLoginStatus} />)} />
							{/* <Route path='/signout' component={LoginSide} /> */}
							<Route path='/profile' component={() => (<UserProfile name={name} username={username} handleEditProfile={handleEditProfile} />)} />
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
