import { ActionFunctionArgs, Form } from "react-router-dom"

const FormLogin = () => {
    return (
        <>
            <Form action="/login" method="post">
                <input type="email" name="email" placeholder="email" />
                <br />
                <input type="password" name="password" placeholder="password" />
                <br />
                <button type="submit">login</button>
            </Form>
        </>
    )
}

export const loginAction = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData()
    const email = data.get('email')
    const password = data.get('password')
    console.log({ email, password })

    return null
}

export default FormLogin