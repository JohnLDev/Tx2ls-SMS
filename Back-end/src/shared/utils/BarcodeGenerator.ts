import { v4 } from 'uuid'

function GenerateBarcode(): string {
  const id = v4()
  const [frist, second] = id.split('-')
  const barcode = frist + second

  return barcode
}

export default GenerateBarcode
