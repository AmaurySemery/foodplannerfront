import { ActionFunctionArgs, Form, Link } from "react-router-dom"

const FormLogin = () => {
    return (
        <>
            <Form action="/login" method="post">
                <input type="email" name="email" placeholder="email" />
                <br />
                <input type="password" name="password" placeholder="password" />
                <br />
                <button type="submit">login</button>
                <Link to='/register'>No account ? Register</Link>
            </Form>
        </>
    )
}

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData()
    const email = data.get('email')
    const password = data.get('password')
    console.log({ email, password })

    // Ci-dessous, des particularités strapi comportant quelques pièges peu intuitifs

    const strapiUrl = "http://localhost:1337/api/auth/local"

    const loginData = {
        identifier: email,
        password,
    }

    const login = await fetch(strapiUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })

    const loginResponseData = await login.json()
    console.log({ loginResponseData })
    localStorage.setItem('logged-in-user-email', loginResponseData.user.email)

    return null
}

export default FormLogin