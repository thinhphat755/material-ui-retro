import React from 'react';
import config from '../../config/config.json';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddBoardDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [nameText, setNameText] = React.useState('');
    const [descriptionText, setDescriptionText] = React.useState('');
    const loadData = props.loadData;
    // const user = localStorage.getItem("User");
    const userID = localStorage.getItem("userID");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNameText('');
        setDescriptionText('');
    };

    const handleNameChange = (e) => {
        setNameText(e.target.value);
    };

    const handleDesChange = (e) => {
        setDescriptionText(e.target.value);
    }

    const handleSubmit = (e) => {
        fetch(`${config.uriPath}/boards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "userID": userID
            },
            body: JSON.stringify({
                "boardName": nameText,
                "description": descriptionText,
            })
        }).then(resp => resp.json())
            .then(data => {
                console.log(data);
                loadData();
                setOpen(false);
            })

        e.preventDefault();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                New board
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create board</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new board, please fill out board's name in the box.
                    </DialogContentText>
                    <form method="POST" onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            onChange={handleNameChange}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Descripion"
                            variant="outlined"
                            fullWidth
                            onChange={handleDesChange}

                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancel
                        </Button>
                            <Button type="submit" color="primary">
                                Create
                        </Button>
                        </DialogActions>
                    </form>

                </DialogContent>

            </Dialog>
        </div>
    );
}
