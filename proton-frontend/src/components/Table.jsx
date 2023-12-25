import {useState} from "react";

const Table = ({ items, columns, getHeaders }) => {
    const [selected, setSelected] = useState([]);

    const handleSelected = (isSelected, order) => {
        if (isSelected) {
            setSelected((oldSelected) => [...oldSelected, order]);
        } else {
            setSelected((oldSelected) => oldSelected.filter((i) => i.id !== order.id));
        }
    }

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelected(items);
        } else {
            setSelected([]);
        }
    }

    const isSelected = (order) => {
        return selected.map((i) => i.id).includes(order.id);
    }

    return (
        <div>
            {getHeaders(selected, setSelected)}
            <table>
                <thead>
                    <tr>
                        <th>Selected <input checked={selected.length === items.length && selected.length !== 0} type="checkbox" onChange={handleSelectAll}/></th>
                        {columns.map((col) => <th style={{ paddingRight: '10px' }} key={col}>{col}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {items.map((order) => (
                        <tr style={{ paddingRight: '10px' }} key={`${order.id}-${order.external_id}`}>
                            <td>
                                <input type='checkbox' checked={isSelected(order)} onChange={(e) => handleSelected(e.target.checked, order)} />
                            </td>
                            <td>{order.order.external_id}</td>
                            <td>{order.order.customer.external_id}</td>
                            <td>{order.order.customer.name}</td>
                            <td>{order.product.external_id}</td>
                            <td>{order.product.name}</td>
                            <td>{order.quantity}</td>
                            <td>{order.total_price}</td>
                            <td>{order.order.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table;
