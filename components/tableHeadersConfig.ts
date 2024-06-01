const tableHeaders = [
    { label: "Title", accessor: "title" },
    { label: "Brand", accessor: "brand" },
    { label: "Category", headerClass:"text-right",bodyClass:"text-right", accessor: "category" },
    { label: "Price", accessor: "price",headerClass:"text-right",bodyClass:"text-right", CellRenderer :(price: number|String)=>`$${price}` },
];

export default tableHeaders;