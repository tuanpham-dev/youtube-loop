export type Video = {
  id: number
  youtubeId: string
  volume: number | null
  start: number | null
  end: number | null
}

export type State = {
  videos: Video[]
  playingVideo: number | null
  isPaused: boolean | false
}

export const ADD_VIDEO_BY_YOUTUBE_ID = 'ADD_VIDEO_BY_YOUTUBE_ID'
export const ADD_VIDEO = 'ADD_VIDEO'
export const REMOVE_VIDEO = 'REMOVE_VIDEO'
export const EDIT_VIDEO = 'EDIT_VIDEO'
export const PLAY_VIDEO = 'PLAY_VIDEO'
export const UNPAUSE_OR_PLAY_FIRST_VIDEO = 'UNPAUSE_OR_PLAY_FIRST_VIDEO'
export const PLAY_NEXT_VIDEO = 'PLAY_NEXT_VIDEO'
export const PLAY_PREVIOUS_VIDEO = 'PLAY_PREVIOUS_VIDEO'
export const PAUSE_VIDEO = 'PAUSE_VIDEO'
export const UPDATE_VIDEOS = 'UPDATE_VIDEOS'
export const SHUFFLE_VIDEOS = 'SHUFFLE_VIDEOS'

interface addVideoByYouTubeIdAction {
  type: typeof ADD_VIDEO_BY_YOUTUBE_ID
  payload: string
}

interface addVideoAction {
  type: typeof ADD_VIDEO
  payload: Video
}

interface removeVideoAction {
  type: typeof REMOVE_VIDEO
  payload: number
}

interface editVideoAction {
  type: typeof EDIT_VIDEO
  payload: Video
}

interface updateVideosAction {
  type: typeof UPDATE_VIDEOS
  payload: Video[]
}

interface playVideoAction {
  type: typeof PLAY_VIDEO
  payload: number
}

interface unpauseOrPlayFirstVideoAction {
  type: typeof UNPAUSE_OR_PLAY_FIRST_VIDEO
}

interface playPreviousVideoAction {
  type: typeof PLAY_PREVIOUS_VIDEO
}

interface playNextVideoAction {
  type: typeof PLAY_NEXT_VIDEO
}

interface stopVideoAction {
  type: typeof PLAY_VIDEO
  payload: null
}

interface pauseVideoAction {
  type: typeof PAUSE_VIDEO
  payload: null
}

interface shuffleVideosAction {
  type: typeof SHUFFLE_VIDEOS
  payload: null
}

type ActionByType<T extends ActionType['type'], A = ActionType> = A extends {
  type: T
}
  ? A
  : never

export type ActionType =
  | addVideoByYouTubeIdAction
  | addVideoAction
  | removeVideoAction
  | editVideoAction
  | updateVideosAction
  | playVideoAction
  | unpauseOrPlayFirstVideoAction
  | playPreviousVideoAction
  | playNextVideoAction
  | stopVideoAction
  | pauseVideoAction
  | shuffleVideosAction

export type ReducerHandler<T extends ActionType['type']> = (
  state: State,
  action: ActionByType<T>
) => State

export type ReducerMap = {
  [T in ActionType['type']]?: ReducerHandler<T>
}
