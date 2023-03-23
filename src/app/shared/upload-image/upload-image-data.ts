export interface UploadImageData {
  title: string
  minWidth: number
  aspectRatio: number
  fileName: string
  uploadAction: (imageFile: File) => void
}
