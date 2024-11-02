import { Inter } from 'next/font/google'
import LoginForm from '../components/Login/LoginForm'
import Paper from '@mui/material/Paper'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Paper style={{ fontFamily: 'Roboto', padding: '40px', margin: '20px', boxShadow: '0px 0px 10px rgba(128,0,128, 0.5)', maxWidth: '1000px', width: '100%' }}>
          <LoginForm />
        </Paper>
      </div>
    </>
  )
}