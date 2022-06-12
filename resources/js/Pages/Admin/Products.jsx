import Title from "./Title";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Add} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {Stack} from "@mui/material";
import Dashboard from "./Dashboard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ProductDialog from "./ProductDialog";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

export default function Products() {
    React.useState()
    let openCreateProductDialog = () => {

    }

    return (
        <>
            <Dashboard>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Title>Products</Title>

                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Ship To</TableCell>
                                        <TableCell>Payment Method</TableCell>
                                        <TableCell align="right">Sale Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.shipTo}</TableCell>
                                            <TableCell>{row.paymentMethod}</TableCell>
                                            <TableCell align="right">{`$${row.amount}`}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            <Stack direction="row" spacing={2} sx={{my: 2}}>
                                <Button variant="contained" startIcon={<Add/>}>
                                    Create Product
                                </Button>
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Dashboard>

            <ProductDialog title="Create Product"></ProductDialog>
        </>
    );
}
