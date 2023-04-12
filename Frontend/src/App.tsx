import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ResizePage from "pages/ResizePage";
import ScrollToTop from "components/common/elements/ScrollToTop";
import LandingPage from "pages/LandingPage";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage";

import MemeUploadPage from "pages/MemeUploadPage";
import MemeListPage from "pages/MemeListPage";
import MemeDetailPage from "pages/MemeDetailPage";

import AuctionListPage from "pages/AuctionListPage";
import AuctionPage from "pages/AuctionPage";

import ProfilePage from "pages/ProfilePage";

import SettingPage from "pages/setting/SettingPage";

import UserEditPage from "pages/setting/UserEditPage";
import ProfileEditPage from "pages/setting/ProfileEditPage";
import ImageEditPage from "pages/setting/ImageEditPage";
import WithdrawlPage from "pages/setting/WithdrawlPage";

import HistoryPage from "pages/setting/HistoryPage";
import CommentHistoryPage from "pages/setting/CommentHistoryPage";
import NftLikePage from "pages/setting/NftLikeNoticePage";
import NftNotificationPage from "pages/setting/NftLikeNoticePage";

import AuctionHistoryPage from "pages/setting/AuctionHistoryPage";
import PurchaseSaleHistoryPage from "pages/setting/PurchaseSaleHistoryPage";
import NotificationSettingPage from "pages/setting/NotificationSettingPage";
import NotificationListPage from "pages/NotificationListPage";
import NotFoundPage from "pages/NotFoundPage";

import Frame from "layout/Frame";

import AuthRoute from "components/common/AuthRoute";
const App: React.FC = () => {
  const [windowSize, setWindowSize] = useState<boolean>(window.innerWidth >420 ? true: false)
  window.addEventListener('resize', ()=>{
    if (window.innerWidth > 420) {
      setWindowSize(true)
    }else{
      setWindowSize(false)
    }
  })
  

  return (
    <div className="App">
    {windowSize ? 
      <ResizePage/> : 
    <>
    <ScrollToTop width={0} height={0} />
    <Frame>
    <Routes>
    
    <Route path="" element={<LandingPage />} />
    <Route path="/oauth2/redirect" element={<LoginPage />} />
    <Route
    path="/main"
    element={
      <AuthRoute>
      <HomePage />
      </AuthRoute>
    }
    />
    
    <Route path="/meme-upload" element={<AuthRoute><MemeUploadPage /></AuthRoute>} />
    <Route path="/meme-list/*" element={<AuthRoute><MemeListPage /></AuthRoute>} />
    <Route path="/meme-detail/:meme_id/*" element={<AuthRoute><MemeDetailPage /></AuthRoute>} />
    
    <Route path="/auction-list/*" element={<AuthRoute><AuctionListPage /></AuthRoute>} />
    <Route path="/auction/:auctionId/*" element={<AuthRoute><AuctionPage /></AuthRoute>} />
    
    <Route path="/profile/:nickname/*" element={<AuthRoute><ProfilePage /></AuthRoute>} />

          <Route path="/setting" element={<AuthRoute><SettingPage /></AuthRoute>} />
          
          <Route path="/setting/user-edit" element={<AuthRoute><UserEditPage /></AuthRoute>} />
          <Route
          path="/setting/user-edit/profile"
          element={<AuthRoute><ProfileEditPage /></AuthRoute>}
          />
          <Route path="/setting/user-edit/image" element={<AuthRoute><ImageEditPage /></AuthRoute>} />
          <Route
          path="/setting/user-edit/withdrawl"
          element={<AuthRoute><WithdrawlPage /></AuthRoute>}
          />
          
          <Route path="/setting/history" element={<AuthRoute><HistoryPage /></AuthRoute>} />
          <Route
          path="/setting/history/comment"
          element={<AuthRoute><CommentHistoryPage /></AuthRoute>}
          />
          <Route path="/setting/history/nft-like" element={<AuthRoute><NftLikePage /></AuthRoute>} />
          <Route
          path="/setting/history/nft-notification"
          element={<AuthRoute><NftNotificationPage /></AuthRoute>}
          />
          
          <Route
          path="/setting/auction-history"
          element={<AuthRoute><AuctionHistoryPage /></AuthRoute>}
          />
          <Route
          path="/setting/auction-history/purchase"
            element={<AuthRoute><PurchaseSaleHistoryPage /></AuthRoute>}
          />
          <Route
          path="/setting/auction-history/sale"
          element={<AuthRoute><PurchaseSaleHistoryPage /></AuthRoute>}
          />
          
          <Route
          path="/setting/notification"
          element={<AuthRoute><NotificationSettingPage /></AuthRoute>}
          />
          
          <Route path="/notification-list" element={<AuthRoute><NotificationListPage /></AuthRoute>} />
          
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
          </Routes>
          </Frame>
          </>
        }
        </div>
          );
        };
        
        export default App;
        