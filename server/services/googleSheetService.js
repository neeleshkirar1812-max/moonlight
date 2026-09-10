import axios from 'axios';

/**
 * Automatically pushes an enquiry to Google Sheet in real-time
 * @param {Object} enquiry - The enquiry document
 * @param {String} [overrideUrl] - Optional specific webhook URL
 */
export const syncEnquiryToGoogleSheet = async (enquiry, overrideUrl = null) => {
  const webhookUrl = overrideUrl || process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    // No sheet webhook configured yet, skip gracefully
    return { success: false, reason: 'No Google Sheet webhook URL configured' };
  }

  try {
    const payload = {
      enquiryId: enquiry.enquiryId || 'ENQ-2026',
      timestamp: new Date(enquiry.createdAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      fullName: enquiry.customerDetails?.fullName || 'Client',
      phone: enquiry.customerDetails?.phone || '',
      email: enquiry.customerDetails?.email || '',
      eventType: enquiry.eventType || 'Wedding',
      eventDate: enquiry.eventDate ? new Date(enquiry.eventDate).toLocaleDateString('en-IN') : 'TBD',
      city: enquiry.location?.city || 'Bhopal',
      guestCount: enquiry.guestCount || 300,
      budgetRange: enquiry.budgetRange || '₹2L–₹5L',
      leadSource: enquiry.leadSource || 'Website',
      status: enquiry.status || 'NEW',
      storyDetails: enquiry.storyDetails || '',
    };

    const response = await axios.post(webhookUrl, payload, {
      timeout: 8000,
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(`[Google Sheet Sync Success] Added enquiry ${enquiry.enquiryId} to Google Sheet.`);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('[Google Sheet Sync Error]:', error.message);
    return { success: false, error: error.message };
  }
};
