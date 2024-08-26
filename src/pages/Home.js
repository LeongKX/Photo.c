import { useQuery } from "@tanstack/react-query";
import { Container, Row } from "react-bootstrap";
import { getProducts } from "../api/products";
import ProductCart from "../components/ProductCart";

const Home = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (isLoading) return <h2>Loading...</h2>;
    if (error) return <h2>Error...</h2>;

    return (
        <Container>
            <Row className="justify-content-center my-5">
                {data.map((product) => (
                    <ProductCart product={product} key={product._id} />
                ))}
            </Row>
        </Container>
    );
};

export default Home;
