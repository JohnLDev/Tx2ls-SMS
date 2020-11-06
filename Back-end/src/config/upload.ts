import multer from 'multer'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', 'upload', 'images')
export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const filename = `${file.originalname.replace(' ', '_')}`

      return callback(null, filename)
    },
  }),
}
