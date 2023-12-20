const express = require('express');
const multer = require('multer');
const fluentFFmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const ytdl = require('ytdl-core');

fluentFFmpeg.setFfmpegPath('C:\\ffmpeg\\bin\\ffmpeg.exe');  

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cors = require('./config/cors.config');

app.use(cors);

app.use(express.json());

app.post('/convertToMP3', upload.single('audioFile'), (req, res) => {
  const uploadDir = './uploads/';
  const filePath = path.join(uploadDir, 'input.wav');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  fs.writeFileSync(filePath, req.file.buffer);

  const outputPath = path.join(uploadDir, 'output.mp3');

  console.log('Ruta del archivo:', outputPath);

  fluentFFmpeg()
    .input(filePath)
    .audioCodec('libmp3lame')
    .audioBitrate(320)  
    .on('end', () => {
      const mp3Data = fs.readFileSync(outputPath);

      res.setHeader('Content-Type', 'audio/mp3');
      res.status(200).send(mp3Data);

      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);
    })
    .on('error', (err) => {
      console.error('Error al convertir a MP3:', err);
      res.status(500).send('Error al convertir a MP3');
    })
    .save(outputPath);
});

app.post('/audioCut', upload.single('audioFile'), (req, res) => {
  const uploadDir = './uploads/';
  const filePath = path.join(uploadDir, 'input.wav');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  fs.writeFileSync(filePath, req.file.buffer);

  const outputPath = path.join(uploadDir, 'output.mp3');

  const { startTime, duration } = req.body;

  console.log('Ruta del archivo:', outputPath); 

  fluentFFmpeg()
    .input(filePath)
    .setStartTime(startTime)
    .setDuration(duration)
    .audioCodec('libmp3lame')
    .audioBitrate(320)  
    .on('end', () => {
      const mp3Data = fs.readFileSync(outputPath);

      res.setHeader('Content-Type', 'audio/mp3');
      res.status(200).send(mp3Data);

      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);
    })
    .on('error', (err) => {
      console.error('Error al cortar el audio:', err);
      res.status(500).send('Error al cortar el audio');
    })
    .save(outputPath);
});

app.post('/convertToWav', upload.single('audioFile'), (req, res) => {
  const uploadDir = './uploads/';
  const filePath = path.join(uploadDir, 'input.mp3');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  fs.writeFileSync(filePath, req.file.buffer);

  const outputPath = path.join(uploadDir, 'output.wav');

  console.log('Ruta del archivo:', outputPath); 

  fluentFFmpeg()
    .input(filePath)
    .audioCodec('pcm_s16le')
    .audioChannels(1)
    .audioFrequency(16000)
    .on('end', () => {
      const wavData = fs.readFileSync(outputPath);

      res.setHeader('Content-Type', 'audio/wav');
      res.status(200).send(wavData);

      fs.unlinkSync(filePath);
      fs.unlinkSync(outputPath);
    })
    .on('error', (err) => {
      console.error('Error al convertir a WAV:', err);
      res.status(500).send('Error al convertir a WAV');
    })
    .save(outputPath);
});

app.post('/youtubeToMP3', async (req, res) => {
  try {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
      return res.status(400).json({ error: 'Se requiere la URL de YouTube en el cuerpo de la solicitud.' });
    }

    const uploadDir = './uploads/';
    const outputPath = path.join(uploadDir, 'output.mp3');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    console.log('Ruta del archivo:', outputPath);

    const audioStream = ytdl(youtubeUrl, {
      quality: 'highestaudio',
      filter: 'audioonly'
    });
    const writeStream = fs.createWriteStream(outputPath);

    audioStream.pipe(writeStream);

    writeStream.on('finish', () => {
      const mp3Data = fs.readFileSync(outputPath);

      res.setHeader('Content-Type', 'audio/mp3');
      res.status(200).send(mp3Data);

      fs.unlinkSync(outputPath);
    });

    writeStream.on('error', (error) => {
      console.error('Error al escribir el archivo:', error);
      res.status(500).send('Error al escribir el archivo MP3.');
    });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).send('Error interno del servidor.');
  }
});

app.post('/youtubeToWav', async (req, res) => {
  try {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
      return res.status(400).json({ error: 'Se requiere la URL de YouTube en el cuerpo de la solicitud.' });
    }

    const uploadDir = './uploads/';
    const outputPath = path.join(uploadDir, 'output.wav');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    console.log('Ruta del archivo:', outputPath);

    const audioStream = ytdl(youtubeUrl, {
      quality: 'highestaudio',
      filter: 'audioonly'
    });
    const writeStream = fs.createWriteStream(outputPath);

    audioStream.pipe(writeStream);

    writeStream.on('finish', () => {
      const wavData = fs.readFileSync(outputPath);

      res.setHeader('Content-Type', 'audio/wav');
      res.status(200).send(wavData);

      fs.unlinkSync(outputPath);
    });

    writeStream.on('error', (error) => {
      console.error('Error al escribir el archivo:', error);
      res.status(500).send('Error al escribir el archivo WAV.');
    });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).send('Error interno del servidor.');
  }
});

const port = 3001;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
