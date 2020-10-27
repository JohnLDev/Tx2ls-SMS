import fs from 'fs'
import path from 'path'

interface IImage {
  id?: number
  path: string
}

function deleteImage(images: IImage[]): void {
  images.forEach(image => {
    fs.unlink(
      path.resolve(__dirname, '..', '..', 'upload', 'images', image.path),
      err => {
        if (err) {
          console.log(err)
        }
      },
    )
  })
}

function renameImage(enterprise_Name: string, images: IImage[]): IImage[] {
  images.forEach(image => {
    fs.rename(
      path.resolve(__dirname, '..', '..', 'upload', 'images', image.path),
      path.resolve(
        __dirname,
        '..',
        '..',
        'upload',
        'images',
        enterprise_Name.replace(' ', '_') + image.path,
      ),
      err => {
        if (err) {
          console.log(err)
        }
      },
    )
    image.path = enterprise_Name.replace(' ', '_') + image.path
  })
  return images
}

export default { deleteImage, renameImage }
