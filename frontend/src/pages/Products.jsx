
import {Container, Row } from "react-bootstrap";
import ProductCol from "../componentsss/ProductCol";
import { useSelector } from "react-redux";

const Products = () => {

    const { products = [] } = useSelector((state) => state.productState)

    
    
    return (
        <>
        
        <Container className="mt-4">
            <h2 className="fw-bold text-center">Products</h2>
        <Row>
            {products.map((element,index)=>(
        
                <ProductCol key={index} element={element} />
            ))}
        </Row>
       </Container>
        

        </>
    )
}
export default Products;