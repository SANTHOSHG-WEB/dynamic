import { QRCode } from '../types'

export const MOCK_QR_CODES: QRCode[] = [
    {
        id: '1',
        user_id: 'user_1',
        short_id: 'abc12345',
        name: 'Summer Sale 2026',
        current_url: 'https://example.com/summer-sale',
        description: 'Main campaign for summer 2026 products.',
        scan_count: 1240,
        is_active: true,
        created_at: new Date('2026-01-01').toISOString(),
        updated_at: new Date('2026-01-05').toISOString(),
        last_scanned_at: new Date('2026-01-20').toISOString(),
    },
    {
        id: '2',
        user_id: 'user_1',
        short_id: 'xyz98765',
        name: 'Product Catalog',
        current_url: 'https://example.com/catalog.pdf',
        description: 'Direct link to the latest PDF catalog.',
        scan_count: 850,
        is_active: true,
        created_at: new Date('2026-01-10').toISOString(),
        updated_at: new Date('2026-01-10').toISOString(),
        last_scanned_at: new Date('2026-01-19').toISOString(),
    },
    {
        id: '3',
        user_id: 'user_1',
        short_id: 'menu-rest',
        name: 'Digital Menu',
        current_url: 'https://restaurant.com/menu',
        description: 'QR codes for restaurant tables.',
        scan_count: 5200,
        is_active: false,
        created_at: new Date('2025-12-15').toISOString(),
        updated_at: new Date('2026-01-02').toISOString(),
        last_scanned_at: new Date('2026-01-02').toISOString(),
    }
]
