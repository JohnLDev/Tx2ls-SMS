// eslint-disable-next-line no-use-before-define
import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { OpenModalButton } from './styles'
import { FiAlertTriangle } from 'react-icons/fi'

interface ModalStyle {
  top: string
  left: string
  transform: string
}

function rand(): number {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle(): ModalStyle {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
)

const TermsModal: React.FC = () => {
  const classes = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)
  const [open, setOpen] = React.useState(false)

  function handleOpen(): void {
    setOpen(true)
  }

  function handleClose(): void {
    setOpen(false)
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id='simple-modal-title'>Termos de uso</h2>
      <p id='simple-modal-description'>
        Eu aceito tudo que fizerem comigo amém.
      </p>
    </div>
  )

  return (
    <div>
      <OpenModalButton type='button' onClick={handleOpen}>
        <FiAlertTriangle size={20} color='#FF4500' />
        Termos de uso
        <FiAlertTriangle size={20} color='#FF4500' />
      </OpenModalButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </div>
  )
}

export default TermsModal
