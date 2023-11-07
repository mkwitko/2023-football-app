import { Context } from "src/context/Context";
import { useContext } from "react";

export const WalletPayment = async ({
    amount
}: {
    amount: number;
}) => {
    const { user } = useContext(Context);
    fetch(`${process.env.REACT_APP_BACKEND_DEV}/pay`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: user.hook.data.id,
            amount
        })
    }).then(res => res.json()).then(data => {
        return data;
    })
}