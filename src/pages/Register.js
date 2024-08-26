import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import {registerUser } from "../api/users";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query"; 

const Register = () => {
	const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { mutate } = useMutation({ mutationFn: registerUser });

	const onChangeHandler = (e) => setUser({ ...user, [e.target.name]: e.target.value });
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        // if (user.password !== user.password2) return Swal.fire({ title: "Ooops", text: "Password should match", icon: "warning" });

        mutate(user, {
            onSuccess: ({ data, status }) => {
                if (status >= 400) Swal.fire({ title: "Ooops", text: data.msg, icon: "error" });
                if (data && status === 200) {
                    Swal.fire({
                        title: "Congratulation",
                        text: data.msg,
                        icon: "success",
                    });

                    navigate("/login");
                }
            },
            onError: (error) => {
                Swal.fire({title: "Ooops!", text: error.response.data.msg, icon: "error" });
                console.error(error.response.data.msg)}
        });
    };

	return (
		<Container className="mt-5 bg-warning text-white">
			<h2 className="py-5 text-center">Register Page</h2>
			<Form className="py-5"  onSubmit={onSubmitHandler}>
				<Form.Group className="mb-3">
					<Form.Label>Full Name</Form.Label>
					<Form.Control type="text" name="fullname" onChange={onChangeHandler} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" name="username" onChange={onChangeHandler} />
				</Form.Group>
                <Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control type="text" name="email" onChange={onChangeHandler} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" onChange={onChangeHandler} />
				</Form.Group>
                <Form.Group className="mb-3">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" name="password2" onChange={onChangeHandler} />
				</Form.Group>
				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
		</Container>
	);
};

export default Register;
