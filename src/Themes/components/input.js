const Input = {
  baseStyle: {
    field: {
      width: '100%',
      minWidth: 0,
      outline: 0,
      bg: 'white',
      position: 'relative',
      border: '1px solid',
      borderRadius: '6px',
      borderColor: 'gray.200',
      _focusVisible: {
        borderColor: 'primary.light'
      }
    }
  },
  variants: {
    outline: {
      field: {
        bg: 'white'
      }
    },
    filled: {
      field: {
        bg: 'gray.100',
        _focusVisible: {
          bg: 'gray.100'
        }
      }
    }
  },
  defaultProps: {
    size: 'md',
    variant: 'filled'
  }
};

export default Input;
