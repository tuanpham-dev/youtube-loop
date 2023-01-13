import React, { FunctionComponent, KeyboardEvent, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { State } from '../../store/types'
import Button from '../Button/Button'
import {
  addVideoByYouTubeId,
  stopVideo,
  playNextVideo,
  playPreviousVideo,
  unpauseOrPlayFirstVideo,
  shuffleVideos,
} from '../../store/actions'
import { Dispatch } from 'redux'
import './Header.css'

const mapStateToProps = (state: State) => ({
  videos: state.videos,
  playingVideo: state.playingVideo,
  isPaused: state.isPaused
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addVideo: (input: string) => {
    dispatch(addVideoByYouTubeId(input))
  },
  onPlayButtonClick: () => {
    dispatch(unpauseOrPlayFirstVideo())
  },
  onStopButtonClick: () => {
    dispatch(stopVideo())
  },
  onNextButtonClick: () => {
    dispatch(playNextVideo())
  },
  onPreviousButtonClick: () => {
    dispatch(playPreviousVideo())
  },
  onShuffleButtonClick: () => {
    dispatch(shuffleVideos())
  }
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>
type HeaderProps = PropsFromRedux

export const Header: FunctionComponent<HeaderProps> = ({
  videos,
  playingVideo,
  isPaused,
  addVideo,
  onPlayButtonClick,
  onStopButtonClick,
  onShuffleButtonClick,
  onPreviousButtonClick,
  onNextButtonClick,
}) => {
  const [input, setInput] = useState('')

  const videosCount = videos.length
  const isPlaying = playingVideo !== null
  const canPlayPrevNext = isPlaying && videosCount > 1

  const addVideoIfEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      addVideo(input)
    }
  }

  return (
    <header className="header">
      <div className="container">
        <a href="/" className="header__logo">
          YouTube Loop
        </a>

        {videosCount > 0 && (
          <div className="header__controls">
            {isPlaying && !isPaused ? (
              <Button onClick={onStopButtonClick}>Stop</Button>
            ) : (
              <Button onClick={onPlayButtonClick}>{isPaused ? 'Resume' : 'Play'}</Button>
            )}

            {canPlayPrevNext ? (
              <>
                <Button onClick={onPreviousButtonClick}>Previous</Button>
                <Button onClick={onNextButtonClick}>Next</Button>
              </>
            ) : (
              <Button onClick={onShuffleButtonClick}>Shuffle</Button>
            )}
          </div>
        )}

        <div className="header__input-group">
          <input
            type="text"
            className="header__input"
            placeholder="Enter YouTube URL or Video ID"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyUp={addVideoIfEnter}
          />
          <div className="header__input-group-append">
            <Button color="blue" onClick={() => addVideo(input)}>
              Go Loop!
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default connector(Header)
