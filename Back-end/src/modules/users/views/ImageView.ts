import Image from '../infra/typeorm/entities/Image'

interface IResponse {
  id: number
  path: string
}
export default {
  render(image: Image): IResponse {
    return {
      id: image.id,
      path: `${process.env.API_URL}/uploads/images/${image.path}`,
    }
  },
  renderMany(images: Image[]): IResponse[] {
    return images.map(image => this.render(image))
  },
}
