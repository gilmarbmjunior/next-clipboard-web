import { useEffect, useState } from "react"

const useSend = () => {
    const [text, setText] = useState('')
    const [sending, setSending] = useState(false)
    const [formatting, setFormatting] = useState(false)

    useEffect(() => {
        let active = true

        const load = async () => {
            try {
                const response = await fetch('/api/clipboard', { cache: 'no-store' })
                const data = await response.json()
                if (active) setText(data.text)
            } catch {
                // keep current text on error
            }
        }

        load()

        return () => {
            active = false
        }
    }, [])

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

    const format = async () => {
        setFormatting(true)
        try {
            const response = await fetch('/api/format', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            })
            const data = await response.json()
            if (typeof data.text === 'string') setText(data.text)
        } finally {
            setFormatting(false)
        }
    }

    return {
        text,
        setText,
        send,
        sending,
        format,
        formatting
    }
}

export default useSend
