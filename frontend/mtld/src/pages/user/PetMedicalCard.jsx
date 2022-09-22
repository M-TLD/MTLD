import React from 'react';
import styled from 'styled-components';
import PetMedicalCardCover from 'components/petinfo/PetMedicalCardCover';
import PetMedicalCardDetail from 'components/petinfo/PetMedicalCardDetail';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledCloseRoundedIcon = styled(CloseRoundedIcon)`
  position: absolute;
  margin: 5vh 30vw;
  color: #f38181;
`;

function PetMedicalCard() {
  const [open, setOpen] = React.useState(false);
  const OpenCard = () => {
    setOpen((prev) => !prev);
  };

  if (open === false) {
    return (
      <div onClick={OpenCard} onKeyDown={OpenCard} role="button" tabIndex={0}>
        <PetMedicalCardCover />
      </div>
    );
  }
  return (
    <div>
      <div onClick={OpenCard} onKeyDown={OpenCard} role="button" tabIndex={0}>
        <StyledCloseRoundedIcon fontSize="medium" />
      </div>
      <PetMedicalCardDetail />
    </div>
  );
}

export default PetMedicalCard;
