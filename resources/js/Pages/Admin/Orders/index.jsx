import { DateTime } from 'luxon';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import price from '../../../Services/price';
import Dashboard from "../Dashboard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {Delete, Edit, Search} from "@mui/icons-material";
import {DialogContentText, Stack} from "@mui/material";
import DeleteConfirmationDialog from "../../../Components/DeleteConfirmationDialog";
import {Inertia} from "@inertiajs/inertia";
import {useState} from "react";
import OrderStatus from "../../../Services/OrderStatus";
import OrderProductsDialog from "../../../Components/OrderProductsDialog";
import UpdateOrderStatusDialog from "./UpdateOrderStatusDialog";
import shortUuid from "../../../Services/shortUuid";

export default function Orders({orders = {}}) {
    const [viewProductsOrder, setViewProductsOrder] = useState(null);
    const [statusUpdateOrder, setStatusUpdateOrder] = useState(null);
    const [deleteConfirmationOrder, setDeleteConfirmationOrder] = useState(null);

    return (
        <>
            <Dashboard>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Orders
                            </Typography>

                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Reference</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell>
                                                <Tooltip arrow placement="top" title={order.id}>
                                                    <div>
                                                        {shortUuid(order.id)}
                                                    </div>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>{order.user.name}</TableCell>
                                            <TableCell>{OrderStatus[order.status] ?? "Unknown"}</TableCell>
                                            <TableCell align="right">{price(order.total)}</TableCell>
                                            <TableCell>{DateTime.fromISO(order.created_at).toLocaleString(DateTime.DATETIME_MED)}</TableCell>
                                            <TableCell align="center">
                                                <Stack direction="row" spacing={{ sm: 1 }}>
                                                    <Tooltip arrow placement="top" title="View Products">
                                                        <IconButton onClick={() => setViewProductsOrder(order)}>
                                                            <Search/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip arrow placement="top" title="Update Status">
                                                        <IconButton onClick={() => setStatusUpdateOrder(order)}>
                                                            <Edit/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip arrow placement="top" title="Delete">
                                                        <IconButton onClick={() => setDeleteConfirmationOrder(order)}>
                                                            <Delete/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </Stack>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Dashboard>

            <OrderProductsDialog
                showId
                open={viewProductsOrder != null}
                order={viewProductsOrder}
                onClose={() => setViewProductsOrder(null)}
            />

            <UpdateOrderStatusDialog
                open={statusUpdateOrder != null}
                order={statusUpdateOrder}
                onClose={() => setStatusUpdateOrder(null)}
            />

            <DeleteConfirmationDialog
                title="Confirm Order Deletion"
                open={deleteConfirmationOrder != null}
                onConfirm={() => {
                    Inertia.delete("/admin/orders/" + deleteConfirmationOrder.id);
                    setDeleteConfirmationOrder(null);
                }}
                onCancel={() => setDeleteConfirmationOrder(null)}
            >
                <DialogContentText>
                    The order will no longer be visible to the customer once deleted.
                </DialogContentText>
            </DeleteConfirmationDialog>
        </>
    );
}
