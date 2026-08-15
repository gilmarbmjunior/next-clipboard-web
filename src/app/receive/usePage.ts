import { useEffect, useState } from "react"

type Loaded = { pin: string; ok: boolean; text: string } | null

const useReceive = () => {
    const [pin, setPin] = useState('')
    const [loaded, setLoaded] = useState<Loaded>(null)

    const isComplete = /^\d{6}$/.test(pin)

    useEffect(() => {
        if (!isComplete) return

        let cancelled = false

        const load = async () => {
            try {
                const response = await fetch(`/api/receive?pin=${pin}`, { cache: 'no-store' })
                if (cancelled) return
                if (response.ok) {
                    const data = await response.json()
                    if (cancelled) return
                    setLoaded({ pin, ok: true, text: typeof data.text === 'string' ? data.text : '' })
                } else {
                    setLoaded({ pin, ok: false, text: '' })
                }
            } catch {
                if (!cancelled) setLoaded({ pin, ok: false, text: '' })
            }
        }

        load()
        const interval = setInterval(load, 1000)

        return () => {
            cancelled = true
            clearInterval(interval)
        }
    }, [pin, isComplete])

    const status: 'idle' | 'loading' | 'active' | 'inactive' = !isComplete
        ? 'idle'
        : loaded === null || loaded.pin !== pin
            ? 'loading'
            : loaded.ok
                ? 'active'
                : 'inactive'

    const text = loaded !== null && loaded.pin === pin ? loaded.text : ''

    const onPinChange = (value: string) => {
        setPin(value.replace(/\D/g, '').slice(0, 6))
    }

    return {
        pin,
        onPinChange,
        text,
        status
    }
}

export default useReceive
