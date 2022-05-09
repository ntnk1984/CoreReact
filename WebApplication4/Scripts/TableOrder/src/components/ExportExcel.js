import React from 'react'

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from 'antd';
import { checkQuyen } from '../athor/Authoraziton.js';



export const ExportExcel = ({csvData}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = () => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, Date.now() + fileExtension);
    }

    return (
        <Button type='link' disabled={checkQuyen()!=1} onClick={(e) => exportToCSV() }>Xuất file excel</Button>
    )
}