const Radio = {
  parts: ['control'],

  baseStyle: {
    control: {
      borderColor: 'gray.100',
      color: 'primary.main',
      //   border: '1px solid',
      bg: 'inherit',
      //   borderRadius: '2px',
      transitionProperty: 'dissolve',
      transitionDuration: '300ms',
      _checked: {
        borderColor: 'primary.main',
        bg: 'primary.main',
        icon: {
          color: 'white'
        },
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
    }
  },

  defaultProps: {
    // Reset props
    variant: 'null',
    size: 'sm'
  }
};

export default Radio;
