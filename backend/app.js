import express from 'express'
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get('/languages', async (req, res) => {
  try {
    const response = await axios.get('https://online-code-compiler.p.rapidapi.com/v1/languages/', {
      headers: {
        'X-RapidAPI-Key': '95a67c64aemsh8590f0db2679eb6p12fa0cjsn3f0edad2fc7c',
        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
      }
    });
    res.json(response.data);
    console.log(response)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/execute', async (req, res) => {
  try {
    const { language, code, input } = req.body;

    const options = {
      method: 'POST',
      url: 'https://online-code-compiler.p.rapidapi.com/v1/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '95a67c64aemsh8590f0db2679eb6p12fa0cjsn3f0edad2fc7c',
        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
      },
      data: {
        language,
        version: 'latest',
        code,
        input
      }
    };

    const response = await axios.post(options.url, options.data, { headers: options.headers });
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
