import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Badge, Icon, Stack} from "@mui/material";
import {InertiaLink, usePage} from '@inertiajs/inertia-react';
import {Inertia} from "@inertiajs/inertia";
import {ShoppingBasket} from "@mui/icons-material";
import basketService, {useBasket} from "../Services/Basket";
import ProductCategories from "../Services/ProductCategories";

export default function Header({ menuLinks, handleBasketToggle = () => {}, ...props }) {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenOrders = () => {
        Inertia.get('/orders');
        handleCloseUserMenu(null);
    }

    const handleOpenAdminDashboard = () => {
        Inertia.get('/admin');
        handleCloseUserMenu(null);
    }

    const handleLogOut = () => {
        Inertia.get('/logout');
        handleCloseUserMenu(null);
    }

    const scrollTo = (id) => {
        const anchor = document.querySelector(
            '#' + id,
        );

        if (anchor) {
            anchor.scrollIntoView({
                block: 'nearest',
            });
        }
    }

    const handleOpenMenu = () => {
        Inertia.visit("/");
    }

    const user = usePage().props.auth.user;

    useBasket();
    const basketItemCount = basketService.itemCount;

    return (
        <AppBar position="static" {...props}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Icon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <img src="/images/logo.svg" alt="Logo"/>
                    </Icon>

                    <Typography
                        variant="h6"
                        noWrap
                        component={InertiaLink}
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 600,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {process.env.MIX_APP_NAME}
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component={InertiaLink}
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 600,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {process.env.MIX_APP_NAME}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            menuLinks ? Object.keys(ProductCategories).map((categoryKey) => (
                                <Button
                                    key={categoryKey}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={() => scrollTo(categoryKey)}
                                >
                                    {ProductCategories[categoryKey]}
                                </Button>
                            )) : (
                                <Button
                                    key='menu'
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    onClick={handleOpenMenu}
                                >
                                    Menu
                                </Button>
                            )
                        }

                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}/>
                    {
                        user ? (
                            <Box sx={{ flexGrow: 0 }}>
                                <Stack direction="row" spacing={2}>
                                    {
                                        basketItemCount !== 0 && (
                                            <Tooltip title="Basket">
                                                <IconButton color="inherit" onClick={handleBasketToggle} sx={{ p: 0 }}>
                                                    <Badge badgeContent={basketItemCount} color="secondary">
                                                        <ShoppingBasket/>
                                                    </Badge>
                                                </IconButton>
                                            </Tooltip>
                                        )
                                    }

                                    <Tooltip title="Profile">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar>
                                                {user.name[0] ?? ""}
                                            </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {
                                            user.admin && (
                                                <MenuItem key="admin" onClick={handleOpenAdminDashboard}>
                                                    <Typography textAlign="center">Admin</Typography>
                                                </MenuItem>
                                            )
                                        }
                                        <MenuItem key="orders" onClick={handleOpenOrders}>
                                            <Typography textAlign="center">Orders</Typography>
                                        </MenuItem>
                                        <MenuItem key="logout" onClick={handleLogOut}>
                                            <Typography textAlign="center">Log Out</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Stack>
                            </Box>
                        ) : (
                            <>
                                <Button
                                    component={InertiaLink}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    href="/login"
                                >
                                    Log In
                                </Button>
                                <Button
                                    component={InertiaLink}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                    href="/register"
                                >
                                    Register
                                </Button>
                            </>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};
