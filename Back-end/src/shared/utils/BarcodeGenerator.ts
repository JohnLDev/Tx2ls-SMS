import { v4 } from 'uuid'

function GenerateBarcode(): string {
  const id = v4()
  const [frist, second] = id.split('-')
  const barcode = frist + second
  console.log(barcode)
  return barcode
}

export default GenerateBarcode
