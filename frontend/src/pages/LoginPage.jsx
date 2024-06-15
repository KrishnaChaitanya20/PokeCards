import PCNavBar from 'components/PCNavBar'
import { Container } from 'react-bootstrap'
import { useLogin } from 'LoginContext'

const LoginPage = () => {
    const {  username, setUsername ,password ,setPassword,login} = useLogin();

    return (
        <>
                <PCNavBar />
                <Container>
                        <input type="text" value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={()=>login()}>Login</button>
                </Container>
        </>
    )
}

export default LoginPage
