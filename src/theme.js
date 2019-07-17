import {red} from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette:{
        primary:{
            main: '#3f51b5',
            contrastText: '#fff',
        },
        secondary: {
            main:'#ff9800',
            contrastText: '#000',
        },
        error:{
            main: red.A400,
        },
        background:{
            default: '#fff',
        },
    },
});

export default theme;