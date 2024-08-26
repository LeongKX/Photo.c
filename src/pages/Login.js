import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/users";
import Swal from "sweetalert2";
import { saveToken } from "../utils/authToken";
import Cookies from "js-cookie";

const Login = ({ setToken }) => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { mutate } = useMutation({ mutationFn: login });
  // const queryClient = useQueryClient();
  const onChangeHandler = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    mutate(user, {
      onSuccess: ({ data, status }) => {
        if (status >= 400)
          return Swal.fire({ title: "Ooops", text: data.msg, icon: "error" });
        if (data && status === 200) {
          Swal.fire({
            title: "Login Successful",
            text: data.msg,
            icon: "success",
          });

          saveToken(data.token);
          Cookies.set("isAdmin", data.user.isAdmin, { expires: 1 });
          setToken(data.token);
          if (data.user.isAdmin) return navigate("/dashboard");
          else return navigate("/");
          // navigate("/");
        }
      },
      onError: (error) => {
        Swal.fire({
          title: "Ooops!",
          text: error.response.data.msg,
          icon: "error",
        });
        console.error(error.response.data.msg);
      },
    });
  };
  return (
    <Container className="mt-5 bg-warning text-white">
      <h2 className="py-5 text-center">Login Page</h2>
      <Form className="py-5" onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
