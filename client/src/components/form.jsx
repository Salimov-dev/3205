import { Box, styled, TextField, Button } from "@mui/material";

const Component = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: start;
`;

const Container = styled(`form`)({
  display: "flex",
  width: "300px",
  aligntems: "center",
  flexDirection: "column",
  marginBottom: "10px",
  gap: "8px",
});

const Form = ({ data, onSubmit, onEmailChange, onNumberChange }) => {
  return (
    <Component>
      <Container>
        <TextField
          required
          id="email"
          label="Email"
          value={data.email}
          onChange={onEmailChange}
          inputProps={{ maxLength: 70 }}
        />
        <TextField
          id="number"
          label="Номер"
          value={data.number}
          onChange={onNumberChange}
          inputProps={{ maxLength: 8 }}
        />
        <Button variant="outlined" onClick={onSubmit}>
          Отправить
        </Button>
      </Container>
    </Component>
  );
};

export default Form;
