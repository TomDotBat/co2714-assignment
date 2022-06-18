import {
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    FormControl, InputLabel,
    Select,
    useMediaQuery,
    useTheme
} from "@mui/material";
import shortUuid from "../../../Services/shortUuid";
import Button from "@mui/material/Button";
import {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OrderStatus from "../../../Services/OrderStatus";
import {Inertia} from "@inertiajs/inertia";

export default function UpdateOrderStatusDialog({open, onClose, order}) {
    if (!order) {
        return null;
    }

    const [orderStatus, setOrderStatus] = useState(order.status);

    const handleOrderStatusChange = (event) => {
        setOrderStatus(event.target.value);
    }

    const updateOrderStatus = () => {
        Inertia.post("/admin/orders/" + order.id, {
            _method: 'PATCH',
            status: orderStatus
        }, {
            onSuccess: () => onClose()
        });
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Dialog
            scroll="paper"
            fullScreen={fullScreen}
            open={open}
            onClose={onClose}
        >
            <DialogTitle>
                Status update for order: {shortUuid(order.id)}
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    You can update the status of this order with the selection box below.
                </DialogContentText>
                <Box
                    noValidate
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        m: 'auto',
                        width: 'fit-content',
                    }}
                >
                    <FormControl variant="standard" sx={{ mt: 2, minWidth: 120 }}>
                        <InputLabel htmlFor="orderStatus">Order Status</InputLabel>
                        <Select
                            autoFocus
                            value={orderStatus ?? ''}
                            onChange={handleOrderStatusChange}
                            inputProps={{
                                name: 'orderStatus',
                                id: 'orderStatus',
                            }}
                        >
                            {Object.keys(OrderStatus).map((stateKey) => (
                                <MenuItem value={stateKey}>{OrderStatus[stateKey]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={updateOrderStatus}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
}
