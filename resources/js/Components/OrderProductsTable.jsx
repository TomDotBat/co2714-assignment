import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Tooltip from "@mui/material/Tooltip";
import productTypeIcon from "../Services/productTypeIcon";
import price from "../Services/price";
import Table from "@mui/material/Table";

export default function OrderProductsTable({showId, products = []}) {
    return (
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
                {products.map((product) => (
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
    );
}
