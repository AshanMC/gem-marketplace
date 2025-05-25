import { Fragment, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import logo from "./Navlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../redux/slices/users/usersSlice";
import { toast } from "react-toastify";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.users.userAuth || {});
  const { cartItems } = useSelector((state) => state.cart);
  const isLoggedIn = !!userInfo?.userFound;
  const isAdmin = userInfo?.userFound?.isAdmin;

  const handleLogout = () => {
    dispatch(logoutUserAction());
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-50 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="h-10 w-auto" src={logo} alt="Gemora" />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Link to="/products" className="text-sm font-semibold leading-6 text-white">
            Gemstones
          </Link>
          <Link to="/accessories" className="text-sm font-semibold leading-6 text-white">
            Accessories
          </Link>
          <Link to="/articles" className="text-sm font-semibold leading-6 text-white">
            Articles
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/gem-request" className="text-sm font-semibold leading-6 text-white">
                Request
              </Link>
              <Link to="/my-requests" className="text-sm font-semibold leading-6 text-white">
                My Requests
              </Link>
            </>
          )}
          {isAdmin && (
              <Link to="/admin" className="text-sm font-semibold leading-6 text-white">
                 Dashboard
              </Link>                     
          )}
          <Link to="/about-us" className="text-sm font-semibold leading-6 text-white">
            About Us
          </Link>
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="text-sm font-medium text-white hover:text-gray-100"
            >
              Sign In
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-white hover:text-red-400"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="ml-4 flow-root lg:ml-6">
          <Link to="/shopping-cart" className="group -m-2 flex items-center p-2">
            <ShoppingCartIcon
              className="h-6 w-6 flex-shrink-0 text-white group-hover:text-indigo-500"
              aria-hidden="true"
            />
            <span className="ml-2 text-sm font-medium text-white group-hover:text-indigo-500">
              {cartItems?.length || 0}
            </span>
          </Link>
        </div>

        {isLoggedIn && (
          <div className="ml-4 flow-root lg:ml-6">
            <Link to="/customer-profile" className="group -m-2 flex items-center p-2">
              <UserIcon
                className="h-5 w-5 text-white group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </nav>

      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="duration-150 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  <Link to="/products" className="block text-base font-medium text-gray-900">
                    Gemstones
                  </Link>
                  <Link to="/accessories" className="block text-base font-medium text-gray-900">
                    Accessories
                  </Link>
                  <Link to="/articles" className="block text-base font-medium text-gray-900">
                    Articles
                  </Link>
                  {isLoggedIn && (
                    <>
                      <Link to="/gem-request" className="block text-base font-medium text-gray-900">
                        Request
                      </Link>
                      <Link to="/my-requests" className="block text-base font-medium text-gray-900">
                        My Requests
                      </Link>
                    </>                    
                  )}
                  {isAdmin && (
                      <Link to="/admin" className="block text-base font-medium text-gray-900">
                        Dashboard
                      </Link>                     
                  )};
                  <Link to="/about-us" className="text-sm font-semibold leading-6 text-white">
                    About Us
                  </Link>
                  

                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {!isLoggedIn && (
                    <div className="flow-root">
                      <Link to="/login" className="-m-2 block p-2 font-medium text-gray-900">
                        Sign In
                      </Link>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
}
