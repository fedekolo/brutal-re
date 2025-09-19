"use server"

export async function submitContactForm(prevState: any, formData: FormData) {
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Basic validation
  if (!email || !subject || !message) {
    return { error: "Todos los campos son obligatorios." }
  }

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would integrate with your email service
    // For example, using Resend, SendGrid, or Nodemailer

    // Example with fetch to a mail service API:
    const emailData = {
      to: "info@brutal.re",
      from: email,
      subject: `[BRUTAL CONTACT] ${subject}`,
      html: `
        <h2>Nuevo contacto desde BRUTAL</h2>
        <p><strong>De:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
      text: `
        Nuevo contacto desde BRUTAL
        De: ${email}
        Asunto: ${subject}
        Mensaje: ${message}
      `,
    }

    // Uncomment and configure when you have your email service set up:
    /*
    const response = await fetch('YOUR_EMAIL_SERVICE_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EMAIL_SERVICE_API_KEY}`
      },
      body: JSON.stringify(emailData)
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }
    */

    console.log("Email que se enviaría a info@brutal.re:")
    console.log(emailData)

    return { message: "ENVIADO." }
  } catch (error) {
    console.error("Error sending email:", error)
    return { error: "Error al enviar el mensaje. Intenta nuevamente." }
  }
}
