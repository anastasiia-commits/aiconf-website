import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { buildConfirmationEmail } from './emailTemplate.ts'

const FROM_EMAIL = 'inquiries@barcelonaconference.ai'
const FROM_NAME = 'BAIC'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { name, country, company, role, email, linkedin, marketing_consent } = await req.json()

    // Validate required fields
    if (!name || !country || !company || !role || !email) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Init Supabase client with service role key
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // Insert registration
    const { error: dbError } = await supabase.from('registrations').insert({
      name,
      country,
      company,
      role,
      email: email.toLowerCase(),
      linkedin: linkedin || '',
      marketing_consent: marketing_consent ?? false,
    })

    if (dbError) {
      // Unique constraint violation on email
      if (dbError.code === '23505') {
        return new Response(
          JSON.stringify({ status: 'duplicate', message: 'This email is already registered.' }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
      }
      throw dbError
    }

    // Send confirmation email via ZeptoMail (best-effort; do not fail registration on error).
    // ZEPTOMAIL_API_KEY secret must hold the full Authorization header value
    // (e.g. "Zoho-enczapikey XXXXX"), not just the raw key.
    const zeptoApiKey = Deno.env.get('ZEPTOMAIL_API_KEY')

    if (!zeptoApiKey) {
      console.error('ZEPTOMAIL_API_KEY not set; skipping confirmation email')
    } else {
      try {
        const { subject, html } = buildConfirmationEmail({
          name,
          role,
          company,
          fromEmail: FROM_EMAIL,
        })

        const emailRes = await fetch('https://api.zeptomail.eu/v1.1/email', {
          method: 'POST',
          headers: {
            'Authorization': zeptoApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: { address: FROM_EMAIL, name: FROM_NAME },
            to: [{ email_address: { address: email, name } }],
            subject,
            htmlbody: html,
          }),
        })

        if (emailRes.ok) {
          const { error: updateErr } = await supabase
            .from('registrations')
            .update({ confirmation_sent: true })
            .eq('email', email.toLowerCase())
          if (updateErr) {
            console.error('Failed to update confirmation_sent flag:', updateErr)
          }
        } else {
          const body = await emailRes.text()
          console.error('ZeptoMail send failed:', emailRes.status, body)
        }
      } catch (emailErr) {
        console.error('Failed to send confirmation email:', emailErr)
      }
    }

    return new Response(
      JSON.stringify({ status: 'success', message: 'Registration successful.' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    console.error('Registration error:', err)
    return new Response(
      JSON.stringify({ error: 'Internal server error.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
