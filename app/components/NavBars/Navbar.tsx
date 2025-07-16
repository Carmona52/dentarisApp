import React from 'react';
import { AppBar, Toolbar} from '@mui/material';

const CustomNavbar: React.FC = () => {
    return (
        <AppBar position="static" sx={{background:"transparent", border:"none", boxShadow:"none", boxShadowColor:"black", padding:2}}>
            <Toolbar className="rounded-2xl shadow-sm border-2 bg-white h-24">
                <img src="/branding/LogoBackRec.png" alt="logo" className="h-32 justify-center align-top " />

            </Toolbar>
        </AppBar>
    );
};

export default CustomNavbar;
