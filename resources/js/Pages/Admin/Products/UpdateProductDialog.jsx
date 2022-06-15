import {Inertia} from "@inertiajs/inertia";
import ProductDialog from "./ProductDialog";
import {DialogContentText} from "@mui/material";

export default function UpdateProductDialog(props) {
    const updateProduct = (formData) => {
        Inertia.post("/admin/products/" + props.product.id, {
            _method: 'PATCH',
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
            title="Update Product"
            submitText="Update"
            open={props.open}
            onSubmit={updateProduct}
            onCancel={props.onCancel}
            product={props.product}
        >
            <DialogContentText mb={2}>
                Modify the fields below to update this product.
            </DialogContentText>
        </ProductDialog>
    );
}
