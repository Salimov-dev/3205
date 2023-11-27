import { Box, styled, Typography } from "@mui/material";

const Component = styled(Box)`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = () => {
  return (
    <Component>
      <Typography variant="h3">Тестовое для 3205</Typography>
    </Component>
  );
};

export default Header;
