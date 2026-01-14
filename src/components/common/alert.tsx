import {useAlertStore} from "@/src/stores/alert";
import {Alert, Fade} from "react-bootstrap";
import {useEffect} from "react";

export const AlertComm = () => {
    const {isShow, message, variant, setShow} = useAlertStore();

    useEffect(() => {
        if (isShow) {
            const timer = setTimeout(() => setShow(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isShow, setShow]);

    return (
        <>
            {isShow && (
                <Fade in={true} timeout={1000}>
                    <Alert
                        variant={variant}
                        dismissible
                        onClose={() => setShow(false)}
                        className="position-fixed top-0 end-0 m-3"
                        style={{zIndex: 1050}}
                    >
                        {message}
                    </Alert>
                </Fade>
            )}
        </>
    );
};
