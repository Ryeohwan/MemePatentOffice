import React from 'react';
import { Route, Routes } from "react-router-dom";

import LandingPage from 'pages/LandingPage';
import LoginPage from 'pages/LoginPage';
import SignupPage from 'pages/SignupPage';
import HomePage from 'pages/HomePage';

import MemeUploadPage from 'pages/MemeUploadPage';
import MemeListPage from 'pages/MemeListPage';
import MemeDetailPage from 'pages/MemeDetailPage';

import AuctionListPage from 'pages/AuctionListPage';
import AuctionPage from 'pages/AuctionPage';

import ProfilePage from 'pages/ProfilePage';

import SettingPage from 'pages/setting/SettingPage';

import UserEditPage from 'pages/setting/UserEditPage';
import ProfileEditPage from 'pages/setting/ProfileEditPage';
import ImageEditPage from 'pages/setting/ImageEditPage';
import WithdrawlPage from 'pages/setting/WithdrawlPage';

import HistoryPage from 'pages/setting/HistoryPage';
import CommentHistoryPage from 'pages/setting/CommentHistoryPage';
import NftLikePage from 'pages/setting/NftLikeNoticePage';
import NftNotificationPage from 'pages/setting/NftLikeNoticePage';

import AuctionHistoryPage from 'pages/setting/AuctionHistoryPage';
import PurchaseSaleHistoryPage from 'pages/setting/PurchaseSaleHistoryPage';
import NotificationSettingPage from 'pages/setting/NotificationSettingPage';
import NotificationListPage from 'pages/NotificationListPage';
import NotFoundPage from 'pages/NotFoundPage';

import Frame from 'layout/Frame';


const App: React.FC = () => {
  return (
    <div className="App">
      <Frame>

        <Routes>
          
          <Route path="" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/main" element={<HomePage />} />

          <Route path="/meme-upload" element={<MemeUploadPage />} />
          <Route path="/meme-list/*" element={<MemeListPage />} />
          <Route path="/meme-detail/:meme_id" element={<MemeDetailPage />} />

          <Route path="/auction-list/*" element={<AuctionListPage />} />
          <Route path='/auction/:auction_id' element={<AuctionPage />} />

          <Route path="/profile/:nickname/*" element={<ProfilePage />} />

          <Route path="/setting" element={<SettingPage />} />
          
          <Route path="/setting/user-edit" element={<UserEditPage />} />
          <Route path="/setting/user-edit/profile" element={<ProfileEditPage />} />
          <Route path="/setting/user-edit/image" element={<ImageEditPage />} />
          <Route path="/setting/user-edit/withdrawl" element={<WithdrawlPage />} />

          <Route path="/setting/history" element={<HistoryPage />} />
          <Route path="/setting/history/comment" element={<CommentHistoryPage />} />
          <Route path="/setting/history/nft-like" element={<NftLikePage />} />
          <Route path="/setting/history/nft-notification" element={<NftNotificationPage />} />

          <Route path="/setting/auction-history" element={<AuctionHistoryPage />} />
          <Route path="/setting/auction-history/purchase" element={<PurchaseSaleHistoryPage />} />
          <Route path="setting/auction-history/sale" element={<PurchaseSaleHistoryPage />} />

          <Route path="/setting/notification" element={<NotificationSettingPage />} />

          <Route path="/notification-list" element={<NotificationListPage />} />

          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>

      </Frame>
    </div>
  );
}

export default App;
