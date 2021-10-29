import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";

export const StyledWrapper = styled.div`
  width: 90%;
  margin: 1rem auto;
`;

export const StyledAvatar = styled(Avatar)`
  background: #619463;
`;

export const StyledEdit = styled(EditIcon)`
  color: #619463;
`;

export const StyledCheck = styled(DoneIcon)`
  color: #619463;
`;

export const StyledAvatarWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 2rem;
`;

export const StyledEditWrapper = styled.div`
  margin-top: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

export const StyledBoldText = styled.span`
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 2px;
`;

export const StyledNavigationWrapper = styled.div`
  margin-top: 4rem;
  display: grid;
  grid-gap: 1rem;
`;

export const StyledText = styled.p`
  font-size: 1rem;
  letter-spacing: 2px;
  padding-top: 40px;
  text-align: center;
`;
export const StyledCheckWrapper = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr;
`

export const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid gray;
  background: white;
  color: black;
  outline: none;
  font-size: 1rem;
  width: 50%;
`
