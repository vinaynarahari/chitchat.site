import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { emails, group_id } = req.body;
  if (!Array.isArray(emails) || emails.length !== 5 || !group_id) {
    return res.status(400).json({ error: 'Must provide 5 emails and a group_id' });
  }
  // Ensure all emails are unique and valid
  const uniqueEmails = [...new Set(emails.map(e => e.trim().toLowerCase()))];
  if (uniqueEmails.length !== 5 || uniqueEmails.some(e => !e.includes('@'))) {
    return res.status(400).json({ error: 'Emails must be unique and valid' });
  }

  // Insert each email with the same group_id
  const { data, error } = await supabase
    .from('beta_signups')
    .insert(uniqueEmails.map(email => ({ email, group_id })));

  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ success: true });
} 