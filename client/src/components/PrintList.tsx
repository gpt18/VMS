
import { Button } from "./Button";
import { BsPrinter } from "react-icons/bs";
import { TextField } from "./TextField";
import { RiPlayListAddLine } from "react-icons/ri";
import { RiContactsLine } from "react-icons/ri";
import React, { useState } from "react";


export default function PrintList() {

    const productNameRef = React.useRef(null);
    const qtyRef = React.useRef(null);
    const sizeRef = React.useRef(null);
    const remarkRef = React.useRef(null);

    const [productList, setProductList] = useState([{
        qty: "",
        productName: "",
        size: "",
        remark: "",
    }]);

    const [count, setCount] = useState(1);
    const today = new Date().toLocaleDateString();
    const [clientDetail, setClientDetail] = useState({
        listNo: generateUniqueId(count),
        clientName: "",
        date: today,
    });

    const [newItem, setNewItem] = useState({
        qty: "",
        productName: "",
        size: "",
        remark: "",
    });

    const handleChangeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientDetail((prevClientDetail) => ({ ...prevClientDetail, [e.target.name]: e.target.value }));
    };

    const handleChangeItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem((prevNewItem) => ({ ...prevNewItem, [e.target.name]: e.target.value }));
    }

    const addItem = () => {

            if(newItem.productName === "") {
                alert("Product Name is required");
                return;
            }
            

        setProductList((prevProductList) => ([...prevProductList, newItem]));

        setNewItem({
            qty: "",
            productName: "",
            size: "",
            remark: "",
        });

        if (productNameRef.current) {
            const productNameRef = React.useRef<HTMLInputElement>(null);
            productNameRef.current?.focus();
        }


    };

    const clear = () => {
        setNewItem({
            qty: "",
            productName: "",
            size: "",
            remark: "",
        });
    }


    return (
        <>
            <div className="w-full bg-gray-200">
                <div className="container mx-auto">
                    <div className="min-h-screen grid grid-cols-2 justify-items-center">
                        <div className="p-4 relative">
                            <div className="sticky top-4">
                                <div className="text-5xl">Product List</div>
                                <div className="bg-white border rounded-md my-8 px-6 py-4 shadow ">
                                    <div className="flex gap-2 items-center text-xl font-medium"><RiContactsLine />To Client</div>

                                    <div className="pt-6 pb-10 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div>List No:</div>
                                            <div className="flex-1"><TextField onChange={handleChangeClient} value={clientDetail.listNo} name="listNo" /></div>
                                            <div>{clientDetail.date}</div>
                                            <Button variant={"ghost"} size={"icon"}><input type="date" onChange={handleChangeClient} name="date" className="p-0 m-0 bg-transparent" /></Button>
                                        </div>
                                        <div className="flex items-center gap-4 ">
                                            <div>To:</div>
                                            <div className="flex-1"><TextField placeholder={"Client Name"} value={clientDetail.clientName} name="clientName" onChange={handleChangeClient} /></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white border rounded-md my-8 px-6 py-4 shadow ">
                                    <div className="flex gap-2 items-center text-xl font-medium"><RiPlayListAddLine />Add Item</div>

                                    <form>
                                    <div className="pt-6 pb-10 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div>Product Name:</div>
                                            <div className="flex-1">
                                            <TextField ref={productNameRef} placeholder={"Product Name"} value={newItem.productName} name="productName" onChange={handleChangeItem} required/>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div>Quantity:</div>
                                            <div className="flex-1">
                                            <TextField ref={qtyRef} placeholder={"QTY"} value={newItem.qty} name="qty" onChange={handleChangeItem} />
                                            </div>
                                            <div>Size:</div>
                                            <div className="flex-1">
                                            <TextField ref={sizeRef} placeholder={"Size"} value={newItem.size} name="size" onChange={handleChangeItem} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div>Remark:</div>
                                            <div className="flex-1">
                                            <TextField ref={remarkRef} value={newItem.remark} name="remark" placeholder={"Is there anything else left to mark?"} onChange={handleChangeItem} />
                                            </div>
                                        </div>

                                    </div>
                                    </form>
                                    <div className="flex justify-center gap-4">
                                        <Button variant={"dark"} onClick={addItem}>Add</Button>
                                        <Button variant={"ghost"} onClick={clear}>Clear</Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="">
                            <div className="px-4 py-2 flex justify-end"><Button variant={"dark"} onClick={() => window.open('../print', '_blank', "width=895px, height=1042px")?.print()} startIcon={<BsPrinter />}>Print</Button></div>
                            <ListPreview clientDetail={clientDetail} productList={productList} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

const product_data = [
    {
        qty: "2'",
        product_name: "pipe",
        size: `3/4"`,
        remark: "supreme"
    },
    {
        qty: "5pc",
        product_name: "plane elbow",
        size: `3/4"`,
        remark: ""
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
    {
        qty: "500g",
        product_name: "solvent",
        size: ``,
        remark: "CPVC"
    },
]

type PrintCurrentProps = {
    productList: {
        qty: string,
        productName: string,
        size: string,
        remark: string,
    }[],
    clientDetail: {
        listNo: string,
        clientName: string,
        date: string,
    },
}

export function PrintCurrent({ clientDetail, productList }: PrintCurrentProps) {
    document.title = "document"

    const [productLists, setProductLists] = useState([{
        qty: "",
        productName: "",
        size: "",
        remark: "",
    }]);

    const [clientDetails, setClientDetails] = useState({
        listNo: "",
        clientName: "",
        date: "",
    });

    // useEffect(() => { 
    //     setClientDetails(clientDetail);
    //     setProductLists(productList);
    //  }, [clientDetail, productList]);


    return (
        <>
            <div className="mx-auto w-[595px] ">
                <div className="flex flex-col border rounded-md m-4 pb-10 bg-white shadow">
                    <div className="text-center py-6">
                        <div className="text-xl font-bold">Ram Lakhan Plumbing Contractor</div>
                        <div className="text-sm font-light">Noida, Uttar Pradesh - 201301 | Mob: 9350570241</div>
                    </div>
                    <div className="grid grid-cols-2 border-t border-b p-4">
                        <div>
                            <div className="text-sm text-gray-500">List No. {clientDetails.listNo}</div>
                            <div>To: <b>C-53, Sector-19</b></div>
                        </div>
                        <div className="text-right place-self-end">
                            <div>Date</div>
                            <div className="font-bold">20-10-2023</div>
                        </div>
                    </div>
                    <div className="py-6">
                        <div className="text-center font-bold underline underline-offset-4">Product List</div>
                    </div>
                    <div className="p-4 capitalize">
                        <table className="table-auto w-full">
                            <thead className="text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 rounded-s-md">Qty</th>
                                    <th className="px-4 py-2">Product Name</th>
                                    <th className="px-4 py-2">Size</th>
                                    <th className="px-4 py-2 rounded-e-md">Remark</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    product_data.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-2 py-1"> {item.qty} </td>
                                            <td className="px-2 py-1"> {item.product_name} </td>
                                            <td className="px-2 py-1"> {item.size} </td>
                                            <td className="px-2 py-1"> {item.remark} </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export function ListPreview({ clientDetail, productList }: PrintCurrentProps) {

    return (
        <>
            <div className="mx-auto w-[595px] ">
                <div className="flex flex-col border rounded-md m-4 pb-10 bg-white shadow">
                    <div className="text-center py-6">
                        <div className="text-xl font-bold">Ram Lakhan Plumbing Contractor</div>
                        <div className="text-sm font-light">Noida, Uttar Pradesh - 201301 | Mob: 9350570241</div>
                    </div>
                    <div className="grid grid-cols-2 border-t border-b p-4">
                        <div>
                            <div className="text-sm text-gray-500 font-sans">List No. {clientDetail.listNo}</div>
                            <div className="break-words">To: <b> {clientDetail.clientName} </b></div>
                        </div>
                        <div className="text-right place-self-end">
                            <div>Date</div>
                            <div className="font-bold"> {clientDetail.date} </div>
                        </div>
                    </div>
                    <div className="py-6">
                        <div className="text-center font-bold underline underline-offset-4">Product List</div>
                    </div>
                    <div className="p-4 capitalize">
                        <table className="table-auto w-full">
                            <thead className="text-gray-700 uppercase bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 rounded-s-md">Qty</th>
                                    <th className="px-4 py-2">Product Name</th>
                                    <th className="px-4 py-2">Size</th>
                                    <th className="px-4 py-2 rounded-e-md">Remark</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    productList.map((item, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="px-2 py-1"> {item.qty} </td>
                                            <td className="px-2 py-1"> {item.productName} </td>
                                            <td className="px-2 py-1"> {item.size} </td>
                                            <td className="px-2 py-1"> {item.remark} </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

function generateUniqueId(count: number): string {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString().slice(-2);
    const randomAlphabet = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26));
    const incrementDigitCount = count; // Replace with your logic to increment the digit count
    const uniqueId = `PL${day}${month}${year}${randomAlphabet}00${incrementDigitCount.toString().padStart(2, '0')}`;
    return uniqueId;
}
