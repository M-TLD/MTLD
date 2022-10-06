import { React, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Avatar from '@mui/material/Avatar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch, useSelector } from 'react-redux';
import { registerPuppyInfo } from 'app/puppy';
import puppyface from 'assets/puppyface.png';
import { isFulfilled } from '@reduxjs/toolkit';
import Autocomplete from '@mui/material/Autocomplete';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RadioWrap = styled.div`
  margin: 1vh 0;
  text-align: start;

  .radioDiv {
    display: flex;
    justify-content: center;
  }
`;

const Title = styled.div`
  display: flex;
  color: #5c5c5c;
  font-size: 26px;
  font-weight: 600;
  p {
    margin-bottom: 5%;
  }
`;

const PetImage = styled.div`
  .buttonWrap {
    position: relative;
  }

  .uploadedImage {
    border: 8px solid;
    border-color: #ffeeb1;
  }

  .upload-btn {
    display: none;
  }

  .btn-shown {
    position: absolute;
    top: 68%;
    left: 78%;
    height: 25%;
    width: 25%;
    border: none;
    background-color: #ffeeb1;
    border-radius: 50%;
    color: white;
  }
`;

const PetInfoInput = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  color: #5c5c5c;

  .input {
    margin-bottom: 2%;
  }
`;

const RegisterButton = styled.button`
  width: 70vw;
  height: 5vh;
  border: none;
  background-color: #ffeeb1;
  // box-shadow: 0px 2px 5px 0.1px #5c5c5c;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  font-family: GmarketSansMedium;
  font-size: 18px;
  color: #5c5c5c;
  border-radius: 10px;
  margin-bottom: 20px;
`;

function PetInfoCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dateValue, setDateValue] = useState(dayjs('2022-10-07T00:00:00'));
  const [birthdateValue, setBirthdateValue] = useState('');
  const [breedIdValue, setBreedIdValue] = useState(1);
  const [diseaseValue, setDiseaseValue] = useState('');
  const [fileURLValue, setFileURLValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [neuterValue, setNeuterValue] = useState(true);
  const [weightValue, setWeightValue] = useState(0);

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

  const onBreedIdChange = (event, value) => {
    const breedValue = value.kindCd || undefined;
    setBreedIdValue(breedValue);
  };

  const onDiseaseChange = (e) => {
    setDiseaseValue(e.currentTarget.value);
  };

  const onGenderChange = (e) => {
    setGenderValue(e.currentTarget.value);
  };

  const onNameChange = (e) => {
    setNameValue(e.currentTarget.value);
  };

  const onNeuterChange = (e) => {
    setNeuterValue(e.currentTarget.value);
  };

  const onWeightChange = (e) => {
    setWeightValue(e.currentTarget.value);
  };

  const parsedData = {
    birthdate: birthdateValue,
    code: breedIdValue,
    disease: diseaseValue,
    gender: genderValue,
    name: nameValue,
    neuter: neuterValue,
    weight: weightValue,
  };

  const handleChange = (newValue) => {
    setDateValue(newValue);
    const birthDate = newValue.$d;
    const parsedBirthDate = birthDate.toISOString().slice(0, 10);
    setBirthdateValue(parsedBirthDate);
  };

  const [Image, setImage] = useState(puppyface);
  const fileInput = useRef(null);

  const onLoadFile = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0].name);

      // formData.append('image', event.target.files[0]);

      if (Image) {
        setFileURLValue(event.target.files[0]);
      }
    } else {
      setImage(puppyface);
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  };

  const registerButton = async () => {
    let action = '';
    action = await dispatch(registerPuppyInfo([fileURLValue, parsedData]));
    if (isFulfilled(action)) {
      const dogId = action.payload;
      navigate(`/pet-info-detail/${dogId}`);
    }
  };

  return (
    <Wrap>
      <Title>
        <p>반려견 정보 등록</p>
      </Title>
      <PetImage>
        <div className="buttonWrap">
          <Avatar
            alt="puppyface"
            className="uploadedImage"
            src={Image}
            // round="true"
            sx={{ width: '180px', height: '180px' }}
            onClick={() => {
              fileInput.current.click();
            }}
          />
          <input ref={fileInput} className="upload-btn" type="file" name="profile-image" id="profile" accept="image/*" onChange={onLoadFile} />
          <button
            className="btn-shown"
            type="button"
            onClick={() => {
              fileInput.current.click();
            }}
          >
            <CameraAltIcon fontSize="medium" />
          </button>
        </div>
      </PetImage>
      <PetInfoInput>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField onChange={onNameChange} id="standard-basic" label="이름" variant="standard" />
        </Box>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
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
            options={dogKind}
            getOptionLabel={(option) => option.knm}
            onChange={onBreedIdChange}
            disablePortal
            className="box"
            renderInput={(params) => (
              <TextField
                {...params}
                label="견종"
                variant="standard"
                inputProps={{
                  ...params.inputProps,
                  style: {
                    fontSize: '1rem',
                    paddingTop: 3,
                    paddingBottom: 3,
                  },
                }}
              />
            )}
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="생년월일/입양일"
            inputFormat="YYYY/MM/DD"
            value={dateValue}
            onChange={handleChange}
            maxDate={new Date()}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  ref={inputRef}
                  {...inputProps}
                  id="date"
                  label="생년월일/입양일"
                  variant="standard"
                  InputProps={{ style: { fontFamily: 'GmarketSansMedium' } }}
                  InputLabelProps={{ style: { fontFamily: 'GmarketSansMedium' } }}
                />
              </Box>
            )}
          />
        </LocalizationProvider>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="몸무게"
            variant="standard"
            type="number"
            onChange={onWeightChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
        </Box>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="standard-basic" label="병력" variant="standard" onChange={onDiseaseChange} />
        </Box>

        <RadioWrap>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              sx={{
                textalign: 'start',
              }}
            >
              성별
            </FormLabel>
            <div className="radioDiv">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ gap: '15vw' }}
                onChange={onGenderChange}
              >
                <FormControlLabel value="FEMALE" control={<Radio />} label="여아" labelPlacement="end" />
                <FormControlLabel value="MALE" control={<Radio />} label="남아" labelPlacement="end" />
              </RadioGroup>
            </div>
          </Box>
        </RadioWrap>

        <RadioWrap>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <FormLabel id="demo-row-radio-buttons-group-label">중성화여부</FormLabel>
            <div className="radioDiv">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                sx={{ gap: '15vw' }}
                onChange={onNeuterChange}
              >
                <FormControlLabel value="true" control={<Radio />} label="예" labelPlacement="end" />
                <FormControlLabel value="false" control={<Radio />} label="아니오" labelPlacement="end" />
              </RadioGroup>
            </div>
          </Box>
        </RadioWrap>
      </PetInfoInput>
      <RegisterButton onClick={registerButton}>등록하기</RegisterButton>
    </Wrap>
  );
}

export default PetInfoCreate;
