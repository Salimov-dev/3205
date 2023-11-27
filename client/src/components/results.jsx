import { Box, styled, Typography } from "@mui/material";
import Loader from "./loader";

const ResultsHeader = styled(Box)`
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultsContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ResultItems = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Error = styled(Typography)`
  color: red;
`;

const Results = ({ data, loading, error }) => {
  const resultLength = data?.searchResults?.length;

  return (
    <ResultsContainer>
      {loading && <Loader />}
      {error && <Error>{error}</Error>}

      {resultLength ? (
        <Box>
          <ResultsHeader>
            <Typography variant="h4">Результаты поиска</Typography>
            <Typography variant="h5">
              Найдено совпадений: {resultLength}
            </Typography>
          </ResultsHeader>

          <ResultItems>
            {data?.searchResults.map((item) => (
              <Typography key={item._id}>
                {item.email} - {item.number}
              </Typography>
            ))}
          </ResultItems>
        </Box>
      ) : null}
    </ResultsContainer>
  );
};

export default Results;
