import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";

const ProductDetails = () => {
	const { id } = useParams();
	const { data, isLoading } = useQuery({ queryKey: ["product", id], queryFn: getProductById });

	if (isLoading) return <h2>Loading...</h2>;
	console.log(data);
	return <h2>Product Details Page</h2>;
};

export default ProductDetails;
