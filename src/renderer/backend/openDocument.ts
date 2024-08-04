const openDocument = (courseId: string, documentId: string) => {
  window.api.document.open(courseId, documentId);
};

export default openDocument;
