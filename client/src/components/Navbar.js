import React from 'react';
import { Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MCU Data Dashboard
                </Typography>
                <Button color="inherit" component={Link} to="/">
                    Home
                </Button>
                <Button color="inherit" component={Link} to="/dataset">
                    View Dataset
                </Button>
                <Button color="inherit" component={Link} to="/charts">
                    Explore Charts
                </Button>
            </Toolbar>
    );
};

export default Navbar;
