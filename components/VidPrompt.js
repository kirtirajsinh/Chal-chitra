import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({
  corePath:
    "https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
  log: true,
});
const VidPrompt = () => {
  const [videos, setVideos] = useState(null);
  const [frames, setFrames] = useState([]);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const promptRef = useRef();
  const seedRef = useRef();

  const onDrop = useCallback((acceptedFiles) => {
    setVideos(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  useEffect(() => {
    (async () => {
      await ffmpeg.load();
      setReady(true);
    })();
  }, []);

  useEffect(() => {
    return () => {
      videos?.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [videos]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const extractFrames = async (file) => {
    ffmpeg.FS("writeFile", "test.mp4", await fetchFile(file));
    await ffmpeg.run("-i", "test.mp4", "-vf", "fps=1", "out%d.png");
    const data = ffmpeg
      .FS("readdir", "/")
      .filter((item) => item.includes(".png"));
    setFrames(
      data.map((image) => {
        const data = ffmpeg.FS("readFile", image);
        const url = URL.createObjectURL(
          new Blob([data.buffer], { type: "image/png" })
        );
        return url;
      })
    );
  };

  useEffect(() => {
    if (ready && videos) {
      extractFrames(videos[0]);
    }
  }, [videos, ready]);

  return (
    <>
      {!videos && (
        <div
          {...getRootProps()}
          className="border-dashed border-2  border-[#8294C4]  py-32 px-32 flex flex-col justify-center items-center ml-64"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the videos here ...</p>
          ) : (
            <p>Drag n drop some videos here, or click to select videos</p>
          )}
        </div>
      )}
      <div className="flex flex-row items-center justify-center ml-64">
        {videos?.map((video, i) => (
          <div key={i}>
            <video src={video.preview} controls width="500" />
          </div>
        ))}
      </div>
      <div className="flex flex-row w-[600px] overflow-x-auto ml-64">
        {frames.map((frame, i) => (
          <div key={i}>
            <img src={frame} alt={`Frame ${i}`} />
          </div>
        ))}
      </div>
      <div
        className="flex flex-row items-center justify-center  w-full  sm:w-5/6 rounded-xl  p-1 text-black mt-12 ml-64
"
      >
        <div className=" flex flex-row items-center justify-center space-x-4 w-full  mr-2 ">
          <textarea
            type="text"
            ref={promptRef}
            className={`flex flex-row items-center w-full sm:py-4 no-scrollbar   text-base sm:text-[18px] py-2 px-4 rounded-xl font-medium  
          }`}
            // call a function on enter key press
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                // guesswithoutImage(e);
              }
            }}
            placeholder="Enter words to see magic in action..."
            onInput={(e) => {
              if (e.target.value.trim() === "") {
                setFocused(false);
              }
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            disabled={loading}
            rows={1}
            style={{ resize: "none" }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <input
            type="text"
            ref={seedRef}
            disabled={loading}
            className="  sm:py-4 px-2 w-32 rounded-xl font-medium "
            placeholder="Seed"
          ></input>
        </div>
        <div
          className="self-end p-1 flex flex-row space-x-1"
          //   onClick={guesswithoutImage}
        >
          {!loading && (
            <svg
              width="40"
              height="40"
              viewBox="0 0 93 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=" cursor-pointer text-[#ACB1D6]"
            >
              <path
                d="M39.1763 48.3437L53.0488 35.6292M28.675 22.3833L61.5738 12.3604C76.3375 7.8625 84.3588 15.2292 79.4763 28.7229L68.51 58.7917C61.1475 79.0146 49.0575 79.0146 41.695 58.7917L38.44 49.8667L28.675 46.8917C6.54876 40.1625 6.54876 29.1479 28.675 22.3833Z"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {/* {loading && <CircularProgress className="w-4 h-4" />} */}
        </div>
      </div>
    </>
  );
};

export default VidPrompt;
