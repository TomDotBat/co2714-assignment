import price from "../Services/price";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useMediaQuery, useTheme
} from "@mui/material";
import Button from "@mui/material/Button";
import shortUuid from "../Services/shortUuid";
import Typography from "@mui/material/Typography";
import OrderProductsTable from "./OrderProductsTable";

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
                <OrderProductsTable showId={showId} products={order.products}/>

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
