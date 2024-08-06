const deleteDocument = (docId: string) => {
  window.api.document.delete(docId);
};

export default deleteDocument;
