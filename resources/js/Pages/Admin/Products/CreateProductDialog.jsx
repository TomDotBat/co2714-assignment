import {Inertia} from "@inertiajs/inertia";
import ProductDialog from "./ProductDialog";

export default function CreateProductDialog(props) {
    const createProduct = (productData) => {
        Inertia.post("/admin/products", productData, {
            forceFormData: true,
        });
        props.onSubmit(productData);
    }

    return (
        <ProductDialog
            title="Create Product"
            submitText="Create"
            open={props.open}
            onSubmit={createProduct}
            onCancel={props.onCancel}
        />
    );
}
