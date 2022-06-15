import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dashboard from "../Dashboard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {AdminPanelSettings, Delete} from "@mui/icons-material";
import {Inertia} from "@inertiajs/inertia";
import {DialogContentText, Stack} from "@mui/material";
import DeleteConfirmationDialog from "../../../Components/DeleteConfirmationDialog";
import {useState} from "react";
import {usePage} from "@inertiajs/inertia-react";
import Tooltip from "@mui/material/Tooltip";

export default function Customers({customers = {}}) {
    const [deleteConfirmationCustomer, setDeleteConfirmationCustomer] = useState(null);

    const currentUserId = usePage().props.auth.user.id;

    return (
        <>
            <Dashboard>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                Customers
                            </Typography>

                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {customers.map((customer) => (
                                        <TableRow key={customer.id}>
                                            <TableCell>{customer.id}</TableCell>
                                            <TableCell>
                                                <Stack direction="row">
                                                    {customer.admin ? (
                                                        <Tooltip arrow placement="top" title="Administrator">
                                                            <AdminPanelSettings/>
                                                        </Tooltip>
                                                    ) : null}
                                                    {customer.name}
                                                </Stack>
                                            </TableCell>
                                            <TableCell>{customer.email}</TableCell>
                                            <TableCell align="center">
                                                <Tooltip arrow placement="top" title="Delete">
                                                    <IconButton onClick={() => setDeleteConfirmationCustomer(customer)} disabled={customer.id === currentUserId}>
                                                        <Delete/>
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Dashboard>

            <DeleteConfirmationDialog
                title="Confirm Customer Deletion"
                open={deleteConfirmationCustomer != null}
                onConfirm={() => {
                    Inertia.delete("/admin/customers/" + deleteConfirmationCustomer.id);
                    setDeleteConfirmationCustomer(null);
                }}
                onCancel={() => setDeleteConfirmationCustomer(null)}
            >
                <DialogContentText>
                    Are you sure you want do delete {deleteConfirmationCustomer?.name}?
                    They will need to re-register to use this service again.
                </DialogContentText>
            </DeleteConfirmationDialog>
        </>
    );
}
