export interface UploadImageData {
  title: string
  minWidth: number
  aspectRatio: number
  uploadAction: (imageFile: File) => void
}
