const Search = {
  // The styles common to all search input bars
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
  // Sizes
  size: {
    xs: {
      fontSize: '12px',
      lineHeight: '16px',
      padding: '10px, 8px, 10px, 8px'
    },
    sm: {
      fontSize: '14px',
      lineHeight: '20px',
      padding: '10px, 12px, 10px, 12px'
    },
    md: {
      fontSize: '16px',
      lineHeight: '24px',
      padding: '10px, 16px, 10px, 16px'
    },
    lg: {
      fontSize: '18px',
      lineHeight: '28px',
      padding: '10px, 24px, 10px, 24px'
    }
  },
  // Variants
  variant: {
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
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline'
  }
};

export default Search;
