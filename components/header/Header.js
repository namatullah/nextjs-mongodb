import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import AccountMenu from './AccountMenu';
import Link from 'next/link';

export default function Header() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Link href='/' style={{ textDecoration: 'none' }}>
                            <Typography variant='h4' color='white' align='center'>List of Employee</Typography>
                        </Link>
                    </Box>
                    <AccountMenu />
                </Toolbar>
            </Container>
        </AppBar>
    );
}