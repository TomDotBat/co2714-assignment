import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {ArrowBack, GitHub, Google} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import {Inertia} from "@inertiajs/inertia";
import {SvgIcon} from "@mui/material";
import {InertiaLink, usePage} from "@inertiajs/inertia-react";

const theme = createTheme();

export default function Register({ errors }) {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post('/register', values);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        position: 'relative'
                    }}
                >
                    <IconButton
                        component={InertiaLink}
                        href="/"
                        style={{
                            position: 'absolute',
                            left: 0,
                        }}
                    >
                        <ArrowBack />
                    </IconButton>

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    autoFocus
                                    onChange={handleChange}
                                    error={!!errors['name']}
                                    helperText={errors['name']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    error={!!errors['email']}
                                    helperText={errors['email']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    error={!!errors['password']}
                                    helperText={errors['password']}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password_confirmation"
                                    label="Password Confirmation"
                                    type="password"
                                    id="password_confirmation"
                                    autoComplete="confirm-password"
                                    onChange={handleChange}
                                    error={!!errors['password_confirmation']}
                                    helperText={errors['password_confirmation']}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="space-evenly">
                            <Grid item>
                                <IconButton href="/login/google">
                                    <Google/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton href="/login/discord">
                                    <SvgIcon viewBox="0 0 71 55">
                                        <g clipPath="url(#clip0)">
                                            <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0">
                                                <rect width="71" height="55"/>
                                            </clipPath>
                                        </defs>
                                    </SvgIcon>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton href="/login/github">
                                    <GitHub/>
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link component={InertiaLink} href="/login" variant="body2">
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
