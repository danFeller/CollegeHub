import axios from "axios";
import {useEffect, useState} from "react";
import styled from 'styled-components';
import backendURL from "../config";
import {Button, Section} from './common.js';
import { useQuery, gql, useMutation} from '@apollo/client';
import Overlay from './Overlay'

const DELETE_EVENT = gql`
    mutation deleteEvent($id: ID!) {
        deleteEvent(id: $id)
    }
`
const ADD_USER = gql`
    mutation addUser($eventId: ID!, $eventRevision: ID!, $userId: ID!) {
        addUser(eventId: $eventId, eventRevision: $eventRevision, userId: $userId ) {
            id
            name
        }
    }
`
const GET_EVENTS = gql`
    query events($filter: EventFilter){
        events(filter:$filter) {
            id
            revision
            name
            status
            startTime
            endTime
            organizer {
                id
                firstName
            }
            attendees {
                id
                firstName
                lastName
            }
        }
    }
`;

const EventModal = styled.div`
 background: #cbd5e1;
 width: 400px;
 padding: 1.5rem;
 border-radius: 10px;
 box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
 word-wrap: break-word;
`

const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  word-wrap: break-word;
`;
const Title = styled.h2`
    font-weight: bold;
`

function Events() {
    const [userId, setUserId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [attendees, setAttendees] = useState([]); 

    const toggleOverlay = () => {
      setIsOpen(!isOpen);
    };
    const getUser = async () => {
        try {
            const url = `${backendURL.uri}/login/success`;
            const { data: { user } } = await axios.get(url, { withCredentials: true });
            return user
        } catch (err) {
            console.log(err);
        }
    };

    useEffect( () => {
        getUser().then((r)=> {
            setUserId(r.id)
        });
    }, []);

    const { loading, error, data } = useQuery(GET_EVENTS);
    const HandleAttendeesList = (eventId) => {
        // This is an array
        const currentAttendees = data.events.filter((event) => event.id === eventId)
        setAttendees(currentAttendees);
        // console.log(attendees)
        // for(let i = 0; i < currentAttendees[0].attendees.length; ++i){
        //     console.log(currentAttendees[0].attendees[i].firstName);
        // }
        toggleOverlay();
    }

    const [deleteEvent] = useMutation(DELETE_EVENT);
    const [addUser] = useMutation(ADD_USER);
    const handleDelete = async (eventId) => {
        await deleteEvent({ variables: { id: eventId }, refetchQueries: [{ query: GET_EVENTS }] });
    };

    const handleAttendees = async (eventId, eventRevision) => {
        await addUser({
            variables: {
                eventId: eventId,
                eventRevision: eventRevision,
                userId: `${userId}`,
            },
            refetchQueries: [{ query: GET_EVENTS }],
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message} {data}</p>;

    if (data.events.length > 0) {
        return (
            <>
                {data.events.map((events) => (
                    <EventModal key={events.id}>
                        <ModalRow>
                            <Title>{events.name}</Title>
                            {events.organizer.id === userId ? (<Button onClick={() => handleDelete(events.id)}>Delete</Button>) : (<></>)}
                        </ModalRow>
                        <ModalRow>
                            <h5>Number of Attendees: {events.attendees.length}</h5>
                        </ModalRow>
                        <h5>Event Start Date - {events.startTime}</h5>
                        <ModalRow>
                            <h5>Organizer - {events.organizer.firstName}</h5>
                            {events.organizer.id !== userId || events.attendees.some((obj) => obj.id === userId) ? (
                                <Button onClick={() => handleAttendees(events.id, events.revision)}>Join</Button>
                            ) : (
                                <></>
                            )}
                        </ModalRow>
                        {/* onClick={() => handleAttendeesList(events.id)} */}
                        <ModalRow>
                            {events.organizer.id === userId && events.attendees.length !== 0 ? (<Button onClick={() => HandleAttendeesList(events.id)} >Attendees</Button>) : (<></>)}
                            <Overlay isOpen={isOpen} onClose={toggleOverlay}>
                                {attendees.map((a) => (
                                    <>
                                        <h1>Attendees List</h1>
                                        <h3>{a.attendees[0].firstName}</h3>
                                    </>
                                ))}
                            </Overlay>
                        </ModalRow>
                    </EventModal>
                ))}
            </>
        );
    } else {
        return <></>; // or whatever you want to render when there are no events
    }
}

export default Events;