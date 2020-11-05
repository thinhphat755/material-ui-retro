import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditBoardDialog(props) {
    const [board, setBoard] = React.useState(props.board);
    
    const loadData = props.loadData;
    const [open, setOpen] = React.useState(false);
    const [nameText, setNameText] = React.useState(board.name);
    const [descriptionText, setDescriptionText] = React.useState(board.description);

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
        const id = board.id;
        fetch(`http://localhost:5000/boards/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "boardName": nameText,
                "description": descriptionText,
            })
        }).then(resp => resp.json())
            .then(data => {
                console.log(data);
                loadData();
                setBoard(data);
                setOpen(false);
            })

        e.preventDefault();
    }

    return (
        <div>
            <Button variant="outlined" size="small" color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit board</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit a board, please fill out board's name in the box.
                    </DialogContentText>
                    <form method="PUT" onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            defaultValue={board.name}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            onChange={handleNameChange}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            defaultValue={board.description}
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
                                Edit
                            </Button>
                        </DialogActions>
                    </form>

                </DialogContent>

            </Dialog>
        </div>
    );
}
