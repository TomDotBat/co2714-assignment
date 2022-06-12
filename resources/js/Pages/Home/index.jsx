import * as React from 'react';
import Header from "../../Components/Header";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, Grid, Modal, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Product from "./Product";
import Basket from "./Basket";
import Button from "@mui/material/Button";
import {InertiaLink} from "@inertiajs/inertia-react";

const theme = createTheme();

const categories = [
    'pizza',
    'side',
    'dessert',
    'drink',
];

export default function Home({products = {}}) {
    const [open, setOpen] = React.useState(false);
    const toggleLoginModal = () => setOpen(!open);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}/>

            <main style={{
                marginTop: 68,
            }}>
                <Box
                    sx={{
                        pt: 4,
                        pb: 2,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Our Menu
                        </Typography>
                    </Container>

                    <Container maxWidth="md">
                        <Stack spacing={8}>
                            {categories.map(category => (
                                <Box key={category}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        textTransform: 'capitalize'
                                    }}>
                                        <Typography gutterBottom variant="h5" component="h1">
                                            {category}
                                        </Typography>
                                    </Box>
                                    <Grid container spacing={4}>
                                        {products[category]?.map((card) => (
                                            <Product key={card.id} card={card}/>
                                        ))}
                                    </Grid>
                                </Box>
                            ))}
                        </Stack>
                    </Container>

                    <Modal
                        open={open}
                        onClose={toggleLoginModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4
                        }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                You're not logged in!
                            </Typography>
                            <Typography id="modal-modal-description" sx={{mt: 2}}>
                                Log in to start making an order, or make an account if you don't have one already.
                            </Typography>
                            <Button
                                component={InertiaLink}
                                sx={{my: 2, color: 'white', display: 'block'}}
                                href="/login"
                            >
                                Log In
                            </Button>
                            <Button
                                component={InertiaLink}
                                sx={{my: 2, color: 'white', display: 'block'}}
                                href="/register"
                            >
                                Register
                            </Button>
                        </Box>
                    </Modal>

                    <Basket/>
                </Box>
            </main>
        </ThemeProvider>
    );
}
