// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// News Category
export interface NewsCategory extends CosmicObject {
  type: 'news-categories';
  metadata: {
    name?: string;
    description?: string;
    emoji?: string;
  };
}

// Curation status literals
export type CurationStatus = 'Draft' | 'Curated' | 'Published' | 'Broadcasted';

// News Article
export interface NewsArticle extends CosmicObject {
  type: 'news-articles';
  metadata: {
    headline?: string;
    body?: string;
    source_name?: string;
    source_url?: string;
    category?: NewsCategory | null;
    featured_image?: {
      url: string;
      imgix_url: string;
    } | null;
    curation_status?: CurationStatus | string;
    ap_style_verified?: boolean;
    published_date?: string;
  };
}

// Delivery status literals
export type DeliveryStatus = 'Pending' | 'Sent' | 'Failed';

// WhatsApp Broadcast
export interface WhatsAppBroadcast extends CosmicObject {
  type: 'whatsapp-broadcasts';
  metadata: {
    broadcast_title?: string;
    message_preview?: string;
    articles_included?: NewsArticle[] | null;
    community_name?: string;
    sent_at?: string;
    delivery_status?: DeliveryStatus | string;
  };
}

// API response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
export function isNewsArticle(obj: CosmicObject): obj is NewsArticle {
  return obj.type === 'news-articles';
}

export function isNewsCategory(obj: CosmicObject): obj is NewsCategory {
  return obj.type === 'news-categories';
}

export function isWhatsAppBroadcast(obj: CosmicObject): obj is WhatsAppBroadcast {
  return obj.type === 'whatsapp-broadcasts';
}