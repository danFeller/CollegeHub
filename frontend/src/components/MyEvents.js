import styled from 'styled-components';
import { Link } from 'react-router-dom'
const Upcoming = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`


function MyEvents(){
    return(
        <>
            <Upcoming>
                <h1>Upcoming Events</h1>
                <Link className="create-event" to={'/create'}>
                    <h3>Create Event</h3>
                </Link>
            </Upcoming>
        </>
    )
}

export default MyEvents;