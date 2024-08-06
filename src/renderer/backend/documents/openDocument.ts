const openDocument = (documentId: string) => {
  window.api.document.open(documentId);
};

export default openDocument;
