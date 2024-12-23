import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#1a0033' }}>
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
                <Button color="inherit" component={Link} to="/filters">
                    Apply Filters
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
