// eslint-disable-next-line no-use-before-define
import React, { ChangeEvent, useState } from 'react'

import Logo from '../../assets/racoon.png'
import { Border, Button, TermsDiv, Input, Label, Page, Title } from './styles'
import api from '../../services/apiClient'
import * as yup from 'yup'
import TermsModal from '../../components/TermsModal/Modal'
import { Checkbox } from '@material-ui/core'
import { FiArrowLeft, FiPlus, FiX } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { Form } from '@unform/web'
import { toast } from 'react-toastify'
import handleTelefone from '../../utils/NumberMask'

const EnterpriseRegisterPage: React.FC = () => {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enterprise, setEnterprise] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [checkbox, setCheckbox] = useState(false)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const filevalue = ''
  const { goBack, push } = useHistory()
  async function HandleSubmit(): Promise<void> {
    const unformatedWhats= whatsapp.replace('-','').replace('(','').replace(')','').replace(' ','').replace(' ','')
    setEmail(email.toLowerCase())
    const testData = {
      nome,
      email,
      password,
      enterprise,
      whatsapp: unformatedWhats,
      images,
    }
    const schema = yup.object().shape({
      nome: yup.string().required('Informe um Nome'),
      email: yup
        .string()
        .email('Insira um email válido')
        .required('Insira um email'),
      password: yup
        .string()
        .min(6, 'Senha precisa ter no minimo 6 digitos')
        .required('Insira uma senha'),
      enterprise: yup.string().required('Insira o nome da sua empresa'),
      whatsapp: yup.string().required('Informe o numero do seu whatsapp'),
    })

    try {
      await schema.validate(testData)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.map(error => toast.error(error, {}))
      }
      return
    }

    if (images.length !== 2) {
      toast.error('Por favor insira DUAS fotos')
      return
    }

    const data = new FormData()
    data.append('name', nome)
    data.append('email', email)
    data.append('password', password)
    data.append('enterprise_Name', enterprise)
    data.append('whatsapp', unformatedWhats)
    images.forEach(image => {
      data.append('images', image)
    })

    try {
      if (checkbox) {
        await api.post('/user/signup', data)
      } else {
        toast.warn('Você precisa aceitar os termos')
        return
      }
    } catch (error) {
      const {
        data: { message },
      } = error.response
      toast.error(message)
      return
    }
    toast.success('Registrado com suceso!')
    toast.warn('Você precisa verificar seu email!')
    push('/')
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>): void {
    if (!event.target.files) {
      return
    }

    const selectedImages = Array.from(event.target.files)
    let errorInTypeImage = false

    selectedImages.forEach(image => {
      if (
        image.type !== 'image/jpg' &&
        image.type !== 'image/jpeg' &&
        image.type !== 'image/png'
      ) {
        errorInTypeImage = true
      }
    })
    if (errorInTypeImage) {
      toast.error('Por favor insira apenas imagens no formato jpg ou png')
      return
    }
    if (images.length + event.target.files.length > 2) {
      toast.error('Você pode apenas adicionar duas imagens')
      return
    }
    setImages([...images, ...selectedImages])

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
          <Form onSubmit={HandleSubmit} action='' id='form'>
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
                <Label htmlFor='enterprise'>Nome:</Label>
              </div>
              <Input
                type='text'
                name='enterprise'
                value={nome}
                onChange={({ target: { value } }) => setNome(value)}
                style={{ border: nome ? '2px solid #A1E9C5' : '0' }}
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
                type='text'
                name='whatsapp'
                value={whatsapp}
                maxLength={16}
                onChange={({ target: { value } }) =>
                  setWhatsapp(handleTelefone(value))
                }
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
          </Form>
          <TermsDiv>
            <TermsModal />
            <div className='checkbox-block'>
              <Checkbox
                color='primary'
                value={checkbox}
                onChange={({ target: { checked } }) => setCheckbox(checked)}
              ></Checkbox>
              <Label htmlFor='checkbox'>Aceito os termos</Label>
            </div>
          </TermsDiv>
          <Button type='submit' form='form'>
            R{'  '}E{'  '}G{'  '}I{'  '}S{'  '}T{'  '}R{'  '}A{'  '}R
          </Button>
        </div>
      </Page>
    </Border>
  )
}

export default EnterpriseRegisterPage
