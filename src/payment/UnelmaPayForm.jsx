import React, { useEffect, useRef } from "react";

const UnelmaPayForm = ({ orderId, itemName, amount }) => {
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      formRef.current.submit();
    }
  }, []);

  return (
    <form
      ref={formRef}
      method="POST"
      action="https://dev.unelmapay.com/sci/form"
    >
      <input type="hidden" name="merchant" value="290" />
      <input type="hidden" name="item_name" value={itemName} />
      <input type="hidden" name="amount" value={amount.toFixed(2)} />
      <input type="hidden" name="currency" value="debit_base" />
      <input type="hidden" name="custom" value={orderId} />

      <input
        type="hidden"
        name="success_url"
        value="https://unelma-platform-frontend.vercel.app/payment-success"
      />
      <input
        type="hidden"
        name="fail_url"
        value="https://unelma-platform-frontend.vercel.app/payment-failed"
      />
      <input
        type="hidden"
        name="status_url"
        value="https://e76e880127a8.ngrok-free.app/api/unelmapay/ipn"
      />
    </form>
  );
};

export default UnelmaPayForm;
