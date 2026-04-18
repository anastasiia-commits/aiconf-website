export interface ConfirmationEmailInput {
  name: string
  role: string
  company: string
  fromEmail: string
}

export interface ConfirmationEmail {
  subject: string
  html: string
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!
  ))

export function buildConfirmationEmail(
  { name, role, company, fromEmail }: ConfirmationEmailInput,
): ConfirmationEmail {
  const safeName = escapeHtml(name)
  const safeRole = escapeHtml(role)
  const safeCompany = escapeHtml(company)
  const safeFrom = escapeHtml(fromEmail)

  return {
    subject: "You're pre-registered for BAIC 2026!",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; color: #1a1a2e;">You're on the list!</h1>
        <p style="font-size: 16px; color: #444; line-height: 1.6;">
          Hi ${safeName},<br><br>
          Thank you for pre-registering for the <strong>Barcelona Applied Intelligence Conference 2026</strong>.
          We'll notify you as soon as tickets go on sale.
        </p>
        <div style="background: #f5f0ff; border-radius: 12px; padding: 20px; margin: 24px 0;">
          <p style="margin: 0; font-size: 14px; color: #555;">
            <strong>Date:</strong> September 12, 2026<br>
            <strong>Location:</strong> Barcelona, Spain<br>
            <strong>Registered as:</strong> ${safeName}, ${safeRole} at ${safeCompany}
          </p>
        </div>
        <p style="font-size: 14px; color: #888;">
          If you have any questions, reply to this email or reach out at ${safeFrom}.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
        <p style="font-size: 12px; color: #aaa;">
          Barcelona Applied Intelligence Conference &middot; BAIC 2026
        </p>
      </div>
    `,
  }
}
