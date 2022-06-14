import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Button from "@mui/material/Button";

export default function DeleteConfirmationDialog(props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.title}
            </DialogTitle>
            <DialogContent>
                {props.children}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onCancel}>
                    Cancel
                </Button>
                <Button onClick={props.onConfirm} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
