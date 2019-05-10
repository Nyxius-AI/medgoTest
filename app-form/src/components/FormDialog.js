import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default class FormDialog extends React.Component {
  state = {
    open: false,
  };

  open = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
    <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-label="form-dialog-title"
    >
        <DialogContent>
            <DialogContentText>Mail successfully send</DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={this.handleClose} color="primary">
            Ok
        </Button>
        </DialogActions>
    </Dialog>
    );
  }
}