// Optimized database service for form draft management
class OptimizedSupabaseDatabase {
  // Form draft management using localStorage
  getFormDraft(formType) {
    try {
      const draft = localStorage.getItem(`formDraft_${formType}`);
      return draft ? JSON.parse(draft) : null;
    } catch (error) {
      console.error('Error getting form draft:', error);
      return null;
    }
  }

  saveFormDraft(formType, formData) {
    try {
      localStorage.setItem(`formDraft_${formType}`, JSON.stringify(formData));
    } catch (error) {
      console.error('Error saving form draft:', error);
    }
  }

  clearFormDraft(formType) {
    try {
      localStorage.removeItem(`formDraft_${formType}`);
    } catch (error) {
      console.error('Error clearing form draft:', error);
    }
  }
}

export default new OptimizedSupabaseDatabase();