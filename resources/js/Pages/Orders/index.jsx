import { KeyboardArrowUp } from '@mui/icons-material';
import {
    CssBaseline,
    Fab,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
import OrderStatus from "../../Services/OrderStatus";
import OrderPlacedDialog from "./OrderPlacedDialog";
import shortUuid from "../../Services/shortUuid";
import {usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import Button from "@mui/material/Button";
import OrderProductsDialog from "../../Components/OrderProductsDialog";
import {useState} from "react";

const theme = createTheme();

export default function Orders({orders = {}}) {
    const [viewProductsOrder, setViewProductsOrder] = useState(null);

    let placedOrder;

    const queryParameters = usePage().url.split('?')[1];
    if (queryParameters) {
        const placedOrderId = new URLSearchParams(queryParameters).get("order_placed");
        if (placedOrderId) {
            placedOrder = orders.find((order) => {
                return order.id === placedOrderId;
            });
        }
    }

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
                                    <TableCell>Reference</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right">Total</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{shortUuid(order.id)}</TableCell>
                                        <TableCell>{OrderStatus[order.status] ?? "Unknown"}</TableCell>
                                        <TableCell align="right">{price(order.total)}</TableCell>
                                        <TableCell>{DateTime.fromISO(order.created_at).toLocaleString(DateTime.DATETIME_MED)}</TableCell>
                                        <TableCell>
                                            <Button size="small" onClick={() => setViewProductsOrder(order)}>
                                                View Products
                                            </Button>
                                        </TableCell>
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

                <OrderProductsDialog
                    open={viewProductsOrder != null}
                    order={viewProductsOrder}
                    onClose={() => setViewProductsOrder(null)}
                />

                {
                    placedOrder && (
                        <OrderPlacedDialog
                            order={placedOrder}
                            onClose={() => Inertia.visit('/orders')}
                        />
                    )
                }
            </main>
        </ThemeProvider>
    );
}
