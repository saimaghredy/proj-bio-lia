import { supabase } from '../config/supabase';

class ApiService {
  // Save farmer inquiry form
  async saveFarmerInquiry(formData) {
    const { data, error } = await supabase
      .from('farmer_inquiries')
      .insert([{
        full_name: formData.fullName,
        mobile: formData.mobile,
        whatsapp: formData.whatsapp || formData.mobile,
        email: formData.email || '',
        state: formData.state,
        district: formData.district || '',
        village: formData.village || '',
        farm_size: formData.farmSize || null,
        farming_type: formData.farmingType,
        crops_grown: formData.cropsGrown,
        soil_type: formData.soilType || '',
        purpose_of_visit: formData.purposeOfVisit,
        other_purpose: formData.otherPurpose || '',
        crop_issues: formData.cropIssues || '',
        communication_mode: formData.communicationMode,
        mobile_verified: true,
        status: 'new',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Save contact form
  async saveContact(formData) {
    const { data, error } = await supabase
      .from('contact_forms')
      .insert([{
        name: formData.name,
        email: formData.email,
        company: formData.company || '',
        message: formData.message,
        status: 'new',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}

export default new ApiService();