import {useNavigate} from "@remix-run/react";
import {useCallback} from "react";

const useNavigateBack = (url: string) => {
    const navigate = useNavigate();
    return useCallback(() => {
        navigate(url);
    }, [navigate, url]);
}

export default useNavigateBack;
