import { Col, Container, Row } from "react-bootstrap"
import './Contact.css'
import { toast } from "react-toastify"

const Contact = () => {
    const handleSubmit = (e)=>{
        e.preventDefault();
        toast.success("Message send successfuly")
        e.target.reset();
    }
    return (
        <>
            <Container fluid className="contact1">
                <Row>
                    <Col>
                        <section className="contact">
                            <div className="contact-container">
                                <h1>Contact Us</h1>
                                <p className="contact-subtitle">
                                    Have a question or want to work with us? We’d love to hear from you.
                                </p>

                                <form className="contact-form" onSubmit={handleSubmit}>
                                    <input type="text" placeholder="Your Name" />
                                    <input type="email" placeholder="Your Email" />
                                    <textarea placeholder="Your Message" rows="5"></textarea>

                                    <button type="submit">Send Message</button>
                                </form>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Contact;