import styled from 'styled-components';
import { Link } from 'react-router-dom'
import Button from './common.js'
const Upcoming = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

`
const Title = styled.h1`
    font-weight: bold;
`

function MyEvents(){
    return(
        <>
            <Upcoming>
                <Title>Upcoming Events</Title>
                <Link className="create-event" to={'/create'}>
                    <Button>Create Event</Button>
                </Link>
            </Upcoming>
        </>
    )
}

export default MyEvents;