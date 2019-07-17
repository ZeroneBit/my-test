import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUti from '@date-io/moment';
import Moment from 'moment';
import { red } from '@material-ui/core/colors';

class MyTimeStamp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: Moment.utc(),
            inputIndex: -1,
        };

        this.ticks = 0;
    }

    ticksChanged(event) {
        let value = event.target.value;

        this.ticks = value;

        let epochTicks = 621355968000000000;
        let ticksPerMillisecond = 10000;
        let maxDateMilliseconds = 8640000000000000;

        let ticksSinceEpoch = value - epochTicks;
        let millisecondsSinceEpoch = ticksSinceEpoch / ticksPerMillisecond;
        if (millisecondsSinceEpoch > MediaStreamAudioDestinationNode) {
            console.error("Invalid number");
        }

        var date = Moment(millisecondsSinceEpoch).utc();;

        this.setState({ time: date, inputIndex: 2 });
    }

    unixSChanged(event) {
        let unixS = event.target.value;
        let time = Moment(unixS * 1000).utc();

        this.setState({ time: time, inputIndex: 0 });
    }

    unixMsChanged(event) {
        let unixMS = event.target.value;
        let time = Moment(unixMS * 1).utc();

        this.setState({ time: time, inputIndex: 1 });
    }

    timeChanged(event) {
        this.setState({ time: event, inputIndex: 3 });
    }

    convertToUnixS(time) {
        let unixS = Moment(time).unix();
        return unixS;
    }
    convertToUnixMs(time) {
        let unixMs = Moment(time).valueOf();
        return unixMs;
    }
    convertToTicks(time) {
        if(this.state.inputIndex == 2){
            return this.ticks;
        }
        const epochTicks = 621355968000000000;
        const ticksPerMillisecond = 10000;

        let unixMs = Moment(time).valueOf();
        let ticks = (unixMs * ticksPerMillisecond) + epochTicks;

        return ticks;
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <TextField
                    id="unix-s-textarea"
                    className={classes.textField}
                    label="Unix Time (s)"
                    placeholder="Unix Time (s)"
                    color="primary"
                    variant="standard"
                    fullWidth
                    onChange={this.unixSChanged.bind(this)}
                    value={this.convertToUnixS(this.state.time)}
                >
                </TextField>

                <TextField
                    id="unix-ms-textarea"
                    className={classes.textField}
                    label="Unix Time (ms)"
                    placeholder="Unix Time (ms)"
                    color="primary"
                    variant="standard"
                    fullWidth
                    onChange={this.unixMsChanged.bind(this)}
                    value={this.convertToUnixMs(this.state.time)}
                >
                </TextField>

                <TextField
                    id='ticks-textarea'
                    className={classes.textField}
                    label="Time Ticks"
                    placeholder="Ticks"
                    color="primary"
                    variant="standard"
                    fullWidth
                    onChange={this.ticksChanged.bind(this)}
                    value={this.convertToTicks(this.state.time)}
                >
                </TextField>

                <MuiPickersUtilsProvider utils={MomentUti}>
                    <DateTimePicker
                        inputVariant="standard"
                        label="UTC Time"
                        className={classes.textField}
                        placeholder="UTC Time"
                        color="primary"
                        onChange={this.timeChanged.bind(this)}
                        value={this.state.time}

                        ampm={false}
                        autoOk={true}
                        format="YYYY-MM-DD T HH:mm:ss.SSS Z"
                        fullWidth

                    >
                    </DateTimePicker>
                </MuiPickersUtilsProvider>

            </div>
        );
    }
}



const styles = theme => ({
    textField: {
        margin: theme.spacing(2),
        width: 400,
        display: "block",
    },

    typography: {
        display: "inline-block",
    },
});

export default withStyles(styles, { withTheme: true })(MyTimeStamp);

