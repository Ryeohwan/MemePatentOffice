import React, { useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import styles from "./TradeList.module.css";

interface NftChartProps {
    tradeData: any;
  };

interface ColumnMeta {
    field: string;
    header: string;
}

const TradeList:React.FC<NftChartProps> = ({ tradeData }) => {
    useEffect(() => {
    }, [])
    const format = (value:string) => {
        const date = new Date(value);
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        return formattedDate;
    };
    
    let products;
    
    if (tradeData && tradeData.buyerList) {
        products = tradeData.buyerList.filter((item:any) => 
            item.createdAt = format(item.createdAt));
        // products = tradeData.buyerList
    };

    const columns: ColumnMeta[] = [
        {field: 'createdAt', header: '날짜'},
        {field: 'nickName', header: '구매자'},
        {field: 'price', header: '가격(SSF)'}
    ];

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

export default TradeList;