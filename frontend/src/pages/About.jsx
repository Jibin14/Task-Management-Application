import { Col, Container, Row } from "react-bootstrap";
import "./About.css"

const About = () => {
    return (
        <Container fluid className="about1 about my-4">
            <Row>
                <Col>
                    <section className="about">
                        <div className="about-container">
                            <h1>About Us</h1>

                            <p className="about-text">
                                We are a passionate team focused on building modern clothes.
                                Our goal is to create clean and attrative designs in good 
                                quaility and fast deliver to our indian users.
                            </p>

                            <div className="about-cards">
                                <div className="card">
                                    <h3>🚀 Our Mission</h3>
                                    <p>
                                        To deliver high-quality clothes at medium rate and fast delivery.
                                    </p>
                                </div>

                                <div className="card">
                                    <h3>💡 Our Vision</h3>
                                    <p>
                                        To grow as a trusted platform that helps users to buy quality clothings.
                                    </p>
                                </div>

                                <div className="card">
                                    <h3>🛠️ Technologies</h3>
                                    <p>
                                        React, JavaScript, HTML, CSS, Bootstrap, and modern UI frameworks.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </Col>
            </Row>
        </Container>
    )
}
export default About;