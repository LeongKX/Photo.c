import { useState } from "react";
import { Card, Col, Button, Row, Modal } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { addOrder } from "../api/orders";
import Swal from "sweetalert2";

const ProductCart = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  // Fetch product data if necessary
  const { data, isLoading, error } = useQuery({
    queryKey: [product._id],
    queryFn: () => fetchProductById(product._id), // Define this function based on your API
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addOrder(product._id);
      handleClose();
      Swal.fire({
        title: "Successful",
        text: "Your order has been purchased!",
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "There was an issue placing your order.",
        icon: "error",
      });
    }
  };

  return (
    <Col md={4}>
      <Card>
        <Card.Img
          variant="top"
          src={`http://localhost:8888/${product.image}`}
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        />
        <Card.Body className="bg-warning-subtle">
          <div>${product.price}</div>
        </Card.Body>
      </Card>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{product.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{product.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            ${product.price}
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default ProductCart;

// Define fetchProductById function if needed for useQuery
const fetchProductById = async (id) => {
  const response = await fetch(`/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Product not found");
  }
  return response.json();
};
