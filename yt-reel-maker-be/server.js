// const express = require('express');
// const ytdl = require('ytdl-core');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// // Function to sanitize file names
// const sanitizeFileName = (name) => {
//   return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
// };

// // Function to generate a random string
// const generateRandomString = () => {
//   return Math.random().toString(36).substring(2, 15);
// };

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/download', async (req, res) => {
//   const videoUrl = req.body.url;
//   console.log(`Received request to download video: ${videoUrl}`);

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     console.log('Video info retrieved successfully.');

//     const selectedFormat = ytdl.chooseFormat(info.formats, {
//       quality: 'highestvideo',
//     });

//     if (!selectedFormat) {
//       console.error('No suitable format found for the video.');
//       return res.status(400).json({ error: 'No suitable format found for the video' });
//     }

//     const downloadsDir = path.join(__dirname, 'downloads');

//     // Ensure the directory exists
//     if (!fs.existsSync(downloadsDir)) {
//       fs.mkdirSync(downloadsDir);
//       console.log('Downloads directory created.');
//     }

//     // Sanitize the file name
//     const sanitizedTitle = sanitizeFileName(info.videoDetails.title);
//     const outputFilePath = path.join(downloadsDir, `${sanitizedTitle}.${selectedFormat.container}`);
//     console.log(`Saving video as: ${outputFilePath}`);

//     const outputStream = fs.createWriteStream(outputFilePath);

//     // Start downloading the video
//     const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });

//     videoStream.pipe(outputStream);

//     videoStream.on('progress', (chunkLength, downloaded, total) => {
//       const percent = (downloaded / total * 100).toFixed(2);
//       console.log(`Downloading: ${percent}% complete`);
//     });

//     videoStream.on('end', () => {
//       console.log('Download complete.');
//     });

//     videoStream.on('error', (err) => {
//       console.error('Error in video stream:', err);
//       res.status(500).send('Failed to download video');
//     });

//     outputStream.on('finish', () => {
//       console.log(`Video download completed: ${outputFilePath}`);

//       // Send a random string to the frontend
//       const randomString = generateRandomString();
//       console.log(`Sending random string to frontend: ${randomString}`);

//       // Optionally, delete the file after sending it
//       fs.unlink(outputFilePath, (err) => {
//         if (err) {
//           console.error('Error deleting file:', err);
//         } else {
//           console.log('File deleted successfully:', outputFilePath);
//         }
//       });

//       // Send the random string to the frontend
//       res.json({ message: randomString });
//     });

//     outputStream.on('error', (err) => {
//       console.error('Error writing video file:', err);
//       res.status(500).send('Failed to save video file');
//     });

//   } catch (error) {
//     console.error('Error downloading video:', error);
//     res.status(500).send('Failed to download video');
//   }
// });

// const port = process.env.PORT || 5002;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });





// const express = require('express');
// const ytdl = require("@distube/ytdl-core"); // CommonJS
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// // Function to sanitize file names
// const sanitizeFileName = (name) => {
//   return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
// };

// // Function to generate a random string (if needed for other purposes)
// const generateRandomString = () => {
//   return Math.random().toString(36).substring(2, 15);
// };

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/download', async (req, res) => {
//   const videoUrl = req.body.url;
//   console.log(`Received request to download video: ${videoUrl}`);

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     console.log('Video info retrieved successfully.');

//     const selectedFormat = ytdl.chooseFormat(info.formats, {
//       quality: 'highestvideo',
//     });

//     if (!selectedFormat) {
//       console.error('No suitable format found for the video.');
//       return res.status(400).json({ error: 'No suitable format found for the video' });
//     }

//     const downloadsDir = path.join(__dirname, 'downloads');

//     // Ensure the directory exists
//     if (!fs.existsSync(downloadsDir)) {
//       fs.mkdirSync(downloadsDir, { recursive: true });
//       console.log('Downloads directory created.');
//     }

//     // Sanitize the file name
//     const sanitizedTitle = sanitizeFileName(info.videoDetails.title);
//     const outputFilePath = path.join(downloadsDir, `${sanitizedTitle}.${selectedFormat.container}`);
//     console.log(`Saving video as: ${outputFilePath}`);

//     const outputStream = fs.createWriteStream(outputFilePath);

//     // Start downloading the video
//     const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });

//     videoStream.pipe(outputStream);

//     videoStream.on('progress', (chunkLength, downloaded, total) => {
//       const percent = (downloaded / total * 100).toFixed(2);
//       console.log(`Downloading: ${percent}% complete`);
//     });

//     videoStream.on('error', (err) => {
//       console.error('Error in video stream:', err);
//       res.status(500).json({ error: 'Failed to download video' });
//       // Clean up output stream
//       outputStream.destroy();
//       fs.unlink(outputFilePath, () => {}); // Attempt to delete partial file
//     });

//     outputStream.on('finish', () => {
//       console.log(`Video download completed: ${outputFilePath}`);

//       // Send the file path to the frontend
//       res.json({ message: 'Download complete', filePath: outputFilePath });
//     });

//     outputStream.on('error', (err) => {
//       console.error('Error writing video file:', err);
//       res.status(500).json({ error: 'Failed to save video file' });
//     });

//   } catch (error) {
//     console.error('Error downloading video:', error);
//     res.status(500).json({ error: 'Failed to download video' });
//   }
// });

// const port = process.env.PORT || 5002;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



 

// const express = require('express');
// const ytdl = require("@distube/ytdl-core");
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// // Function to sanitize file names
// const sanitizeFileName = (name) => {
//   return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
// };

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/download', async (req, res) => {
//   const videoUrl = req.body.url;
//   console.log(`Received request to download video: ${videoUrl}`);

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     console.log('Video info retrieved successfully.');

//     // Choose the format, forcing it to select an MP4 format
//     const selectedFormat = ytdl.chooseFormat(info.formats, {
//       quality: 'highestvideo',
//       filter: (format) => format.container === 'mp4' // Ensuring the format is MP4
//     });

//     if (!selectedFormat) {
//       console.error('No suitable MP4 format found for the video.');
//       return res.status(400).json({ error: 'No suitable MP4 format found for the video' });
//     }

//     const downloadsDir = path.join(__dirname, 'downloads');

//     // Ensure the directory exists
//     if (!fs.existsSync(downloadsDir)) {
//       fs.mkdirSync(downloadsDir, { recursive: true });
//       console.log('Downloads directory created.');
//     }

//     // Sanitize the file name and ensure the extension is .mp4
//     const sanitizedTitle = sanitizeFileName(info.videoDetails.title);
//     const outputFilePath = path.join(downloadsDir, `${sanitizedTitle}.mp4`);
//     console.log(`Saving video as: ${outputFilePath}`);

//     const outputStream = fs.createWriteStream(outputFilePath);

//     // Start downloading the video
//     const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });

//     videoStream.pipe(outputStream);

//     videoStream.on('progress', (chunkLength, downloaded, total) => {
//       const percent = (downloaded / total * 100).toFixed(2);
//       console.log(`Downloading: ${percent}% complete`);
//     });

//     videoStream.on('error', (err) => {
//       console.error('Error in video stream:', err);
//       res.status(500).json({ error: 'Failed to download video' });
//       // Clean up output stream
//       outputStream.destroy();
//       fs.unlink(outputFilePath, () => {}); // Attempt to delete partial file
//     });

//     outputStream.on('finish', () => {
//       console.log(`Video download completed: ${outputFilePath}`);

//       // Send the file path to the frontend
//       res.json({ message: 'Download complete', filePath: outputFilePath });
//     });

//     outputStream.on('error', (err) => {
//       console.error('Error writing video file:', err);
//       res.status(500).json({ error: 'Failed to save video file' });
//     });

//   } catch (error) {
//     console.error('Error downloading video:', error);
//     res.status(500).json({ error: 'Failed to download video' });
//   }
// });

// const port = process.env.PORT || 5002;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// const express = require('express');
// const ytdl = require("@distube/ytdl-core"); // CommonJS
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// // Function to sanitize file names
// const sanitizeFileName = (name) => {
//   return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
// };

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/download', async (req, res) => {
//   const videoUrl = req.body.url;
//   console.log(`Received request to download video: ${videoUrl}`);

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     console.log('Video info retrieved successfully.');

//     // Filter and select the MP4 format with the highest quality
//     const selectedFormat = ytdl.chooseFormat(info.formats, {
//       quality: 'highestvideo',
//       filter: (format) => format.container === 'mp4' // Ensuring the format is MP4
//     });

//     if (!selectedFormat) {
//       console.error('No suitable MP4 format found for the video.');
//       return res.status(400).json({ error: 'No suitable MP4 format found for the video' });
//     }

//     const downloadsDir = path.join(__dirname, 'downloads');

//     // Ensure the directory exists
//     if (!fs.existsSync(downloadsDir)) {
//       fs.mkdirSync(downloadsDir, { recursive: true });
//       console.log('Downloads directory created.');
//     }

//     // Sanitize the file name and set the extension to .mp4
//     const sanitizedTitle = sanitizeFileName(info.videoDetails.title);
//     const outputFilePath = path.join(downloadsDir, `${sanitizedTitle}.mp4`);
//     console.log(`Saving video as: ${outputFilePath}`);

//     const outputStream = fs.createWriteStream(outputFilePath);

//     // Start downloading the video using the selected MP4 format
//     const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });

//     videoStream.pipe(outputStream);

//     videoStream.on('progress', (chunkLength, downloaded, total) => {
//       const percent = (downloaded / total * 100).toFixed(2);
//       console.log(`Downloading: ${percent}% complete`);
//     });

//     videoStream.on('error', (err) => {
//       console.error('Error in video stream:', err);
//       res.status(500).json({ error: 'Failed to download video' });
//       // Clean up output stream
//       outputStream.destroy();
//       fs.unlink(outputFilePath, () => {}); // Attempt to delete partial file
//     });

//     outputStream.on('finish', () => {
//       console.log(`Video download completed: ${outputFilePath}`);

//       // Send the file path to the frontend
//       res.json({ message: 'Download complete', filePath: outputFilePath });
//     });

//     outputStream.on('error', (err) => {
//       console.error('Error writing video file:', err);
//       res.status(500).json({ error: 'Failed to save video file' });
//     });

//   } catch (error) {
//     console.error('Error downloading video:', error);
//     res.status(500).json({ error: 'Failed to download video' });
//   }
// });

// const port = process.env.PORT || 5002;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



// const express = require('express');
// const ytdl = require("@distube/ytdl-core");
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// // Function to sanitize file names
// const sanitizeFileName = (name) => {
//   return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
// };

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/download', async (req, res) => {
//   const videoUrl = req.body.url;
//   console.log(`Received request to download video: ${videoUrl}`);

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     console.log('Video info retrieved successfully.');

//     // Filter and select the MP4 format with the highest quality
//     const selectedFormat = ytdl.chooseFormat(info.formats, {
//       quality: 'highestvideo',
//       filter: (format) => format.container === 'mp4' // Ensuring the format is MP4
//     });

//     if (!selectedFormat) {
//       console.error('No suitable MP4 format found for the video.');
//       return res.status(400).json({ error: 'No suitable MP4 format found for the video' });
//     }

//     const downloadsDir = path.join(__dirname, 'downloads');

//     // Ensure the directory exists
//     if (!fs.existsSync(downloadsDir)) {
//       fs.mkdirSync(downloadsDir, { recursive: true });
//       console.log('Downloads directory created.');
//     }

//     // Sanitize the file name and set the extension to .mp4
//     const sanitizedTitle = sanitizeFileName(info.videoDetails.title);
//     const outputFilePath = path.join(downloadsDir, `${sanitizedTitle}.mp4`);
//     console.log(`Saving video as: ${outputFilePath}`);

//     const outputStream = fs.createWriteStream(outputFilePath);

//     // Start downloading the video using the selected MP4 format
//     const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });

//     videoStream.pipe(outputStream);

//     videoStream.on('progress', (chunkLength, downloaded, total) => {
//       const percent = (downloaded / total * 100).toFixed(2);
//       console.log(`Downloading: ${percent}% complete`);
//     });

//     videoStream.on('error', (err) => {
//       console.error('Error in video stream:', err);
//       res.status(500).json({ error: 'Failed to download video' });
//       // Clean up output stream
//       outputStream.destroy();
//       fs.unlink(outputFilePath, () => {}); // Attempt to delete partial file
//     });

//     outputStream.on('finish', () => {
//       console.log(`Video download completed: ${outputFilePath}`);
//       // Respond with the file path relative to the server root
//       res.json({ message: 'Download complete', filePath: `downloads/${sanitizedTitle}.mp4` });
//     });

//     outputStream.on('error', (err) => {
//       console.error('Error writing video file:', err);
//       res.status(500).json({ error: 'Failed to save video file' });
//     });

//   } catch (error) {
//     console.error('Error downloading video:', error);
//     res.status(500).json({ error: 'Failed to download video' });
//   }
// });

// // New route to serve the downloaded video file
// app.get('/downloads/:filename', (req, res) => {
//   const filePath = path.join(__dirname, 'downloads', req.params.filename);
//   res.download(filePath, err => {
//     if (err) {
//       console.error('Error sending file:', err);
//       res.status(500).json({ error: 'Failed to send file' });
//     }
//   });
// });

// const port = process.env.PORT || 5002;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


// const express = require('express');
// const ytdl = require("@distube/ytdl-core");
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// // Function to sanitize file names
// const sanitizeFileName = (name) => {
//   return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
// };

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/download', async (req, res) => {
//   const videoUrl = req.body.url;
//   console.log(`Received request to download video: ${videoUrl}`);

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     console.log('Video info retrieved successfully.');

//     // Filter and select the MP4 format with the highest quality
//     const selectedFormat = ytdl.chooseFormat(info.formats, {
//       quality: 'highestvideo',
//       filter: (format) => format.container === 'mp4' // Ensuring the format is MP4
//     });

//     if (!selectedFormat) {
//       console.error('No suitable MP4 format found for the video.');
//       return res.status(400).json({ error: 'No suitable MP4 format found for the video' });
//     }

//     const downloadsDir = path.join(__dirname, 'downloads');

//     // Ensure the directory exists
//     if (!fs.existsSync(downloadsDir)) {
//       fs.mkdirSync(downloadsDir, { recursive: true });
//       console.log('Downloads directory created.');
//     }

//     // Sanitize the file name and set the extension to .mp4
//     const sanitizedTitle = sanitizeFileName(info.videoDetails.title);
//     const outputFilePath = path.join(downloadsDir, `${sanitizedTitle}.mp4`);
//     console.log(`Saving video as: ${outputFilePath}`);

//     const outputStream = fs.createWriteStream(outputFilePath);

//     // Start downloading the video using the selected MP4 format
//     const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });

//     videoStream.pipe(outputStream);

//     videoStream.on('progress', (chunkLength, downloaded, total) => {
//       const percent = (downloaded / total * 100).toFixed(2);
//       console.log(`Downloading: ${percent}% complete`);
//     });

//     videoStream.on('error', (err) => {
//       console.error('Error in video stream:', err);
//       res.status(500).json({ error: 'Failed to download video' });
//       // Clean up output stream
//       outputStream.destroy();
//       fs.unlink(outputFilePath, () => {}); // Attempt to delete partial file
//     });

//     outputStream.on('finish', () => {
//       console.log(`Video download completed: ${outputFilePath}`);
//       // Respond with the file path relative to the server root
//       res.json({ message: 'Download complete', filePath: `downloads/${sanitizedTitle}.mp4` });
//     });

//     outputStream.on('error', (err) => {
//       console.error('Error writing video file:', err);
//       res.status(500).json({ error: 'Failed to save video file' });
//     });

//   } catch (error) {
//     console.error('Error downloading video:', error);
//     res.status(500).json({ error: 'Failed to download video' });
//   }
// });

// // Modified route to serve and delete the downloaded video file
// app.get('/downloads/:filename', (req, res) => {
//   const filePath = path.join(__dirname, 'downloads', req.params.filename);

//   // Send the file to the client
//   res.download(filePath, (err) => {
//     if (err) {
//       console.error('Error sending file:', err);
//       res.status(500).json({ error: 'Failed to send file' });
//     } else {
//       // Delete the file after it has been sent to the client
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           console.error('Error deleting file:', err);
//         } else {
//           console.log('File successfully deleted after download:', filePath);
//         }
//       });
//     }
//   });
// });

// const port = process.env.PORT || 5002;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });




// const express = require('express');
// const ytdl = require('@distube/ytdl-core');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// // Function to sanitize file names
// const sanitizeFileName = (name) => {
//   return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
// };

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post('/download', async (req, res) => {
//   const videoUrl = req.body.url;
//   console.log(`Received request to download video: ${videoUrl}`);

//   try {
//     const info = await ytdl.getInfo(videoUrl);
//     console.log('Video info retrieved successfully.');

//     // Filter and select a format that includes both audio and video
//     const selectedFormat = ytdl.chooseFormat(info.formats, {
//       quality: 'highest',
//       filter: (format) => format.container === 'mp4' && format.hasAudio && format.hasVideo
//     });

//     if (!selectedFormat) {
//       console.error('No suitable MP4 format with both audio and video found.');
//       return res.status(400).json({ error: 'No suitable MP4 format found for the video' });
//     }

//     const downloadsDir = path.join(__dirname, 'downloads');

//     // Ensure the directory exists
//     if (!fs.existsSync(downloadsDir)) {
//       fs.mkdirSync(downloadsDir, { recursive: true });
//       console.log('Downloads directory created.');
//     }

//     // Sanitize the file name and set the extension to .mp4
//     const sanitizedTitle = sanitizeFileName(info.videoDetails.title);
//     const outputFilePath = path.join(downloadsDir, `${sanitizedTitle}.mp4`);
//     console.log(`Saving video as: ${outputFilePath}`);

//     const outputStream = fs.createWriteStream(outputFilePath);

//     // Start downloading the video using the selected MP4 format
//     const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });

//     videoStream.pipe(outputStream);

//     videoStream.on('progress', (chunkLength, downloaded, total) => {
//       const percent = (downloaded / total * 100).toFixed(2);
//       console.log(`Downloading: ${percent}% complete`);
//     });

//     videoStream.on('error', (err) => {
//       console.error('Error in video stream:', err);
//       res.status(500).json({ error: 'Failed to download video' });
//       // Clean up output stream
//       outputStream.destroy();
//       fs.unlink(outputFilePath, () => {}); // Attempt to delete partial file
//     });

//     outputStream.on('finish', () => {
//       console.log(`Video download completed: ${outputFilePath}`);
//       // Respond with the file path relative to the server root
//       res.json({ message: 'Download complete', filePath: `downloads/${sanitizedTitle}.mp4` });
//     });

//     outputStream.on('error', (err) => {
//       console.error('Error writing video file:', err);
//       res.status(500).json({ error: 'Failed to save video file' });
//     });

//   } catch (error) {
//     console.error('Error downloading video:', error);
//     res.status(500).json({ error: 'Failed to download video' });
//   }
// });

// app.get('/downloads/:filename', (req, res) => {
//   const filePath = path.join(__dirname, 'downloads', req.params.filename);

//   // Send the file to the client
//   res.download(filePath, (err) => {
//     if (err) {
//       console.error('Error sending file:', err);
//       res.status(500).json({ error: 'Failed to send file' });
//     } else {
//       // Delete the file after it has been sent to the client
//       fs.unlink(filePath, (err) => {
//         if (err) {
//           console.error('Error deleting file:', err);
//         } else {
//           console.log('File successfully deleted after download:', filePath);
//         }
//       });
//     }
//   });
// });

// const port = process.env.PORT || 5002;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

const express = require('express');
const ytdl = require('@distube/ytdl-core');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process'); // Import child_process to run the Python script

// Function to sanitize file names
const sanitizeFileName = (name) => {
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
};

const app = express();
app.use(cors());
app.use(express.json());

app.post('/download-and-process', async (req, res) => {
  const videoUrl = req.body.url;
  console.log(`Received request to download and process video: ${videoUrl}`);

  try {
    const info = await ytdl.getInfo(videoUrl);
    console.log('Video info retrieved successfully.');

    // Filter and select a format that includes both audio and video
    const selectedFormat = ytdl.chooseFormat(info.formats, {
      quality: 'highest',
      filter: (format) => format.container === 'mp4' && format.hasAudio && format.hasVideo
    });

    if (!selectedFormat) {
      console.error('No suitable MP4 format with both audio and video found.');
      return res.status(400).json({ error: 'No suitable MP4 format found for the video' });
    }

    const downloadsDir = path.join(__dirname, 'downloads');
    const clipsDir = path.join(__dirname, 'clips'); // Directory for clips

    // Ensure the directories exist
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
      console.log('Downloads directory created.');
    }

    if (!fs.existsSync(clipsDir)) {
      fs.mkdirSync(clipsDir, { recursive: true });
      console.log('Clips directory created.');
    }

    // Sanitize the file name and set the extension to .mp4
    const sanitizedTitle = sanitizeFileName(info.videoDetails.title);
    const outputFilePath = path.join(downloadsDir, `${sanitizedTitle}.mp4`);
    console.log(`Saving video as: ${outputFilePath}`);

    const outputStream = fs.createWriteStream(outputFilePath);

    // Start downloading the video using the selected MP4 format
    const videoStream = ytdl.downloadFromInfo(info, { format: selectedFormat });

    videoStream.pipe(outputStream);

    videoStream.on('progress', (chunkLength, downloaded, total) => {
      const percent = (downloaded / total * 100).toFixed(2);
      console.log(`Downloading: ${percent}% complete`);
    });

    videoStream.on('error', (err) => {
      console.error('Error in video stream:', err);
      res.status(500).json({ error: 'Failed to download video' });
      // Clean up output stream
      outputStream.destroy();
      fs.unlink(outputFilePath, () => {}); // Attempt to delete partial file
    });

    outputStream.on('finish', () => {
      console.log(`Video download completed: ${outputFilePath}`);

      // Define the path to the Python executable in the virtual environment
      const pythonExecutable = path.join(__dirname, 'venv', 'bin', 'python3');
      const pythonScriptPath = path.join(__dirname, 'python-scripts', 'process_video.py');

      // Run the Python script to process the video and create clips using the virtual environment's Python interpreter
      exec(`${pythonExecutable} ${pythonScriptPath} ${outputFilePath}`, (err, stdout, stderr) => {
        if (err) {
          console.error('Error processing video with Python script:', err);
          return res.status(500).json({ error: 'Failed to process video' });
        }

        console.log('Python script output:', stdout);
        
        // List all generated clips
        const clips = fs.readdirSync(clipsDir).filter(file => file.endsWith('.mp4')).map(file => `clips/${file}`);
        
        // Send the list of generated clips back to the frontend
        res.json({ message: 'Processing complete', clips: clips });
      });
    });

    outputStream.on('error', (err) => {
      console.error('Error writing video file:', err);
      res.status(500).json({ error: 'Failed to save video file' });
    });

  } catch (error) {
    console.error('Error downloading video:', error);
    res.status(500).json({ error: 'Failed to download video' });
  }
});

// Route to serve the generated clips
app.get('/clips/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'clips', req.params.filename);

  // Send the file to the client
  res.download(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).json({ error: 'Failed to send file' });
    } else {
      // Delete the file after it has been sent to the client
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File successfully deleted after download:', filePath);
        }
      });
    }
  });
});

const port = process.env.PORT || 5002;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
