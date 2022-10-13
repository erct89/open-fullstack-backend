
export const mocks = {
  INITIAL_NOTES: [
    {
      content: 'Http Get is a method',
    },
    {
      content: 'Comprar pan',
    }
  ],
  NEW_NOTE: { content: 'Soy la nueva nota' },
  FAKE_NOTE: { content: 'Fake note' },
  PATCH: {
    BODY_DELETE: {
      delete: true
    },
    BODY_IMPORTANT: {
      important: true
    },
    BODY_CONTENT: {
      content: 'Nota modificada con patch'
    }
  },
  PUT: {
    BODY_SUCCESS: {
      content: 'Put content sample',
      important: true
    },
    BODY_ERROR: {
      content: 'Put content sample'
    }
  }
};

export default mocks;
