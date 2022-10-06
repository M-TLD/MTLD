import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AbandonedItem from 'components/adoption/AbandonedItem';
import TopImage from 'assets/dogwithperson.png';
import Spinner from 'components/common/Spinner';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const StyledAdoptionHome = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .banner {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .topimage {
    width: 100%;
    opacity: 0.5;
  }

  .titletext {
    width: 180px;
    color: #5c5c5c;
    flex-wrap: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }

  .line {
    flex-wrap: nowrap;
    margin: 0;
    padding: 0;
  }

  // 여기까지 배너 아래로는 검색창

  .new {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1vh;
    padding-right: 2;
    padding-left: 2;
    margin-right: 0;
    margin-top: 2vh;
    margin-left: 1vh;
    margin-right: 1vh;
    border-radius: 5px;
    padding-top: 1vh;
    background-color: #efefef;
    box-shadow: 4px 4px #e6e4e4;
  }

  .section {
    padding-right: 1vh;
    padding-left: 1vh;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .sectiontitle {
    padding-right: 0,
    padding-left: 0,
    width: 100%;
    font-size: 13px;
    font-color: #5C5C5C;
    flex-wrap: nowrap;
    text-align: left;
  }

  .box {
    // 검색 레이블 상자들
    width: 30vw;
    margin-left: 1vh;
    font-size: 3px;
    margin-bottom: 1vh;
  }

  .autocomplete {
    font-size: 1px;
  }

  .itemtitle {
    color: #5C5C5C;
    width: 90%;
    text-align: left;
    margin-top: 1.5vh;
    margin-bottom: 0;
  }

  .contents {
    margin-top: 0;
  }

  #family {
    // '가족' 문구
    font-weight: bold;
  }

  #family2 {
    font-weight: bold;
    color: #81E3D7;
  }

  #combo-box-breed {
    height: 1vh;
    font-size: 3px;
  }

  #outlined-search {
    height: 1vh;
  }

  #feature-keyword {
    margin-right: 1vh;
  }

  #feature-search {
    width: 80vw;
  }

  #noresult {
    font-family: 'UhBeeStrawberry';
    font-weight: bold;
  }
`;

const StyledItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0;
  margin-left: 1vh;
  margin-right: 1vh;
  @media screen and (min-width: 1356px) {
    flex-wrap: nowrap;
    gap: 30px;
  }
`;

const Button = styled.div`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%);
  width: 280px;
  height: 4vh;
  background-color: #ffdcdc;
  border-radius: 8px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #5c5c5c;
  font-size: 18px;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;

  .content {
    font-size: 14px;
  }
`;

function AdoptionHome() {
  // 전체 리스트 불러오기
  const [abandonedList, setAbandonedList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 접어둘것!
  const dogKind = [
    {
      kindCd: '000054',
      knm: '골든 리트리버',
    },
    {
      kindCd: '000056',
      knm: '그레이 하운드',
    },
    {
      kindCd: '000055',
      knm: '그레이트 덴',
    },
    {
      kindCd: '000118',
      knm: '그레이트 피레니즈',
    },
    {
      kindCd: '000115',
      knm: '기타',
    },
    {
      kindCd: '000037',
      knm: '꼬똥 드 뚤레아',
    },
    {
      kindCd: '000081',
      knm: '네오폴리탄 마스티프',
    },
    {
      kindCd: '000204',
      knm: '노르포크 테리어',
    },
    {
      kindCd: '000083',
      knm: '노리치 테리어',
    },
    {
      kindCd: '00216',
      knm: '노퍽 테리어',
    },
    {
      kindCd: '000082',
      knm: '뉴펀들랜드',
    },
    {
      kindCd: '000038',
      knm: '닥스훈트',
    },
    {
      kindCd: '000039',
      knm: '달마시안',
    },
    {
      kindCd: '000040',
      knm: '댄디 딘몬트 테리어',
    },
    {
      kindCd: '000043',
      knm: '도고 까니리오',
    },
    {
      kindCd: '000153',
      knm: '도고 아르젠티노',
    },
    {
      kindCd: '000041',
      knm: '도베르만',
    },
    {
      kindCd: '000120',
      knm: '도사',
    },
    {
      kindCd: '000155',
      knm: '동경견',
    },
    {
      kindCd: '000069',
      knm: '라브라도 리트리버',
    },
    {
      kindCd: '000071',
      knm: '라사 압소',
    },
    {
      kindCd: '000142',
      knm: '라이카',
    },
    {
      kindCd: '000093',
      knm: '래빗 닥스훈드',
    },
    {
      kindCd: '000167',
      knm: '랫 테리어',
    },
    {
      kindCd: '000070',
      knm: '레이크랜드 테리어',
    },
    {
      kindCd: '000166',
      knm: '로디지안 리즈백 ',
    },
    {
      kindCd: '000121',
      knm: '로트와일러',
    },
    {
      kindCd: '000152',
      knm: '마리노이즈',
    },
    {
      kindCd: '000073',
      knm: '마스티프',
    },
    {
      kindCd: '000146',
      knm: '말라뮤트',
    },
    {
      kindCd: '000072',
      knm: '말티즈',
    },
    {
      kindCd: '000159',
      knm: '맨체스터테리어',
    },
    {
      kindCd: '000076',
      knm: '미니어쳐 닥스훈트',
    },
    {
      kindCd: '000075',
      knm: '미니어쳐 불 테리어',
    },
    {
      kindCd: '000079',
      knm: '미니어쳐 슈나우저',
    },
    {
      kindCd: '000078',
      knm: '미니어쳐 푸들',
    },
    {
      kindCd: '000077',
      knm: '미니어쳐 핀셔',
    },
    {
      kindCd: '000074',
      knm: '미디엄 푸들',
    },
    {
      kindCd: '000080',
      knm: '미텔 스피츠',
    },
    {
      kindCd: '000114',
      knm: '믹스견',
    },
    {
      kindCd: '000133',
      knm: '바센지',
    },
    {
      kindCd: '000012',
      knm: '바셋 하운드',
    },
    {
      kindCd: '000017',
      knm: '버니즈 마운틴 독',
    },
    {
      kindCd: '000015',
      knm: '베들링턴 테리어',
    },
    {
      kindCd: '000164',
      knm: '벨기에 그로넨달',
    },
    {
      kindCd: '000157',
      knm: '벨기에 쉽독',
    },
    {
      kindCd: '000148',
      knm: '벨기에 테뷰런',
    },
    {
      kindCd: '000016',
      knm: '벨지안 셰퍼드 독',
    },
    {
      kindCd: '000020',
      knm: '보더 콜리',
    },
    {
      kindCd: '000021',
      knm: '보르조이',
    },
    {
      kindCd: '000022',
      knm: '보스턴 테리어',
    },
    {
      kindCd: '000024',
      knm: '복서',
    },
    {
      kindCd: '000208',
      knm: '볼로네즈',
    },
    {
      kindCd: '000023',
      knm: '부비에 데 플랑드르',
    },
    {
      kindCd: '000026',
      knm: '불 테리어',
    },
    {
      kindCd: '000027',
      knm: '불독',
    },
    {
      kindCd: '000169',
      knm: '브뤼셀그리펀',
    },
    {
      kindCd: '000025',
      knm: '브리타니 스파니엘',
    },
    {
      kindCd: '000019',
      knm: '블랙 테리어',
    },
    {
      kindCd: '000013',
      knm: '비글',
    },
    {
      kindCd: '000018',
      knm: '비숑 프리제',
    },
    {
      kindCd: '000014',
      knm: '비어디드 콜리',
    },
    {
      kindCd: '000162',
      knm: '비즐라',
    },
    {
      kindCd: '000085',
      knm: '빠삐용',
    },
    {
      kindCd: '000096',
      knm: '사모예드',
    },
    {
      kindCd: '000095',
      knm: '살루키',
    },
    {
      kindCd: '000001',
      knm: '삽살개',
    },
    {
      kindCd: '000034',
      knm: '샤페이',
    },
    {
      kindCd: '000104',
      knm: '세인트 버나드',
    },
    {
      kindCd: '000031',
      knm: '센트럴 아시안 오브차카',
    },
    {
      kindCd: '000099',
      knm: '셔틀랜드 쉽독',
    },
    {
      kindCd: '000122',
      knm: '셰퍼드',
    },
    {
      kindCd: '000123',
      knm: '슈나우져',
    },
    {
      kindCd: '000097',
      knm: '스코티쉬 테리어',
    },
    {
      kindCd: '000132',
      knm: '스코티시 디어하운드',
    },
    {
      kindCd: '000154',
      knm: '스태퍼드셔 불 테리어',
    },
    {
      kindCd: '000105',
      knm: '스탠다드 푸들',
    },
    {
      kindCd: '000124',
      knm: '스피츠',
    },
    {
      kindCd: '000100',
      knm: '시바',
    },
    {
      kindCd: '000103',
      knm: '시베리안 허스키',
    },
    {
      kindCd: '000151',
      knm: '시베리안라이카',
    },
    {
      kindCd: '000139',
      knm: '시잉프랑세즈',
    },
    {
      kindCd: '000101',
      knm: '시츄',
    },
    {
      kindCd: '000102',
      knm: '시코쿠',
    },
    {
      kindCd: '000098',
      knm: '실리햄 테리어',
    },
    {
      kindCd: '000136',
      knm: '실키테리어',
    },
    {
      kindCd: '000202',
      knm: '아나톨리안 셰퍼드',
    },
    {
      kindCd: '000160',
      knm: '아메리칸 불독',
    },
    {
      kindCd: '000203',
      knm: '아메리칸 스태퍼드셔 테리어',
    },
    {
      kindCd: '000008',
      knm: '아메리칸 아키다',
    },
    {
      kindCd: '000131',
      knm: '아메리칸 에스키모',
    },
    {
      kindCd: '000009',
      knm: '아메리칸 코카 스파니엘',
    },
    {
      kindCd: '000119',
      knm: '아메리칸 핏불 테리어',
    },
    {
      kindCd: '000150',
      knm: '아메리칸불리',
    },
    {
      kindCd: '000210',
      knm: '아이리쉬 레드 앤 화이트 세터',
    },
    {
      kindCd: '000057',
      knm: '아이리쉬 세터',
    },
    {
      kindCd: '000058',
      knm: '아이리쉬 울프 하운드',
    },
    {
      kindCd: '000059',
      knm: '아이리쉬소프트코튼휘튼테리어',
    },
    {
      kindCd: '000006',
      knm: '아키다',
    },
    {
      kindCd: '000004',
      knm: '아프간 하운드',
    },
    {
      kindCd: '000007',
      knm: '알라스칸 말라뮤트',
    },
    {
      kindCd: '000005',
      knm: '에어델 테리어',
    },
    {
      kindCd: '000143',
      knm: '오브차카',
    },
    {
      kindCd: '000011',
      knm: '오스트랄리안 셰퍼드 독',
    },
    {
      kindCd: '000010',
      knm: '오스트랄리안 캐틀 독',
    },
    {
      kindCd: '000137',
      knm: '올드 잉글리쉬 불독',
    },
    {
      kindCd: '000084',
      knm: '올드 잉글리쉬 쉽독',
    },
    {
      kindCd: '000163',
      knm: '와이마라너',
    },
    {
      kindCd: '000112',
      knm: '와이어 폭스 테리어',
    },
    {
      kindCd: '000113',
      knm: '요크셔 테리어',
    },
    {
      kindCd: '000149',
      knm: '울프독',
    },
    {
      kindCd: '211',
      knm: '웨스트 시베리언 라이카',
    },
    {
      kindCd: '000110',
      knm: '웨스트하이랜드화이트테리어',
    },
    {
      kindCd: '000205',
      knm: '웰시 코기 카디건',
    },
    {
      kindCd: '000108',
      knm: '웰시 코기 펨브로크',
    },
    {
      kindCd: '000109',
      knm: '웰시 테리어',
    },
    {
      kindCd: '000060',
      knm: '이탈리안 그레이 하운드',
    },
    {
      kindCd: '000046',
      knm: '잉글리쉬 세터',
    },
    {
      kindCd: '000047',
      knm: '잉글리쉬 스프링거 스파니엘',
    },
    {
      kindCd: '000044',
      knm: '잉글리쉬 코카 스파니엘',
    },
    {
      kindCd: '000045',
      knm: '잉글리쉬 포인터',
    },
    {
      kindCd: '000053',
      knm: '자이언트 슈나우져',
    },
    {
      kindCd: '000062',
      knm: '재패니즈 스피츠',
    },
    {
      kindCd: '000061',
      knm: '잭 러셀 테리어',
    },
    {
      kindCd: '000052',
      knm: '저먼 셰퍼드 독',
    },
    {
      kindCd: '000165',
      knm: '저먼 와이어헤어드 포인터',
    },
    {
      kindCd: '000051',
      knm: '저먼 포인터',
    },
    {
      kindCd: '215',
      knm: '저먼 헌팅 테리어',
    },
    {
      kindCd: '000156',
      knm: '제주개',
    },
    {
      kindCd: '000129',
      knm: '제페니즈칭',
    },
    {
      kindCd: '000067',
      knm: '진도견',
    },
    {
      kindCd: '000035',
      knm: '차우차우',
    },
    {
      kindCd: '000033',
      knm: '차이니즈 크레스티드 독',
    },
    {
      kindCd: '000032',
      knm: '치와와',
    },
    {
      kindCd: '000158',
      knm: '카레리안 베어독',
    },
    {
      kindCd: '000144',
      knm: '카이훗',
    },
    {
      kindCd: '000030',
      knm: '캐벌리어 킹 찰스 스파니엘',
    },
    {
      kindCd: '000029',
      knm: '케니스펜더',
    },
    {
      kindCd: '000064',
      knm: '케리 블루 테리어',
    },
    {
      kindCd: '000207',
      knm: '케언 테리어',
    },
    {
      kindCd: '000028',
      knm: '케인 코르소',
    },
    {
      kindCd: '000002',
      knm: '코리아 트라이 하운드',
    },
    {
      kindCd: '000068',
      knm: '코리안 마스티프',
    },
    {
      kindCd: '000125',
      knm: '코카 스파니엘',
    },
    {
      kindCd: '000141',
      knm: '코카 푸',
    },
    {
      kindCd: '000145',
      knm: '코카시안오브차카',
    },
    {
      kindCd: '000036',
      knm: '콜리',
    },
    {
      kindCd: '000066',
      knm: '클라인스피츠',
    },
    {
      kindCd: '000065',
      knm: '키슈',
    },
    {
      kindCd: '000063',
      knm: '키스 훈드',
    },
    {
      kindCd: '000140',
      knm: '토이 맨체스터 테리어',
    },
    {
      kindCd: '000107',
      knm: '토이 푸들',
    },
    {
      kindCd: '000106',
      knm: '티베탄 마스티프',
    },
    {
      kindCd: '000209',
      knm: '파라오 하운드',
    },
    {
      kindCd: '000086',
      knm: '파슨 러셀 테리어',
    },
    {
      kindCd: '000088',
      knm: '팔렌',
    },
    {
      kindCd: '000090',
      knm: '퍼그',
    },
    {
      kindCd: '000087',
      knm: '페키니즈',
    },
    {
      kindCd: '000138',
      knm: '페터데일테리어',
    },
    {
      kindCd: '000089',
      knm: '포메라니안',
    },
    {
      kindCd: '000126',
      knm: '포인터',
    },
    {
      kindCd: '000127',
      knm: '폭스테리어',
    },
    {
      kindCd: '000128',
      knm: '푸들',
    },
    {
      kindCd: '000091',
      knm: '풀리',
    },
    {
      kindCd: '000003',
      knm: '풍산견',
    },
    {
      kindCd: '000161',
      knm: '프레사까나리오',
    },
    {
      kindCd: '000050',
      knm: '프렌치 불독',
    },
    {
      kindCd: '000168',
      knm: '프렌치 브리타니',
    },
    {
      kindCd: '000049',
      knm: '플랫 코티드 리트리버',
    },
    {
      kindCd: '000147',
      knm: '플롯하운드',
    },
    {
      kindCd: '000092',
      knm: '피레니안 마운틴 독',
    },
    {
      kindCd: '000048',
      knm: '필라 브라질레이로',
    },
    {
      kindCd: '000135',
      knm: '핏불테리어',
    },
    {
      kindCd: '000206',
      knm: '허배너스',
    },
    {
      kindCd: '000130',
      knm: '화이트리트리버',
    },
    {
      kindCd: '000134',
      knm: '화이트테리어',
    },
    {
      kindCd: '000111',
      knm: '휘펫',
    },
  ];

  useEffect(() => {
    axios
      .get(
        'https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?numOfRows=100&upkind=417000&_type=json&state=protect&serviceKey=WXT8p8vqKpEWsfVbboNx3tvmBeHbzj87Zpv1VqSqNdCFz4qrvPfjNjuH3qrvfkdtSRzhZiSu0arymoQwLSp%2Bbg%3D%3D',
      )
      .then((res) => res.data)
      .then((data) => {
        // console.log(data);
        setAbandonedList(data.response.body.items.item);
        setLoading(false);
      });
  }, []);

  // console.log(abandonedList);

  // 검색 기능
  const [sex, setSex] = useState();
  const [breed, setBreed] = useState();
  const [color, setColor] = useState();
  const [weight, setWeight] = useState();
  const [neutered, setNeutered] = useState();
  const [place, setPlace] = useState();
  const [feature, setFeature] = useState();

  const breedChange = (event, value) => {
    const breedValue = value || undefined;
    setBreed(breedValue);
  };

  const sexChange = (event, value) => {
    const sexValue = value === '여' ? 'F' : 'M' || undefined;
    // DB에는 F, M이지만 입력값은 남, 여로 받음
    setSex(sexValue);
  };

  const colorChange = (event, value) => {
    const colorValue = event.target.value || undefined;
    setColor(colorValue);
  };

  const weightChange = (event, value) => {
    const weightValue = event.target.value || undefined;
    setWeight(weightValue);
  };

  const neuteredChange = (event, value) => {
    // O(Y), X(N), 알수없음(U)
    if (value === 'O') {
      setNeutered('Y');
    } else if (value === 'X') {
      setNeutered('N');
    } else if (value === '알수없음') {
      setNeutered('U');
    } else {
      setNeutered(undefined);
    }
  };

  const placeChange = (event, value) => {
    const placeValue = value || undefined;
    setPlace(placeValue);
  };

  const featureChange = (event, value) => {
    const featureValue = event.target.value || undefined;
    setFeature(featureValue);
  };

  const [filtered, setFiltered] = useState(abandonedList);
  // console.log(filtered);

  const filterData = () => {
    if (
      // 입력값이 없으면 초기데이터 계속 출력
      breed === undefined &&
      sex === undefined &&
      color === undefined &&
      weight === undefined &&
      neutered === undefined &&
      place === undefined &&
      feature === undefined
    ) {
      setFiltered(abandonedList);
    } else {
      const filteredList = abandonedList.reduce((acc, cur) => {
        // 입력값이 없으면 기본적으로 조건에 true를 설정 (그냥 넘어가게 함)
        const sexCondition = sex && sex.length > 0 ? cur.sexCd.includes(sex) : true;
        const breedCondition = breed && breed.length > 0 ? cur.kindCd.includes(breed) : true;
        const colorCondition = color && color.length > 0 ? cur.colorCd.includes(color) : true;
        const weightCondition = weight && weight.length > 0 ? cur.weight.includes(weight) : true;
        const neuteredCondition = neutered && neutered.length > 0 ? cur.neuterYn.includes(neutered) : true;
        const placeCondition = place && place.length > 0 ? cur.careAddr.includes(place) : true;
        const featureCondition = feature && feature.length > 0 ? cur.specialMark.includes(feature) : true;
        if (sexCondition && breedCondition && colorCondition && weightCondition && neuteredCondition && placeCondition && featureCondition) {
          acc.push(cur);
        }
        return acc;
      }, []);

      setFiltered(filteredList);
    }
  };

  useEffect(() => {
    // input이나 데이터가 변화될때만 재렌더링 (useEffect 미사용시 무한 렌더링 - 과부하 우려)
    filterData();
  }, [abandonedList, breed, sex, color, weight, neutered, place, feature]);

  // console.log(filtered);

  return (
    <StyledAdoptionHome>
      <div className="banner">
        <img className="topimage" src={TopImage} alt="banner" />

        <div className="titletext">
          <p className="line">소중한 아이들의 </p>
          <span className="line" id="family">
            가족
          </span>
          <span>이 되어주세요!</span>
        </div>
        <Button onClick={() => window.open('https://www.animal.go.kr/front/awtis/public/publicList.do?menuNo=1000000055', '_blank')}>
          <span className="content">더 많은 아이들 보러 가기</span>
        </Button>
      </div>

      {/* 검색 조건 */}

      <div className="new">
        <div className="section">
          <p className="sectiontitle">견종</p>
          <Autocomplete
            id="combo-box-breed"
            sx={{
              '& label.Mui-focused': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
              },
            }}
            options={dogKind.map((kind) => kind.knm)}
            onChange={breedChange}
            disablePortal
            className="box"
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                inputProps={{
                  ...params.inputProps,
                  style: {
                    fontSize: '0.1rem',
                    paddingTop: 3,
                    paddingBottom: 3,
                  },
                }}
              />
            )}
          />
        </div>

        <div className="section">
          <span className="sectiontitle">중성화</span>
          <Autocomplete
            id="combo-box-breed"
            options={['O', 'X', '알수없음']}
            onChange={neuteredChange}
            disablePortal
            sx={{
              '& label.Mui-focused': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
              },
            }}
            className="box"
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                inputProps={{
                  ...params.inputProps,
                  style: { fontSize: '0.1rem', paddingTop: 3, paddingBottom: 3 },
                }}
              />
            )}
          />
        </div>
        <div className="section">
          <span className="sectiontitle">성별</span>
          <Autocomplete
            id="combo-box-breed"
            options={['남', '여']}
            onChange={sexChange}
            disablePortal
            className="box"
            sx={{
              '& label.Mui-focused': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                inputProps={{
                  ...params.inputProps,
                  style: { fontSize: '0.1rem', paddingTop: 3, paddingBottom: 3 },
                }}
              />
            )}
          />
        </div>

        <div className="section">
          <span className="sectiontitle">유기장소</span>
          <Autocomplete
            id="combo-box-breed"
            options={[
              '서울특별시',
              '부산광역시',
              '대구광역시',
              '인천광역시',
              '광주광역시',
              '세종특별자치시',
              '대전광역시',
              '울산광역시',
              '경기도',
              '강원도',
              '충청북도',
              '충청남도',
              '전라북도',
              '전라남도',
              '경상북도',
              '경상남도',
              '제주특별자치도',
            ]}
            onChange={placeChange}
            disablePortal
            className="box"
            renderInput={(params) => (
              <TextField
                {...params}
                label=""
                sx={{
                  '& label.Mui-focused': {
                    color: 'white',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                    '&:hover fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}
                inputProps={{
                  ...params.inputProps,
                  style: { fontSize: '0.1rem', paddingTop: 3, paddingBottom: 3 },
                }}
              />
            )}
          />
        </div>
        <div className="section">
          <div className="sectiontitle">털색</div>
          <TextField
            id="outlined-search"
            className="box"
            onChange={colorChange}
            label=""
            sx={{
              '& label.Mui-focused': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
              },
            }}
            InputLabelProps={{ style: { fontSize: 12 } }}
            inputProps={{
              style: {
                fontSize: 12,
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: 'white',
                borderRadius: 4,
              },
            }}
          />
        </div>
        <div className="section">
          <span className="sectiontitle">몸무게</span>
          <TextField
            id="outlined-search"
            className="box"
            onChange={weightChange}
            label=""
            sx={{
              '& label.Mui-focused': {
                color: 'white',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
              },
            }}
            InputLabelProps={{ style: { fontSize: 12 } }}
            inputProps={{
              style: {
                fontSize: 12,
                paddingTop: 12,
                paddingBottom: 12,
                backgroundColor: 'white',
                borderRadius: 4,
              },
            }}
          />
        </div>

        <div className="section" id="feature-search">
          <div className="sectiontitle" id="feature-keyword">
            성격 키워드
          </div>
          <div id="featuretextfield">
            <TextField
              className="box"
              id="featurekeyword"
              onChange={featureChange}
              sx={{
                '& label.Mui-focused': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white',
                  },
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputBase-root': {
                  width: '68vw',
                },
              }}
              label="ex. 온순함, 사람따름"
              InputLabelProps={{ style: { fontSize: 12 } }}
              inputProps={{
                style: {
                  fontSize: 12,
                  backgroundColor: 'white',
                  borderRadius: 4,
                  paddingTop: 7,
                  paddingBottom: 7,
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="itemtitle">
        <span id="family2">가족</span>
        <span>을 기다리는 아이들</span>
      </div>

      {loading && filtered.length === 0 ? (
        <Spinner />
      ) : (
        <div className="contents">
          {filtered.length === 0 ? (
            <div id="noresult">
              <p>검색 결과가 없습니다.</p>
              <p>다른 조건으로 검색해보세요! 🐶</p>
            </div>
          ) : (
            <StyledItems>
              {filtered.map((f) => (
                <AbandonedItem key={f.desertionNo} item={f} />
              ))}
            </StyledItems>
          )}
        </div>
      )}
    </StyledAdoptionHome>
  );
}

export default AdoptionHome;
