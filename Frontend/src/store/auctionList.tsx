import { createSlice } from "@reduxjs/toolkit";

type auctionType = {
  meme_id: number;
  auction_id: number;
  title: string;
  time: string;
  highest_bid: number;
  imgUrl: string;
}

interface initialStateInterface {
  auctionNewList: auctionType[];
  auctionPopularList: auctionType[];
  auctionDeadlineList: auctionType[];
}

const initialState: initialStateInterface = {
  // dummy data
  auctionNewList: [
    {
      meme_id: 1,
      auction_id: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      time: "16시간 32분",
      highest_bid: 430,
      imgUrl: "totoro.jpg",
    },
    {
      meme_id: 2,
      auction_id: 3,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      time: "5시간 32분",
      highest_bid: 200,
      imgUrl: "newjeans.jpg",
    },
    {
      meme_id: 3,
      auction_id: 2,
      title: "알아들었으면 끄덕여",
      time: "20시간 32분",
      highest_bid: 500,
      imgUrl: "theglory.jpeg",
    },
    {
      meme_id: 4,
      auction_id: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      time: "16시간 32분",
      highest_bid: 430,
      imgUrl: "totoro.jpg",
    },
    {
      meme_id: 5,
      auction_id: 3,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      time: "5시간 32분",
      highest_bid: 200,
      imgUrl: "newjeans.jpg",
    },
    {
      meme_id: 6,
      auction_id: 2,
      title: "알아들었으면 끄덕여",
      time: "20시간 32분",
      highest_bid: 500,
      imgUrl: "theglory.jpeg",
    },
  ],
  auctionPopularList: [
    {
      meme_id: 1,
      auction_id: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      time: "16시간 32분",
      highest_bid: 430,
      imgUrl: "totoro.jpg",
    },
    {
      meme_id: 2,
      auction_id: 3,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      time: "5시간 32분",
      highest_bid: 200,
      imgUrl: "newjeans.jpg",
    },
    {
      meme_id: 3,
      auction_id: 2,
      title: "알아들었으면 끄덕여",
      time: "20시간 32분",
      highest_bid: 500,
      imgUrl: "theglory.jpeg",
    },
    {
      meme_id: 4,
      auction_id: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      time: "16시간 32분",
      highest_bid: 430,
      imgUrl: "totoro.jpg",
    },
    {
      meme_id: 5,
      auction_id: 3,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      time: "5시간 32분",
      highest_bid: 200,
      imgUrl: "newjeans.jpg",
    },
    {
      meme_id: 6,
      auction_id: 2,
      title: "알아들었으면 끄덕여",
      time: "20시간 32분",
      highest_bid: 500,
      imgUrl: "theglory.jpeg",
    },

  ],
  auctionDeadlineList: [
    {
      meme_id: 1,
      auction_id: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      time: "16시간 32분",
      highest_bid: 430,
      imgUrl: "totoro.jpg",
    },
    {
      meme_id: 2,
      auction_id: 3,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      time: "5시간 32분",
      highest_bid: 200,
      imgUrl: "newjeans.jpg",
    },
    {
      meme_id: 3,
      auction_id: 2,
      title: "알아들었으면 끄덕여",
      time: "20시간 32분",
      highest_bid: 500,
      imgUrl: "theglory.jpeg",
    },
    {
      meme_id: 4,
      auction_id: 1,
      title:
        "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      time: "16시간 32분",
      highest_bid: 430,
      imgUrl: "totoro.jpg",
    },
    {
      meme_id: 5,
      auction_id: 3,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      time: "5시간 32분",
      highest_bid: 200,
      imgUrl: "newjeans.jpg",
    },
    {
      meme_id: 6,
      auction_id: 2,
      title: "알아들었으면 끄덕여",
      time: "20시간 32분",
      highest_bid: 500,
      imgUrl: "theglory.jpeg",
    },

  ]

};

const auctionListSlice = createSlice({
  name: "memeList",
  initialState: initialState,
  reducers: {
    getAuctionNewList: (state, actions) => {
      state.auctionNewList = actions.payload
    },
    getAuctionPopularList: (state, actions) => {
      state.auctionPopularList = actions.payload
    },
    getAuctionDeadlineList: (state, actions) => {
      state.auctionDeadlineList = actions.payload
    }
  },
});

export const auctionListActions = auctionListSlice.actions;
export default auctionListSlice.reducer;
