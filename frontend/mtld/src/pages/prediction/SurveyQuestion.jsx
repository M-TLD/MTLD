import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { without } from 'underscore';
import { useTheme } from '@mui/material/styles';
import { report } from 'app/diagnosis';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';

const StyledSurvey = styled.div`
  padding-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .b-box {
    font-family: 'Pretendard-Regular';
  }

  .submitbox {
    height: 250px;
    width: 320px;
    background-color: #fafafa;
    border-radius: 8px;
    margin-top: 2vh;
    padding: 1vh;
    padding-top: 1vh;
  }

  .submitlist {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    font-family: 'Pretendard-Regular';
  }

  .placeholder {
    color: #bdbdbd;
  }

  .rechoice {
    position: fixed;
  }

  .condition-item {
    display: inline-block;
    color: #848484;
    background-color: #def3fe;
    padding-top: 1vh;
    padding-bottom: 1vh;
    padding-left: 2vh;
    padding-right: 2vh;
    margin: 0.5vh;
    border-radius: 15px;
  }

  .pound {
    color: white;
  }
`;

const RegisterButton = styled.button`
  width: 330px;
  height: 5vh;
  border: none;
  margin-top: 1vh;
  background-color: #ffeeb1;
  // box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  font-family: GmarketSansMedium;
  border-radius: 8px;
  color: #5c5c5c;
  &:hover,
  &:active {
    cursor: pointer;
  }
`;

const RechoiceButton = styled.button`
  width: 330px;
  height: 5vh;
  border: none;
  margin-top: 1vh;
  background-color: #f2f2f2;
  // box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  font-family: GmarketSansMedium;
  border-radius: 8px;
  color: #5c5c5c;
  &:hover,
  &:active {
    cursor: pointer;
  }
`;

const StyledLink = styled(NavLink)`
  width: 330px;
  height: 5vh;
  text-decoration: none;
  background-color: #ffdcdc;
  border-radius: 8px;
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
  // box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #5c5c5c;
  font-size: 18px;
  margin-top: 1.5vh;
  margin-bottom: 1.5vh;

  .content {
    font-size: 13pt;
  }

  .bold {
    font-weight: 600;
  }
`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(con, condition, theme) {
  return {
    fontFamily: 'Pretendard-Regular',
    fontWeight: condition.indexOf(con) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

function SurveyQuestion() {
  const navigate = useNavigate();
  const [disease, setDisease] = useState();
  const [titleArr, setTitleArr] = useState();
  const [contentArr, setContentArr] = useState();

  // 증상 데이터 get
  useEffect(() => {
    axios.get('https://j7a106.p.ssafy.io/disease/').then((res) => {
      setDisease(res.data);
      setTitleArr(Object.keys(res.data));
      setContentArr(Object.values(res.data));
    });
  }, []);

  // console.log(titleArr);
  // console.log(contentArr);

  // MUI Chip
  const [title, setTitle] = useState('');
  const [titleIdx, setTitleIdx] = useState(-1);
  const theme = useTheme();
  const [condition, setCondition] = useState([]);
  const [submitList, setSubmitList] = useState([]);
  const [submitRecord, setSubmitRecord] = useState([]);

  const titleChange = (event) => {
    setTitle(event.target.value);
    setTitleIdx(titleArr.indexOf(event.target.value));
    setCondition([]);
  };

  const conditionChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log(value);
    setCondition(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  // console.log(condition);

  // Chip의 delete 버튼 누르면 삭제
  const handleDelete = (e, value) => {
    e.preventDefault();
    setCondition((current) => without(current, value));
  };

  const addCondition = () => {
    condition.map((con, idx) => submitList.push(con));
    setSubmitRecord(submitList.map((row) => row.list_code));
    setCondition([]);
  };

  const deleteCondition = () => {
    setSubmitList([]);
    setSubmitRecord([]);
  };

  // const reportData = useSelector((state) => state.diagnosis.value);
  const dispatch = useDispatch();

  const submitExecute = () => {
    axios.post('https://j7a106.p.ssafy.io/disease/', submitRecord).then((res) => {
      // console.log(res);
      dispatch(report(res.data));
      if (res.status === 200) {
        navigate('/survey-result');
      }
    });
  };

  if (disease !== undefined) {
    return (
      <StyledSurvey>
        {/* 분류 탭 */}
        <div>
          <Box sx={{ m: 1, width: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">분류</InputLabel>
              <Select className="b-box" labelId="demo-simple-select-label" id="demo-simple-select" value={title} label="분류" onChange={titleChange}>
                {titleArr.map((title, idx) => (
                  <MenuItem style={{ fontFamily: 'Pretendard-Regular' }} value={title} id={idx} key={idx} className="b-box">
                    {title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </div>

        <div>
          {/* 증상 탭 */}
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">증상</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={condition}
              onChange={conditionChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, fontFamily: 'Pretendard-Regular' }}>
                  {selected.map((value, idx) => (
                    <Chip
                      key={idx}
                      label={value.list_kname}
                      clickable
                      deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                      onDelete={(e) => handleDelete(e, value)}
                      onClick={() => console.log()}
                      style={{ fontFamily: 'Pretendard-Regular' }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {titleIdx !== -1 ? (
                contentArr[titleIdx].map((con, idx) => (
                  <MenuItem key={idx} value={con} style={getStyles(con, condition, theme)}>
                    {con.list_kname}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>
                  <p style={{ fontSize: '10px', fontFamily: 'Pretendard-Regular' }}>분류를 선택하세요!</p>
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <RegisterButton onClick={addCondition}>증상 저장하기</RegisterButton>
        <div className="submitbox">
          {submitList.length > 0 ? (
            <div className="submitlist">
              {submitList.map((content, idx) => (
                <span className="condition-item">
                  <span className="pound"># </span>
                  <span key={idx}>{content.list_kname}</span>
                </span>
              ))}
            </div>
          ) : (
            <div className="placeholder">증상을 알려주세요!</div>
          )}
        </div>
        <RechoiceButton onClick={deleteCondition}>증상 다시 선택하기</RechoiceButton>

        <StyledLink onClick={submitExecute}>
          <div className="content">
            <span>질병정보 </span>
            <span className="bold">알아보기</span>
          </div>
        </StyledLink>
      </StyledSurvey>
    );
  }
}

export default SurveyQuestion;
