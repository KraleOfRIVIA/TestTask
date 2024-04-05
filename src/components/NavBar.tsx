import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Link} from 'react-router-dom';
import {Toolbar} from "@mui/material";
import {observer} from "mobx-react-lite";
function CenteredTabs() {
    const [value, setValue] = React.useState<number>(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Toolbar sx={{ width: '100%',backgroundColor: "secondary.main"}}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Home"  to="/" component={Link} />
                <Tab label="Tags" to="/tags" component={Link}/>
            </Tabs>
        </Toolbar>
    );
}
export default observer(CenteredTabs);