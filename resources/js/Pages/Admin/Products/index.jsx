import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Add, Delete, Edit} from "@mui/icons-material";
import Button from "@mui/material/Button";
import Dashboard from "../Dashboard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useState} from "react";
import Container from "@mui/material/Container";
import productTypeIcon from "../../../Services/productTypeIcon";
import Tooltip from "@mui/material/Tooltip";
import price from "../../../Services/price";
import IconButton from "@mui/material/IconButton";
import {DialogContentText, Stack} from "@mui/material";
import DeleteConfirmationDialog from "../../../Components/DeleteConfirmationDialog";
import {Inertia} from "@inertiajs/inertia";
import CreateProductDialog from "./CreateProductDialog";
import Typography from "@mui/material/Typography";
import UpdateProductDialog from "./UpdateProductDialog";

export default function Products({products = {}}) {
    const [createProductDialogOpen, setCreateProductDialogOpen] = useState(false);
    const [updatingProduct, setUpdatingProduct] = useState(null);
    const [deleteConfirmationProduct, setDeleteConfirmationProduct] = useState(null);

    return (
        <>
            <Dashboard>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", mb: 2 }} disableGutters>
                                <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                    Products
                                </Typography>
                                <Button variant="contained" startIcon={<Add/>} onClick={() => setCreateProductDialogOpen(true)}>
                                    Create Product
                                </Button>
                            </Container>

                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.id}</TableCell>
                                            <TableCell>{product.title}</TableCell>
                                            <TableCell>{product.description}</TableCell>
                                                <TableCell>
                                                    <Tooltip arrow placement="top" title={
                                                        product.type.charAt(0).toUpperCase() + product.type.slice(1)
                                                    }>
                                                        {productTypeIcon(product)}
                                                    </Tooltip>
                                                </TableCell>
                                            <TableCell align="right">{price(product.price)}</TableCell>
                                            <TableCell>
                                                <Stack direction="row" spacing={{ sm: 1 }}>
                                                    <IconButton onClick={() => setUpdatingProduct(product)}>
                                                        <Edit/>
                                                    </IconButton>
                                                    <IconButton onClick={() => setDeleteConfirmationProduct(product)}>
                                                        <Delete/>
                                                    </IconButton>
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

            <CreateProductDialog
                open={createProductDialogOpen}
                onSubmit={() => setCreateProductDialogOpen(false)}
                onCancel={() => setCreateProductDialogOpen(false)}
            />

            <UpdateProductDialog
                open={updatingProduct != null}
                product={updatingProduct}
                onSubmit={() => setUpdatingProduct(null)}
                onCancel={() => setUpdatingProduct(null)}
            />

            <DeleteConfirmationDialog
                title="Confirm Product Deletion"
                open={deleteConfirmationProduct != null}
                onConfirm={() => {
                    Inertia.delete("/admin/products/" + deleteConfirmationProduct.id);
                    setDeleteConfirmationProduct(null);
                }}
                onCancel={() => setDeleteConfirmationProduct(null)}
            >
                <DialogContentText>
                    The product will no longer appear on the menu once deleted.
                    Previously placed orders will still keep this product.
                </DialogContentText>
            </DeleteConfirmationDialog>
        </>
    );
}
