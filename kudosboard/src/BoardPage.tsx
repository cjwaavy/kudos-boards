import { useNavigate } from "react-router";


const BoardPage = () => {

    let navigate = useNavigate()
    const handleGoBack = () => {
        navigate('/');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <button
                    onClick={handleGoBack}
                    className="flex items-center px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default BoardPage;
