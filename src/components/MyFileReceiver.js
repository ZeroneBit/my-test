import React from 'react';
import { Button, LinearProgress, TextField, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import Folder from '@material-ui/icons/Folder';
import Download from '@material-ui/icons/CloudDownload';
import MyPeer from '../services/MyPeer';
import { PeerEvents } from '../services/MyEnums';

class MyFileReceiver extends React.Component {
    constructor(props) {
        super(props);

        this.remoteId = props.match.params.id;

        this.myPeer = null;
        this.state = {
            peerFiles: []
        };
    }

    componentWillMount() {
        this.myPeer = new MyPeer();
        this.initializeMyPeer();
    }

    componentWillUnmount() {
        this.myPeer.abortFiles();
    }

    initializeMyPeer() {
        this.myPeer.on(PeerEvents.Peer_Opened, (selfId) => {
            console.log(selfId);
        });
        this.myPeer.on(PeerEvents.Info_Got, (peerId, files) => {
            console.log(files);
            this.setState({ peerFiles: files });
        });
        this.myPeer.on(PeerEvents.File_Progress, (fileInfo, speed, progress) => {
            console.log(`Speed: ${speed}; Progress: ${progress}`);
        });
        this.myPeer.on(PeerEvents.File_Got, (fileInfo) => {
            let f = this.state.peerFiles.find(f => f.name === fileInfo.name);
            f.downloading = false;
            this.setState({});
            console.log("finished");
        });
    }

    retriveFileInfos(event) {
        this.myPeer.requestFileInfos(this.remoteId);
    }

    downloadFile(event, fileInfo) {
        console.log(fileInfo);
        fileInfo.downloading = true;
        this.setState({});
        this.myPeer.downloadFile(this.remoteId, fileInfo);
    }

    render() {

        const { classes } = this.props;

        return (
            <div>
                <Button variant="contained" component="span" className={classes.button}
                    color="primary" onClick={this.retriveFileInfos.bind(this)}>
                    Retrive Files
                </Button>
                {
                    this.state.peerFiles && this.state.peerFiles.length &&
                    this.renderFileInfos()
                }

            </div>
        );
    }

    renderFileInfos() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h6" className={classes.title}>
                    {this.remoteId}
                </Typography>
                <div className={classes.paperBackground}>
                    <List dense={true} >
                        {
                            this.state.peerFiles.map((f) => {
                                return (
                                    <ListItem key={f.name}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Folder></Folder>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={f.name} secondary={f.size}>
                                        </ListItemText>
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="Download"
                                                disabled={!!f.downloading}
                                                onClick={(event) => { this.downloadFile(event, f) }}>
                                                <Download></Download>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>)
                            })
                        }
                    </List>
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

    title: {
        margin: theme.spacing(4, 0, 2),
    },

    paperBackground: {
        backgroundColor: theme.palette.background.paper,
    },
});

export default withStyles(styles, { withTheme: true })(MyFileReceiver);