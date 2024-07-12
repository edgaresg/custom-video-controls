import { MouseEvent, useRef, useState } from 'react'

function formatTime(time: number): string {
  return `${time / 60 < 10 ? Math.floor(time / 60) : Math.floor(time / 60)}:${
    time % 60 < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60)
  }`
}

export default function Index () {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState<boolean>(false)
  const [duration, setDuration] = useState<string>()
  const [currentTime, setCurrentTime] = useState<string>()
  const [progressPercent, setProgressPercent] = useState<number>(0)

  const onTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(formatTime(videoRef.current.currentTime))
      setDuration(formatTime(videoRef.current.duration))
      setProgressPercent((videoRef.current.currentTime * 100) / videoRef.current.duration)
    }
  }

  const handlePlayPauseVideo = () => {
    const video = videoRef.current as HTMLVideoElement
    if (video.paused) {
      video.play()
      setPlaying(true)
    } else {
      video.pause()
      setPlaying(false)
    }
  }
  
  const handleCurrentTime = (e: MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current as HTMLVideoElement
    console.log(e);
  }

  return (
    <main className='max-w-screen-lg mx-auto'>
    <figure className='my-10'>
      <video
        ref={videoRef}
        controls
        onTimeUpdate={onTimeUpdate}
      >
        <source src='https://videos.pexels.com/video-files/5495322/5495322-hd_1920_1080_30fps.mp4' />
      </video>
      <div className='flex gap-5 items-center'>
        {playing
          ? <button onClick={handlePlayPauseVideo}>Pause</button>
          : <button onClick={handlePlayPauseVideo}>Play</button>}
          <div className='w-full h-1 bg-neutral-600/40 relative'>
            <div
              className='bg-neutral-900 absolute left-0 top-0 z-10 h-1 cursor-pointer' 
              style={{ width: `${String(progressPercent)}%` }}
              onClick={handleCurrentTime} 
            />
          </div>
          <span>
          {currentTime}/{duration}
          </span>
      </div>
    </figure>
    </main>
  )
}
