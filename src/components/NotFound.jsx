import { Link } from "react-router-dom";

const NotFound = () => {
    return (  
        <div className="notFound">
            <div>
            <h2>Sorry</h2>
            <p>The page cannot be Found </p>
            <Link to ='/'>Back to Homepage</Link>
            </div>
        </div>
    );
}
 
export default NotFound;