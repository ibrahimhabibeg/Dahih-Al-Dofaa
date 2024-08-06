const renameDocument = (documentId: string, newName: string) => {
  window.api.document.rename(documentId, newName);
};

export default renameDocument;
