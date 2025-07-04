import nodemailer from 'nodemailer'

// Configuração do transporter (usando Gmail como exemplo)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
})

export const emailService = {
  async send2FACode(email: string, code: string, userName?: string): Promise<boolean> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: '🔐 Código de Verificação 2FA - Droppes Admin',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #6366f1; margin: 0; font-size: 28px;">🔐 Droppes</h1>
                <p style="color: #666; margin: 5px 0 0 0;">Painel Administrativo</p>
              </div>
              
              <h2 style="color: #333; margin-bottom: 20px;">Código de Verificação 2FA</h2>
              
              <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">
                ${userName ? `Olá ${userName},` : 'Olá,'}<br>
                Foi solicitado acesso ao painel administrativo do Droppes. Para sua segurança, utilize o código abaixo:
              </p>
              
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin: 30px 0;">
                <div style="font-size: 32px; font-weight: bold; color: #6366f1; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                  ${code}
                </div>
                <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">
                  Este código expira em 10 minutos
                </p>
              </div>
              
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  <strong>⚠️ Importante:</strong> Se você não solicitou este acesso, ignore este email. 
                  Nunca compartilhe este código com terceiros.
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  Este é um email automático do sistema Droppes.<br>
                  Por favor, não responda a este email.
                </p>
              </div>
            </div>
          </div>
        `
      }

      await transporter.sendMail(mailOptions)
      return true
    } catch (error) {
      console.error('Erro ao enviar email 2FA:', error)
      return false
    }
  }
} 