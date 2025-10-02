import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon.jsx';
import Button from '../../../components/ui/Button.jsx';

const VideoPlayer = ({ 
  videoUrl, 
  title, 
  onProgressUpdate, 
  currentProgress = 0,
  onVideoEnd,
  transcriptData = []
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('720p');
  const [showSettings, setShowSettings] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const qualityOptions = ['360p', '480p', '720p', '1080p'];

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video?.currentTime);
      const progress = (video?.currentTime / video?.duration) * 100;
      onProgressUpdate?.(progress);
    };

    const updateDuration = () => setDuration(video?.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onVideoEnd?.();
    };

    video?.addEventListener('timeupdate', updateTime);
    video?.addEventListener('loadedmetadata', updateDuration);
    video?.addEventListener('ended', handleEnded);

    // Set initial progress
    if (currentProgress > 0 && duration > 0) {
      video.currentTime = (currentProgress / 100) * duration;
    }

    return () => {
      video?.removeEventListener('timeupdate', updateTime);
      video?.removeEventListener('loadedmetadata', updateDuration);
      video?.removeEventListener('ended', handleEnded);
    };
  }, [currentProgress, duration, onProgressUpdate, onVideoEnd]);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (isPlaying) {
      video?.pause();
    } else {
      video?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    video.currentTime = pos * duration;
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    const video = videoRef?.current;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const changePlaybackRate = (rate) => {
    const video = videoRef?.current;
    video.playbackRate = rate;
    setPlaybackRate(rate);
    setShowSettings(false);
  };

  const toggleFullscreen = () => {
    const container = videoRef?.current?.parentElement;
    if (!isFullscreen) {
      if (container?.requestFullscreen) {
        container?.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const skipTime = (seconds) => {
    const video = videoRef?.current;
    video.currentTime = Math.max(0, Math.min(duration, video?.currentTime + seconds));
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden relative group">
      {/* Video Element */}
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onMouseMove={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <track kind="captions" src="/captions.vtt" srcLang="en" label="English" />
        </video>

        {/* Loading Overlay */}
        {!duration && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        {/* Play Button Overlay */}
        {!isPlaying && duration > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlay}
              className="w-16 h-16 bg-black/50 hover:bg-black/70 text-white rounded-full"
            >
              <Icon name="Play" size={32} />
            </Button>
          </div>
        )}

        {/* Controls Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
          {/* Progress Bar */}
          <div className="mb-4">
            <div 
              className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-200"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Play/Pause */}
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={20} />
              </Button>

              {/* Skip Buttons */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skipTime(-10)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="RotateCcw" size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => skipTime(10)}
                className="text-white hover:bg-white/20"
              >
                <Icon name="RotateCw" size={18} />
              </Button>

              {/* Volume Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name={isMuted ? "VolumeX" : volume > 0.5 ? "Volume2" : "Volume1"} size={18} />
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/20 rounded-lg appearance-none slider"
                />
              </div>

              {/* Time Display */}
              <span className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Transcript Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTranscript(!showTranscript)}
                className={`text-white hover:bg-white/20 ${showTranscript ? 'bg-white/20' : ''}`}
              >
                <Icon name="FileText" size={18} />
              </Button>

              {/* Settings */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name="Settings" size={18} />
                </Button>

                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-4 min-w-48">
                    {/* Playback Speed */}
                    <div className="mb-4">
                      <p className="text-white text-sm font-medium mb-2">Playback Speed</p>
                      <div className="grid grid-cols-3 gap-2">
                        {playbackSpeeds?.map((speed) => (
                          <Button
                            key={speed}
                            variant="ghost"
                            size="sm"
                            onClick={() => changePlaybackRate(speed)}
                            className={`text-white hover:bg-white/20 ${playbackRate === speed ? 'bg-white/20' : ''}`}
                          >
                            {speed}x
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Quality */}
                    <div>
                      <p className="text-white text-sm font-medium mb-2">Quality</p>
                      <div className="space-y-1">
                        {qualityOptions?.map((q) => (
                          <Button
                            key={q}
                            variant="ghost"
                            size="sm"
                            onClick={() => setQuality(q)}
                            className={`w-full justify-start text-white hover:bg-white/20 ${quality === q ? 'bg-white/20' : ''}`}
                          >
                            {q}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Transcript Panel */}
      {showTranscript && transcriptData?.length > 0 && (
        <div className="bg-card border-t border-border p-4 max-h-48 overflow-y-auto">
          <h4 className="font-heading font-semibold text-foreground mb-3">Transcript</h4>
          <div className="space-y-2">
            {transcriptData?.map((item, index) => (
              <div
                key={index}
                className={`p-2 rounded cursor-pointer transition-colors duration-200 ${
                  currentTime >= item?.start && currentTime <= item?.end
                    ? 'bg-primary/10 border-l-2 border-primary' :'hover:bg-muted'
                }`}
                onClick={() => {
                  const video = videoRef?.current;
                  video.currentTime = item?.start;
                }}
              >
                <span className="text-xs text-muted-foreground font-mono">
                  {formatTime(item?.start)}
                </span>
                <p className="text-sm text-foreground mt-1">{item?.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;