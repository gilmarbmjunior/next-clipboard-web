import { useState } from "react"

const useSend = () => {
    const [text, setText] = useState('')
    const [sending, setSending] = useState(false)

    const send = async () => {
        setSending(true)
        try {
            await fetch('/api/clipboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            })
        } finally {
            setSending(false)
        }
    }

    return {
        text,
        setText,
        send,
        sending
    }
}

export default useSend
