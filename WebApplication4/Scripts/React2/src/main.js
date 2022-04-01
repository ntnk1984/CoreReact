var React = require('react');
import { TextField } from '@mui/material'

class Main extends React.Component {
    render() {
        return (<><h1>Hello world From React 2</h1>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </>)
    }
}

export default Main;

