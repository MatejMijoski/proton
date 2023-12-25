import {useNavigate, useOutletContext} from "react-router-dom";

import {TableColumns} from "../utiils/constants";
import Table from "../components/Table";

const Orders = () => {
    const { orders, setOrders, setFollowUpOrders } = useOutletContext();
    const navigate = useNavigate();

    const handleFollowUpOrders = (selectedItems, setSelectedItems) => {
        setFollowUpOrders(selectedItems);
        const selectedOrderIds = selectedItems.map((i) => i.id);
        setOrders((oldVal) => oldVal.filter((i) => !selectedOrderIds.includes(i.id)));
        setSelectedItems([]);
    }

    return (
        <div>
            <h5>Orders</h5>
            <Table
                items={orders}
                columns={TableColumns}
                getHeaders={(selectedItems, setSelectedItems) => (
                    <div>
                        <button disabled={selectedItems.length === 0} onClick={() => handleFollowUpOrders(selectedItems, setSelectedItems)}>Add to follow up orders</button>
                        <button onClick={() => navigate('/follow-up-orders')}>Follow up Orders</button>
                    </div>
                )}
            />
        </div>
    )
}

export default Orders;
