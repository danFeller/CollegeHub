import styled from 'styled-components';
import {Button, Section} from './common.js';

const EventModal = styled.div`
 background: #cbd5e1;
 background: #fb923c;
 width: 400px;
 padding: 1.5rem;
 border-radius: 10px;
 box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
`

const ModalRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
`


function Events(props){
    const {events} = props
    return(
        <>
            <EventModal>
                <ModalRow>
                    <h2>Event Name</h2>
                    <Button>Delete</Button>
                </ModalRow>
                <h5>Event Start Time</h5>
                <ModalRow>
                    <h5>Organizer</h5>
                    <Button>Join</Button>
                </ModalRow>
            </EventModal>
        </>
    )
}

export default Events;