// src/utils/analytics.ts
import { supabase } from '../lib/supabase';

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}

const LEAD_ID_KEY = 'woodflex_lead_id';

export function setLeadId(leadId: string) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(LEAD_ID_KEY, leadId);
    }
}

export function getLeadId(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(LEAD_ID_KEY);
    }
    return null;
}

export async function trackEvent(
    name: string,
    params: Record<string, any> = {}
) {
    if (typeof window === "undefined") return;

    // 1. Google Analytics
    if (typeof window.gtag === "function") {
        window.gtag("event", name, params);
    }

    // 2. Supabase Tracking
    const leadId = getLeadId();
    try {
        const { error } = await supabase.from('interactions').insert([
            {
                lead_id: leadId,
                event_name: name,
                payload: params
            }
        ]);
        if (error) throw error;
    } catch (err) {
        console.error('Supabase tracking error:', err);
    }
}
