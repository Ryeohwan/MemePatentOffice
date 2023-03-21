// home page (/home)
import React from "react";
import { Carousel } from 'primereact/carousel';
import NftCard from "components/common/NftCard";

const HomePage: React.FC = () => {
  const NFTS = [
    {
      id: 1,
      title: "귀여운 토토로 삼형제와 발랄한 자매 사츠키, 메이의 우당탕탕 가족사진입니다",
      imgUrl: "totoro.jpg",
      description: "나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. 나무 위에 큰 토토로, 중간 토토로, 작은 토토로, 사츠키와 메이가 앉아 한가로운 오후를 보내고 있다. "
    },
    {
      id: 2,
      title: "누가 이렇게 예쁘게 낳았어? 엄마엄마가~",
      imgUrl: "newjeans.jpg",
      description: "뉴진스의 곡 OMG 속 가사인 oh my oh my god 가 엄마엄마가~로 들린다고 해서 시작되어 틱톡, 릴스 챌린지로 자리잡은 밈이다. 누가 이렇게 예쁘게 낳았어? 라고 질문하면 뉴진스의 OMG 노래를 부르며 엄마엄마가~ 라고 답한다."
    },
    {
      id: 3,
      title: "알아들었으면 끄덕여",
      imgUrl: "theglory.jpeg",
      description: "인기 드라마 더 글로리 속 학교 폭력 가해자 박연진이 같은 무리의 친구(?) 최혜정에게 하는 대사이다. 최혜정이 박연진 남편의 친구 무리에게 박연진의 학창 시절에 대한 이야기를 해서 박연진이 화나서 하는 대사이다."
    }
  ]

  const carouselTemplate = (nft:{id:number; title: string; imgUrl:string; description: string;}) => {
    // carousel에 넣을 화면 구현
    return (
      <div>
        <NftCard items={nft}/>
      </div>
    )
  };

  
  return (
    <>
      <Carousel
            value={NFTS}
            numVisible={1}
            numScroll={1}
            itemTemplate={carouselTemplate}
            style={{ position: "inherit" }}
            orientation="horizontal"
          />
      
    </>
  );
};

export default HomePage;
