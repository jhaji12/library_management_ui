const Checkbox = {
  parts: ['control', 'icon', 'label'],

  baseStyle: {
    icon: {
      fontSize: '10px'
    },
    control: {
      borderColor: 'primary.main',
      color: 'primary.main',
      border: '1px solid',
      bg: 'inherit',
      size: '10px',
      borderRadius: '2px',
      transitionProperty: 'dissolve',
      transitionDuration: '300ms',
      _checked: {
        bg: 'primary.main',
        icon: {
          color: 'white'
        },
        borderColor: 'primary.main',
        _disabled: {
          bg: 'gray.200',
          color: 'gray.500'
        }
      },
      _disabled: {
        borderColor: 'gray.200',
        color: 'gray.200',
        border: '2px solid',
        bg: 'gray.200'
      },
      _invalid: {
        border: '2px solid #FF4842'
      }
    },
    label: {
      display: 'flex',
      alignItems: 'center'
    }
  },

  defaultProps: {
    // Reset props
    variant: 'null',
    size: 'sm'
  }
};

export default Checkbox;
