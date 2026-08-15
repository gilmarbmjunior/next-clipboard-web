import { useEffect, useState } from "react"

const useReceive = () => {
    const [text, setText] = useState('')

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
        const interval = setInterval(load, 1000)

        return () => {
            active = false
            clearInterval(interval)
        }
    }, [])

    return {
        text,
        setText
    }
}

export default useReceive
