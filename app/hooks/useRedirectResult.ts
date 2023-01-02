import { useEffect } from "react"

type Props = {
  onSuccess(): void
  onCancel(): void
}

export const useRedirectResult = (props: Props) => {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (location.search === "") return
    console.log("call")
    if (location.search.includes("success")) {
      props.onSuccess()
    }
    if (location.search.includes("cancel")) {
      props.onCancel()
    }
    setTimeout(() => {
      history.replaceState({}, document.title, location.pathname)
    }, 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
