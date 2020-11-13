import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function UserProfile(props) {
    const classes = useStyles();
    const name = props.name;
    const username = props.username;
    const isAuth = localStorage.getItem("isAuth");
    const [nameText, setNameText] = useState(name);
    const [passwordText, setPasswordText] = useState('');
    const userID = localStorage.getItem("userID");
    let history = useHistory();

    if (isAuth === "null" || isAuth === "false") {
        history.push('/signin');
    }

    const handleNameChange = (e) => {
        setNameText(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordText(e.target.value);
    }

    function handleCancel() {
        history.push('/');
    }

    function handleEditProfile(){
        props.handleEditProfile(nameText);
    }

    function handleSubmit(e) {
        fetch(`http://localhost:5000/users`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "userID": userID
            },
            body: JSON.stringify({
                "name": nameText,
                "password": passwordText
            })
        }).then(resp => resp.json())
            .then(data => {
                console.log(data);
                if (data.code === 0) {
                    history.push('/');
                    handleEditProfile();
                    alert("Update profile successfully!");

                } else {
                    alert('Update failed. Please fill out password fields to update!');
                }

                //loadData();
                //setOpen(false);
            })

        e.preventDefault();
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                <form method='PUT' className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="username"
                                variant="outlined"
                                fullWidth
                                defaultValue={username}
                                disabled
                                id="username"
                                label="Username"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                autoComplete="fname"
                                name="fullname"
                                variant="outlined"
                                required
                                fullWidth
                                defaultValue={nameText}
                                id="fullName"
                                label="Full Name"
                                onChange={handleNameChange}
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={handlePasswordChange}
                                autoComplete="current-password"
                            />
                        </Grid>
                        {/* <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="I want to receive inspiration, marketing promotions and updates via email."
                            />
                        </Grid> */}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        </Container>
    );
}