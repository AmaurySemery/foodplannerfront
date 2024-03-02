import { Form, Link } from "react-router-dom"

function FormRegister() {
    return (
        <>
            <Form action="/register" method="post">
                <input type="text" name="username" placeholder="user name" />
                <br />
                <input type="email" name="email" />
                <br />
                <input type="password" name="password" />
                <br />
                <input type="password" name="confirmpass" />
                <br />
                <button type="submit">Register</button>
            </Form>
            <Link to='/login'>Login (already have an account)</Link>
        </>
    )
}

export default FormRegister