import React from 'react';
import { Button, LinearProgress, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MyPeer from '../services/MyPeer';
import {PeerEvents} from '../services/MyEnums';

class MyFileSharer extends React.Component {
    constructor(props) {
        super(props);

        this.textFieldRef = React.createRef();

        this.state = {
            progress: 0,
            receiverUrl: '',
            outgoing: [],
        };

        this.myPeer = null;
    }

    componentWillMount(){
        this.myPeer = new MyPeer();
        this.initializeMyPeer();
    }

    initializeMyPeer(){
        this.myPeer.on(PeerEvents.Peer_Opened, (selfId)=>{
             console.log(selfId);
             this.setState({receiverUrl: `${window.location}/${selfId}`});
        });
    }

    selectFile(event){
        let files = event.target.files;
        this.myPeer.setOutgingFiles(files);
        this.setState({outgoing: this.myPeer.outgoing});
    }
    oCopy(event) {
        if (this.textFieldRef && this.textFieldRef.value) {
            this.textFieldRef.select();
            document.execCommand("Copy");
            this.setState({ snackbarOpen: true });
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
               <input
                    id="button-file"
                    className={classes.buttonInput}
                    type="file"
                    multiple
                    onChange={this.selectFile.bind(this)}
                ></input>
                <label htmlFor="button-file">
                    <Button variant="contained" component="span" className={classes.button} color="primary">
                        Select Files
                    </Button>
                </label>
                {
                    this.state.outgoing && this.state.outgoing.map((f) =>{
                        return <div>{f.name}</div>
                    })
                }
                <TextField
                    label="Receiver Url"
                    placeholder="Receiver Url"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    value={this.state.receiverUrl}
                    inputRef={i => { this.textFieldRef = i; }}
                ></TextField>

                <Button variant="contained" component="span" className={classes.button} 
                    color="primary" disabled={!this.state.receiverUrl} onClick={this.oCopy.bind(this)}>
                        Copy Receiver Url
                </Button>
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
});

export default withStyles(styles, { withTheme: true })(MyFileSharer);