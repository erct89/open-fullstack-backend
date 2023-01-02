
export const mocks = {
  INITIAL_NOTES: [
    {
      content: 'Http Get is a method',
    },
    {
      content: 'Comprar pan',
    }
  ],
  NEW_NOTE: { content: 'Soy la nueva nota', important: false },
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
    BODY_SUCESS: {
      important: true,
      content: 'Nota modificada con put'
    },
    BODY_ERROR: {
      content: 'Nota modificada con put'
    }
  }
};

export default mocks;
