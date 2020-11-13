import React from 'react';
import config from '../../config/config.json';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditTagDialog(props) {
    const [tag, setTag] = React.useState(props.tag);
    
    const loadTagsData = props.loadData;
    const [open, setOpen] = React.useState(false);
    const [contentText, setContentText] = React.useState(tag.tag_content);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setContentText('');
    };

    const handleContentChange = (e) => {
        setContentText(e.target.value);
    };

    const handleSubmit = (e) => {
        const tagId = tag.tag_id;
        fetch(`${config.uriPath}/tags/${tagId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "newContent": contentText,
            })
        }).then(resp => resp.json())
            .then(data => {
                console.log(data);
                loadTagsData();
                setTag(data);
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
                <DialogTitle id="form-dialog-title">Edit tag</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit a tag, please fill out tag's content in the box.
                    </DialogContentText>
                    <form method="PUT" onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="content"
                            defaultValue={tag.tag_content}
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
                                Edit
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
