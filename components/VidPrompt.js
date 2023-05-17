import React, { useCallback, useEffect, useState } from "react";
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
          className="border-dashed border-2 border-red from-purple-400 py-32 px-32 flex flex-col justify-center items-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the videos here ...</p>
          ) : (
            <p>Drag n drop some videos here, or click to select videos</p>
          )}
        </div>
      )}
      <div className="flex flex-row">
        {videos?.map((video, i) => (
          <div key={i}>
            <video src={video.preview} controls width="500" />
          </div>
        ))}
      </div>
      <div className="flex flex-row">
        {frames.map((frame, i) => (
          <div key={i}>
            <img src={frame} alt={`Frame ${i}`} />
          </div>
        ))}
      </div>
    </>
  );
};

export default VidPrompt;
