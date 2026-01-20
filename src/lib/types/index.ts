export interface QRCode {
    id: string;
    user_id: string;
    short_id: string;
    name: string;
    current_url: string;
    description?: string;
    scan_count: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    last_scanned_at?: string;
}

export interface DashboardStats {
    totalCodes: number;
    totalScans: number;
    activeCodes: number;
}

export interface Subscription {
    id: string;
    user_id: string;
    plan_id: 'FREE' | 'PRO' | 'BUSINESS';
    status: 'active' | 'cancelled' | 'expired' | 'pending';
    current_period_start: string;
    current_period_end: string;
}
