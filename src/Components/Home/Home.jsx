import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { UserDetailsAPI } from '../API/APIService'
import axios from 'axios';

function Item(props) {
  const { sx, ...other } = props;

  axios.get(UserDetailsAPI).then((response) => {
    console.log("home data get: ", response);
  })
  
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function JustifyContent() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item className="main-dv-home" sx={{ 
            backgroundColor: '#79b8ff',
            height: '60%',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'grid',
            width: '50%',
        }}>
            <h1>Personal details</h1>
            <p>Username: athif saheer v a athif saheer v a athif saheer v a</p>
            <p>Email: </p>
            <p>Role: </p>
            <p>Country: </p>
            <p>Mobile No: </p>
        </Item>

      </Box>
    </div>
  );
}