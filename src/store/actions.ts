import {
  Video,
  ActionType,
  ADD_VIDEO_BY_YOUTUBE_ID,
  ADD_VIDEO,
  REMOVE_VIDEO,
  EDIT_VIDEO,
  UPDATE_VIDEOS,
  PLAY_VIDEO,
  PLAY_PREVIOUS_VIDEO,
  PLAY_NEXT_VIDEO,
  PLAY_FIRST_VIDEO,
} from './types'
import getYouTubeVideoId from '../utils/getYouTubeVideoId'

export const addVideoByYouTubeId = (youtubeId: string): ActionType => {
  const youtubeVideoId = getYouTubeVideoId(youtubeId)

  return {
    type: ADD_VIDEO_BY_YOUTUBE_ID,
    payload: youtubeVideoId,
  }
}

export const addVideo = (video: Video): ActionType => ({
  type: ADD_VIDEO,
  payload: video,
})

export const removeVideo = (videoId: number): ActionType => ({
  type: REMOVE_VIDEO,
  payload: videoId,
})

export const editVideo = (video: Video): ActionType => ({
  type: EDIT_VIDEO,
  payload: video,
})

export const updateVideos = (videos: Video[]): ActionType => ({
  type: UPDATE_VIDEOS,
  payload: videos,
})

export const playVideo = (videoId: number): ActionType => ({
  type: PLAY_VIDEO,
  payload: videoId,
})

export const playFirstVideo = (): ActionType => ({
  type: PLAY_FIRST_VIDEO,
})

export const playPreviousVideo = (): ActionType => ({
  type: PLAY_PREVIOUS_VIDEO,
})

export const playNextVideo = (): ActionType => ({
  type: PLAY_NEXT_VIDEO,
})

export const stopVideo = (): ActionType => ({
  type: PLAY_VIDEO,
  payload: null,
})
