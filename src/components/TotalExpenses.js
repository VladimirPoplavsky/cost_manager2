/*
----- Developers info -----
Dev1 name: Vladimir Poplavsky
Dev1 ID: 336137468

Dev2 name: Sergey Gershov
Dev2 ID: 327232450

Dev3 name: Ilan Yashan
Dev3 ID: 201211588
 */

import {useState, useRef} from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';


function TotalExpenses(props) {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [total, setTotal] = useState(0);

    const hideTotal = () => {
        setShow(show);
    };

    const handleTotal = () => {
        setShow(!show);
        let sum = 0;
        for (let i = 0; i < props.records.length; i++) {
            sum += parseFloat(props.records[i].sum);
        }
        setTotal(sum);

        // hide total expenses after 2 seconds
        setTimeout(hideTotal, 2000);
    }


    return (
        <>
            <Button variant={"warning"} ref={target} onClick={handleTotal}>
                Click to see total expenses
            </Button>
            <Overlay target={target.current} show={show} placement={"right"}>
                {({
                      placement: _placement,
                      arrowProps: _arrowProps,
                      show: _show,
                      popper: _popper,
                      hasDoneInitialMeasure: _hasDoneInitialMeasure,
                      ...props
                  }) => (
                    <div
                        {...props}
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(238,137,0,0.85)',
                            padding: '2px 10px',
                            color: 'white',
                            borderRadius: 3,
                            ...props.style,
                        }}
                    >
                        ₪{total}
                    </div>
                )}
            </Overlay>
        </>
    );
}

export default TotalExpenses;