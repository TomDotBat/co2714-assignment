import {Inertia} from "@inertiajs/inertia";
import ProductDialog from "./ProductDialog";
import {DialogContentText} from "@mui/material";

export default function UpdateProductDialog(
    {
        product, open, onClose
    }
) {
    const updateProduct = (formData) => {
        Inertia.post("/admin/products/" + product.id, {
            _method: 'PATCH',
            title: formData.title,
            description: formData.description,
            type: formData.type,
            price: formData.price,
            image: formData.image
        }, {
            forceFormData: true,
            onSuccess: () => onClose()
        });
    }

    return (
        <ProductDialog
            title="Update Product"
            submitText="Update"
            open={open}
            onSubmit={updateProduct}
            product={product}
            onClose={onClose}
        >
            <DialogContentText mb={2}>
                Modify the fields below to update this product.
            </DialogContentText>
        </ProductDialog>
    );
}
