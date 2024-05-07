const Button = {
  // The styles all button have in common

  baseStyle: {
    bg: 'primary.main',
    color: 'white',
    fontSize: '16.2px',
    fontWeight: '1000',
    letterSpacing: '0.75%',
    borderRadius: '6px',
    _hover: {
      bg: 'button.hoverColor',
      _disabled: {
        bg: 'button.hoverColor'
      }
    },
    _active: {
      bg: 'primary.dark'
    }
  },
  // Two sizes: sm and md
  sizes: {
    xs: {
      fontSize: '10.8px',
      lineHeight: '16px',
      padding: '10px, 8px, 10px, 8px'
    },
    sm: {
      fontSize: '12.6px',
      lineHeight: '20px',
      padding: '10px, 12px, 10px, 12px'
    },
    md: {
      fontSize: '14.4px',
      lineHeight: '24px',
      padding: '10px, 16px, 10px, 16px'
    },
    lg: {
      fontSize: '16.2px',
      lineHeight: '28px',
      padding: '10px, 24px, 10px, 24px'
    }
  },
  // Two variants: outline and solid
  variants: {
    base: {},
    primary: {
      bg: 'primary.main',
      borderRadius: '8px',
      boxShadow:
        '-2px -2px 10px 1px rgba(4, 41, 122, 0.1), 2px 2px 10px 1px rgba(4, 41, 122, 0.1)',
      fontWeight: 700,
      color: 'white'
    },
    delete: {
      bg: 'error.dark',
      borderRadius: '8px',
      fontWeight: 700,
      color: 'white',
      _hover: {
        bg: 'error.main',
        _disabled: {
          bg: 'error.main'
        }
      },
      _disabled: {
        bg: 'error.disabledDark'
      },
      _active: {
        bg: 'error.dark'
      }
    },
    outline: {
      border: '1px solid',
      borderColor: 'gray.300',
      bg: '#ffffff'
    },
    outlineSecondary: {
      border: '1px solid',
      borderColor: 'primary.main',
      bg: 'white',
      color: 'black.1000',
      _hover: {
        bg: 'white',
        color: 'black.1000'
      },
      _active: {
        bg: 'white',
        color: 'black.1000'
      }
    },
    outlinePrimary: {
      border: '1px solid',
      borderColor: 'gray.300',
      bg: 'white',
      color: 'black.1000',
      _hover: {
        bg: 'gray.200',
        color: 'black.1000'
      },
      _active: {
        bg: 'white',
        color: 'black.1000'
      }
    },
    menu: {
      bg: 'transparent',
      color: 'black.600',
      fontWeight: '500',
      _hover: {
        bg: 'gray.200'
      },
      _active: {
        bg: 'gray.300'
      }
    },
    menuSolid: {
      bg: 'primary.lighter',
      color: 'primary.main',
      fontWeight: '600',
      _hover: {
        bg: 'primary.lighter',
        color: 'primary.main'
      }
    },
    list: {
      bg: 'transparent',
      color: 'black.600',
      fontWeight: '500',
      height: 'auto',
      borderRadius: 0,
      px: 8,
      py: 1,
      _hover: {
        bg: 'gray.100'
      },
      _active: {
        bg: 'gray.100'
      }
    },
    icon: {
      bg: 'gray.100',
      color: 'gray.800',
      fontWeight: '500',
      _hover: {
        bg: 'gray.200'
      },
      _active: {
        bg: 'gray.300'
      },
      _disabled: {
        bg: 'gray.100'
      }
    },
    text: {
      bg: 'transparent',
      color: 'gray.700',
      fontWeight: '500',
      height: 'auto',
      width: 'auto',
      minWidth: 0,
      p: '2px',
      _hover: {
        bg: 'transparent'
      },
      _active: {
        bg: 'transparent'
      },
      _disabled: {
        bg: 'transparent'
      }
    }
  },
  // The default size and variant values
  defaultProps: {
    size: 'sm',
    variant: 'primary'
  }
};

export default Button;
