import {Inertia} from "@inertiajs/inertia";
import ProductDialog from "./ProductDialog";
import {DialogContentText} from "@mui/material";

export default function CreateProductDialog(props) {
    const createProduct = (formData) => {
        Inertia.post("/admin/products", {
            title: formData.title,
            description: formData.description,
            type: formData.type,
            price: formData.price,
            image: formData.image
        }, {
            forceFormData: true,
        });
        props.onSubmit(formData);
    }

    return (
        <ProductDialog
            title="Create Product"
            submitText="Create"
            open={props.open}
            onSubmit={createProduct}
            onCancel={props.onCancel}
        >
            <DialogContentText mb={2}>
                Populate the following fields to create a product.
            </DialogContentText>
        </ProductDialog>
    );
}
