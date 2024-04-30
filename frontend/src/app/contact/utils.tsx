import emailjs from "@emailjs/browser";

export async function sendContactEmail(name: string, email: string, subject: string, message: string) {
    
    // load all needed variables
    let serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID as string;
    let templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID as string;
    let publicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY as string;
    let data = {
        'name': name,
        'email': email,
        'webiste': 'research-agents.com',
        'subject': subject,
        'message': message
    };

    // Send email using emailjs
    try {
        await emailjs.send(serviceId, templateId, data, publicKey);
        return {
            "success": true,
            "message": "Message sent successfully, we will get back to you soon."
        };
    } catch (error) {
        console.error('emailjs error', error);
        return {
            "success": false,
            "message": "Failed to send message, please try again later."
        };
    }
}