import { useQuery } from "@tanstack/react-query";
import { Container, Accordion, Row } from "react-bootstrap";
import { getOrders } from "../api/orders";

const Order = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error...</h2>;

  console.log(data);

  return (
    <>
      <Container>
        <h2>Orders Page</h2>
        <Row>
          <table className="table table-primary table-striped-columns">
            <thead>
              <tr>
                <th>Pic</th>
                <th>Buyer</th>
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
                      src={`http://localhost:8888/${order?.product?.image}`}
                      alt={order?.product?.name}
                      width="50"
                    />
                  </td>
                  <td>{order.user.fullname}</td>
                  <td>${order?.product?.price}</td>
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

export default Order;
