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

                    <Basket/>
                </Box>
            </main>
        </ThemeProvider>
    );
}
