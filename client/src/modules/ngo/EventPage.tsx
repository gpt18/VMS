import { useState } from "react";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";

interface Product {
    id: string;
    name: string;
    quantity: number;
    size: string;
    remark: string;
}

interface EventPageProps {
    // add any props you need here
}

interface EventPageState {
    products: Product[];
}

export function EventPage(props: EventPageProps) {
    const [products, setProducts] = useState<Product[]>([]);

    const handleAddProduct = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;

        const product = {
            id: form.id.value,
            name: form.name.value,
            quantity: Number(form.quantity.value),
            size: form.size.value,
            remark: form.remark.value,
        };

        setProducts([...products, product]);
        form.reset();
    };

    return (
        <>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4">
                    <form onSubmit={handleAddProduct}>
                        <div className="flex flex-col gap-2">
                            <TextField type="text" name="id" placeholder="Product id" />
                            <TextField type="text" name="name" placeholder="Product name" />
                            <TextField type="number" name="quantity" placeholder="Quantity" />
                            <TextField type="text" name="size" placeholder="Size" />
                            <TextField type="text" name="remark" placeholder="Remark" />
                            <Button type="submit">Add product</Button>
                        </div>
                    </form>
                </div>
                <div>
                    <ul>
                        {products.map((product) => (
                            <li key={product.id}>
                                {product.name} - {product.quantity} - {product.size} -{" "}
                                {product.remark}
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
}
