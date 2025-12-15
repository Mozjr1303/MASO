import React from 'react';
import './News.css';

const News = () => {
    // Mock data for initial display
    const newsItems = [
        {
            id: 1,
            title: "NOMINATIONS OPENING SOON",
            image: "/assets/img/nominee.png", // Using existing placeholder if specific article images aren't found
            time: "2 hours ago",
            link: "#"
        },
        {
            id: 2,
            title: "VOTING PHASE DETAILS",
            image: "/assets/img/vote.png",
            time: "5 hours ago",
            link: "#"
        },
        {
            id: 3,
            title: "AWARD NIGHT PREPARATIONS",
            image: "/assets/img/red-carpet.png",
            time: "1 day ago",
            link: "#"
        }
    ];

    return (
        <section id="news" className="news-section">
            <div className="container">
                <div className="section-header fade-in-up">
                    <h2 className="section-title">Latest News</h2>
                </div>

                <div className="news-grid">
                    {newsItems.map((item) => (
                        <div key={item.id} className="news-card fade-in-up">
                            <div className="news-img-wrapper">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="news-content">
                                <h3><a href={item.link}>{item.title}</a></h3>
                                <div className="news-meta">
                                    <div className="meta-item">
                                        <i className="clock-icon">🕒</i> {item.time}
                                    </div>
                                    <div className="read-more">
                                        Read More <span>→</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default News;
