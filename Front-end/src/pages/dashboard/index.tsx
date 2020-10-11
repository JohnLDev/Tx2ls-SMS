// eslint-disable-next-line no-use-before-define
import React from 'react'
import JsBarcode from 'jsbarcode'
const BarCode: React.FC = () => {
  window.setTimeout(function () {
    JsBarcode('#barcode', 'id')
  }, 0)
  return (
    <>
      <h1>ola</h1>
      <h1>hendriko barcode</h1>
      <img id='barcode' alt='barcode' />
    </>
  )
}
export default BarCode
