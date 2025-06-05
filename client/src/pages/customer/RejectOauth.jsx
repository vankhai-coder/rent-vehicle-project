import { Link } from 'react-router-dom'

export const RejectOauth = () => {
  return (
    <div>
      <h1>You have been rejected , back to login page : <Link href="/" className='text-blue-600 decoration-2 hover:underline font-medium' to={'/'}>Login</Link></h1>
    </div>

  )
}
