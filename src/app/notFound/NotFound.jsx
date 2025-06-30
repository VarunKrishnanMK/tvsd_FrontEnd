export default function NotFound() {
    return (
        <div className='container-fluid vh-100 d-flex justify-content-center align-items-center'>
            <div className='text-center'>
                <h1 className='fw-bold'>404</h1>
                <h2 className='fw-bold text-primary'>Page Not Found</h2>
                <p>The page you are looking for does not exist.</p>
                <button className='btn btn-primary fw-bold' onClick={() => window.location.href = '/login'}>Go to Login</button>
            </div>
        </div>
    )
}