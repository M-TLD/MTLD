import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { without } from 'underscore';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';

const StyledSurvey = styled.div`
  padding-top: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .submitlist {
    display: grid;
    margin-top: 2vh;
    height: 250px;
    width: 330px;
    background-color: #fafafa;
    border-radius: 8px;
  }

  .placeholder {
    color: #bdbdbd;
  }
`;

const RegisterButton = styled.button`
  width: 330px;
  height: 5vh;
  border: none;
  margin-top: 1vh;
  background-color: #ffeeb1;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  font-family: GmarketSansMedium;
  border-radius: 8px;
  color: #5c5c5c;
`;

const StyledLink = styled(NavLink)`
  width: 330px;
  height: 5vh;
  text-decoration: none;
  background-color: #ffdcdc;
  border-radius: 8px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
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
    font-weight: bold;
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
    fontWeight: condition.indexOf(con) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

function SurveyQuestion() {
  const [disease, setDisease] = useState();
  const [titleArr, setTitleArr] = useState();
  const [contentArr, setContentArr] = useState();
  const [currentTab, setCurrentTab] = useState(0);

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
    console.log('add!');
    condition.map((con, idx) => submitList.push(con));
    console.log(submitList);
    setSubmitRecord(submitList.map((row) => row.list_code));
    setCondition([]);
  };

  const submitExecute = () => {
    console.log('post');
    axios.post('https://j7a106.p.ssafy.io/disease/', submitRecord).then((res) => {
      console.log(res);
    });
  };
  console.log(submitRecord);

  if (disease !== undefined) {
    return (
      <StyledSurvey>
        {/* 분류 탭 */}
        <div>
          <Box sx={{ m: 1, width: 300 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">분류</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={title} label="분류" onChange={titleChange}>
                {titleArr.map((title, idx) => (
                  <MenuItem value={title} id={idx} key={idx}>
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
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value, idx) => (
                    <Chip
                      key={idx}
                      label={value.list_kname}
                      clickable
                      deleteIcon={<CancelIcon onMouseDown={(event) => event.stopPropagation()} />}
                      onDelete={(e) => handleDelete(e, value)}
                      onClick={() => console.log('clicked chip')}
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
                  <p style={{ fontSize: '10px' }}>분류를 선택하세요!</p>
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
        <RegisterButton onClick={addCondition}>증상 저장하기</RegisterButton>
        <div className="submitlist">
          {submitList.length > 0 ? (
            submitList.map((content, idx) => <div key={idx}>{content.list_kname}</div>)
          ) : (
            <div className="placeholder">증상을 알려주세요!</div>
          )}
        </div>

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
