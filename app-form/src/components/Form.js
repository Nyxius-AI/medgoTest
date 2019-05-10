import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormDialog from "./FormDialog";
import axios from 'axios';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class MyForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailConfirm: '',
            subject: '',
            content: '',
            emailError: false,
        }
    }

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.email === this.state.emailConfirm && this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            
            //Preapare email object
            const mail = {
                ...this.state
            }
            delete mail.emailError
            delete mail.emailConfirm

            //Send email to server
            axios.post("http://localhost:9000/sendMail", mail, {headers: {'Accept': 'application/json'}})
            .then( res => {
                console.log(res)
                console.log(mail)
                this.refs.dialog.open()
            })
            .catch(err => {
                console.log(err)
            })
            //reset form
            this.setState({
                email: '',
                emailConfirm: '',
                subject: '',
                content: '',
                emailError: false,
            })

        } else {
            this.setState({emailError: true})
            console.log("error")
        }
    }

    onChange = event => {
        this.setState( {[event.target.name] : event.target.value})
    }

    render() {
        const {classes} = this.props

        return (
            <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Typography component="h1" variant="h5">
                Contact us
                </Typography>
                <form className={classes.form} onSubmit={this.handleFormSubmit}>
                <FormControl margin="normal" required fullWidth >
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input error={this.state.emailError} id="email" name="email" onChange={this.onChange} autoComplete="email" value ={this.state.email} autoFocus />
                    {this.state.emailError && <FormHelperText secondary >Email must be valid</FormHelperText> }
                </FormControl>
                <FormControl margin="normal" required fullWidth >
                    <InputLabel htmlFor="email" >Confirm Email Address </InputLabel>
                    <Input error={this.state.emailError} id="emailConfirm" name="emailConfirm" onChange={this.onChange} value ={this.state.emailConfirm} autoComplete="email" />
                    {this.state.emailError && <FormHelperText secondary >Email must be valid</FormHelperText> }
                </FormControl>
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="text">Subject</InputLabel>
                    <Input name="subject" type="text" id="subject" onChange={this.onChange} value ={this.state.subject} />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="text">Content</InputLabel>
                    <Input           
                        id="mail-content"
                        name="content"
                        multiline
                        fullWidth
                        rowsMax="5"
                        rows="5"
                        margin="normal"
                        required
                        onChange={this.onChange}
                        value ={this.state.content}
                    /> 
                </FormControl> 
                <FormControlLabel
                    control={<Checkbox value="agree" color="primary" />}
                    label="I agree to the terms of service"
                    required
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Send
                </Button>
                </form>
            </Paper>
            <FormDialog ref="dialog"/>
            </main>
        )
    }
}

MyForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyForm);