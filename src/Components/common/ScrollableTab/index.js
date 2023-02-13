import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './ScrollableTab.scss';
import img1 from '../../../Assets/Images/TabImages/1.png';
import img2 from '../../../Assets/Images/TabImages/2.png';
import img3 from '../../../Assets/Images/TabImages/3.jpg';
import img4 from '../../../Assets/Images/TabImages/4.png';
import img5 from '../../../Assets/Images/TabImages/5.png';
import img6 from '../../../Assets/Images/TabImages/6.png';
import img7 from '../../../Assets/Images/TabImages/7.png';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'transparent', color: '#fff', display: 'flex', height: 320 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={false}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ minWidth: 100 }}
      >
        <Tab
          {...a11yProps(0)}
          value={value}
          component={() => (
            <div className='d-flex align-items-center justify-content-center'>
                <img className={`tab-image ${value === 0 ? "image-border" : ""}`} src={img1} alt="" onClick={() => setValue(0)} />
            </div>
          )}
        />
        <Tab {...a11yProps(1)}
          value={value}
          component={() => (
            <div className='d-flex align-items-center justify-content-center'>
                <img className={`tab-image ${value === 1 ? "image-border" : ""}`} src={img2} alt="" onClick={() => setValue(1)} />
            </div>
          )}
        />
        <Tab {...a11yProps(2)} 
         value={value}
         component={() => (
           <div className='d-flex align-items-center justify-content-center'>
               <img className={`tab-image ${value === 2 ? "image-border" : ""}`} src={img3} alt="" onClick={() => setValue(2)} />
           </div>
         )}
         />
        <Tab {...a11yProps(3)} 
         value={value}
         component={() => (
           <div className='d-flex align-items-center justify-content-center'>
               <img className={`tab-image ${value === 3 ? "image-border" : ""}`} src={img4} alt="" onClick={() => setValue(3)} />
           </div>
         )}
         />

        <Tab {...a11yProps(4)} 
         value={value}
         component={() => (
           <div className='d-flex align-items-center justify-content-center'>
               <img className={`tab-image ${value === 4 ? "image-border" : ""}`} src={img5} alt="" onClick={() => setValue(4)} />
           </div>
         )}
         />

        <Tab {...a11yProps(5)} 
         value={value}
         component={() => (
           <div className='d-flex align-items-center justify-content-center'>
               <img className={`tab-image ${value === 5 ? "image-border" : ""}`} src={img6} alt="" onClick={() => setValue(5)} />
           </div>
         )}
         />
        <Tab {...a11yProps(6)} 
         value={value}
         component={() => (
           <div className='d-flex align-items-center justify-content-center'>
               <img className={`tab-image ${value === 6 ? "image-border" : ""}`} src={img7} alt="" onClick={() => setValue(6)} />
           </div>
         )}
         />

      </Tabs>
      <TabPanel value={value} index={0} className="tab-content-container">
        <div className='p-1 tab-content'>
        First ever Hybrid 1k supply storytelling-driven PFP collection that migrates from ETH to BTC chain, a remarkable piece of history to get your hands on.
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} className="tab-content-container">
          <div className='p-1 tab-content'>
      Who wouldn't want to hold a PFP of such status? Humans Maybe! Hoomans? Nah. Each Bitcoin Hoomans NFT on ETH chain will be inscribed in the BTC chain (first 100k).
      </div>
      </TabPanel>
      <TabPanel value={value} index={2} className="tab-content-container">
          <div className='p-1 tab-content'>
      What's more special about Being Hooman? You will get a shot (raffle) at getting your hands on inscription sub - 11k.
      </div>
      </TabPanel>
      <TabPanel value={value} index={3} className="tab-content-container">
          <div className='p-1 tab-content'>
      Hoomans operate a node to inscribe you with a piece of history after mint. We onboard you to Ordinals (BTC) with a nominal mint price (0.05 E) which is sufficient for an inscription. (Hoomans are Fair)
      </div>
      </TabPanel>
      <TabPanel value={value} index={4} className="tab-content-container">
          <div className='p-1 tab-content'>
      The fun doesn't stop there. Hoomans holders will become a part of the historical significance. (The Future of Hoomans is ₿right)
      </div>
      </TabPanel>
      <TabPanel value={value} index={5} className="tab-content-container">
          <div className='p-1 tab-content'>
        We onboard you to Ordinals (BTC) with a nominal mint price (0.05 E) which is sufficient for an inscription. (Hoomans are Fair)
        </div>
      </TabPanel>
      <TabPanel value={value} index={6} className="tab-content-container">
          <div className='p-1 tab-content'>
        Hoomans holders will become a part of the historical significance. (The Future of Hoomans is ₿right)
        </div>
      </TabPanel>
    </Box>
  );
}