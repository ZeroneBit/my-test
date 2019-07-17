import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const style = {
    root: {
        flexGrow: 1,
    },
}

export default class MyLayout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const classes = makeStyles(style);

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6">
                            Tools
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>

        );
    }
}