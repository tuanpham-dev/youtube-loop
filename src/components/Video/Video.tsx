import React, { FunctionComponent, useState, useRef, useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { State, Video as TypeVideo } from '../../store/types'
import { Dispatch } from 'redux'
import {
  removeVideo,
  editVideo,
  playVideo,
  playNextVideo,
} from '../../store/actions'
import { SITE_TITLE, YOUTUBE_PLAYER_STATE_PLAYING } from '../../utils/constants'
import YouTube from './YouTube'
import Button from '../Button/Button'
import timeFormat from '../../utils/timeFormat'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import './Video.css'

const mapStateToProps = (state: State) => ({
  videos: state.videos,
  playingVideo: state.playingVideo,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeVideo: (videoId: number) => {
    dispatch(removeVideo(videoId))
  },
  editVideo: (video: TypeVideo) => {
    dispatch(editVideo(video))
  },
  playVideo: (videoId: number) => {
    dispatch(playVideo(videoId))
  },
  playNextVideo: () => {
    dispatch(playNextVideo())
  },
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type VideoProps = PropsFromRedux & {
  video: TypeVideo
}

export const Video: FunctionComponent<VideoProps> = ({
  video,
  videos,
  playingVideo,
  removeVideo,
  editVideo,
  playVideo,
  playNextVideo,
}) => {
  const [player, setPlayer] = useState<any>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [duration, setDuration] = useState(0)
  const [title, setTitle] = useState('')
  const [playingStateChanged, setPlayingStateChanged] = useState(false)

  const canMove = videos.length > 1
  const isPlaying = playingVideo === video.id
  const className = 'video' + (isPlaying ? ' video--active' : '')
  const container = useRef<HTMLDivElement>(null)

  const setVideoVolume = (volume: number | number[]) => {
    if (!Array.isArray(volume)) {
      if (player) {
        player.setVolume(volume)
      }

      editVideo({
        ...video,
        volume,
      })
    }
  }

  const setVideoRange = (range: number | number[]) => {
    if (Array.isArray(range) && range.length >= 2) {
      if (isPlaying && player) {
        const currentTime = player.getCurrentTime()

        if (typeof range[0] === 'number' && range[0] > currentTime) {
          player.seekTo(range[0])
        }
      }

      editVideo({
        ...video,
        start: range[0],
        end: range[1],
      })
    }
  }

  const onVideoLoaded = (player: any) => {
    const duration = player.getDuration()
    setVideoLoaded(false)

    if (!duration) {
      removeVideo(video.id)
    } else {
      setPlayer(player)
      setDuration(duration)
      setTitle(player.getVideoData().title)

      if (video.volume === null || video.start === null || video.end === null) {
        editVideo({
          ...video,
          volume: player.getVolume(),
          start: 0,
          end: duration,
        })

        if (isPlaying) {
          player.setVolume(video.volume)
          player.seekTo(video.start, true)
          player.playVideo()

          document.title = title + ' - ' + SITE_TITLE
        }
      }
    }

    setVideoLoaded(true)
  }

  const onPlaying = () => {
    if (!isPlaying) {
      playVideo(video.id)
    }
  }

  const onEnded = () => {
    playNextVideo()
    setPlayingStateChanged(true)
  }

  const onError = () => {
    removeVideo(video.id)
  }

  const trackStatus = () => {
    if (player) {
      const currentTime = player.getCurrentTime()
      const playerState = player.getPlayerState()
      const volume = player.getVolume()

      if (volume !== video.volume) {
        setVideoVolume(volume)
      }

      if (
        typeof video.end === 'number' &&
        playerState === YOUTUBE_PLAYER_STATE_PLAYING &&
        currentTime > video.end
      ) {
        onEnded()
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(trackStatus, 500)

    return () => clearInterval(interval)
  })

  useEffect(() => {
    setPlayingStateChanged(true)

    return () => setPlayingStateChanged(false)
  }, [isPlaying])

  useEffect(() => {
    if (player && playingStateChanged) {
      setPlayingStateChanged(false)

      if (isPlaying) {
        player.setVolume(video.volume)
        player.seekTo(video.start, true)
        player.playVideo()

        document.title = title + ' - ' + SITE_TITLE

        if (container.current !== null) {
          container.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      } else {
        player.pauseVideo()
        document.title = SITE_TITLE
      }
    }
  }, [
    player,
    isPlaying,
    title,
    playingStateChanged,
    video.volume,
    video.start,
    video.end,
  ])

  return (
    <div ref={container} className={className}>
      <div className="video__player">
        <YouTube
          youtubeId={video.youtubeId}
          onReady={onVideoLoaded}
          onPlaying={onPlaying}
          onEnded={onEnded}
          onError={onError}
        />
      </div>

      {videoLoaded && (
        <>
          <Slider
            className="video__volume-slider"
            vertical={true}
            value={Number(video.volume)}
            onChange={setVideoVolume}
          />
          <Slider
            range
            className="video__range-slider"
            max={duration}
            value={[Number(video.start), Number(video.end)]}
            onChange={setVideoRange}
          />
          <div className="video__info">{`Volume: ${
            video.volume
          } — Range: ${timeFormat(Number(video.start))} → ${timeFormat(
            Number(video.end)
          )}`}</div>
        </>
      )}

      <div className="video__buttons">
        {canMove && <Button className="video__move-handle">Move</Button>}
        <Button color="red" onClick={() => removeVideo(video.id)}>
          Remove Video
        </Button>
      </div>
    </div>
  )
}

export default connector(Video)
