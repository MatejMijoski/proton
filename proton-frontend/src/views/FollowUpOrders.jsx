import {useMemo} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";

import {TableColumns} from "../utiils/constants";
import Table from "../components/Table";


const FollowUpOrders = () => {
    const { followUpOrders, setOrders, setFollowUpOrders } = useOutletContext();
    const navigate = useNavigate();

    const removeSelected = (selectedItems, setSelectedItems) => {
        const selectedOrderIds = selectedItems.map((i) => i.id);
        const removedOrders = followUpOrders.filter((i) => selectedOrderIds.includes(i.id));
        setOrders((oldVal) => [...oldVal, ...removedOrders]);
        setFollowUpOrders((oldVal) => oldVal.filter((i) => !selectedOrderIds.includes(i.id)))
        setSelectedItems([]);
    }

    const totalAmount = useMemo(() =>
        followUpOrders.reduce((acc, i) => acc += i.total_price * i.quantity, 0), [followUpOrders]);

    return (
        <div>
            <h5>Follow Up Orders</h5>

            <h6>Total Price: {totalAmount}</h6>
            <h6>Count: {followUpOrders.length}</h6>
            <Table
                items={followUpOrders}
                columns={TableColumns}
                getHeaders={(selectedItems, setSelectedItems) => (
                    <div>
                        <button disabled={selectedItems.length  === 0} onClick={() => removeSelected(selectedItems, setSelectedItems)}>Remove Orders</button>
                        <button onClick={() => navigate('/')}>Orders</button>
                    </div>
                )}
            />
        </div>
    )
}

export default FollowUpOrders;
