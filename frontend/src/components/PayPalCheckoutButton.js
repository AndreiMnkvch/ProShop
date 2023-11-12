import { PayPalButtons } from "@paypal/react-paypal-js";
import { payOrder} from '../features/orders/orderPaySlice';
import { useDispatch } from "react-redux";


function PayPalCheckoutButton(props){
    const style = {
        color: "silver",
        layout: "horizontal",
        tagline: false,
        shape: "pill",
        height: 55,
    }
    const dispatch = useDispatch()
    const {order} = props

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.total_price
                    }
                }
            ]
        })
    }

    const onApprove = async (data, actions) => {
        const orderPayPal = await actions.order.capture();
        dispatch(payOrder(order.id))
    }
    
    const onError = async (data, actions) => {
        console.log("On Error: ", "data: ", data, "actions: ", actions)
    }       

    return <PayPalButtons
                style={style}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
            >
    </PayPalButtons>

}
export default PayPalCheckoutButton;