import { useLoaderData, useNavigate } from "react-router";
import { logoutUser } from "~/appwrite/auth";

const PageLayout = () => {
  const user = useLoaderData();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await logoutUser();
        navigate('/sign-in');
    } catch (error) {
        console.error('Error in handleLogout', error);
    }
  }

  return (
    <div>
      <button 
          className="cursor-pointer"
          onClick={handleLogout}
      >
          <img src="/assets/icons/logout.svg" alt="logout" className="size-6" />
      </button>
      <button onClick={() => {navigate('/dashboard')}}>
        Dashboard
      </button>
    </div>
  )
}

export default PageLayout