import { ActionFunctionArgs, Form, Link } from "react-router-dom"

function FormRegister() {
    return (
        <>
            <Form action="/register" method="post">
                <input type="text" name="username" placeholder="user name" />
                <br />
                <input type="email" name="email" placeholder="email" />
                <br />
                <input type="password" name="password" placeholder="password" />
                <br />
                <input type="password" name="confirmpass" placeholder="confirm password" />
                <br />
                <button type="submit">Register</button>
            </Form>
            <Link to='/login'>Login (already have an account)</Link>
        </>
    )
}

export const registerAction = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData()
    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password')
    const confirmpass = data.get('confirmpass')

    const strapiRegisterUrl = 'http://localhost:1337/api/auth/local/register'

    const registerData = {
        email,
        password,
        username
    }

    const register = await fetch(strapiRegisterUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData, null, 2)
    })

    const registerResponseData = await register.json()
    console.log({ registerResponseData })

    return null
}

export default FormRegister