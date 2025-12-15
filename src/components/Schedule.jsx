import React from 'react';
import './Schedule.css';

const Schedule = () => {
    const events = [
        {
            phase: "Phase 1",
            title: "Nominations",
            date: "6th October - 25th October",
            image: "/assets/img/nominee.png",
            active: false
        },
        {
            phase: "Phase 2",
            title: "Voting",
            date: "8th November - 29th November",
            image: "/assets/img/vote.png",
            active: false
        },
        {
            phase: "Phase 3",
            title: "Award Event",
            date: "13th December",
            image: "/assets/img/red-carpet.png",
            active: true // Highlight the final event
        }
    ];

    return (
        <section id="calendar" className="schedule-section">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Event Calendar</h2>
                    <p className="section-subtitle">Mark your calendars for the biggest nights of the year</p>
                </div>

                <div className="timeline">
                    {events.map((event, index) => (
                        <div key={index} className={`timeline-item ${event.active ? 'active' : ''} fade-in-up`}>
                            <div className="timeline-content">
                                <div className="phase-badge">{event.phase}</div>
                                <div className="event-card">
                                    <div className="event-icon">
                                        <img src={event.image} alt={event.title} />
                                    </div>
                                    <div className="event-details">
                                        <h3>{event.title}</h3>
                                        <p className="event-date">{event.date}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="timeline-dot"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Schedule;
