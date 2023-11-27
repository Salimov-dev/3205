import express from "express";
import cors from "cors";

const PORT = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.options("*", cors());

const requestTimestamp = 5000;
let lastRequestTimestamp = 0;

app.post("/search", (req, res) => {
  const { email, number } = req.body;

  // валидация email
  const isEmailValid = (email) => {
    const emailRegex = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    return emailRegex.test(email);
  };
  if (!email) {
    return res.status(400).json({ error: "Введите email" });
  }
  if (!isEmailValid(email)) {
    return res.status(400).json({ error: "Введите корректный email" });
  }

  // валидация number
  if (number) {
    const isNumericValue = number.replace(/[^0-9]/g, "");
    const isFullNumber = number.length === 8;
    if (!isFullNumber) {
      return res.status(400).json({ error: "Вводите номер целиком" });
    }
    if (!isNumericValue) {
      return res.status(400).json({ error: "Вводите только цифры" });
    }
  }

  const currentTimestamp = Date.now();
  if (currentTimestamp - lastRequestTimestamp < requestTimestamp) {
    return res.status(429).json({
      error: "Запрос отменен, подождите окончания отправки данных на сервер!",
    });
  }
  lastRequestTimestamp = currentTimestamp;

  const formattedNumber = (number) => {
    return number.replace(/[^0-9]/g, "");
  };

  const searchResults = data.filter(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      (!number || formattedNumber(user.number) === formattedNumber(number))
  );

  if (!searchResults.length) {
    return res
      .status(400)
      .json({ error: "Ни чего не найдено, проверьте корректность email" });
  }

  setTimeout(() => {
    res.json(searchResults);
  }, requestTimestamp);
});

app.listen(PORT, () => {
  console.log(`Server was started on port ${PORT}`);
});

const data = [
  { _id: "0", email: "jim@gmail.com", number: "221122" },
  { _id: "1", email: "jam@gmail.com", number: "830347" },
  { _id: "2", email: "john@gmail.com", number: "221122" },
  { _id: "3", email: "jams@gmail.com", number: "349425" },
  { _id: "4", email: "jams@gmail.com", number: "141424" },
  { _id: "5", email: "jill@gmail.com", number: "822287" },
  { _id: "6", email: "jill@gmail.com", number: "822286" },
];
