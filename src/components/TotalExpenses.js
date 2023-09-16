import {useState, useRef, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';


function TotalExpenses(props) {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [total, setTotal] = useState(0);

    const handleTotal = () => {
        setShow(!show);
        let sum = 0;
        for (let i = 0; i < props.records.length; i++) {
            sum += parseFloat(props.records[i].sum);
        }
        setTotal(sum);
    }


    return (
        <>
            <Button variant="warning" ref={target} onClick={handleTotal}>
                Click to see total expenses
            </Button>
            <Overlay target={target.current} show={show} placement="right">
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
                        {total}
                    </div>
                )}
            </Overlay>
        </>
    );
}

export default TotalExpenses;