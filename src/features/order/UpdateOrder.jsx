import { useFetcher } from "react-router-dom"
import Button from "../../ui/Button"
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
    const fetcher = useFetcher();
    return (
        <fetcher.Form method="patch" className="text-right">
            <Button type="primary">Make priority</Button>
        </fetcher.Form>
    )
}

export async function action({ request, params }) {
    const data = { priority: true };
    const id = params.orderId;
    await updateOrder(id, data)
    return null;
}
export default UpdateOrder