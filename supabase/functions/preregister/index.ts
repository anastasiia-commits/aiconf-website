import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    // TODO: Uncomment to enable confirmation emails via ZeptoMail
    // Requires ZEPTOMAIL_API_KEY and ZEPTOMAIL_FROM_EMAIL secrets in Supabase
    // See plan Step 8 for setup instructions
    //
    // const zeptoApiKey = Deno.env.get('ZEPTOMAIL_API_KEY')
    // const fromEmail = Deno.env.get('ZEPTOMAIL_FROM_EMAIL') || 'support@barcelonaconference.ai'
    //
    // if (zeptoApiKey) {
    //   try {
    //     const emailRes = await fetch('https://api.zeptomail.com/v1.1/email', {
    //       method: 'POST',
    //       headers: {
    //         'Authorization': `Zoho-enczapikey ${zeptoApiKey}`,
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         from: { address: fromEmail, name: 'BAIC' },
    //         to: [{ email_address: { address: email, name } }],
    //         subject: "You're pre-registered for BAIC 2026!",
    //         htmlbody: `
    //           <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
    //             <h1 style="font-size: 24px; color: #1a1a2e;">You're on the list!</h1>
    //             <p style="font-size: 16px; color: #444; line-height: 1.6;">
    //               Hi ${name},<br><br>
    //               Thank you for pre-registering for the <strong>Barcelona Applied Intelligence Conference 2026</strong>.
    //               We'll notify you as soon as tickets go on sale.
    //             </p>
    //             <div style="background: #f5f0ff; border-radius: 12px; padding: 20px; margin: 24px 0;">
    //               <p style="margin: 0; font-size: 14px; color: #555;">
    //                 <strong>Date:</strong> September 12, 2026<br>
    //                 <strong>Location:</strong> Barcelona, Spain<br>
    //                 <strong>Registered as:</strong> ${name}, ${role} at ${company}
    //               </p>
    //             </div>
    //             <p style="font-size: 14px; color: #888;">
    //               If you have any questions, reply to this email or reach out at ${fromEmail}.
    //             </p>
    //             <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
    //             <p style="font-size: 12px; color: #aaa;">
    //               Barcelona Applied Intelligence Conference &middot; BAIC 2026
    //             </p>
    //           </div>
    //         `,
    //       }),
    //     })
    //
    //     if (emailRes.ok) {
    //       await supabase
    //         .from('registrations')
    //         .update({ confirmation_sent: true })
    //         .eq('email', email.toLowerCase())
    //     }
    //   } catch (emailErr) {
    //     console.error('Failed to send confirmation email:', emailErr)
    //   }
    // }

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
