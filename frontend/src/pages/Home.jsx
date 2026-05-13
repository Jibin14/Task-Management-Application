import { Button, Card, Col, Container, Row } from "react-bootstrap";
import './Home.css';
import ProductCol from "../componentsss/ProductCol";
import About from "./About";
import Contact from "./Contact";
import { useSelector } from "react-redux";
import Carousels from "../componentsss/Carousels";

const Home = () => {
    const { products = [] } = useSelector((state) => state.productState)

    
    return (
       <>
       <Carousels />
       <Container className="my-4">

        <Row>
             {products.map((element, index) => (
        <ProductCol element={element} key={index} />
       ))}
        </Row>
       </Container>
       <About />
       <Contact />
      
       

        
        
        </>
    )
}
export default Home;