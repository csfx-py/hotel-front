import { useState } from "react";
import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import TabPanel from "../components/TabPanel";
import Menu from "../views/Manager/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Manager({ setLoading }) {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Orders" />
          <Tab label="Menu" />
          <Tab label="Settings" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        <Menu setLoading={setLoading} />
      </TabPanel>
      <TabPanel value={value} index={2}></TabPanel>
    </div>
  );
}

export default Manager;
