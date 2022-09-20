import React from 'react';
import styled from 'styled-components';
import InfoModal from 'components/common/InfoModal';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Grid from '@mui/material/Grid';

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

const DogCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eafed1;
  margin-top: 2vh;
  width: 90vw;
  height: 80vh;
  border-radius: 10px;
  box-shadow: 0px 2px 2px 0.1px #5c5c5c;
`;

const CardDecoLine = styled.div`
  border: white solid 2px;
  width: 80vw;
  height: 75vh;
  border-radius: 8px;
`;

const VaccineForm = styled.div`
  margin-left: 5vw;
  margin-top: 1.5vh;
  display: flex;
  width: 90%;
  flex-direction: column;
  text-align: start;
  align-items: start;

  h3 {
    color: #81e3d7;
    margin: 0;
    padding: 0;
  }

  h4 {
    color: #5c5c5c;
    margin: 0;
    padding: 0;
    font-size: 95%;
  }

  .dateFormVacc {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin: 0.2vh 0;
  }

  .datePicker {
    display: flex;
    width: 100%;
  }

  input {
    font-family: 'GmarketSansMedium';
    font-size: 80%;
    color: #5c5c5c;
    border: none;
    width: 110px;
    display: flex;
    text-align: center;
  }

  .dateDiv1 {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .dateDiv2 {
    display: flex;
    width: 100%;
  }

  .dateTitle {
    color: #5c5c5c;
    font-size: 90%;
  }
`;
const MedicineForm = styled.div`
  margin-left: 5vw;
  margin-top: 0.5vh;
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: start;

  h3 {
    color: #81e3d7;
    margin: 0;
    padding: 0;
  }

  h4 {
    color: #5c5c5c;
    margin: 0;
    padding: 0;
  }

  p {
    color: #5c5c5c;
    margin: 0;
    padding: 0;
    font-size: 70%;
  }

  .dateFormMed {
    display: flex;
    flex-direction: column;
    align-items: start;
    width: 100%;
    margin: 0.1vh 0;
  }

  .datePicker {
    display: flex;
    width: 100%;
  }

  .vaccineDatePicker {
    display: flex;
  }

  input {
    font-family: 'GmarketSansMedium';
    font-size: 80%;
    color: #5c5c5c;
    border: none;
    width: 110px;
    display: flex;
    text-align: center;
  }

  .dateDiv1 {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .dateDiv2 {
    display: flex;
    width: 100%;
  }

  .dateTitle {
    color: #5c5c5c;
    font-size: 90%;
  }
`;

function PetMedicalCardDetail() {
  const [value, setValue] = React.useState(dayjs());

  return (
    <Wrap>
      <DogCard>
        <CardDecoLine>
          <VaccineForm>
            <div className="title">
              <h3>예방접종 트래커</h3>
              <InfoModal />
            </div>
            <div className="dateFormVacc">
              <h4>DHPPL</h4>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">접종일지</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">다음접종</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormVacc">
              <h4>코로나</h4>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">접종일지</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">다음접종</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormVacc">
              <h4>켄넬코프</h4>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">접종일지</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">다음접종</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormVacc">
              <h4>광견병</h4>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">접종일지</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">다음접종</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </VaccineForm>
          <MedicineForm>
            <div className="title">
              <h3>복용약 알리미</h3>
            </div>
            <div className="dateFormMed">
              <h4>심상사상충약</h4>
              <p>
                <span style={{ fontWeight: 700 }}>한 달에 한 번 </span>
                급여해 주는 것을 권장해요!
              </p>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">복용일자</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormMed">
              <h4>진드기약</h4>
              <p>
                <span style={{ fontWeight: 700 }}>한 달에 한 번 </span>
                급여해 주는 것을 권장해요!
              </p>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">복용일자</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
            <div className="dateFormMed">
              <h4>구충제</h4>
              <p>
                <span style={{ fontWeight: 700 }}>일 년에 한 번 </span>
                급여해 주는 것을 권장해요!
              </p>
              <div className="datePicker">
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={0.5}>
                    <Grid item xs={10}>
                      <div className="dateDiv1">
                        <div className="dateTitle">복용일자</div>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="예방접종일자"
                              value={value}
                              onChange={(newValue) => {
                                setValue(newValue);
                              }}
                              renderInput={({ inputRef, inputProps, InputProps }) => (
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <input ref={inputRef} {...inputProps} />
                                  {InputProps?.endAdornment}
                                </Box>
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={2}>
                      <div className="dateDiv2">
                        <NotificationsActiveIcon
                          sx={{ color: '#81e3d7', margin: '0', padding: '0' }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </Box>
              </div>
            </div>
          </MedicineForm>
        </CardDecoLine>
      </DogCard>
    </Wrap>
  );
}

export default PetMedicalCardDetail;
