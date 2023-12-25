import Orders from "../views/Orders";
import FollowUpOrders from "../views/FollowUpOrders";

const Routes = [
    {
        path: "/",
        view: Orders,
    },
    {
        path: "/follow-up-orders",
        view: FollowUpOrders,
    }
]

export default Routes;
