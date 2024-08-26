import { useQuery } from "@tanstack/react-query";
import { getProductsAdmin, approveProduct } from "../api/products";
import { Button, Container, Row, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { addProduct, updateProduct, deleteProduct } from "../api/products";
import { isAdmin } from "../utils/authToken";
const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // State to store the current product being edited or deleted
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsAdmin,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error...</h2>;

  // Show the modal for adding a new product
  const handleShow = () => {
    setIsEditing(false);
    setFormData({ name: "", price: "", description: "", image: null });
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setShowDeleteModal(false);
    setCurrentProduct(null);
    setFormData({
      name: "",
      price: "",
      description: "",
      quantity: "",
      image: null,
    });
  };

  // const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Show the modal for editing a product and pre-fill the form with current product's data
  const handleEditShow = (product) => {
    setIsEditing(true);
    setCurrentProduct(product); // Store the selected product's data in the state
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      image: null,
    });
    setShowModal(true);
  };

  const handleDeleteShow = (product) => {
    setCurrentProduct(product);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await updateProduct(currentProduct._id, formData);
      } else {
        await addProduct(formData);
      }
      handleClose();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (e, id) => {
    e.preventDefault();

    try {
      await approveProduct(id);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(currentProduct._id);
      handleClose();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <h2>Dashboard Page</h2>
        {/* DISPLAY ALL PRODUCTS */}
        {isAdmin() ? (
          <div></div>
        ) : (
          <Row className="justify-content-end my-3">
            <Button variant="primary" onClick={handleShow}>
              Add
            </Button>
          </Row>
        )}

        <Row>
          <table className="table table-primary table-striped-columns">
            <thead>
              <tr>
                <th>Pic</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`http://localhost:8888/${product.image}`}
                      alt={product.name}
                      width="50"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      {isAdmin() ? (
                        <button
                          className="btn btn-success"
                          onClick={(e) => handleApprove(e, product._id)}
                        >
                          Approve
                        </button>
                      ) : (
                        <div>
                          <div style={{ display: "block" }}>
                            {" "}
                            {product.isActive
                              ? "Approved by admin"
                              : "Not approved by admin"}
                          </div>
                          <button
                            className="btn btn-success me-3"
                            onClick={() => handleEditShow(product)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteShow(product)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditing ? "Edit Product" : "Add Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter product price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter product description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showDeleteModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the product:{" "}
            <strong>{currentProduct?.name}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;
