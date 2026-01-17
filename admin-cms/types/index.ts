// Type definitions for Secure Tracking Admin CMS
// Aligned with backend entities

// ========================================
// ENUMS
// ========================================

export enum UserRole {
    ADMIN = 'ADMIN',
    DELIVERY = 'DELIVERY',
}

export enum TaskStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    SUSPICIOUS = 'SUSPICIOUS',
}

export enum EventType {
    PICKUP = 'PICKUP',
    TRANSIT = 'TRANSIT',
    FINAL = 'FINAL',
}

// ========================================
// ENTITIES
// ========================================

export interface User {
    id: string;
    name: string;
    phone: string;
    role: UserRole;
    is_active: boolean;
    device_id?: string;
    created_at: string;
}

export interface Task {
    id: string;
    sealed_pack_code: string;
    source_location: string;
    destination_location: string;
    assigned_user_id: string;
    assigned_user: User;
    start_time: string;
    end_time: string;
    status: TaskStatus;
    created_at: string;
    events?: TaskEvent[];
}

export interface TaskEvent {
    id: string;
    task_id: string;
    event_type: EventType;
    image_url: string;
    image_hash: string;
    latitude: number;
    longitude: number;
    server_timestamp: string;
    created_at: string;
}

export interface AuditLog {
    id: string;
    user_id: string | null;
    action: string;
    entity_type: string;
    entity_id: string | null;
    ip_address: string | null;
    created_at: string;
}

// ========================================
// API RESPONSE TYPES
// ========================================

export interface LoginResponse {
    access_token: string;
    user: Partial<User> & { role: UserRole };
}

export interface AuthState {
    token: string | null;
    role: UserRole | null;
    isAuthenticated: boolean;
    loading: boolean;
}

// ========================================
// DTO TYPES
// ========================================

export interface CreateTaskDto {
    sealed_pack_code: string;
    source_location: string;
    destination_location: string;
    assigned_user_id: string;
    start_time: string;
    end_time: string;
}
