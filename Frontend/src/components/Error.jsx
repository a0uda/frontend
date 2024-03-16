import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function AlertDismissible({ message, variant,trigger }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(trigger);
    console.log(trigger);
  }, [message,trigger]);
  return (
    <>
      {show && (
        <Alert className="alertpopup" variant={variant} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{message}</Alert.Heading>
          <p></p>
        </Alert>
      )}
    </>
  );
}

export default AlertDismissible;
