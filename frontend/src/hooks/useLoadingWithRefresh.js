import { useState } from "react";

export function useLoadingWithRefresh() {
    const [loading, setLoading] = useState(true);
}