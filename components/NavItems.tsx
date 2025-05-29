import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";
import { cn } from "~/lib/utils";

const NavItems = ({handleClick}: {handleClick?: () => void}) => {
    const user = {
        name: "Roberto",
        email: "roberto@example.com",
        avatar: "/assets/images/david.webp"
    }
        
    return(
        <section className="nav-items flex gap-4">
            <Link to="/" className="link-logo">
                <img src="/assets/icons/logo.svg" alt="logo" className="w-10 h-10" />
                <h1 className="text-2xl font-bold">Tourvisto</h1>
            </Link>
            <div className="container">
                <nav>
                    {sidebarItems.map(({id, icon, label, href}) => (
                        <NavLink key={id} to={href} className="nav-items">
                            {({isActive} : {isActive: boolean}) => (
                                <div className={cn('group nav-item', {'bg-primary-100 !text-white': isActive})}
                                    onClick={handleClick}
                                >
                                    <img 
                                        src={icon} 
                                        alt={label} 
                                        className={`group-hover:brightness-0 size-5 group-hover:invert ${isActive ? 'brightness-0 invert' : 'text-dark-200'}`}/>
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>
                <footer className="nav-footer">
                        <img src={user?.avatar || "/assets/icons/user.svg"} alt={user?.name || "user"} className="w-10 h-10 rounded-full" />
                        <article>
                            <h2>{user?.name || "user"}</h2>
                            <p>{user?.email || "user@example.com"}</p>
                        </article>
                        <button 
                            className="cursor-pointer"
                            onClick={() => {
                                console.log("logout");
                            }}
                        >
                            <img src="/assets/icons/logout.svg" alt="logout" className="size-6" />
                        </button>
                </footer>
            </div>
        </section>
    )
};

export default NavItems;