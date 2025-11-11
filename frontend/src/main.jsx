import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import CategoryPage from './pages/category/CategoryPage.jsx';
import Search from './pages/Search.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import SingleProduct from './pages/products/SingleProduct.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import Recipes from './pages/Recipes.jsx';
import Contact from './pages/Contact.jsx';
import Resources from './pages/Resources.jsx';
import AboutSection from './pages/home/AboutSection.jsx';
// Force fresh login each new browser tab/session: clear token on first load
if (typeof window !== 'undefined') {
  if (!sessionStorage.getItem('session_init')) {
    try { localStorage.removeItem('token'); } catch {}
    sessionStorage.setItem('session_init', '1');
  }
}
// Centralized auth loader that preserves the attempted path
const requireAuth = async ({ request }) => {
  if (!localStorage.getItem('token')) {
    const url = new URL(request.url);
    const from = url.pathname + url.search;
    return redirect(`/login?from=${encodeURIComponent(from)}`);
  }
  return null;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage />,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/categories/:category",
        element:<CategoryPage/>,
        loader: requireAuth
      },
      {
        path:"/search",
        element:<Search/>,
        loader: requireAuth
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path:"/recipes",
        element:<Recipes/>,
        loader: requireAuth
      },
      {
        path: "/resources",
        element: <Resources />,
        loader: requireAuth
      },
      {
        path:"/items/:id",
        element:<SingleProduct/>,      
        loader: async (args) => {
          const { params } = args;
          const gate = await requireAuth(args);
          if (gate) return gate;
          const response = await fetch(`http://localhost:7000/api/items/${params.id}`);
          if (!response.ok) {
            throw new Response("Not Found", { status: 404 });
          }
          return response.json();
        }
      },
      {
        path: "/about",
        element: <AboutSection />
      },
      {
        path: "/contact",
        element: <Contact />
      },
      {
        path: "/create-recipe",
        element: <CreateRecipe />,
        loader: requireAuth
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
