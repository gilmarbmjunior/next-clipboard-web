import { useEffect, useRef, useState } from "react"

const HEARTBEAT_INTERVAL_MS = 3000

const useSend = () => {
    const [text, setText] = useState('')
    const [pin, setPin] = useState('')
    const [sending, setSending] = useState(false)
    const [formatting, setFormatting] = useState(false)
    const pinRef = useRef('')

    useEffect(() => {
        let active = true

        const register = async () => {
            try {
                const response = await fetch('/api/pin', { cache: 'no-store' })
                const data = await response.json()
                if (active && typeof data.pin === 'string') {
                    pinRef.current = data.pin
                    setPin(data.pin)
                }
            } catch {
                // keep pin empty on error
            }
        }

        const heartbeat = async () => {
            const currentPin = pinRef.current
            if (!currentPin) return
            try {
                await fetch('/api/pin', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pin: currentPin }),
                })
            } catch {
                // ignore
            }
        }

        const release = () => {
            const currentPin = pinRef.current
            if (!currentPin) return
            const payload = new Blob(
                [JSON.stringify({ pin: currentPin, release: true })],
                { type: 'application/json' },
            )
            navigator.sendBeacon('/api/pin', payload)
        }

        const onBeforeUnload = () => release()

        register()
        const heartbeatId = setInterval(heartbeat, HEARTBEAT_INTERVAL_MS)
        window.addEventListener('beforeunload', onBeforeUnload)

        return () => {
            active = false
            clearInterval(heartbeatId)
            window.removeEventListener('beforeunload', onBeforeUnload)
            release()
        }
    }, [])

    const send = async () => {
        const currentPin = pinRef.current
        if (!currentPin) return
        setSending(true)
        try {
            await fetch('/api/pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pin: currentPin, text }),
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
        pin,
        text,
        setText,
        send,
        sending,
        format,
        formatting
    }
}

export default useSend
