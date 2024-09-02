// import { useState } from 'react';

// function App() {
//   const [url, setUrl] = useState('');

//   const handleDownload = async () => {
//     try {
//       const response = await fetch('http://localhost:5002/download', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ url }),
//       });

//       if (response.ok) {
//         const blob = await response.blob();
//         const downloadUrl = window.URL.createObjectURL(new Blob([blob]));
//         const link = document.createElement('a');
//         link.href = downloadUrl;
//         link.setAttribute('download', 'video.mp4');
//         document.body.appendChild(link);
//         link.click();
//         link.parentNode.removeChild(link);
//       } else {
//         alert('Failed to download video');
//       }
//     } catch (error) {
//       console.error('Error downloading the video:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
//         <input
//           type="text"
//           placeholder="Enter YT Link"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           className="w-full px-6 py-4 mb-6 text-lg text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
//         />
//         <button
//           onClick={handleDownload}
//           className="w-full px-6 py-4 font-semibold text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
//         >
//           Download Video
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;
import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5002/download-and-process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        // Get the list of clip paths from the backend response
        const { clips } = await response.json();

        // Sequentially download each clip
        for (const clip of clips) {
          await downloadClip(clip);
        }

        alert('All clips have been downloaded successfully.');
      } else {
        alert('Failed to download and process video.');
      }
    } catch (error) {
      console.error('Error downloading and processing the video:', error);
      alert('An error occurred while downloading the video.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadClip = async (clipPath) => {
    try {
      const videoResponse = await fetch(`http://localhost:5002/${clipPath}`);
      const videoBlob = await videoResponse.blob();

      // Create a download link and trigger download
      const downloadUrl = window.URL.createObjectURL(videoBlob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', clipPath.split('/').pop()); // Set the filename from the clip path
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading clip:', error);
      alert('An error occurred while downloading a clip.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <input
          type="text"
          placeholder="Enter YT Link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-6 py-4 mb-6 text-lg text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleDownload}
          className="w-full px-6 py-4 font-semibold text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Download All Clips'}
        </button>
      </div>
    </div>
  );
}

export default App;
