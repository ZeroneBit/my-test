import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, LinearProgress, TextField, Snackbar, Container } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

class MyBase64Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            snackbarOpen: false,
            showImage: false,
        }

        this.textFieldRef = React.createRef();
    }

    readFile(event) {
        let source = event.target;
        let file = source.files[0];
        if (window.FileReader) {
            this.setState({ progress: 0, base64: "", showImage: false });
            let reader = new FileReader();
            reader.onprogress = (e) => {
                if (e.lengthComputable) {
                    let p = Math.floor(e.loaded * 100 / e.total);
                    if (p >= 100) { p = 95; }
                    this.setState({ progress: p });
                }
            };
            reader.onload = (e) => {
                this.setState({ base64: e.target.result }, () => {
                    this.setState({ progress: 100 });
                });
            };
            reader.readAsDataURL(file);
        }
        else {
            alert("Not supported by your browser!");
        }
    }

    oCopy(event) {
        if (this.textFieldRef && this.textFieldRef.value) {
            this.textFieldRef.select();
            document.execCommand("Copy");
            this.setState({ snackbarOpen: true });
        }
    }

    oRestore(event) {
        this.setState({ showImage: true });
    }

    handleSnackbarClose(event) {
        this.setState({ snackbarOpen: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <input
                        accept="image/*"
                        id="button-file"
                        className={classes.buttonInput}
                        type="file"
                        onChange={this.readFile.bind(this)}
                    />
                    <label htmlFor="button-file">
                        <Button variant="contained" component="span" className={classes.button} color="primary">
                            Select
                        </Button>
                    </label>
                </div>
                <div>
                    <LinearProgress variant="determinate" color="primary" value={this.state.progress}></LinearProgress>
                </div>
                <div>
                    <TextField
                        label="Base64"
                        placeholder="Base64"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows="3"
                        fullWidth
                        value={this.state.base64}
                        inputRef={i => { this.textFieldRef = i; }}
                    ></TextField>
                </div>
                <div>
                    <Button variant="contained" className={classes.button} color="primary" onClick={this.oCopy.bind(this)}>
                        Copy All
                    </Button>
                    <Button variant="contained" className={classes.button} color="secondary" disabled={!this.state.base64} onClick={this.oRestore.bind(this)}>
                        Restore to image
                    </Button>
                </div>
                <div>
                    <Container>
                        {
                            this.state.showImage && this.state.base64 &&
                            <img src={this.state.base64}></img>
                        }
                    </Container>
                </div>

                <div>
                    <Snackbar
                        anchorOrigin={{ horizontal: "center", vertical: "top" }}
                        autoHideDuration={3000}
                        message="Copied Successfully"
                        onClose={this.handleSnackbarClose.bind(this)}
                        open={this.state.snackbarOpen}
                    ></Snackbar>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing(1),
    },

    buttonInput: {
        display: 'none',
    },

    success: {
        backgroundColor: green[600],
    }
});

export default withStyles(styles, { withTheme: true })(MyBase64Image);