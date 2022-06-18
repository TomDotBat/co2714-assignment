import * as React from 'react';
import Header from "../../Components/Header";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, Fab, Grid, Modal, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Product from "./Product";
import Basket from "./Basket";
import ScrollToTop from "../../Components/ScrollToTop";
import {KeyboardArrowUp} from "@mui/icons-material";
import ProductCategories from "../../Services/ProductCategories";
import Divider from "@mui/material/Divider";

const theme = createTheme();

export default function Home({products = {}}) {
    const [userBasketVisibility, setUserBasketVisibility] = React.useState(true);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header
                position="fixed"
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
                handleBasketToggle={() => setUserBasketVisibility(!userBasketVisibility)}
            />

            <main style={{marginTop: 68}}>
                <Box
                    sx={{
                        pt: 4,
                        pb: 2,
                    }}
                >
                    <Container id="back-to-top-anchor" maxWidth="sm">
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

                    <Container maxWidth="lg">
                        <Stack spacing={8}>
                            {Object.keys(ProductCategories).map(category => (
                                <Box key={category}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        textTransform: 'capitalize'
                                    }}>
                                        <Typography variant="h3">
                                            {ProductCategories[category]}
                                        </Typography>
                                        <Divider sx={{mb: 1}}/>
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

                    <Basket userVisibility={userBasketVisibility} />
                </Box>

                <ScrollToTop>
                    <Fab size="small" aria-label="scroll back to top">
                        <KeyboardArrowUp/>
                    </Fab>
                </ScrollToTop>
            </main>
        </ThemeProvider>
    );
}
