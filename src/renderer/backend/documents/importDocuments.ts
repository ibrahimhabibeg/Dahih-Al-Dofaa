const importDocuments = (courseId: string) => {
  window.api.document.import(courseId);
};

export default importDocuments;
