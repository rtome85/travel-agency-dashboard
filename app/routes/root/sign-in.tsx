import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Link, redirect } from "react-router";
import { getUser, loginWithGoogle } from "~/appwrite/auth";
import { account } from "~/appwrite/client";

const clientLoader = async () => {
    try {
        const user = await account.get();
        
        if(user.$id) return redirect('/');

    } catch (error) {
        console.error('Error fetching user', error);
    }
}

const SignIn = () => {

    return (
        <main className="auth">
            <section className="size-full glassmorphism flex-center px-6">  
                <div className="sign-in-card">
                    <header className="header">
                        <Link to="/">
                            <img src="assets/icons/logo.svg" alt="logo" className="size-10" />
                        </Link>
                        <h1 className="p-28-bold text-dark-100">Tourvisto</h1>
                    </header>
                    <article>
                        <h2 className="p-28-semibold text-dark-100 text-center">Start your Travel Journey</h2>
                        <p className="p-16-regular text-gray-100 text-center !leading-7">Sign in to Google to manage destinations, itineraries, and more</p>
                    </article>

                    <ButtonComponent
                        type="button"
                        iconCss="e-search-icon"
                        className="button-class !h-11 !w-full size-5"
                        onClick={loginWithGoogle}
                    >
                        <img 
                            src="assets/icons/google.svg" 
                            className="size-5"
                            alt="google" 
                        />
                        <span className="p-18-semibold text-white">Sign in with Google</span>
                    </ButtonComponent>
                </div>
            </section>
        </main>
    )
}

export default SignIn;
export { clientLoader };