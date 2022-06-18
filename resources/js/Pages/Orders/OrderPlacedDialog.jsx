import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Stack,
    Step,
    StepLabel,
    Stepper, useMediaQuery, useTheme
} from "@mui/material";
import OrderStatus from "../../Services/OrderStatus";
import Button from "@mui/material/Button";
import shortUuid from "../../Services/shortUuid";
import OrderProductsTable from "../../Components/OrderProductsTable";
import Typography from "@mui/material/Typography";
import price from "../../Services/price";

export default function OrderPlacedDialog({open, order, onClose}) {
    if (!order) {
        return null;
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            open
            scroll="paper"
            fullScreen={fullScreen}
            onClose={onClose}
        >
            <DialogTitle>
                Payment Successful
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <DialogContentText>
                        Your order has been sent to the {process.env.MIX_APP_NAME} kitchen. Order reference number: <strong>{shortUuid(order.id)}</strong>
                    </DialogContentText>

                    <Stepper activeStep={1} alternativeLabel>
                        {Object.keys(OrderStatus).map((stateKey) => {
                            if (stateKey !== 'PAYMENT_FAILED') {
                                return (
                                    <Step key={stateKey}>
                                        <StepLabel>{OrderStatus[stateKey]}</StepLabel>
                                    </Step>
                                );
                            }
                        })}
                    </Stepper>

                    <DialogContentText variant="h6">
                        Products ordered:
                    </DialogContentText>

                    <OrderProductsTable products={order.products}/>

                    <Typography textAlign="right" sx={{mt: 2, fontWeight: 600, fontSize: 18}}>
                        Total: {price(order.total)}
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
