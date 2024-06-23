import { create } from 'zustand'

type Message = string
export type OpenDialogType = (message: string) => void

export type UseGlobalDialogStoreState = {
  open: boolean
  message: Message
  openDialog: OpenDialogType
  closeDialog: () => void
}

type State = {
  open: boolean
  message: Message
  openDialog: OpenDialogType
  closeDialog: () => void
}

export const useGlobalDialogStore = create<UseGlobalDialogStoreState>((set): State => {
  return {
    open: false,
    message: '',
    openDialog: (message: Message) => {
      return set({
        message,
        open: true,
      })
    },
    closeDialog: () => {
      return set({
        open: false,
      })
    },
  }
})
