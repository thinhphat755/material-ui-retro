import React, { useState } from 'react';
import config from '../../config/config.json';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [usernameText, setUsernameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const history = useHistory();
    const isAuth = localStorage.getItem("isAuth");
    const handleChangeLoginStatus = props.handleChangeLoginStatus;
    console.log(isAuth);
    // if(isAuth === "true") {
    //     history.push('/');
    // }

    const handleUsernameChange = (e) => {
        setUsernameText(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordText(e.target.value);
    }

    function handleSubmit(e) {
        fetch(`${config.uriPath}/auth/login`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": usernameText,
                "password": passwordText
            })
        }).then(resp => resp.json())
            .then(data => {
                if (data.code === 0) {
                    localStorage.setItem("userID", data.result.user.id);
                    localStorage.setItem("name", data.result.user.name);
                    localStorage.setItem("username", data.result.user.username);
                    localStorage.setItem("isAuth", true);
                    //console.log(localStorage.getItem("Username"));
                    window.alert('Login succesfully!');
                    handleChangeLoginStatus();
                    history.push('/');
                } else if (data.code === -1) {
                    window.alert('Username or password is not correct. Please try again!');
                } else if (data.code === -2) {
                    window.alert('Account has not been existed!');
                } else {
                    window.alert('Invalid input!');
                }
            })

        e.preventDefault();
    }

    const responseSuccessGoogle = (response) => {
        fetch(`${config.uriPath}/auth/googleLogin`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "tokenId": response.tokenId
            })
        }).then(response => response.json())
            .then(data => {
                if (data.code === 0) {
                    localStorage.setItem("userID", data.result.user.id);
                    localStorage.setItem("name", data.result.user.name);
                    localStorage.setItem("username", data.result.user.username);
                    localStorage.setItem("isAuth", true);
                    //console.log(localStorage.getItem("Username"));
                    window.alert('Login succesfully!');
                    handleChangeLoginStatus();
                    history.push('/');
                } else {
                    window.alert('Something went wrong. Please try again!');
                }
            })
    }

    const responseFailGoogle = (response) => {

    }

    const responseSuccessFacebook = (response) => {
        console.log(response);
        fetch(`${config.uriPath}/auth/facebookLogin`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": response.email,
                "userid": response.id,
                "name": response.name
            })
        }).then(response => response.json())
            .then(data => {
                if (data.code === 0) {
                    localStorage.setItem("userID", data.result.user.id);
                    localStorage.setItem("name", data.result.user.name);
                    localStorage.setItem("username", data.result.user.username);
                    localStorage.setItem("isAuth", true);
                    //console.log(localStorage.getItem("Username"));
                    window.alert('Login succesfully!');
                    handleChangeLoginStatus();
                    history.push('/');
                } else {
                    window.alert('Something went wrong. Please try again!');
                }
            })
    }

    const responseFailureFacebook = (response) => {

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form method="POST" className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="userName"
                        label="Username"
                        name="username"
                        onChange={handleUsernameChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handlePasswordChange}
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/signup" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                    <GoogleLogin
                        clientId="173799481794-v2vsrs8kpadgubisec0tlkpl0474ful1.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={responseSuccessGoogle}
                        onFailure={responseFailGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <FacebookLogin
                        buttonText="Login with Facebook"
                        appId="404397187635613"
                        autoLoad={true}
                        fields="name,email,picture"
                        onFailure={responseFailureFacebook}
                        callback={responseSuccessFacebook} />
                </form>
            </div>
        </Container>
    );
}