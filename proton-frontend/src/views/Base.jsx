import {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";

import {protonApi} from "../utiils/api";
import {ORDERS_ENDPOINT} from "../utiils/constants";

const Base = () => {
    const [orders, setOrders] = useState([]);
    const [followUpOrders, setFollowUpOrders] = useState([]);

    useEffect(() => {
        protonApi.get(ORDERS_ENDPOINT)
            .then((response) => setOrders(response.data))
            .catch((e) => console.log(e));
    }, []);

    return <Outlet context={{ orders, setOrders, followUpOrders, setFollowUpOrders }} />;
};

export default Base;
