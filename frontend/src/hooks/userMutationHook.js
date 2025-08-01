import { useMutation } from "react-query"

export const useMutationHooks = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback
    })
    return mutation;
}

// export default useMutationHook;
