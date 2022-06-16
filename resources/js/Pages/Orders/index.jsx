import { KeyboardArrowUp } from '@mui/icons-material';
import { CssBaseline, Fab, Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { DateTime } from 'luxon';
import Header from '../../Components/Header';
import ScrollToTop from '../../Components/ScrollToTop';
import price from '../../Services/price';
import Product from '../Home/Product';

const theme = createTheme();

export default function Orders({orders = {}}) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Header
                position="fixed"
                sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
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
                            Your Orders
                        </Typography>
                    </Container>
                    
                    <Container maxWidth="lg">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Total</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>{price(order.total)}</TableCell>
                                        <TableCell>{DateTime.fromISO(order.created_at).toLocaleString(DateTime.DATETIME_MED)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Container>
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
