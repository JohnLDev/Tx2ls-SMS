import Image from '../infra/typeorm/entities/Image'

interface IResponse {
  id: number
  path: string
}
export default {
  render(image: Image): IResponse {
    return {
      id: image.id,
      path: `http://localhost:3333/uploads/images/${image.path}`,
    }
  },
  renderMany(images: Image[]): IResponse[] {
    return images.map(image => this.render(image))
  },
}
