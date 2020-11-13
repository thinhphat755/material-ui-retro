import React from 'react';
import config from '../../config/config.json';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddTagDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState('');
    const boardId = props.boardId;
    const columnId = props.columnId;
    const loadTagsData = props.loadData;
    // const wentWell = props.tags;

    // const handldClick = (e) => {
    //     console.log(wentWell);
    //     e.preventDefault();
    // }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setContent('');
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {

        fetch(`${config.uriPath}/tags`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "content": content,
                "columnId": columnId,
                "boardId": boardId
            })
        }).then(resp => resp.json())
            .then(data => {
                console.log(data);
                loadTagsData();
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
                <DialogTitle id="form-dialog-title">Create tag</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create a new tag, please fill out tag's content in the box.
                    </DialogContentText>
                    <form method="POST" onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="content"
                            label="Content"
                            variant="outlined"
                            fullWidth
                            onChange={handleContentChange}
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
