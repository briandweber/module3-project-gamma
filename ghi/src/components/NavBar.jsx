import React from 'react';
import { Link } from 'react-router-dom';
import useAuthService from '../hooks/useAuthService';


const NavBar = () => {
   const { user, isLoggedIn } = useAuthService();


   const renderUserSpecificLinks = () => {
       if (user && user.type === 'tournament_manager') {
           return (
               <>
                   <Link to="/">Dashboard</Link>
                   <Link to="/manage-tournaments">Manage Tournaments</Link>
               </>
           );
       } else if (user && user.type === 'competitor') {
           return (
               <>
                   <Link to="/">Competitor Dashboard</Link>
                   <Link to="/my-tournaments">My Tournaments</Link>
               </>
           );
       }
   };


   return (
       <nav>
           <ul>
               {isLoggedIn ? (
                   <>
                       {renderUserSpecificLinks()}
                       <Link to="/profile">Profile</Link>
                       <Link to="/tournaments">Tournaments</Link>
                       <Link to="/signout">Sign Out</Link>
                   </>
               ) : (
                   <>
                       <Link to="/signin">Sign In</Link>
                       <Link to="/tournaments">Tournaments</Link>
                   </>
               )}
           </ul>
       </nav>
   );
};


export default NavBar;
