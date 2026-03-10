import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
    const { events } = useLoaderData();

    //await - wait for the promise to resolve and then render the events list
    //suspense - show the fallback content while waiting for the promise to resolve
    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    );
}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events.' };
        // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
        //   status: 500,
        // });
        throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
            status: 500,
        });
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export async function loader() {
    return {
        events: loadEvents(),
    };
}
