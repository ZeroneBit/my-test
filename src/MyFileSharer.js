import React from 'react';
import { Button, LinearProgress, TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Peer from 'peerjs';

class MyFileSharer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: 0,
            receiverUrl: '',
        };

        this.textFieldRef = React.createRef();
        this.peer = null;
        this.blob = null;

        this.conn = null;
    }

    peerOpen(id){
        this.setState({receiverUrl: id});
    }
    peerConnection(conn){
        this.conn = conn;
        this.initializeConnection();
    }
    peerDisconnected(){}
    peerClose(){}
    peerError(err){}

    initializePeer(){
        this.peer =  new Peer(null,{
            debug:3,
            config:{
                'iceServers':[
                    {url: 'stun:stun1.l.google.com:19302'},
					{url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com'}
                ],
            },
        });

        this.peer.on('open', this.peerOpen.bind(this));
        this.peer.on('connection', this.peerConnection.bind(this));
        this.peer.on('disconnected', this.peerDisconnected.bind(this));
        this.peer.on('close', this.peerClose.bind(this));
        this.peer.on('error', this.peerError.bind(this));

        return this.peer;
    }

    readFile(event) {
        let source = event.target;
        let file = source.files[0];

        this.blob = new Blob(source.files, { type: file.type });

        this.initializePeer();
    }

    oCopy(event) {
        if (this.textFieldRef && this.textFieldRef.value) {
            this.textFieldRef.select();
            document.execCommand("Copy");
            this.setState({ snackbarOpen: true });
        }
    }

    saveData(){
        let url = URL.createObjectURL(this.blob);
        let a = document.createElement("a");
        document.body.appendChild(a);
        a.style="display:none";
        a.href = url;
        a.download="aa.jpg";
        a.click();
        
        URL.revokeObjectURL(url);
    }

    connOpen(){
        if(this.blob){
            this.conn.send({file: this.blob, filename: 'aa', filetype:'tt'});
        }
    }
    connData(data){
        this.blob = new Blob([data.file], {type:data.filetype});

        this.saveData();
    }
    connError(err){}
    connClose(){}

    initializeConnection(){
        this.conn.on('open', this.connOpen.bind(this));
        this.conn.on('data', this.connData.bind(this));
        this.conn.on('error', this.connError.bind(this));
        this.conn.on('close', this.connClose.bind(this));
    }

    urlChanged(event){
        var id = event.target.value;

        this.initializePeer();

        this.conn = this.peer.connect(id);

        this.initializeConnection();

    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div>
                    <input
                        id="button-file"
                        className={classes.buttonInput}
                        type="file"
                        onChange={this.readFile.bind(this)}
                    />
                    <label htmlFor="button-file">
                        <Button variant="contained" component="span" className={classes.button} color="primary">
                            Select File
                        </Button>
                    </label>
                </div>

                <div>
                    <LinearProgress variant="determinate" color="primary" value={this.state.progress}></LinearProgress>
                </div>

                <div>
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

                <div>
                    <TextField
                        label="Input Id"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        onChange={this.urlChanged.bind(this)}
                    ></TextField>
                </div>
            </div>);
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