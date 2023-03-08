import React, { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import { lazy } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//main layouts
import HomeLayout from "../layouts/Homelayout";
// loadable
import Loadable from "../components/Loadable/Loadable";
import { notification } from "../utils/utility";
import useAuth from "./authContext";
import { setCartNfts } from "../redux/actions/nfts";
import { Collection } from "../views/nftgenerator/collection";
import Ticket from "../views/settings/account-support/Ticket";
import ProfileSettingCmp from "../views/settings/profile";
import CollectionCmp from "../views/settings/my-collections/collection";
import Activity from "../views/settings/activity/activity";
import Favorites from "../views/settings/favorites/favorites";
import AccountSupport from "../views/settings/account-support/AccountSupport";
import UserNFTs from "../views/settings/my-nfts/nfts";
import Dapp from "../cardano/TestingApp";
// pages
const HomePage = Loadable(lazy(() => import("../views/main/home")));
// const PricingCmp = Loadable(lazy(() => import('../views/nftgenerator/pricing')))
// const CardanoCmp = Loadable(lazy(() => import('../views/nftgenerator/cardano')))
const SettingCmp = Loadable(lazy(() => import("../views/settings/index")));
// const VerifyUserCmp = Loadable(lazy(() => import('../views/verifyuser/index')))
const NftGenerator = Loadable(lazy(() => import("../views/nftgenerator/nft")));
const Profile = Loadable(lazy(() => import("../views/profile")));
const ItemDetails = Loadable(lazy(() => import("../views/nfts/details")));
const SellDetails = Loadable(lazy(() => import("../views/nfts/sell")));
const Collections = Loadable(lazy(() => import("../views/collections/list")));
const ProfileRanking = Loadable(
  lazy(() => import("../views/profile/explore/ranking"))
);
const CollectionDetails = Loadable(
  lazy(() => import("../views/collections/details"))
);
const Sell = Loadable(lazy(() => import("../views/sell")));
const Error = Loadable(lazy(() => import("../views/404page/index")));
const Nfts = Loadable(lazy(() => import("../views/nfts/list")));

const Terms = Loadable(lazy(() => import("../views/static-pages/terms")));
const Privacy = Loadable(lazy(() => import("../views/static-pages/privacy")));
const Claim = Loadable(lazy(() => import("../views/static-pages/claim")));
const About = Loadable(lazy(() => import("../views/static-pages/about")));
const Jobs = Loadable(lazy(() => import("../views/static-pages/jobs")));
const Press = Loadable(lazy(() => import("../views/static-pages/press")));
const Partners = Loadable(lazy(() => import("../views/static-pages/partners")));
const Documentation = Loadable(
  lazy(() => import("../views/static-pages/documentation"))
);
const Guides = Loadable(lazy(() => import("../views/static-pages/guides")));
const ApiStatus = Loadable(
  lazy(() => import("../views/static-pages/api-status"))
);
const BlogList = Loadable(lazy(() => import("../views/blog/blog-list")));
const BlogPost = Loadable(lazy(() => import("../views/blog/blog-post")));
const BetaCollectionMinting = Loadable(
  lazy(() => import("../views/beta-collection-minting/beta-collection-minting"))
);
const App = () => {
  const dispatch = useDispatch();
  function RequireAuth({ children }) {
    const { authed } = useAuth();
    if (authed) {
      return (
        <Fragment>
          <Outlet />
          {children}
        </Fragment>
      );
    } else {
      notification("Please connect wallet", "error");
      return <Navigate to="/" />;
    }
  }

  useEffect(() => {
    let jpgItems = JSON.parse(localStorage.getItem("jpgcartItems") || "[]");
    let openItems = JSON.parse(localStorage.getItem("opencartItems") || "[]");
    let solItems = JSON.parse(localStorage.getItem("solcartItems") || "[]");
    let polItems = JSON.parse(localStorage.getItem("polycartItems") || "[]");
    dispatch(
      setCartNfts({
        jpgcartNfts: jpgItems,
        opencartNfts: openItems,
        solcartNfts: solItems,
        polycartNfts: polItems,
      })
    );
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Dapp />} />
          <Route path="/home" element={<Dapp />} />
          {/* <Route path="/verify" element={<VerifyUserCmp />} /> */}
          <Route path="*" element={<Error />} />
          {/* <Route path="/cardano" element={<CardanoCmp />} /> */}
          <Route path="/ranking" element={<ProfileRanking />} />
          <Route path="/nfts" element={<Nfts />} />
          <Route path="/explore" element={<Collections />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/collection/:id" element={<CollectionDetails />} />
          <Route path="/asset/:id" element={<ItemDetails />} />
          <Route path="/asset/:id/sell" element={<SellDetails />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} /> */}
          <Route element={<RequireAuth />}>
            <Route path="/settings" element={<SettingCmp />}>
              <Route index element={<ProfileSettingCmp />} />
              <Route path="my-collections" element={<CollectionCmp />} />
              <Route path="my-nfts" element={<UserNFTs />} />
              <Route path="activity" element={<Activity />} />
              <Route path="favorited" element={<Favorites />} />
              <Route path="account-support" element={<AccountSupport />} />
              <Route path="ticket/:id" element={<Ticket />} />
              <Route path="*" element={<div>Coming soon</div>} />
            </Route>
            {/* <Route path="/pricing" element={<PricingCmp />} /> */}
            <Route path="/create" element={<NftGenerator />} />
            <Route path="/create-collection" element={<Collection />} />
            <Route
              path="/beta-collection-minting"
              element={<BetaCollectionMinting />}
            />
          </Route>

          {/* footer pages */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/about" element={<About />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/press" element={<Press />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/documentation" element={<Documentation />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/api" element={<ApiStatus />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:url" element={<BlogPost />} />
        </Route>
      </Routes>
      <ToastContainer style={{ top: "5em" }} />
    </BrowserRouter>
  );
};

export default App;
