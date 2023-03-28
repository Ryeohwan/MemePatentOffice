import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from "./TradeList.module.css";

interface Product {
    date: string;
    seller: string;
    buyer: string;
    price: number;
}

interface ColumnMeta {
    field: string;
    header: string;
}

const TransactionList:React.FC = () => {
    const products = [
        {
            date: "2021-02-03",
            buyer: "단발머리 부엉이 잉",
            price: 200
        },
        {
            date: "2022-03-03",
            buyer: "5조의 햇살",
            price: 320
        },
        {
            date: "2023-03-22",
            buyer: "류러말즈",
            price: 1200
        }
    ]
    // const [products, setProducts] = useState<Product[]>([]);

    const columns: ColumnMeta[] = [
        {field: 'date', header: '날짜'},
        {field: 'buyer', header: '구매자'},
        {field: 'price', header: '가격(SSF)'}
    ];

    useEffect(() => {
        // products (거래내역 리스트) 불러옴
    }, []);

    return (
        <div className={styles.transactionGraph}>
            <DataTable value={products} tableStyle={{ width: '342px', fontSize: '12px' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} style={{ fontSize: '11px', lineHeight: '17px' }}/>
                ))}
            </DataTable>
        </div>
    );
};

export default TransactionList;