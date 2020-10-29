import multer from 'multer'
import path from 'path'
import crypto from 'crypto'

const tmpFolder = path.resolve(__dirname, '..', 'upload', 'images')
export default {
  directory: tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(6).toString('hex')
      const filename = `${fileHash}-${file.originalname.replace(' ', '_')}`

      return callback(null, filename)
    },
  }),
}
