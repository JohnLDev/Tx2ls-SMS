// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useState } from 'react'

import Logo from '../../assets/racoon.png'
import { Border, Button, TermsDiv, Input, Label, Page, Title } from './styles'

import TermsModal from '../../components/TermsModal/Modal'
import { Checkbox } from '@material-ui/core'
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

const EnterpriseRegisterPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enterprise, setEnterprise] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const filevalue = ''
  const { goBack } = useHistory()

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) {
      return
    }
    if (event.target.files.length !== 2) {
      alert('Por favor insira DUAS fotos')
      return
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image)
    })
    setPreviewImages([...previewImages, ...selectedImagesPreview])
  }

  function handleRemoveImage(image: File, index: number): void {
    const newImages = previewImages.slice(index - 1, 1)
    setPreviewImages(newImages)

    const finalImages = images.filter(img => img !== image)

    setImages(finalImages)
  }

  return (
    <Border>
      <Page id='login-page'>
        <div className='image-container'>
          <button onClick={goBack}>
            <FiArrowLeft size={20} color='#363636' />
          </button>
          <h1>* Tx2ls *</h1>
          <h1>Store Management Software</h1>
          <img src={Logo} alt='logo' />
        </div>
        <div className='register'>
          <Title>Junte-se ao nosso time </Title>
          <form action=''>
            <div className='input-block'>
              <div className='input'>
                <Label htmlFor='email'>E-mail:</Label>
              </div>
              <Input
                type='text'
                name='email'
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
                style={{ border: email ? '2px solid #A1E9C5' : '0' }}
              />

              <div className='input'>
                <Label htmlFor='password'>Senha:</Label>
              </div>
              <Input
                type='password'
                name='password'
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                style={{ border: password ? '2px solid #A1E9C5' : '0' }}
              />

              <div className='input'>
                <Label htmlFor='enterprise'>Nome da empresa:</Label>
              </div>
              <Input
                type='text'
                name='enterprise'
                value={enterprise}
                onChange={({ target: { value } }) => setEnterprise(value)}
                style={{ border: enterprise ? '2px solid #A1E9C5' : '0' }}
              />

              <div className='input'>
                <Label htmlFor='whatsapp'>Whatsapp:</Label>
              </div>
              <Input
                type='number'
                name='whatsapp'
                value={whatsapp}
                onChange={({ target: { value } }) => setWhatsapp(value)}
                style={{ border: whatsapp ? '2px solid #A1E9C5' : '0' }}
              />
            </div>
            <div className='input-block'>
              <Label className='labelfotos' htmlFor='images'>
                Fotos: logo pequena , logo grande.
              </Label>

              <div className='images-container'>
                <label htmlFor='image[]' className='new-image'>
                  <FiPlus size={24} color='#ff8c00' />
                </label>
                {images.map((image, index) => {
                  return (
                    <div key={(index as unknown) as string}>
                      <img src={URL.createObjectURL(image)} alt=''></img>
                      <button
                        type='button'
                        className='removeButton'
                        onClick={() => {
                          handleRemoveImage(image, index)
                        }}
                      >
                        <FiX color='#bf4040' size={20} />
                      </button>
                    </div>
                  )
                })}
              </div>
              <input
                type='file'
                multiple
                onChange={handleSelectImages}
                id='image[]'
                value={filevalue} // se der erro é nessa linha
              />
            </div>
          </form>
          <TermsDiv>
            <TermsModal />
            <div className='checkbox-block'>
              <Checkbox color='primary'></Checkbox>
              <Label htmlFor='checkbox'>Aceito os termos</Label>
            </div>
          </TermsDiv>
          <Button type='submit'>
            R{'  '}E{'  '}G{'  '}I{'  '}S{'  '}T{'  '}R{'  '}A{'  '}R
          </Button>
        </div>
      </Page>
    </Border>
  )
}

export default EnterpriseRegisterPage
