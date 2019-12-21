import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AddProducts from './Tabs/AddProducts';
import About from './Tabs/About';
import GetProducts from './Tabs/GetProducts';
import UpdateProducts from './Tabs/UpdateProducts';
import DeleteProducts from './Tabs/DeleteProducts';
import SearchProducts from './Tabs/SearchProducts';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import GetAppIcon from '@material-ui/icons/GetApp';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CodeIcon from '@material-ui/icons/Code';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Add Products" icon={<AddCircleIcon />} {...a11yProps(0)} />
        <Tab label="Get Products" icon={<GetAppIcon />} {...a11yProps(1)} />
        <Tab label="Update Products" icon={<UpdateIcon />} {...a11yProps(2)} />
        <Tab label="Search Products" icon={<SearchIcon />} {...a11yProps(3)} />
        <Tab
          label="Delete Products"
          icon={<DeleteForeverIcon />}
          {...a11yProps(4)}
        />
        <Tab
          label="About the Developer"
          icon={<CodeIcon />}
          {...a11yProps(5)}
        />
      </Tabs>
      <TabPanel value={value} index={0}>
        <AddProducts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GetProducts />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UpdateProducts />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SearchProducts />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DeleteProducts />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <About />
      </TabPanel>
    </div>
  );
}
