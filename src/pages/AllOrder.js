import { useQuery } from "@tanstack/react-query";
import { Container, Accordion, Row } from "react-bootstrap";
import { getOrders } from "../api/orders";
import { getAllOrders } from "../api/orders";

const AllOrder = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error...</h2>;

  console.log(data);

  return (
    <>
      <Container>
        <h2>All Orders Page</h2>
        <Row>
          <table className="table table-primary table-striped-columns">
            <thead>
              <tr>
                <th>Pic</th>
                <th>Buyer</th>
                <th>Purchased-ID</th>
                <th>Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {console.log(data)}
              {data?.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img
                      src={`http://localhost:8888/${order.product.image}`}
                      alt={order.name}
                      width="50"  
                    />
                  </td>
                  <td>{order.user.fullname}</td>
                  <td>{order._id}</td>
                  <td>${order.product.price}</td>
                  <td>{order.purchased_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
      </Container>
    </>
  );
};

export default AllOrder;
