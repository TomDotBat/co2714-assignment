import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import price from "../Services/price";
import productTypeIcon from "../Services/productTypeIcon";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useMediaQuery, useTheme
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import shortUuid from "../Services/shortUuid";
import Typography from "@mui/material/Typography";

export default function OrderProductsDialog({open, onClose, showId, order}) {
    if (!order) {
        return null;
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            scroll="paper"
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                Products for order: {shortUuid(order.id)}
            </DialogTitle>

            <DialogContent>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                showId && (
                                    <TableCell>#</TableCell>
                                )
                            }

                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order.products.map((product) => (
                            <TableRow key={product.id}>
                                {
                                    showId && (
                                        <TableCell>{product.id}</TableCell>
                                    )
                                }
                                <TableCell>{product.title}</TableCell>
                                <TableCell>
                                    <Tooltip arrow placement="top" title={
                                        product.type.charAt(0).toUpperCase() + product.type.slice(1)
                                    }>
                                        {productTypeIcon(product)}
                                    </Tooltip>
                                </TableCell>
                                <TableCell align="right">{price(product.price)}</TableCell>
                                <TableCell align="right">{product.pivot.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Typography textAlign="right" sx={{mt: 2, fontWeight: 600, fontSize: 18}}>
                    Total: {price(order.total)}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
